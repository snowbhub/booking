import { dayKey, monthKey } from "@/lib/time"
import type {
  Appointment,
  AppointmentSource,
  Expense,
  ExpenseCategory,
  Payment,
  PaymentMethod,
  Service,
  Staff,
} from "./types"

/** Upstream implementation note. */

export interface MoneySummary {
  /** Upstream implementation note. */
  gross: number
  services: number
  products: number
  tips: number
  discounts: number
  count: number
  /** Upstream implementation note. */
  avgTicket: number
  byMethod: Record<PaymentMethod, number>
}

export function summarizePayments(payments: Payment[]): MoneySummary {
  const byMethod: Record<PaymentMethod, number> = {
    efectivo: 0,
    transferencia: 0,
    mercadopago: 0,
    debito: 0,
    credito: 0,
  }
  let services = 0
  let products = 0
  let tips = 0
  let discounts = 0
  let serviceCount = 0

  for (const p of payments) {
    byMethod[p.method] += p.amount
    tips += p.tip
    discounts += p.discount
    if (p.kind === "producto") products += p.amount - p.tip
    else if (p.kind === "sena") {
      // Upstream implementation note.
      // Upstream implementation note.
      services += p.amount - p.tip
    } else {
      services += p.amount - p.tip
      // Upstream implementation note.
      serviceCount += p.units ?? 1
    }
  }

  const gross = services + products + tips
  return {
    gross,
    services,
    products,
    tips,
    discounts,
    count: payments.length,
    avgTicket: serviceCount ? Math.round(services / serviceCount) : 0,
    byMethod,
  }
}

export function paymentsOnDay(payments: Payment[], day: string) {
  return payments.filter((p) => dayKey(p.paidAt) === day)
}

export function paymentsInMonth(payments: Payment[], month: string) {
  return payments.filter((p) => monthKey(dayKey(p.paidAt)) === month)
}

export function expensesInMonth(expenses: Expense[], month: string) {
  return expenses.filter((e) => monthKey(dayKey(e.paidAt)) === month)
}

export function expensesByCategory(expenses: Expense[]): Record<ExpenseCategory, number> {
  const out: Record<ExpenseCategory, number> = {
    alquiler: 0,
    servicios: 0,
    insumos: 0,
    sueldos: 0,
    marketing: 0,
    otros: 0,
    vale: 0,
  }
  for (const e of expenses) out[e.category] += e.amount
  return out
}

export interface StaffLine {
  staff: Staff
  services: number
  revenue: number
  tips: number
  /** Upstream implementation note. */
  payout: number
}

/** Upstream implementation note. */
export function staffBreakdown(payments: Payment[], staff: Staff[]): StaffLine[] {
  return staff.map((member) => {
    const mine = payments.filter((p) => p.staffId === member.id && (p.kind === "servicio" || p.kind === "sena"))
    const completed = mine.filter((p) => p.kind === "servicio")
    const revenue = mine.reduce((s, p) => s + p.amount - p.tip, 0)
    const tips = mine.reduce((s, p) => s + p.tip, 0)
    return {
      staff: member,
      services: completed.reduce((n, p) => n + (p.units ?? 1), 0),
      revenue,
      tips,
      payout: Math.round((revenue * member.commissionPct) / 100) + tips,
    }
  })
}

export function serviceBreakdown(payments: Payment[], services: Service[]) {
  return services
    .map((service) => {
      // Upstream implementation note.
      // Upstream implementation note.
      // Upstream implementation note.
      const mine = payments.filter((p) => p.serviceId === service.id && p.kind !== "sena" && !p.imported)
      return {
        service,
        count: mine.length,
        revenue: mine.reduce((s, p) => s + p.amount - p.tip, 0),
      }
    })
    .filter((row) => row.count > 0)
    .sort((a, b) => b.revenue - a.revenue)
}

/** Upstream implementation note. */
export function sourceBreakdown(payments: Payment[], appointments: Appointment[]) {
  const byId = new Map(appointments.map((a) => [a.id, a]))
  const out: Record<AppointmentSource, { count: number; revenue: number }> = {
    agente: { count: 0, revenue: 0 },
    panel: { count: 0, revenue: 0 },
    web: { count: 0, revenue: 0 },
    walk_in: { count: 0, revenue: 0 },
  }
  for (const p of payments) {
    if (p.kind === "sena") continue // adelanto del mismo turno: no es un corte aparte.
    const appt = p.appointmentId ? byId.get(p.appointmentId) : undefined
    if (!appt) continue
    out[appt.source].count++
    out[appt.source].revenue += p.amount - p.tip
  }
  return out
}

