import { describe, expect, it } from "vitest"
import { checkManualBooking, checkStaffTransfer, earlyFinishEnd, freeSlots, freeSlotsAnyStaff, isOpen, offHoursFor, placeFinishedWalkIn, worksOn } from "./slots"
import { at } from "@/lib/time"
import type { Appointment, Staff } from "./types"

// Upstream implementation note.
const DAY = "2026-09-18"
const corte = { id: "sv-corte", durationMin: 40 }
const leo = { id: "st-leo", skipsServiceIds: [] as string[] }
// Upstream implementation note.
const fine = { stepMin: 15 }

const appt = (from: string, to: string, status: Appointment["status"] = "confirmado"): Appointment => ({
  id: from, clientId: "c", staffId: "st-leo", serviceId: "sv-corte",
  startsAt: at(DAY, from).toISOString(), endsAt: at(DAY, to).toISOString(),
  status, source: "panel", price: 0, notes: null, conversationId: null, holdExpiresAt: null, createdAt: "",
})

const early = new Date("2026-09-17T12:00:00-03:00")

describe("upstream behavior 1", () => {
  const staff = ["st-santi", "st-seba", "st-nemo"].map((id) => ({ id, skipsServiceIds: [] as string[] }))
  const base = { day: DAY, service: { id: "sv-corte", durationMin: 60 }, staff, appointments: [] as Appointment[], now: early, stepMin: 60 }

  it("upstream behavior 2", () => {
    const slots = freeSlotsAnyStaff(base)
    expect(new Set(slots.slice(0, 3).map((slot) => slot.staffId)).size).toBe(3)
  })

  it("prioriza a quien tiene menos minutos ocupados that day", () => {
    const busy = { ...appt("11:00", "12:00"), staffId: "st-santi" }
    const choice = freeSlotsAnyStaff({ ...base, appointments: [busy] }).find((slot) => slot.time === "12:00")
    expect(choice?.staffId).not.toBe("st-santi")
  })
})

describe("upstream behavior 3", () => {
  const source = { ...appt("15:00", "16:00"), staffId: "st-santi" }
  const target: Staff = {
    id: "st-seba", name: "Sebastián", role: "barbero", commissionPct: 50, active: true,
    skipsServiceIds: [], schedule: [{ weekday: 5, start: "11:00", end: "20:00" }], timeOff: [],
  }
  const check = (staff: Staff, appointments = [source]) => checkStaffTransfer({
    appointment: source, staff, service: { id: "sv-corte" }, appointments, now: early,
  })

  it("upstream behavior 4", () => {
    expect(check(target)).toEqual({ ok: true, warnings: [] })
  })

  it("upstream behavior 5", () => {
    const busy = { ...appt("15:30", "16:30"), id: "otro", staffId: target.id }
    expect(check(target, [source, busy]).ok).toBe(false)
  })

  it("upstream behavior 6", () => {
    expect(check({ ...target, timeOff: [{ startsAt: at(DAY, "14:00").toISOString(), endsAt: at(DAY, "17:00").toISOString() }] }).ok).toBe(false)
    expect(check({ ...target, schedule: [{ weekday: 5, start: "11:00", end: "14:00" }] }).ok).toBe(false)
  })

  it("upstream behavior 7", () => {
    expect(check({ ...target, skipsServiceIds: ["sv-corte"] }).ok).toBe(false)
  })
})

