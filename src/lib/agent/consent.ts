import type { TurnInput } from "./providers/types"

/** Upstream implementation note. */
export function clientAgreedTo(hora: string, history: TurnInput[]): boolean {
  const hour = Number(hora.slice(0, 2))
  if (!Number.isInteger(hour)) return false

  let lastUser = -1
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].role === "user") {
      lastUser = i
      break
    }
  }
  if (lastUser === -1) return false

  if (hoursMentioned(history[lastUser].text).includes(hour)) return true
  return history.slice(0, lastUser).some((m) => m.role === "assistant" && offersTime(m.text, hora))
}

const WORDS: Record<string, number> = {
  una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11, doce: 12,
}

/** Upstream implementation note. */
export function hoursMentioned(text: string): number[] {
  const t = text.toLowerCase()
  const out = new Set<number>()
  for (const m of t.matchAll(/(?<![\d/])(\d{1,2})(?:[:.](\d{2}))?(?![\d/]|\s\d)/g)) out.add(toOpenHour(Number(m[1])))
  for (const m of t.matchAll(/\ba\s+las?\s+(una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce)\b/g)) out.add(toOpenHour(WORDS[m[1]]))
  if (/\bmediod[ií]a\b/.test(t)) out.add(12)
  return [...out].filter((h) => h >= 0 && h <= 23)
}

const toOpenHour = (h: number) => (h >= 1 && h <= 8 ? h + 12 : h)

function offersTime(text: string, hora: string) {
  const h = Number(hora.slice(0, 2))
  return text.includes(hora) || new RegExp(`(?<!\\d)${h}\\s?(hs|h)\\b`, "i").test(text)
}
