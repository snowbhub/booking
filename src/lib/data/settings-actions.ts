"use server"

import { revalidatePath } from "next/cache"
import { assertPanelSession } from "@/lib/auth/guard"
import { BRAND } from "@/config/brand"
import { at, dayKey, hmToMinutes, minutesOfDay } from "@/lib/time"
import { normalizeShifts } from "@/lib/domain/schedule"
import { fixedSlotsClash } from "@/lib/domain/fixed-slots"
import { db, now, store } from "./repo"
import type { ServiceCategory, WorkShift } from "@/lib/domain/types"

/** Upstream implementation note. */

type Result = { ok: true } | { ok: false; error: string }

const refresh = () => revalidatePath("/", "layout")
const HHMM = /^\d{2}:\d{2}$/
const DAY = /^\d{4}-\d{2}-\d{2}$/
const CATEGORIES: ServiceCategory[] = ["corte", "barba", "combo", "color", "extra"]
const DURATIONS = [15, 30, 45, 60, 90, 120]

export async function saveService(input: {
  id?: string
  name: string
  category: ServiceCategory
  durationMin: number
  price: number
  countsForLoyalty: boolean
  active: boolean
}): Promise<Result> {
  await assertPanelSession()
  const name = String(input.name ?? "").trim().slice(0, 60)
  const price = Math.round(Number(input.price))
  if (name.length < 2) return { ok: false, error: "Enter a service name." }
  if (!Number.isFinite(price) || price < 0 || price > 10_000_000) return { ok: false, error: "Check the price." }
  if (!DURATIONS.includes(input.durationMin)) return { ok: false, error: "Choose a duration." }
  if (!CATEGORIES.includes(input.category)) return { ok: false, error: "Invalid category." }
  if (input.id && !(await db()).services.some((s) => s.id === input.id)) return { ok: false, error: "Service not found." }
  await store().saveService({
    id: input.id,
    name,
    category: input.category,
    durationMin: input.durationMin,
    price,
    countsForLoyalty: !!input.countsForLoyalty,
    active: !!input.active,
  })
  refresh()
  return { ok: true }
}

export async function saveStaff(input: { id?: string; name: string; commissionPct: number; active: boolean }): Promise<Result> {
  await assertPanelSession()
  const name = String(input.name ?? "").trim().slice(0, 40)
  const commissionPct = Math.round(Number(input.commissionPct))
  if (name.length < 2) return { ok: false, error: "Enter a name." }
  if (!Number.isFinite(commissionPct) || commissionPct < 0 || commissionPct > 100) return { ok: false, error: "Commission must be between 0 and 100%." }
  const s = await db()
  const current = input.id ? s.staff.find((m) => m.id === input.id) : undefined
  if (input.id && !current) return { ok: false, error: "Person not found." }
  if (current && !input.active && current.active) {
    const upcoming = s.appointments.filter(
      (a) => a.staffId === current.id && new Date(a.startsAt) > new Date() && (a.status === "pendiente" || a.status === "confirmado")
    ).length
    if (upcoming) return { ok: false, error: `${current.name} has ${upcoming} booking${upcoming === 1 ? "" : "s"} upcoming. Move them before deactivating this staff member.` }
  }
  await store().saveStaff({ id: input.id, name, role: current?.role ?? "barbero", commissionPct, active: !!input.active })
  refresh()
  return { ok: true }
}

/** Upstream implementation note. */
export async function saveSchedule(staffId: string, shifts: WorkShift[]): Promise<Result> {
  await assertPanelSession()
  if (!(await db()).staff.some((m) => m.id === staffId)) return { ok: false, error: "Person not found." }
  const checked = normalizeShifts(shifts)
  if (!checked.ok) return checked
  await store().setStaffSchedule(staffId, checked.shifts)
  refresh()
  return { ok: true }
}

