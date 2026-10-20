"use server"

import { revalidatePath } from "next/cache"
import { assertPanelSession } from "@/lib/auth/guard"
import { db, now, store } from "./repo"
import { AlreadyChargedError, SlotTakenError } from "./store/types"
import { deliverToChannel } from "@/lib/zernio/deliver"
import { startDepositCheckout } from "@/lib/mercadopago/deposit"
import { at, dayKey } from "@/lib/time"
import { formatARS } from "@/lib/money"
import { checkManualBooking, checkStaffTransfer, earlyFinishEnd, freeSlots, placeFinishedWalkIn } from "@/lib/domain/slots"
import { loyaltyDiscount, loyaltyStatus } from "@/lib/domain/loyalty"
import type {
  AgentSettings,
  AppointmentSource,
  AppointmentStatus,
  ConversationMode,
  ExpenseCategory,
  PaymentMethod,
} from "@/lib/domain/types"

/** Upstream implementation note. */

type Result<T = undefined> = { ok: true; data?: T } | { ok: false; error: string }

const refresh = () => revalidatePath("/", "layout")
const validDay = (d: unknown): d is string => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)
const validTime = (t: unknown): t is string => typeof t === "string" && /^\d{2}:\d{2}$/.test(t)

type NewAppointmentInput = {
  day: string
  time: string
  staffId: string
  serviceId: string
  clientId?: string
  newClient?: { name: string; phone?: string }
  source?: AppointmentSource
  notes?: string
  /** Upstream implementation note. */
  durationMin?: number
}

/** Upstream implementation note. */
export async function createAppointment(input: NewAppointmentInput): Promise<Result<{ id: string; warnings?: string[] }>> {
  await assertPanelSession()
  return book(input, { manual: true })
}

/** Upstream implementation note. */
export async function createPublicBooking(input: {
  day: string
  time: string
  staffId: string
  serviceId: string
  name: string
  phone: string
}): Promise<Result<{ id: string; checkoutUrl?: string }>> {
  const name = String(input.name ?? "").trim().slice(0, 80)
  const phone = String(input.phone ?? "").replace(/[^\d+]/g, "")
  if (name.length < 2) return { ok: false, error: "Enter your name." }
  if (phone.replace(/\D/g, "").length < 8) return { ok: false, error: "Check the phone number: it needs at least 8 digits." }
  return book(
    { day: input.day, time: input.time, staffId: input.staffId, serviceId: input.serviceId, newClient: { name, phone }, source: "web" },
    { requireDeposit: true }
  )
}

