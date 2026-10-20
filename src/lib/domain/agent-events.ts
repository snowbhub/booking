import type { AgentActionKind } from "./types"

/** Upstream implementation note. */
export const ACTION_SUMMARY: Record<AgentActionKind, string> = {
  turno_creado: "Created a booking for",
  turno_reprogramado: "Rescheduled the booking for",
  turno_cancelado: "Cancelled the booking for",
  consulta_respondida: "Answered a question from",
  derivado_humano: "Handed off to a person a",
  sello_consultado: "Shared loyalty status with",
}

export const summarizeAction = (kind: AgentActionKind, who: string) => `${ACTION_SUMMARY[kind]} ${who}`
