import { redirect } from 'next/navigation';
import { getVendorWorkspace } from '@/lib/vendor/workspace';
import { VendorPageHeader, EmptyNote } from '@/components/vendor/portal/VendorPageHeader';
import { createPaymentRequestAction, markPaymentPaidAction } from '@/lib/actions/vendor-workspace';
import { money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function VendorFinancePage() {
  const data = await getVendorWorkspace();
  if (!data) redirect('/giris');
  const collected = data.payments.filter((p: any) => p.status === 'PAID').reduce((s: number, p: any) => s + Number(p.amount), 0);

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <VendorPageHeader
        kicker="Tahsilat"
        title="Finans"
        description="Kapora ve taksit talepleri çift ödemelerine bağlanır. Her link denetim kaydına düşer."
      />
      <div className="grid grid-cols-2 gap-3">
        <div className="apple-panel rounded-[20px] p-4">
          <p className="text-[11px] text-[#86868b]">Anlaşma hacmi</p>
          <p className="text-[22px] font-semibold">{money(data.kpis.pipeline)}</p>
        </div>
        <div className="apple-panel rounded-[20px] p-4">
          <p className="text-[11px] text-[#86868b]">Tahsil edilen</p>
          <p className="text-[22px] font-semibold">{money(collected)}</p>
        </div>
      </div>
      <form action={createPaymentRequestAction} className="apple-panel grid gap-2 rounded-[24px] p-5 sm:grid-cols-2">
        <input name="coupleNames" required placeholder="Çift" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <input name="amount" type="number" required placeholder="Tutar ₺" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <input name="description" placeholder="Kapora / 1. taksit" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <input name="dueDate" type="date" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <button className="apple-btn sm:col-span-2">Ödeme talebi oluştur</button>
      </form>
      {data.payments.length === 0 ? (
        <EmptyNote>Ödeme talebi yok.</EmptyNote>
      ) : (
        data.payments.map((row: any) => (
          <form key={row.id} action={markPaymentPaidAction} className="apple-panel flex items-center justify-between rounded-[20px] p-4 text-[13px]">
            <div>
              <p className="font-semibold">{row.coupleNames} · {money(row.amount)}</p>
              <p className="text-[#86868b]">{row.description} · {row.status}</p>
            </div>
            <input type="hidden" name="id" value={row.id} />
            {row.status !== 'PAID' ? <button className="apple-btn apple-btn-compact">Tahsil edildi</button> : <span className="text-emerald-600">Ödendi</span>}
          </form>
        ))
      )}
    </div>
  );
}
