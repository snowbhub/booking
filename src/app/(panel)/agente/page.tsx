import Link from "next/link"
import { PageBody, PageHeader, Panel } from "@/components/shell/page-header"
import { AgentToggle } from "@/components/agent/agent-toggle"
import { AgentSettingsForm } from "@/components/agent/agent-settings"
import { AgentPlayground } from "@/components/agent/playground"
import { ChannelDot } from "@/components/brand/channel-icons"
import { getAgente } from "@/lib/data/queries"
import { readAgentConfig } from "@/lib/agent/config"
import { store } from "@/lib/data/repo"
import { readZernioConfig,readZernioWebhookConfig } from "@/lib/zernio/config"
import { formatARS, formatNumber } from "@/lib/money"
import { timeAgo } from "@/lib/time"

export const metadata = { title: "AI Agent" }

export default async function AgentePage() {
  const d = await getAgente()
  const config = readAgentConfig()
  const zernio = readZernioConfig()
  const webhook = readZernioWebhookConfig()
  const n = new Date(d.now)

  return (
    <PageBody>
      <PageHeader
        eyebrow="Automation"
        title="AI Agent"
        description="Handles WhatsApp and Instagram, creates, reschedules and cancels bookings, and hands off anything that needs a person."
        actions={<AgentToggle enabled={d.settings.enabled} />}
      />

      <section className="panel mt-5 space-y-3 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold">AI integration status</h2>
          <span className="rounded-full bg-surface-3 px-3 py-1 text-xs">{config.configured && zernio.configured && webhook.configured && d.settings.enabled ? "Ready" : "Setup required"}</span>
        </div>
        <ul className="space-y-2 text-sm text-ivory-2">
          <li>{config.configured ? "✓" : "○"} AI model: {config.configured ? config.model : config.reason}</li>
          <li>{zernio.configured ? "✓" : "○"} WhatsApp / Instagram provider: {zernio.configured ? "API key configured" : "ZERNIO_API_KEY required"}</li>
          <li>{webhook.configured ? "✓" : "○"} Incoming messages: {webhook.configured ? "Webhook secret configured" : "ZERNIO_WEBHOOK_SECRET required"}</li>
        </ul>
        <p className="text-sm text-ivory-3">Configure GEMINI_API_KEY (or ANTHROPIC_API_KEY), ZERNIO_API_KEY and ZERNIO_WEBHOOK_SECRET in your Railway service variables. Then connect messaging accounts under Settings → Connections. No AI can respond without these credentials.</p>
        <div className="flex flex-wrap gap-3"><Link href="/ajustes?tab=conexiones" className="rounded-xl border border-line-strong px-4 py-3 text-sm font-semibold">Messaging connections</Link><a href="https://railway.com/project/eb72c125-99bb-4b61-b445-b63ddba8776a" target="_blank" rel="noreferrer" className="rounded-xl bg-ivory px-4 py-3 text-sm font-semibold text-obsidian">Open Railway settings</a></div>
      </section>
      <section className="panel mt-8 grid grid-cols-2 sm:grid-cols-4">
        <Stat label="Bookings created" value={formatNumber(d.stats.bookedMonth)} sub="this month" />
        <Stat label="Revenue generated" value={formatARS(d.stats.revenueMonth)} sub="for completed visits" />
        <Stat label="Conversations" value={formatNumber(d.stats.conversations)} sub="in the inbox" />
        <Stat label="Handed off to a person" value={formatNumber(d.stats.handoffs)} sub="complaints, special requests, questions" />
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_440px]">
        <AgentSettingsForm settings={d.settings} />
        <div className="space-y-5">
          <AgentPlayground
            agentName={d.settings.name}
            configured={config.configured}
            reason={config.configured ? null : config.reason}
            rehearsal={store().kind === "postgres"}
          />
          <Panel title="Latest activity" bodyClassName="px-0 pb-1">
            <ul>
              {d.events.map((e) => (
                <li key={e.id} className="flex items-start gap-3 border-t border-line px-5 py-2.5 first:border-0">
                  <ChannelDot channel={e.channel} className="mt-0.5" />
                  <span className="min-w-0 flex-1 text-[13px] text-ivory-2">{e.summary}</span>
                  <span className="num shrink-0 text-[11px] text-ivory-3">{timeAgo(e.at, n)}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <p className="px-1 text-[12px] leading-relaxed text-ivory-3">
            Modelo: {config.configured ? config.model : "sin configurar"}. Cada respuesta se arma con los precios, horarios y
            reglas de esta pantalla; la agenda la consulta en vivo, nunca de memoria.
          </p>
        </div>
      </div>
    </PageBody>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="border-line px-5 py-4 not-first:border-l max-sm:nth-[3]:border-l-0 max-sm:nth-[n+3]:border-t sm:py-5">
      <p className="eyebrow truncate">{label}</p>
      <p className="num mt-2 font-wide text-[22px] leading-none font-semibold text-ivory">{value}</p>
      <p className="mt-1.5 text-[12px] text-ivory-3">{sub}</p>
    </div>
  )
}
