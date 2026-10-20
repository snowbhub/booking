"use client"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { saveCalendarSettings } from "@/lib/data/settings-actions"
import type { ShopSettings } from "@/lib/domain/types"

export function CalendarSettings({settings}:{settings:ShopSettings}) {
 const [open,setOpen]=useState(settings.calendarOpen),[close,setClose]=useState(settings.calendarClose),[step,setStep]=useState(settings.calendarStepMin),[overlaps,setOverlaps]=useState(settings.allowStaffOverlaps),[pending,start]=useTransition()
 return <div className="space-y-5 rounded-xl border border-line bg-surface-1 p-4">
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><label className="block min-w-0 text-sm">El local abre<input type="time" value={open} onChange={e=>setOpen(e.target.value)} className="mt-1 box-border h-11 w-full min-w-0 max-w-full rounded-lg border border-line bg-surface-2 px-3"/></label><label className="block min-w-0 text-sm">El local cierra<input type="time" value={close} onChange={e=>setClose(e.target.value)} className="mt-1 box-border h-11 w-full min-w-0 max-w-full rounded-lg border border-line bg-surface-2 px-3"/></label></div>
  <label className="block text-sm">Paso de la cuadrícula del calendario<select value={step} onChange={e=>setStep(Number(e.target.value))} className="mt-1 box-border h-11 w-full min-w-0 max-w-full rounded-lg border border-line bg-surface-2 px-3"><option value={15}>Cada 15 minutos</option><option value={30}>Cada 30 minutos</option></select></label>
  <label className="flex items-start gap-3 rounded-lg border border-line p-3"><input type="checkbox" checked={overlaps} onChange={e=>setOverlaps(e.target.checked)} className="mt-1 size-4"/><span><b className="block text-sm">Permitir turnos superpuestos para el equipo</b><span className="text-xs text-ivory-3">Sólo el personal del panel puede usarlos. La reserva pública sigue bloqueando las horas ya ocupadas.</span></span></label>
  <button disabled={pending} onClick={()=>start(async()=>{const r=await saveCalendarSettings({open,close,step,allowOverlaps:overlaps});r.ok?toast.success("Configuración del calendario guardada"):toast.error(r.error)})} className="h-11 w-full rounded-lg bg-ivory font-semibold text-obsidian">{pending?"Guardando…":"Guardar configuración"}</button>
 </div>
}
