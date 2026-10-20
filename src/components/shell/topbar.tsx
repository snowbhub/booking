"use client"
import { normalizeLocale, translateText, type Locale } from "@/i18n/messages"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Hand, FlaskConical } from "lucide-react"
import { BookingMark } from "@/components/brand/booking-mark"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { dayKey, formatDayLong, hm } from "@/lib/time"
import { NAV, SETTINGS_ITEM, isActive } from "./nav"
import type { ShellInfo } from "./sidebar"

/** Upstream implementation note. */
export function Topbar({ info, now, simulated, initialLocale }: { info: ShellInfo; now: string; simulated: boolean; initialLocale: Locale }) {
  const pathname = usePathname()
  const [locale,setLocale]=useState<Locale>(initialLocale)
  useEffect(()=>{
    const sync=()=>setLocale(normalizeLocale(localStorage.getItem("booking_locale")||document.documentElement.lang||initialLocale))
    window.addEventListener("booking:locale",sync)
    return ()=>window.removeEventListener("booking:locale",sync)
  },[initialLocale])

  const clock = useClock(now, simulated)
  const title =
    [...NAV.flatMap((g) => g.items), SETTINGS_ITEM].find((i) => isActive(pathname, i.href))?.label ?? ""

  return (
    <header className="booking-app-header sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-obsidian/85 px-4 backdrop-blur-md sm:px-6 lg:h-16 lg:px-8">
      <Link href="/" className="lg:hidden" aria-label="Booking — Today">
        <span data-brand-anchor className="grid">
          <BookingMark size={30} />
        </span>
      </Link>
      <span data-i18n-skip="true" className="font-display text-[15px] text-ivory lg:hidden">{translateText(title,locale)}</span>

      <p className="hidden items-baseline gap-2 lg:flex">
        <span className="text-[14px] font-medium text-ivory first-letter:uppercase">{formatDayLong(dayKey(clock))}</span>
        <span className="num text-[14px] text-ivory-3">{hm(clock)}</span>
      </p>

      {simulated && (
        <Tooltip>
          <TooltipTrigger
            render={
              <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-line-strong px-2.5 text-[11px] font-medium text-ivory-2" />
            }
          >
            <FlaskConical className="size-3" /> Demo
          </TooltipTrigger>
          <TooltipContent className="max-w-64">
            The business is closed at this time, so the demo simulates an active workday. The data is for demonstration.
          </TooltipContent>
        </Tooltip>
      )}

      <div className="ml-auto flex items-center gap-2">
        {info.needsHuman > 0 && (
          <Link
            href="/bandeja?filtro=humano"
            className="inline-flex h-8 items-center gap-2 rounded-full bg-danger/12 px-3 text-[12.5px] font-medium text-danger ring-1 ring-danger/30 transition-colors hover:bg-danger/20"
          >
            <Hand className="size-3.5" />
            <span className="num">{info.needsHuman}</span>
            <span className="hidden sm:inline">
              {info.needsHuman === 1 ? "chat espera to a person" : "chats esperan to a person"}
            </span>
          </Link>
        )}
        <div id="booking-header-actions" className="shrink-0" />
      </div>
    </header>
  )
}

/** Upstream implementation note. */
function useClock(initial: string, simulated: boolean) {
  const [offset] = useState(() => (simulated ? new Date(initial).getTime() - Date.now() : 0))
  const [tick, setTick] = useState(() => new Date(initial).getTime())
  useEffect(() => {
    const id = window.setInterval(() => setTick(Date.now() + offset), 20_000)
    return () => window.clearInterval(id)
  }, [offset])
  return new Date(tick)
}
