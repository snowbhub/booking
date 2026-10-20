import { describe, expect, it } from "vitest"
import { translateText } from "./messages"

describe("localized calendar dates", () => {
  it("renders English short date labels in Ukrainian", () => {
    expect(translateText("Sat, 17 Oct", "uk")).toBe("сб, 17 жовт.")
  })
  it("normalizes a leftover Spanish short date in Ukrainian", () => {
    expect(translateText("sáb, 17 oct", "uk")).toBe("сб, 17 жовт.")
  })
  it("renders a full English date in Ukrainian", () => {
    expect(translateText("Thursday, 15 October", "uk")).toBe("четвер, 15 жовтня")
  })
  it("normalizes a leftover Spanish full date in Ukrainian", () => {
    expect(translateText("JUEVES, 15 DE OCTUBRE", "uk")).toBe("четвер, 15 жовтня")
  })
  it("normalizes the mixed dashboard date in Ukrainian", () => {
    expect(translateText("ЧЕТВЕР,, 15 З OCTUBRE", "uk")).toBe("четвер, 15 жовтня")
  })
  it("normalizes the mixed dashboard date in English", () => {
    expect(translateText("Thursday,, 15 from octubre", "en")).toBe("Thursday, 15 October")
  })
  it("renders German date punctuation and month names", () => {
    expect(translateText("Thursday, 15 October", "de")).toBe("Donnerstag, 15. Oktober")
  })
  it("keeps English date formatting canonical", () => {
    expect(translateText("Thursday, 15 October", "en")).toBe("Thursday, 15 October")
  })
  it("localizes a month heading in Ukrainian", () => {
    expect(translateText("October 2026", "uk")).toBe("Жовтень 2026")
  })
})
