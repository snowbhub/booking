import { BRAND } from "@/config/brand"
import type { Payment, Service } from "./types"

/** Upstream implementation note. */

export interface LoyaltyStatus {
  /** Sellos del ciclo actual (0 … stampsRequired). */
  stamps: number
  required: number
  /** Upstream implementation note. */
  rewardReady: boolean
  rewardsRedeemed: number
  /** Upstream implementation note. */
  stampDates: string[]
}

export function loyaltyStatus(
  clientId: string,
  payments: Payment[],
  services: Service[]
): LoyaltyStatus {
  const required = BRAND.loyalty.stampsRequired
  const counts = new Set(services.filter((s) => s.countsForLoyalty).map((s) => s.id))

  let stampDates: string[] = []
  let rewardsRedeemed = 0

  const history = payments
    // Upstream implementation note.
    // Upstream implementation note.
    .filter((p) => p.clientId === clientId && p.kind === "servicio" && p.serviceId && counts.has(p.serviceId))
    .sort((a, b) => a.paidAt.localeCompare(b.paidAt))

  for (const p of history) {
    if (p.discountReason === "fidelidad") {
      // Upstream implementation note.
      rewardsRedeemed++
      stampDates = []
    } else if (stampDates.length < required) {
      stampDates.push(p.paidAt)
    }
  }

  return {
    stamps: stampDates.length,
    required,
    rewardReady: stampDates.length >= required,
    rewardsRedeemed,
    stampDates,
  }
}

/** Upstream implementation note. */
export function loyaltyDiscount(status: LoyaltyStatus, service: Service): number {
  if (!status.rewardReady || !service.countsForLoyalty) return 0
  return Math.round((service.price * BRAND.loyalty.rewardDiscountPct) / 100)
}
