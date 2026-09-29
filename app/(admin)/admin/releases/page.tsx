import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminReleasesPage() {
  await requireStaff(['SUPER']);

  return (
    <>
      <AdminHeader
        kicker="Release management"
        title="Releases"
        description="Kalıcı release registry veya gerçek deployment sağlayıcısı bağlı değilken sürüm onayı, canary oranı veya production readiness skoru simüle edilmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Release registry" value="Bağlı değil" />
        <MetricCard label="Approval gates" value="Bağlı değil" />
        <MetricCard label="Canary telemetry" value="Veri yok" />
        <MetricCard label="Rollback provider" value="Bağlı değil" />
      </div>

      <EmptyState text="Gerçek release registry, CI/CD provider ve deployment telemetry bağlandığında sürüm geçmişi, onay kapıları ve rollout durumu burada gösterilecek." />
    </>
  );
}
