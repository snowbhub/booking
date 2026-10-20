"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { CircleDollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { saveDepositSettings } from "@/lib/data/settings-actions"
import type { ShopSettings } from "@/lib/domain/types"
import { Toggle } from "./services-editor"

/** Upstream implementation note. */
export function DepositSettingsForm({ settings }: { settings: ShopSettings }) {
  const [enabled, setEnabled] = useState(settings.depositEnabled)
  const [amount, setAmount] = useState(String(settings.depositAmount || ""))
  const [holdMin, setHoldMin] = useState(String(settings.depositHoldMin))
  const [pending, startTransition] = useTransition()
  const dirty = enabled !== settings.depositEnabled || Number(amount || 0) !== settings.depositAmount || Number(holdMin || 0) !== settings.depositHoldMin

  function save() {
    startTransition(async () => {
      const res = await saveDepositSettings({ enabled, amount: Number(amount || 0), holdMin: Number(holdMin || 0) })
      if (res.ok) toast.success(enabled ? "Deposit enabled" : "Deposit disabled")
      else toast.error(res.error)
    })
  }

  return (
    <div className="space-y-3">
      <Toggle label="Require a deposit for web or AI bookings" checked={enabled} onChange={setEnabled} />
      {enabled && (
        <div className="flex flex-wrap gap-3">
          <label className="min-w-0 flex-1">
            <span className="mb-1.5 block text-[12.5px] text-ivory-2">Deposit amount</span>
            <span className="relative block max-w-[220px]">
              <CircleDollarSign className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ivory-3" />
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                placeholder="e.g. 5000"
                className="num h-10 w-full rounded-lg border border-line-strong bg-surface-2 pr-3 pl-9 text-[14px] text-ivory placeholder:text-ivory-3 focus:border-gold/50 focus:outline-none"
              />
            </span>
          </label>
          <label className="min-w-0">
            <span className="mb-1.5 block text-[12.5px] text-ivory-2">Minutes to pay</span>
            <input
              value={holdMin}
              onChange={(e) => setHoldMin(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              className="num h-10 w-[110px] rounded-lg border border-line-strong bg-surface-2 px-3 text-[14px] text-ivory focus:border-gold/50 focus:outline-none"
            />
          </label>
        </div>
      )}
      {dirty && (
        <Button size="sm" disabled={pending || (enabled && !Number(amount))} onClick={save}>
          {pending ? "Saving…" : "Save"}
        </Button>
      )}
      <p className="text-[12.5px] text-ivory-3">
        {enabled
          ? "If payment does not arrive in time, the slot is released automatically. The remaining amount is collected on site after deducting the deposit."
          : "Bookings currently require no advance payment."}
      </p>
    </div>
  )
}
