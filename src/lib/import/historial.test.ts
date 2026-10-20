import { describe, expect, it } from "vitest"
import { assignDays, categorizeExpense, excelDay, normalizePhone, parseGastos, parseTarjetas, parseVentas, titleCase } from "./historial"

const H = [null, "CANTIDAD ", "EFECTIVO ", "TRANSF.", "TOTAL"]

describe("fechas del Excel", () => {
  it("upstream behavior 1", () => {
    expect(excelDay(46217)).toBe("2026-07-14")
  })

  it("upstream behavior 2", () => {
    // Upstream implementation note.
    expect(assignDays(6, "2026-09-29")).toEqual(["2026-09-29", "2026-09-30", "2026-10-01", "2026-10-02", "2026-10-03", "2026-10-06"])
  })
})

describe("ventas per day", () => {
  const hoja = [
    ["MARTES 20/7", ...H.slice(1)], // error de tipeo: ese martes es 21/7
    ["BOOKING", 4, 20000, 50000, " "],
    ["SANTI", 5, 70000, 15000, " "],
    ["SEÑA", null, null, null, null],
    ["COLOR", " ", " ", null, " "],
    ["PRODUCTOS DE BARBERÍA", 1, 20000, null, null],
    ["PERFUMES", 10, 110000, 65000, 175000], // en realidad es el total del día
    [null, ...H.slice(1)], // bloque futuro sin fecha: no es un día
    ["BOOKING", 9, 999, 999, null],
    ["MIERCOLES 22/7", ...H.slice(1)],
    ["BOOKING", 3, null, 50000, null],
    ["NEMO", 2, 10000, null, null],
    ["SEÑA", null, 5000, 5000, null],
    ["TOTAL", 5, 10000, 60000, 70000],
  ]
  const { ventas, avisos, dias } = parseVentas(hoja, "2026-07-21")

  it("upstream behavior 3", () => {
    expect(dias).toBe(2)
    expect(ventas.filter((v) => v.day === "2026-07-21").length).toBeGreaterThan(0)
    expect(ventas.some((v) => v.day === "2026-07-20")).toBe(false)
    expect(avisos.some((a) => a.includes("2026-07-21") && a.includes("20/7"))).toBe(true)
  })

  it('la fila "PERFUMES" es el total: no se importa como venta', () => {
    const dia1 = ventas.filter((v) => v.day === "2026-07-21")
    expect(dia1.reduce((s, v) => s + v.amount, 0)).toBe(175000)
    expect(avisos.some((a) => a.includes("2026-07-21") && a.includes("total de la hoja"))).toBe(false)
    expect(dia1.some((v) => v.concept.toLowerCase().includes("perfume"))).toBe(false)
  })

  it("upstream behavior 4", () => {
    const santi = ventas.filter((v) => v.day === "2026-07-21" && v.barbero === "SANTI")
    expect(santi).toHaveLength(2)
    expect(santi.reduce((s, v) => s + v.units, 0)).toBe(5)
  })

  it("upstream behavior 5", () => {
    const v = ventas.find((x) => x.day === "2026-07-22" && x.barbero === "BOOKING")!
    expect(v.method).toBe("transferencia")
    expect(v.units).toBe(3)
  })

  it("upstream behavior 6", () => {
    const senas = ventas.filter((v) => v.kind === "sena")
    expect(senas).toHaveLength(2) // efectivo y transferencia del 22/7
    expect(senas.every((s) => s.barbero === null && s.units === 0)).toBe(true)
  })

  it("upstream behavior 7", () => {
    expect(ventas.some((v) => v.amount === 999)).toBe(false)
  })

  it("upstream behavior 8", () => {
    const r = parseVentas([["MARTES 21/7", ...H.slice(1)], ["BOOKING", 1, 10000, null, null], ["CBA", null, 5000, 2500, null], ["TOTAL", 1, 15000, 2500, 17500]], "2026-07-21")
    const cba = r.ventas.filter((v) => v.concept.includes("cba"))
    expect(cba.map((v) => v.amount).sort()).toEqual([2500, 5000])
    expect(cba.every((v) => v.barbero === null)).toBe(true)
    expect(r.avisos.some((a) => a.includes("cba"))).toBe(true)
    expect(r.avisos.some((a) => a.includes("total de la hoja"))).toBe(false) // con la fila incluida, cierra
  })

  it("avisa cuando las filas no suman el total de la hoja", () => {
    // 22/7: 50000 + 10000 + 10000 = 70000, el total de la hoja dice 70000 → cierra.
    expect(avisos.some((a) => a.includes("2026-07-22") && a.includes("total de la hoja"))).toBe(false)
    const roto = parseVentas([["MARTES 21/7", ...H.slice(1)], ["BOOKING", 1, 10000, null, null], ["TOTAL", 1, 99999, null, null]], "2026-07-21")
    expect(roto.avisos.some((a) => a.includes("total de la hoja"))).toBe(true)
  })
})

