import { requireStaff } from '@/lib/ops/staff';
import { prisma } from '@/lib/db';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminSREPage() {
  await requireStaff(['SUPER']);

  const recent = await prisma.systemPerformanceMetric
    .findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    .catch(() => []);

  const requests = recent.length;
  const errors = recent.filter((row) => row.statusCode >= 500).length;
  const errorRate = requests ? (errors / requests) * 100 : null;
  const p95 = requests
    ? [...recent]
        .map((row) => row.executionMs)
        .sort((a, b) => a - b)[Math.min(requests - 1, Math.floor(requests * 0.95))]
    : null;

  return (
    <>
      <AdminHeader
        kicker="Site reliability"
        title="SRE"
        description="SRE ekranı yalnızca uygulamanın gerçekten kaydettiği performans örneklerini gösterir; sentetik SLO veya incident üretmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Telemetri örneği" value={requests} />
        <MetricCard label="5xx hata" value={requests ? errors : 'Veri yok'} />
        <MetricCard
          label="Gözlenen hata oranı"
          value={errorRate === null ? 'Veri yok' : `%${errorRate.toFixed(2)}`}
        />
        <MetricCard
          label="Gözlenen P95"
          value={p95 === null ? 'Veri yok' : `${p95} ms`}
        />
      </div>

      <EmptyState text="Kalıcı incident management, SLO hedefleri ve error-budget persistence henüz bağlı değil. Bu nedenle sistem '99.96 reliability' veya 'incident açık' gibi doğrulanmamış değerler göstermez." />
    </>
  );
}
