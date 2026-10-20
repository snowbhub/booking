"use client"

import { useState, useTransition } from "react"
import { Pencil, Pin, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { BRAND } from "@/config/brand"
import { removeFixedSlot, saveFixedSlot } from "@/lib/data/settings-actions"
import { formatDayShort, hmToMinutes, minutesToHm, WEEKDAY_SHORT } from "@/lib/time"
import { TimeSelect } from "@/components/forms/time-select"
import { cn } from "@/lib/utils"
import type { FixedSlot, Staff } from "@/lib/domain/types"
import { Choice } from "./services-editor"

/** Upstream implementation note. */
const OPEN_DAYS = [...BRAND.openingHours.days].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7))
const SHOP_OPEN = hmToMinutes(BRAND.openingHours.open)
const SHOP_CLOSE = hmToMinutes(BRAND.openingHours.close)
const dayOrder = (wd: number) => (wd + 6) % 7

function sortSlots(a: FixedSlot, b: FixedSlot) {
  // Upstream implementation note.
  if ((a.weekday === null) !== (b.weekday === null)) return a.weekday === null ? 1 : -1
  if (a.weekday !== null && b.weekday !== null && a.weekday !== b.weekday) return dayOrder(a.weekday) - dayOrder(b.weekday)
  if (a.onDate && b.onDate && a.onDate !== b.onDate) return a.onDate.localeCompare(b.onDate)
  return a.start.localeCompare(b.start)
}

/** Upstream implementation note. */
export function FixedSlotsEditor({ staff, slots, today }: { staff: Staff[]; slots: FixedSlot[]; today: string }) {
  const [editing, setEditing] = useState<Partial<FixedSlot> | null>(null)
  const active = staff.filter((m) => m.active)

  return (
    <div className="space-y-5">
      <p className="text-[13px] text-ivory-3">Clients who always come on the same day and time can reserve a fixed slot. That slot is no longer offered to others through WhatsApp, Instagram or online booking. When the client arrives, create their appointment with Quick booking.</p>

      {active.map((m) => {
        const mine = slots.filter((s) => s.staffId === m.id).sort(sortSlots)
        return (
          <section key={m.id} className="panel">
            <header className="flex items-center gap-3 px-5 pt-4 pb-3">
              <span className="grid size-9 place-items-center rounded-full bg-surface-3 text-[13px] font-semibold text-ivory">{m.name[0]}</span>
              <span className="min-w-0 flex-1 text-[14px] font-medium text-ivory">{m.name}</span>
              <Button variant="ghost" size="sm" onClick={() => setEditing({ staffId: m.id, weekday: OPEN_DAYS[0], onDate: null, start: "18:00", end: "19:00", active: true })}>
                <Plus /> Agregar
              </Button>
            </header>
            <div className="px-5 pb-5">
              {mine.length === 0 ? (
                <p className="text-[12.5px] text-ivory-3">No fixed bookings.</p>
              ) : (
                <ul className="space-y-1.5">
                  {mine.map((s) => (
                    <SlotRow key={s.id} slot={s} onEdit={() => setEditing(s)} />
                  ))}
                </ul>
              )}
            </div>
          </section>
        )
      })}

      {editing && <SlotDialog slot={editing} staff={active} today={today} onClose={() => setEditing(null)} />}
    </div>
  )
}

function SlotRow({ slot, onEdit }: { slot: FixedSlot; onEdit: () => void }) {
  const [pending, startTransition] = useTransition()
  const when = slot.weekday !== null ? `${WEEKDAY_SHORT[slot.weekday]}, every week` : `${formatDayShort(slot.onDate!)}, una sola vez`

  return (
    <li className={cn("flex items-center gap-3 rounded-lg bg-surface-2 px-3 py-2", !slot.active && "opacity-60")}>
      <Pin className="size-3.5 shrink-0 text-ivory-3" />
      <span className="min-w-0 flex-1 text-[13px] text-ivory">
        <span className="num font-medium">
          {slot.start} a {slot.end}
        </span>{" "}
        · {when}
        {slot.label && <span className="text-ivory-3"> · {slot.label}</span>}
        {!slot.active && <span className="text-ivory-3"> · paused</span>}
      </span>
      <Switch
        className="data-checked:bg-ivory-2"
        checked={slot.active}
        disabled={pending}
        aria-label={slot.active ? "Pause this fixed booking" : "Reactivate this fixed booking"}
        onCheckedChange={(v) =>
          startTransition(async () => {
            const res = await saveFixedSlot({
              id: slot.id,
              staffId: slot.staffId,
              repeat: slot.weekday !== null ? "weekly" : "once",
              weekday: slot.weekday ?? undefined,
              onDate: slot.onDate ?? undefined,
              start: slot.start,
              end: slot.end,
              label: slot.label ?? undefined,
              active: v,
            })
            if (!res.ok) toast.error(res.error)
          })
        }
      />
      <Button variant="ghost" size="icon" aria-label="Edit" onClick={onEdit}>
        <Pencil />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Remove fixed booking"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const res = await removeFixedSlot(slot.id)
            if (res.ok) toast.success("Fixed booking removed")
            else toast.error(res.error)
          })
        }
      >
        <Trash2 />
      </Button>
    </li>
  )
}

