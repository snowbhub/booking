"use client"

import { timeOptions } from "@/lib/domain/schedule"
import { cn } from "@/lib/utils"

/** Upstream implementation note. */
export function TimeSelect({
  value,
  onChange,
  label,
  from,
  to,
  stepMin = 5,
  className,
}: {
  value: string
  onChange: (value: string) => void
  /** Upstream implementation note. */
  label: string
  from?: string
  to?: string
  stepMin?: number
  className?: string
}) {
  const options = timeOptions(stepMin, from, to)
  // Upstream implementation note.
  if (value && !options.includes(value)) options.push(value)
  options.sort()
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className={cn("num h-9 rounded-md border border-line-strong bg-surface-2 px-1.5 text-[13px] text-ivory focus:border-gold/50 focus:outline-none", className)}
    >
      {options.map((t) => (
        <option key={t} value={t}>
          {t || "—"}
        </option>
      ))}
    </select>
  )
}
