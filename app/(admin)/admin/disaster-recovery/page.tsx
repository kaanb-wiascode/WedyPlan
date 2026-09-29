import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminDRPage() {
  await requireStaff(['SUPER']);

  return (
    <>
      <AdminHeader
        kicker="Recovery readiness"
        title="Disaster Recovery"
        description="Gerçek backup, restore ve failover telemetry bulunmadan RPO/RTO veya multi-region readiness değeri gösterilmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Backup telemetry" value="Bağlı değil" />
        <MetricCard label="Restore test" value="Veri yok" />
        <MetricCard label="Doğrulanmış RPO" value="Veri yok" />
        <MetricCard label="Doğrulanmış RTO" value="Veri yok" />
      </div>

      <EmptyState text="Gerçek backup sağlayıcısı ve restore/failover test sonuçları eklendiğinde DR readiness burada hesaplanacak." />
    </>
  );
}
