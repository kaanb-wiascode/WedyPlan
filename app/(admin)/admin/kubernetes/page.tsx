import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminK8sPage() {
  await requireStaff(['SUPER']);

  return (
    <>
      <AdminHeader
        kicker="Container orchestration"
        title="Kubernetes"
        description="Gerçek Kubernetes API/cluster connector bağlanmadan deployment, rollback, pod veya node durumu raporlanmaz."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Cluster connector" value="Bağlı değil" />
        <MetricCard label="Doğrulanmış node" value="Veri yok" />
        <MetricCard label="Doğrulanmış pod" value="Veri yok" />
        <MetricCard label="Deployment telemetry" value="Veri yok" />
      </div>

      <EmptyState text="Kubernetes provider bağlandığında node, pod, deployment, rollout ve rollback durumu gerçek cluster API'sinden burada gösterilecek." />
    </>
  );
}
