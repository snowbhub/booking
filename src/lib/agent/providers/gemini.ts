import "server-only"
import { ApiError, FinishReason, GoogleGenAI, ThinkingLevel, type Content, type FunctionDeclaration } from "@google/genai"
import { retrying } from "@/lib/retry"
import { fromFirstUser, NO_USAGE, withContext, type AgentEffort, type ModelProvider, type ModelSession, type SessionInput, type ToolSpec } from "./types"

/** Upstream implementation note. */

let client: GoogleGenAI | null = null
/** Upstream implementation note. */
const gemini = () =>
  (client ??= new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: { timeout: 20_000, retryOptions: { attempts: 1 } },
  }))

/** Upstream implementation note. */
const RETRY = { delaysMs: [1_500, 3_500], budgetMs: 40_000 }

/** Upstream implementation note. */
export function isTransientGeminiError(error: unknown): boolean {
  if (error instanceof ApiError) return error.status === 408 || error.status === 429 || error.status >= 500
  if (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError")) return true
  return error instanceof TypeError // fetch sin conexión
}

const generate = (params: Parameters<GoogleGenAI["models"]["generateContent"]>[0]) =>
  retrying(() => gemini().models.generateContent(params), (o) => o.failed && isTransientGeminiError(o.error), RETRY)

/** Los modelos 3.x regulan el razonamiento por nivel; los 2.5, por presupuesto (se deja el default). */
const THINKING: Record<AgentEffort, ThinkingLevel> = {
  low: ThinkingLevel.LOW,
  medium: ThinkingLevel.MEDIUM,
  high: ThinkingLevel.HIGH,
}

export function toGeminiTools(tools: ToolSpec[]): FunctionDeclaration[] {
  return tools.map((t) => ({ name: t.name, description: t.description, parametersJsonSchema: t.parameters }))
}

/** Upstream implementation note. */
const BLOCKED = new Set<string>([
  FinishReason.SAFETY,
  FinishReason.RECITATION,
  FinishReason.BLOCKLIST,
  FinishReason.PROHIBITED_CONTENT,
  FinishReason.SPII,
])

export const geminiProvider: ModelProvider = {
  id: "gemini",
  start(input: SessionInput): ModelSession {
    const functionDeclarations = toGeminiTools(input.tools)
    const contents = toContents(input)

    return {
      async next(results) {
        if (results?.length) {
          contents.push({
            role: "user",
            parts: results.map((r) => ({
              functionResponse: { id: r.callId, name: r.name, response: r.isError ? { error: r.content } : { output: r.content } },
            })),
          })
        }

        let response
        try {
          response = await generate({
            model: input.model,
            contents,
            config: {
              systemInstruction: input.system,
              tools: [{ functionDeclarations }],
              maxOutputTokens: 8192,
              ...(input.effort && input.model.startsWith("gemini-3") ? { thinkingConfig: { thinkingLevel: THINKING[input.effort] } } : {}),
            },
          })
        } catch (error) {
          return { kind: "stop", reason: describeError(error), usage: NO_USAGE }
        }

        const meta = response.usageMetadata
        const cached = meta?.cachedContentTokenCount ?? 0
        const usage = {
          input: Math.max(0, (meta?.promptTokenCount ?? 0) + (meta?.toolUsePromptTokenCount ?? 0) - cached),
          output: (meta?.candidatesTokenCount ?? 0) + (meta?.thoughtsTokenCount ?? 0),
          cacheRead: cached,
          cacheWrite: 0,
        }

        if (response.promptFeedback?.blockReason) {
          return { kind: "stop", reason: "El modelo no quiso responder este mensaje. Queda parto a person.", usage }
        }
        const candidate = response.candidates?.[0]
        if (!candidate) return { kind: "stop", reason: "El agente no generó respuesta.", usage }
        if (candidate.finishReason === FinishReason.MAX_TOKENS) {
          return { kind: "stop", reason: "La respuesta se cortó por largo. Queda parto a person.", usage }
        }
        if (candidate.finishReason && BLOCKED.has(candidate.finishReason)) {
          return { kind: "stop", reason: "El modelo no quiso responder este mensaje. Queda parto a person.", usage }
        }
        if (candidate.finishReason === FinishReason.MALFORMED_FUNCTION_CALL) {
          return { kind: "stop", reason: "El modelo armó mal una llamada a una herramienta. Queda parto a person.", usage }
        }

        if (candidate.content) contents.push(candidate.content)

        const calls = response.functionCalls ?? []
        if (calls.length) {
          return {
            kind: "tool_calls",
            calls: calls.map((c, i) => ({ id: c.id ?? `${c.name}-${contents.length}-${i}`, name: c.name ?? "", input: c.args ?? {} })),
            usage,
          }
        }

        const text = response.text?.trim()
        return text
          ? { kind: "reply", text, usage, model: response.modelVersion ?? input.model }
          : { kind: "stop", reason: "El agente no generó respuesta.", usage }
      },
    }
  },
}

function toContents(input: SessionInput): Content[] {
  const turns = fromFirstUser(input.history)
  return turns.map((m, i) => {
    const text = i === turns.length - 1 && m.role === "user" ? withContext(m.text, input.contextNote) : m.text
    return { role: m.role === "user" ? "user" : "model", parts: [{ text }] }
  })
}

function describeError(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 400) return "La IA rechazó el pedido (configuración inválida)."
    if (error.status === 401 || error.status === 403) return "La clave de Gemini no es válida o no tiene permiso para ese modelo."
    if (error.status === 404) return "Ese modelo de Gemini no existe o no está disponible para esta clave."
    if (error.status === 429) return "Se alcanzó el límite de pedidos a la IA. Reintentá en un minuto."
    return `The AI provider returned an error (${error.status}).`
  }
  if (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError")) return "La IA tardó demasiado en responder. Queda parto a person."
  if (error instanceof TypeError) return "Could not connect con la IA."
  return "Error inesperado al llamar a la IA."
}
