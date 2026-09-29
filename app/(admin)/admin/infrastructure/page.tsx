import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
  StatusPill,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

type IntegrationState = {
  name: string;
  configured: boolean;
  detail: string;
};

export default async function AdminInfrastructurePage() {
  await requireStaff(['SUPER']);

  const startedAt = Date.now();
  let databaseConnected = true;

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    databaseConnected = false;
  }

  const databaseLatencyMs = Date.now() - startedAt;

  const integrations: IntegrationState[] = [
    {
      name: 'PostgreSQL',
      configured: Boolean(
        process.env.DATABASE_URL?.trim() || process.env.DIRECT_URL?.trim(),
      ),
      detail: databaseConnected
        ? `Bağlantı doğrulandı · ${databaseLatencyMs} ms`
        : 'Bağlantı kurulamadı',
    },
    {
      name: 'Redis',
      configured: Boolean(
        process.env.REDIS_URL?.trim() ||
          process.env.UPSTASH_REDIS_REST_URL?.trim(),
      ),
      detail: 'Bu ekran Redis bağlantı bilgisinin yapılandırılmış olup olmadığını gösterir.',
    },
    {
      name: 'S3 / R2 medya',
      configured: Boolean(
        process.env.S3_BUCKET?.trim() &&
          process.env.AWS_ACCESS_KEY_ID?.trim() &&
          process.env.AWS_SECRET_ACCESS_KEY?.trim(),
      ),
      detail: process.env.MEDIA_CDN_URL?.trim()
        ? 'Bucket kimlik bilgileri ve medya CDN adresi yapılandırıldı.'
        : 'Bucket veya MEDIA_CDN_URL yapılandırmasını kontrol edin.',
    },
    {
      name: 'Google AI',
      configured: Boolean(
        process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim(),
      ),
      detail: 'Semantic search ve Google AI özellikleri için kullanılır.',
    },
    {
      name: 'Iyzico',
      configured: Boolean(
        process.env.IYZICO_API_KEY?.trim() &&
          process.env.IYZICO_SECRET_KEY?.trim(),
      ),
      detail: 'Checkout ve ödeme sağlayıcı bağlantısı.',
    },
  ];

  const configuredCount = integrations.filter(
    (item) => item.configured,
  ).length;

  return (
    <>
      <AdminHeader
        kicker="Gerçek çalışma ortamı"
        title="Altyapı"
        description="Bu ekran sanal Kubernetes düğümleri veya sahte uptime değerleri göstermez; uygulamanın gerçekten yapılandırdığı servisleri raporlar."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Yapılandırılmış entegrasyon"
          value={`${configuredCount} / ${integrations.length}`}
        />
        <MetricCard
          label="Veritabanı bağlantısı"
          value={databaseConnected ? 'Bağlı' : 'Hata'}
        />
        <MetricCard
          label="DB round-trip"
          value={`${databaseLatencyMs} ms`}
        />
        <MetricCard
          label="Backup sağlayıcısı"
          value="Bağlı değil"
        />
      </div>

      <section className="apple-panel space-y-4 rounded-[24px] p-5">
        <div>
          <h2 className="text-[16px] font-semibold">Servis yapılandırması</h2>
          <p className="text-[12px] text-[#86868b]">
            Hassas değerler gösterilmez; yalnızca gerekli environment değişkenlerinin mevcut olup olmadığı raporlanır.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-black/8 bg-white p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[13px] font-semibold">{item.name}</h3>
                <StatusPill
                  status={item.configured ? 'CONFIGURED' : 'MISSING'}
                />
              </div>
              <p className="mt-2 text-[12px] text-[#86868b]">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="apple-panel space-y-3 rounded-[24px] p-5">
        <h2 className="text-[16px] font-semibold">Backup ve node yönetimi</h2>
        <EmptyState text="Repository içinde gerçek bir backup/node yönetim sağlayıcısı bağlı değil. Bu nedenle uygulama yedekleme tamamlandı, node yeniden başlatıldı veya kapasite artırıldı gibi doğrulanmamış başarı mesajları üretmez." />
      </section>
    </>
  );
}
