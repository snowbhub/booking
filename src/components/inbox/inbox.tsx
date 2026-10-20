"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  ArrowLeft,
  Bot,
  CalendarCheck2,
  CalendarClock,
  Clock3,
  Hand,
  Send,
  Sparkles,
  StickyNote,
  UserRound,
} from "lucide-react"
import { ChannelDot, CHANNEL_LABEL } from "@/components/brand/channel-icons"
import { Button } from "@/components/ui/button"
import { useNewAppointment } from "@/components/agenda/new-appointment"
import { LoyaltyStamps } from "@/components/clients/loyalty-card"
import { markConversationRead, sendStaffMessage, setConversationMode } from "@/lib/data/actions"
import { BRAND } from "@/config/brand"
import { dayKey, formatDayShort, hm, timeAgo } from "@/lib/time"
import { cn } from "@/lib/utils"
import type { LoyaltyStatus } from "@/lib/domain/loyalty"
import type { Appointment, Client, Conversation, Message, Service, Staff } from "@/lib/domain/types"

export type InboxFilter = "todas" | "sin_leer" | "humano" | "ia"

const FILTERS: { id: InboxFilter; label: string }[] = [
  { id: "todas", label: "All" },
  { id: "sin_leer", label: "Unread" },
  { id: "humano", label: "For me" },
  { id: "ia", label: "AI" },
]

/** Upstream implementation note. */
const QUICK = [
  { label: "Address", text: `Estamos en ${BRAND.address} 📍 Te esperamos.` },
  { label: "Time", text: "We are open Tuesday to Saturday, 11:00–20:00." },
  { label: "Payment methods", text: "We accept cash, bank transfer, Mercado Pago, debit and credit cards." },
  { label: "Booking link", text: "You can book directly here: /reservar ✂️" },
]

