"use client"

import { useState, useTransition } from "react"
import { setStaffLevel } from "@/lib/ranks/actions"
import { saveStaffAccount, setStaffAccountActive } from "@/lib/auth/staff-actions"
import Link from "next/link"
import Image from "next/image"
import { StaffPhotoEditor } from "./staff-photo-editor"
import { CalendarOff, Pencil, Plus, Trash2, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { BRAND } from "@/config/brand"
import { addTimeOff, removeTimeOff, saveSchedule, saveStaff } from "@/lib/data/settings-actions"
import { dayKey, formatDayShort, hm, hmToMinutes, minutesToHm, WEEKDAY_SHORT } from "@/lib/time"
import { breakBetween, normalizeShifts, withAnotherRange } from "@/lib/domain/schedule"
import { TimeSelect } from "@/components/forms/time-select"
import { cn } from "@/lib/utils"
import type { Staff, TimeOffEntry, WorkShift } from "@/lib/domain/types"
import { Choice, Toggle } from "./services-editor"

/** Upstream implementation note. */
const OPEN_DAYS = [...BRAND.openingHours.days].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7))
const DEFAULT_SHIFT = { start: BRAND.openingHours.open, end: BRAND.openingHours.close }

/** Upstream implementation note. */
export function TeamEditor({ staff, timeOff, today, accounts=[],photos=[] }: { staff: Staff[]; timeOff: TimeOffEntry[]; today: string; accounts?: {staffId:string;username:string;active:boolean}[];photos?:string[] }) {
  const [editing, setEditing] = useState<Partial<Staff> | null>(null)
  const [offFor, setOffFor] = useState<string | null>(null)

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-line-strong bg-surface-2 p-4"><h2 className="text-lg font-semibold text-ivory">Employees</h2><p className="mt-2 text-sm text-ivory-2">Edit a staff member to set their commission percentage. Weekly payroll is shown under Finance.</p></div>
      {staff.map((m) => (
        <section key={m.id} className={cn("panel", !m.active && "opacity-60")}>
          <header className="flex items-center gap-3 px-5 pt-4 pb-3">
            <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-3 text-sm font-semibold text-ivory">{photos.includes(m.id)?<Image unoptimized width={44} height={44} src={`/api/staff-avatar/${m.id}`} alt={m.name} className="h-full w-full object-cover" />:m.name[0]}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-medium text-ivory">
                {m.name}
                {!m.active && <span className="ml-2 text-[11.5px] font-normal text-ivory-3">(inactive)</span>}
              </span>
              <span className="block text-[12px] text-ivory-3">
                {m.role === "dueno" ? "Owner" : `Staff member · ${m.commissionPct}% commission + tips`}
              </span>
            </span>
            <Button variant="ghost" size="icon" aria-label={`Editar ${m.name}`} onClick={() => setEditing(m)}>
              <Pencil />
            </Button>
          </header>
            <details className="min-w-0 rounded-xl border border-line-strong bg-surface-2 p-3">
              <summary className="cursor-pointer text-sm font-semibold text-ivory">Rank, commission & login · Edit employee</summary>
              <div className="mt-4 space-y-4">
                <p className="text-xs text-ivory-3">Change the name and commission with the pencil above; other employee details are below.</p>
                <StaffPhotoEditor staffId={m.id} />
                <form action={setStaffLevel} className="flex min-w-0 gap-2">
                  <input type="hidden" name="staffId" value={m.id} />
                  <label className="min-w-0 flex-1 text-xs text-ivory-2">Professional level
                    <select name="level" defaultValue={m.professionalLevel || "barber"} className="mt-1 h-11 w-full min-w-0 rounded-lg border border-line-strong bg-surface-1 px-2 text-sm text-ivory">
                      <option value="trainee">Trainee</option><option value="junior">Junior barber</option>
                      <option value="barber">Barber</option><option value="senior">Senior barber</option>
                    </select>
                  </label>
                  <button className="self-end rounded-lg border border-line-strong px-3 py-3 text-xs text-ivory">Save</button>
                </form>
                <form action={saveStaffAccount} className="space-y-2">
                  <input type="hidden" name="staffId" value={m.id} />
                  <p className="text-xs font-semibold text-ivory-2">Employee login</p>
                  <input required pattern="[a-z0-9._-]{3,40}" name="username" placeholder="Username" defaultValue={accounts.find(a=>a.staffId===m.id)?.username || ""} autoComplete="off" className="h-11 w-full min-w-0 rounded-lg border border-line-strong bg-surface-1 px-3 text-base text-ivory"/>
                  <input type="password" required minLength={12} maxLength={128} name="password" placeholder="New password (12+ characters)" autoComplete="new-password" className="h-11 w-full min-w-0 rounded-lg border border-line-strong bg-surface-1 px-3 text-base text-ivory"/>
                  <button className="h-11 w-full rounded-lg bg-ivory text-sm font-semibold text-obsidian">Create / update staff login</button>
                </form>
                {accounts.some(a=>a.staffId===m.id) && <form action={setStaffAccountActive}>
                  <input type="hidden" name="staffId" value={m.id}/>
                  <input type="hidden" name="active" value={accounts.find(a=>a.staffId===m.id)?.active?"false":"true"}/>
                  <button className="w-full rounded-lg border border-line-strong p-3 text-sm text-ivory">{accounts.find(a=>a.staffId===m.id)?.active?"Disable employee login":"Enable employee login"}</button>
                </form>}
                <Link href="/payroll" className="block rounded-lg border border-line-strong p-3 text-center text-sm font-semibold text-ivory">View earnings and payouts →</Link>
              </div>
            </details>

          <div className="space-y-4 px-5 pb-5">
            {/* Upstream implementation note. */}
            <details className="rounded-xl border border-line-strong bg-surface-2 p-3">
              <summary className="cursor-pointer text-sm font-semibold text-ivory">Working hours and absences</summary>
              <div className="mt-4 space-y-4">
            <ScheduleEditor key={JSON.stringify(m.schedule ?? null)} member={m} />
            <TimeOffList entries={timeOff.filter((t) => t.staffId === m.id)} onAdd={() => setOffFor(m.id)} />
              </div>
            </details>
          </div>
        </section>
      ))}
      <Button variant="outline" className="h-10 w-full" onClick={() => setEditing({ name: "", commissionPct: 50, active: true })}>
        <Plus /> Add a team member
      </Button>
      {editing && <StaffDialog member={editing} onClose={() => setEditing(null)} />}
      {offFor && <TimeOffDialog member={staff.find((m) => m.id === offFor)!} today={today} onClose={() => setOffFor(null)} />}
    </div>
  )
}

