import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/require-admin';
import { getCoupleById } from '@/lib/admin/cockpit-data';
import { updateCoupleAction } from '@/lib/actions/admin-cockpit';
import { AdminHeader, MetricCard } from '@/components/admin/cockpit/ui';
import { ImpersonateButton } from '@/components/admin/cockpit/ImpersonateButton';

export const dynamic = 'force-dynamic';

export default async function AdminCoupleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const record = await getCoupleById(id);
  if (!record) notFound();
  const { couple, stats } = record;
  const dateValue = couple.weddingDate ? couple.weddingDate.slice(0, 10) : '';

  return (
    <>
      <AdminHeader
        kicker="Çift kaydı"
        title={`${couple.partnerOneName}${couple.partnerTwoName ? ` & ${couple.partnerTwoName}` : ''}`}
        description={couple.owner?.email}
        actions={<ImpersonateButton targetUserId={couple.userId} portal="COUPLE" label="Çift portalına gir" />}
      />

      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="Bütçe kalemi" value={stats.budgetCount} />
        <MetricCard label="Davetli" value={stats.guestCount} />
        <MetricCard label="Görev" value={stats.taskCount} />
      </div>

      <form action={updateCoupleAction} className="apple-panel grid gap-3 rounded-[24px] p-5 sm:grid-cols-2">
        <input type="hidden" name="id" value={couple.id} />
        <label className="text-[12px] text-[#86868b]">
          1. isim
          <input name="partnerOneName" defaultValue={couple.partnerOneName} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
        </label>
        <label className="text-[12px] text-[#86868b]">
          2. isim
          <input name="partnerTwoName" defaultValue={couple.partnerTwoName || ''} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
        </label>
        <label className="text-[12px] text-[#86868b]">
          Şehir
          <input name="city" defaultValue={couple.city || ''} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
        </label>
        <label className="text-[12px] text-[#86868b]">
          Düğün tarihi
          <input name="weddingDate" type="date" defaultValue={dateValue} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
        </label>
        <label className="text-[12px] text-[#86868b]">
          Bütçe
          <input name="targetBudget" type="number" defaultValue={couple.targetBudget} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
        </label>
        <label className="text-[12px] text-[#86868b]">
          Durum
          <select name="status" defaultValue={couple.status} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]">
            <option value="ACTIVE">ACTIVE</option>
            <option value="SUSPENDED">SUSPENDED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </label>
        <label className="sm:col-span-2 text-[12px] text-[#86868b]">
          Not
          <textarea name="notes" defaultValue={couple.notes || ''} rows={3} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-[13px]" />
        </label>
        <button className="apple-btn sm:col-span-2">Kaydet</button>
      </form>
    </>
  );
}