describe("freeSlots", () => {
  it("upstream behavior 8", () => {
    expect(isOpen("2026-09-20")).toBe(false) // domingo
    expect(freeSlots({ day: "2026-09-20", service: corte, staff: leo, appointments: [], now: early })).toEqual([])
  })

  it("upstream behavior 9", () => {
    const slots = freeSlots({ day: DAY, service: corte, staff: leo, appointments: [], now: early, ...fine })
    expect(slots[0]).toBe("11:00")
    expect(slots.at(-1)).toBe("19:15") // 19:15 + 40' = 19:55; 19:30 terminaría 20:10
  })

  it("upstream behavior 10", () => {
    const taken = freeSlots({ day: DAY, service: corte, staff: leo, appointments: [appt("15:00", "15:40")], now: early, ...fine })
    expect(taken).not.toContain("15:00")
    expect(taken).not.toContain("14:30") // 14:30–15:10 pisa el de las 15
    expect(taken).toContain("14:15")
    expect(taken).toContain("15:45")
    const cancelled = freeSlots({ day: DAY, service: corte, staff: leo, appointments: [appt("15:00", "15:40", "cancelado")], now: early, ...fine })
    expect(cancelled).toContain("15:00")
  })

  it("upstream behavior 11", () => {
    const now = new Date("2026-09-18T16:40:00-03:00")
    const slots = freeSlots({ day: DAY, service: corte, staff: leo, appointments: [], now, leadMin: 30, ...fine })
    expect(slots[0]).toBe("17:15")
  })

  it("upstream behavior 12", () => {
    const hora = { id: "sv-corte", durationMin: 60 }
    const slots = freeSlots({ day: DAY, service: hora, staff: leo, appointments: [appt("15:00", "16:00")], now: early })
    expect(slots).toEqual(["11:00", "12:00", "13:00", "14:00", "16:00", "17:00", "18:00", "19:00"])
  })

  it("el intervalo es configurable: con 45 minutos arrancan a las 11:00, 11:45, 12:30…", () => {
    const turno45 = { id: "sv-corte", durationMin: 45 }
    const slots = freeSlots({ day: DAY, service: turno45, staff: leo, appointments: [], now: early, stepMin: 45 })
    expect(slots.slice(0, 4)).toEqual(["11:00", "11:45", "12:30", "13:15"])
    expect(slots.at(-1)).toBe("19:15") // 19:15 + 45' = 20:00, justo al cierre
  })

  it("con 30 minutos hay el doble de horarios que con 60", () => {
    const hora = { id: "sv-corte", durationMin: 60 }
    const cada60 = freeSlots({ day: DAY, service: hora, staff: leo, appointments: [], now: early, stepMin: 60 })
    const cada30 = freeSlots({ day: DAY, service: hora, staff: leo, appointments: [], now: early, stepMin: 30 })
    expect(cada60).toHaveLength(9) // 11:00 a 19:00
    expect(cada30).toHaveLength(17) // 11:00, 11:30 … 19:00
    expect(cada30).toContain("11:30")
  })

  it("upstream behavior 13", () => {
    const hora = { id: "sv-corte", durationMin: 60 }
    // Viernes 18/09 = 5. Trabaja 14 a 18 that day; el jueves (4) no tiene franjas.
    const parcial = { ...leo, schedule: [{ weekday: 5, start: "14:00", end: "18:00" }] }
    expect(freeSlots({ day: DAY, service: hora, staff: parcial, appointments: [], now: early })).toEqual(["14:00", "15:00", "16:00", "17:00"])
    expect(freeSlots({ day: "2026-09-17", service: hora, staff: parcial, appointments: [], now: new Date("2026-09-16T12:00:00-03:00") })).toEqual([])
  })

  it("upstream behavior 14", () => {
    const hora = { id: "sv-corte", durationMin: 60 }
    const turnoMedico = { ...leo, timeOff: [{ startsAt: at(DAY, "12:30").toISOString(), endsAt: at(DAY, "14:00").toISOString() }] }
    const slots = freeSlots({ day: DAY, service: hora, staff: turnoMedico, appointments: [], now: early })
    expect(slots).not.toContain("12:00") // 12–13 pisa 12:30
    expect(slots).not.toContain("13:00")
    expect(slots).toContain("14:00")
    const vacaciones = { ...leo, timeOff: [{ startsAt: at("2026-09-15", "00:00").toISOString(), endsAt: at("2026-09-20", "00:00").toISOString() }] }
    expect(freeSlots({ day: DAY, service: hora, staff: vacaciones, appointments: [], now: early })).toEqual([])
  })

  it("upstream behavior 15", () => {
    expect(worksOn({ schedule: undefined }, DAY)).toBe(true) // sin horario propio: el del local
    expect(worksOn({ schedule: [{ weekday: 2, start: "11:00", end: "20:00" }] }, DAY)).toBe(false) // sólo martes
    const franco = { timeOff: [{ startsAt: at(DAY, "00:00").toISOString(), endsAt: at("2026-09-19", "00:00").toISOString() }] }
    expect(worksOn(franco, DAY)).toBe(false)
    const mediodia = { timeOff: [{ startsAt: at(DAY, "12:00").toISOString(), endsAt: at(DAY, "14:00").toISOString() }] }
    expect(worksOn(mediodia, DAY)).toBe(true)
  })

  it("upstream behavior 16", () => {
    const thiago = { id: "st-thiago", skipsServiceIds: ["sv-color"] }
    expect(freeSlots({ day: DAY, service: { id: "sv-color", durationMin: 120 }, staff: thiago, appointments: [], now: early })).toEqual([])
  })
})

