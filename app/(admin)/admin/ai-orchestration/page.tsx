import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
  StatusPill,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminAIOrchestrationPage() {
  await requireStaff(['SUPER']);

  const providers = [
    {
      name: 'Google AI',
      configured: Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim()),
      usage: 'Semantic search / embedding',
    },
    {
      name: 'Groq',
      configured: Boolean(process.env.GROQ_API_KEY?.trim()),
      usage: 'Chat / AI Core çağrıları',
    },
    {
      name: 'OpenAI',
      configured: Boolean(process.env.OPENAI_API_KEY?.trim()),
      usage: 'Orkestrasyon katmanına bağlı değil',
    },
    {
      name: 'Anthropic',
      configured: Boolean(process.env.ANTHROPIC_API_KEY?.trim()),
      usage: 'Orkestrasyon katmanına bağlı değil',
    },
  ];

  const configuredCount = providers.filter((provider) => provider.configured).length;

  return (
    <>
      <AdminHeader
        kicker="AI sağlayıcıları"
        title="AI Orchestration"
        description="Bu ekran yalnızca gerçekten yapılandırılmış sağlayıcı kimlik bilgilerini gösterir. Gerçek routing, token maliyeti veya circuit-breaker telemetrisi bağlı değilse simüle edilmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Tanımlı sağlayıcı" value={`${configuredCount} / ${providers.length}`} />
        <MetricCard label="Smart routing" value="Bağlı değil" />
        <MetricCard label="Token telemetry" value="Bağlı değil" />
        <MetricCard label="Cost telemetry" value="Bağlı değil" />
      </div>

      <section className="apple-panel space-y-4 rounded-[24px] p-5">
        <div>
          <h2 className="text-[16px] font-semibold">Sağlayıcı yapılandırması</h2>
          <p className="text-[12px] text-[#86868b]">
            Anahtar değerleri gösterilmez; yalnızca ilgili environment değişkeninin mevcut olup olmadığı raporlanır.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {providers.map((provider) => (
            <div
              key={provider.name}
              className="rounded-2xl border border-black/8 bg-white p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[13px] font-semibold">{provider.name}</h3>
                <StatusPill status={provider.configured ? 'CONFIGURED' : 'MISSING'} />
              </div>
              <p className="mt-2 text-[12px] text-[#86868b]">{provider.usage}</p>
            </div>
          ))}
        </div>
      </section>

      <EmptyState text="Gerçek multi-provider router, maliyet ölçümü ve circuit-breaker persistence bağlandığında orkestrasyon metrikleri burada gösterilecek." />
    </>
  );
}