/** Upstream implementation note. */
export async function addTimeOff(input: {
  staffId: string
  fromDay: string
  toDay: string
  fromTime?: string
  toTime?: string
  reason?: string
}): Promise<Result & { overlapping?: number }> {
  await assertPanelSession()
  const s = await db()
  const member = s.staff.find((m) => m.id === input.staffId)
  if (!member) return { ok: false, error: "Choose a person." }
  if (!DAY.test(input.fromDay) || !DAY.test(input.toDay)) return { ok: false, error: "Check the dates." }
  const partial = !!(input.fromTime && input.toTime)
  if (partial && (!HHMM.test(input.fromTime!) || !HHMM.test(input.toTime!))) return { ok: false, error: "Check the times." }
  const startsAt = at(input.fromDay, partial ? input.fromTime! : "00:00")
  // Upstream implementation note.
  const endsAt = partial ? at(input.toDay, input.toTime!) : new Date(at(input.toDay, "00:00").getTime() + 86_400_000)
  if (endsAt <= startsAt) return { ok: false, error: "End time must be after start time." }
  if (endsAt.getTime() - startsAt.getTime() > 60 * 86_400_000) return { ok: false, error: "Maximum 60 consecutive days." }

  await store().addTimeOff({
    staffId: member.id,
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    reason: String(input.reason ?? "").trim().slice(0, 80) || null,
  })
  const overlapping = s.appointments.filter(
    (a) =>
      a.staffId === member.id &&
      (a.status === "pendiente" || a.status === "confirmado") &&
      new Date(a.startsAt) < endsAt &&
      new Date(a.endsAt) > startsAt
  ).length
  refresh()
  return { ok: true, overlapping }
}

export async function removeTimeOff(id: string): Promise<Result> {
  await assertPanelSession()
  if (!(await db()).timeOff.some((t) => t.id === id)) return { ok: false, error: "Time off not found." }
  await store().removeTimeOff(id)
  refresh()
  return { ok: true }
}

/** Upstream implementation note. */
export async function saveFixedSlot(input: {
  id?: string
  staffId: string
  repeat: "weekly" | "once"
  weekday?: number
  onDate?: string
  start: string
  end: string
  label?: string
  active?: boolean
}): Promise<Result & { overlapping?: number }> {
  await assertPanelSession()
  const s = await db()
  const member = s.staff.find((m) => m.id === input.staffId)
  if (!member) return { ok: false, error: "Choose who provides the service." }
  if (input.id && !s.fixedSlots.some((f) => f.id === input.id)) return { ok: false, error: "Fixed booking not found." }
  if (!HHMM.test(input.start) || !HHMM.test(input.end)) return { ok: false, error: "Check the times." }
  const a = hmToMinutes(input.start)
  const b = hmToMinutes(input.end)
  if (b <= a) return { ok: false, error: "End time must be after start time." }
  if (a < hmToMinutes(BRAND.openingHours.open) || b > hmToMinutes(BRAND.openingHours.close)) {
    return { ok: false, error: `Business abre de ${BRAND.openingHours.open} a ${BRAND.openingHours.close}.` }
  }

  let weekday: number | null = null
  let onDate: string | null = null
  if (input.repeat === "weekly") {
    weekday = Number(input.weekday)
    if (!(BRAND.openingHours.days as readonly number[]).includes(weekday)) return { ok: false, error: "Choose a day when the business is open." }
  } else {
    if (!DAY.test(String(input.onDate))) return { ok: false, error: "Choose a date." }
    onDate = input.onDate!
    if (!(BRAND.openingHours.days as readonly number[]).includes(new Date(`${onDate}T12:00:00Z`).getUTCDay())) return { ok: false, error: "The business is closed on on that day." }
    if (onDate < dayKey(await now())) return { ok: false, error: "That date has already passed." }
  }

  // Upstream implementation note.
  const clash = s.fixedSlots.find((f) => f.active && f.id !== input.id && fixedSlotsClash({ staffId: member.id, weekday, onDate, start: input.start, end: input.end }, f))
  if (clash) return { ok: false, error: `Se pisa con otro booking fijo de ${member.name} (${clash.start} a ${clash.end}).` }

  await store().saveFixedSlot({
    id: input.id,
    staffId: member.id,
    weekday,
    onDate,
    start: input.start,
    end: input.end,
    label: String(input.label ?? "").trim().slice(0, 60) || null,
    active: input.active ?? true,
  })

  // Upstream implementation note.
  const n = await now()
  const overlapping = s.appointments.filter((ap) => {
    if (ap.staffId !== member.id || !(ap.status === "pendiente" || ap.status === "confirmado")) return false
    if (new Date(ap.startsAt) < n || new Date(ap.startsAt).getTime() > n.getTime() + 56 * 86_400_000) return false
    const day = dayKey(ap.startsAt)
    if (weekday !== null ? new Date(`${day}T12:00:00Z`).getUTCDay() !== weekday : day !== onDate) return false
    return minutesOfDay(ap.startsAt) < b && minutesOfDay(ap.endsAt) > a
  }).length
  refresh()
  return { ok: true, overlapping }
}

export async function removeFixedSlot(id: string): Promise<Result> {
  await assertPanelSession()
  if (!(await db()).fixedSlots.some((f) => f.id === id)) return { ok: false, error: "Fixed booking not found." }
  await store().removeFixedSlot(id)
  refresh()
  return { ok: true }
}

