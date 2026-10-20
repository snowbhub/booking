/** Product / tenant defaults. */
export const BRAND = {
  name: "Booking",
  fullName: "Booking",
  tagline: "Appointments made simple",
  claim: "Simple. Clear. On time.",
  address: "Your business address",
  city: "",
  timezone: "Europe/Berlin",
  currency: "ARS",
  instagram: "",
  whatsappLink: "#",
  openingHours: { days: [2,3,4,5,6], open: "11:00", close: "20:00" },
  booking: { slotStepMin: 60 },
  loyalty: { stampsRequired: 5, rewardDiscountPct: 50 },
} as const
export type Brand = typeof BRAND