export function noShowRate(appointments: Appointment[]): number {
  const closed = appointments.filter((a) =>
    ["completado", "no_show"].includes(a.status)
  )
  if (!closed.length) return 0
  return Math.round((closed.filter((a) => a.status === "no_show").length / closed.length) * 100)
}

/** Upstream implementation note. */
export function dailySeries(payments: Payment[], days: string[]) {
  const totals = new Map<string, number>()
  for (const p of payments) {
    const d = dayKey(p.paidAt)
    totals.set(d, (totals.get(d) ?? 0) + p.amount)
  }
  return days.map((day) => ({ day, total: totals.get(day) ?? 0 }))
}

/* Upstream implementation note. */

export interface WeekStaffLine {
  staff: Staff
  /** Upstream implementation note. */
  services: number
  /** Upstream implementation note. */
  revenue: number
  tips: number
  /** Upstream implementation note. */
  commission: number
  /** Upstream implementation note. */
  advances: number
  /** Upstream implementation note. */
  paid: number
  /** Upstream implementation note. */
  balance: number
}

export interface WeekClosing {
  days: { day: string; income: number; expenses: number }[]
  income: number
  /** Upstream implementation note. */
  sales: number
  tips: number
  /** Upstream implementation note. */
  products: number
  staffLines: WeekStaffLine[]
  /** Comisiones y propinas de los empleados (lo devengado, haya o no cobrado). */
  payroll: number
  /** Upstream implementation note. */
  operatingExpenses: number
  /** Upstream implementation note. */
  ownerAdvances: number
  /** Upstream implementation note. */
  result: number
}

/** Upstream implementation note. */
export function weekClosing(payments: Payment[], expenses: Expense[], staff: Staff[], days: string[]): WeekClosing {
  const inWeek = payments.filter((p) => days.includes(dayKey(p.paidAt)))
  const expWeek = expenses.filter((e) => days.includes(dayKey(e.paidAt)))
  const money = summarizePayments(inWeek)
  const lines = staffBreakdown(inWeek, staff)

  const staffLines: WeekStaffLine[] = lines.map((l) => {
    const mine = expWeek.filter((e) => e.staffId === l.staff.id)
    const advances = mine.filter((e) => e.category === "vale").reduce((s, e) => s + e.amount, 0)
    const paid = mine.filter((e) => e.category === "sueldos").reduce((s, e) => s + e.amount, 0)
    const commission = Math.round((l.revenue * l.staff.commissionPct) / 100)
    const owner = l.staff.commissionPct === 0
    return {
      staff: l.staff,
      services: l.services,
      revenue: l.revenue,
      tips: l.tips,
      commission,
      advances,
      paid,
      // Upstream implementation note.
      balance: owner ? 0 : commission + l.tips - advances - paid,
    }
  })

  const staffIds = new Set(staff.map((s) => s.id))
  const owners = new Set(staff.filter((s) => s.commissionPct === 0).map((s) => s.id))
  const payroll = staffLines.filter((l) => l.staff.commissionPct > 0).reduce((s, l) => s + l.commission + l.tips, 0)
  const operatingExpenses = expWeek
    .filter((e) => !(e.staffId && staffIds.has(e.staffId)) && e.category !== "vale")
    .reduce((s, e) => s + e.amount, 0)
  const ownerAdvances = expWeek.filter((e) => e.category === "vale" && e.staffId && owners.has(e.staffId)).reduce((s, e) => s + e.amount, 0)

  return {
    days: days.map((day) => ({
      day,
      income: inWeek.filter((p) => dayKey(p.paidAt) === day).reduce((s, p) => s + p.amount, 0),
      expenses: expWeek.filter((e) => dayKey(e.paidAt) === day).reduce((s, e) => s + e.amount, 0),
    })),
    income: money.gross,
    sales: money.services + money.products,
    tips: money.tips,
    products: money.products,
    staffLines,
    payroll,
    operatingExpenses,
    ownerAdvances,
    result: money.gross - payroll - operatingExpenses,
  }
}
