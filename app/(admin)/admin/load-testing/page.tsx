import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminLoadTestingPage() {
  await requireStaff(['SUPER']);

  return (
    <>
      <AdminHeader
        kicker="Performans doğrulaması"
        title="Load Testing"
        description="Gerçek bir k6, Artillery, JMeter veya benzeri load-test runner sonucu olmadan kapasite ya da RPS değeri gösterilmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Load-test runner" value="Bağlı değil" />
        <MetricCard label="Doğrulanmış max VU" value="Veri yok" />
        <MetricCard label="Doğrulanmış max RPS" value="Veri yok" />
        <MetricCard label="P95 latency" value="Veri yok" />
      </div>

      <EmptyState text="Gerçek test runner bağlandığında test run ID, VU, RPS, P95/P99 ve hata oranları kalıcı sonuçlardan burada gösterilecek." />
    </>
  );
}
