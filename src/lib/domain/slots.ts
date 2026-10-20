import { BRAND } from "@/config/brand"
import { at, hmToMinutes, minutesOfDay, minutesToHm, dayKey, weekday } from "@/lib/time"
import type { Appointment, Service, Staff } from "./types"

/** Upstream implementation note. */

/** Estados que ocupan la silla. Un cancelado o un no-show liberan el hueco. */
const BLOCKING = new Set<Appointment["status"]>(["pendiente", "confirmado", "en_curso", "completado"])

export interface SlotQuery {
  day: string
  service: Pick<Service, "id" | "durationMin">
  staff: Pick<Staff, "id" | "skipsServiceIds" | "schedule" | "dateSchedule" | "timeOff" | "calendarOpen" | "calendarClose">
  appointments: Appointment[]
  /** Upstream implementation note. */
  stepMin?: number
  /** Upstream implementation note. */
  leadMin?: number
  now?: Date
}

/** Upstream implementation note. */
export function shiftsFor(staff: Pick<Staff, "schedule" | "dateSchedule" | "calendarOpen" | "calendarClose">, day: string): [number, number][] {
  const shopOpen = hmToMinutes(staff.calendarOpen ?? BRAND.openingHours.open)
  const shopClose = hmToMinutes(staff.calendarClose ?? BRAND.openingHours.close)
  const override = staff.dateSchedule?.find((entry) => entry.day === day)
  if (override) return override.works ? override.shifts.map((s) => [Math.max(shopOpen, hmToMinutes(s.start)), Math.min(shopClose, hmToMinutes(s.end))] as [number, number]).filter(([a,b])=>b>a) : []
  if (!staff.schedule) return [[shopOpen, shopClose]]
  const wd = weekday(day)
  return staff.schedule
    .filter((s) => s.weekday === wd)
    .map((s) => [Math.max(shopOpen, hmToMinutes(s.start)), Math.min(shopClose, hmToMinutes(s.end))] as [number, number])
    .filter(([a, b]) => b > a)
    .sort((a, b) => a[0] - b[0])
}

/** Upstream implementation note. */
export function offHoursFor(staff: Pick<Staff, "schedule" | "dateSchedule" | "calendarOpen" | "calendarClose">, day: string): [number, number][] {
  const open = hmToMinutes(BRAND.openingHours.open)
  const close = hmToMinutes(BRAND.openingHours.close)
  const off: [number, number][] = []
  let cursor = open
  for (const [a, b] of shiftsFor(staff, day)) {
    if (a > cursor) off.push([cursor, a])
    cursor = Math.max(cursor, b)
  }
  if (cursor < close) off.push([cursor, close])
  return off
}

/** Upstream implementation note. */
export function worksOn(staff: Pick<Staff, "schedule" | "dateSchedule" | "timeOff" | "calendarOpen" | "calendarClose">, day: string): boolean {
  const override = staff.dateSchedule?.find((entry) => entry.day === day)
  if (override) return override.works && shiftsFor(staff, day).length > 0 && !staff.timeOff?.some((t)=>new Date(t.startsAt)<at(day,"23:59")&&new Date(t.endsAt)>at(day,"00:00"))
  if (!isOpen(day)) return false
  const shifts = shiftsFor(staff, day)
  if (!shifts.length) return false
  const dayStart = at(day, "00:00").getTime()
  const off = (staff.timeOff ?? []).map((t) => [(new Date(t.startsAt).getTime() - dayStart) / 60_000, (new Date(t.endsAt).getTime() - dayStart) / 60_000])
  return shifts.some(([a, b]) => !off.some(([s, e]) => s <= a && e >= b))
}

export function isOpen(day: string): boolean {
  return (BRAND.openingHours.days as readonly number[]).includes(weekday(day))
}

export function freeSlots({
  day,
  service,
  staff,
  appointments,
  stepMin = BRAND.booking.slotStepMin,
  leadMin = 30,
  now = new Date(),
}: SlotQuery): string[] {
  if (!isOpen(day) && !staff.dateSchedule?.some((entry) => entry.day === day && entry.works)) return []
  if (staff.skipsServiceIds.includes(service.id)) return []

  const busy = appointments
    .filter((a) => a.staffId === staff.id && BLOCKING.has(a.status) && dayKey(a.startsAt) === day)
    .map((a) => [minutesOfDay(a.startsAt), minutesOfDay(a.endsAt)] as const)

  // Upstream implementation note.
  const dayStart = at(day, "00:00").getTime()
  const off = (staff.timeOff ?? [])
    .map((t) => [(new Date(t.startsAt).getTime() - dayStart) / 60_000, (new Date(t.endsAt).getTime() - dayStart) / 60_000] as const)
    .filter(([s, e]) => e > 0 && s < 24 * 60)

  const earliest = day === dayKey(now) ? minutesOfDay(now) + leadMin : -Infinity

  const slots: string[] = []
  for (const [open, close] of shiftsFor(staff, day)) {
    // Upstream implementation note.
    // Upstream implementation note.
    // que termina 17:45 deja muerto hastat 18:00: el hueco de 15 minutos
    // Upstream implementation note.
    // Upstream implementation note.
    const starts = new Set<number>()
    for (let start = open; start + service.durationMin <= close; start += stepMin) starts.add(start)
    for (const [, e] of [...busy, ...off]) {
      const start = Math.round(e)
      if (start > open && start + service.durationMin <= close) starts.add(start)
    }
    for (const start of [...starts].sort((a, b) => a - b)) {
      if (start < earliest) continue
      const end = start + service.durationMin
      const collides = busy.some(([s, e]) => start < e && end > s) || off.some(([s, e]) => start < e && end > s)
      if (!collides) slots.push(minutesToHm(start))
    }
  }
  return slots
}

