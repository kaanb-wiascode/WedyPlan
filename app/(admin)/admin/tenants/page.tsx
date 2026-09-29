import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminTenantsPage() {
  await requireStaff(['SUPER']);

  return (
    <>
      <AdminHeader
        kicker="Platform izolasyonu"
        title="Tenants"
        description="Repository içinde kalıcı tenant registry veya gerçek schema/database isolation provisioning bulunmadığı için sentetik white-label tenant kayıtları gösterilmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Tenant registry" value="Bağlı değil" />
        <MetricCard label="Schema isolation" value="Doğrulanmadı" />
        <MetricCard label="Dedicated DB" value="Doğrulanmadı" />
        <MetricCard label="Tenant lifecycle" value="Bağlı değil" />
      </div>

      <EmptyState text="Gerçek tenant modeli ve provisioning altyapısı eklendiğinde tenant listesi, izolasyon tipi ve kapasite verileri burada gösterilecek." />
    </>
  );
}
