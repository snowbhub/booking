import "server-only"
import { listAccounts } from "./client"
import { readZernioConfig } from "./config"
import { ownAccountIds } from "./scope"

/** Upstream implementation note. */

const TTL_MS = 5 * 60_000
/** Upstream implementation note. */
const MIN_REFRESH_MS = 30_000

let cache: { ids: Set<string>; at: number } | null = null

async function refresh(profileId: string): Promise<Set<string> | null> {
  const config = readZernioConfig()
  if (!config.configured) return null
  const res = await listAccounts({ config })
  if (!res.ok) return null
  cache = { ids: ownAccountIds(res.data.accounts, profileId), at: Date.now() }
  return cache.ids
}

export async function isOwnAccount(accountId: string): Promise<boolean> {
  const config = readZernioConfig()
  if (!config.configured) return process.env.NODE_ENV !== "production"
  if (!config.profileId) return process.env.NODE_ENV !== "production"
  if (!accountId) return false

  const fresh = cache && Date.now() - cache.at < TTL_MS
  if (fresh && cache!.ids.has(accountId)) return true
  // Upstream implementation note.
  if (cache && Date.now() - cache.at < MIN_REFRESH_MS) return false
  const ids = await refresh(config.profileId)
  return !!ids?.has(accountId)
}
