import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function AdminServiceMeshPage() {
  await requireStaff(['SUPER']);

  return (
    <>
      <AdminHeader
        kicker="Service networking"
        title="Service Mesh"
        description="Gerçek mesh control-plane veya telemetry connector bağlı değilken mTLS, circuit-breaker ve inter-service latency değerleri simüle edilmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Mesh control-plane" value="Bağlı değil" />
        <MetricCard label="mTLS telemetry" value="Veri yok" />
        <MetricCard label="Service links" value="Veri yok" />
        <MetricCard label="Circuit breakers" value="Veri yok" />
      </div>

      <EmptyState text="Istio, Linkerd veya benzeri gerçek service-mesh sağlayıcısı bağlandığında topology, mTLS ve circuit-breaker durumu burada gösterilecek." />
    </>
  );
}
