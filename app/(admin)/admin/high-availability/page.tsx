import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminHAPage() {
  await requireStaff(['SUPER']);

  return (
    <>
      <AdminHeader
        kicker="Altyapı güvenilirliği"
        title="High Availability"
        description="Gerçek cluster/failover sağlayıcısı bağlanmadan WedyPlan uptime, replication lag veya failover başarısı iddia etmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="HA sağlayıcısı" value="Bağlı değil" />
        <MetricCard label="Failover otomasyonu" value="Bağlı değil" />
        <MetricCard label="Replication telemetry" value="Veri yok" />
        <MetricCard label="Doğrulanmış uptime" value="Veri yok" />
      </div>

      <EmptyState text="Gerçek HA sağlayıcısı veya cluster telemetry entegrasyonu eklendiğinde failover, replica ve uptime verileri burada gösterilecek." />
    </>
  );
}
