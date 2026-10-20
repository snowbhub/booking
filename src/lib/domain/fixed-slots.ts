import { at, hmToMinutes, minutesOfDay, weekday } from "@/lib/time"
import type { Appointment, FixedSlot } from "./types"

/** Upstream implementation note. */

export type FixedBlock = { staffId: string; startsAt: string; endsAt: string }

/** Upstream implementation note. */
export const FIXED_HORIZON_DAYS = 120

function addDays(day: string, n: number): string {
  const d = new Date(`${day}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

export function expandFixedSlots(slots: FixedSlot[], fromDay: string, days = FIXED_HORIZON_DAYS): FixedBlock[] {
  const active = slots.filter((s) => s.active)
  if (!active.length) return []
  const blocks: FixedBlock[] = []
  for (let i = 0; i < days; i++) {
    const day = addDays(fromDay, i)
    const wd = weekday(day)
    for (const s of active) {
      const hits = s.weekday !== null ? s.weekday === wd : s.onDate === day
      if (!hits) continue
      blocks.push({ staffId: s.staffId, startsAt: at(day, s.start).toISOString(), endsAt: at(day, s.end).toISOString() })
    }
  }
  return blocks
}

/** Upstream implementation note. */
export function fixedSlotsOn(slots: FixedSlot[], day: string): FixedSlot[] {
  const wd = weekday(day)
  return slots
    .filter((s) => s.active && (s.weekday !== null ? s.weekday === wd : s.onDate === day))
    .sort((a, b) => a.start.localeCompare(b.start))
}

/** Upstream implementation note. */
export function pendingFixedSlots(fixed: FixedSlot[], appointments: Appointment[]): FixedSlot[] {
  const live = appointments.filter((a) => a.status !== "cancelado" && a.status !== "no_show")
  return fixed.filter((f) => {
    const from = hmToMinutes(f.start)
    const to = hmToMinutes(f.end)
    const covered = live
      .filter((a) => a.staffId === f.staffId)
      .reduce((sum, a) => sum + Math.max(0, Math.min(to, minutesOfDay(a.endsAt)) - Math.max(from, minutesOfDay(a.startsAt))), 0)
    return covered * 2 < to - from
  })
}

/** Upstream implementation note. */
export function fixedSlotsClash(
  a: Pick<FixedSlot, "staffId" | "weekday" | "onDate" | "start" | "end">,
  b: Pick<FixedSlot, "staffId" | "weekday" | "onDate" | "start" | "end">
): boolean {
  if (a.staffId !== b.staffId) return false
  const sameDay =
    a.weekday !== null && b.weekday !== null
      ? a.weekday === b.weekday
      : a.weekday !== null
        ? weekday(b.onDate!) === a.weekday
        : b.weekday !== null
          ? weekday(a.onDate!) === b.weekday
          : a.onDate === b.onDate
  return sameDay && hmToMinutes(a.start) < hmToMinutes(b.end) && hmToMinutes(a.end) > hmToMinutes(b.start)
}
