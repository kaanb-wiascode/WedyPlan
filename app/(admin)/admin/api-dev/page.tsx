import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminAPIDevPage() {
  await requireStaff(['SUPER']);

  return (
    <>
      <AdminHeader
        kicker="Developer platform"
        title="API Dev Portal"
        description="Kalıcı API key registry ve developer application modeli bağlı değilken sahte anahtar üretilmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="API key registry" value="Bağlı değil" />
        <MetricCard label="Developer apps" value="Bağlı değil" />
        <MetricCard label="Key rotation" value="Bağlı değil" />
        <MetricCard label="Usage telemetry" value="Bağlı değil" />
      </div>

      <EmptyState text="API key hash persistence, scope modeli, rotation ve request metering eklendiğinde developer portal burada aktif hale gelecek." />
    </>
  );
}
