import { createHash, createHmac, timingSafeEqual } from "node:crypto"

/** Upstream implementation note. */

export const PANEL_COOKIE = "booking_panel"
export const SESSION_DAYS = 30

export const panelPassword = () => process.env.PANEL_PASSWORD?.trim() || null

export function sessionToken(password: string) {
  return createHmac("sha256", password).update("booking-panel-v1").digest("hex")
}

/** Upstream implementation note. */
export function isValidSession(cookie: string | undefined): boolean {
  const password = panelPassword()
  if (!password) return process.env.NODE_ENV !== "production"
  return !!cookie && safeEqual(cookie, sessionToken(password))
}

export function passwordMatches(input: string): boolean {
  const password = panelPassword()
  return !!password && safeEqual(input, password)
}

/** Upstream implementation note. */
function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest()
  const hb = createHash("sha256").update(b).digest()
  return timingSafeEqual(ha, hb)
}
