import { NextResponse, type NextRequest } from "next/server"
import { db, now, store } from "@/lib/data/repo"
import { readMercadoPagoConfig, readMercadoPagoWebhookConfig } from "@/lib/mercadopago/config"
import { getPayment } from "@/lib/mercadopago/client"
import { verifyMercadoPagoSignature } from "@/lib/mercadopago/signature"

/** Upstream implementation note. */
export async function POST(req: NextRequest) {
  const webhook = readMercadoPagoWebhookConfig()
  if (!webhook.configured) {
    return NextResponse.json({ ok: false, error: "endpoint no configurado" }, { status: 503 })
  }

  const url = new URL(req.url)
  let body: { type?: string; action?: string; data?: { id?: string } } = {}
  try {
    body = await req.json()
  } catch {
    /* algunas notificaciones viejas no traen cuerpo: se sigue con la query. */
  }

  const type = body.type ?? url.searchParams.get("type") ?? url.searchParams.get("topic")
  const dataId = body.data?.id ?? url.searchParams.get("data.id") ?? url.searchParams.get("id")

  if (type !== "payment") return NextResponse.json({ ok: true, status: "ignored" })
  if (!dataId) return NextResponse.json({ ok: false, error: "missing payment ID" }, { status: 400 })

  const signatureOk = verifyMercadoPagoSignature({
    xSignature: req.headers.get("x-signature"),
    xRequestId: req.headers.get("x-request-id"),
    dataId,
    secret: webhook.secret,
  })
  if (!signatureOk) return NextResponse.json({ ok: false, error: "invalid signature" }, { status: 401 })

  const config = readMercadoPagoConfig()
  if (!config.configured) return NextResponse.json({ ok: false, error: "endpoint no configurado" }, { status: 503 })

  try {
    const payment = await getPayment(config, dataId)
    if (!payment.ok) {
      console.error("[mercadopago] could not retrieve the payment", { status: payment.status })
      return NextResponse.json({ ok: false, error: "error interno" }, { status: 500 })
    }
    if (payment.data.status !== "approved") return NextResponse.json({ ok: true, status: payment.data.status })

    const appointmentId = payment.data.externalReference
    if (!appointmentId) return NextResponse.json({ ok: true, status: "sin_turno_asociado" })

    const s = await db()
    const appt = s.appointments.find((a) => a.id === appointmentId)
    if (!appt) {
      console.warn("[mercadopago] approved payment for a booking that no longer exists", { appointmentId })
      return NextResponse.json({ ok: true, status: "turno_inexistente" })
    }
    const service = s.services.find((x) => x.id === appt.serviceId)

    const { inserted } = await store().confirmDeposit(appointmentId, {
      appointmentId,
      clientId: appt.clientId,
      staffId: appt.staffId,
      serviceId: appt.serviceId,
      concept: `Deposit · ${service?.name ?? "booking"}`,
      kind: "sena",
      listPrice: payment.data.transactionAmount,
      discount: 0,
      discountReason: null,
      tip: 0,
      amount: payment.data.transactionAmount,
      method: "mercadopago",
      paidAt: (await now()).toISOString(),
      externalRef: payment.data.id,
    })
    return NextResponse.json({ ok: true, status: inserted ? "confirmado" : "ya_estaba" })
  } catch (error) {
    console.error("[mercadopago] error processing notification", { name: (error as Error)?.name })
    return NextResponse.json({ ok: false, error: "error interno" }, { status: 500 })
  }
}
