import "server-only"
import { randomUUID } from "node:crypto"
import { readZernioConfig } from "./config"
import { sendMessage, type ZernioResult } from "./client"
import { isOwnAccount } from "./own-accounts"
import { retrying } from "@/lib/retry"
import type { Conversation } from "@/lib/domain/types"

/** Upstream implementation note. */
export const WHATSAPP_WINDOW_MS = 24 * 60 * 60 * 1000

export function outsideWhatsAppWindow(conv: Pick<Conversation, "channel" | "lastInboundAt">, now: Date) {
  return conv.channel === "whatsapp" && (!conv.lastInboundAt || now.getTime() - new Date(conv.lastInboundAt).getTime() > WHATSAPP_WINDOW_MS)
}

/** Upstream implementation note. */
export function isTransientZernioFailure(result: ZernioResult<unknown>): boolean {
  return !result.ok && (result.code === "rate_limited" || result.code === "upstream" || result.code === "timeout" || result.code === "network")
}

export type DeliveryResult = { ok: true; sent: boolean; externalId: string | null } | { ok: false; error: string }

/** Upstream implementation note. */
export async function deliverToChannel(conv: Conversation, body: string, now: Date): Promise<DeliveryResult> {
  const config = readZernioConfig()
  if (!config.configured || !conv.externalId) return { ok: true, sent: false, externalId: null }
  if (outsideWhatsAppWindow(conv, now)) {
    return {
      ok: false,
      error: "More than 24 hours have passed since the client's last message: WhatsApp only allows an approved template. Wait for the client to message again.",
    }
  }
  const accountId = conv.accountExternalId || process.env.ZERNIO_ACCOUNT_ID || ""
  // Upstream implementation note.
  if (!(await isOwnAccount(accountId))) {
    return { ok: false, error: "This conversation belongs to an account outside this panel, so nothing was sent." }
  }
  // Upstream implementation note.
  // Upstream implementation note.
  const idempotencyKey = randomUUID()
  const sent = await retrying(
    () => sendMessage({ config }, { conversationId: conv.externalId!, accountId, body, idempotencyKey }),
    (o) => !o.failed && isTransientZernioFailure(o.value),
    { delaysMs: [1_000, 2_500], budgetMs: 15_000 }
  )
  return sent.ok ? { ok: true, sent: true, externalId: sent.data.messageId } : { ok: false, error: `No se pudo enviar por Zernio: ${sent.message}` }
}
