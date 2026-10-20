/* Upstream implementation note. */
import type { ZernioConfig } from "./config"
import {
  normalizeRestConversation,
  normalizeRestMessage,
  parseListPayload,
  type NormalizedConversation,
  type NormalizedMessage,
} from "./events"
import {
  parseAccountsPayload,
  parseAnalyticsAccess,
  type ZernioAccount,
} from "./types"

/** Upstream implementation note. */

export type ZernioFailureCode =
  | "unconfigured"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "rate_limited"
  | "upstream"
  | "timeout"
  | "network"
  | "malformed"

export type ZernioFailure = {
  ok: false
  code: ZernioFailureCode
  message: string
  /** Upstream implementation note. */
  retryAfterSeconds?: number
}

export type ZernioResult<T> = { ok: true; data: T } | ZernioFailure

export type ZernioDeps = {
  config: ZernioConfig
  fetch?: typeof fetch
  timeoutMs?: number
}

const DEFAULT_TIMEOUT_MS = 20_000

/** Upstream implementation note. */
export function describeZernioFailure(
  code: ZernioFailureCode | number
): ZernioFailure {
  switch (code) {
    case "unconfigured":
      return {
        ok: false,
        code: "unconfigured",
        message: "Zernio is not configured yet.",
      }
    case 401:
    case "unauthorized":
      return {
        ok: false,
        code: "unauthorized",
        message:
          "Zernio rejected the API key. Verificá ZERNIO_API_KEY en el entorno del servidor.",
      }
    case 403:
    case "forbidden":
      return {
        ok: false,
        code: "forbidden",
        message:
          "Your Zernio plan does not include this feature. La Bandeja y las analíticas se contratan aparte.",
      }
    case 404:
    case "not_found":
      return {
        ok: false,
        code: "not_found",
        message: "Zernio could not find that resource. Puede haberse desconectado la cuenta.",
      }
    case 429:
    case "rate_limited":
      return {
        ok: false,
        code: "rate_limited",
        message: "Zernio asked to wait because of a rate limit. Se reintenta solo.",
      }
    case "timeout":
      return {
        ok: false,
        code: "timeout",
        message: "Zernio took too long to respond.",
      }
    case "network":
      return {
        ok: false,
        code: "network",
        message: "Could not reach Zernio. Check the server connection.",
      }
    case "malformed":
      return {
        ok: false,
        code: "malformed",
        message:
          "Zernio returned an unexpected response format. No se guardó nada para no corromper los datos.",
      }
    default:
      return {
        ok: false,
        code: "upstream",
        message: "Zernio returned an error. Try again in a few minutes.",
      }
  }
}

/** Upstream implementation note. */
export function parseRetryAfter(value: string | null): number | undefined {
  if (!value) return undefined
  const seconds = Number(value.trim())
  if (!Number.isFinite(seconds) || seconds < 0) return undefined
  return Math.min(Math.trunc(seconds), 3600)
}

export type ZernioRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  query?: Record<string, string | number | null | undefined>
  body?: unknown
  /** Upstream implementation note. */
  idempotencyKey?: string
  signal?: AbortSignal
}

