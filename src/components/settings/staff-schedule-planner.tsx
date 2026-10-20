"use client"
import { useEffect,useState,useTransition } from "react"
import { ChevronLeft,ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { saveStaffDateSchedule } from "@/lib/data/settings-actions"
import type { Staff } from "@/lib/domain/types"
import { normalizeLocale, type Locale } from "@/i18n/messages"

const localeTags:Record<Locale,string>={en:"en-GB",de:"de-DE",uk:"uk-UA"}
const words:Record<Locale,{staff:string;previous:string;next:string;works:string;start:string;end:string;saved:string;saving:string;save:string}>={
 en:{staff:"Staff member",previous:"Previous month",next:"Next month",works:"Works on this day",start:"Start",end:"End",saved:"Schedule saved",saving:"Saving…",save:"Save schedule"},
 de:{staff:"Mitarbeiter",previous:"Voriger Monat",next:"Nächster Monat",works:"Arbeitet an diesem Tag",start:"Beginn",end:"Ende",saved:"Arbeitszeit gespeichert",saving:"Wird gespeichert…",save:"Arbeitszeit speichern"},
 uk:{staff:"Працівник",previous:"Попередній місяць",next:"Наступний місяць",works:"Працює цього дня",start:"Початок",end:"Кінець",saved:"Графік на дату збережено",saving:"Зберігаємо…",save:"Зберегти графік на дату"}
}
const key=(d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`
export function StaffSchedulePlanner({staff,today}:{staff:Staff[];today:string}) {
 const [locale,setLocale]=useState<Locale>("en")
  useEffect(()=>{const read=()=>setLocale(normalizeLocale(localStorage.getItem("booking_locale")));read();window.addEventListener("booking:locale",read);return()=>window.removeEventListener("booking:locale",read)},[])
  const copy=words[locale], localeTag=localeTags[locale]
  const [month,setMonth]=useState(()=>new Date(today+"T12:00:00")),[member,setMember]=useState(staff[0]?.id||""),[day,setDay]=useState(today),[works,setWorks]=useState(true),[start,setStart]=useState(staff[0]?.calendarOpen||"11:00"),[end,setEnd]=useState(staff[0]?.calendarClose||"20:00"),[pending,run]=useTransition()
 const current=staff.find(x=>x.id===member)
 const monthName=new Intl.DateTimeFormat(localeTag,{month:"long",year:"numeric"}).format(month)
 const first=new Date(month.getFullYear(),month.getMonth(),1), offset=(first.getDay()+6)%7, days=new Date(month.getFullYear(),month.getMonth()+1,0).getDate()
 const pick=(date:string)=>{setDay(date);const item=current?.dateSchedule?.find(x=>x.day===date);setWorks(item?.works??true);setStart(item?.shifts[0]?.start??current?.calendarOpen??"10:00");setEnd(item?.shifts[0]?.end??current?.calendarClose??"20:00")}
 return <div className="space-y-4 rounded-xl border border-line bg-surface-1 p-4">
  <label className="block text-sm">{copy.staff}<select value={member} onChange={e=>{setMember(e.target.value);setDay("")}} className="mt-1 box-border h-11 w-full min-w-0 max-w-full rounded-lg border border-line bg-surface-2 px-3">{staff.filter(s=>s.active).map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
  <div className="flex items-center justify-between"><button aria-label={copy.previous} onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))} className="grid size-10 place-items-center rounded-lg border border-line"><ChevronLeft/></button><b className="capitalize">{monthName}</b><button aria-label={copy.next} onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))} className="grid size-10 place-items-center rounded-lg border border-line"><ChevronRight/></button></div>
  <div className="grid grid-cols-7 gap-1 text-center">{Array.from({length:7},(_,i)=>new Intl.DateTimeFormat(localeTag,{weekday:"short"}).format(new Date(2024,0,1+i))).map(n=><span key={n} className="py-1 text-xs text-ivory-3">{n}</span>)}{Array.from({length:offset},(_,i)=><span key={"x"+i}/>)}{Array.from({length:days},(_,i)=>{const date=key(new Date(month.getFullYear(),month.getMonth(),i+1));const savedDay=current?.dateSchedule?.find(x=>x.day===date);return <button key={date} onClick={()=>pick(date)} aria-pressed={day===date} className={`min-h-10 rounded-lg border text-sm ${day===date?"border-ivory bg-surface-3":"border-line"} ${savedDay?"font-bold text-sky-300":""}`}>{i+1}</button>})}</div>
  {day&&<div className="space-y-3 rounded-lg border border-line p-3"><p className="font-semibold">{new Intl.DateTimeFormat(localeTag,{dateStyle:"full"}).format(new Date(day+"T12:00:00"))}</p><label className="flex items-center gap-2"><input type="checkbox" checked={works} onChange={e=>setWorks(e.target.checked)}/>{copy.works}</label>{works&&<div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><label className="block min-w-0 text-sm">{copy.start}<input type="time" value={start} onChange={e=>setStart(e.target.value)} className="mt-1 box-border h-11 w-full min-w-0 max-w-full rounded-lg border border-line bg-surface-2 px-3"/></label><label className="block min-w-0 text-sm">{copy.end}<input type="time" value={end} onChange={e=>setEnd(e.target.value)} className="mt-1 box-border h-11 w-full min-w-0 max-w-full rounded-lg border border-line bg-surface-2 px-3"/></label></div>}<button disabled={pending} onClick={()=>run(async()=>{const r=await saveStaffDateSchedule(member,day,works,works?[{start,end}]:[]);r.ok?toast.success(copy.saved):toast.error(r.error)})} className="h-11 w-full rounded-lg bg-ivory font-semibold text-obsidian">{pending?copy.saving:copy.save}</button></div>}
 </div>
}