async function book(
  input: NewAppointmentInput,
  grid: { stepMin?: number; leadMin?: number; requireDeposit?: boolean; manual?: boolean }
): Promise<Result<{ id: string; checkoutUrl?: string; warnings?: string[] }>> {
  if (!validDay(input.day) || !validTime(input.time)) return { ok: false, error: "Invalid date or time." }
  const s = await db()
  const service = s.services.find((x) => x.id === input.serviceId && x.active)
  const staff = s.staff.find((x) => x.id === input.staffId && x.active)
  if (!service || !staff) return { ok: false, error: "Choose a service and staff member." }

  // Upstream implementation note.
  // Upstream implementation note.
  let duration = service.durationMin
  let warnings: string[] = []
  if (grid.manual) {
    duration = input.durationMin === undefined ? service.durationMin : Math.round(Number(input.durationMin))
    if (!Number.isFinite(duration) || duration < 5 || duration > 240) return { ok: false, error: "Check the duration: 5 to 240 minutes." }
    // Upstream implementation note.
    // Upstream implementation note.
    // Upstream implementation note.
    const check = checkManualBooking({ day: input.day, time: input.time, durationMin: duration, service, staff, appointments: s.appointments, now: await now(), allowOverlap: s.shopSettings.allowStaffOverlaps })
    if (!check.ok) return { ok: false, error: check.error }
    warnings = check.warnings
  } else {
    // Upstream implementation note.
    const slots = freeSlots({ day: input.day, service, staff, appointments: s.appointments, ...grid, stepMin: grid.stepMin ?? s.shopSettings.slotStepMin, now: await now() })
    if (!slots.includes(input.time)) return { ok: false, error: `${staff.name} is not available at that time. Choose another.` }
  }

  const name = input.newClient?.name.trim()
  if (!input.clientId && !name) return { ok: false, error: "Client name is required." }

  // Upstream implementation note.
  // Upstream implementation note.
  // Upstream implementation note.
  const useDeposit = !!grid.requireDeposit && s.shopSettings.depositEnabled
  const start = at(input.day, input.time)
  const holdExpiresAt = useDeposit ? new Date(Date.now() + s.shopSettings.depositHoldMin * 60_000).toISOString() : null
  try {
    const { appointmentId } = await store().createAppointment({
      appointment: {
        clientId: input.clientId,
        staffId: staff.id,
        serviceId: service.id,
        startsAt: start.toISOString(),
        endsAt: new Date(start.getTime() + duration * 60_000).toISOString(),
        status: useDeposit ? "pendiente" : "confirmado",
        source: input.source ?? "panel",
        price: service.price,
        notes: input.notes?.trim() || null,
        conversationId: null,
        holdExpiresAt,
      },
      allowOverlap: !!grid.manual && s.shopSettings.allowStaffOverlaps,
      newClient: input.clientId
        ? undefined
        : { name: name!, phone: input.newClient?.phone?.trim() || null, channel: "whatsapp", notes: null, preferredStaffId: staff.id },
    })
    refresh()
    if (!useDeposit) return { ok: true, data: { id: appointmentId, warnings } }

    const checkoutUrl = await startDepositCheckout({
      appointmentId,
      serviceName: service.name,
      amount: s.shopSettings.depositAmount,
      holdMin: s.shopSettings.depositHoldMin,
    })
    if (!checkoutUrl) {
      // Upstream implementation note.
      await store().updateAppointment(appointmentId, { status: "cancelado", notes: "No se pudo generar el link de pago." })
      refresh()
      return { ok: false, error: "Could not create the payment link. Try again in a minute." }
    }
    return { ok: true, data: { id: appointmentId, checkoutUrl } }
  } catch (e) {
    if (e instanceof SlotTakenError) return { ok: false, error: `Someone just took that time with ${staff.name}. Choose another.` }
    throw e
  }
}

/** Upstream implementation note. */
async function releaseIfFinishedEarly(appt: { id: string; startsAt: string; endsAt: string }, n: Date) {
  const end = earlyFinishEnd(appt, n)
  if (end) await store().updateAppointment(appt.id, { endsAt: end.toISOString() })
}

export async function setAppointmentStatus(id: string, status: AppointmentStatus): Promise<Result> {
  await assertPanelSession()
  const s = await db()
  const current = s.appointments.find((a) => a.id === id)
  if (!current) return { ok: false, error: "Booking not found." }
  try {
    await store().updateAppointment(id, { status })
    if (status === "completado") await releaseIfFinishedEarly(current, await now())
  } catch (e) {
    if (e instanceof SlotTakenError) return { ok: false, error: "That time is already occupied by another booking and cannot be reactivated." }
    throw e
  }
  refresh()
  return { ok: true }
}

/** Upstream implementation note. */
export async function reassignAppointment(id: string, staffId: string): Promise<Result> {
  await assertPanelSession()
  const s = await db()
  const appointment = s.appointments.find((a) => a.id === id)
  const member = s.staff.find((m) => m.id === staffId)
  if (!appointment || !member) return { ok: false, error: "Booking or staff member not found." }
  if (s.payments.some((p) => p.appointmentId === id && p.kind === "servicio")) {
    return { ok: false, error: "This booking has already been paid; the staff member cannot be changed." }
  }
  const check = checkStaffTransfer({
    appointment,
    staff: member,
    service: { id: appointment.serviceId },
    appointments: s.appointments,
    now: await now(),
  })
  if (!check.ok) return { ok: false, error: check.error }
  try {
    if (!await store().reassignAppointment(id, staffId)) {
      return { ok: false, error: "The booking changed while you were editing it. Refresh the schedule and try again." }
    }
  } catch (e) {
    if (e instanceof SlotTakenError) return { ok: false, error: `${member.name} just took that time. Choose another staff member.` }
    throw e
  }
  refresh()
  return { ok: true }
}

