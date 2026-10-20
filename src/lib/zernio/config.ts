/** Upstream implementation note. */
export type ZernioConfig =
  | {
      configured: true
      baseUrl: string
      apiKey: string
      /** Upstream implementation note. */
      profileId: string | null
    }
  | { configured: false; reason: string }

export type ZernioWebhookConfig =
  | { configured: true; secret: string }
  | { configured: false; reason: string }

/** Upstream implementation note. */
export const DEFAULT_ZERNIO_BASE_URL = "https://zernio.com/api/v1"

/** Upstream implementation note. */
const API_KEY_PREFIX = "sk_"
const MIN_API_KEY_LENGTH = 32

/** Upstream implementation note. */
const MIN_WEBHOOK_SECRET_LENGTH = 24

export function readZernioConfig(
  env: Record<string, string | undefined> = process.env
): ZernioConfig {
  const apiKey = env.ZERNIO_API_KEY?.trim()

  if (!apiKey) {
    return {
      configured: false,
      reason: "ZERNIO_API_KEY is missing. Create an API key in Zernio and add it to Railway.",
    }
  }
  if (!apiKey.startsWith(API_KEY_PREFIX)) {
    return {
      configured: false,
      reason:
        "ZERNIO_API_KEY no parece una clave de Zernio: tiene que empezar con «sk_».",
    }
  }
  if (apiKey.length < MIN_API_KEY_LENGTH) {
    return {
      configured: false,
      reason: `ZERNIO_API_KEY is too short (minimum ${MIN_API_KEY_LENGTH} characters).`,
    }
  }

  const baseUrl = env.ZERNIO_API_URL?.trim() || DEFAULT_ZERNIO_BASE_URL
  const profileId = env.ZERNIO_PROFILE_ID?.trim()

  return {
    configured: true,
    baseUrl: baseUrl.replace(/\/+$/, ""),
    apiKey,
    profileId: profileId ? profileId : null,
  }
}

export function readZernioWebhookConfig(
  env: Record<string, string | undefined> = process.env
): ZernioWebhookConfig {
  const secret = env.ZERNIO_WEBHOOK_SECRET?.trim()

  if (!secret) {
    return {
      configured: false,
      reason:
        "ZERNIO_WEBHOOK_SECRET is missing. Add the same secret in Zernio's webhook settings and in this service's environment variables.",
    }
  }
  if (secret.length < MIN_WEBHOOK_SECRET_LENGTH) {
    return {
      configured: false,
      reason: `ZERNIO_WEBHOOK_SECRET is too short (minimum ${MIN_WEBHOOK_SECRET_LENGTH} characters).`,
    }
  }

  return { configured: true, secret }
}

/** Upstream implementation note. */
export function maskApiKey(apiKey: string): string {
  if (apiKey.length <= 10) return "•".repeat(apiKey.length)
  return `${apiKey.slice(0, 6)}…${apiKey.slice(-4)}`
}
