import { Suspense } from "react"
import { cookies } from "next/headers"
import { normalizeLocale, translateText } from "@/i18n/messages"
import { PageBody, PageHeader } from "@/components/shell/page-header"
import { ClientDirectory } from "@/components/clients/client-directory"
import { NewAppointmentButton } from "@/components/agenda/new-appointment-button"
import { getClientes } from "@/lib/data/queries"

export const metadata = { title: "Clients" }

export default async function ClientesPage() {
  const d = await getClientes()
  const locale = normalizeLocale((await cookies()).get("booking_locale")?.value)
  const tr=(value:string)=>translateText(value,locale)
  const frequent = d.rows.filter((r) => r.segment === "frecuente").length
  const atRisk = d.rows.filter((r) => r.segment === "en_riesgo").length

  return (
    <PageBody>
      <PageHeader
        eyebrow={tr("Client portfolio")}
        title={tr("Clients")}
        description={locale==="uk"
          ? `${d.rows.length} клієнтів · ${frequent} постійних · ${atRisk} у зоні ризику. Тут зберігаються нотатки, історія візитів і лояльність.`
          : locale==="de"
            ? `${d.rows.length} Kunden · ${frequent} Stammkunden · ${atRisk} gefährdete Kontakte. Profile enthalten Notizen, Besuchsverlauf und Treuepunkte.`
            : `${d.rows.length} clients · ${frequent} regular · ${atRisk} at risk. Profiles include service notes, visit history and loyalty status.`}
        actions={<NewAppointmentButton variant="outline" label={tr("New booking")} />}
      />
      <Suspense>
        <ClientDirectory rows={d.rows} now={d.now} services={d.services} staff={d.staff} locale={locale} />
      </Suspense>
    </PageBody>
  )
}
