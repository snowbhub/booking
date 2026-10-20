import { afterEach, describe, expect, it } from "vitest"
import { at, dayKey, hm, setTimeZone, TZ } from "@/lib/time"

const originalTimezone = TZ
afterEach(() => setTimeZone(originalTimezone))

describe("configurable business timezone", () => {
  it("uses the selected IANA zone for wall-clock booking times", () => {
    setTimeZone("Europe/Kyiv")
    const start = at("2026-06-01", "09:30")
    expect(start.toISOString()).toBe("2026-06-01T06:30:00.000Z")
    expect(hm(start)).toBe("09:30")
  })

  it("applies winter and summer offsets from the IANA timezone database", () => {
    setTimeZone("Europe/Kyiv")
    expect(at("2026-01-15", "09:00").toISOString()).toBe("2026-01-15T07:00:00.000Z")
    expect(at("2026-07-15", "09:00").toISOString()).toBe("2026-07-15T06:00:00.000Z")
  })

  it("recalculates formatters when the saved timezone changes", () => {
    const instant = new Date("2026-01-01T23:30:00.000Z")
    setTimeZone("Europe/Berlin")
    expect(dayKey(instant)).toBe("2026-01-02")
    expect(hm(instant)).toBe("00:30")
    setTimeZone("America/New_York")
    expect(dayKey(instant)).toBe("2026-01-01")
    expect(hm(instant)).toBe("18:30")
  })
})
