import { Sidebar } from "@/components/shell/sidebar"
import { Topbar } from "@/components/shell/topbar"
import { MobileNav } from "@/components/shell/mobile-nav"
import { BookingWorkspaceShell } from "@/components/shell/booking-workspace-shell"
import { AutoRefresh } from "@/components/shell/auto-refresh"
import { NewAppointmentProvider } from "@/components/agenda/new-appointment"
import { getShell } from "@/lib/data/queries"
import { db } from "@/lib/data/repo"
import { addDays, dayKey } from "@/lib/time"
import { cookies } from "next/headers"
import { normalizeLocale } from "@/i18n/messages"

export default async function PanelLayout({ children }: LayoutProps<"/">) {
  const shell = await getShell()
  const s = await db()
  const initialLocale = normalizeLocale((await cookies()).get("booking_locale")?.value)
  const today = dayKey(shell.now)
  const horizon = addDays(today, 15)

  return (
    <NewAppointmentProvider
      catalog={{
        staff: s.staff,
        services: s.services,
        clients: s.clients,
        appointments: s.appointments.filter((a) => {
          const d = dayKey(a.startsAt)
          return d >= today && d <= horizon
        }),
        now: shell.now,
        slotStepMin: s.shopSettings.slotStepMin,
      }}
    >
      <AutoRefresh />
      <BookingWorkspaceShell
        sidebar={<Sidebar info={shell} />}
        topbar={<Topbar info={shell} now={shell.now} simulated={shell.simulated} initialLocale={initialLocale} />}
        mobileNav={<MobileNav info={shell} />}
      >
        {children}
      </BookingWorkspaceShell>
    </NewAppointmentProvider>
  )
}
