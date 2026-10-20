"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

/** Upstream implementation note. */
const EVERY_MS: Record<string, number> = {
  "/bandeja": 6_000,
  "/": 20_000,
  "/agenda": 20_000,
  "/caja": 20_000,
}

export function AutoRefresh() {
  const router = useRouter()
  const pathname = usePathname()
  const everyMs = EVERY_MS[pathname]

  useEffect(() => {
    if (!everyMs) return
    const tick = () => {
      if (document.visibilityState === "visible" && navigator.onLine) router.refresh()
    }
    const id = setInterval(tick, everyMs)
    document.addEventListener("visibilitychange", tick)
    return () => {
      clearInterval(id)
      document.removeEventListener("visibilitychange", tick)
    }
  }, [router, everyMs])

  return null
}
