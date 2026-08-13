import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/require-admin';
import { getVendorById } from '@/lib/admin/cockpit-data';
import { addVendorNoteAction, setVendorStatusAction, updateVendorAction } from '@/lib/actions/admin-cockpit';
import { AdminHeader, StatusPill, formatWhen } from '@/components/admin/cockpit/ui';
import { ImpersonateButton } from '@/components/admin/cockpit/ImpersonateButton';

export const dynamic = 'force-dynamic';

export default async function AdminVendorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const record = await getVendorById(id);
  if (!record) notFound();
  const { vendor, notes } = record;

  return (
    <>
      <AdminHeader
        kicker="Firma kaydı"
        title={vendor.businessName}
        description={vendor.owner?.email}
        actions={<ImpersonateButton targetUserId={vendor.userId} portal="VENDOR" label="Firma portalına gir" />}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <form action={updateVendorAction} className="apple-panel space-y-3 rounded-[24px] p-5 lg:col-span-2">
          <input type="hidden" name="id" value={vendor.id} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field name="businessName" label="Firma adı" defaultValue={vendor.businessName} />
            <Field name="businessCategory" label="Kategori" defaultValue={vendor.businessCategory} />
            <Field name="city" label="Şehir" defaultValue={vendor.city || ''} />
            <Field name="district" label="İlçe" defaultValue={vendor.district || ''} />
            <Field name="phone" label="Telefon" defaultValue={vendor.phone || ''} />
            <Field name="website" label="Web" defaultValue={vendor.website || ''} />
          </div>
          <label className="block text-[12px] text-[#86868b]">
            Hizmetler
            <input name="services" defaultValue={vendor.services.join(', ')} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
          </label>
          <label className="block text-[12px] text-[#86868b]">
            Açıklama
            <textarea name="description" defaultValue={vendor.description || ''} rows={4} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-[13px]" />
          </label>
          <label className="block text-[12px] text-[#86868b]">
            İç not
            <textarea name="notes" defaultValue={vendor.notes || ''} rows={3} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-[13px]" />
          </label>
          <button className="apple-btn">Kaydet</button>
        </form>

        <div className="space-y-4">
          <section className="apple-panel space-y-3 rounded-[24px] p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">Durum</h2>
              <StatusPill status={vendor.status} />
            </div>
            {['APPROVED', 'PENDING', 'SUSPENDED', 'REJECTED'].map((status) => (
              <form key={status} action={setVendorStatusAction}>
                <input type="hidden" name="id" value={vendor.id} />
                <input type="hidden" name="status" value={status} />
                <button className="apple-btn-secondary w-full text-[12px]">{status}</button>
              </form>
            ))}
          </section>

          <section className="apple-panel space-y-3 rounded-[24px] p-5">
            <h2 className="text-[15px] font-semibold">Denetim notları</h2>
            <form action={addVendorNoteAction} className="space-y-2">
              <input type="hidden" name="vendorId" value={vendor.id} />
              <textarea name="body" required rows={3} placeholder="Not" className="w-full rounded-xl border border-black/10 px-3 py-2 text-[13px]" />
              <button className="apple-btn apple-btn-compact">Not ekle</button>
            </form>
            {notes.map((note: any) => (
              <p key={note.id} className="text-[12px] text-[#86868b]">
                {formatWhen(note.createdAt.toISOString?.() || note.createdAt)} · {note.body}
              </p>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}

function Field({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return (
    <label className="block text-[12px] text-[#86868b]">
      {label}
      <input name={name} defaultValue={defaultValue} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px] text-[#1d1d1f]" />
    </label>
  );
}
