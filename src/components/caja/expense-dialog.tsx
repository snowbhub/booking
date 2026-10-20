"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { addExpense } from "@/lib/data/actions"
import { METHOD_LABEL, METHODS } from "@/lib/money"
import { cn } from "@/lib/utils"
import type { ExpenseCategory, PaymentMethod, Staff } from "@/lib/domain/types"

const CATEGORIES: { id: ExpenseCategory; label: string }[] = [
  { id: "insumos", label: "Insumos" },
  { id: "servicios", label: "Services" },
  { id: "alquiler", label: "Rent" },
  { id: "vale", label: "Vale" },
  { id: "sueldos", label: "Staff payouts" },
  { id: "marketing", label: "Marketing" },
  { id: "otros", label: "Other" },
]

/** Upstream implementation note. */
export function ExpenseDialog({
  open,
  onOpenChange,
  staff,
  initialCategory = "insumos",
  initialStaffId,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  staff: Staff[]
  initialCategory?: ExpenseCategory
  initialStaffId?: string
}) {
  const [category, setCategory] = useState<ExpenseCategory>(initialCategory)
  const [staffId, setStaffId] = useState(initialStaffId ?? "")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState<PaymentMethod>("efectivo")
  const [pending, startTransition] = useTransition()

  const members = staff.filter((s) => s.active)
  const forStaff = category === "vale" || category === "sueldos"

  function submit() {
    startTransition(async () => {
      const res = await addExpense({
        category,
        description,
        amount: Number(amount.replace(/\D/g, "")),
        method,
        staffId: forStaff ? staffId || undefined : undefined,
      })
      if (!res.ok) {
        toast.error(res.error)
        return
      }
      toast.success(category === "vale" ? "Advance added" : "Expense added")
      setDescription("")
      setAmount("")
      onOpenChange(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="font-display text-[20px]">{category === "vale" ? "Add advance" : "Add expense"}</DialogTitle>
          <DialogDescription className="text-ivory-3">Money leaving the cash: supplies, repairs, utilities or an advance.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                aria-pressed={category === c.id}
                className={cn(
                  "h-9 rounded-lg border text-[12.5px] font-medium",
                  category === c.id ? "border-gold bg-gold/8 text-ivory" : "border-line bg-surface-2 text-ivory-2"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          {forStaff && (
            <div>
              <p className="eyebrow mb-1.5">{category === "vale" ? "For whom?" : "Who was paid? (optional)"}</p>
              <div className="flex flex-wrap gap-1.5">
                {members.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setStaffId(staffId === m.id ? "" : m.id)}
                    aria-pressed={staffId === m.id}
                    className={cn(
                      "h-9 rounded-lg border px-3 text-[13px] font-medium",
                      staffId === m.id ? "border-gold bg-gold/8 text-ivory" : "border-line bg-surface-2 text-ivory-2"
                    )}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={category === "vale" ? "Detalle (opcional)" : "Description (e.g. razor blades)"}
            className="h-10 w-full rounded-lg border border-line-strong bg-surface-2 px-3 text-[14px] text-ivory placeholder:text-ivory-3 focus:outline-none"
          />
          <div className="flex gap-2">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="numeric"
              placeholder="Amount"
              className="num h-10 flex-1 rounded-lg border border-line-strong bg-surface-2 px-3 text-[14px] text-ivory placeholder:text-ivory-3 focus:outline-none"
            />
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as PaymentMethod)}
              className="h-10 rounded-lg border border-line-strong bg-surface-2 px-2 text-[13px] text-ivory"
            >
              {METHODS.map((m) => (
                <option key={m} value={m}>
                  {METHOD_LABEL[m]}
                </option>
              ))}
            </select>
          </div>
          <Button size="lg" className="h-10 w-full font-semibold" disabled={pending} onClick={submit}>
            {category === "vale" ? "Save advance" : "Save expense"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
