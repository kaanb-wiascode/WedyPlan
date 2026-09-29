import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminBackupRecoveryPage() {
  await requireStaff(['SUPER']);

  return (
    <>
      <AdminHeader
        kicker="Data protection"
        title="Backup & Recovery"
        description="Gerçek backup provider ve restore telemetry olmadan snapshot veya restore başarısı gösterilmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Backup provider" value="Bağlı değil" />
        <MetricCard label="Doğrulanmış snapshot" value="Veri yok" />
        <MetricCard label="Restore test" value="Veri yok" />
        <MetricCard label="Son doğrulama" value="Veri yok" />
      </div>

      <EmptyState text="Gerçek PostgreSQL backup/restore sağlayıcısı bağlandığında snapshot kimliği, zaman damgası, boyut, restore testi ve doğrulama sonucu burada gösterilecek." />
    </>
  );
}