describe("upstream behavior 17", () => {
  // Viernes: 11 a 14 y 15 a 20. Entre medio no atiende.
  const partido = {
    id: "st-leo",
    skipsServiceIds: [] as string[],
    schedule: [
      { weekday: 5, start: "11:00", end: "14:00" },
      { weekday: 5, start: "15:00", end: "20:00" },
    ],
  }
  const hora = { id: "sv-corte", durationMin: 60 }

  it("upstream behavior 18", () => {
    const slots = freeSlots({ day: DAY, service: hora, staff: partido, appointments: [], now: early, stepMin: 30 })
    expect(slots).toContain("13:00") // 13:00–14:00 entra justo
    expect(slots).not.toContain("13:30") // terminaría 14:30, en pleno corte
    expect(slots).not.toContain("14:00")
    expect(slots).not.toContain("14:30")
    expect(slots).toContain("15:00")
  })

  it("upstream behavior 19", () => {
    expect(worksOn(partido, DAY)).toBe(true)
  })
})

describe("upstream behavior 20", () => {
  const de45 = { id: "sv-corte", durationMin: 45 }

  it("upstream behavior 21", () => {
    const slots = freeSlots({ day: DAY, service: de45, staff: leo, appointments: [appt("17:00", "17:45")], now: early, stepMin: 60 })
    expect(slots).toContain("17:45")
    expect(slots).toContain("18:00") // y la grilla de siempre sigue
    expect(slots).not.toContain("17:00")
  })

  it("upstream behavior 22", () => {
    const slots = freeSlots({ day: DAY, service: de45, staff: leo, appointments: [], now: early, stepMin: 60 })
    expect(slots).not.toContain("17:45")
  })

  it("upstream behavior 23", () => {
    const slots = freeSlots({ day: DAY, service: de45, staff: leo, appointments: [appt("18:30", "19:30")], now: early, stepMin: 60 })
    expect(slots).not.toContain("19:30") // 19:30 + 45 = 20:15, pasado el cierre
  })
})

