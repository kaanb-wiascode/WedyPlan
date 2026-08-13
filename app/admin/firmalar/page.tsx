import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/require-admin';
import { listVendors } from '@/lib/admin/cockpit-data';
import { createVendorAction, setVendorStatusAction } from '@/lib/actions/admin-cockpit';
import { AdminHeader, EmptyState, StatusPill } from '@/components/admin/cockpit/ui';
import { ImpersonateButton } from '@/components/admin/cockpit/ImpersonateButton';

export const dynamic = 'force-dynamic';

export default async function AdminVendorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  await requireAdmin();
  const { q, status } = await searchParams;
  const vendors = await listVendors({ q, status: status || 'ALL' });

  return (
    <>
      <AdminHeader
        kicker="Operasyon"
        title="Firmalar"
        description="Firma ekleyin, onaylayın, hizmetlerini düzenleyin veya doğrudan portalına girin."
      />

      <section className="apple-panel space-y-4 rounded-[24px] p-5">
        <form className="flex flex-wrap gap-2">
          <input name="q" defaultValue={q} placeholder="Firma, kategori, şehir" className="h-10 flex-1 rounded-xl border border-black/10 px-3 text-[13px]" />
          <select name="status" defaultValue={status || 'ALL'} className="h-10 rounded-xl border border-black/10 px-3 text-[13px]">
            <option value="ALL">Tüm durumlar</option>
            <option value="PENDING">Onay bekleyen</option>
            <option value="APPROVED">Onaylı</option>
            <option value="SUSPENDED">Askıda</option>
            <option value="REJECTED">Reddedilen</option>
          </select>
          <button className="apple-btn apple-btn-compact">Filtrele</button>
        </form>

        <form action={createVendorAction} className="grid gap-2 rounded-2xl bg-[#f5f5f7] p-4 sm:grid-cols-2 lg:grid-cols-6">
          <input name="businessName" required placeholder="Firma adı" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="email" type="email" required placeholder="Giriş e-postası" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="businessCategory" placeholder="Kategori" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="city" placeholder="Şehir" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="services" placeholder="Hizmetler (virgülle)" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <button className="apple-btn apple-btn-compact">Firma oluştur</button>
        </form>
      </section>

      <section className="apple-panel overflow-hidden rounded-[24px]">
        {vendors.length === 0 ? (
          <div className="p-5"><EmptyState text="Firma bulunamadı." /></div>
        ) : (
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#f5f5f7] text-[11px] uppercase tracking-wide text-[#86868b]">
              <tr>
                <th className="px-4 py-3">Firma</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Durum</th>
                <th className="px-4 py-3 text-right">Kontrol</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="border-t border-black/5">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{vendor.businessName}</p>
                    <p className="text-[12px] text-[#86868b]">{vendor.owner?.email} · {vendor.city || '—'}</p>
                  </td>
                  <td className="px-4 py-3">{vendor.businessCategory}</td>
                  <td className="px-4 py-3"><StatusPill status={vendor.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/firmalar/${vendor.id}`} className="apple-btn-secondary apple-btn-compact">Düzenle</Link>
                      {vendor.status !== 'APPROVED' ? (
                        <form action={setVendorStatusAction}>
                          <input type="hidden" name="id" value={vendor.id} />
                          <input type="hidden" name="status" value="APPROVED" />
                          <button className="apple-btn-secondary apple-btn-compact">Onayla</button>
                        </form>
                      ) : (
                        <form action={setVendorStatusAction}>
                          <input type="hidden" name="id" value={vendor.id} />
                          <input type="hidden" name="status" value="SUSPENDED" />
                          <button className="apple-btn-secondary apple-btn-compact">Askıya al</button>
                        </form>
                      )}
                      <ImpersonateButton targetUserId={vendor.userId} portal="VENDOR" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
