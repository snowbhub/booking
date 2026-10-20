import "server-only"
import { headers } from "next/headers"
import { BRAND } from "@/config/brand"
import { readMercadoPagoConfig } from "./config"
import { createPreference } from "./client"

/** Upstream implementation note. */
export async function startDepositCheckout(input: {
  appointmentId: string
  serviceName: string
  amount: number
  holdMin: number
}): Promise<string | null> {
  const config = readMercadoPagoConfig()
  if (!config.configured) return null

  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  if (!host) return null
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")
  const origin = `${proto}://${host}`

  const pref = await createPreference(config, {
    title: `Deposit · ${input.serviceName} · ${BRAND.fullName}`,
    amount: input.amount,
    externalReference: input.appointmentId,
    notificationUrl: `${origin}/api/mercadopago/webhook`,
    backUrl: `${origin}/pago`,
    expiresInMin: input.holdMin,
  })
  return pref.ok ? pref.data.initPoint : null
}
