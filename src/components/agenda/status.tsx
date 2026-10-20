import { cn } from "@/lib/utils"
import type { AppointmentSource, AppointmentStatus } from "@/lib/domain/types"

/** Upstream implementation note. */
export const STATUS_LABEL: Record<AppointmentStatus, string> = {
  pendiente: "Not confirmed",
  confirmado: "Confirmed",
  en_curso: "In progress",
  completado: "Served",
  cancelado: "Cancelled",
  no_show: "No-show",
}

export const SOURCE_LABEL: Record<AppointmentSource, string> = {
  agente: "AI Agent",
  panel: "Admin panel",
  web: "Web",
  walk_in: "Walk-in",
}

export function StatusPill({ status, className }: { status: AppointmentStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1.5 rounded-full px-2 text-[11px] font-medium whitespace-nowrap",
        status === "pendiente" && "border border-dashed border-ivory-3/60 text-ivory-2",
        status === "confirmado" && "bg-surface-3 text-ivory-2",
        status === "en_curso" && "bg-ok/15 text-ok",
        status === "completado" && "text-ivory-3",
        (status === "cancelado" || status === "no_show") && "bg-danger/12 text-danger",
        className
      )}
    >
      {status === "en_curso" && <span className="size-1.5 rounded-full bg-ok" style={{ animation: "live-pulse 2s infinite" }} />}
      {STATUS_LABEL[status]}
    </span>
  )
}
