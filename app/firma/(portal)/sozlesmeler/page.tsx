import { redirect } from 'next/navigation';
import { getVendorWorkspace } from '@/lib/vendor/workspace';
import { VendorPageHeader, EmptyNote } from '@/components/vendor/portal/VendorPageHeader';
import { saveDealAction } from '@/lib/actions/vendor-workspace';
import { money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function VendorContractsPage() {
  const data = await getVendorWorkspace();
  if (!data) redirect('/giris');

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <VendorPageHeader
        kicker="Anlaşma"
        title="Sözleşmeler"
        description="Tekliften imzaya. Durum değişince çift paneli ve admin denetim kaydı güncellenir."
      />
      <form action={saveDealAction} className="apple-panel grid gap-2 rounded-[24px] p-5 sm:grid-cols-2">
        <input name="coupleNames" required placeholder="Çift adları" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <input name="title" required placeholder="Sözleşme başlığı" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <input name="totalAmount" type="number" placeholder="Tutar ₺" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <input name="depositAmount" type="number" placeholder="Kapora ₺" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <input name="weddingDate" placeholder="Düğün tarihi" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <select name="status" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]">
          {['DRAFT', 'QUOTE_SENT', 'OPTION', 'SIGNED', 'ACTIVE', 'COMPLETED', 'CANCELLED'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button className="apple-btn sm:col-span-2">Anlaşma oluştur</button>
      </form>
      {data.deals.length === 0 ? (
        <EmptyNote>Henüz anlaşma yok. Talepten teklif göndererek de oluşturabilirsiniz.</EmptyNote>
      ) : (
        <div className="space-y-3">
          {data.deals.map((deal: any) => (
            <form key={deal.id} action={saveDealAction} className="apple-panel space-y-3 rounded-[24px] p-5">
              <input type="hidden" name="id" value={deal.id} />
              <input type="hidden" name="coupleUserId" value={deal.coupleUserId || ''} />
              <div className="flex justify-between gap-3">
                <div>
                  <p className="text-[15px] font-semibold">{deal.coupleNames}</p>
                  <p className="text-[12px] text-[#86868b]">{deal.title} · {money(deal.totalAmount)}</p>
                </div>
                <select name="status" defaultValue={deal.status} className="h-10 rounded-xl border border-black/10 px-3 text-[13px]">
                  {['DRAFT', 'QUOTE_SENT', 'OPTION', 'SIGNED', 'ACTIVE', 'COMPLETED', 'CANCELLED'].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <input type="hidden" name="coupleNames" value={deal.coupleNames} />
              <input type="hidden" name="title" value={deal.title} />
              <input type="hidden" name="totalAmount" value={deal.totalAmount} />
              <input type="hidden" name="depositAmount" value={deal.depositAmount} />
              <input type="hidden" name="weddingDate" value={deal.weddingDate || ''} />
              <button className="apple-btn-secondary apple-btn-compact">Durumu kaydet</button>
              <div className="flex flex-wrap gap-1.5">
                {(deal.milestones || []).map((m: any) => (
                  <span key={m.id} className={`apple-chip ${m.isDone ? 'bg-emerald-50 text-emerald-700' : ''}`}>
                    {m.isDone ? '✓ ' : ''}{m.title}
                  </span>
                ))}
              </div>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}
