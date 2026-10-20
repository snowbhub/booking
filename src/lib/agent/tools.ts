import "server-only"
import { db, store } from "@/lib/data/repo"
import { SlotTakenError } from "@/lib/data/store/types"
import { startDepositCheckout } from "@/lib/mercadopago/deposit"
import { freeSlots, freeSlotsAnyStaff, isOpen, worksOn } from "@/lib/domain/slots"
import { loyaltyStatus } from "@/lib/domain/loyalty"
import { addDays, at, dayKey, formatDayLong, hm } from "@/lib/time"
import type { AgentActionKind, Channel, Service, Staff } from "@/lib/domain/types"
import type { ToolSpec, TurnInput } from "./providers/types"
import { clientAgreedTo } from "./consent"

/** Upstream implementation note. */

export interface ToolContext {
  conversationId: string | null
  clientId: string | null
  participantName: string
  channel: Channel
  now: Date
  /** Upstream implementation note. */
  history?: TurnInput[]
  /** Upstream implementation note. */
  dryRun?: boolean
}

export interface ToolOutcome {
  /** Lo que se le devuelve al modelo. */
  result: Record<string, unknown>
  isError?: boolean
  /** Upstream implementation note. */
  action?: AgentActionKind
  /** Upstream implementation note. */
  clientId?: string
}

const DATE = { type: "string", description: "Fecha en formato AAAA-MM-DD." } as const
const TIME = { type: "string", description: "Hora en formato HH:MM, 24 h." } as const

export function toolDefinitions(services: Service[], staff: Staff[]): ToolSpec[] {
  const serviceIds = services.filter((s) => s.active).map((s) => s.id)
  const staffIds = staff.filter((s) => s.active).map((s) => s.id)

  return [
    {
      name: "consultar_disponibilidad",
      description:
        "Devuelve los horarios libres para un servicio en una fecha, con un barbero puntual o con cualquiera. Usala SIEMPRE antes de ofrecer horarios, y de nuevo cada vez que el cliente pida otra franja: devuelve pocas opciones, así que no afirmes que no hay lugar a una hora sin haberla consultado con desde_hora.",
      parameters: {
        type: "object",
        properties: {
          fecha: DATE,
          servicio_id: { type: "string", enum: serviceIds },
          barbero_id: { type: "string", enum: [...staffIds, "cualquiera"] },
          desde_hora: {
            type: "string",
            description: 'Minimum HH:MM time when the client requests a time range ("afternoon" = 14:00, "after 6" = 18:00, "around 17" = 17:00). Empty string if irrelevant.',
          },
        },
        required: ["fecha", "servicio_id", "barbero_id", "desde_hora"],
        additionalProperties: false,
      },
    },
    {
      name: "crear_turno",
      description:
        "Agenda un turno confirmado. Sólo cuando el cliente ya eligió servicio, fecha y hora. Usá barbero_id 'cualquiera' si no pidió uno por nombre: el sistema reparte entre los libres. Si no es cliente registrado, pasá su nombre y teléfono.",
      parameters: {
        type: "object",
        properties: {
          fecha: DATE,
          hora: TIME,
          servicio_id: { type: "string", enum: serviceIds },
          barbero_id: { type: "string", enum: [...staffIds, "cualquiera"] },
          nombre_cliente: { type: "string", description: "Nombre y apellido si se conoce." },
          telefono: { type: "string", description: "Client phone number, or an empty string if unknown." },
        },
        required: ["fecha", "hora", "servicio_id", "barbero_id", "nombre_cliente", "telefono"],
        additionalProperties: false,
      },
    },
    {
      name: "turnos_del_cliente",
      description: "Lists upcoming bookings for the client in this conversation, including their IDs.",
      parameters: { type: "object", properties: {}, required: [], additionalProperties: false },
    },
    {
      name: "reprogramar_turno",
      description: "Moves a client booking to another date and time (same service and staff member).",
      parameters: {
        type: "object",
        properties: { turno_id: { type: "string" }, fecha: DATE, hora: TIME },
        required: ["turno_id", "fecha", "hora"],
        additionalProperties: false,
      },
    },
    {
      name: "cancelar_turno",
      description: "Cancels a client booking.",
      parameters: {
        type: "object",
        properties: { turno_id: { type: "string" }, motivo: { type: "string" } },
        required: ["turno_id", "motivo"],
        additionalProperties: false,
      },
    },
    {
      name: "consultar_fidelidad",
      description: "Returns the client loyalty stamp count and whether the reward discount is ready.",
      parameters: { type: "object", properties: {}, required: [], additionalProperties: false },
    },
    {
      name: "derivar_a_humano",
      description:
        "Pasa la conversación to a person del equipo. Usala ante quejas, pedidos de hablar con alguien, consultas fuera de lo que sabés o dudas.",
      parameters: {
        type: "object",
        properties: { motivo: { type: "string", description: "Motivo breve, para el equipo." } },
        required: ["motivo"],
        additionalProperties: false,
      },
    },
  ]
}

