"use server"

import { headers } from "next/headers"
import { assertPanelSession } from "@/lib/auth/guard"
import { readZernioConfig } from "./config"
import { getConnectUrl } from "./client"

/** Upstream implementation note. */
export async function createConnectLink(platform: "whatsapp" | "instagram"): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await assertPanelSession()
  if (platform !== "whatsapp" && platform !== "instagram") return { ok: false, error: "Invalid channel." }
  const config = readZernioConfig()
  if (!config.configured) return { ok: false, error: config.reason }
  if (!config.profileId) {
    return { ok: false, error: "ZERNIO_PROFILE_ID is missing: create a Zernio profile for Booking (each profile supports one WhatsApp account)." }
  }

  // Upstream implementation note.
  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host")
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https")
  if (!host) return { ok: false, error: "Could not determine the panel address." }
  const redirectUrl = `${proto}://${host}/conectado?canal=${platform}`

  const res = await getConnectUrl({ config }, platform, redirectUrl)
  return res.ok ? { ok: true, url: res.data.authUrl } : { ok: false, error: res.message }
}