/** Upstream implementation note. */
async function addDrink(clientId: string | null, staffId: string | null, drink: number | undefined, method: PaymentMethod, n: Date) {
  const amount = Math.min(1_000_000, Math.max(0, Math.round(Number(drink) || 0)))
  if (!amount) return 0
  await store().addPayment({
    appointmentId: null,
    clientId,
    staffId,
    serviceId: null,
    concept: "Drink",
    kind: "producto",
    listPrice: amount,
    discount: 0,
    discountReason: null,
    tip: 0,
    amount,
    method,
    paidAt: n.toISOString(),
  })
  return amount
}

/** Upstream implementation note. */
export async function chargeAppointment(input: {
  appointmentId: string
  method: PaymentMethod
  tip: number
  /** Upstream implementation note. */
  drink?: number
  useReward: boolean
}): Promise<Result<{ amount: number; discount: number }>> {
  await assertPanelSession()
  const s = await db()
  const appt = s.appointments.find((a) => a.id === input.appointmentId)
  if (!appt) return { ok: false, error: "Booking not found." }
  if (s.payments.some((p) => p.appointmentId === appt.id && p.kind === "servicio")) {
    return { ok: false, error: "This booking has already been paid." }
  }
  const service = s.services.find((x) => x.id === appt.serviceId)
  if (!service) return { ok: false, error: "The service for this booking no longer exists." }
  const status = loyaltyStatus(appt.clientId, s.payments, s.services)
  const discount = input.useReward ? loyaltyDiscount(status, service) : 0
  const tip = Math.max(0, Math.round(input.tip || 0))
  // Upstream implementation note.
  // Upstream implementation note.
  // Upstream implementation note.
  // Upstream implementation note.
  const depositPaid = s.payments.find((p) => p.appointmentId === appt.id && p.kind === "sena")?.amount ?? 0
  const listPrice = Math.max(0, service.price - depositPaid)
  const amount = listPrice - discount + tip
  const n = await now()

  try {
    await store().chargeAppointment(appt.id, {
      appointmentId: appt.id,
      clientId: appt.clientId,
      staffId: appt.staffId,
      serviceId: service.id,
      concept: depositPaid > 0 ? `${service.name} (deposit ${formatARS(depositPaid)} already paid)` : service.name,
      kind: "servicio",
      listPrice,
      discount,
      discountReason: discount > 0 ? "fidelidad" : null,
      tip,
      amount,
      method: input.method,
      paidAt: n.toISOString(),
    })
  } catch (e) {
    if (e instanceof AlreadyChargedError) return { ok: false, error: "This booking has already been paid." }
    throw e
  }
  const drink = await addDrink(appt.clientId, appt.staffId, input.drink, input.method, n)
  await releaseIfFinishedEarly(appt, n)
  refresh()
  return { ok: true, data: { amount: amount + drink, discount } }
}

