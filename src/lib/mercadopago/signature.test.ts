import { createHmac } from "node:crypto"
import { describe, expect, it } from "vitest"
import { parseXSignature, verifyMercadoPagoSignature } from "./signature"

const SECRET = "un-secreto-de-prueba-bien-largo"
const DATA_ID = "123456789"
const REQUEST_ID = "req-abc-123"
const TS = "1700000000000"

/** Upstream implementation note. */
function sign(dataId: string, requestId: string, ts: string, secret: string) {
  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`
  return createHmac("sha256", secret).update(manifest).digest("hex")
}

describe("parseXSignature", () => {
  it("separa ts y v1 del header", () => {
    expect(parseXSignature(`ts=${TS},v1=abc123`)).toEqual({ ts: TS, v1: "abc123" })
  })

  it("tolera espacios alrededor de las comas", () => {
    expect(parseXSignature(`ts=${TS}, v1=abc123`)).toEqual({ ts: TS, v1: "abc123" })
  })

  it("upstream behavior 1", () => {
    expect(parseXSignature(null)).toBeNull()
    expect(parseXSignature(`ts=${TS}`)).toBeNull()
    expect(parseXSignature("")).toBeNull()
  })
})

describe("verifyMercadoPagoSignature", () => {
  it("upstream behavior 2", () => {
    const v1 = sign(DATA_ID, REQUEST_ID, TS, SECRET)
    expect(
      verifyMercadoPagoSignature({ xSignature: `ts=${TS},v1=${v1}`, xRequestId: REQUEST_ID, dataId: DATA_ID, secret: SECRET })
    ).toBe(true)
  })

  it("upstream behavior 3", () => {
    const v1 = sign(DATA_ID, REQUEST_ID, TS, "otro-secreto")
    expect(
      verifyMercadoPagoSignature({ xSignature: `ts=${TS},v1=${v1}`, xRequestId: REQUEST_ID, dataId: DATA_ID, secret: SECRET })
    ).toBe(false)
  })

  it("upstream behavior 4", () => {
    const v1 = sign(DATA_ID, REQUEST_ID, TS, SECRET)
    expect(
      verifyMercadoPagoSignature({ xSignature: `ts=${TS},v1=${v1}`, xRequestId: REQUEST_ID, dataId: "999999999", secret: SECRET })
    ).toBe(false)
  })

  it("upstream behavior 5", () => {
    const v1 = sign(DATA_ID, REQUEST_ID, TS, SECRET)
    expect(verifyMercadoPagoSignature({ xSignature: `ts=${TS},v1=${v1}`, xRequestId: null, dataId: DATA_ID, secret: SECRET })).toBe(false)
    expect(verifyMercadoPagoSignature({ xSignature: null, xRequestId: REQUEST_ID, dataId: DATA_ID, secret: SECRET })).toBe(false)
  })

  it("upstream behavior 6", () => {
    expect(
      verifyMercadoPagoSignature({ xSignature: `ts=${TS},v1=no-es-hex-válido`, xRequestId: REQUEST_ID, dataId: DATA_ID, secret: SECRET })
    ).toBe(false)
  })
})
