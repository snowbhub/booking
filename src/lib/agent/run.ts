import "server-only"
import { estimateCostUsd, readAgentConfig } from "./config"
import { providerFor } from "./providers"
import type { ToolResult, TurnInput, Usage } from "./providers/types"
import { executeTool, toolDefinitions, type ToolContext } from "./tools"
import type { AgentActionKind, AgentSettings, Service, Staff } from "@/lib/domain/types"

/** Upstream implementation note. */

export type { TurnInput } from "./providers/types"

export interface AgentRunResult {
  ok: true
  reply: string
  actions: { tool: string; action?: AgentActionKind; isError?: boolean }[]
  clientId: string | null
  usage: Usage
  provider: string
  model: string
  /** Upstream implementation note. */
  costUsd: number | null
}

export type AgentRunFailure = { ok: false; reason: string }

export async function runAgent(args: {
  settings: AgentSettings
  services: Service[]
  staff: Staff[]
  history: TurnInput[]
  contextNote: string
  systemPrompt: string
  toolContext: ToolContext
}): Promise<AgentRunResult | AgentRunFailure> {
  const config = readAgentConfig()
  if (!config.configured) return { ok: false, reason: config.reason }

  const session = providerFor(config.provider).start({
    model: config.model,
    effort: config.effort,
    system: args.systemPrompt,
    contextNote: args.contextNote,
    history: args.history,
    tools: toolDefinitions(args.services, args.staff),
  })

  const actions: AgentRunResult["actions"] = []
  const usage: Usage = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }
  let clientId = args.toolContext.clientId
  let results: ToolResult[] | undefined

  for (let i = 0; i < config.maxIterations; i++) {
    const step = await session.next(results)
    usage.input += step.usage.input
    usage.output += step.usage.output
    usage.cacheRead += step.usage.cacheRead
    usage.cacheWrite += step.usage.cacheWrite

    if (step.kind === "stop") return { ok: false, reason: step.reason }
    if (step.kind === "reply") {
      return {
        ok: true,
        reply: step.text,
        actions,
        clientId,
        usage,
        provider: config.provider,
        model: step.model,
        costUsd: estimateCostUsd(config.model, usage),
      }
    }

    results = []
    for (const call of step.calls) {
      const outcome = await executeTool(call.name, call.input, { ...args.toolContext, clientId, history: args.history })
      if (outcome.clientId) clientId = outcome.clientId
      actions.push({ tool: call.name, action: outcome.action, isError: outcome.isError })
      results.push({ callId: call.id, name: call.name, content: outcome.result, isError: outcome.isError })
    }
  }

  return { ok: false, reason: "El agente dio demasiadas vueltas sin responder. Queda parto a person." }
}
