import { describe, expect, it } from "vitest"
import { serviceBreakdown, sourceBreakdown, staffBreakdown, summarizePayments, weekClosing } from "./finance"
import type { Appointment, Expense, Payment, Service, Staff } from "./types"

const staff: Staff[] = [{ id: "st1", name: "Sebastián", role: "barbero", commissionPct: 50, active: true, skipsServiceIds: [] }]
const services: Service[] = [{ id: "sv1", name: "Haircut + beard", category: "combo", durationMin: 60, price: 20000, countsForLoyalty: true, active: true }]

let n = 0
const base = (over: Partial<Payment>): Payment => ({
  id: `p${++n}`,
  appointmentId: "tu1",
  clientId: "c1",
  staffId: "st1",
  serviceId: "sv1",
  concept: "Haircut + beard",
  kind: "servicio",
  listPrice: 20000,
  discount: 0,
  discountReason: null,
  tip: 0,
  amount: 20000,
  method: "efectivo",
  paidAt: "2026-09-27T12:00:00.000Z",
  ...over,
})

describe("historial importado del Excel: una fila representa varios cortes", () => {
  // Upstream implementation note.
  const dia = base({ id: "h1", appointmentId: null, serviceId: null, listPrice: 45000, amount: 45000, units: 5, imported: true, concept: "History · cortes" })

  it("el ticket promedio divide por los cortes, no por las filas", () => {
    expect(summarizePayments([dia]).avgTicket).toBe(9000)
  })

  it("upstream behavior 1", () => {
    const [line] = staffBreakdown([dia], staff)
    expect(line.services).toBe(5)
    expect(line.revenue).toBe(45000)
  })

  it("upstream behavior 2", () => {
    const sello = base({ id: "s1", appointmentId: null, listPrice: 0, amount: 0, units: 0, imported: true, concept: "History · tarjeta de fidelidad" })
    expect(serviceBreakdown([sello], services)).toEqual([])
    expect(serviceBreakdown([sello, base({})], services)[0].count).toBe(1)
  })

  it("upstream behavior 3", () => {
    expect(summarizePayments([base({})]).avgTicket).toBe(20000)
  })
})

describe("upstream behavior 4", () => {
  // Upstream implementation note.
  const sena = base({ id: "sena", kind: "sena", method: "mercadopago", listPrice: 8000, amount: 8000, externalRef: "mp-1", paidAt: "2026-09-20T10:00:00.000Z" })
  const resto = base({ id: "resto", kind: "servicio", method: "efectivo", listPrice: 12000, amount: 12000, paidAt: "2026-09-27T12:00:00.000Z" })
  const payments = [sena, resto]

  it("upstream behavior 5", () => {
    const money = summarizePayments(payments)
    expect(money.services).toBe(20000) // seña + resto: toda la plata real
    expect(money.avgTicket).toBe(20000) // un solo corte terminado, a su precio completo
    expect(money.count).toBe(2) // dos movimientos de caja (dos días distintos)
  })

  it("upstream behavior 6", () => {
    const [line] = staffBreakdown(payments, staff)
    expect(line.services).toBe(1) // un solo corte terminado
    expect(line.revenue).toBe(20000)
    expect(line.payout).toBe(10000) // 50% de 20.000
  })

  it("upstream behavior 7", () => {
    const [line] = staffBreakdown([resto], staff) // el día del corte, sin la seña (se pagó otro día)
    expect(line.revenue).toBe(12000)
  })

  it("upstream behavior 8", () => {
    const [row] = serviceBreakdown(payments, services)
    expect(row.count).toBe(1)
    expect(row.revenue).toBe(12000) // el kind "sena" se excluye a propósito de este conteo
  })

  it("upstream behavior 9", () => {
    const appt: Appointment = {
      id: "tu1", clientId: "c1", staffId: "st1", serviceId: "sv1",
      startsAt: "2026-09-27T12:00:00.000Z", endsAt: "2026-09-27T13:00:00.000Z",
      status: "completado", source: "web", price: 20000, notes: null, conversationId: null, holdExpiresAt: null, createdAt: "",
    }
    const out = sourceBreakdown(payments, [appt])
    expect(out.web.count).toBe(1)
    expect(out.web.revenue).toBe(12000)
  })
})

describe("upstream behavior 10", () => {
  const team: Staff[] = [
    { id: "du", name: "Santiago", role: "dueno", commissionPct: 0, active: true, skipsServiceIds: [] },
    { id: "ne", name: "Nehemías", role: "barbero", commissionPct: 50, active: true, skipsServiceIds: [] },
  ]
  // Lunes 7/9 a domingo 13/9 (hora argentina).
  const days = ["2026-09-07", "2026-09-08", "2026-09-09", "2026-09-10", "2026-09-11", "2026-09-12", "2026-09-13"]
  const corte = (over: Partial<Payment>) => base({ staffId: "ne", listPrice: 20000, amount: 20000, paidAt: "2026-09-10T15:00:00.000Z", ...over })
  const gasto = (over: Partial<Expense>): Expense => ({ id: `g${++n}`, category: "otros", description: "x", amount: 1000, method: "efectivo", paidAt: "2026-09-10T15:00:00.000Z", ...over })

  it("upstream behavior 11", () => {
    const pays = [corte({}), corte({ tip: 2000, amount: 22000 })]
    const exps = [gasto({ category: "vale", staffId: "ne", amount: 5000 }), gasto({ category: "sueldos", staffId: "ne", amount: 3000 })]
    const w = weekClosing(pays, exps, team, days)
    const nemo = w.staffLines.find((l) => l.staff.id === "ne")!
    expect(nemo.services).toBe(2)
    expect(nemo.commission).toBe(20000) // 50 % de 40.000
    expect(nemo.tips).toBe(2000)
    expect(nemo.balance).toBe(20000 + 2000 - 5000 - 3000)
  })

  it("upstream behavior 12", () => {
    const pays = [corte({ staffId: "du" })]
    const exps = [gasto({ category: "vale", staffId: "du", amount: 4000 }), gasto({ category: "insumos", amount: 6000 })]
    const w = weekClosing(pays, exps, team, days)
    expect(w.staffLines.find((l) => l.staff.id === "du")!.balance).toBe(0)
    expect(w.payroll).toBe(0)
    expect(w.ownerAdvances).toBe(4000)
    expect(w.operatingExpenses).toBe(6000)
    expect(w.result).toBe(20000 - 6000)
  })

  it("upstream behavior 13", () => {
    const bebida = corte({ kind: "producto", appointmentId: null, concept: "Drink", listPrice: 3000, amount: 3000 })
    const w = weekClosing([corte({}), bebida], [], team, days)
    expect(w.products).toBe(3000)
    expect(w.staffLines.find((l) => l.staff.id === "ne")!.commission).toBe(10000)
    expect(w.result).toBe(23000 - 10000)
  })

  it("deja afuera lo de otras semanas", () => {
    const w = weekClosing([corte({ paidAt: "2026-09-01T15:00:00.000Z" })], [gasto({ paidAt: "2026-09-20T15:00:00.000Z" })], team, days)
    expect(w.income).toBe(0)
    expect(w.operatingExpenses).toBe(0)
  })
})
