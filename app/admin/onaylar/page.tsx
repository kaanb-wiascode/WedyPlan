import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/require-admin';
import { listVendors } from '@/lib/admin/cockpit-data';
import { setVendorStatusAction } from '@/lib/actions/admin-cockpit';
import { AdminHeader, EmptyState, StatusPill, formatWhen } from '@/components/admin/cockpit/ui';
import { ImpersonateButton } from '@/components/admin/cockpit/ImpersonateButton';

export const dynamic = 'force-dynamic';

export default async function AdminApprovalsPage() {
  await requireAdmin();
  const vendors = await listVendors({ status: 'PENDING' });

  return (
    <>
      <AdminHeader
        kicker="Operasyon"
        title="Firma onayları"
        description="Yeni başvuruları inceleyin, vitrine alın veya reddedin. Onaylanan firma hemen kendi portalına girebilir."
      />
      <section className="apple-panel space-y-3 rounded-[24px] p-5">
        {vendors.length === 0 ? (
          <EmptyState text="Bekleyen onay yok." />
        ) : (
          vendors.map((vendor) => (
            <div key={vendor.id} className="flex flex-col gap-3 rounded-2xl bg-[#f5f5f7] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[14px] font-semibold">{vendor.businessName}</p>
                <p className="text-[12px] text-[#86868b]">
                  {vendor.businessCategory} · {vendor.city || 'Şehir yok'} · {vendor.owner?.email} · {formatWhen(vendor.createdAt)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill status={vendor.status} />
                <Link href={`/admin/firmalar/${vendor.id}`} className="apple-btn-secondary apple-btn-compact">Detay</Link>
                <form action={setVendorStatusAction}>
                  <input type="hidden" name="id" value={vendor.id} />
                  <input type="hidden" name="status" value="APPROVED" />
                  <button className="apple-btn apple-btn-compact">Onayla</button>
                </form>
                <form action={setVendorStatusAction}>
                  <input type="hidden" name="id" value={vendor.id} />
                  <input type="hidden" name="status" value="REJECTED" />
                  <button className="apple-btn-secondary apple-btn-compact text-rose-600">Reddet</button>
                </form>
                <ImpersonateButton targetUserId={vendor.userId} portal="VENDOR" label="İncele" />
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
