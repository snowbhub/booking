"use client"
import { cn } from "@/lib/utils"
export function BookingMark({ size=32, className, title="Booking" }: { size?:number; detail?:boolean; animated?:boolean; className?:string; title?:string }) {
  return <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label={title} className={cn("shrink-0 text-ivory",className)} fill="none">
    <rect x="7" y="9" width="50" height="48" rx="13" stroke="currentColor" strokeWidth="3"/>
    <path d="M18 5v10M46 5v10M8.5 23h47" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="m22 39 7 7 14-17" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
}
