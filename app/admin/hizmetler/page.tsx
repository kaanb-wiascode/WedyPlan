import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/require-admin';
import { listServices } from '@/lib/admin/cockpit-data';
import { AdminHeader, EmptyState, StatusPill } from '@/components/admin/cockpit/ui';

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
  await requireAdmin();
  const vendors = await listServices();

  return (
    <>
      <AdminHeader
        kicker="Operasyon"
        title="Hizmet denetimi"
        description="Firmaların sunduğu hizmetleri, doğrulama rozetini ve vitrin durumunu tek ekrandan kontrol edin."
      />
      <section className="space-y-2">
        {vendors.length === 0 ? (
          <EmptyState text="Denetlenecek firma yok." />
        ) : (
          vendors.map((vendor) => (
            <div key={vendor.id} className="apple-panel flex flex-col gap-3 rounded-[20px] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[14px] font-semibold">{vendor.businessName}</p>
                <p className="text-[12px] text-[#86868b]">
                  {vendor.businessCategory} · {vendor.city || '—'} · {vendor.isVerified ? 'Doğrulanmış' : 'Rozetsiz'}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {vendor.services.length === 0 ? (
                    <span className="apple-chip">Hizmet tanımlanmamış</span>
                  ) : (
                    vendor.services.map((service) => (
                      <span key={service} className="apple-chip">{service}</span>
                    ))
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill status={vendor.status} />
                <Link href={`/admin/firmalar/${vendor.id}`} className="apple-btn apple-btn-compact">Düzenle</Link>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