describe("upstream behavior 9", () => {
  const hoja = [
    ["CLIENTE", "CANT. DE CORTES", "FECHAS", null, "CLIENTE", "CANT. DE CORTES", "FECHAS"],
    ["DYLAN CABRERA", 1, 46093, null],
    [null, null, null, null],
    ["BRANDON SUAREZ", 3, 46094, 2],
    [1124943921, null, null, null],
    ["ARIEL BONANO", 1, 46094, null],
    [1564056665, null, null, null], // formato viejo con 15
    ["LEONARDO PEREZ", 2, "6/3, 13/3", null],
    [1132647319, null, null, null],
    ["DAMIAN FERNANDEZ", 2, 46094, 1], // sin teléfono
    [null, null, null, null],
    [1155555555, null, null, null], // un número suelto que no está pegado a ningún cliente
  ]
  const { tarjetas, avisos } = parseTarjetas(hoja)
  const by = (n: string) => tarjetas.find((t) => t.name === n)!

  it("upstream behavior 10", () => {
    expect(tarjetas).toHaveLength(5)
    expect(by("Dylan Cabrera")).toMatchObject({ cuts: 1, days: ["2026-03-12"] })
  })

  it("upstream behavior 11", () => {
    expect(by("Brandon Suarez").phone).toBe("1124943921")
    expect(by("Damian Fernandez").phone).toBeNull()
    expect(by("Dylan Cabrera").phone).toBeNull()
  })

  it("upstream behavior 12", () => {
    expect(tarjetas.filter((t) => t.phone === "1155555555")).toHaveLength(0)
  })

  it("upstream behavior 13", () => {
    expect(by("Ariel Bonano").phone).toBe("1164056665")
    expect(normalizePhone("11 2494-3921")).toBe("1124943921")
    expect(normalizePhone("+54 9 11 2494 3921")).toBe("1124943921")
    expect(normalizePhone("2494")).toBeNull()
  })

  it("upstream behavior 14", () => {
    expect(by("Leonardo Perez").days).toEqual(["2026-03-06", "2026-03-13"])
    expect(by("Brandon Suarez").days).toEqual(["2026-03-13", "2026-03-13", "2026-03-13"])
  })

  it("upstream behavior 15", () => {
    expect(titleCase("SANTIAGO CAÑETE")).toBe("Santiago Cañete")
    expect(titleCase("JUAN CRUZ ACUÑA")).toBe("Juan Cruz Acuña")
  })

  it("no avisa de nada raro en una hoja limpia", () => {
    expect(avisos).toEqual([])
  })
})

describe("gastos", () => {
  it("upstream behavior 16", () => {
    const rows = [
      ["FECHA", "MONTO ", "DETALLE", "SEMANAL", null, "FECHA", "MONTO ", "DETALLE"],
      [46217, 16000, "COMIDA SANTI SEBA", null, null, 46224, 6279, "VALE SANTY"],
      [46218, 6000, null, null, null, null, 22100, null], // sin detalle; y una suma sin fecha
      [null, null, null, 124475, null, null, null, null], // total semanal
    ]
    const g = parseGastos(rows)
    expect(g).toHaveLength(3)
    expect(g[0]).toMatchObject({ day: "2026-07-14", amount: 16000, description: "COMIDA SANTI SEBA" })
    expect(g[1]).toMatchObject({ day: "2026-07-21", amount: 6279, category: "sueldos" })
    expect(g[2]).toMatchObject({ day: "2026-07-15", description: "Sin detalle", category: "otros" })
  })

  it("upstream behavior 17", () => {
    expect(categorizeExpense("vale santi")).toBe("sueldos")
    expect(categorizeExpense("VALE SEBA Y NEMO")).toBe("sueldos")
    expect(categorizeExpense("pago nemo")).toBe("sueldos")
    expect(categorizeExpense("alquiler")).toBe("alquiler")
    expect(categorizeExpense("wifi america")).toBe("servicios")
    expect(categorizeExpense("mauro agua")).toBe("servicios")
    expect(categorizeExpense("tarjetas")).toBe("marketing")
    expect(categorizeExpense("filos y cera")).toBe("insumos")
    expect(categorizeExpense("Cafe capsula")).toBe("insumos")
    expect(categorizeExpense("COMIDA SANTI SEBA")).toBe("otros")
    expect(categorizeExpense("uber")).toBe("otros")
    expect(categorizeExpense(null)).toBe("otros")
  })
})