/** Upstream implementation note. */
export async function quickAppointment(input: {
  staffId: string
  serviceId: string
  clientId?: string
  name?: string
  /** Upstream implementation note. */
  durationMin?: number
  /** Upstream implementation note. */
  time?: string
}): Promise<Result<{ startsAt: string; waitMin: number; staffName: string }>> {
  await assertPanelSession()
  const s = await db()
  const service = s.services.find((x) => x.id === input.serviceId && x.active)
  const staff = s.staff.find((x) => x.id === input.staffId && x.active)
  if (!service || !staff) return { ok: false, error: "Choose a service and staff member." }

  const name = String(input.name ?? "").trim().slice(0, 60)
  if (input.clientId ? !s.clients.some((c) => c.id === input.clientId) : name.length < 2) {
    return { ok: false, error: "Enter the client name." }
  }

  const durationMin = input.durationMin === undefined ? service.durationMin : Math.round(Number(input.durationMin))
  if (!Number.isFinite(durationMin) || durationMin < 5 || durationMin > 240) return { ok: false, error: "Check the duration: 5 to 240 minutes." }

  const n = await now()
  const ONE_MIN = 60_000
  const duration = durationMin * ONE_MIN
  let start = n.getTime()

  if (input.time !== undefined) {
    // Upstream implementation note.
    if (!validTime(input.time)) return { ok: false, error: "Check the time." }
    const check = checkManualBooking({ day: dayKey(n), time: input.time, durationMin, service, staff, appointments: s.appointments, now: n, pastGraceMin: 60 })
    if (!check.ok) return { ok: false, error: check.error }
    start = at(dayKey(n), input.time).getTime()
  } else {
    // Upstream implementation note.
    // Upstream implementation note.
    const busy = s.appointments
      .filter((a) => a.staffId === staff.id && ["pendiente", "confirmado", "en_curso", "completado"].includes(a.status))
      .map((a) => [new Date(a.startsAt).getTime(), new Date(a.endsAt).getTime()] as const)
      .sort((a, b) => a[0] - b[0])
    for (const [from, to] of busy) {
      if (start < to && start + duration > from) start = to
    }
    if (Math.round((start - n.getTime()) / ONE_MIN) > 180) {
      return { ok: false, error: `${staff.name} is busy for a while. Try another staff member or book a specific time.` }
    }
  }
  const waitMin = Math.max(0, Math.round((start - n.getTime()) / ONE_MIN))

  try {
    await store().createAppointment({
      appointment: {
        clientId: input.clientId,
        staffId: staff.id,
        serviceId: service.id,
        startsAt: new Date(start).toISOString(),
        endsAt: new Date(start + duration).toISOString(),
        // Upstream implementation note.
        status: start <= n.getTime() + ONE_MIN ? "en_curso" : "confirmado",
        source: "walk_in",
        price: service.price,
        notes: null,
        conversationId: null,
        holdExpiresAt: null,
      },
      newClient: input.clientId
        ? undefined
        : { name, phone: null, channel: "whatsapp", notes: null, preferredStaffId: staff.id },
    })
  } catch (e) {
    if (e instanceof SlotTakenError) return { ok: false, error: `${staff.name} already has a booking at that time. Try another staff member.` }
    throw e
  }
  refresh()
  return { ok: true, data: { startsAt: new Date(start).toISOString(), waitMin, staffName: staff.name } }
}

