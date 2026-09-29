import { requireStaff } from '@/lib/ops/staff';
import {
  AdminHeader,
  EmptyState,
  MetricCard,
  StatusPill,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'MLOps | WedyPlan Admin',
  description: 'Model lifecycle and dataset operations status.',
};

export default async function AdminMlopsPage() {
  await requireStaff(['SUPER']);

  const integrations = [
    {
      name: 'Dataset registry',
      configured: false,
      detail: 'Kalıcı dataset registry modeli veya dış MLOps sağlayıcısı bağlı değil.',
    },
    {
      name: 'Drift monitoring',
      configured: false,
      detail: 'Gerçek feature drift telemetrisi kaydedilmiyor.',
    },
    {
      name: 'Training orchestration',
      configured: false,
      detail: 'Model training/retraining runner bağlı değil.',
    },
    {
      name: 'Model registry',
      configured: false,
      detail: 'Versioned model registry persistence bulunmuyor.',
    },
  ];

  return (
    <>
      <AdminHeader
        kicker="AI operasyonları"
        title="MLOps"
        description="Bu ekran yalnızca gerçekten bağlı MLOps bileşenlerini gösterir; simüle edilmiş dataset, drift veya training sonucu üretmez."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Dataset registry" value="Bağlı değil" />
        <MetricCard label="Drift telemetry" value="Bağlı değil" />
        <MetricCard label="Training runner" value="Bağlı değil" />
        <MetricCard label="Model registry" value="Bağlı değil" />
      </div>

      <section className="apple-panel space-y-4 rounded-[24px] p-5">
        <div>
          <h2 className="text-[16px] font-semibold">MLOps entegrasyon durumu</h2>
          <p className="text-[12px] text-[#86868b]">
            Production ortamında gerçek sağlayıcı veya kalıcı model eklenmeden bu alan başarı, drift veya retraining iddiasında bulunmaz.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-black/8 bg-white p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[13px] font-semibold">{item.name}</h3>
                <StatusPill status={item.configured ? 'CONFIGURED' : 'MISSING'} />
              </div>
              <p className="mt-2 text-[12px] text-[#86868b]">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <EmptyState text="MLOps provider bağlandığında dataset, drift, model registry ve training job verileri burada gerçek kaynaktan gösterilecek." />
    </>
  );
}
