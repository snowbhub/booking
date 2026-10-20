/** Upstream implementation note. */

export let TZ = process.env.NEXT_PUBLIC_BOOKING_TIME_ZONE || "Europe/Berlin"

export function setTimeZone(value: string): void {
  const zone = String(value || "").trim()
  // Intl validates IANA names and rejects arbitrary offsets / invalid input.
  new Intl.DateTimeFormat("en", { timeZone: zone })
  TZ = zone
}

const dayKeyFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})
const hmFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
})

type DateLike = Date | string | number

const toDate = (d: DateLike) => (d instanceof Date ? d : new Date(d))

export function dayKey(d: DateLike = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit",
  }).format(toDate(d))
}

/** "14:30" en hora argentina. */
export function hm(d: DateLike): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).format(toDate(d))
}

/** Upstream implementation note. */
export function minutesOfDay(d: DateLike): number {
  const [h, m] = hm(d).split(":").map(Number)
  return h * 60 + m
}

export function hmToMinutes(value: string): number {
  const [h, m] = value.split(":").map(Number)
  return h * 60 + m
}

export function minutesToHm(total: number): string {
  const h = Math.floor(total / 60)
  const m = total % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

/** Upstream implementation note. */
export function at(day: string, time: string): Date {
  const desired = new Date(day + "T" + time + ":00Z").getTime()
  let instant = desired
  const partsAt = (timestamp: number) => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date(timestamp))
    const map = Object.fromEntries(parts.map(p => [p.type,p.value]))
    return Date.UTC(Number(map.year),Number(map.month)-1,Number(map.day),Number(map.hour),Number(map.minute),Number(map.second))
  }
  for (let i = 0; i < 3; i++) instant += desired-partsAt(instant)
  return new Date(instant)
}

export function addDays(day: string, n: number): string {
  const d = new Date(day + "T12:00:00Z")
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0,10)
}

/** Upstream implementation note. */
export function weekday(day: string): number {
  return new Date(day + "T12:00:00Z").getUTCDay()
}

export function monthKey(day: string): string {
  return day.slice(0, 7)
}

export function daysInMonth(month: string): number {
  const [y, m] = month.split("-").map(Number)
  return new Date(Date.UTC(y, m, 0)).getUTCDate()
}

export function addMonths(month: string, n: number): string {
  const [y, m] = month.split("-").map(Number)
  const d = new Date(Date.UTC(y, m - 1 + n, 1))
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`
}

const longFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ,
  weekday: "long",
  day: "numeric",
  month: "long",
})
const shortFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ,
  weekday: "short",
  day: "numeric",
  month: "short",
})
const monthFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ,
  month: "long",
  year: "numeric",
})

/** "jueves 17 de septiembre" */
export function formatDayLong(day: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: TZ, weekday: "long", day: "numeric", month: "long",
  }).format(at(day, "12:00")).replace(/^(\S+)\s+(\d{1,2})/, "$1, $2")
}

/** "jue 17 sept" */
export function formatDayShort(day: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: TZ, weekday: "short", day: "numeric", month: "short",
  }).format(at(day, "12:00")).replace(/\./g, "")
}

/** "septiembre de 2026" */
export function formatMonth(month: string): string {
  return new Intl.DateTimeFormat("es-AR", { timeZone: TZ, month: "long", year: "numeric" }).format(at(month + "-15", "12:00"))
}

export const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

/** Upstream implementation note. */
export function timeAgo(d: DateLike, now: Date = new Date()): string {
  const diffMin = Math.round((now.getTime() - toDate(d).getTime()) / 60000)
  if (diffMin < 1) return "now"
  if (diffMin < 60) return String(diffMin) + " min ago"
  const today = dayKey(now)
  const day = dayKey(d)
  if (day === today) return hm(d)
  if (day === addDays(today, -1)) return "yesterday"
  const [, m, dd] = day.split("-")
  return `${dd}/${m}`
}

/** Upstream implementation note. */
export function weekStart(day: string): string {
  const wd = weekday(day) // 0 = domingo
  return addDays(day, wd === 0 ? -6 : 1 - wd)
}

/** "13 – 19 de julio" / "28 de julio – 3 de agosto" */
export function formatWeekRange(start: string): string {
  const end = addDays(start, 6)
  const dm = (d: string, withMonth: boolean) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: TZ, day: "numeric", ...(withMonth ? { month: "long" } : {}) }).format(at(d, "12:00"))
  return monthKey(start) === monthKey(end) ? `${dm(start, false)} – ${dm(end, true)}` : `${dm(start, true)} – ${dm(end, true)}`
}