/** Upstream implementation note. */
export async function quickCharge(input: {
  staffId: string
  serviceId: string
  clientId?: string
  newClient?: { name: string; phone?: string }
  method: PaymentMethod
  tip: number
  /** Upstream implementation note. */
  drink?: number
  useReward: boolean
  /** Upstream implementation note. */
  durationMin?: number
  /** Upstream implementation note. */
  startedAt?: string
}): Promise<Result<{ amount: number; discount: number; startsAt: string; endsAt: string }>> {
  await assertPanelSession()
  const s = await db()
  const service = s.services.find((x) => x.id === input.serviceId && x.active)
  const staff = s.staff.find((x) => x.id === input.staffId && x.active)
  if (!service || !staff) return { ok: false, error: "Choose a service and staff member." }

  const name = input.newClient?.name.trim()
  if (!input.clientId && !name) return { ok: false, error: "Client name is required." }

  const n = await now()
  const durationMin = input.durationMin === undefined ? service.durationMin : Math.round(Number(input.durationMin))
  if (!Number.isFinite(durationMin) || durationMin < 5 || durationMin > 240) return { ok: false, error: "Check the duration: 5 to 240 minutes." }

  // Upstream implementation note.
  // Upstream implementation note.
  // Upstream implementation note.
  // Upstream implementation note.
  let startsAt: Date
  let endsAt: Date
  if (input.startedAt !== undefined) {
    if (!validTime(input.startedAt)) return { ok: false, error: "Check the time." }
    startsAt = at(dayKey(n), input.startedAt)
    if (startsAt.getTime() > n.getTime()) return { ok: false, error: "That time has not arrived yet." }
    endsAt = new Date(Math.min(startsAt.getTime() + durationMin * 60_000, n.getTime())) // ya terminó: no puede terminar en el futuro
    const spent = Math.round((endsAt.getTime() - startsAt.getTime()) / 60_000)
    if (spent < 5) return { ok: false, error: "Esa hora es muy reciente: el corte tiene que haber durado al menos 5 minutos." }
    const check = checkManualBooking({ day: dayKey(n), time: input.startedAt, durationMin: spent, service, staff, appointments: s.appointments, now: n, allowPast: true })
    if (!check.ok) return { ok: false, error: check.error }
  } else {
    const placed = placeFinishedWalkIn({ now: n, durationMin, staffId: staff.id, appointments: s.appointments })
    if (!placed) {
      return { ok: false, error: `No free slot found for ${staff.name} before now to record this service. Enter when it happened under "When it happened".` }
    }
    ;({ startsAt, endsAt } = placed)
  }

  let appointmentId: string
  let clientId: string
  try {
    const created = await store().createAppointment({
      appointment: {
        clientId: input.clientId,
        staffId: staff.id,
        serviceId: service.id,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        status: "completado",
        source: "walk_in",
        price: service.price,
        notes: null,
        conversationId: null,
        holdExpiresAt: null,
      },
      newClient: input.clientId
        ? undefined
        : { name: name!, phone: input.newClient?.phone?.trim() || null, channel: "whatsapp", notes: null, preferredStaffId: staff.id },
    })
    appointmentId = created.appointmentId
    clientId = created.clientId
  } catch (e) {
    if (e instanceof SlotTakenError) return { ok: false, error: `${staff.name} already has a booking at that time. Enter another time under "When it happened".` }
    throw e
  }

  const status = loyaltyStatus(clientId, s.payments, s.services)
  const discount = input.useReward ? loyaltyDiscount(status, service) : 0
  const tip = Math.max(0, Math.round(input.tip || 0))
  const amount = service.price - discount + tip
  await store().chargeAppointment(appointmentId, {
    appointmentId,
    clientId,
    staffId: staff.id,
    serviceId: service.id,
    concept: service.name,
    kind: "servicio",
    listPrice: service.price,
    discount,
    discountReason: discount > 0 ? "fidelidad" : null,
    tip,
    amount,
    method: input.method,
    paidAt: n.toISOString(),
  })
  const drink = await addDrink(clientId, staff.id, input.drink, input.method, n)
  refresh()
  return { ok: true, data: { amount: amount + drink, discount, startsAt: startsAt.toISOString(), endsAt: endsAt.toISOString() } }
}

export async function addExpense(input: {
  category: ExpenseCategory
  description: string
  amount: number
  method: PaymentMethod
  /** Upstream implementation note. */
  staffId?: string
}): Promise<Result> {
  await assertPanelSession()
  const needsStaff = input.category === "vale" || (input.category === "sueldos" && !!input.staffId)
  const staffId = needsStaff ? input.staffId : undefined
  if (input.category === "vale" && !staffId) return { ok: false, error: "Choose who received the advance." }
  if (staffId && !(await db()).staff.some((x) => x.id === staffId)) return { ok: false, error: "That staff member does not exist." }
  if (!input.description.trim() && input.category !== "vale") {
    return { ok: false, error: "Enter a description and amount." }
  }
  if (!(input.amount > 0)) return { ok: false, error: "Enter a description and amount." }
  await store().addExpense({
    staffId: staffId ?? null,
    category: input.category,
    description: (input.description.trim() || "Vale").slice(0, 200),
    amount: Math.round(input.amount),
    method: input.method,
    paidAt: (await now()).toISOString(),
  })
  refresh()
  return { ok: true }
}

