import { describe, expect, it } from "vitest"
import { breakBetween, normalizeShifts, timeOptions, withAnotherRange } from "./schedule"

describe("opciones de hora", () => {
  it("upstream behavior 1", () => {
    const opts = timeOptions(5)
    expect(opts[0]).toBe("11:00")
    expect(opts[1]).toBe("11:05")
    expect(opts).toContain("17:15")
    expect(opts.at(-1)).toBe("20:00")
    expect(opts).toHaveLength(9 * 12 + 1)
  })

  it("se pueden pedir de 15 en 15", () => {
    expect(timeOptions(15).slice(0, 3)).toEqual(["11:00", "11:15", "11:30"])
  })
})

describe("upstream behavior 2", () => {
  it("upstream behavior 3", () => {
    const r = normalizeShifts([
      { weekday: 5, start: "15:00", end: "20:00" },
      { weekday: 5, start: "11:00", end: "14:00" },
    ])
    expect(r).toEqual({
      ok: true,
      shifts: [
        { weekday: 5, start: "11:00", end: "14:00" },
        { weekday: 5, start: "15:00", end: "20:00" },
      ],
    })
  })

  it("acepta minutos que no son en punto", () => {
    expect(normalizeShifts([{ weekday: 2, start: "11:15", end: "17:45" }]).ok).toBe(true)
  })

  it("upstream behavior 4", () => {
    const r = normalizeShifts([
      { weekday: 5, start: "11:00", end: "15:00" },
      { weekday: 5, start: "14:00", end: "20:00" },
    ])
    expect(r.ok).toBe(false)
  })

  it("dos franjas pegadas (una termina cuando empieza la otra) no se pisan", () => {
    expect(
      normalizeShifts([
        { weekday: 5, start: "11:00", end: "14:00" },
        { weekday: 5, start: "14:00", end: "20:00" },
      ]).ok
    ).toBe(true)
  })

  it("upstream behavior 5", () => {
    expect(
      normalizeShifts([
        { weekday: 2, start: "11:00", end: "20:00" },
        { weekday: 3, start: "11:00", end: "20:00" },
      ]).ok
    ).toBe(true)
  })

  it("upstream behavior 6", () => {
    expect(normalizeShifts([{ weekday: 2, start: "10:00", end: "14:00" }]).ok).toBe(false)
    expect(normalizeShifts([{ weekday: 2, start: "15:00", end: "21:00" }]).ok).toBe(false)
    expect(normalizeShifts([{ weekday: 2, start: "15:00", end: "14:00" }]).ok).toBe(false)
    expect(normalizeShifts([{ weekday: 2, start: "3pm", end: "5pm" }]).ok).toBe(false)
    expect(normalizeShifts([{ weekday: 9, start: "11:00", end: "14:00" }]).ok).toBe(false)
  })

  it("upstream behavior 7", () => {
    expect(normalizeShifts([])).toEqual({ ok: true, shifts: [] })
  })

  it("upstream behavior 8", () => {
    expect(breakBetween({ start: "11:00", end: "14:00" }, { start: "15:00", end: "20:00" })).toEqual({ from: "14:00", to: "15:00" })
    expect(breakBetween({ start: "11:00", end: "14:00" }, { start: "14:00", end: "20:00" })).toBeNull()
  })
})

describe("upstream behavior 9", () => {
  it("upstream behavior 10", () => {
    expect(withAnotherRange([{ start: "11:00", end: "20:00" }])).toEqual([
      { start: "11:00", end: "14:00" },
      { start: "15:00", end: "20:00" },
    ])
  })

  it("si already has una franja corta (11 a 14), suma otra de 15 a 20", () => {
    expect(withAnotherRange([{ start: "11:00", end: "14:00" }])).toEqual([
      { start: "11:00", end: "14:00" },
      { start: "15:00", end: "20:00" },
    ])
  })

  it("upstream behavior 11", () => {
    expect(
      withAnotherRange([
        { start: "11:00", end: "12:00" },
        { start: "13:00", end: "14:00" },
        { start: "15:00", end: "16:00" },
      ])
    ).toBeNull()
  })

  it("upstream behavior 12", () => {
    expect(withAnotherRange([{ start: "18:00", end: "20:00" }])).toBeNull()
  })

  it("upstream behavior 13", () => {
    for (const r of [[{ start: "11:00", end: "20:00" }], [{ start: "11:00", end: "14:00" }], [{ start: "12:00", end: "20:00" }]]) {
      const next = withAnotherRange(r)!
      expect(normalizeShifts(next.map((x) => ({ weekday: 5, ...x }))).ok).toBe(true)
    }
  })
})
