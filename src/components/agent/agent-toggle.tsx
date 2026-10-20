"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { Pause, Play } from "lucide-react"
import { updateAgentSettings } from "@/lib/data/actions"
import { cn } from "@/lib/utils"

/** El interruptor general. Pausado, todas las conversaciones esperan to a person. */
export function AgentToggle({ enabled }: { enabled: boolean }) {
  const [pending, startTransition] = useTransition()
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await updateAgentSettings({ enabled: !enabled })
          toast.success(enabled ? "AI Agent paused. Messages stay with the team." : "AI Agent is active again.")
        })
      }
      className={cn(
        "flex h-10 items-center gap-2 rounded-lg border px-4 text-[13.5px] font-semibold transition-colors",
        enabled ? "border-ok/40 bg-ok/10 text-ok hover:bg-ok/15" : "border-line-strong bg-surface-2 text-ivory-2 hover:text-ivory"
      )}
    >
      {enabled ? (
        <>
          <span className="size-2 rounded-full bg-ok" style={{ animation: "live-pulse 2.4s ease-out infinite" }} />
          Activo · <Pause className="size-3.5" /> Pausar
        </>
      ) : (
        <>
          <Play className="size-3.5" /> Enable AI Agent
        </>
      )}
    </button>
  )
}
