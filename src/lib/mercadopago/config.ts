/** Upstream implementation note. */

export type MercadoPagoConfig =
  | { configured: true; accessToken: string }
  | { configured: false; reason: string }

export type MercadoPagoWebhookConfig =
  | { configured: true; secret: string }
  | { configured: false; reason: string }

const MIN_WEBHOOK_SECRET_LENGTH = 16

export function readMercadoPagoConfig(env: Record<string, string | undefined> = process.env): MercadoPagoConfig {
  const accessToken = env.MERCADOPAGO_ACCESS_TOKEN?.trim()
  if (!accessToken) {
    return { configured: false, reason: "Falta MERCADOPAGO_ACCESS_TOKEN. Se crea en el panel de desarrolladores de Mercado Pago (con la cuenta del local)." }
  }
  return { configured: true, accessToken }
}

export function readMercadoPagoWebhookConfig(env: Record<string, string | undefined> = process.env): MercadoPagoWebhookConfig {
  const secret = env.MERCADOPAGO_WEBHOOK_SECRET?.trim()
  if (!secret) {
    return { configured: false, reason: "MERCADOPAGO_WEBHOOK_SECRET is missing (copy it when creating the Mercado Pago webhook notification)." }
  }
  if (secret.length < MIN_WEBHOOK_SECRET_LENGTH) {
    return { configured: false, reason: `MERCADOPAGO_WEBHOOK_SECRET looks incomplete (minimum ${MIN_WEBHOOK_SECRET_LENGTH} characters).` }
  }
  return { configured: true, secret }
}
