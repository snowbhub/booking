import { BRAND } from "@/config/brand"
import { freeSlots, isOpen } from "@/lib/domain/slots"
import { loyaltyStatus } from "@/lib/domain/loyalty"
import {
  addDays,
  at,
  dayKey,
  hm,
  hmToMinutes,
  minutesOfDay,
  minutesToHm,
  weekday,
} from "@/lib/time"
import type {
  AgentEvent,
  AgentSettings,
  Appointment,
  AppointmentStatus,
  CashClosure,
  Channel,
  Client,
  Conversation,
  Expense,
  Message,
  Payment,
  PaymentMethod,
  Service,
  ShopSettings,
  Staff,
  TimeOffEntry,
  FixedSlot,
} from "@/lib/domain/types"

/** Upstream implementation note. */

/** Subirlo al cambiar el generador: invalida el estado demo guardado en memoria. */
export const SEED_VERSION = 7

export interface DemoState {
  /** Instante que la demo considera "ahora". Ver `demoClock`. */
  now: string
  simulated: boolean
  staff: Staff[]
  services: Service[]
  clients: Client[]
  appointments: Appointment[]
  payments: Payment[]
  expenses: Expense[]
  conversations: Conversation[]
  messages: Message[]
  agentEvents: AgentEvent[]
  agentSettings: AgentSettings
  shopSettings: ShopSettings
  timeOff: TimeOffEntry[]
  fixedSlots: FixedSlot[]
  cashClosures: CashClosure[]
}

/* ── Reloj ────────────────────────────────────────────────────────────── */

/** Upstream implementation note. */
export function demoClock(real = new Date()): { now: Date; simulated: boolean } {
  if (process.env.DEMO_CLOCK === "real") return { now: real, simulated: false }
  const today = dayKey(real)
  const m = minutesOfDay(real)
  const open = hmToMinutes(BRAND.openingHours.open)
  const close = hmToMinutes(BRAND.openingHours.close)
  if (isOpen(today) && m >= open + 30 && m <= close) return { now: real, simulated: false }

  let day = today
  for (let i = 0; i < 8; i++) {
    const candidate = at(day, "16:40")
    if (isOpen(day) && candidate <= real) return { now: candidate, simulated: true }
    day = addDays(day, -1)
  }
  return { now: real, simulated: false }
}

/* Upstream implementation note. */

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

/* Upstream implementation note. */

export const STAFF: Staff[] = [
  // Upstream implementation note.
  { id: "st-santiago", name: "Santiago", role: "dueno", commissionPct: 0, active: true, skipsServiceIds: [] },
  { id: "st-sebastian", name: "Sebastián", role: "barbero", commissionPct: 50, active: true, skipsServiceIds: [] },
  { id: "st-nehemias", name: "Nehemías", role: "barbero", commissionPct: 50, active: true, skipsServiceIds: [] },
]

export const SERVICES: Service[] = [
  // Upstream implementation note.
  { id: "sv-corte", name: "Haircut", category: "corte", durationMin: 60, price: 15000, countsForLoyalty: true, active: true },
  { id: "sv-corte-barba", name: "Haircut + beard", category: "combo", durationMin: 60, price: 20000, countsForLoyalty: true, active: true },
]

const PRODUCTS: [string, number][] = [
  ["Cera mate", 9500],
  ["Pomada brillo", 9000],
  ["Beard oil", 11000],
  ["Polvo texturizador", 10500],
]