/** Upstream implementation note. */
export async function closeCash(input: { day: string; counted: number; notes?: string }): Promise<Result<{ expected: number; difference: number }>> {
  await assertPanelSession()
  if (!validDay(input.day)) return { ok: false, error: "Invalid day." }
  const counted = Math.round(Number(input.counted))
  if (!Number.isFinite(counted) || counted < 0 || counted > 100_000_000) return { ok: false, error: "Check the counted amount." }
  const s = await db()
  const n = await now()
  if (input.day > dayKey(n)) return { ok: false, error: "A future day cannot be closed." }
  const cashIn = s.payments.filter((p) => p.method === "efectivo" && dayKey(p.paidAt) === input.day).reduce((sum, p) => sum + p.amount, 0)
  const cashOut = s.expenses.filter((e) => e.method === "efectivo" && dayKey(e.paidAt) === input.day).reduce((sum, e) => sum + e.amount, 0)
  const openingCash = s.cashClosures.find((c) => c.day === input.day)?.openingCash ?? s.shopSettings.openingCash
  const expected = openingCash + cashIn - cashOut
  await store().closeCashDay({
    day: input.day,
    openingCash,
    expectedCash: expected,
    countedCash: counted,
    closedAt: n.toISOString(),
    notes: String(input.notes ?? "").trim().slice(0, 200) || null,
  })
  refresh()
  return { ok: true, data: { expected, difference: counted - expected } }
}

/* ── Bandeja ── */

/** Upstream implementation note. */
export async function sendStaffMessage(conversationId: string, body: string): Promise<Result> {
  await assertPanelSession()
  const text = body.trim()
  if (!text) return { ok: false, error: "The message is empty." }
  const s = await db()
  const conv = s.conversations.find((c) => c.id === conversationId)
  if (!conv) return { ok: false, error: "Conversation not found." }
  // Upstream implementation note.
  const owner = s.staff.find((x) => x.role === "dueno") ?? s.staff[0]
  const n = await now()
  const delivery = await deliverToChannel(conv, text, n)
  if (!delivery.ok) return { ok: false, error: delivery.error }
  const sentAt = n.toISOString()
  await store().addMessage({
    // Upstream implementation note.
    externalId: delivery.externalId,
    conversationId,
    author: "staff",
    staffId: owner?.id ?? null,
    body: text,
    sentAt,
    action: null,
    actionRef: null,
  })
  await store().updateConversation(conversationId, { mode: "humano", needsHuman: false, unread: 0, lastMessageAt: sentAt })
  refresh()
  return { ok: true }
}

export async function setConversationMode(conversationId: string, mode: ConversationMode): Promise<Result> {
  await assertPanelSession()
  const s = await db()
  if (!s.conversations.some((c) => c.id === conversationId)) return { ok: false, error: "Conversation not found." }
  await store().updateConversation(conversationId, mode === "ia" ? { mode, needsHuman: false, handoffReason: null } : { mode })
  refresh()
  return { ok: true }
}

export async function markConversationRead(conversationId: string): Promise<Result> {
  await assertPanelSession()
  const s = await db()
  const conv = s.conversations.find((c) => c.id === conversationId)
  if (conv && conv.unread) {
    await store().updateConversation(conversationId, { unread: 0 })
    refresh()
  }
  return { ok: true }
}

/* Upstream implementation note. */

export async function updateAgentSettings(patch: Partial<AgentSettings>): Promise<Result> {
  await assertPanelSession()
  await store().updateAgentSettings(patch)
  refresh()
  return { ok: true }
}

/** Upstream implementation note. */
export async function listFreeSlots(day: string, serviceId: string, staffId: string): Promise<string[]> {
  await assertPanelSession()
  if (!validDay(day)) return []
  const s = await db()
  const service = s.services.find((x) => x.id === serviceId)
  const staff = s.staff.find((x) => x.id === staffId)
  if (!service || !staff) return []
  const n = await now()
  return freeSlots({
    day,
    service,
    staff,
    appointments: s.appointments,
    now: n,
    leadMin: day === dayKey(n) ? 0 : 30,
    // Upstream implementation note.
    // Upstream implementation note.
    stepMin: 15,
  })
}
