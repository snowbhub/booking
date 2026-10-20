import { describe, expect, it } from "vitest"
import { isTransientZernioFailure, outsideWhatsAppWindow, WHATSAPP_WINDOW_MS } from "./deliver"
import { describeZernioFailure } from "./client"

const now = new Date("2026-09-27T12:00:00-03:00")

describe("upstream behavior 1", () => {
  it("upstream behavior 2", () => {
    for (const code of ["rate_limited", "upstream", "timeout", "network"] as const) {
      expect(isTransientZernioFailure(describeZernioFailure(code))).toBe(true)
    }
  })

  it("upstream behavior 3", () => {
    for (const code of ["unauthorized", "forbidden", "not_found", "malformed", "unconfigured"] as const) {
      expect(isTransientZernioFailure(describeZernioFailure(code))).toBe(false)
    }
  })

  it("upstream behavior 4", () => {
    expect(isTransientZernioFailure({ ok: true, data: null })).toBe(false)
  })
})

describe("outsideWhatsAppWindow", () => {
  it("upstream behavior 5", () => {
    const conv = { channel: "whatsapp" as const, lastInboundAt: new Date(now.getTime() - 10 * 3_600_000).toISOString() }
    expect(outsideWhatsAppWindow(conv, now)).toBe(false)
  })

  it("pasadas las 24 h: hace falta plantilla", () => {
    const conv = { channel: "whatsapp" as const, lastInboundAt: new Date(now.getTime() - WHATSAPP_WINDOW_MS - 60_000).toISOString() }
    expect(outsideWhatsAppWindow(conv, now)).toBe(true)
  })

  it("upstream behavior 6", () => {
    expect(outsideWhatsAppWindow({ channel: "whatsapp", lastInboundAt: null }, now)).toBe(true)
  })

  it("Instagram no tiene ventana de 24 h", () => {
    expect(outsideWhatsAppWindow({ channel: "instagram", lastInboundAt: null }, now)).toBe(false)
  })
})
