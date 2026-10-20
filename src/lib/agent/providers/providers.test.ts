import { describe, expect, it } from "vitest"
import { estimateCostUsd, readAgentConfig } from "../config"
import { supportsEffort, supportsMidConversationSystem, toAnthropicTools, usesServerFallbacks } from "./anthropic"
import { ApiError } from "@google/genai"
import { isTransientGeminiError, toGeminiTools } from "./gemini"
import { fromFirstUser, withContext, type ToolSpec } from "./types"

const TOOL: ToolSpec = {
  name: "consultar_disponibilidad",
  description: "Horarios libres.",
  parameters: {
    type: "object",
    properties: { fecha: { type: "string" }, barbero_id: { type: "string", enum: ["st-a", "cualquiera"] } },
    required: ["fecha", "barbero_id"],
    additionalProperties: false,
  },
}

describe("readAgentConfig", () => {
  it("usa Gemini 3.5 Flash-Lite por defecto", () => {
    const c = readAgentConfig({ GEMINI_API_KEY: "k" })
    expect(c).toMatchObject({ configured: true, provider: "gemini", model: "gemini-3.5-flash-lite", effort: null })
  })

  it("pide la clave del proveedor elegido, no la del otro", () => {
    const c = readAgentConfig({ AGENT_PROVIDER: "anthropic", GEMINI_API_KEY: "k" })
    expect(c.configured).toBe(false)
    if (!c.configured) expect(c.reason).toContain("ANTHROPIC_API_KEY")
  })

  it("con Anthropic, Haiku 4.5 por defecto; AGENT_MODEL lo pisa", () => {
    expect(readAgentConfig({ AGENT_PROVIDER: "anthropic", ANTHROPIC_API_KEY: "k" })).toMatchObject({ model: "claude-haiku-4-5" })
    expect(readAgentConfig({ AGENT_PROVIDER: "Anthropic", ANTHROPIC_API_KEY: "k", AGENT_MODEL: "claude-sonnet-5" })).toMatchObject({ model: "claude-sonnet-5" })
  })

  it("upstream behavior 1", () => {
    expect(readAgentConfig({ AGENT_PROVIDER: "openai", GEMINI_API_KEY: "k" }).configured).toBe(false)
    expect(readAgentConfig({ GEMINI_API_KEY: "k", AGENT_EFFORT: "max" })).toMatchObject({ effort: null })
    expect(readAgentConfig({ GEMINI_API_KEY: "k", AGENT_EFFORT: "LOW" })).toMatchObject({ effort: "low" })
  })
})

describe("upstream behavior 2", () => {
  const api = (status: number) => new ApiError({ message: "x", status })

  it("upstream behavior 3", () => {
    for (const status of [408, 429, 500, 502, 503, 504]) expect(isTransientGeminiError(api(status))).toBe(true)
    expect(isTransientGeminiError(new TypeError("fetch failed"))).toBe(true)
    const timeout = new Error("t")
    timeout.name = "TimeoutError"
    expect(isTransientGeminiError(timeout)).toBe(true)
  })

  it("upstream behavior 4", () => {
    for (const status of [400, 401, 403, 404]) expect(isTransientGeminiError(api(status))).toBe(false)
    expect(isTransientGeminiError(new Error("otra cosa"))).toBe(false)
  })
})

describe("estimateCostUsd", () => {
  it("upstream behavior 5", () => {
    const usage = { input: 1_000_000, output: 1_000_000, cacheRead: 0, cacheWrite: 0 }
    expect(estimateCostUsd("gemini-3.5-flash-lite", usage)).toBeCloseTo(2.8)
    expect(estimateCostUsd("claude-haiku-4-5", { ...usage, cacheRead: 1_000_000 })).toBeCloseTo(6.1)
  })

  it("upstream behavior 6", () => {
    expect(estimateCostUsd("modelo-nuevo", { input: 1, output: 1, cacheRead: 0, cacheWrite: 0 })).toBeNull()
  })
})

describe("upstream behavior 7", () => {
  it("upstream behavior 8", () => {
    const [t] = toAnthropicTools([TOOL])
    expect(t).toMatchObject({ name: TOOL.name, strict: true, input_schema: TOOL.parameters })
  })

  it("Gemini: el JSON Schema va entero en parametersJsonSchema (conserva enum)", () => {
    const [t] = toGeminiTools([TOOL])
    expect(t).toEqual({ name: TOOL.name, description: TOOL.description, parametersJsonSchema: TOOL.parameters })
  })
})

describe("upstream behavior 9", () => {
  it("upstream behavior 10", () => {
    expect(usesServerFallbacks("claude-opus-5")).toBe(true)
    expect(usesServerFallbacks("claude-fable-5-1")).toBe(true)
    expect(usesServerFallbacks("claude-haiku-4-5")).toBe(false)
    expect(usesServerFallbacks("claude-sonnet-5")).toBe(false)
  })

  it("effort no va a Haiku 4.5", () => {
    expect(supportsEffort("claude-haiku-4-5")).toBe(false)
    expect(supportsEffort("claude-sonnet-5")).toBe(true)
  })

  it("upstream behavior 11", () => {
    expect(supportsMidConversationSystem("claude-opus-5")).toBe(true)
    expect(supportsMidConversationSystem("claude-sonnet-5")).toBe(false)
    expect(supportsMidConversationSystem("claude-haiku-4-5")).toBe(false)
  })
})

describe("historial", () => {
  it("upstream behavior 12", () => {
    expect(fromFirstUser([{ role: "assistant", text: "hola" }, { role: "user", text: "turno?" }])).toEqual([{ role: "user", text: "turno?" }])
    expect(fromFirstUser([{ role: "assistant", text: "hola" }])).toEqual([])
  })

  it("upstream behavior 13", () => {
    expect(withContext("turno mañana?", "Hoy es martes")).toMatch(/^turno mañana\?\n\n\[System context — not part of the client message\]\nHoy es martes$/)
  })
})
