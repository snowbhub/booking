import { afterEach, describe, expect, it, vi } from "vitest"
import { isValidSession, passwordMatches, sessionToken } from "./session"

afterEach(() => vi.unstubAllEnvs())

describe("login simple del panel", () => {
  it("upstream behavior 1", () => {
    vi.stubEnv("PANEL_PASSWORD", "correcta")
    expect(isValidSession(sessionToken("correcta"))).toBe(true)
    expect(isValidSession(sessionToken("otra"))).toBe(false)
    expect(isValidSession(undefined)).toBe(false)
  })

  it("upstream behavior 2", () => {
    const vieja = sessionToken("vieja")
    vi.stubEnv("PANEL_PASSWORD", "nueva")
    expect(isValidSession(vieja)).toBe(false)
  })

  it("upstream behavior 3", () => {
    vi.stubEnv("PANEL_PASSWORD", "")
    vi.stubEnv("NODE_ENV", "production")
    expect(isValidSession(undefined)).toBe(false)
    expect(passwordMatches("")).toBe(false)
  })

  it("upstream behavior 4", () => {
    vi.stubEnv("PANEL_PASSWORD", "")
    vi.stubEnv("NODE_ENV", "development")
    expect(isValidSession(undefined)).toBe(true)
  })

  it("upstream behavior 5", () => {
    vi.stubEnv("PANEL_PASSWORD", "Booking2026")
    expect(passwordMatches("Booking2026")).toBe(true)
    expect(passwordMatches("booking2026")).toBe(false)
  })
})