const FIRST = [
  "Matías", "Lucas", "Franco", "Ezequiel", "Nahuel", "Tomás", "Gonzalo", "Kevin", "Joaquín",
  "Facundo", "Agustín", "Santiago", "Nicolás", "Lautaro", "Valentín", "Ramiro", "Maximiliano",
  "Brian", "Axel", "Iván", "Emiliano", "Damián", "Leandro", "Cristian", "Rodrigo", "Hernán",
  "Julián", "Mauro", "Alan", "Gastón", "Ulises", "Benjamín", "Juan Cruz", "Mateo", "Ian",
  "Luciano", "Federico", "Gabriel", "Pablo", "Diego", "Marcos", "Sebastián", "Alejo", "Enzo",
  "Dylan", "Elías", "Fabricio", "Germán", "Ignacio", "Jeremías", "Lisandro", "Martín", "Milo",
  "Octavio", "Patricio", "Rafael", "Simón", "Tobías", "Uriel", "Bautista",
]
const LAST = [
  "Rodríguez", "Gómez", "Fernández", "López", "Díaz", "Martínez", "Pérez", "Sosa", "Romero",
  "Álvarez", "Torres", "Ruiz", "Ramírez", "Flores", "Benítez", "Acosta", "Medina", "Herrera",
  "Suárez", "Aguirre", "Giménez", "Gutiérrez", "Pereyra", "Molina", "Castro", "Ortiz", "Silva",
  "Núñez", "Luna", "Juárez", "Cabrera", "Ríos", "Morales", "Godoy", "Ledesma", "Vega",
]

const CUT_NOTES = [
  "Low fade, 1.5 on the sides, scissors on top",
  "Mid fade con raya marcada del lado izquierdo",
  "Burst fade, arriba texturizado con polvo",
  "Taper en la nuca, no tocar el largo de arriba",
  "Zero on the sides, beard shaped with a razor",
  "French crop, short straight fringe",
]

/* ── Generador ────────────────────────────────────────────────────────── */

const PAST_DAYS = 70
const FUTURE_DAYS = 10