/** Upstream implementation note. */
export async function zernioRequest(
  path: string,
  options: ZernioRequestOptions,
  deps: ZernioDeps
): Promise<ZernioResult<unknown>> {
  const { config } = deps
  if (!config.configured) return describeZernioFailure("unconfigured")

  const doFetch = deps.fetch ?? fetch
  const url = new URL(`${config.baseUrl}${path.startsWith("/") ? path : `/${path}`}`)
  for (const [key, value] of Object.entries(options.query ?? {})) {
    if (value !== null && value !== undefined && value !== "") {
      url.searchParams.set(key, String(value))
    }
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${config.apiKey}`,
    Accept: "application/json",
  }
  if (options.body !== undefined) headers["Content-Type"] = "application/json"
  if (options.idempotencyKey) headers["Idempotency-Key"] = options.idempotencyKey

  const timeout = new AbortController()
  const timer = setTimeout(() => timeout.abort(), deps.timeoutMs ?? DEFAULT_TIMEOUT_MS)

  try {
    let response: Response
    try {
      response = await doFetch(url.toString(), {
        method: options.method ?? "GET",
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        signal: options.signal ?? timeout.signal,
      })
    } catch (error) {
      // Upstream implementation note.
      // llevar identificadores de cuenta. Se descarta entero.
      return describeZernioFailure(
        (error as Error)?.name === "AbortError" ? "timeout" : "network"
      )
    }

    if (!response.ok) {
      const failure = describeZernioFailure(response.status)
      if (failure.code === "rate_limited") {
        const retryAfterSeconds = parseRetryAfter(response.headers.get("Retry-After"))
        return retryAfterSeconds === undefined
          ? failure
          : { ...failure, retryAfterSeconds }
      }
      return failure
    }

    try {
      return { ok: true, data: (await response.json()) as unknown }
    } catch {
      return describeZernioFailure("malformed")
    }
  } finally {
    clearTimeout(timer)
  }
}

export type AccountsSnapshot = {
  accounts: ZernioAccount[]
  /** Upstream implementation note. */
  hasAnalyticsAccess: boolean | null
}

/** Upstream implementation note. */
export async function listAccounts(
  deps: ZernioDeps
): Promise<ZernioResult<AccountsSnapshot>> {
  const profileId = deps.config.configured ? deps.config.profileId : null

  const response = await zernioRequest(
    "/accounts",
    { query: { profileId, limit: 100, page: 1 } },
    deps
  )
  if (!response.ok) return response

  const accounts = parseAccountsPayload(response.data)
  if (accounts === null) return describeZernioFailure("malformed")

  return {
    ok: true,
    data: { accounts, hasAnalyticsAccess: parseAnalyticsAccess(response.data) },
  }
}

// ------------------------------------------------------------
// Inbox
// ------------------------------------------------------------

export type ConversationPage = {
  conversations: NormalizedConversation[]
  nextCursor: string | null
}

/** Upstream implementation note. */
export async function listConversations(
  deps: ZernioDeps,
  options: { accountId?: string; cursor?: string; limit?: number } = {}
): Promise<ZernioResult<ConversationPage>> {
  const profileId = deps.config.configured ? deps.config.profileId : null

  const response = await zernioRequest(
    "/inbox/conversations",
    {
      query: {
        profileId,
        accountId: options.accountId,
        cursor: options.cursor,
        limit: options.limit ?? 50,
      },
    },
    deps
  )
  if (!response.ok) return response

  const list = parseListPayload(response.data, "data", "conversations")
  if (list === null) return describeZernioFailure("malformed")

  const root = response.data as { pagination?: { nextCursor?: string | null } } | null

  return {
    ok: true,
    data: {
      conversations: list
        .map(normalizeRestConversation)
        .filter((item): item is NormalizedConversation => item !== null),
      nextCursor: root?.pagination?.nextCursor ?? null,
    },
  }
}

export type MessagePage = {
  messages: NormalizedMessage[]
  nextCursor: string | null
}

export async function listMessages(
  deps: ZernioDeps,
  options: { conversationId: string; accountId: string; cursor?: string; limit?: number }
): Promise<ZernioResult<MessagePage>> {
  const response = await zernioRequest(
    `/inbox/conversations/${encodeURIComponent(options.conversationId)}/messages`,
    {
      query: {
        accountId: options.accountId,
        cursor: options.cursor,
        limit: options.limit ?? 50,
      },
    },
    deps
  )
  if (!response.ok) return response

  const list = parseListPayload(response.data, "messages", "data")
  if (list === null) return describeZernioFailure("malformed")

  const root = response.data as { pagination?: { nextCursor?: string | null } } | null

  return {
    ok: true,
    data: {
      messages: list
        .map(normalizeRestMessage)
        .filter((item): item is NormalizedMessage => item !== null),
      nextCursor: root?.pagination?.nextCursor ?? null,
    },
  }
}

/** Upstream implementation note. */
export async function sendMessage(
  deps: ZernioDeps,
  options: {
    conversationId: string
    accountId: string
    body: string
    idempotencyKey: string
  }
): Promise<ZernioResult<{ messageId: string | null }>> {
  const response = await zernioRequest(
    `/inbox/conversations/${encodeURIComponent(options.conversationId)}/messages`,
    {
      method: "POST",
      body: { accountId: options.accountId, message: options.body },
      idempotencyKey: options.idempotencyKey,
    },
    deps
  )
  if (!response.ok) return response

  const root = response.data as
    | { data?: { messageId?: string }; messageId?: string }
    | null

  return {
    ok: true,
    data: { messageId: root?.data?.messageId ?? root?.messageId ?? null },
  }
}

// ------------------------------------------------------------
// Conectar cuentas
// ------------------------------------------------------------

/** Upstream implementation note. */
export async function getConnectUrl(
  deps: ZernioDeps,
  platform: "whatsapp" | "instagram",
  redirectUrl: string
): Promise<ZernioResult<{ authUrl: string }>> {
  const profileId = deps.config.configured ? deps.config.profileId : null
  const response = await zernioRequest(`/connect/${platform}`, { query: { profileId, redirect_url: redirectUrl } }, deps)
  if (!response.ok) return response
  const authUrl = (response.data as { authUrl?: unknown } | null)?.authUrl
  return typeof authUrl === "string" && authUrl.startsWith("https://")
    ? { ok: true, data: { authUrl } }
    : describeZernioFailure("malformed")
}
