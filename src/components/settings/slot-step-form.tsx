"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { saveSlotStep } from "@/lib/data/settings-actions"
import { Choice } from "./services-editor"

const STEPS = [30, 45, 60]

/** Upstream implementation note. */
export function SlotStepForm({ value }: { value: number }) {
  const [step, setStep] = useState(value)
  const [pending, startTransition] = useTransition()

  function pick(minutes: number) {
    if (minutes === step) return
    const before = step
    setStep(minutes)
    startTransition(async () => {
      const res = await saveSlotStep(minutes)
      if (!res.ok) {
        setStep(before)
        return void toast.error(res.error)
      }
      toast.success(`Ahora se ofrecen horarios cada ${minutes} minutos`)
    })
  }

  return (
    <div className="space-y-3">
      <fieldset disabled={pending}>
        <legend className="mb-1.5 text-[12.5px] text-ivory-2">Offer a slot every</legend>
        <div className="grid max-w-[360px] grid-cols-3 gap-1.5">
          {STEPS.map((m) => (
            <Choice key={m} active={step === m} onClick={() => pick(m)}>
              {m} min
            </Choice>
          ))}
        </div>
      </fieldset>
      <p className="text-[12.5px] text-ivory-3">This is what clients see when booking and what the AI Agent offers. Existing bookings do not change. Service duration is set on the Services tab.</p>
    </div>
  )
}