export function buildDemo(real = new Date()): DemoState {
  const clock = demoClock(real)
  const now = clock.now
  const today = dayKey(now)
  const nowMin = minutesOfDay(now)
  const rand = mulberry32(hashString(`booking:${today}`))
  const pick = <T,>(xs: T[]) => xs[Math.floor(rand() * xs.length)]
  const chance = (p: number) => rand() < p
  const minutesAgo = (m: number) => new Date(now.getTime() - m * 60_000).toISOString()

  let seq = 0
  const id = (prefix: string) => `${prefix}-${(++seq).toString(36)}`

  /* Upstream implementation note. */
  const clients: Client[] = []
  const usedNames = new Set<string>()
  for (let i = 0; clients.length < 440; i++) {
    const name = `${FIRST[i % FIRST.length]} ${pick(LAST)}`
    if (usedNames.has(name)) continue
    usedNames.add(name)
    const channel: Channel = chance(0.68) ? "whatsapp" : "instagram"
    const handle = name.split(" ")[0].toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    clients.push({
      id: `cl-${clients.length + 1}`,
      name,
      phone: `+54911${String(40000000 + Math.floor(rand() * 59999999)).slice(0, 8)}`,
      instagram: channel === "instagram" || chance(0.3) ? `${handle}.${pick(["fdz", "07", "ok", "rz", "cuts", "10"])}` : null,
      channel,
      cutNotes: clients.length < 80 ? pick(CUT_NOTES) : null,
      notes: null,
      preferredStaffId: clients.length < 80 ? pick(STAFF).id : null,
      createdAt: minutesAgo(60 * 24 * (80 + Math.floor(rand() * 400))),
    })
  }
  const byFirstName = (first: string) => clients.find((c) => c.name.startsWith(first + " "))!
  clients[0].notes = "Comes every 2 weeks, always on Fridays."
  byFirstName("Ezequiel").notes = "Complaint about an uneven cut (see Inbox)."

  /* Upstream implementation note. */
  const appointments: Appointment[] = []
  const svc = (sid: string) => SERVICES.find((s) => s.id === sid)!
  // Upstream implementation note.
  // Upstream implementation note.
  const busyIndex = new Map<string, [number, number][]>()
  const isFree = (day: string, staffId: string, start: number, end: number) =>
    !(busyIndex.get(`${day}|${staffId}`) ?? []).some(([s, e]) => start < e && end > s)

  function book(
    day: string,
    time: string,
    staffId: string,
    serviceId: string,
    clientId: string,
    extra: Partial<Appointment> = {}
  ) {
    const s = svc(serviceId)
    const start = at(day, time)
    const appt: Appointment = {
      id: id("tu"),
      clientId,
      staffId,
      serviceId,
      startsAt: start.toISOString(),
      endsAt: new Date(start.getTime() + s.durationMin * 60_000).toISOString(),
      status: "confirmado",
      source: "panel",
      price: s.price,
      notes: null,
      conversationId: null,
      holdExpiresAt: null,
      createdAt: minutesAgo(60 * 24 * 3),
      ...extra,
    }
    appointments.push(appt)
    if (appt.status !== "cancelado" && appt.status !== "no_show") {
      const key = `${day}|${staffId}`
      const t0 = hmToMinutes(time)
      busyIndex.set(key, [...(busyIndex.get(key) ?? []), [t0, t0 + s.durationMin]])
    }
    return appt
  }

  const nextOpen = (from: string) => {
    let d = addDays(from, 1)
    while (!isOpen(d)) d = addDays(d, 1)
    return d
  }
  const tomorrowOpen = nextOpen(today)
  const nextSaturday = (() => {
    let d = addDays(today, 1)
    while (weekday(d) !== 6) d = addDays(d, 1)
    return d
  })()

  // Upstream implementation note.
  // Upstream implementation note.
  const matias = clients[0]
  const franco = byFirstName("Franco")
  const bautista = byFirstName("Bautista")
  const story = {
    matias: book(tomorrowOpen, "18:00", "st-nehemias", "sv-corte-barba", matias.id, {
      source: "agente",
      status: "confirmado",
      conversationId: "cv-matias",
      createdAt: minutesAgo(30),
    }),
    franco: book(today, "19:00", "st-sebastian", "sv-corte", franco.id, {
      source: "agente",
      conversationId: "cv-franco",
      createdAt: minutesAgo(60 * 24 * 2),
      notes: "Rescheduled by the AI Agent (previously 17:00).",
    }),
    bauti: book(nextSaturday, "11:00", "st-santiago", "sv-corte", bautista.id, {
      source: "agente",
      status: "pendiente",
      conversationId: "cv-bauti",
      createdAt: minutesAgo(258),
    }),
  }

  // Upstream implementation note.
  // Upstream implementation note.
  // Upstream implementation note.
  // en "Re-engage".
  const regulars = clients.slice(0, 80)
  const lapsed = clients.slice(80, 100)
  const occasional = clients.slice(100)
  // Upstream implementation note.
  // historia: el relleno al azar no les agrega otro que la contradiga.
  const storyIds = new Set([matias.id, franco.id, bautista.id])
  const pickClient = (off: number): Client => {
    const c =
      off < -40 && chance(0.12) ? pick(lapsed) : chance(0.31) ? pick(regulars) : pick(occasional)
    return off >= 0 && storyIds.has(c.id) ? pickClient(off) : c
  }

  const SERVICE_WEIGHTS: [string, number][] = [
    ["sv-corte", 62],
    ["sv-corte-barba", 38],
  ]
  const totalWeight = SERVICE_WEIGHTS.reduce((s, [, w]) => s + w, 0)
  const pickService = (staff: Staff) => {
    for (;;) {
      let r = rand() * totalWeight
      for (const [sid, w] of SERVICE_WEIGHTS) {
        if ((r -= w) <= 0) {
          if (!staff.skipsServiceIds.includes(sid)) return svc(sid)
          break
        }
      }
    }
  }

  const BUSY: Record<number, number> = { 2: 0.52, 3: 0.58, 4: 0.66, 5: 0.8, 6: 0.9 }
  const open = hmToMinutes(BRAND.openingHours.open)
  const close = hmToMinutes(BRAND.openingHours.close)

  for (let off = -PAST_DAYS; off <= FUTURE_DAYS; off++) {
    const day = addDays(today, off)
    if (!isOpen(day)) continue
    const future = off > 0 ? Math.max(0.12, 0.62 - off * 0.09) : 1
    const busyness = BUSY[weekday(day)] * future

    for (const staff of STAFF) {
      let t = open + (chance(0.5) ? 0 : 15)
      while (t < close) {
        if (!chance(busyness)) {
          t += pick([15, 30, 45])
          continue
        }
        const s = pickService(staff)
        if (t + s.durationMin > close) break
        const start = minutesToHm(t)
        if (!isFree(day, staff.id, t, t + s.durationMin)) {
          t += 15
          continue
        }

        let status: AppointmentStatus = "confirmado"
        if (off < 0) status = chance(0.05) ? "no_show" : chance(0.05) ? "cancelado" : "completado"
        else if (off === 0) {
          if (t + s.durationMin <= nowMin) status = chance(0.04) ? "no_show" : "completado"
          else if (t <= nowMin) status = "en_curso"
          else status = chance(0.78) ? "confirmado" : "pendiente"
        } else status = chance(0.75) ? "confirmado" : "pendiente"

        const source =
          off <= 0 && chance(0.22)
            ? "walk_in"
            : pick(["agente", "agente", "agente", "panel", "panel", "web"] as const)

        const createdDaysBefore = source === "walk_in" ? 0 : 1 + Math.floor(rand() * 5)
        let created = at(day, start).getTime() - createdDaysBefore * 86_400_000
        // Upstream implementation note.
        // Upstream implementation note.
        if (created > now.getTime()) created = now.getTime() - (60 * 18 + rand() * 60 * 24 * 3) * 60_000
        const createdAt =
          off >= 0 && off <= 4 && source === "agente" && chance(0.07)
            ? minutesAgo(20 + Math.floor(rand() * 600)) // tomados hoy por el agente
            : new Date(created).toISOString()

        book(day, start, staff.id, s.id, pickClient(off).id, { status, source, createdAt })
        t += s.durationMin + (chance(0.3) ? 5 : 0)
      }
    }
  }
  appointments.sort((a, b) => a.startsAt.localeCompare(b.startsAt))

  /* Upstream implementation note. */
  const payments: Payment[] = []
  const stamps = new Map<string, number>()
  const METHOD_WEIGHTS: [PaymentMethod, number][] = [
    ["efectivo", 38],
    ["transferencia", 32],
    ["mercadopago", 18],
    ["debito", 8],
    ["credito", 4],
  ]
  const pickMethod = () => {
    let r = rand() * 100
    for (const [m, w] of METHOD_WEIGHTS) if ((r -= w) <= 0) return m
    return "efectivo"
  }

  for (const a of appointments) {
    if (a.status !== "completado") continue
    const s = svc(a.serviceId)
    let discount = 0
    let discountReason: Payment["discountReason"] = null
    if (s.countsForLoyalty) {
      const n = stamps.get(a.clientId) ?? 0
      if (n >= BRAND.loyalty.stampsRequired) {
        discount = Math.round((s.price * BRAND.loyalty.rewardDiscountPct) / 100)
        discountReason = "fidelidad"
        stamps.set(a.clientId, 0)
      } else stamps.set(a.clientId, n + 1)
    }
    const tip = chance(0.16) ? pick([1000, 1500, 2000, 3000]) : 0
    const method = pickMethod()
    payments.push({
      id: id("co"),
      appointmentId: a.id,
      clientId: a.clientId,
      staffId: a.staffId,
      serviceId: s.id,
      concept: s.name,
      kind: "servicio",
      listPrice: s.price,
      discount,
      discountReason,
      tip,
      amount: s.price - discount + tip,
      method,
      paidAt: a.endsAt,
    })
    if (chance(0.09)) {
      const [concept, price] = pick(PRODUCTS)
      payments.push({
        id: id("co"),
        appointmentId: null,
        clientId: a.clientId,
        staffId: a.staffId,
        serviceId: null,
        concept,
        kind: "producto",
        listPrice: price,
        discount: 0,
        discountReason: null,
        tip: 0,
        amount: price,
        method,
        paidAt: new Date(new Date(a.endsAt).getTime() + 60_000).toISOString(),
      })
    }
  }

  /* Upstream implementation note. */
  const expenses: Expense[] = []
  const EXPENSES: [number, Expense["category"], string, number, PaymentMethod][] = [
    [2, "alquiler", "Business rent", 650000, "transferencia"],
    [4, "insumos", "Blades, capes, alcohol and towels", 118000, "transferencia"],
    [8, "insumos", "Products for resale (waxes, pomades)", 180000, "transferencia"],
    [10, "servicios", "Electricity and gas", 92000, "debito"],
    [12, "servicios", "Internet and phone", 31000, "debito"],
    [15, "marketing", "Publicidad en Instagram", 60000, "credito"],
    [19, "insumos", "Restocking supplies", 96000, "efectivo"],
    [22, "otros", "Business cleaning", 40000, "efectivo"],
  ]
  for (let back = 0; back <= 2; back++) {
    const [y, m] = today.slice(0, 7).split("-").map(Number)
    const d = new Date(Date.UTC(y, m - 1 - back, 1))
    const month = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`
    for (const [dd, category, description, amount, method] of EXPENSES) {
      const when = at(`${month}-${String(dd).padStart(2, "0")}`, "10:00")
      if (when > now) continue
      expenses.push({ id: id("ga"), category, description, amount, method, paidAt: when.toISOString() })
    }
  }

  /* Bandeja */
  const conversations: Conversation[] = []
  const messages: Message[] = []
  const agentEvents: AgentEvent[] = []

  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const relDay = (day: string) =>
    day === today ? "today" : day === addDays(today, 1) ? "tomorrow" : `on ${DAY_NAMES[weekday(day)]}`

  function thread(
    conv: Omit<Conversation, "lastMessageAt" | "lastInboundAt">,
    lines: [minAgo: number, author: Message["author"], body: string, action?: Message["action"], staffId?: string][]
  ) {
    let lastAt = ""
    let lastIn: string | null = null
    for (const [ago, author, body, action, staffId] of lines) {
      const sentAt = minutesAgo(ago)
      messages.push({
        id: id("ms"),
        conversationId: conv.id,
        author,
        staffId: staffId ?? null,
        body,
        sentAt,
        action: action ?? null,
        actionRef: null,
      })
      if (action) {
        agentEvents.push({
          id: id("ev"),
          at: sentAt,
          kind: action,
          channel: conv.channel,
          conversationId: conv.id,
          summary: summaryFor(action, conv.participantName),
        })
      }
      lastAt = sentAt
      if (author === "cliente") lastIn = sentAt
    }
    conversations.push({ ...conv, lastMessageAt: lastAt, lastInboundAt: lastIn })
  }

  function summaryFor(kind: Message["action"], who: string) {
    switch (kind) {
      case "turno_creado":
        return `Created a booking for ${who}`
      case "turno_reprogramado":
        return `Rescheduled the booking for ${who}`
      case "turno_cancelado":
        return `Cancelled the booking for ${who}`
      case "derivado_humano":
        return `Handed off ${who} to a person`
      case "sello_consultado":
        return `Shared loyalty status with ${who}`
      default:
        return `Answered a question from ${who}`
    }
  }

  const slotsToday = STAFF.flatMap((s) =>
    freeSlots({ day: today, service: svc("sv-corte"), staff: s, appointments, now }).slice(0, 1).map((t) => ({ t, s }))
  ).sort((a, b) => a.t.localeCompare(b.t))
  const offerToday = slotsToday.length
    ? `Today I have ${slotsToday.map(({ t, s }) => `${t} with ${s.name}`).join(", ")} available. Should I book one?`
    : `We're fully booked today 😕 ${relDay(tomorrowOpen)} I have availability from 11:00. Does that work?`

  const gonzalo = byFirstName("Gonzalo")
  const gStatus = loyaltyStatus(gonzalo.id, payments, SERVICES)
  const gonzaloReply = gStatus.rewardReady
    ? `Your loyalty card is complete! 🎉 Your next service is 50% off. Shall I find a time for you?`
    : `You have ${gStatus.stamps} of ${gStatus.required} stamps. You need ${gStatus.required - gStatus.stamps} more and your next service is 50% off ✨`

  thread(
    { id: "cv-kevin", channel: "whatsapp", clientId: byFirstName("Kevin").id, participantName: byFirstName("Kevin").name, participantHandle: null, mode: "ia", unread: 1, needsHuman: false, handoffReason: null },
    [[2, "cliente", "Hi! What time are you open until today?"]]
  )
  thread(
    { id: "cv-nahuel", channel: "instagram", clientId: byFirstName("Nahuel").id, participantName: byFirstName("Nahuel").name, participantHandle: "nahuu.07", mode: "ia", unread: 0, needsHuman: false, handoffReason: null },
    [
      [7, "cliente", "Do you have an appointment today?"],
      [7, "ia", `Hi! For Haircut: ${offerToday}`, "consulta_respondida"],
    ]
  )
  thread(
    { id: "cv-ezequiel", channel: "whatsapp", clientId: byFirstName("Ezequiel").id, participantName: byFirstName("Ezequiel").name, participantHandle: null, mode: "humano", unread: 2, needsHuman: true, handoffReason: "Complaint about a service" },
    [
      [26, "cliente", "Hi, yesterday's service turned out uneven on the left side and it is quite noticeable"],
      [26, "ia", "I'm sorry about that. I'll pass this to the team so someone can review it and contact you shortly. 🙏", "derivado_humano"],
      [21, "cliente", "okay, I'll wait"],
      [9, "cliente", "?"],
    ]
  )
  thread(
    { id: "cv-matias", channel: "whatsapp", clientId: matias.id, participantName: matias.name, participantHandle: null, mode: "ia", unread: 0, needsHuman: false, handoffReason: null },
    [
      [39, "cliente", `Hi! Do you have an appointment ${relDay(tomorrowOpen)} afternoon for hair and beard?`],
      [38, "ia", `Hi! 👋 ${relDay(tomorrowOpen)[0].toUpperCase() + relDay(tomorrowOpen).slice(1)} for Haircut + beard I have 17:00 with Sebastian, 18:00 with Nehemias o 19:00 with Santiago. Which works best for you?`, "consulta_respondida"],
      [32, "cliente", "18:00 works"],
      [31, "ia", `Done ✂️ I booked Haircut + beard ${relDay(tomorrowOpen)} at 18:00 with Nehemias. I'll message you an hour before as a reminder. See you at our location!`, "turno_creado"],
      [30, "cliente", "great, thanks"],
    ]
  )
  thread(
    { id: "cv-tomi", channel: "instagram", clientId: null, participantName: "Tomi Fernández", participantHandle: "tomi.fdz", mode: "humano", unread: 1, needsHuman: true, handoffReason: "Asked about a service that is not in the service list" },
    [
      [96, "cliente", "Hi! Do you offer platinum coloring? My hair is quite dark"],
      [95, "ia", "Hi! At the moment we offer haircut and haircut + beard. I'll pass your question to the team so they can reply. 🙌", "derivado_humano"],
      [13, "cliente", "okay, should I send a photo?"],
    ]
  )
  thread(
    { id: "cv-franco", channel: "whatsapp", clientId: franco.id, participantName: franco.name, participantHandle: null, mode: "ia", unread: 0, needsHuman: false, handoffReason: null },
    [
      [142, "cliente", "Hi, I can't make 17:00 today. Is later possible?"],
      [141, "ia", "No problem. I moved it to 19:00 with the same service. Does that work?", "turno_reprogramado"],
      [124, "cliente", "perfect, thanks"],
      [123, "ia", "You're welcome! See you soon 💈"],
    ]
  )
  thread(
    { id: "cv-lucas", channel: "whatsapp", clientId: byFirstName("Lucas").id, participantName: byFirstName("Lucas").name, participantHandle: null, mode: "ia", unread: 0, needsHuman: false, handoffReason: null },
    [
      [205, "cliente", "Do you accept Mercado Pago?"],
      [205, "ia", "Yes! We accept cash, transfer, Mercado Pago, debit and credit cards. 🙌", "consulta_respondida"],
    ]
  )
  thread(
    { id: "cv-bauti", channel: "whatsapp", clientId: bautista.id, participantName: "Carla (mamá de Bauti)", participantHandle: null, mode: "ia", unread: 0, needsHuman: false, handoffReason: null },
    [
      [262, "cliente", "Hi! I'd like to book my 8-year-old son for Saturday morning"],
      [261, "ia", "Hi! Saturday at 11:00 is available for a one-hour Haircut. Shall I book it for Bautista?"],
      [255, "cliente", "yes please"],
      [254, "ia", `Done, Saturday at 11:00 is booked for Bautista ✂️ I'll confirm it here on Friday.`, "turno_creado"],
    ]
  )
  thread(
    { id: "cv-gonzalo", channel: "whatsapp", clientId: gonzalo.id, participantName: gonzalo.name, participantHandle: null, mode: "ia", unread: 0, needsHuman: false, handoffReason: null },
    [
      [300, "cliente", "How many visits are left until the 50% reward?"],
      [300, "ia", gonzaloReply, "sello_consultado"],
    ]
  )
  thread(
    { id: "cv-santi", channel: "instagram", clientId: byFirstName("Santiago").id, participantName: byFirstName("Santiago").name, participantHandle: "santi.cuts", mode: "ia", unread: 0, needsHuman: false, handoffReason: null },
    [
      [340, "cliente", "🔥🔥🔥 the haircut turned out great"],
      [339, "ia", "Thanks! 🙌 Whenever you want to come again, message us and we'll find a time."],
    ]
  )
  thread(
    { id: "cv-joaquin", channel: "whatsapp", clientId: byFirstName("Joaquín").id, participantName: byFirstName("Joaquín").name, participantHandle: null, mode: "humano", unread: 0, needsHuman: false, handoffReason: null },
    [
      [60 * 26, "cliente", "Can I book Saturday at 12:00? It's for my wedding and I'd like something neat"],
      [60 * 25, "staff", "Saturday 12:00 is reserved 👌 Come with clean hair and we'll do hair + beard.", undefined, "st-santiago"],
      [60 * 25 - 5, "cliente", "great, thanks!"],
    ]
  )

  // Upstream implementation note.
  // Upstream implementation note.
  for (const a of appointments) {
    if (a.source !== "agente" || a.conversationId || dayKey(a.createdAt) !== today) continue
    const c = clients.find((x) => x.id === a.clientId)!
    agentEvents.push({
      id: id("ev"),
      at: a.createdAt,
      kind: "turno_creado",
      channel: c.channel ?? "whatsapp",
      conversationId: "",
      summary: `Created ${svc(a.serviceId).name} for ${c.name.split(" ")[0]} · ${relDay(dayKey(a.startsAt))} ${hm(a.startsAt)}`,
    })
  }
  agentEvents.sort((a, b) => b.at.localeCompare(a.at))
  conversations.sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt))

  void story

  return {
    now: now.toISOString(),
    simulated: clock.simulated,
    // Upstream implementation note.
    staff: STAFF.map((s) => ({ ...s })),
    services: SERVICES.map((s) => ({ ...s })),
    clients,
    appointments,
    payments,
    expenses,
    conversations,
    messages,
    agentEvents,
    shopSettings: { openingCash: 20000, depositEnabled: false, depositAmount: 0, depositHoldMin: 15, remindersEnabled: false, slotStepMin: 60, timezone: "Europe/Berlin", calendarOpen: "11:00", calendarClose: "20:00", calendarStepMin: 15, allowStaffOverlaps: false },
    timeOff: [],
    fixedSlots: [],
    cashClosures: [],
    agentSettings: {
      enabled: true,
      name: "Booking Assistant",
      tone: "cercano",
      channels: { whatsapp: true, instagram: true },
      permissions: {
        answerPrices: true,
        book: true,
        reschedule: true,
        cancel: true,
        shareLoyalty: true,
      },
      rules: [
        "Never invent discounts or promotions that do not exist.",
        "For now, only the configured core services are offered. If someone asks for something else, say so and hand it off to a person.",
        "If someone complains about a service, apologize and hand the conversation to a person immediately.",
        "On Instagram, ask for name and phone before confirming a booking.",
      ],
      afterHoursNote:
        "Bookings can still be created outside opening hours, but clearly state the configured business hours.",
    },
  }
}
