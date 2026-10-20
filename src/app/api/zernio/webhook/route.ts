import { after, NextResponse, type NextRequest } from "next/server"
import { readZernioWebhookConfig } from "@/lib/zernio/config"
import { normalizeInboxEvent } from "@/lib/zernio/events"
import { readSignatureHeader, verifySignature } from "@/lib/zernio/signature"
import { isOwnAccount } from "@/lib/zernio/own-accounts"
import { ingestInboxEvent, respondToConversation } from "@/lib/agent/respond"

/** Upstream implementation note. */

// Upstream implementation note.
export const maxDuration = 60

export async function POST(req: NextRequest) {
  const config = readZernioWebhookConfig()
  if (!config.configured) {
    // Upstream implementation note.
    // cualquiera inyecte mensajes en la Bandeja.
    return NextResponse.json({ ok: false, error: "endpoint no configurado" }, { status: 503 })
  }

  // El cuerpo CRUDO: la firma se calcula sobre estos bytes exactos.
  const rawBody = await req.text()
  if (!verifySignature(rawBody, readSignatureHeader(req.headers), config.secret)) {
    return NextResponse.json({ ok: false, error: "invalid signature" }, { status: 401 })
  }

  let payload: unknown
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ ok: true, status: "invalid" })
  }

  const event = normalizeInboxEvent(payload)
  if (event.kind !== "inbox") return NextResponse.json({ ok: true, status: event.kind })

  // Una API key de Zernio ve las cuentas de todos los negocios del usuario. Si
  // Upstream implementation note.
  // Upstream implementation note.
  if (!(await isOwnAccount(event.accountExternalId))) {
    console.warn("[zernio] evento de otra cuenta, ignorado", { cuenta: event.accountExternalId.slice(-6) })
    return NextResponse.json({ ok: true, status: "other_account" })
  }

  try {
    const conversationId = await ingestInboxEvent(event)
    if (conversationId) {
      after(async () => {
        const res = await respondToConversation(conversationId)
        if (!res.ok) console.warn("[ai-agent] did not respond", { conversationId, reason: res.reason })
      })
    }
    return NextResponse.json({ ok: true, status: "processed" })
  } catch (error) {
    // Upstream implementation note.
    console.error("[zernio] error guardando el evento", { name: (error as Error)?.name })
    return NextResponse.json({ ok: false, error: "error interno" }, { status: 500 })
  }
}
