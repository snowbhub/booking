import { sqlClient } from "@/lib/data/store/postgres"
import Link from "next/link"
import { Check, CircleDashed, ExternalLink } from "lucide-react"
import { PageBody, PageHeader, Panel } from "@/components/shell/page-header"
import { ChannelDot } from "@/components/brand/channel-icons"
import { BRAND } from "@/config/brand"
import { db, now, store } from "@/lib/data/repo"
import { ServicesEditor } from "@/components/settings/services-editor"
import { TeamEditor } from "@/components/settings/team-editor"
import { FixedSlotsEditor } from "@/components/settings/fixed-slots-editor"
import { SlotStepForm } from "@/components/settings/slot-step-form"
import { ShopSettingsForm } from "@/components/settings/shop-settings-form"
import { DepositSettingsForm } from "@/components/settings/deposit-settings-form"
import { dayKey, TZ } from "@/lib/time"
import { PROVIDER_LABEL, readAgentConfig } from "@/lib/agent/config"
import { readZernioConfig, readZernioWebhookConfig } from "@/lib/zernio/config"
import { listAccounts } from "@/lib/zernio/client"
import { ConnectLink } from "@/components/settings/connect-link"
import { cn } from "@/lib/utils"

export const metadata = { title: "Settings" }

const TABS = [
  { id: "servicios", label: "Services" },
  { id: "equipo", label: "Team" },
  { id: "fijos", label: "Fixed bookings" },
  { id: "local", label: "Business & loyalty" },
  { id: "conexiones", label: "Connections" },
] as const

