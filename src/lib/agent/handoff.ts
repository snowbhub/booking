import type { Channel } from "@/lib/domain/types"

/** Upstream implementation note. */

export interface HandoffContext {
  /** Upstream implementation note. */
  text: string
  channel: Channel
  /** Upstream implementation note. */
  agentRepliesWithoutBooking: number
  /** Upstream implementation note. */
  isKnownClient: boolean
  /** Upstream implementation note. */
  hour: number
}

export type HandoffDecision = { handOff: false } | { handOff: true; reason: string }

export function shouldHandOff(ctx: HandoffContext): HandoffDecision {
  // Upstream implementation note.
  //
  // Upstream implementation note.
  // Upstream implementation note.
  //    "quiero hablar con alguien", "me cobraron mal"…). Ojo con los falsos
  // Upstream implementation note.
  // Upstream implementation note.
  // Upstream implementation note.
  // Upstream implementation note.
  // Upstream implementation note.
  // Upstream implementation note.
  //
  // Upstream implementation note.
  void ctx
  return { handOff: false }
}