/* Upstream implementation note. */

type Range = { start: string; end: string }
type Row = { works: boolean; ranges: Range[] }

const SHOP_CLOSE = hmToMinutes(BRAND.openingHours.close)

function toRows(member: Staff): Record<number, Row> {
  return Object.fromEntries(
    OPEN_DAYS.map((wd) => {
      // Upstream implementation note.
      if (!member.schedule) return [wd, { works: true, ranges: [{ ...DEFAULT_SHIFT }] }]
      const ranges = member.schedule
        .filter((s) => s.weekday === wd)
        .sort((a, b) => a.start.localeCompare(b.start))
        .map((s) => ({ start: s.start, end: s.end }))
      return [wd, ranges.length ? { works: true, ranges } : { works: false, ranges: [{ ...DEFAULT_SHIFT }] }]
    })
  )
}

/** Upstream implementation note. */
function ScheduleEditor({ member }: { member: Staff }) {
  const initial = JSON.stringify(toRows(member))
  const [rows, setRows] = useState(() => toRows(member))
  const [pending, startTransition] = useTransition()
  const dirty = JSON.stringify(rows) !== initial
  const setRow = (wd: number, patch: Partial<Row>) => setRows((cur) => ({ ...cur, [wd]: { ...cur[wd], ...patch } }))
  const setRange = (wd: number, i: number, patch: Partial<Range>) =>
    setRows((cur) => ({ ...cur, [wd]: { ...cur[wd], ranges: cur[wd].ranges.map((r, k) => (k === i ? { ...r, ...patch } : r)) } }))

  function save() {
    const shifts: WorkShift[] = OPEN_DAYS.filter((wd) => rows[wd].works).flatMap((wd) => rows[wd].ranges.map((r) => ({ weekday: wd, start: r.start, end: r.end })))
    const checked = normalizeShifts(shifts)
    if (!checked.ok) return void toast.error(checked.error)
    startTransition(async () => {
      const res = await saveSchedule(member.id, shifts)
      if (!res.ok) return void toast.error(res.error)
      toast.success(`Schedule for ${member.name} guardado`)
    })
  }

  return (
    <div>
      <p className="eyebrow mb-2 text-[10px]">Weekly schedule</p>
      <ul className="divide-y divide-line rounded-lg border border-line">
        {OPEN_DAYS.map((wd) => {
          const r = rows[wd]
          const more = withAnotherRange(r.ranges)
          return (
            <li key={wd} className="flex min-h-11 items-start gap-3 px-3 py-2">
              <span className="w-9 pt-1.5 text-[13px] font-medium text-ivory">{WEEKDAY_SHORT[wd]}</span>
              <span className="pt-1">
                <Switch className="data-checked:bg-ivory-2" checked={r.works} onCheckedChange={(v) => setRow(wd, { works: v })} aria-label={`${member.name} trabaja el ${WEEKDAY_SHORT[wd]}`} />
              </span>
              {r.works ? (
                <div className="min-w-0 flex-1 space-y-1.5">
                  {r.ranges.map((range, i) => {
                    const prev = r.ranges[i - 1]
                    const gap = prev ? breakBetween(prev, range) : null
                    const bad = hmToMinutes(range.end) <= hmToMinutes(range.start)
                    return (
                      <div key={i}>
                        {gap && <p className="mb-1 text-[11.5px] text-ivory-3">Break from {gap.from} a {gap.to}: not working</p>}
                        <div className="flex flex-wrap items-center gap-1.5 text-[13px] text-ivory-3">
                          <TimeSelect value={range.start} onChange={(v) => setRange(wd, i, { start: v })} label="Starts" to={minutesToHm(SHOP_CLOSE - 5)} />
                          to
                          <TimeSelect value={range.end} onChange={(v) => setRange(wd, i, { end: v })} label="Sale" from={minutesToHm(hmToMinutes(BRAND.openingHours.open) + 5)} />
                          {r.ranges.length > 1 && (
                            <Button variant="ghost" size="icon" aria-label="Remove this time range" onClick={() => setRow(wd, { ranges: r.ranges.filter((_, k) => k !== i) })}>
                              <X />
                            </Button>
                          )}
                          {bad && <span className="text-[11.5px] text-danger">End time must be after start time</span>}
                        </div>
                      </div>
                    )
                  })}
                  {more && (
                    <Button variant="ghost" size="sm" className="-ml-2 h-8" onClick={() => setRow(wd, { ranges: more })}>
                      <Plus /> Add shift interval
                    </Button>
                  )}
                </div>
              ) : (
                <span className="pt-1.5 text-[13px] text-ivory-3">Day off</span>
              )}
            </li>
          )
        })}
      </ul>
      {dirty && (
        <div className="mt-2 flex justify-end">
          <Button size="sm" disabled={pending} onClick={save}>
            {pending ? "Saving…" : "Save schedule"}
          </Button>
        </div>
      )}
    </div>
  )
}

