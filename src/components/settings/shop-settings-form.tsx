"use client"

import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { saveShopSettings, saveShopTimezone } from "@/lib/data/settings-actions"
import type { ShopSettings } from "@/lib/domain/types"

/** Upstream implementation note. */
export function ShopSettingsForm({ settings }: { settings: ShopSettings }) {
  const [cash, setCash] = useState(String(settings.openingCash))
  const [pending, startTransition] = useTransition()
  const dirty = Number(cash || 0) !== settings.openingCash

  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="min-w-0 flex-1">
        <span className="mb-1.5 block text-[12.5px] text-ivory-2">Opening cash float</span>
        <span className="relative block max-w-[220px]">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[14px] text-ivory-3">$</span>
          <input
            value={cash}
            onChange={(e) => setCash(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            className="num h-10 w-full rounded-lg border border-line-strong bg-surface-2 pr-3 pl-7 text-[14px] text-ivory focus:border-gold/50 focus:outline-none"
          />
        </span>
      </label>
      {dirty && (
        <Button
          disabled={pending}
          className="h-10"
          onClick={() =>
            startTransition(async () => {
              const res = await saveShopSettings({ openingCash: Number(cash || 0) })
              if (res.ok) toast.success("Opening cash saved")
              else toast.error(res.error)
            })
          }
        >
          {pending ? "Saving…" : "Save"}
        </Button>
      )}
    </div>
  )
}

const TIMEZONE_OPTIONS = [
  "Europe/Kyiv",
  "Europe/Berlin",
  "Europe/Warsaw",
  "Europe/Paris",
  "Europe/London",
  "America/Argentina/Buenos_Aires",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Dubai",
  "Asia/Tokyo",
  "UTC",
] as const

const TIMEZONE_COPY = {
  uk: { label: "Часовий пояс закладу", help: "Час у календарі та доступні слоти бронювання використовують цей часовий пояс.", save: "Зберегти", saving: "Збереження…", saved: "Часовий пояс збережено", error: "Не вдалося зберегти часовий пояс" },
  de: { label: "Zeitzone des Betriebs", help: "Kalenderzeiten und verfügbare Buchungstermine richten sich nach dieser Zeitzone.", save: "Speichern", saving: "Wird gespeichert…", saved: "Zeitzone gespeichert", error: "Zeitzone konnte nicht gespeichert werden" },
  en: { label: "Business time zone", help: "Calendar times and available booking slots use this time zone.", save: "Save", saving: "Saving…", saved: "Time zone saved", error: "Could not save time zone" },
  es: { label: "Zona horaria del local", help: "El calendario y los horarios disponibles para reservar usan esta zona horaria.", save: "Guardar", saving: "Guardando…", saved: "Zona horaria guardada", error: "No se pudo guardar la zona horaria" },
} as const

const ZONE_NAMES = {
  uk: { "Europe/Kyiv": "Київ", "Europe/Berlin": "Берлін", "Europe/Warsaw": "Варшава", "Europe/Paris": "Париж", "Europe/London": "Лондон", "America/Argentina/Buenos_Aires": "Буенос-Айрес", "America/New_York": "Нью-Йорк", "America/Los_Angeles": "Лос-Анджелес", "Asia/Dubai": "Дубай", "Asia/Tokyo": "Токіо", UTC: "UTC" },
  de: { "Europe/Kyiv": "Kyjiw", "Europe/Berlin": "Berlin", "Europe/Warsaw": "Warschau", "Europe/Paris": "Paris", "Europe/London": "London", "America/Argentina/Buenos_Aires": "Buenos Aires", "America/New_York": "New York", "America/Los_Angeles": "Los Angeles", "Asia/Dubai": "Dubai", "Asia/Tokyo": "Tokio", UTC: "UTC" },
  en: { "Europe/Kyiv": "Kyiv", "Europe/Berlin": "Berlin", "Europe/Warsaw": "Warsaw", "Europe/Paris": "Paris", "Europe/London": "London", "America/Argentina/Buenos_Aires": "Buenos Aires", "America/New_York": "New York", "America/Los_Angeles": "Los Angeles", "Asia/Dubai": "Dubai", "Asia/Tokyo": "Tokyo", UTC: "UTC" },
  es: { "Europe/Kyiv": "Kiev", "Europe/Berlin": "Berlín", "Europe/Warsaw": "Varsovia", "Europe/Paris": "París", "Europe/London": "Londres", "America/Argentina/Buenos_Aires": "Buenos Aires", "America/New_York": "Nueva York", "America/Los_Angeles": "Los Ángeles", "Asia/Dubai": "Dubái", "Asia/Tokyo": "Tokio", UTC: "UTC" },
} as const

export function TimeZoneSettingsForm({ value }: { value: string }) {
  type Locale = keyof typeof TIMEZONE_COPY
  const [locale, setLocale] = useState<Locale>("es")
  const [timezone, setTimezone] = useState(value)
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    const syncLocale = () => {
      const language = (localStorage.getItem("booking_locale") || document.documentElement.dataset.locale || document.documentElement.lang).slice(0, 2) as Locale
      if (language in TIMEZONE_COPY) setLocale(language)
    }
    syncLocale()
    window.addEventListener("booking:locale", syncLocale)
    return () => window.removeEventListener("booking:locale", syncLocale)
  }, [])

  const copy = TIMEZONE_COPY[locale]
  const names = ZONE_NAMES[locale]
  const dirty = timezone !== value
  return (
    <div className="mt-4 flex flex-wrap items-end gap-3">
      <label className="min-w-0 flex-1">
        <span className="mb-1.5 block text-[12.5px] text-ivory-2">{copy.label}</span>
        <select
          value={timezone}
          onChange={(event) => setTimezone(event.target.value)}
          className="h-10 w-full max-w-md rounded-lg border border-line-strong bg-surface-2 px-3 text-[14px] text-ivory focus:border-gold/50 focus:outline-none"
        >
          {!TIMEZONE_OPTIONS.includes(timezone as typeof TIMEZONE_OPTIONS[number]) && <option value={timezone}>{timezone}</option>}
          {TIMEZONE_OPTIONS.map((zone) => (
            <option key={zone} value={zone} data-i18n-skip="true">{names[zone]} · {zone}</option>
          ))}
        </select>
        <span className="mt-1.5 block text-[12px] text-ivory-3">{copy.help}</span>
      </label>
      {dirty && (
        <Button
          disabled={pending}
          className="h-10"
          onClick={() => startTransition(async () => {
            const result = await saveShopTimezone(timezone)
            if (!result.ok) {
              toast.error(result.error || copy.error)
              return
            }
            toast.success(copy.saved)
            window.location.reload()
          })}
        >
          {pending ? copy.saving : copy.save}
        </Button>
      )}
    </div>
  )
}