export function Inbox({
  now,
  conversations,
  messages,
  clients,
  staff,
  services,
  appointments,
  loyalty,
  agentName,
  selectedId,
  filter,
}: {
  now: string
  conversations: Conversation[]
  messages: Message[]
  clients: Client[]
  staff: Staff[]
  services: Service[]
  appointments: Appointment[]
  loyalty: Record<string, LoyaltyStatus>
  agentName: string
  selectedId: string | null
  filter: InboxFilter
}) {
  const list = conversations.filter((c) =>
    filter === "sin_leer" ? c.unread > 0 : filter === "humano" ? c.mode === "humano" : filter === "ia" ? c.mode === "ia" : true
  )
  const selected = conversations.find((c) => c.id === selectedId) ?? null
  const client = selected?.clientId ? clients.find((c) => c.id === selected.clientId) : undefined

  return (
    <div className="-mb-24 grid h-[calc(100dvh-3.5rem-4rem-env(safe-area-inset-bottom))] lg:-mb-10 lg:h-[calc(100dvh-4rem)] lg:grid-cols-[340px_minmax(0,1fr)] 2xl:grid-cols-[340px_minmax(0,1fr)_320px]">
      {/* Lista */}
      <aside className={cn("flex min-h-0 flex-col border-line lg:border-r", selected && "hidden lg:flex")}>
        <div className="px-4 pt-5 pb-3">
          <h1 className="font-display text-[22px] text-ivory">Inbox</h1>
          <p className="mt-1 flex items-center gap-1.5 text-[12.5px] text-ivory-3">
            <ChannelDot channel="whatsapp" /> WhatsApp <ChannelDot channel="instagram" className="ml-1" /> Instagram · via Zernio
          </p>
          <div className="mt-4 flex gap-1 rounded-lg bg-surface-1 p-1">
            {FILTERS.map((f) => {
              const count =
                f.id === "humano" ? conversations.filter((c) => c.needsHuman).length : f.id === "sin_leer" ? conversations.filter((c) => c.unread).length : 0
              return (
                <Link
                  key={f.id}
                  href={`/bandeja?filtro=${f.id}${selectedId ? `&c=${selectedId}` : ""}`}
                  className={cn(
                    "flex h-8 flex-1 items-center justify-center gap-1 rounded-md text-[12.5px] font-medium transition-colors",
                    filter === f.id ? "bg-surface-3 text-ivory" : "text-ivory-3 hover:text-ivory-2"
                  )}
                >
                  {f.label}
                  {count > 0 && (
                    <span className={cn("num text-[11px]", f.id === "humano" ? "text-danger" : "text-ivory-2")}>{count}</span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto scroll-thin">
          {list.map((c) => {
            const last = [...messages].reverse().find((m) => m.conversationId === c.id)
            const active = c.id === selectedId
            return (
              <li key={c.id}>
                <Link
                  href={`/bandeja?filtro=${filter}&c=${c.id}`}
                  className={cn(
                    "relative flex gap-3 px-4 py-3 transition-colors",
                    active ? "bg-surface-2" : "hover:bg-surface-1"
                  )}
                >
                  {c.needsHuman && <span aria-hidden className="absolute inset-y-3 left-0 w-[3px] rounded-r bg-danger" />}
                  <span className="relative shrink-0">
                    <span className="grid size-10 place-items-center rounded-full bg-surface-3 font-wide text-[14px] font-semibold text-ivory">
                      {c.participantName[0]}
                    </span>
                    <ChannelDot channel={c.channel} className="absolute -right-0.5 -bottom-0.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className={cn("truncate text-[14px]", c.unread ? "font-semibold text-ivory" : "font-medium text-ivory")}>
                        {c.participantName}
                      </span>
                      <span className={cn("num shrink-0 text-[11px]", c.unread ? "text-ivory" : "text-ivory-3")}>
                        {timeAgo(c.lastMessageAt, new Date(now))}
                      </span>
                    </span>
                    <span className="mt-0.5 flex items-center gap-2">
                      <span className={cn("line-clamp-1 flex-1 text-[12.5px]", c.unread ? "text-ivory-2" : "text-ivory-3")}>
                        {last?.author === "ia" && <Sparkles className="mr-1 inline size-3 text-ivory-3" />}
                        {last?.body}
                      </span>
                      {c.unread > 0 && (
                        <span
                          className={cn(
                            "num grid h-4.5 min-w-4.5 place-items-center rounded-full px-1 text-[10.5px] font-semibold",
                            c.needsHuman ? "bg-danger text-obsidian" : "bg-ivory text-obsidian"
                          )}
                        >
                          {c.unread}
                        </span>
                      )}
                    </span>
                    {c.needsHuman && (
                      <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-danger">
                        <Hand className="size-3" /> {c.handoffReason}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            )
          })}
          {list.length === 0 && <li className="px-4 py-8 text-center text-[13px] text-ivory-3">Nothing here.</li>}
        </ul>
      </aside>

      {/* Hilo */}
      {selected ? (
        <Thread
          key={selected.id}
          now={now}
          conversation={selected}
          messages={messages.filter((m) => m.conversationId === selected.id)}
          staff={staff}
          agentName={agentName}
          filter={filter}
        />
      ) : (
        <div className="hidden place-items-center lg:grid">
          <div className="max-w-xs text-center">
            <Bot className="mx-auto size-8 text-ivory-3" strokeWidth={1.5} />
            <p className="mt-3 text-[14px] text-ivory-2">Select a conversation.</p>
            <p className="mt-1 text-[12.5px] text-ivory-3">
              The AI Agent only answers conversations in AI mode. Red conversations are waiting for a person.
            </p>
          </div>
        </div>
      )}

      {/* Upstream implementation note. */}
      {selected && (
        <ClientContext
          conversation={selected}
          client={client}
          loyalty={client ? loyalty[client.id] : undefined}
          appointments={client ? appointments.filter((a) => a.clientId === client.id) : []}
          services={services}
          staff={staff}
          now={now}
        />
      )}
    </div>
  )
}

function Thread({
  now,
  conversation: c,
  messages,
  staff,
  agentName,
  filter,
}: {
  now: string
  conversation: Conversation
  messages: Message[]
  staff: Staff[]
  agentName: string
  filter: InboxFilter
}) {
  const router = useRouter()
  const [draft, setDraft] = useState("")
  const [pending, startTransition] = useTransition()
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" })
  }, [messages.length])

  useEffect(() => {
    if (c.unread > 0) void markConversationRead(c.id)
  }, [c.id, c.unread])

  const window24 = useMemo(() => {
    if (c.channel !== "whatsapp" || !c.lastInboundAt) return null
    const hoursLeft = 24 - (new Date(now).getTime() - new Date(c.lastInboundAt).getTime()) / 3_600_000
    return hoursLeft
  }, [c, now])

  function send(text = draft) {
    if (!text.trim()) return
    startTransition(async () => {
      const res = await sendStaffMessage(c.id, text)
      if (!res.ok) toast.error(res.error)
      else setDraft("")
    })
  }

  function toggleMode(mode: Conversation["mode"]) {
    startTransition(async () => {
      const res = await setConversationMode(c.id, mode)
      if (!res.ok) toast.error(res.error)
      else toast.success(mode === "ia" ? `${agentName} is responding to this chat again` : "You took over the conversation. The AI Agent will not reply here.")
    })
  }

  return (
    <section className="flex min-h-0 flex-col">
      <header className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3 sm:px-6">
        <button type="button" onClick={() => router.push(`/bandeja?filtro=${filter}`)} className="lg:hidden" aria-label="Back">
          <ArrowLeft className="size-5 text-ivory-2" />
        </button>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold text-ivory">{c.participantName}</span>
          <span className="flex items-center gap-1.5 text-[12px] text-ivory-3">
            <ChannelDot channel={c.channel} className="size-3 ring-0 [&_svg]:size-2" />
            {CHANNEL_LABEL[c.channel]}
            {c.participantHandle && ` · @${c.participantHandle}`}
          </span>
        </span>

        {/* Upstream implementation note. */}
        <div role="radiogroup" aria-label="Who responds" className="flex rounded-lg border border-line-strong p-0.5">
          <button
            type="button"
            role="radio"
            aria-checked={c.mode === "ia"}
            disabled={pending}
            onClick={() => c.mode !== "ia" && toggleMode("ia")}
            className={cn(
              "flex h-8 items-center gap-1.5 rounded-md px-3 text-[12.5px] font-medium transition-colors",
              c.mode === "ia" ? "bg-surface-3 text-ivory" : "text-ivory-3 hover:text-ivory-2"
            )}
          >
            <Sparkles className={cn("size-3.5", c.mode === "ia" && "text-gold")} /> AI responds
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={c.mode === "humano"}
            disabled={pending}
            onClick={() => c.mode !== "humano" && toggleMode("humano")}
            className={cn(
              "flex h-8 items-center gap-1.5 rounded-md px-3 text-[12.5px] font-medium transition-colors",
              c.mode === "humano" ? "bg-surface-3 text-ivory" : "text-ivory-3 hover:text-ivory-2"
            )}
          >
            <UserRound className="size-3.5" /> I respond
          </button>
        </div>
      </header>

      {c.needsHuman && (
        <div className="flex items-start gap-3 border-b border-danger/25 bg-danger/8 px-4 py-3 sm:px-6">
          <Hand className="mt-0.5 size-4 shrink-0 text-danger" />
          <p className="text-[13px] text-ivory-2">
            <b className="font-semibold text-ivory">The AI Agent requested help:</b> {c.handoffReason}. Reply yourself; when it is
            resolved, return it to the AI Agent.
          </p>
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 scroll-thin sm:px-6">
        <div className="mx-auto max-w-2xl space-y-2.5">
          {messages.map((m, i) => {
            const day = dayKey(m.sentAt)
            const showDay = i === 0 || dayKey(messages[i - 1].sentAt) !== day
            const out = m.author !== "cliente"
            const author = m.author === "ia" ? agentName : m.author === "staff" ? staff.find((s) => s.id === m.staffId)?.name ?? "Team" : null
            return (
              <div key={m.id}>
                {showDay && (
                  <p className="my-4 text-center text-[11px] font-medium tracking-wide text-ivory-3 uppercase">
                    {day === dayKey(now) ? "Today" : formatDayShort(day)}
                  </p>
                )}
                <div className={cn("flex flex-col", out ? "items-end" : "items-start")}>
                  {author && (
                    <span className="mb-1 flex items-center gap-1 px-1 text-[11px] text-ivory-3">
                      {m.author === "ia" && <Sparkles className="size-3 text-gold" />}
                      {author}
                    </span>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-[14px] leading-relaxed sm:max-w-[75%]",
                      !out && "rounded-bl-md bg-surface-2 text-ivory",
                      m.author === "ia" && "rounded-br-md border border-gold/20 bg-[#1d1a14] text-ivory",
                      m.author === "staff" && "rounded-br-md bg-surface-3 text-ivory"
                    )}
                  >
                    {m.body}
                    <span className="num ml-2 inline-block translate-y-0.5 text-[10.5px] text-ivory-3">{hm(m.sentAt)}</span>
                  </div>
                  {m.action && m.action !== "consulta_respondida" && (
                    <span
                      className={cn(
                        "mt-1.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-medium",
                        m.action === "derivado_humano" ? "border-danger/30 text-danger" : "border-line-strong text-ivory-2"
                      )}
                    >
                      {m.action === "turno_creado" && <CalendarCheck2 className="size-3.5" />}
                      {m.action === "turno_reprogramado" && <CalendarClock className="size-3.5" />}
                      {m.action === "derivado_humano" && <Hand className="size-3.5" />}
                      {m.action === "sello_consultado" && <StickyNote className="size-3.5" />}
                      {ACTION_LABEL[m.action]}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
          <div ref={endRef} />
        </div>
      </div>

      <footer className="border-t border-line px-4 pt-3 pb-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {window24 !== null && (
            <p className={cn("mb-2 flex items-center gap-1.5 text-[11.5px]", window24 <= 2 ? "text-danger" : "text-ivory-3")}>
              <Clock3 className="size-3" />
              {window24 > 0
                ? `WhatsApp window open: ${Math.floor(window24)} h left to reply freely.`
                : "More than 24 hours have passed: WhatsApp only allows an approved template message."}
            </p>
          )}
          <div className="mb-2 flex flex-wrap gap-1.5">
            {QUICK.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => setDraft(q.text)}
                className="h-7 rounded-full border border-line px-2.5 text-[12px] text-ivory-2 transition-colors hover:border-line-strong hover:text-ivory"
              >
                {q.label}
              </button>
            ))}
          </div>
          <div className="flex items-end gap-2 rounded-xl border border-line-strong bg-surface-1 p-2 focus-within:border-gold/50">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              rows={1}
              placeholder={c.mode === "ia" ? "Typing here pauses the AI Agent in this chat…" : "Write your reply…"}
              className="max-h-32 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-[14px] text-ivory placeholder:text-ivory-3 focus:outline-none"
            />
            <Button size="icon-lg" onClick={() => send()} disabled={!draft.trim() || pending} aria-label="Send">
              <Send />
            </Button>
          </div>
        </div>
      </footer>
    </section>
  )
}

const ACTION_LABEL: Record<NonNullable<Message["action"]>, string> = {
  turno_creado: "Booking created by AI",
  turno_reprogramado: "Booking rescheduled by AI",
  turno_cancelado: "Booking cancelled by AI",
  consulta_respondida: "Consulta respondida",
  derivado_humano: "Derivado to a person",
  sello_consultado: "Checked the loyalty card",
}

function ClientContext({
  conversation,
  client,
  loyalty,
  appointments,
  services,
  staff,
  now,
}: {
  conversation: Conversation
  client: Client | undefined
  loyalty: LoyaltyStatus | undefined
  appointments: Appointment[]
  services: Service[]
  staff: Staff[]
  now: string
}) {
  const { open } = useNewAppointment()
  const n = new Date(now)
  const next = appointments
    .filter((a) => new Date(a.startsAt) > n && a.status !== "cancelado" && a.status !== "no_show")
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0]
  const visits = appointments.filter((a) => a.status === "completado")
  const last = visits[visits.length - 1]

  return (
    <aside className="hidden min-h-0 overflow-y-auto border-l border-line px-5 py-5 scroll-thin 2xl:block">
      <p className="eyebrow">Client</p>
      {client ? (
        <>
          <p className="mt-2 font-display text-[18px] leading-tight text-ivory">{client.name}</p>
          <p className="num mt-1 text-[12.5px] text-ivory-3">
            {client.phone}
            {client.instagram && ` · @${client.instagram}`}
          </p>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-[13px]">
            <div>
              <dt className="eyebrow text-[10px]">Visits</dt>
              <dd className="num mt-0.5 text-ivory">{visits.length} in 45 days</dd>
            </div>
            <div>
              <dt className="eyebrow text-[10px]">Last</dt>
              <dd className="mt-0.5 text-ivory">{last ? timeAgo(last.startsAt, n) : "—"}</dd>
            </div>
          </dl>

          <div className="mt-5 rounded-xl border border-line bg-surface-1 p-4">
            <p className="eyebrow mb-1 text-[10px]">Next booking</p>
            {next ? (
              <p className="text-[13.5px] text-ivory">
                {formatDayShort(dayKey(next.startsAt))} · <span className="num">{hm(next.startsAt)}</span>
                <span className="block text-[12px] text-ivory-3">
                  {services.find((s) => s.id === next.serviceId)?.name} con {staff.find((s) => s.id === next.staffId)?.name}
                </span>
              </p>
            ) : (
              <p className="text-[13px] text-ivory-3">No upcoming bookings.</p>
            )}
            <Button variant="outline" className="mt-3 w-full" onClick={() => open({ clientId: client.id })}>
              Create booking
            </Button>
          </div>

          {loyalty && (
            <div className="mt-5">
              <p className="eyebrow mb-2 text-[10px]">Loyalty card</p>
              <LoyaltyStamps status={loyalty} />
            </div>
          )}

          {client.cutNotes && (
            <div className="mt-5">
              <p className="eyebrow mb-1 text-[10px]">Service notes</p>
              <p className="text-[13px] text-ivory-2">{client.cutNotes}</p>
            </div>
          )}
          <Link href={`/clientes?c=${client.id}`} className="mt-5 inline-block text-[12.5px] text-ivory-3 hover:text-ivory">
            Ver ficha completa →
          </Link>
        </>
      ) : (
        <>
          <p className="mt-2 font-display text-[18px] text-ivory">{conversation.participantName}</p>
          <p className="mt-2 text-[13px] text-ivory-3">
            Not a client yet. The profile is created automatically with the first booking.
          </p>
          <Button variant="outline" className="mt-4 w-full" onClick={() => open()}>
            Create first booking
          </Button>
        </>
      )}
    </aside>
  )
}