/* ── Francos ── */

function describeOff(t: TimeOffEntry) {
  const from = new Date(t.startsAt)
  const to = new Date(t.endsAt)
  const fullDays = hm(from) === "00:00" && hm(to) === "00:00"
  if (fullDays) {
    const last = dayKey(new Date(to.getTime() - 60_000))
    const first = dayKey(from)
    return first === last ? formatDayShort(first) : `${formatDayShort(first)} to ${formatDayShort(last)}`
  }
  return `${formatDayShort(dayKey(from))}, ${hm(from)} to ${hm(to)}`
}

function TimeOffList({ entries, onAdd }: { entries: TimeOffEntry[]; onAdd: () => void }) {
  const [pending, startTransition] = useTransition()
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="eyebrow text-[10px]">Days off and holidays</p>
        <Button variant="ghost" size="sm" onClick={onAdd}>
          <CalendarOff /> Agregar
        </Button>
      </div>
      {entries.length === 0 ? (
        <p className="text-[12.5px] text-ivory-3">None added.</p>
      ) : (
        <ul className="space-y-1.5">
          {entries.map((t) => (
            <li key={t.id} className="flex items-center gap-3 rounded-lg bg-surface-2 px-3 py-2">
              <span className="min-w-0 flex-1 text-[13px] text-ivory">
                {describeOff(t)}
                {t.reason && <span className="text-ivory-3"> · {t.reason}</span>}
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Remove day off"
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    const res = await removeTimeOff(t.id)
                    if (res.ok) toast.success("Day off removed")
                    else toast.error(res.error)
                  })
                }
              >
                <Trash2 />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const REASONS = ["Franco", "Vacaciones", "Medical", "Personal errand"]

function TimeOffDialog({ member, today, onClose }: { member: Staff; today: string; onClose: () => void }) {
  const [fullDay, setFullDay] = useState(true)
  const [fromDay, setFromDay] = useState(today)
  const [toDay, setToDay] = useState(today)
  const [fromTime, setFromTime] = useState("11:00")
  const [toTime, setToTime] = useState("14:00")
  const [reason, setReason] = useState("Franco")
  const [pending, startTransition] = useTransition()

  function submit() {
    startTransition(async () => {
      const res = await addTimeOff({
        staffId: member.id,
        fromDay,
        toDay: fullDay ? toDay : fromDay,
        ...(fullDay ? {} : { fromTime, toTime }),
        reason,
      })
      if (!res.ok) return void toast.error(res.error)
      if (res.overlapping) {
        toast.warning(`Saved. Note: ${member.name} already has ${res.overlapping} booking${res.overlapping === 1 ? "" : "s"} in that period. Move them from the schedule.`)
      } else toast.success("Franco guardado")
      onClose()
    })
  }

  const dateClass =
    "num h-10 w-full rounded-lg border border-line-strong bg-surface-2 px-3 text-[14px] text-ivory [color-scheme:dark] focus:border-gold/50 focus:outline-none"

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="font-display text-[20px]">Franco de {member.name}</DialogTitle>
          <DialogDescription className="text-ivory-3">On those days the AI Agent and online booking do not offer this staff member.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-1.5">
            <Choice active={fullDay} onClick={() => setFullDay(true)}>
              Full days
            </Choice>
            <Choice active={!fullDay} onClick={() => setFullDay(false)}>
              Unas horas
            </Choice>
          </div>
          {fullDay ? (
            <div className="grid grid-cols-2 gap-2">
              <label>
                <span className="mb-1.5 block text-[12.5px] text-ivory-2">From</span>
                <input type="date" value={fromDay} min={today} onChange={(e) => { setFromDay(e.target.value); if (e.target.value > toDay) setToDay(e.target.value) }} className={dateClass} />
              </label>
              <label>
                <span className="mb-1.5 block text-[12.5px] text-ivory-2">Until (inclusive)</span>
                <input type="date" value={toDay} min={fromDay} onChange={(e) => setToDay(e.target.value)} className={dateClass} />
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block">
                <span className="mb-1.5 block text-[12.5px] text-ivory-2">Day</span>
                <input type="date" value={fromDay} min={today} onChange={(e) => setFromDay(e.target.value)} className={dateClass} />
              </label>
              <div className="flex items-center gap-2 text-[13px] text-ivory-3">
                De <TimeSelect value={fromTime} onChange={setFromTime} label="From" /> to <TimeSelect value={toTime} onChange={setToTime} label="To" />
              </div>
            </div>
          )}
          <fieldset>
            <legend className="mb-1.5 text-[12.5px] text-ivory-2">Reason (team only)</legend>
            <div className="grid grid-cols-4 gap-1.5">
              {REASONS.map((r) => (
                <Choice key={r} active={reason === r} onClick={() => setReason(r)}>
                  {r}
                </Choice>
              ))}
            </div>
          </fieldset>
          <Button size="lg" className="h-10 w-full font-semibold" disabled={pending} onClick={submit}>
            {pending ? "Saving…" : "Save time off"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* Upstream implementation note. */

function StaffDialog({ member, onClose }: { member: Partial<Staff>; onClose: () => void }) {
  const [name, setName] = useState(member.name ?? "")
  const [commission, setCommission] = useState(String(member.commissionPct ?? 50))
  const [active, setActive] = useState(member.active ?? true)
  const [pending, startTransition] = useTransition()
  const owner = member.role === "dueno"

  function submit() {
    startTransition(async () => {
      const res = await saveStaff({ id: member.id, name, commissionPct: owner ? 0 : Number(commission), active })
      if (!res.ok) return void toast.error(res.error)
      toast.success(member.id ? "Details saved" : `${name.trim()} is now on the team`)
      onClose()
    })
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="font-display text-[20px]">{member.id ? `Editar a ${member.name}` : "Sumar al equipo"}</DialogTitle>
          <DialogDescription className="text-ivory-3">
            {member.id ? "Commission is used in staff settlement." : "Starts with the business hours; you can adjust it afterwards."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] text-ivory-2">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-lg border border-line-strong bg-surface-2 px-3 text-[14px] text-ivory focus:border-gold/50 focus:outline-none"
            />
          </label>
          {!owner && (
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] text-ivory-2">Commission on each service</span>
              <span className="relative block">
                <input
                  value={commission}
                  onChange={(e) => setCommission(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  inputMode="numeric"
                  className="num h-10 w-full rounded-lg border border-line-strong bg-surface-2 pr-8 pl-3 text-[14px] text-ivory focus:border-gold/50 focus:outline-none"
                />
                <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[14px] text-ivory-3">%</span>
              </span>
            </label>
          )}
          {member.id && !owner && <Toggle label="Available for bookings" checked={active} onChange={setActive} />}
          <Button size="lg" className="h-10 w-full font-semibold" disabled={pending} onClick={submit}>
            {pending ? "Saving…" : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
