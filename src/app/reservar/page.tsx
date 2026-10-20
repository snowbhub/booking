import { BookingMark } from "@/components/brand/booking-mark"
import { BookingFlow } from "@/components/booking/booking-flow"
import { BRAND } from "@/config/brand"
import { db, now } from "@/lib/data/repo"
import { addDays, dayKey } from "@/lib/time"
import type { Appointment } from "@/lib/domain/types"

export const metadata = {
  title: "Book your appointment",
  description: `${BRAND.fullName} — ${BRAND.address}. Book online in a minute.`,
  robots: { index: true, follow: true },
}

/** Upstream implementation note. */
export default async function ReservarPage() {
  const s = await db()
  const n = await now()
  const today = dayKey(n)
  const horizon = addDays(today, 15)

  // Upstream implementation note.
  const busy: Appointment[] = s.appointments
    .filter((a) => {
      const d = dayKey(a.startsAt)
      return d >= today && d <= horizon && a.status !== "cancelado" && a.status !== "no_show"
    })
    .map((a) => ({
      id: "",
      clientId: "",
      staffId: a.staffId,
      serviceId: "",
      startsAt: a.startsAt,
      endsAt: a.endsAt,
      status: a.status,
      source: "web",
      price: 0,
      notes: null,
      conversationId: null,
      holdExpiresAt: null,
      createdAt: "",
    }))

  return (
    <div className="min-h-dvh bg-obsidian text-ivory">
      <header className="sticky top-0 z-30 border-b border-line bg-obsidian/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4 sm:px-6">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-2">
            <BookingMark size={29}/>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-lg font-bold tracking-tight">Booking</div>
            <div className="truncate text-xs text-ivory-3">{BRAND.address}</div>
          </div>
          <div id="booking-public-header-actions" className="shrink-0" />
        </div>
      </header>
      <main className="pt-7">
        <BookingFlow services={s.services} staff={s.staff} busy={busy} now={n.toISOString()}
          stepMin={s.shopSettings.slotStepMin}
          deposit={s.shopSettings.depositEnabled ? { amount: s.shopSettings.depositAmount, holdMin: s.shopSettings.depositHoldMin } : null}/>
      </main>
      <footer className="border-t border-line px-4 py-7 text-center text-xs text-ivory-3">Booking · Appointments made simple</footer>
    </div>
  )
}
