"use client"

import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { Bot, Footprints, MessageCircle, Phone, Pin, Scissors, Sparkles, StickyNote } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button, buttonVariants } from "@/components/ui/button"
import { BRAND } from "@/config/brand"
import { reassignAppointment, setAppointmentStatus } from "@/lib/data/actions"
import { setAppointmentCheckIn } from "@/lib/staff/checkin-actions"
import { formatARS } from "@/lib/money"
import { dayKey, formatDayShort, hm, hmToMinutes, minutesOfDay, minutesToHm } from "@/lib/time"
import { cn } from "@/lib/utils"
import { checkStaffTransfer, offHoursFor } from "@/lib/domain/slots"
import { useNewAppointment } from "./new-appointment"
import { SOURCE_LABEL, StatusPill } from "./status"
import { ChargeDialog } from "@/components/caja/charge-dialog"
import type { LoyaltyStatus } from "@/lib/domain/loyalty"
import type { Appointment, AppointmentStatus, Client, FixedSlot, Service, Staff } from "@/lib/domain/types"

const PX_PER_MIN = 1.25

/** Upstream implementation note. */
export function DayGrid({
  day,
  isToday,
  now,
  staff,
  services,
  clients,
  appointments,
  fixed,
  paidIds,
  arrivedIds,
  loyalty,
}: {
  day: string
  isToday: boolean
  now: string
  staff: Staff[]
  services: Service[]
  clients: Client[]
  appointments: Appointment[]
  /** Upstream implementation note. */
  fixed: FixedSlot[]
  paidIds: string[]
  arrivedIds: string[]
  loyalty: Record<string, LoyaltyStatus>
}) {
  const { open: openNew } = useNewAppointment()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [chargingId, setChargingId] = useState<string | null>(null)
  const [mobileMode,setMobileMode] = useState(false)
  const [selectedStaffId,setSelectedStaffId] = useState(staff[0]?.id ?? "")
  useEffect(()=>{
    const media=window.matchMedia("(max-width:767px)")
    const sync=()=>setMobileMode(media.matches)
    sync()
    media.addEventListener("change",sync)
    return ()=>media.removeEventListener("change",sync)
  },[])
  useEffect(()=>{
    if(staff.length && !staff.some(s=>s.id===selectedStaffId))setSelectedStaffId(staff[0].id)
  },[staff,selectedStaffId])
  const [displayMode,setDisplayMode]=useState<"team"|"single">("single")
  const visibleStaff=mobileMode&&displayMode==="single"?staff.filter(s=>s.id===selectedStaffId):staff


  const weekday=new Date(day+"T12:00:00Z").getUTCDay()
  const shiftBounds=staff.flatMap(member=>(member.schedule||[])
    .filter(shift=>shift.weekday===weekday)
    .flatMap(shift=>[hmToMinutes(shift.start),hmToMinutes(shift.end)]))
  const appointmentBounds=appointments.flatMap(a=>[minutesOfDay(a.startsAt),minutesOfDay(a.endsAt)])
  const lower=Math.min(hmToMinutes(BRAND.openingHours.open),...shiftBounds,...appointmentBounds)
  const upper=Math.max(hmToMinutes(BRAND.openingHours.close),...shiftBounds,...appointmentBounds)
  const openMin=Math.max(0,Math.floor(lower/60)*60)
  const closeMin=Math.min(1440,Math.ceil(upper/60)*60)
  const height = (closeMin - openMin) * PX_PER_MIN
  const hours = Array.from({ length: (closeMin - openMin) / 60 + 1 }, (_, i) => openMin + i * 60)
  const nowMin = minutesOfDay(now)
  const paid = new Set(paidIds)
  const arrivedSet = new Set(arrivedIds)

  const serviceOf = (id: string) => services.find((s) => s.id === id)!
  const clientOf = (id: string) => clients.find((c) => c.id === id)
  const selected = appointments.find((a) => a.id === selectedId) ?? null
  const charging = appointments.find((a) => a.id === chargingId) ?? null

  // Upstream implementation note.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id && appointments.some((a) => a.id === id)) {
      const t = window.setTimeout(() => setSelectedId(id), 0)
      return () => window.clearTimeout(t)
    }
  }, [appointments])

  function clickEmpty(staffId: string, e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const minutes = openMin + Math.floor((e.clientY - rect.top) / PX_PER_MIN / 15) * 15
    openNew({ day, staffId, time: minutesToHm(Math.min(minutes, closeMin - 15)) })
  }

  return (
    <>
      <div className="panel min-w-0 overflow-hidden">
        {staff.length===0 && <div className="p-5 text-center text-sm text-ivory-2">No barbers added. Add staff under Settings → Team before creating appointments.</div>}
        {mobileMode && staff.length>0 && <div className="border-b border-line p-2.5">
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-line-strong bg-surface-1 p-1">
            <button type="button" data-testid="calendar-view-team" aria-pressed={displayMode==="team"} onClick={()=>setDisplayMode("team")}
              className={cn("rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors",displayMode==="team"?"bg-surface-3 text-ivory":"text-ivory-3")}>Team · all barbers</button>
            <button type="button" data-testid="calendar-view-single" aria-pressed={displayMode==="single"} onClick={()=>setDisplayMode("single")}
              className={cn("rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors",displayMode==="single"?"bg-surface-3 text-ivory":"text-ivory-3")}>One barber</button>
          </div>
          {displayMode==="single" && <label className="mt-2 flex min-w-0 items-center gap-2">
            <span className="shrink-0 text-xs font-medium text-ivory-3">Barber</span>
            <select data-testid="calendar-barber-select" aria-label="Select barber" value={selectedStaffId}
              onChange={e=>setSelectedStaffId(e.target.value)}
              className="min-h-11 min-w-0 flex-1 rounded-lg border border-line-strong bg-surface-2 px-3 text-sm font-semibold text-ivory outline-none focus-visible:ring-2 focus-visible:ring-ivory-2">
              {staff.map(member=><option key={member.id} value={member.id}>{member.name}</option>)}
            </select>
          </label>}
        </div>}
        <div data-calendar-scroll data-visible-staff={visibleStaff.length} data-display-mode={displayMode} className={mobileMode&&displayMode==="single"?"overflow-x-hidden":"overflow-x-auto scroll-thin"}>
          <div style={mobileMode&&displayMode==="team"?{minWidth:56+Math.max(1,visibleStaff.length)*150}:undefined}
            className={mobileMode&&displayMode==="single"?"w-full min-w-0":!mobileMode?"min-w-[620px]":"w-full"}>
            {/* Encabezados de silla */}
            <div className="grid border-b border-line" style={{ gridTemplateColumns: `56px repeat(${visibleStaff.length}, minmax(0,1fr))` }}>
              <div />
              {visibleStaff.map((s) => {
                const mine = appointments.filter((a) => a.staffId === s.id && a.status !== "cancelado" && a.status !== "no_show")
                return (
                  <div key={s.id} className="flex items-center gap-2.5 border-l border-line px-4 py-3">
                    <span className="grid size-8 place-items-center rounded-full bg-surface-3 font-wide text-[13px] font-semibold text-ivory">
                      {s.name[0]}
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[14px] font-medium text-ivory">{s.name}</span>
                      <span className="num block text-[11.5px] text-ivory-3">
                        {`${mine.length} bookings`}
                      </span>
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Grilla */}
            <div className="relative grid" style={{ gridTemplateColumns: `56px repeat(${visibleStaff.length}, minmax(0,1fr))`, height }}>
              <div className="relative">
                {hours.map((m) => (
                  <span
                    key={m}
                    className="num absolute right-2 -translate-y-1/2 text-[11px] text-ivory-3"
                    style={{ top: (m - openMin) * PX_PER_MIN }}
                  >
                    {minutesToHm(m)}
                  </span>
                ))}
              </div>

              {visibleStaff.map((s) => (
                <div
                  key={s.id}
                  onClick={(e) => clickEmpty(s.id, e)}
                  className="group/col relative cursor-copy border-l border-line"
                  title={`Agendar con ${s.name}`}
                >
                  {hours.slice(1, -1).map((m) => (
                    <span key={m} aria-hidden className="absolute inset-x-0 h-px bg-line" style={{ top: (m - openMin) * PX_PER_MIN }} />
                  ))}
                  {hours.slice(0, -1).map((m) => (
                    <span
                      key={`h${m}`}
                      aria-hidden
                      className="absolute inset-x-0 h-px bg-line/40"
                      style={{ top: (m + 30 - openMin) * PX_PER_MIN }}
                    />
                  ))}

                  {/* Upstream implementation note. */}
                  {offHoursFor(s, day).map(([a, b]) => (
                    <div
                      key={`off${a}`}
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bg-black/30 bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgb(255_255_255/0.02)_6px_12px)]"
                      style={{ top: (a - openMin) * PX_PER_MIN, height: (b - a) * PX_PER_MIN }}
                    >
                      {(b - a) * PX_PER_MIN >= 30 && (
                        <span className="num block px-2.5 pt-1.5 text-[11px] text-ivory-3/70">
                          {b - a === closeMin - openMin ? "Not working today" : `No atiende · ${minutesToHm(a)} a ${minutesToHm(b)}`}
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Upstream implementation note. */}
                  {fixed
                    .filter((f) => f.staffId === s.id)
                    .map((f) => {
                      const start = hmToMinutes(f.start)
                      const end = hmToMinutes(f.end)
                      return (
                        <Link
                          key={f.id}
                          href="/ajustes?tab=fijos"
                          onClick={(e) => e.stopPropagation()}
                          title={`Fixed booking${f.label ? ": " + f.label : ""}, ${f.start} a ${f.end}. Edit it in Settings.`}
                          className="absolute inset-x-1.5 overflow-hidden rounded-lg bg-surface-1 bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgb(255_255_255/0.035)_6px_12px)] px-2.5 py-1.5 ring-1 ring-line ring-inset transition-colors hover:ring-line-strong"
                          style={{ top: (start - openMin) * PX_PER_MIN + 1, height: (end - start) * PX_PER_MIN - 2 }}
                        >
                          <span className="flex min-w-0 items-center gap-1.5">
                            <Pin className="size-3 shrink-0 text-ivory-3" aria-hidden />
                            <span className="num shrink-0 text-[11px] text-ivory-3">{f.start}</span>
                            <span className="truncate text-[13px] font-medium text-ivory-2">{f.label ?? "Fixed booking"}</span>
                          </span>
                          <span className="block text-[11.5px] text-ivory-3">{f.weekday === null ? "Fixed booking · one day only" : "Fixed booking · every week"}</span>
                        </Link>
                      )
                    })}

                  {appointments
                    .filter((a) => a.staffId === s.id)
                    .map((a) => {
                      const start = minutesOfDay(a.startsAt)
                      const end = minutesOfDay(a.endsAt)
                      const service = serviceOf(a.serviceId)
                      const client = clientOf(a.clientId)
                      const reward = loyalty[a.clientId]?.rewardReady && service.countsForLoyalty && !paid.has(a.id)
                      const short = (end - start) * PX_PER_MIN < 38
                      return (
                        <button
                          key={a.id}
                          id={a.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedId(a.id)
                          }}
                          className={cn(
                            "absolute inset-x-0.5 overflow-hidden rounded-md border-l-[3px] px-2 text-left shadow-sm transition-[background-color,transform] hover:z-10 hover:-translate-y-px",
                            short ? "flex items-center py-0" : "py-1.5",
                            // Upstream implementation note.
                            a.status === "completado" && "border-l-emerald-600 bg-emerald-500/10 ring-1 ring-emerald-500/25 ring-inset",
                            a.status === "en_curso" && "border-l-teal-600 bg-teal-500/15 ring-1 ring-teal-500/30 ring-inset",
                            a.status === "confirmado" && "border-l-amber-500 bg-amber-500/12 ring-1 ring-amber-500/25 ring-inset hover:bg-amber-500/15",
                            a.status === "pendiente" && "border-l-violet-500 bg-violet-500/12 ring-1 ring-violet-500/25 ring-inset",
                            (a.status === "cancelado" || a.status === "no_show") && "border-l-rose-500 bg-rose-500/10 opacity-70 ring-1 ring-rose-500/20 ring-inset"
                          )}
                          style={{ top: (start - openMin) * PX_PER_MIN + 1, height: (end - start) * PX_PER_MIN - 2 }}
                        >
                          <span className="block min-w-0">
                            <span className="num block truncate text-[10px] font-semibold text-ivory-2">{hm(a.startsAt)}–{hm(a.endsAt)}</span>
                            <span className="block truncate text-[12px] font-semibold leading-4 text-ivory">{client?.name||"Client"}</span>
                          </span>
                          {!short && (
                            <span className="flex items-center gap-1.5 text-[11.5px] text-ivory-3">
                              <span className="truncate">{service.name}</span>
                              {paid.has(a.id) && <span className="ml-auto shrink-0 rounded bg-ok/15 px-1 py-0.5 text-[10px] font-semibold text-ok">Paid</span>}
                              {a.source === "agente" && <Bot className="size-3 shrink-0" aria-label="Booked by the agent" />}
                              {reward && <Sparkles className="size-3 shrink-0 text-gold" aria-label="50% loyalty discount" />}
                            </span>
                          )}
                        </button>
                      )
                    })}
                </div>
              ))}

              {isToday && nowMin > openMin && nowMin < closeMin && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-0 left-[50px] z-20 flex items-center"
                  style={{ top: (nowMin - openMin) * PX_PER_MIN }}
                >
                  <span className="size-[7px] rounded-full bg-gold shadow-[0_0_10px_2px_rgb(214_179_106/0.5)]" />
                  <span className="h-px flex-1 bg-gold" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AppointmentSheet
        appointment={selected}
        service={selected ? serviceOf(selected.serviceId) : undefined}
        client={selected ? clientOf(selected.clientId) : undefined}
        staff={selected ? staff.find((s) => s.id === selected.staffId) : undefined}
        allStaff={staff}
        appointments={appointments}
        now={now}
        loyalty={selected ? loyalty[selected.clientId] : undefined}
        paid={selected ? paid.has(selected.id) : false}
        arrived={selected ? arrivedSet.has(selected.id) : false}
        onClose={() => setSelectedId(null)}
        onCharge={(id) => {
          setSelectedId(null)
          setChargingId(id)
        }}
      />

      {charging && (
        <ChargeDialog
          key={charging.id}
          open
          onOpenChange={(o) => !o && setChargingId(null)}
          appointment={charging}
          client={clientOf(charging.clientId)}
          service={serviceOf(charging.serviceId)}
          staff={staff.find((s) => s.id === charging.staffId)}
          loyalty={loyalty[charging.clientId]}
        />
      )}
    </>
  )
}

function AppointmentSheet({
  appointment: a,
  service,
  client,
  staff,
  allStaff,
  appointments,
  now,
  loyalty,
  paid,
  arrived,
  onClose,
  onCharge,
}: {
  appointment: Appointment | null
  service: Service | undefined
  client: Client | undefined
  staff: Staff | undefined
  allStaff: Staff[]
  appointments: Appointment[]
  now: string
  loyalty: LoyaltyStatus | undefined
  paid: boolean
  arrived: boolean
  onClose: () => void
  onCharge: (id: string) => void
}) {
  const [pending, startTransition] = useTransition()
  const transfers = a && ["pendiente", "confirmado"].includes(a.status) && new Date(a.startsAt) > new Date(now)
    ? allStaff.filter((member) => member.id !== a.staffId).map((member) => ({
        member,
        check: checkStaffTransfer({ appointment: a, staff: member, service: { id: a.serviceId }, appointments, now: new Date(now) }),
      }))
    : []

  function transfer(staffId: string, name: string) {
    if (!a) return
    startTransition(async () => {
      const res = await reassignAppointment(a.id, staffId)
      if (!res.ok) toast.error(res.error)
      else {
        toast.success(`Booking moved to ${name}. Let the client know if they expected another staff member.`)
        onClose()
      }
    })
  }

  function toggleCheckIn(next:boolean){
    if(!a)return
    startTransition(async()=>{
      const result=await setAppointmentCheckIn(a.id,next)
      if(!result.ok)toast.error(result.error)
      else{toast.success(next?"Client checked in":"Check-in undone");onClose()}
    })
  }

  function move(status: AppointmentStatus, message: string) {
    if (!a) return
    startTransition(async () => {
      const res = await setAppointmentStatus(a.id, status)
      if (!res.ok) toast.error(res.error)
      else {
        toast.success(message)
        onClose()
      }
    })
  }

  return (
    <Sheet open={!!a} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full min-w-0 max-w-full border-line sm:max-w-[420px]">
        {a && service && (
          <>
            <SheetHeader className="border-b border-line px-6 pt-6 pb-5">
              <div className="flex items-center gap-2">
                <StatusPill status={a.status} />
                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold",paid?"bg-ok/15 text-ok":"bg-surface-3 text-ivory-2")}>
                  {paid?"Paid":"Unpaid"}
                </span>
                {arrived && <span className="rounded-full bg-ok/15 px-2 py-0.5 text-[11px] font-semibold text-ok">Arrived</span>}
              </div>
              <SheetTitle className="font-display text-[22px] leading-tight">{client?.name}</SheetTitle>
              <SheetDescription className="text-ivory-2">
                {service.name} · {formatDayShort(dayKey(a.startsAt))} ·{" "}
                <span className="num">
                  {hm(a.startsAt)}–{hm(a.endsAt)}
                </span>{" "}
                con {staff?.name}
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 space-y-5 overflow-y-auto px-6 scroll-thin">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
                <Info label="Price" value={<span className="num">{formatARS(a.price)}</span>} />
                <Info
                  label="Source"
                  value={
                    <span className="inline-flex items-center gap-1.5">
                      {a.source === "agente" ? <Bot className="size-3.5" /> : a.source === "walk_in" ? <Footprints className="size-3.5" /> : <Scissors className="size-3.5" />}
                      {SOURCE_LABEL[a.source]}
                    </span>
                  }
                />
                {client?.phone && <Info label="Phone" value={<span className="num">{client.phone}</span>} />}
                {loyalty && (
                  <Info
                    label="Loyalty"
                    value={
                      loyalty.rewardReady ? (
                        <span className="inline-flex items-center gap-1 text-gold">
                          <Sparkles className="size-3.5" /> 50% loyalty discount
                        </span>
                      ) : (
                        <span className="num">
                          {loyalty.stamps} de {loyalty.required} sellos
                        </span>
                      )
                    }
                  />
                )}
              </dl>

              {client?.cutNotes && (
                <div className="rounded-xl border border-line bg-surface-2 px-4 py-3">
                  <p className="eyebrow mb-1 flex items-center gap-1.5">
                    <StickyNote className="size-3" /> Service notes
                  </p>
                  <p className="text-[13.5px] text-ivory">{client.cutNotes}</p>
                </div>
              )}
              {a.notes && <p className="text-[13px] text-ivory-2">{a.notes}</p>}

              {transfers.length > 0 && (
                <section className="rounded-xl border border-line bg-surface-2 px-4 py-3" aria-label="Move booking to another staff member">
                  <p className="text-[13px] font-medium text-ivory">Move to another staff member</p>
                  <p className="mt-1 text-[12px] text-ivory-3">Same time and service. If the client requested someone specific, let them know before changing.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {transfers.map(({ member, check }) => (
                      <Button key={member.id} type="button" variant="outline" disabled={pending || !check.ok}
                        title={check.ok ? `Pasar a ${member.name}` : check.error}
                        onClick={() => transfer(member.id, member.name)}>
                        {member.name}
                      </Button>
                    ))}
                  </div>
                  {transfers.every(({ check }) => !check.ok) && (
                    <p className="mt-2 text-[12px] text-ivory-3">No other staff member is available in this time range.</p>
                  )}
                </section>
              )}

              <div className="flex flex-wrap gap-2">
                {client?.phone && (
                  <a
                    href={`https://wa.me/${client.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
                  >
                    <Phone className="size-3.5" /> WhatsApp
                  </a>
                )}
                {a.conversationId && (
                  <Link href={`/bandeja?c=${a.conversationId}`} className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}>
                    <MessageCircle className="size-3.5" /> Ver chat
                  </Link>
                )}
              </div>
            </div>

            {/* Upstream implementation note. */}
            <div className="space-y-2 border-t border-line px-6 py-4">
              {["pendiente","confirmado"].includes(a.status) && (
                <Button variant="outline" className="h-11 w-full" disabled={pending} onClick={()=>toggleCheckIn(!arrived)}>
                  {arrived?"Undo check-in":"Client arrived"}
                </Button>
              )}
              {a.status === "pendiente" && (
                <Button size="lg" className="h-11 w-full font-semibold" disabled={pending} onClick={() => move("confirmado", "Booking confirmed")}>
                  Confirm booking
                </Button>
              )}
              {a.status === "confirmado" && (
                <Button size="lg" className="h-11 w-full font-semibold" disabled={pending} onClick={() => move("en_curso", "Booking started")}>
                  <Scissors /> Empezar
                </Button>
              )}
              {(a.status === "en_curso" || (a.status === "completado" && !paid)) && (
                <Button size="lg" className="h-11 w-full font-semibold" disabled={pending} onClick={() => onCharge(a.id)}>
                  Cobrar
                </Button>
              )}
              {a.status === "en_curso" && (
                <Button variant="outline" className="h-10 w-full" disabled={pending} onClick={() => move("completado", "Finished: unused time is free and payment remains pending in Cash")}>
                  Completed, pay later
                </Button>
              )}
              {["pendiente", "confirmado"].includes(a.status) && (
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" disabled={pending} onClick={() => move("no_show", "Marcado como no vino")}>
                    No-show
                  </Button>
                  <Button variant="destructive" disabled={pending} onClick={() => move("cancelado", "Booking cancelled")}>
                    Cancel appointment
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="eyebrow mb-0.5 text-[10px]">{label}</dt>
      <dd className="text-ivory">{value}</dd>
    </div>
  )
}
