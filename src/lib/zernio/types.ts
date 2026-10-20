/** Upstream implementation note. */

/** Upstream implementation note. */
export const SUPPORTED_PLATFORMS = [
  "whatsapp",
  "instagram",
  "facebook",
  "telegram",
] as const

export type SupportedPlatform = (typeof SUPPORTED_PLATFORMS)[number]
export type AccountPlatform = SupportedPlatform | "other"

/** Upstream implementation note. */
export type ZernioAccount = {
  zernioAccountId: string
  zernioProfileId: string | null
  platform: AccountPlatform
  username: string | null
  displayName: string | null
  profileUrl: string | null
  avatarUrl: string | null
  isActive: boolean
  followerCount: number | null
}

export const PLATFORM_LABELS: Record<AccountPlatform, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
  telegram: "Telegram",
  other: "Otra plataforma",
}

export function platformLabel(platform: string): string {
  return PLATFORM_LABELS[normalizePlatform(platform)]
}

/** Upstream implementation note. */
export function normalizePlatform(value: unknown): AccountPlatform {
  if (typeof value !== "string") return "other"
  const platform = value.trim().toLowerCase()
  return (SUPPORTED_PLATFORMS as readonly string[]).includes(platform)
    ? (platform as SupportedPlatform)
    : "other"
}

// ------------------------------------------------------------
// Upstream implementation note.
// ------------------------------------------------------------

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null
}

function asTrimmedString(value: unknown): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function asNonNegativeInt(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null
  const rounded = Math.trunc(value)
  return rounded >= 0 ? rounded : null
}

/** Upstream implementation note. */
function readProfileId(raw: Record<string, unknown>): string | null {
  const direct = asTrimmedString(raw.profileId)
  if (direct) return direct

  const nested = asRecord(raw.profileId)
  if (nested) return asTrimmedString(nested._id) ?? asTrimmedString(nested.id)

  return null
}

/** Upstream implementation note. */
export function normalizeAccount(input: unknown): ZernioAccount | null {
  const raw = asRecord(input)
  if (!raw) return null

  const zernioAccountId = asTrimmedString(raw._id) ?? asTrimmedString(raw.id)
  if (!zernioAccountId) return null

  return {
    zernioAccountId,
    zernioProfileId: readProfileId(raw),
    platform: normalizePlatform(raw.platform),
    username: asTrimmedString(raw.username),
    displayName: asTrimmedString(raw.displayName) ?? asTrimmedString(raw.name),
    profileUrl: asTrimmedString(raw.profileUrl),
    avatarUrl:
      asTrimmedString(raw.profilePicture) ?? asTrimmedString(raw.picture),
    // Upstream implementation note.
    // Upstream implementation note.
    // Upstream implementation note.
    isActive: raw.isActive !== false,
    followerCount: asNonNegativeInt(raw.followerCount),
  }
}

/** Upstream implementation note. */
export function parseAccountsPayload(payload: unknown): ZernioAccount[] | null {
  const candidates: unknown[] = []

  if (Array.isArray(payload)) {
    candidates.push(payload)
  } else {
    const root = asRecord(payload)
    if (root) {
      candidates.push(root.data, root.accounts)
      const data = asRecord(root.data)
      if (data) candidates.push(data.accounts, data.items)
    }
  }

  const list = candidates.find(Array.isArray)
  if (!list) return null

  return (list as unknown[])
    .map(normalizeAccount)
    .filter((account): account is ZernioAccount => account !== null)
}

/** Upstream implementation note. */
export function parseAnalyticsAccess(payload: unknown): boolean | null {
  const root = asRecord(payload)
  if (!root) return null

  if (typeof root.hasAnalyticsAccess === "boolean") return root.hasAnalyticsAccess

  const data = asRecord(root.data)
  if (data && typeof data.hasAnalyticsAccess === "boolean") {
    return data.hasAnalyticsAccess
  }

  return null
}
