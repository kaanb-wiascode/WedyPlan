import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminChaosPage() {
  await requireStaff(['SUPER']);

  return (
    <>
      <AdminHeader
        kicker="Resilience validation"
        title="Chaos Engineering"
        description="Gerçek fault-injection runner veya experiment persistence bağlı değilken deney başlatılmış, MTTR ölçülmüş veya resilience skoru doğrulanmış gibi gösterilmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Chaos runner" value="Bağlı değil" />
        <MetricCard label="Aktif deney" value="Veri yok" />
        <MetricCard label="Doğrulanmış MTTR" value="Veri yok" />
        <MetricCard label="Resilience score" value="Veri yok" />
      </div>

      <EmptyState text="Gerçek chaos provider bağlandığında experiment ID, hedef servis, fault tipi, süre ve recovery telemetry burada gösterilecek." />
    </>
  );
}