function SlotDialog({ slot, staff, today, onClose }: { slot: Partial<FixedSlot>; staff: Staff[]; today: string; onClose: () => void }) {
  const [staffId, setStaffId] = useState(slot.staffId ?? staff[0]?.id ?? "")
  const [repeat, setRepeat] = useState<"weekly" | "once">(slot.onDate ? "once" : "weekly")
  const [weekday, setWeekday] = useState(slot.weekday ?? OPEN_DAYS[0])
  const [onDate, setOnDate] = useState(slot.onDate ?? today)
  const [start, setStart] = useState(slot.start ?? "18:00")
  const [end, setEnd] = useState(slot.end ?? "19:00")
  const [label, setLabel] = useState(slot.label ?? "")
  const [pending, startTransition] = useTransition()
  const duration = hmToMinutes(end) - hmToMinutes(start)

  // Upstream implementation note.
  function changeStart(v: string) {
    const span = duration > 0 ? duration : 60
    setStart(v)
    setEnd(minutesToHm(Math.min(hmToMinutes(v) + span, SHOP_CLOSE)))
  }

  function submit() {
    startTransition(async () => {
      const res = await saveFixedSlot({
        id: slot.id,
        staffId,
        repeat,
        weekday,
        onDate,
        start,
        end,
        label,
        active: slot.active ?? true,
      })
      if (!res.ok) return void toast.error(res.error)
      if (res.overlapping) {
        toast.warning(`Saved. Note: ${res.overlapping} booking${res.overlapping === 1 ? "" : "s"} already existing${res.overlapping === 1 ? "" : "s"} in that time range. Move them from the schedule.`)
      } else toast.success("Fixed booking saved")
      onClose()
    })
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="font-display text-[20px]">{slot.id ? "Edit fixed booking" : "New fixed booking"}</DialogTitle>
          <DialogDescription className="text-ivory-3">That time is no longer offered to other clients.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <fieldset>
            <legend className="mb-1.5 text-[12.5px] text-ivory-2">Staff member</legend>
            <div className="grid grid-cols-3 gap-1.5">
              {staff.map((m) => (
                <Choice key={m.id} active={staffId === m.id} onClick={() => setStaffId(m.id)}>
                  {m.name}
                </Choice>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-2 gap-1.5">
            <Choice active={repeat === "weekly"} onClick={() => setRepeat("weekly")}>
              Every week
            </Choice>
            <Choice active={repeat === "once"} onClick={() => setRepeat("once")}>
              One day only
            </Choice>
          </div>

          {repeat === "weekly" ? (
            <fieldset>
              <legend className="mb-1.5 text-[12.5px] text-ivory-2">Day</legend>
              <div className="grid grid-cols-5 gap-1.5">
                {OPEN_DAYS.map((wd) => (
                  <Choice key={wd} active={weekday === wd} onClick={() => setWeekday(wd)}>
                    {WEEKDAY_SHORT[wd]}
                  </Choice>
                ))}
              </div>
            </fieldset>
          ) : (
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] text-ivory-2">Date</span>
              <input
                type="date"
                value={onDate}
                min={today}
                onChange={(e) => setOnDate(e.target.value)}
                className="num h-10 w-full rounded-lg border border-line-strong bg-surface-2 px-3 text-[14px] text-ivory [color-scheme:dark] focus:border-gold/50 focus:outline-none"
              />
            </label>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-2 text-[13px] text-ivory-3">
              De
              <TimeSelect value={start} onChange={changeStart} label="From" to={minutesToHm(SHOP_CLOSE - 5)} className="h-10" />
              a
              <TimeSelect value={end} onChange={setEnd} label="To" from={minutesToHm(SHOP_OPEN + 5)} className="h-10" />
              {duration > 0 && <span className="num text-ivory-2">· {duration} min</span>}
            </div>
            {duration <= 0 && <p className="mt-1.5 text-[12px] text-danger">End time must be after start time.</p>}
            <p className="mt-1.5 text-[12px] text-ivory-3">You can choose times in 5-minute increments, such as 17:15–18:00 or 17:00–17:45.</p>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-[12.5px] text-ivory-2">Who is it? (optional, team only)</span>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Example: client, hair and beard"
              className="h-10 w-full rounded-lg border border-line-strong bg-surface-2 px-3 text-[14px] text-ivory placeholder:text-ivory-3 focus:border-gold/50 focus:outline-none"
            />
          </label>

          <Button size="lg" className="h-10 w-full font-semibold" disabled={pending || !staffId || duration <= 0} onClick={submit}>
            {pending ? "Saving…" : "Save fixed booking"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
