import { NextResponse, type NextRequest } from "next/server"
import { isValidSession, PANEL_COOKIE } from "@/lib/auth/session"
import { STAFF_COOKIE,staffIdFromCookie } from "@/lib/auth/staff-session"

/** Upstream implementation note. */
export function proxy(request: NextRequest) {
  const pathname=request.nextUrl.pathname
  if(pathname==="/staff-login")return NextResponse.next()
  if(pathname==="/staff"||pathname.startsWith("/staff/")){
    if(staffIdFromCookie(request.cookies.get(STAFF_COOKIE)?.value))return NextResponse.next()
    return NextResponse.redirect(new URL("/staff-login",request.url))
  }
  if (isValidSession(request.cookies.get(PANEL_COOKIE)?.value)) return NextResponse.next()

  // Upstream implementation note.
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new NextResponse("No autorizado", { status: 401 })
  }
  const login = new URL("/login", request.url)
  const next = request.nextUrl.pathname + request.nextUrl.search
  if (next !== "/") login.searchParams.set("next", next)
  return NextResponse.redirect(login)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|login|staff-login|reservar|conectado|pago|api/|icon.svg|favicon.ico|intro-boot.js).*)"],
}
