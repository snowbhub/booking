import { CircleCheck, CircleAlert } from "lucide-react"
import { BookingMark } from "@/components/brand/booking-mark"

export const metadata = { title: "Connection", robots: { index: false, follow: false } }

/** Upstream implementation note. */
export default async function ConectadoPage({ searchParams }: PageProps<"/conectado">) {
  const params = await searchParams
  const canal = params.canal === "instagram" ? "Instagram" : "WhatsApp"
  const error = typeof params.error === "string" ? params.error : null
  const detail = typeof params.error_message === "string" ? params.error_message.slice(0, 200) : null

  return (
    <main className="flex min-h-dvh flex-col bg-obsidian bg-slats px-4">
      <div className="m-auto w-full max-w-[380px] py-12 text-center">
        <BookingMark size={52} className="mx-auto" />
        {error ? (
          <>
            <CircleAlert className="mx-auto mt-8 size-9 text-danger" />
            <h1 className="mt-3 font-display text-[24px] text-ivory">Could not connect</h1>
            <p className="mt-2 text-[14px] text-ivory-2">
              El {canal} was not connected{detail ? `: ${detail}` : "."} Tell the person who sent you the link and try again.
            </p>
          </>
        ) : (
          <>
            <CircleCheck className="mx-auto mt-8 size-9 text-ok" />
            <h1 className="mt-3 font-display text-[24px] text-ivory">Done!</h1>
            <p className="mt-2 text-[14px] text-ivory-2">
              The {canal} connection is complete. You can close this window and continue using the app.
            </p>
          </>
        )}
      </div>
    </main>
  )
}
