import type { AgentEffort, AgentProvider, Usage } from "./providers/types"

/** Upstream implementation note. */

export type AgentConfig =
  | { configured: true; provider: AgentProvider; model: string; effort: AgentEffort | null; maxIterations: number }
  | { configured: false; provider: AgentProvider; reason: string }

/** Upstream implementation note. */
export const DEFAULT_PROVIDER: AgentProvider = "gemini"

export const DEFAULT_MODEL: Record<AgentProvider, string> = {
  gemini: "gemini-3.5-flash-lite",
  anthropic: "claude-haiku-4-5",
}

const KEY_VAR: Record<AgentProvider, string> = {
  gemini: "GEMINI_API_KEY",
  anthropic: "ANTHROPIC_API_KEY",
}

export const PROVIDER_LABEL: Record<AgentProvider, string> = {
  gemini: "Google Gemini",
  anthropic: "Anthropic Claude",
}

const EFFORTS: AgentEffort[] = ["low", "medium", "high"]

export function readAgentConfig(env: Record<string, string | undefined> = process.env): AgentConfig {
  const raw = env.AGENT_PROVIDER?.trim().toLowerCase()
  if (raw && raw !== "gemini" && raw !== "anthropic") {
    return { configured: false, provider: DEFAULT_PROVIDER, reason: `AGENT_PROVIDER="${raw}" is not supported: use "gemini" o "anthropic".` }
  }
  const provider: AgentProvider = (raw as AgentProvider | undefined) ?? DEFAULT_PROVIDER
  const keyVar = KEY_VAR[provider]
  if (!env[keyVar]?.trim()) {
    return {
      configured: false,
      provider,
      reason: `Falta ${keyVar} is missing from the server environment. The AI Agent cannot reply without it.`,
    }
  }
  const effort = env.AGENT_EFFORT?.trim().toLowerCase() as AgentEffort | undefined
  return {
    configured: true,
    provider,
    model: env.AGENT_MODEL?.trim() || DEFAULT_MODEL[provider],
    // Upstream implementation note.
    // Upstream implementation note.
    effort: effort && EFFORTS.includes(effort) ? effort : null,
    maxIterations: 6,
  }
}

/** Upstream implementation note. */
const PRICES: Record<string, { input: number; output: number }> = {
  "gemini-3.5-flash-lite": { input: 0.3, output: 2.5 },
  "gemini-3.5-flash": { input: 1.5, output: 9 },
  "gemini-2.5-flash-lite": { input: 0.1, output: 0.4 },
  "claude-haiku-4-5": { input: 1, output: 5 },
  "claude-sonnet-5": { input: 2, output: 10 },
  "claude-opus-5": { input: 5, output: 25 },
}

/** Upstream implementation note. */
export function estimateCostUsd(model: string, usage: Usage): number | null {
  const p = PRICES[model]
  if (!p) return null
  const input = usage.input + usage.cacheRead * 0.1 + usage.cacheWrite * 1.25
  return (input * p.input + usage.output * p.output) / 1_000_000
}