export async function saveShopSettings(input: { openingCash: number }): Promise<Result> {
  await assertPanelSession()
  const openingCash = Math.round(Number(input.openingCash))
  if (!Number.isFinite(openingCash) || openingCash < 0 || openingCash > 10_000_000) return { ok: false, error: "Check the amount." }
  await store().updateShopSettings({ openingCash })
  refresh()
  return { ok: true }
}

export async function saveShopTimezone(timezone: string): Promise<Result> {
  await assertPanelSession()
  const value = String(timezone ?? "").trim()
  if (!value || value.length > 100) return { ok: false, error: "Elegí una zona horaria válida." }
  try {
    new Intl.DateTimeFormat("en", { timeZone: value })
  } catch {
    return { ok: false, error: "Elegí una zona horaria IANA válida." }
  }
  await store().updateShopSettings({ timezone: value })
  refresh()
  return { ok: true }
}

const SLOT_STEPS = [30, 45, 60]

/** Upstream implementation note. */
export async function saveSlotStep(minutes: number): Promise<Result> {
  await assertPanelSession()
  if (!SLOT_STEPS.includes(minutes)) return { ok: false, error: "Choose 30, 45 or 60 minutes." }
  await store().updateShopSettings({ slotStepMin: minutes })
  refresh()
  return { ok: true }
}

/** Upstream implementation note. */

export async function saveStaffDateSchedule(staffId: string, day: string, works: boolean, shifts: {start:string;end:string}[]): Promise<Result> {
  await assertPanelSession()
  if (!DAY.test(day) || !(await db()).staff.some((m)=>m.id===staffId)) return {ok:false,error:"Revisá la persona y la fecha."}
  const settings=(await db()).shopSettings
  const open=hmToMinutes(settings.calendarOpen), close=hmToMinutes(settings.calendarClose)
  const clean=works?shifts.map((x)=>({start:String(x.start),end:String(x.end)})):[]
  if (clean.length>3 || clean.some((x)=>!HHMM.test(x.start)||!HHMM.test(x.end)||hmToMinutes(x.start)<open||hmToMinutes(x.end)>close||hmToMinutes(x.end)<=hmToMinutes(x.start))) return {ok:false,error:`Elegí hasta tres franjas dentro del horario del local (${settings.calendarOpen}–${settings.calendarClose}).`}
  clean.sort((a,b)=>a.start.localeCompare(b.start))
  for(let i=1;i<clean.length;i)if(hmToMinutes(clean[i].start)<hmToMinutes(clean[i-1].end))return {ok:false,error:"Las franjas de una misma fecha no pueden pisarse."}
  await store().setStaffDateSchedule(staffId,day,works,clean)
  refresh()
  return {ok:true}
}

export async function saveCalendarSettings(input:{open:string;close:string;step:number;allowOverlaps:boolean}):Promise<Result>{
  await assertPanelSession()
  if(!HHMM.test(input.open)||!HHMM.test(input.close)||hmToMinutes(input.close)<=hmToMinutes(input.open))return {ok:false,error:"Revisá el horario del local."}
  if(![15,30].includes(Number(input.step)))return {ok:false,error:"El paso de la cuadrícula debe ser de 15 o 30 minutos."}
  await store().updateShopSettings({calendarOpen:input.open,calendarClose:input.close,calendarStepMin:input.step,allowStaffOverlaps:!!input.allowOverlaps})
  refresh()
  return {ok:true}
}

export async function saveDepositSettings(input: { enabled: boolean; amount: number; holdMin: number }): Promise<Result> {
  await assertPanelSession()
  const amount = Math.round(Number(input.amount))
  const holdMin = Math.round(Number(input.holdMin))
  if (input.enabled) {
    if (!Number.isFinite(amount) || amount <= 0 || amount > 10_000_000) return { ok: false, error: "Enter a deposit amount greater than $0." }
    if (!Number.isFinite(holdMin) || holdMin < 5 || holdMin > 120) return { ok: false, error: "El tiempo para pagar va de 5 a 120 minutos." }
    const { readMercadoPagoConfig } = await import("@/lib/mercadopago/config")
    if (!readMercadoPagoConfig().configured) return { ok: false, error: "Configure the Mercado Pago key on the server before enabling deposits." }
  }
  await store().updateShopSettings({ depositEnabled: input.enabled, depositAmount: amount, depositHoldMin: holdMin || 15 })
  refresh()
  return { ok: true }
}