const fail = (message: string): ToolOutcome => ({ result: { ok: false, error: message }, isError: true })

const NOT_AGREED =
  "No agendado: el cliente no pidió ni aceptó ese horario. Ofrecéselo con los horarios libres reales y esperá que responda antes de agendar."

export async function executeTool(name: string, input: Record<string, unknown>, ctx: ToolContext): Promise<ToolOutcome> {
  const s = await db()
  const perms = s.agentSettings.permissions
  const today = dayKey(ctx.now)
  const service = (id: unknown) => s.services.find((x) => x.id === id)
  const member = (id: unknown) => s.staff.find((x) => x.id === id)
  const validDay = (d: unknown): d is string => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)

  switch (name) {
    case "consultar_disponibilidad": {
      const svc = service(input.servicio_id)
      if (!svc || !validDay(input.fecha)) return fail("Servicio o fecha inválidos.")
      if (input.fecha < today) return fail("That date has already passed.")
      if (input.fecha > addDays(today, 45)) return fail("Sólo se agenda con hasta 45 días de anticipación.")
      if (!isOpen(input.fecha)) {
        let next = addDays(input.fecha, 1)
        while (!isOpen(next)) next = addDays(next, 1)
        return { result: { ok: true, cerrado: true, dia: formatDayLong(input.fecha), proximo_dia_abierto: next } }
      }
      const asked = input.barbero_id === "cualquiera" ? undefined : member(input.barbero_id)
      if (asked && !worksOn(asked, input.fecha)) {
        return {
          result: { ok: true, dia: formatDayLong(input.fecha), barbero: asked.name, barbero_no_atiende_ese_dia: true, horarios: [] },
          action: "consulta_respondida",
        }
      }
      const base = { day: input.fecha, service: svc, appointments: s.appointments, now: ctx.now, stepMin: s.shopSettings.slotStepMin }
      const slots =
        input.barbero_id === "cualquiera"
          ? freeSlotsAnyStaff({ ...base, staff: s.staff.filter((x) => x.active) }).map((x) => ({
              hora: x.time,
              barbero: member(x.staffId)!.name,
              barbero_id: x.staffId,
            }))
          : (() => {
              const m = member(input.barbero_id)
              return m ? freeSlots({ ...base, staff: m }).map((t) => ({ hora: t, barbero: m.name, barbero_id: m.id })) : []
            })()
      // Upstream implementation note.
      // Upstream implementation note.
      // Upstream implementation note.
      const from = typeof input.desde_hora === "string" && /^\d{2}:\d{2}$/.test(input.desde_hora) ? input.desde_hora : ""
      const inRange = from ? slots.filter((x) => x.hora >= from) : slots
      const spaced = (inRange.length > 8 ? inRange.filter((_, i) => i % 2 === 0) : inRange).slice(0, 8)
      return {
        result: {
          ok: true,
          dia: formatDayLong(input.fecha),
          servicio: svc.name,
          ...(from ? { desde: from } : {}),
          horarios: spaced,
          hay_mas: inRange.length > spaced.length,
          // Upstream implementation note.
          // Upstream implementation note.
          ...(from && !inRange.length
            ? { sin_lugar_en_esa_franja: true, horarios_antes: slots.filter((x) => x.hora < from).slice(-3) }
            : {}),
        },
        action: "consulta_respondida",
      }
    }

    case "crear_turno": {
      if (!perms.book) return fail("El dueño no habilitó que el agente agende. Derivá to a person.")
      const svc = service(input.servicio_id)
      const anyStaff = input.barbero_id === "cualquiera"
      const chosen = anyStaff && svc && validDay(input.fecha) && typeof input.hora === "string"
        ? freeSlotsAnyStaff({ day: input.fecha, service: svc, staff: s.staff.filter((x) => x.active), appointments: s.appointments, now: ctx.now, stepMin: s.shopSettings.slotStepMin })
            .find((slot) => slot.time === input.hora)?.staffId
        : null
      const m = member(chosen ?? input.barbero_id)
      if (!svc || !m || !validDay(input.fecha) || typeof input.hora !== "string") return fail("Datos del turno inválidos.")
      if (!clientAgreedTo(input.hora, ctx.history ?? [])) return fail(NOT_AGREED)
      const free = freeSlots({ day: input.fecha, service: svc, staff: m, appointments: s.appointments, now: ctx.now, stepMin: s.shopSettings.slotStepMin })
      if (!free.includes(input.hora)) {
        return fail(`${m.name} ya no tiene libre ${input.hora} el ${formatDayLong(input.fecha)}. Check availability again.`)
      }

      const start = at(input.fecha, input.hora)
      const deposit = s.shopSettings.depositEnabled ? { amount: s.shopSettings.depositAmount, holdMin: s.shopSettings.depositHoldMin } : null
      if (ctx.dryRun) {
        return {
          result: {
            ok: true,
            ensayo: true,
            turno_id: "ensayo",
            dia: formatDayLong(input.fecha),
            hora: input.hora,
            barbero: m.name,
            servicio: svc.name,
            precio: svc.price,
            ...(deposit ? { sena_requerida: true, monto_sena: deposit.amount, link_de_pago: "https://ensayo.mercadopago.com/no-se-genera-en-el-ensayo" } : {}),
          },
          action: "turno_creado",
        }
      }
      let created: { appointmentId: string; clientId: string }
      try {
        created = await store().createAppointment({
          appointment: {
            clientId: ctx.clientId ?? undefined,
            staffId: m.id,
            serviceId: svc.id,
            startsAt: start.toISOString(),
            endsAt: new Date(start.getTime() + svc.durationMin * 60_000).toISOString(),
            // Upstream implementation note.
            status: deposit ? "pendiente" : "confirmado",
            source: "agente",
            price: svc.price,
            notes: null,
            conversationId: ctx.conversationId,
            createdAt: ctx.now.toISOString(),
            holdExpiresAt: deposit ? new Date(ctx.now.getTime() + deposit.holdMin * 60_000).toISOString() : null,
          },
          newClient: ctx.clientId
            ? undefined
            : {
                name: String(input.nombre_cliente || ctx.participantName).trim().slice(0, 80),
                phone: String(input.telefono || "").replace(/[^\d+]/g, "") || null,
                channel: ctx.channel,
                notes: "Creado por el AI Agent.",
                preferredStaffId: anyStaff ? null : m.id,
              },
          linkConversationId: ctx.conversationId,
        })
      } catch (e) {
        if (e instanceof SlotTakenError) return fail(`That time was just taken. Check availability again.`)
        throw e
      }
      const id = created.appointmentId
      const clientId = created.clientId

      if (!deposit) {
        return {
          result: { ok: true, turno_id: id, dia: formatDayLong(input.fecha), hora: input.hora, barbero: m.name, servicio: svc.name, precio: svc.price },
          action: "turno_creado",
          clientId,
        }
      }

      const checkoutUrl = await startDepositCheckout({ appointmentId: id, serviceName: svc.name, amount: deposit.amount, holdMin: deposit.holdMin })
      if (!checkoutUrl) {
        await store().updateAppointment(id, { status: "cancelado", notes: "No se pudo generar el link de pago." })
        return fail("No se pudo generar el link de pago en este momento. Derivá to a person para que lo agende a mano.")
      }
      return {
        result: {
          ok: true,
          turno_id: id,
          dia: formatDayLong(input.fecha),
          hora: input.hora,
          barbero: m.name,
          servicio: svc.name,
          precio: svc.price,
          sena_requerida: true,
          monto_sena: deposit.amount,
          minutos_para_pagar: deposit.holdMin,
          link_de_pago: checkoutUrl,
        },
        action: "turno_creado",
        clientId,
      }
    }

    case "turnos_del_cliente": {
      if (!ctx.clientId) return { result: { ok: true, turnos: [], nota: "No es cliente registrado." } }
      const mine = s.appointments
        .filter((a) => a.clientId === ctx.clientId && new Date(a.startsAt) > ctx.now && ["pendiente", "confirmado"].includes(a.status))
        .map((a) => ({
          turno_id: a.id,
          dia: formatDayLong(dayKey(a.startsAt)),
          hora: hm(a.startsAt),
          servicio: service(a.serviceId)?.name,
          barbero: member(a.staffId)?.name,
        }))
      return { result: { ok: true, turnos: mine } }
    }

    case "reprogramar_turno": {
      if (!perms.reschedule) return fail("El dueño no habilitó reprogramar. Derivá to a person.")
      const appt = s.appointments.find((a) => a.id === input.turno_id)
      // Upstream implementation note.
      if (!appt || appt.clientId !== ctx.clientId) return fail("No encontré ese turno entre los del cliente.")
      if (!validDay(input.fecha) || typeof input.hora !== "string") return fail("Invalid date or time.")
      if (!clientAgreedTo(input.hora, ctx.history ?? [])) return fail(NOT_AGREED)
      const svc = service(appt.serviceId)!
      const m = member(appt.staffId)!
      const others = s.appointments.filter((a) => a.id !== appt.id)
      if (!freeSlots({ day: input.fecha, service: svc, staff: m, appointments: others, now: ctx.now, stepMin: s.shopSettings.slotStepMin }).includes(input.hora)) {
        return fail(`${m.name} is not available at that time. Check availability.`)
      }
      const start = at(input.fecha, input.hora)
      if (ctx.dryRun) {
        return { result: { ok: true, ensayo: true, dia: formatDayLong(input.fecha), hora: input.hora, barbero: m.name, servicio: svc.name }, action: "turno_reprogramado" }
      }
      try {
        await store().updateAppointment(appt.id, {
          startsAt: start.toISOString(),
          endsAt: new Date(start.getTime() + svc.durationMin * 60_000).toISOString(),
          notes: "Reprogramado por el AI Agent.",
        })
      } catch (e) {
        if (e instanceof SlotTakenError) return fail(`${m.name} is no longer available at that time. Check availability.`)
        throw e
      }
      return {
        result: { ok: true, dia: formatDayLong(input.fecha), hora: input.hora, barbero: m.name, servicio: svc.name },
        action: "turno_reprogramado",
      }
    }

    case "cancelar_turno": {
      if (!perms.cancel) return fail("El dueño no habilitó cancelar. Derivá to a person.")
      const appt = s.appointments.find((a) => a.id === input.turno_id)
      if (!appt || appt.clientId !== ctx.clientId) return fail("No encontré ese turno entre los del cliente.")
      if (!ctx.dryRun) {
        await store().updateAppointment(appt.id, { status: "cancelado", notes: `Cancelled by AI Agent: ${String(input.motivo).slice(0, 200)}` })
      }
      return { result: { ok: true, cancelado: true }, action: "turno_cancelado" }
    }

    case "consultar_fidelidad": {
      if (!perms.shareLoyalty) return fail("El dueño no habilitó informar la tarjeta.")
      if (!ctx.clientId) return { result: { ok: true, sellos: 0, nota: "Todavía no es cliente: arranca con su primer corte." } }
      const st = loyaltyStatus(ctx.clientId, s.payments, s.services)
      return {
        result: { ok: true, sellos: st.stamps, necesarios: st.required, le_toca_descuento: st.rewardReady },
        action: "sello_consultado",
      }
    }

    case "derivar_a_humano": {
      if (ctx.conversationId && !ctx.dryRun) {
        await store().updateConversation(ctx.conversationId, { mode: "humano", needsHuman: true, handoffReason: String(input.motivo).slice(0, 120) })
      }
      return { result: { ok: true, derivado: true }, action: "derivado_humano" }
    }

    default:
      return fail(`Herramienta desconocida: ${name}`)
  }
}
