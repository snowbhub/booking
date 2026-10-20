import { createHmac, timingSafeEqual } from "node:crypto"

/** Upstream implementation note. */

/** Upstream implementation note. */
export const SIGNATURE_HEADER = "x-zernio-signature"
export const LEGACY_SIGNATURE_HEADER = "x-late-signature"

export function signPayload(rawBody: string, secret: string): string {
  return createHmac("sha256", secret).update(rawBody, "utf8").digest("hex")
}

/** Upstream implementation note. */
export function verifySignature(
  rawBody: string,
  receivedSignature: string | null | undefined,
  secret: string
): boolean {
  if (!receivedSignature) return false

  const received = receivedSignature.trim().toLowerCase()
  const expected = signPayload(rawBody, secret)

  // `timingSafeEqual` explota si los buffers miden distinto, y el largo de la
  // Upstream implementation note.
  if (received.length !== expected.length) return false

  return timingSafeEqual(Buffer.from(received, "utf8"), Buffer.from(expected, "utf8"))
}

/** Toma la firma de cualquiera de los dos headers que Zernio puede mandar. */
export function readSignatureHeader(headers: Headers): string | null {
  return headers.get(SIGNATURE_HEADER) ?? headers.get(LEGACY_SIGNATURE_HEADER)
}