export interface ManualBookingQuery {
  day: string
  time: string
  durationMin: number
  service: Pick<Service, "id">
  staff: Pick<Staff, "id" | "name" | "skipsServiceIds" | "schedule" | "dateSchedule" | "timeOff" | "calendarOpen" | "calendarClose">
  appointments: Appointment[]
  now?: Date
  /** Upstream implementation note. */
  pastGraceMin?: number
  /** Upstream implementation note. */
  allowPast?: boolean
  allowOverlap?: boolean
}

export type ManualBookingCheck = { ok: true; warnings: string[] } | { ok: false; error: string }

const fmtRange = ([a, b]: [number, number]) => `${minutesToHm(a)} a ${minutesToHm(b)}`

/** Upstream implementation note. */
export function checkManualBooking(q: ManualBookingQuery): ManualBookingCheck {
  const { day, time, durationMin, staff, service, appointments, now = new Date(), pastGraceMin = 30, allowPast = false } = q
  if (!isOpen(day)) return { ok: false, error: "The business is closed on that day." }
  if (staff.skipsServiceIds.includes(service.id)) return { ok: false, error: `${staff.name} does not provide this service.` }

  const shopOpen = hmToMinutes(staff.calendarOpen ?? BRAND.openingHours.open)
  const shopClose = hmToMinutes(staff.calendarClose ?? BRAND.openingHours.close)
  const start = hmToMinutes(time)
  const end = start + durationMin
  if (!(durationMin > 0)) return { ok: false, error: "Duration must be greater than zero." }
  if (start < shopOpen || end > shopClose) {
    return { ok: false, error: `That booking falls outside business hours (${BRAND.openingHours.open} a ${BRAND.openingHours.close}).` }
  }
  const today = dayKey(now)
  if (!allowPast && (day < today || (day === today && start < minutesOfDay(now) - pastGraceMin))) return { ok: false, error: "That time has already passed." }

  const clash = appointments
    .filter((a) => a.staffId === staff.id && BLOCKING.has(a.status) && dayKey(a.startsAt) === day)
    .find((a) => start < minutesOfDay(a.endsAt) && end > minutesOfDay(a.startsAt))
  if (clash && !q.allowOverlap) {
    // Upstream implementation note.
    const hint = new Date(clash.startsAt).getTime() <= now.getTime() ? " If it has already ended, charge it or mark it completed to free the time slot." : ""
    return { ok: false, error: `${staff.name} already has a booking from ${fmtRange([minutesOfDay(clash.startsAt), minutesOfDay(clash.endsAt)])}.${hint}` }
  }

  const warnings: string[] = []
  const shifts = shiftsFor(staff, day)
  if (!shifts.some(([a, b]) => start >= a && end <= b)) {
    warnings.push(
      shifts.length
        ? `${staff.name} no trabaja in that time range (that day atiende ${shifts.map(fmtRange).join(" y ")}).`
        : `${staff.name} no trabaja on that day.`
    )
  }
  const dayStart = at(day, "00:00").getTime()
  const inOff = (staff.timeOff ?? []).some((t) => {
    const s = (new Date(t.startsAt).getTime() - dayStart) / 60_000
    const e = (new Date(t.endsAt).getTime() - dayStart) / 60_000
    return start < e && end > s
  })
  if (inOff) warnings.push(`It overlaps with time off or a fixed booking for ${staff.name}.`)
  return { ok: true, warnings }
}

/** Upstream implementation note. */
export function freeSlotsAnyStaff(
  query: Omit<SlotQuery, "staff"> & { staff: Pick<Staff, "id" | "skipsServiceIds" | "schedule" | "timeOff">[] }
): { time: string; staffId: string }[] {
  const byTime = new Map<string, string[]>()
  for (const member of query.staff) {
    for (const time of freeSlots({ ...query, staff: member })) {
      byTime.set(time, [...(byTime.get(time) ?? []), member.id])
    }
  }
  const minutesBooked = new Map(query.staff.map((member) => [
    member.id,
    query.appointments
      .filter((a) => a.staffId === member.id && BLOCKING.has(a.status) && dayKey(a.startsAt) === query.day)
      .reduce((sum, a) => sum + (new Date(a.endsAt).getTime() - new Date(a.startsAt).getTime()) / 60_000, 0),
  ]))
  const ids = query.staff.map((s) => s.id).sort()
  return [...byTime.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([time, available]) => {
      const offset = (Number(query.day.replaceAll("-", "")) + Math.floor(hmToMinutes(time) / (query.stepMin ?? BRAND.booking.slotStepMin))) % ids.length
      const staffId = available.sort((a, b) =>
        (minutesBooked.get(a) ?? 0) - (minutesBooked.get(b) ?? 0) ||
        ((ids.indexOf(a) - offset + ids.length) % ids.length) - ((ids.indexOf(b) - offset + ids.length) % ids.length)
      )[0]
      return { time, staffId }
    })
}

