import { BookingMark } from "@/components/brand/booking-mark"
import { LoginForm } from "./login-form"

export const metadata = { title: "Sign in", robots: { index: false, follow: false } }

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams
  const next = typeof params.next === "string" ? params.next : "/"

  return (
    <main className="flex min-h-dvh flex-col bg-obsidian bg-slats px-4">
      <div className="m-auto w-full max-w-[360px] py-12">
        <div className="flex flex-col items-center text-center">
          <BookingMark size={56} />
          <h1 className="mt-4 font-display text-ivory text-[26px] tracking-[0.05em]">Booking</h1>
          <p className="eyebrow mt-1 text-[10px] tracking-[0.3em]">Appointments · Panel</p>
        </div>
        <LoginForm next={next} />
        <p className="mt-6 text-center text-[12px] text-ivory-3">
          Looking for an appointment?{" "}
          <a href="/reservar" className="text-ivory-2 underline underline-offset-2 hover:text-ivory">
            Book here
          </a>
        </p>
      </div>
    </main>
  )
}
