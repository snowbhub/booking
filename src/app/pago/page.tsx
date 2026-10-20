import { CircleCheck, CircleAlert, Clock3 } from "lucide-react"
import { BookingMark } from "@/components/brand/booking-mark"

export const metadata = { title: "Your deposit", robots: { index: false, follow: false } }

/** Upstream implementation note. */
export default async function PagoPage({ searchParams }: PageProps<"/pago">) {
  const params = await searchParams
  const status = typeof params.status === "string" ? params.status : typeof params.collection_status === "string" ? params.collection_status : null

  const content =
    status === "approved" ? (
      <>
        <CircleCheck className="mx-auto mt-8 size-9 text-ok" />
        <h1 className="mt-3 font-display text-[24px] text-ivory">Booking confirmed!</h1>
        <p className="mt-2 text-[14px] text-ivory-2">We received your deposit. You can close this window — your booking is confirmed.</p>
      </>
    ) : status === "pending" || status === "in_process" ? (
      <>
        <Clock3 className="mx-auto mt-8 size-9 text-ivory-2" />
        <h1 className="mt-3 font-display text-[24px] text-ivory">We are confirming your payment</h1>
        <p className="mt-2 text-[14px] text-ivory-2">It may take a few minutes. If confirmation does not arrive, contact us.</p>
      </>
    ) : (
      <>
        <CircleAlert className="mx-auto mt-8 size-9 text-danger" />
        <h1 className="mt-3 font-display text-[24px] text-ivory">Payment not received</h1>
        <p className="mt-2 text-[14px] text-ivory-2">The slot is released automatically if the deposit is not received in time. You can try again.</p>
      </>
    )

  return (
    <main className="flex min-h-dvh flex-col bg-obsidian bg-slats px-4">
      <div className="m-auto w-full max-w-[380px] py-12 text-center">
        <BookingMark size={52} className="mx-auto" />
        {content}
      </div>
    </main>
  )
}
