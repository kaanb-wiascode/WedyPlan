import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminMultiRegionPage() {
  await requireStaff(['SUPER']);

  return (
    <>
      <AdminHeader
        kicker="Dağıtım topolojisi"
        title="Multi-Region"
        description="Bu ekran yalnız gerçekten bağlı bölgesel deployment ve traffic-routing sağlayıcılarını raporlar."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Aktif region" value="Doğrulanmadı" />
        <MetricCard label="Global traffic router" value="Bağlı değil" />
        <MetricCard label="Regional DB telemetry" value="Bağlı değil" />
        <MetricCard label="Data residency telemetry" value="Bağlı değil" />
      </div>

      <EmptyState text="Repository içinde gerçek multi-region routing veya regional telemetry sağlayıcısı bağlı değil; simüle edilmiş kıta/nod bilgileri kaldırıldı." />
    </>
  );
}