describe("upstream behavior 24", () => {
  const seba = { id: "st-leo", name: "Seba", skipsServiceIds: [] as string[], schedule: undefined, timeOff: undefined as { startsAt: string; endsAt: string }[] | undefined }
  const svc = { id: "sv-corte" }
  const base = { day: DAY, service: svc, staff: seba, appointments: [] as Appointment[], now: early }

  it("acepta 17:15 por 45 minutos: no hace falta que caiga en la grilla", () => {
    expect(checkManualBooking({ ...base, time: "17:15", durationMin: 45 })).toEqual({ ok: true, warnings: [] })
  })

  it("upstream behavior 25", () => {
    const r = checkManualBooking({ ...base, appointments: [appt("17:00", "17:45")], time: "17:30", durationMin: 45 })
    expect(r).toMatchObject({ ok: false })
    expect(r.ok === false && r.error).toContain("17:00 a 17:45")
  })

  it("upstream behavior 26", () => {
    expect(checkManualBooking({ ...base, appointments: [appt("17:00", "17:45")], time: "17:45", durationMin: 45 }).ok).toBe(true)
  })

  it("upstream behavior 27", () => {
    expect(checkManualBooking({ ...base, day: "2026-09-20", time: "12:00", durationMin: 60 }).ok).toBe(false) // domingo
    expect(checkManualBooking({ ...base, time: "19:30", durationMin: 60 }).ok).toBe(false) // termina 20:30
    expect(checkManualBooking({ ...base, time: "10:30", durationMin: 30 }).ok).toBe(false) // antes de abrir
  })

  it("upstream behavior 28", () => {
    const ahora = new Date("2026-09-18T16:40:00-03:00")
    expect(checkManualBooking({ ...base, now: ahora, time: "15:00", durationMin: 60 }).ok).toBe(false)
    expect(checkManualBooking({ ...base, now: ahora, time: "16:20", durationMin: 40 }).ok).toBe(true) // empezó hace 20 min
  })

  it("upstream behavior 29", () => {
    const partido = { ...seba, schedule: [{ weekday: 5, start: "11:00", end: "14:00" }, { weekday: 5, start: "15:00", end: "20:00" }] }
    const r = checkManualBooking({ ...base, staff: partido, time: "14:15", durationMin: 30 })
    expect(r.ok).toBe(true)
    expect(r.ok && r.warnings[0]).toContain("no trabaja in that time range")
    expect(r.ok && r.warnings[0]).toContain("11:00 a 14:00 y 15:00 a 20:00")
  })

  it("upstream behavior 30", () => {
    const conFijo = { ...seba, timeOff: [{ startsAt: at(DAY, "18:00").toISOString(), endsAt: at(DAY, "19:00").toISOString() }] }
    const r = checkManualBooking({ ...base, staff: conFijo, time: "18:00", durationMin: 60 })
    expect(r.ok).toBe(true)
    expect(r.ok && r.warnings.join(" ")).toContain("time off or a fixed booking")
  })

  it("upstream behavior 31", () => {
    expect(checkManualBooking({ ...base, staff: { ...seba, skipsServiceIds: ["sv-corte"] }, time: "12:00", durationMin: 60 }).ok).toBe(false)
  })
})