/** Upstream implementation note. */
export function checkStaffTransfer({ appointment, staff, service, appointments, now }: {
  appointment: Appointment
  staff: Staff
  service: Pick<Service, "id">
  appointments: Appointment[]
  now: Date
}): ManualBookingCheck {
  if (appointment.staffId === staff.id) return { ok: false, error: "The booking is already assigned to that staff member." }
  if (!["pendiente", "confirmado"].includes(appointment.status) || new Date(appointment.startsAt) <= now) {
    return { ok: false, error: "Only a booking that has not started can be moved." }
  }
  if (!staff.active) return { ok: false, error: `${staff.name} is not active.` }
  const check = checkManualBooking({
    day: dayKey(appointment.startsAt),
    time: minutesToHm(minutesOfDay(appointment.startsAt)),
    durationMin: (new Date(appointment.endsAt).getTime() - new Date(appointment.startsAt).getTime()) / 60_000,
    service,
    staff,
    appointments: appointments.filter((a) => a.id !== appointment.id),
    now,
  })
  if (!check.ok) return check
  if (check.warnings.length) return { ok: false, error: check.warnings[0] }
  return check
}

export function endOf(day: string, time: string, durationMin: number): Date {
  return new Date(at(day, time).getTime() + durationMin * 60_000)
}

/** Upstream implementation note. */
export function occupancy(appointments: Appointment[], staffCount: number, days: string[]): number {
  const openDays = days.filter(isOpen)
  const capacity =
    openDays.length *
    staffCount *
    (hmToMinutes(BRAND.openingHours.close) - hmToMinutes(BRAND.openingHours.open))
  if (capacity === 0) return 0
  const booked = appointments
    .filter((a) => BLOCKING.has(a.status) && openDays.includes(dayKey(a.startsAt)))
    .reduce((sum, a) => sum + (new Date(a.endsAt).getTime() - new Date(a.startsAt).getTime()) / 60000, 0)
  return Math.round((booked / capacity) * 100)
}

/** Upstream implementation note. */
export function placeFinishedWalkIn(q: {
  now: Date
  durationMin: number
  staffId: string
  appointments: Appointment[]
  lookbackMin?: number
  minGapMin?: number
  maxAgoMin?: number
}): { startsAt: Date; endsAt: Date } | null {
  const { now, durationMin, staffId, appointments, lookbackMin = 180, minGapMin = 10, maxAgoMin = 60 } = q
  const MIN = 60_000
  const day = dayKey(now)
  if (!isOpen(day)) return null
  const nowMs = Math.floor(now.getTime() / MIN) * MIN
  const open = at(day, BRAND.openingHours.open).getTime()
  const close = at(day, BRAND.openingHours.close).getTime()
  const to = Math.min(nowMs, close)
  const from = Math.max(nowMs - lookbackMin * MIN, open)
  if (to - from < minGapMin * MIN) return null

  // Upstream implementation note.
  const busy = appointments
    .filter((a) => a.staffId === staffId && BLOCKING.has(a.status))
    .map((a) => [Math.max(new Date(a.startsAt).getTime(), from), Math.min(new Date(a.endsAt).getTime(), to)] as [number, number])
    .filter(([s, e]) => e > s)
    .sort((a, b) => a[0] - b[0])
  const merged: [number, number][] = []
  for (const [s, e] of busy) {
    const last = merged.at(-1)
    if (last && s <= last[1]) last[1] = Math.max(last[1], e)
    else merged.push([s, e])
  }
  // Upstream implementation note.
  const gaps: [number, number][] = []
  let cursor = from
  for (const [s, e] of merged) {
    if (s > cursor) gaps.push([cursor, s])
    cursor = Math.max(cursor, e)
  }
  if (cursor < to) gaps.push([cursor, to])
  const gap = gaps.reverse().find(([s, e]) => e - s >= minGapMin * MIN && e >= to - maxAgoMin * MIN)
  if (!gap) return null
  const end = gap[1]
  const start = Math.max(gap[0], end - durationMin * MIN)
  return { startsAt: new Date(start), endsAt: new Date(end) }
}

/** Upstream implementation note. */
export function earlyFinishEnd(a: Pick<Appointment, "startsAt" | "endsAt">, now: Date, minSavedMin = 5, minDurationMin = 5): Date | null {
  const MIN = 60_000
  const n = Math.floor(now.getTime() / MIN) * MIN
  if (n < new Date(a.startsAt).getTime() + minDurationMin * MIN) return null
  if (n > new Date(a.endsAt).getTime() - minSavedMin * MIN) return null
  return new Date(n)
}
