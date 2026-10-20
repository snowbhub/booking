"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { setTimeZone, TZ } from "@/lib/time"

export function TimeZoneRuntime({ timezone }: { timezone: string }) {
  const router = useRouter()
  useEffect(() => {
    if (TZ === timezone) return
    setTimeZone(timezone)
    router.refresh()
  }, [timezone, router])
  return null
}