describe("upstream behavior 32", () => {
  const hm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`
  const view = (r: [number, number][]) => r.map(([a, b]) => `${hm(a)}-${hm(b)}`)

  it("upstream behavior 33", () => {
    expect(offHoursFor({ schedule: undefined }, DAY)).toEqual([])
  })

  it("upstream behavior 34", () => {
    const s = { schedule: [{ weekday: 5, start: "11:00", end: "14:00" }, { weekday: 5, start: "15:00", end: "20:00" }] }
    expect(view(offHoursFor(s, DAY))).toEqual(["14:00-15:00"])
  })

  it("si entra tarde y sale temprano, se marcan los dos extremos", () => {
    const s = { schedule: [{ weekday: 5, start: "12:30", end: "18:00" }] }
    expect(view(offHoursFor(s, DAY))).toEqual(["11:00-12:30", "18:00-20:00"])
  })

  it("upstream behavior 35", () => {
    const s = { schedule: [{ weekday: 2, start: "11:00", end: "20:00" }] } // sólo los martes; DAY es viernes
    expect(view(offHoursFor(s, DAY))).toEqual(["11:00-20:00"])
  })
})

describe("upstream behavior 36", () => {
  const hm = (d: Date) => new Intl.DateTimeFormat("es-AR", { timeZone: "America/Argentina/Buenos_Aires", hour: "2-digit", minute: "2-digit", hour12: false }).format(d)
  const place = (appointments: Appointment[], nowHm: string, durationMin = 60, day = DAY) => {
    const r = placeFinishedWalkIn({ now: at(day, nowHm), durationMin, staffId: "st-leo", appointments })
    return r && `${hm(r.startsAt)}-${hm(r.endsAt)}`
  }

  it("upstream behavior 37", () => {
    expect(place([], "12:35", 45)).toBe("11:50-12:35")
  })

  it("upstream behavior 38", () => {
    expect(place([appt("12:30", "13:30")], "12:35")).toBe("11:30-12:30")
  })

  it("upstream behavior 39", () => {
    expect(place([appt("11:00", "11:50"), appt("12:30", "13:30")], "12:35")).toBe("11:50-12:30")
  })

  it("upstream behavior 40", () => {
    expect(place([appt("11:00", "12:30"), appt("12:30", "13:30")], "12:35")).toBeNull()
  })

  it("un hueco de menos de 10 minutos no alcanza", () => {
    expect(place([appt("11:00", "12:25"), appt("12:30", "13:30")], "12:35")).toBeNull()
  })

  it("upstream behavior 41", () => {
    expect(place([appt("11:00", "12:30", "cancelado")], "12:35", 45)).toBe("11:50-12:35")
  })

  it("upstream behavior 42", () => {
    // Upstream implementation note.
    expect(place([appt("12:45", "14:00")], "14:05")).toBeNull()
    // Upstream implementation note.
    expect(place([appt("12:45", "13:30")], "13:50", 30)).toBe("13:30-13:50")
  })

  it("upstream behavior 43", () => {
    expect(place([], "12:35", 60, "2026-09-20")).toBeNull() // domingo
  })

  it("upstream behavior 44", () => {
    expect(place([], "21:10", 45)).toBe("19:15-20:00")
  })

  it("si se carga a mano \"fue a las 11:50\", se acepta aunque ya haya pasado (allowPast)", () => {
    const seba = { id: "st-leo", name: "Seba", skipsServiceIds: [] as string[], schedule: undefined, timeOff: undefined as { startsAt: string; endsAt: string }[] | undefined }
    const base = { day: DAY, time: "11:50", durationMin: 40, service: { id: "sv" }, staff: seba, appointments: [] as Appointment[], now: at(DAY, "12:35") }
    expect(checkManualBooking(base).ok).toBe(false) // New booking: no deja cargar en el pasado
    expect(checkManualBooking({ ...base, allowPast: true }).ok).toBe(true)
  })
})

describe("upstream behavior 45", () => {
  const a = { startsAt: at(DAY, "12:30").toISOString(), endsAt: at(DAY, "13:30").toISOString() }
  const hm2 = (d: Date | null) => d && new Intl.DateTimeFormat("es-AR", { timeZone: "America/Argentina/Buenos_Aires", hour: "2-digit", minute: "2-digit", hour12: false }).format(d)

  it("upstream behavior 46", () => {
    expect(hm2(earlyFinishEnd(a, at(DAY, "13:00")))).toBe("13:00")
  })

  it("upstream behavior 47", () => {
    expect(earlyFinishEnd(a, at(DAY, "13:27"))).toBeNull()
    expect(earlyFinishEnd(a, at(DAY, "13:45"))).toBeNull()
  })

  it("upstream behavior 48", () => {
    expect(earlyFinishEnd(a, at(DAY, "12:00"))).toBeNull()
    expect(earlyFinishEnd(a, at(DAY, "12:32"))).toBeNull()
  })

  it("upstream behavior 49", () => {
    expect(earlyFinishEnd(a, at("2026-09-19", "13:00"))).toBeNull()
  })
})

describe("upstream behavior 50", () => {
  const seba = { id: "st-leo", name: "Seba", skipsServiceIds: [] as string[], schedule: undefined, timeOff: undefined as { startsAt: string; endsAt: string }[] | undefined }
  it("upstream behavior 51", () => {
    const r = checkManualBooking({ day: DAY, time: "13:00", durationMin: 30, service: { id: "sv" }, staff: seba, appointments: [appt("12:30", "13:30")], now: at(DAY, "12:50") })
    expect(r.ok === false && r.error).toContain("charge it or mark it completed")
  })
  it("upstream behavior 52", () => {
    const r = checkManualBooking({ day: DAY, time: "13:00", durationMin: 30, service: { id: "sv" }, staff: seba, appointments: [appt("13:00", "14:00")], now: at(DAY, "12:00") })
    expect(r.ok === false && r.error).not.toContain("cobralo")
  })
})
