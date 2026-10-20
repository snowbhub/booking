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
  FixedSlot,
  Message,
  Payment,
  Service,
  ShopSettings,
  Staff,
  StaffRole,
  TimeOffEntry,
  WorkShift,
} from "@/lib/domain/types"

/** Upstream implementation note. */

/** Upstream implementation note. */
export interface Snapshot {
  /** Instante que la app considera "ahora" (en la demo puede estar simulado). */
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
  /** Upstream implementation note. */
  timeOff: TimeOffEntry[]
  /** Upstream implementation note. */
  fixedSlots: FixedSlot[]
  /** Upstream implementation note. */
  cashClosures: CashClosure[]
}

export type ServiceInput = Omit<Service, "id"> & { id?: string }

export interface StaffInput {
  id?: string
  name: string
  role: StaffRole
  commissionPct: number
  active: boolean
}

export type NewClient = Pick<Client, "name" | "phone" | "channel" | "notes" | "preferredStaffId">

export type NewAppointment = Omit<Appointment, "id" | "createdAt"> & { createdAt?: string }

export type AppointmentPatch = Partial<Pick<Appointment, "status" | "startsAt" | "endsAt" | "notes">>

export type NewPayment = Omit<Payment, "id">

export type NewExpense = Omit<Expense, "id">

export type ConversationPatch = Partial<
  Pick<Conversation, "mode" | "needsHuman" | "handoffReason" | "unread" | "lastMessageAt" | "lastInboundAt" | "clientId">
>

export type NewMessage = Omit<Message, "id"> & {
  /** Upstream implementation note. */
  externalId?: string | null
}

export interface IncomingConversation {
  externalId: string
  accountExternalId: string
  channel: Channel
  participantName: string
  participantHandle: string | null
}

export interface AgentRunRecord {
  conversationId: string | null
  provider: string
  model: string
  ok: boolean
  failureReason: string | null
  tools: { tool: string; action?: string; isError?: boolean }[]
  usage: { input: number; output: number; cacheRead: number; cacheWrite: number }
  costUsd: number | null
}

/** Upstream implementation note. */
export class SlotTakenError extends Error {
  name = "SlotTakenError"
}
export class AlreadyChargedError extends Error {
  name = "AlreadyChargedError"
}

export type AgendaSnapshot = Pick<Snapshot, "now" | "simulated" | "staff" | "services" | "clients" | "appointments" | "payments" | "shopSettings" | "fixedSlots">
export interface Store {
  readonly kind: "memory" | "postgres"

  snapshot(): Promise<Snapshot>
  agendaSnapshot?(day: string): Promise<AgendaSnapshot>
  shellSummary?(): Promise<{ unread: number; needsHuman: number; agentEnabled: boolean }>
  now(): Promise<Date>

  /** Upstream implementation note. */
  createAppointment(input: {
    appointment: Omit<NewAppointment, "clientId"> & { clientId?: string }
    newClient?: NewClient
    allowOverlap?: boolean
    /** Upstream implementation note. */
    linkConversationId?: string | null
  }): Promise<{ appointmentId: string; clientId: string }>

  /** Upstream implementation note. */
  updateAppointment(id: string, patch: AppointmentPatch): Promise<void>

  /** Upstream implementation note. */
  reassignAppointment(id: string, staffId: string): Promise<boolean>

  /** Upstream implementation note. */
  chargeAppointment(appointmentId: string, payment: NewPayment): Promise<void>

  /** Upstream implementation note. */
  confirmDeposit(appointmentId: string, payment: NewPayment): Promise<{ inserted: boolean }>

  addExpense(expense: NewExpense): Promise<void>

  /** Upstream implementation note. */
  addPayment(payment: NewPayment): Promise<void>

  updateAgentSettings(patch: Partial<AgentSettings>): Promise<void>

  /** Upstream implementation note. */
  upsertConversation(incoming: IncomingConversation): Promise<Conversation>

  updateConversation(id: string, patch: ConversationPatch): Promise<void>

  /** Upstream implementation note. */
  addMessage(message: NewMessage): Promise<{ id: string } | null>

  /** Upstream implementation note. */
  setMessageExternalId(id: string, externalId: string): Promise<void>

  recordAgentRun(run: AgentRunRecord): Promise<void>

  /* ── Ajustes ── */
  /** Upstream implementation note. */
  saveService(service: ServiceInput): Promise<string>
  /** Upstream implementation note. */
  saveStaff(member: StaffInput): Promise<string>
  /** Upstream implementation note. */
  setStaffSchedule(staffId: string, shifts: WorkShift[]): Promise<void>
  setStaffDateSchedule(staffId: string, day: string, works: boolean, shifts: { start: string; end: string }[]): Promise<void>
  addTimeOff(entry: Omit<TimeOffEntry, "id">): Promise<void>
  removeTimeOff(id: string): Promise<void>
  /** Upstream implementation note. */
  saveFixedSlot(slot: Omit<FixedSlot, "id"> & { id?: string }): Promise<string>
  removeFixedSlot(id: string): Promise<void>
  updateShopSettings(patch: Partial<ShopSettings>): Promise<void>

  /** Upstream implementation note. */
  closeCashDay(closure: CashClosure): Promise<void>
}

export type { AppointmentStatus }
