import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
  StatusPill,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminMonitoringPage() {
  await requireStaff(['SUPER']);

  const dbStartedAt = Date.now();
  let databaseHealthy = true;

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    databaseHealthy = false;
  }

  const databaseLatencyMs = Date.now() - dbStartedAt;

  const metrics = await prisma.systemPerformanceMetric
    .findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    .catch(() => []);

  const requestCount = metrics.length;
  const errorCount = metrics.filter((row) => row.statusCode >= 500).length;
  const avgLatencyMs = requestCount
    ? Math.round(
        metrics.reduce((sum, row) => sum + row.executionMs, 0) / requestCount,
      )
    : 0;
  const maxLatencyMs = requestCount
    ? Math.max(...metrics.map((row) => row.executionMs))
    : 0;

  const endpointGroups = new Map<
    string,
    { count: number; errors: number; totalMs: number; latestStatus: number }
  >();

  for (const row of metrics) {
    const current = endpointGroups.get(row.endpointPath) || {
      count: 0,
      errors: 0,
      totalMs: 0,
      latestStatus: row.statusCode,
    };
    current.count += 1;
    current.errors += row.statusCode >= 500 ? 1 : 0;
    current.totalMs += row.executionMs;
    endpointGroups.set(row.endpointPath, current);
  }

  const endpoints = Array.from(endpointGroups.entries())
    .map(([path, data]) => ({
      path,
      count: data.count,
      errors: data.errors,
      avgMs: Math.round(data.totalMs / Math.max(1, data.count)),
      latestStatus: data.latestStatus,
    }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 12);

  return (
    <>
      <AdminHeader
        kicker="Canlı uygulama telemetrisi"
        title="Monitoring"
        description="Bu ekran yalnızca WedyPlan'ın gerçekten kaydettiği performans metriklerini ve veritabanı erişimini gösterir."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Veritabanı"
          value={databaseHealthy ? 'Bağlı' : 'Erişilemiyor'}
        />
        <MetricCard
          label="DB round-trip"
          value={`${databaseLatencyMs} ms`}
        />
        <MetricCard
          label="Son örnek ortalaması"
          value={requestCount ? `${avgLatencyMs} ms` : 'Veri yok'}
        />
        <MetricCard
          label="5xx hata"
          value={requestCount ? errorCount : 'Veri yok'}
        />
      </div>

      <section className="apple-panel space-y-4 rounded-[24px] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[16px] font-semibold">Endpoint telemetrisi</h2>
            <p className="text-[12px] text-[#86868b]">
              Son {requestCount} SystemPerformanceMetric kaydı. Ölçüm yoksa sistem sağlık iddiasında bulunmaz.
            </p>
          </div>
          <div className="text-[12px] text-[#86868b]">
            En yüksek süre: {requestCount ? `${maxLatencyMs} ms` : '—'}
          </div>
        </div>

        {endpoints.length === 0 ? (
          <EmptyState text="Henüz performans telemetrisi kaydedilmemiş." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-[12px]">
              <thead className="text-[#86868b]">
                <tr>
                  <th className="py-2">Endpoint</th>
                  <th className="py-2">Örnek</th>
                  <th className="py-2">Ort. süre</th>
                  <th className="py-2">5xx</th>
                  <th className="py-2">Son durum</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((endpoint) => (
                  <tr key={endpoint.path} className="border-t border-black/8">
                    <td className="py-3 font-mono">{endpoint.path}</td>
                    <td className="py-3">{endpoint.count}</td>
                    <td className="py-3">{endpoint.avgMs} ms</td>
                    <td className="py-3">{endpoint.errors}</td>
                    <td className="py-3">
                      <StatusPill
                        status={
                          endpoint.latestStatus >= 500
                            ? 'ERROR'
                            : endpoint.latestStatus >= 400
                              ? 'WARNING'
                              : 'HEALTHY'
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
