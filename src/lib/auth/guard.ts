import "server-only"
import { cookies } from "next/headers"
import { isValidSession, PANEL_COOKIE } from "./session"

/** Upstream implementation note. */
export async function assertPanelSession() {
  const store = await cookies()
  if (!isValidSession(store.get(PANEL_COOKIE)?.value)) throw new Error("No autorizado: iniciá sesión en el panel.")
}
