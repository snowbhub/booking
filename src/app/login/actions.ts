"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PANEL_COOKIE, SESSION_DAYS, panelPassword, passwordMatches, sessionToken } from "@/lib/auth/session"

export type LoginState = { error: string | null }

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = panelPassword()
  if (!password) return { error: "The panel has no password yet: configure PANEL_PASSWORD on the server." }

  if (!passwordMatches(String(formData.get("password") ?? ""))) {
    // Upstream implementation note.
    await new Promise((r) => setTimeout(r, 700))
    return { error: "Incorrect password." }
  }

  const store = await cookies()
  store.set(PANEL_COOKIE, sessionToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * SESSION_DAYS,
  })
  const next = String(formData.get("next") ?? "/")
  // Upstream implementation note.
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/")
}

export async function logout() {
  const store = await cookies()
  store.delete(PANEL_COOKIE)
  redirect("/login")
}
