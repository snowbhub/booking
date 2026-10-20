import type { ZernioAccount } from "./types"

/** Upstream implementation note. */

/** Ids de las cuentas que pertenecen al profile de este panel. */
export function ownAccountIds(accounts: ZernioAccount[], profileId: string): Set<string> {
  return new Set(accounts.filter((a) => a.zernioProfileId === profileId).map((a) => a.zernioAccountId))
}
