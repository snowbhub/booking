import { readAgentConfig } from "@/lib/agent/config"
import { readZernioConfig,readZernioWebhookConfig } from "@/lib/zernio/config"
import Link from "next/link"
import { ArrowRight, Hand, Phone, Sparkles } from "lucide-react"
import { PageBody, PageHeader, Panel } from "@/components/shell/page-header"
import { DayTimeline } from "@/components/hoy/day-timeline"
import { AgentLiveCard } from "@/components/hoy/agent-live-card"
import { QuickAppointmentButton } from "@/components/hoy/quick-appointment"
import { NewAppointmentButton } from "@/components/agenda/new-appointment-button"
import { StatusPill } from "@/components/agenda/status"
import { ChannelDot } from "@/components/brand/channel-icons"
import { buttonVariants } from "@/components/ui/button"
import { getHoy } from "@/lib/data/queries"
import { formatARS, formatNumber, pct } from "@/lib/money"
import { formatDayLong, hm, minutesOfDay, timeAgo } from "@/lib/time"
import { cn } from "@/lib/utils"

export const metadata = { title: "Today" }

/** Upstream implementation note. */
export default async function HoyPage() {
  const d = await getHoy()
  const now = new Date(d.now)
  const hour = minutesOfDay(d.now) / 60
  const greeting = hour < 13 ? "Good morning" : hour < 20 ? "Good afternoon" : "Good evening"
  const left = d.activeCount - d.doneCount
  const clientOf = (id: string) => d.clients.find((c) => c.id === id)
  const serviceOf = (id: string) => d.services.find((s) => s.id === id)
  const staffOf = (id: string) => d.staff.find((s) => s.id === id)
  const upcoming = d.appointments
    .filter((a) => new Date(a.startsAt) > now && a.status !== "cancelado" && a.status !== "no_show")
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, 6)
  const rewardIds = new Set(d.rewardsToday.map((r) => r.appointment.id))

  // Lo urgente: en escritorio va a la derecha; en el celular, arriba de todo.
  const needsHumanPanel =
    d.inbox.needsHuman.length > 0 ? (
      <Panel
        title={
          <span className="flex items-center gap-2">
            <Hand className="size-4 text-danger" /> Esperan to a person
          </span>
        }
        bodyClassName="px-0 pb-2"
        className="ring-1 ring-danger/25"
      >
        <ul>
          {d.inbox.needsHuman.map((c) => (
            <li key={c.id}>
              <Link href={`/bandeja?c=${c.id}`} className="flex items-start gap-3 px-5 py-2.5 hover:bg-surface-2">
                <ChannelDot channel={c.channel} className="mt-0.5" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium text-ivory">{c.participantName}</span>
                  <span className="block text-[12px] text-ivory-3">{c.handoffReason}</span>
                </span>
                <span className="num text-[11px] text-ivory-3">{timeAgo(c.lastMessageAt, now)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    ) : null

  return (
    <PageBody>
      <PageHeader
        eyebrow={formatDayLong(d.today)}
        title={`${greeting}`}
        description={
          d.open
            ? left > 0
              ? `There are ${left} bookings to serve. The AI Agent created ${d.agent.booked} ${d.agent.booked === 1 ? "booking" : "bookings"} automatically today.`
              : "No bookings left to serve today."
            : "The business is closed today. The AI Agent keeps answering and creating bookings for the week."
        }
        actions={
          <>
            <Link href="/agenda" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-4")}>
              View schedule
            </Link>
            <QuickAppointmentButton staff={d.staff} services={d.services} clients={d.clients} />
            <NewAppointmentButton />
          </>
        }
      />

      <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-5">
          {/* Upstream implementation note. */}
          <section className="panel flex flex-col 2xl:flex-row">
            <div className="p-5 sm:p-6 2xl:flex-[1.35]">
              <p className="eyebrow">Today's cash</p>
              <p className="mt-2 flex items-baseline gap-1.5 text-ivory">
                <span className="font-wide text-[22px] text-ivory-2">$</span>
                <span className="num font-wide text-[44px] font-semibold leading-none tracking-tight">
                  {formatNumber(d.money.gross)}
                </span>
              </p>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface-3">
                <div className="h-full rounded-full bg-gold" style={{ width: `${Math.min(100, pct(d.money.services, d.expected))}%` }} />
              </div>
              <p className="mt-2 text-[12px] text-ivory-3">
                <span className="num text-ivory-2">{formatARS(d.money.services)}</span> de{" "}
                <span className="num">{formatARS(d.expected)}</span> scheduled
                {d.money.tips > 0 && (
                  <>
                    {" "}· <span className="num">{formatARS(d.money.tips)}</span> in tips
                  </>
                )}
              </p>
            </div>
            <div className="grid grid-cols-3 border-t border-line 2xl:flex-[3] 2xl:border-t-0">
              <Metric label="Completed" value={`${d.doneCount}`} unit={`/ ${d.activeCount}`} sub="bookings today" />
              <Metric label="Occupancy" value={`${d.occupancy}`} unit="%" sub={`${d.staff.length} chairs`} />
              <Metric label="Avg. ticket" value={formatNumber(d.money.avgTicket)} unit="$" unitFirst sub="per service" />
            </div>
          </section>

          <div className="xl:hidden">{needsHumanPanel}</div>

          <Panel
            title="Today's schedule"
            action={<span className="num text-[12px] text-ivory-3">{d.open ? `${hm(d.now)} · now` : "closed"}</span>}
          >
            <DayTimeline
              staff={d.staff}
              appointments={d.appointments}
              fixed={d.fixed}
              clients={d.clients}
              services={d.services}
              now={d.now}
              day={d.today}
            />
          </Panel>

          <div className="grid gap-5 lg:grid-cols-2">
            <Panel
              title="Upcoming"
              action={
                <Link href="/agenda" className="inline-flex items-center gap-1 text-[12px] text-ivory-3 hover:text-ivory">
                  Agenda <ArrowRight className="size-3" />
                </Link>
              }
              bodyClassName="px-0 pb-2"
            >
              {upcoming.length === 0 ? (
                <p className="px-5 pb-3 text-[13px] text-ivory-3">No bookings left today.</p>
              ) : (
                <ul>
                  {upcoming.map((a) => (
                    <li key={a.id} className="flex items-center gap-3 px-5 py-2.5">
                      <span className="num w-11 font-wide text-[14px] font-semibold text-ivory">{hm(a.startsAt)}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 truncate text-[13.5px] font-medium text-ivory">
                          {clientOf(a.clientId)?.name}
                          {rewardIds.has(a.id) && (
                            <span className="inline-flex h-4.5 items-center gap-1 rounded-full bg-gold/12 px-1.5 text-[10.5px] font-semibold text-gold">
                              <Sparkles className="size-2.5" /> 50%
                            </span>
                          )}
                        </span>
                        <span className="block truncate text-[12px] text-ivory-3">
                          {serviceOf(a.serviceId)?.name} · {staffOf(a.staffId)?.name}
                        </span>
                      </span>
                      <StatusPill status={a.status} />
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            <Panel title="Re-engage" bodyClassName="px-0 pb-2">
              <p className="px-5 pb-2 text-[12.5px] text-ivory-3">
                Regular clients who have not visited for more than 5 weeks and have no booking.
              </p>
              <ul>
                {d.recontact.map(({ client, lastVisit, visits }) => (
                  <li key={client.id} className="flex items-center gap-3 px-5 py-2.5">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium text-ivory">{client.name}</span>
                      <span className="block text-[12px] text-ivory-3">
                        {visits} visits · last {timeAgo(lastVisit, now)}
                      </span>
                    </span>
                    {client.phone && (
                      <a
                        href={`https://wa.me/${client.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${client.name.split(" ")[0]}! We haven't seen you in a while. Would you like an appointment this week?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
                      >
                        <Phone className="size-3.5" /> Escribirle
                      </a>
                    )}
                  </li>
                ))}
                {d.recontact.length === 0 && <li className="px-5 py-2 text-[13px] text-ivory-3">Nobody yet. 👌</li>}
              </ul>
            </Panel>
          </div>
        </div>

        <aside className="space-y-5">
          <AgentLiveCard
            enabled={d.agent.enabled && readAgentConfig().configured && readZernioConfig().configured && readZernioWebhookConfig().configured}
            conversations={d.agent.conversations}
            booked={d.agent.booked}
            events={d.agent.events}
            now={d.now}
          />

          <div className="hidden xl:block">{needsHumanPanel}</div>

          {d.rewardsToday.length > 0 && (
            <Panel
              title={
                <span className="flex items-center gap-2">
                  <Sparkles className="size-4 text-gold" /> 50% reward today
                </span>
              }
              bodyClassName="px-0 pb-2"
            >
              <ul>
                {d.rewardsToday.map(({ appointment }) => (
                  <li key={appointment.id} className="flex items-center justify-between px-5 py-2 text-[13px]">
                    <span className="text-ivory">{clientOf(appointment.clientId)?.name}</span>
                    <span className="num text-ivory-3">{hm(appointment.startsAt)}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </aside>
      </div>
    </PageBody>
  )
}

function Metric({
  label,
  value,
  unit,
  unitFirst,
  sub,
}: {
  label: string
  value: string
  unit?: string
  unitFirst?: boolean
  sub: string
}) {
  return (
    <div className="min-w-0 border-line px-4 py-4 not-first:border-l sm:px-6 sm:py-5 2xl:border-l 2xl:py-6">
      <p className="eyebrow truncate max-sm:text-[10px] max-sm:tracking-[0.06em]">{label}</p>
      <p className="mt-2 flex items-baseline gap-1 text-ivory">
        {unitFirst && <span className="text-[15px] text-ivory-3">{unit}</span>}
        <span className="num font-wide text-[22px] font-semibold leading-none sm:text-[28px]">{value}</span>
        {!unitFirst && unit && <span className="text-[15px] text-ivory-3">{unit}</span>}
      </p>
      <p className="mt-2 text-[12px] text-ivory-3">{sub}</p>
    </div>
  )
}
