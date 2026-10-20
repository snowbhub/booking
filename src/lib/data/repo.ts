import "server-only"
import { connection } from "next/server"
import { memoryStore } from "./store/memory"
import { postgresStore } from "./store/postgres"
import type { Snapshot, Store } from "./store/types"
import { expandFixedSlots } from "@/lib/domain/fixed-slots"
import { dayKey, setTimeZone } from "@/lib/time"

/** Upstream implementation note. */
export function store(): Store {
  if (process.env.DATABASE_URL) return postgresStore
  if (process.env.NODE_ENV !== "production" || process.env.DATA_SOURCE === "demo") return memoryStore
  throw new Error("Falta DATABASE_URL: el panel no tiene base de datos configurada.")
}

/** Upstream implementation note. */
export async function db(): Promise<Snapshot> {
  // Upstream implementation note.
  await connection()
  const s = await store().snapshot()
  setTimeZone(s.shopSettings.timezone || "Europe/Berlin")
  // Upstream implementation note.
  // Upstream implementation note.
  // Upstream implementation note.
  const blocks = expandFixedSlots(s.fixedSlots, dayKey(new Date(s.now)))
  return {
    ...s,
    staff: s.staff.map((m) => ({
      ...m,
      calendarOpen: s.shopSettings.calendarOpen,
      calendarClose: s.shopSettings.calendarClose,
      calendarStepMin: s.shopSettings.calendarStepMin,
      allowStaffOverlaps: s.shopSettings.allowStaffOverlaps,
      timeOff: [...(m.timeOff ?? []), ...blocks.filter((b) => b.staffId === m.id).map(({ startsAt, endsAt }) => ({ startsAt, endsAt }))],
    })),
  }
}

/** Upstream implementation note. */
export async function now(): Promise<Date> {
  return store().now()
}
