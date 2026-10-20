/** Upstream implementation note. */

export type Channel = "whatsapp" | "instagram"

/** Upstream implementation note. */
export type AppointmentSource = "agente" | "panel" | "web" | "walk_in"

export type AppointmentStatus =
  | "pendiente" // reservado, sin confirmar (típico: lo tomó el agente fuera de horario)
  | "confirmado"
  | "en_curso"
  | "completado"
  | "cancelado"
  | "no_show"

export type PaymentMethod = "efectivo" | "transferencia" | "mercadopago" | "debito" | "credito"

export type StaffRole = "dueno" | "barbero" | "recepcion"

export type ProfessionalLevel = "trainee" | "junior" | "barber" | "senior"

export interface Staff {
  professionalLevel?: ProfessionalLevel
  id: string
  name: string
  role: StaffRole
  /** Upstream implementation note. */
  commissionPct: number
  active: boolean
  /** Upstream implementation note. */
  skipsServiceIds: string[]
  /** Upstream implementation note. */
  schedule?: WorkShift[]
  /** Date-specific shifts supersede the weekly template, including explicit days off. */
  dateSchedule?: { day: string; works: boolean; shifts: Omit<WorkShift, "weekday">[] }[]
  calendarOpen?: string
  calendarClose?: string
  calendarStepMin?: number
  allowStaffOverlaps?: boolean
  /** Upstream implementation note. */
  timeOff?: { startsAt: string; endsAt: string }[]
}

/** Upstream implementation note. */
export interface ShopSettings {
  /** Upstream implementation note. */
  openingCash: number
  depositEnabled: boolean
  depositAmount: number
  depositHoldMin: number
  remindersEnabled: boolean
  /** Upstream implementation note. */
  slotStepMin: number
  calendarOpen: string
  calendarClose: string
  calendarStepMin: number
  allowStaffOverlaps: boolean
  /** IANA zone used for business hours, calendars and booking slots. */
  timezone: string
}

/** Upstream implementation note. */
export interface CashClosure {
  /** AAAA-MM-DD, hora argentina. */
  day: string
  openingCash: number
  expectedCash: number
  countedCash: number
  closedAt: string
  notes: string | null
}

/** Upstream implementation note. */
export interface TimeOffEntry {
  id: string
  staffId: string
  startsAt: string
  endsAt: string
  reason: string | null
}

/** Upstream implementation note. */
export interface FixedSlot {
  id: string
  staffId: string
  /** Upstream implementation note. */
  weekday: number | null
  /** Upstream implementation note. */
  onDate: string | null
  /** "HH:MM" */
  start: string
  end: string
  /** Upstream implementation note. */
  label: string | null
  active: boolean
}

export interface WorkShift {
  /** Upstream implementation note. */
  weekday: number
  /** "HH:MM" */
  start: string
  end: string
}

export type ServiceCategory = "corte" | "barba" | "combo" | "color" | "extra"

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  durationMin: number
  price: number
  /** Upstream implementation note. */
  countsForLoyalty: boolean
  active: boolean
}

export interface Client {
  id: string
  name: string
  phone: string | null
  instagram: string | null
  /** Canal por el que suele escribir. */
  channel: Channel | null
  /** Upstream implementation note. */
  cutNotes: string | null
  notes: string | null
  preferredStaffId: string | null
  createdAt: string
}

export interface Appointment {
  id: string
  clientId: string
  staffId: string
  serviceId: string
  startsAt: string
  endsAt: string
  status: AppointmentStatus
  source: AppointmentSource
  /** Precio de lista al momento de reservar (el cobrado vive en Payment). */
  price: number
  notes: string | null
  conversationId: string | null
  createdAt: string
  /** Upstream implementation note. */
  holdExpiresAt: string | null
}

export type DiscountReason = "fidelidad" | "manual"

export interface Payment {
  id: string
  appointmentId: string | null
  clientId: string | null
  staffId: string | null
  serviceId: string | null
  /** Upstream implementation note. */
  concept: string
  /** Upstream implementation note. */
  kind: "servicio" | "producto" | "sena"
  listPrice: number
  discount: number
  discountReason: DiscountReason | null
  tip: number
  /** Total cobrado = listPrice − discount + tip. */
  amount: number
  method: PaymentMethod
  paidAt: string
  /** Upstream implementation note. */
  externalRef?: string | null
  /** Upstream implementation note. */
  units?: number
  /** Upstream implementation note. */
  imported?: boolean
}

export type ExpenseCategory =
  | "alquiler"
  | "servicios"
  | "insumos"
  | "sueldos"
  | "marketing"
  | "otros"
  /** Upstream implementation note. */
  | "vale"

export interface Expense {
  id: string
  category: ExpenseCategory
  description: string
  amount: number
  method: PaymentMethod
  paidAt: string
  /** Upstream implementation note. */
  staffId?: string | null
  /** Upstream implementation note. */
  imported?: boolean
}

/* ── Bandeja ── */

/** Upstream implementation note. */
export type ConversationMode = "ia" | "humano"

export interface Conversation {
  id: string
  /** Upstream implementation note. */
  externalId?: string | null
  /** Upstream implementation note. */
  accountExternalId?: string | null
  channel: Channel
  clientId: string | null
  participantName: string
  participantHandle: string | null
  mode: ConversationMode
  unread: number
  lastMessageAt: string
  /** Upstream implementation note. */
  lastInboundAt: string | null
  /** Upstream implementation note. */
  needsHuman: boolean
  handoffReason: string | null
}

export type MessageAuthor = "cliente" | "ia" | "staff"

export interface Message {
  id: string
  conversationId: string
  author: MessageAuthor
  staffId: string | null
  body: string
  sentAt: string
  /** Upstream implementation note. */
  action: AgentActionKind | null
  actionRef: string | null
}

export type AgentActionKind =
  | "turno_creado"
  | "turno_reprogramado"
  | "turno_cancelado"
  | "consulta_respondida"
  | "derivado_humano"
  | "sello_consultado"

export interface AgentEvent {
  id: string
  at: string
  kind: AgentActionKind
  channel: Channel
  conversationId: string
  summary: string
}

/* Upstream implementation note. */

export type AgentTone = "cercano" | "profesional" | "canchero"

export interface AgentSettings {
  enabled: boolean
  name: string
  tone: AgentTone
  channels: Record<Channel, boolean>
  permissions: {
    answerPrices: boolean
    book: boolean
    reschedule: boolean
    cancel: boolean
    shareLoyalty: boolean
  }
  /** Owner rules en lenguaje natural. Van al system prompt. */
  rules: string[]
  /** Upstream implementation note. */
  afterHoursNote: string
}
