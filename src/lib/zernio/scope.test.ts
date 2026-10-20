import { describe, expect, it } from "vitest"
import { ownAccountIds } from "./scope"
import type { ZernioAccount } from "./types"

const account = (id: string, profile: string | null): ZernioAccount => ({
  zernioAccountId: id,
  zernioProfileId: profile,
  platform: "whatsapp",
  username: null,
  displayName: null,
  profileUrl: null,
  avatarUrl: null,
  isActive: true,
  followerCount: null,
})

describe("cuentas de Zernio que son de este panel", () => {
  const accounts = [account("wa-booking", "profile-booking"), account("wa-operon", "perfil-operon"), account("ig-operon", "perfil-operon"), account("sin-perfil", null)]

  it("upstream behavior 1", () => {
    const own = ownAccountIds(accounts, "profile-booking")
    expect(own.has("wa-booking")).toBe(true)
    expect(own.has("wa-operon")).toBe(false)
    expect(own.has("ig-operon")).toBe(false)
  })

  it("upstream behavior 2", () => {
    expect(ownAccountIds(accounts, "profile-booking").has("sin-perfil")).toBe(false)
  })

  it("un profile que no existe no deja pasar nada", () => {
    expect(ownAccountIds(accounts, "otro").size).toBe(0)
  })
})
