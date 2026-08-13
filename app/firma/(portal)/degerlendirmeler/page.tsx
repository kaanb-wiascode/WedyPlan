import { redirect } from 'next/navigation';
import { getVendorWorkspace } from '@/lib/vendor/workspace';
import { VendorPageHeader, EmptyNote } from '@/components/vendor/portal/VendorPageHeader';
import { replyReviewAction } from '@/lib/actions/vendor-workspace';

export const dynamic = 'force-dynamic';

export default async function VendorReviewsPage() {
  const data = await getVendorWorkspace();
  if (!data) redirect('/giris');

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <VendorPageHeader
        kicker="İtibar"
        title="Değerlendirmeler"
        description="Çift yorumları vitrinde yayınlanır. Yanıtlarınız katalog detayında görünür."
      />
      {data.reviews.length === 0 ? (
        <EmptyNote>Henüz yorum yok. Anlaşma tamamlanınca çiftler buraya yazar.</EmptyNote>
      ) : (
        data.reviews.map((row: any) => (
          <article key={row.id} className="apple-panel space-y-3 rounded-[24px] p-5">
            <p className="text-[15px] font-semibold">{row.authorName} · {row.rating}/5</p>
            <p className="text-[13px]">{row.comment}</p>
            {row.vendorReply ? <p className="text-[13px] text-[#0071e3]">Yanıt: {row.vendorReply}</p> : null}
            <form action={replyReviewAction} className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <input type="hidden" name="id" value={row.id} />
              <input name="reply" required placeholder="Yanıt yazın" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
              <button className="apple-btn apple-btn-compact">Yanıtla</button>
            </form>
          </article>
        ))
      )}
    </div>
  );
}
