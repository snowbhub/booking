/** Upstream implementation note. */

export type AgentProvider = "gemini" | "anthropic"

export type AgentEffort = "low" | "medium" | "high"

export interface TurnInput {
  role: "user" | "assistant"
  text: string
}

/** Upstream implementation note. */
export interface ToolParameters {
  type: "object"
  properties: Record<string, unknown>
  required: string[]
  additionalProperties: false
}

export interface ToolSpec {
  name: string
  description: string
  parameters: ToolParameters
}

export interface ToolCall {
  id: string
  name: string
  input: Record<string, unknown>
}

export interface ToolResult {
  callId: string
  name: string
  content: Record<string, unknown>
  isError?: boolean
}

export interface Usage {
  /** Upstream implementation note. */
  input: number
  /** Upstream implementation note. */
  output: number
  cacheRead: number
  cacheWrite: number
}

export type StepResult =
  | { kind: "tool_calls"; calls: ToolCall[]; usage: Usage }
  | { kind: "reply"; text: string; usage: Usage; model: string }
  /** Upstream implementation note. */
  | { kind: "stop"; reason: string; usage: Usage }

export interface SessionInput {
  model: string
  effort: AgentEffort | null
  /** Parte estable del prompt (cacheable). */
  system: string
  /** Upstream implementation note. */
  contextNote: string
  history: TurnInput[]
  tools: ToolSpec[]
}

export interface ModelSession {
  /** Pide el siguiente paso; `results` son las respuestas a las herramientas del paso anterior. */
  next(results?: ToolResult[]): Promise<StepResult>
}

export interface ModelProvider {
  readonly id: AgentProvider
  start(input: SessionInput): ModelSession
}

export const NO_USAGE: Usage = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }

/** Upstream implementation note. */
export function withContext(text: string, contextNote: string) {
  return `${text}\n\n[System context — not part of the client message]\n${contextNote}`
}

/** Upstream implementation note. */
export function fromFirstUser(history: TurnInput[]) {
  const i = history.findIndex((m) => m.role === "user")
  return i === -1 ? [] : history.slice(i)
}
