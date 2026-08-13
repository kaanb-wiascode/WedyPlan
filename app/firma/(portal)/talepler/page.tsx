import { redirect } from 'next/navigation';
import { getVendorWorkspace } from '@/lib/vendor/workspace';
import { VendorPageHeader, EmptyNote } from '@/components/vendor/portal/VendorPageHeader';
import { openLeadChatAction, sendLeadQuoteAction, updateLeadStatusAction } from '@/lib/actions/vendor-workspace';
import { formatWhen } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function VendorLeadsPage() {
  const data = await getVendorWorkspace();
  if (!data) redirect('/giris');

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <VendorPageHeader
        kicker="CRM"
        title="Teklif talepleri"
        description="Katalog ve vitrindeki Teklif Al formu buraya düşer. Teklif gönderince çift sohbeti ve anlaşma kaydı açılır."
      />
      {data.leads.length === 0 ? (
        <EmptyNote>Henüz talep yok. Vitrini yayınladığınızda çiftler buradan size ulaşır.</EmptyNote>
      ) : (
        <div className="space-y-3">
          {data.leads.map((lead: any) => (
            <article key={lead.id} className="apple-panel space-y-3 rounded-[24px] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[15px] font-semibold">{lead.coupleNames}</p>
                  <p className="text-[12px] text-[#86868b]">
                    {lead.city} {lead.district ? `/ ${lead.district}` : ''} · {lead.phone} · {lead.guestCount || 0} kişi · {formatWhen(lead.createdAt)}
                  </p>
                  {lead.note ? <p className="mt-2 text-[13px]">{lead.note}</p> : null}
                </div>
                <span className="apple-chip">{lead.status}</span>
              </div>
              <form action={sendLeadQuoteAction} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                <input type="hidden" name="leadId" value={lead.id} />
                <input name="amount" type="number" required placeholder="Teklif ₺" defaultValue={lead.quoteAmount || ''} className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
                <input name="note" placeholder="Teklif notu" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
                <button className="apple-btn apple-btn-compact">Teklif gönder</button>
              </form>
              <div className="flex flex-wrap gap-2">
                {lead.coupleUserId ? (
                  <form action={openLeadChatAction}>
                    <input type="hidden" name="leadId" value={lead.id} />
                    <button className="apple-btn-secondary apple-btn-compact">Sohbet aç</button>
                  </form>
                ) : null}
                {['PENDING', 'OFFER_SENT', 'CLOSED', 'SPAM'].map((status) => (
                  <form key={status} action={updateLeadStatusAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <input type="hidden" name="status" value={status} />
                    <button className="apple-btn-secondary apple-btn-compact">{status}</button>
                  </form>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
