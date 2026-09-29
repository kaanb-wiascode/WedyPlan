import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminCiCdPage() {
  await requireStaff(['SUPER']);

  const githubConfigured = Boolean(
    process.env.GITHUB_TOKEN?.trim() &&
      process.env.GITHUB_REPOSITORY?.trim(),
  );

  return (
    <>
      <AdminHeader
        kicker="Delivery pipeline"
        title="CI/CD"
        description="Gerçek pipeline provider bağlı değilken pipeline başlatıldı, deploy tamamlandı veya başarı oranı hesaplandı gibi sonuçlar gösterilmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="GitHub pipeline telemetry"
          value={githubConfigured ? 'Kimlik bilgisi var' : 'Bağlı değil'}
        />
        <MetricCard label="Pipeline runner" value="Bağlı değil" />
        <MetricCard label="Deploy telemetry" value="Veri yok" />
        <MetricCard label="Rollback telemetry" value="Veri yok" />
      </div>

      <EmptyState text="Gerçek GitHub Actions, Render veya başka bir deployment provider entegrasyonu bağlandığında pipeline run, environment, deploy ve rollback verileri burada gösterilecek." />
    </>
  );
}
