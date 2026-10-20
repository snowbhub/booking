import type { PaymentMethod } from "@/lib/domain/types"

const ars = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
})
const plain = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 })

/** "$ 186.000" */
export function formatARS(amount: number): string {
  return ars.format(Math.round(amount))
}

/** Upstream implementation note. */
export function formatNumber(amount: number): string {
  return plain.format(Math.round(amount))
}

/** Upstream implementation note. */
export function formatCompact(amount: number): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `$${(amount / 1_000_000).toLocaleString("es-AR", { maximumFractionDigits: 1 })}M`
  }
  if (Math.abs(amount) >= 1_000) return `$${Math.round(amount / 1_000)}k`
  return `$${amount}`
}

export const METHOD_LABEL: Record<PaymentMethod, string> = {
  efectivo: "Cash",
  transferencia: "Bank transfer",
  mercadopago: "Mercado Pago",
  debito: "Debit card",
  credito: "Credit card",
}

export const METHODS: PaymentMethod[] = [
  "efectivo",
  "transferencia",
  "mercadopago",
  "debito",
  "credito",
]

export function pct(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 100) : 0
}

/** Upstream implementation note. */
export function delta(current: number, previous: number): number | null {
  if (previous <= 0) return null
  return Math.round(((current - previous) / previous) * 100)
}