export default async function AjustesPage({ searchParams }: PageProps<"/ajustes">) {
  const params = await searchParams
  const tab = TABS.find((t) => t.id === params.tab)?.id ?? "servicios"
  const s = await db()

  return (
    <PageBody>
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Changes here are used by the schedule, cash and AI Agent at the same time."
      />

      <nav className="booking-settings-tabs mt-6 flex gap-1 overflow-x-auto rounded-lg bg-surface-1 p-1 sm:w-fit" aria-label="Settings sections">
        {TABS.map((t) => (
          <Link
            key={t.id}
            href={`/ajustes?tab=${t.id}`}
            aria-current={tab === t.id ? "page" : undefined}
            className={cn(
              "h-9 shrink-0 rounded-md px-4 text-[13px] leading-9 font-medium transition-colors",
              tab === t.id ? "bg-surface-3 text-ivory" : "text-ivory-3 hover:text-ivory-2"
            )}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="mt-5 max-w-3xl">
        {tab === "local" && <section className="mb-5 rounded-xl border border-line bg-surface-1 p-3 sm:p-4">
          <h2 className="mb-3 text-sm font-semibold text-ivory">Management</h2>
          <nav aria-label="Management tools" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {([
              ["/staff-accounts","Staff access"],
              ["/ranks","Professional levels"],
              ["/payroll","Salaries"],
              ["/inventory","Products and stock"],
              ["/cash-management","Cash and expenses"],
              ["/analytics","Analytics"],
            ] as const).map(([href,label])=>
              <Link key={href} href={href} className="flex min-h-12 items-center justify-between gap-2 rounded-lg border border-line-strong bg-surface-2 px-3 py-2 text-xs font-medium text-ivory">
                <span>{label}</span><span aria-hidden>→</span>
              </Link>
            )}
          </nav>
        </section>}

        {tab === "servicios" && <ServicesEditor services={s.services} />}

        {tab === "equipo" && <TeamEditor staff={s.staff} timeOff={s.timeOff} today={dayKey(await now())}
          accounts={(await sqlClient()`select staff_id,username,active from booking_staff_accounts`).map(a=>({staffId:String(a.staff_id),username:String(a.username),active:Boolean(a.active)}))} photos={(await sqlClient()`select staff_id from booking_staff_avatars`).map(p=>String(p.staff_id))} />}

        {tab === "fijos" && <FixedSlotsEditor staff={s.staff} slots={s.fixedSlots} today={dayKey(await now())} />}

        {tab === "local" && (
          <div className="space-y-5">
            <Panel title="Business">
              <dl className="grid gap-4 text-[14px] sm:grid-cols-2">
                <Item label="Address" value={BRAND.address} />
                <Item label="Time" value={`Tuesday to Saturday, ${BRAND.openingHours.open} a ${BRAND.openingHours.close}`} />
                <Item label="Instagram" value={`@${BRAND.instagram}`} />
                <Item label="Time zone" value={TZ} />
              </dl>
            </Panel>
            <Panel title="Available appointment intervals">
              <SlotStepForm value={s.shopSettings.slotStepMin} />
            </Panel>
            <Panel title="Cash">
              <ShopSettingsForm settings={s.shopSettings} />
              <p className="mt-3 text-[12.5px] text-ivory-3">The cash register starts each day with this amount: expected cash = opening float + cash payments − cash expenses.</p>
            </Panel>
            <Panel title="Booking deposit">
              <DepositSettingsForm settings={s.shopSettings} />
            </Panel>
            <Panel title="Loyalty card">
              <p className="text-[14px] text-ivory-2">{`Each haircut earns one loyalty stamp. After ${BRAND.loyalty.stampsRequired} stamps, the next haircut is ${BRAND.loyalty.rewardDiscountPct}% off under the loyalty card rule. The discount is applied at checkout.`}</p>
            </Panel>
          </div>
        )}

        {tab === "conexiones" && <Connections />}
      </div>
    </PageBody>
  )
}

/** Upstream implementation note. */
async function Connections() {
  const zernio = readZernioConfig()
  const webhook = readZernioWebhookConfig()
  const agent = readAgentConfig()
  const accounts = zernio.configured ? await listAccounts({ config: zernio }) : null
  const connected = (platform: "whatsapp" | "instagram") =>
    accounts?.ok ? accounts.data.accounts.find((a) => a.platform === platform && a.isActive) : undefined
  const channel = (platform: "whatsapp" | "instagram", label: string) => {
    const account = connected(platform)
    return {
      name: label,
      icon: <ChannelDot channel={platform} />,
      ok: !!account,
      detail: !zernio.configured
        ? zernio.reason
        : accounts && !accounts.ok
          ? `No se pudo consultar Zernio: ${accounts.message}`
          : account
            ? `Conectado${account.username ? ` como ${platform === "instagram" ? "@" : ""}${account.username}` : account.displayName ? `: ${account.displayName}` : ""}.`
            : platform === "whatsapp"
              ? "Not connected. Generate the link and send it to the owner. Open it on a computer and scan the QR code with the business phone; WhatsApp Business can still be used normally."
              : "Not connected. It must be a professional account linked to a Facebook page.",
      action: zernio.configured && !account ? <ConnectLink platform={platform} label={label} /> : null,
    }
  }
  const rows = [
    channel("whatsapp", "WhatsApp"),
    channel("instagram", "Instagram"),
    {
      name: "Incoming message webhook",
      icon: null,
      ok: webhook.configured,
      detail: webhook.configured
        ? "Firma activa. En Zernio tiene que estar registrado apuntando a /api/zernio/webhook de este panel, con el mismo secreto."
        : webhook.reason,
      action: null,
    },
    {
      name: `AI Agent (${PROVIDER_LABEL[agent.provider]})`,
      icon: null,
      ok: agent.configured,
      detail: agent.configured ? `Modelo ${agent.model}. Se cambia con AGENT_PROVIDER y AGENT_MODEL.` : agent.reason,
      action: null,
    },
    {
      name: "Database (Supabase)",
      icon: null,
      ok: store().kind === "postgres",
      detail: store().kind === "postgres" ? "Connected: all data is saved permanently." : "Modo demo: los datos viven en memoria y se pierden al reiniciar.",
      action: null,
    },
    {
      name: "Mercado Pago",
      icon: null,
      ok: false,
      detail: "Pending: configure whether a deposit is required for booking.",
      action: null,
    },
  ]
  return (
    <Panel title="Connections" bodyClassName="px-0 pb-1">
      <ul>
        {rows.map((r) => (
          <li key={r.name} className="flex items-start gap-3 border-t border-line px-5 py-3.5">
            {r.ok ? <Check className="mt-0.5 size-4 shrink-0 text-ok" /> : <CircleDashed className="mt-0.5 size-4 shrink-0 text-ivory-3" />}
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-[14px] font-medium text-ivory">
                {r.name} {r.icon}
              </span>
              <span className="block text-[12.5px] text-ivory-3">{r.detail}</span>
              {r.action}
            </span>
          </li>
        ))}
      </ul>
      <a
        href="https://zernio.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-5 mt-2 mb-3 inline-flex items-center gap-1.5 text-[12.5px] text-ivory-3 hover:text-ivory"
      >
        Panel de Zernio <ExternalLink className="size-3" />
      </a>
    </Panel>
  )
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow mb-1 text-[10px]">{label}</dt>
      <dd className="text-ivory">{value}</dd>
    </div>
  )
}
