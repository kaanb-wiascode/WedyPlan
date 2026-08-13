import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db';
import { startVendorCoupleChatAction } from '@/lib/actions/vendor-messages';
import { submitCoupleReviewAction } from '@/lib/actions/vendor-workspace';
import { money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';
const db = prisma as any;

export default async function CoupleVendorsPage() {
  const session = await getSession();
  if (!session?.userId) redirect('/giris');

  const deals = await db.vendorDeal.findMany({
    where: { coupleUserId: session.userId },
    orderBy: { updatedAt: 'desc' },
  }).catch(() => []);
  const dealIds = (deals as any[]).map((d) => d.id);
  const milestones = dealIds.length
    ? await db.vendorDealMilestone.findMany({ where: { dealId: { in: dealIds } }, orderBy: { sortOrder: 'asc' } }).catch(() => [])
    : [];
  const dealsWithSteps = (deals as any[]).map((deal) => ({
    ...deal,
    milestones: (milestones as any[]).filter((m) => m.dealId === deal.id),
  }));
  const payments = await db.vendorPaymentRequest.findMany({
    where: { coupleUserId: session.userId },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);
  const vendorIds = [...new Set(dealsWithSteps.map((d) => d.vendorId))];
  const vendors = vendorIds.length
    ? await db.vendor.findMany({ where: { id: { in: vendorIds } } }).catch(() => [])
    : [];
  const vendorMap = new Map((vendors as any[]).map((v) => [v.id, v]));

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div>
        <p className="apple-kicker">Firmalarınız</p>
        <h1 className="text-[28px] font-semibold tracking-tight">Anlaşmalar ve süreç</h1>
        <p className="mt-1 text-[14px] text-[#86868b]">Teklif, sözleşme adımları ve mesajlaşma WedyPlan üzerinden yürür.</p>
      </div>
      <Link href="/firmalar" className="apple-btn apple-btn-compact inline-flex">Katalogdan firma ekle</Link>

      {dealsWithSteps.length === 0 ? (
        <p className="apple-panel rounded-[24px] p-6 text-[13px] text-[#86868b]">
          Henüz anlaşma yok. Katalogdan teklif alın; giriş yaptıysanız talep firmanıza ve mesajlarınıza düşer.
        </p>
      ) : (
        dealsWithSteps.map((deal) => {
          const vendor = vendorMap.get(deal.vendorId);
          return (
            <article key={deal.id} className="apple-panel space-y-3 rounded-[24px] p-5">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <p className="text-[16px] font-semibold">{vendor?.businessName || 'Firma'}</p>
                  <p className="text-[12px] text-[#86868b]">{deal.title} · {money(deal.totalAmount)} · {deal.status}</p>
                </div>
                <StartChat vendorId={deal.vendorId} />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(deal.milestones || []).map((m: any) => (
                  <span key={m.id} className={`apple-chip ${m.isDone ? 'bg-emerald-50 text-emerald-800' : ''}`}>
                    {m.isDone ? '✓ ' : ''}{m.title}
                  </span>
                ))}
              </div>
              <form action={submitCoupleReviewAction} className="grid gap-2 sm:grid-cols-[80px_1fr_auto]">
                <input type="hidden" name="vendorId" value={deal.vendorId} />
                <input name="rating" type="number" min={1} max={5} defaultValue={5} className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
                <input name="comment" required placeholder="Yorum" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
                <button className="apple-btn apple-btn-compact">Yorum bırak</button>
              </form>
            </article>
          );
        })
      )}

      {(payments as any[]).length > 0 ? (
        <section className="space-y-2">
          <h2 className="text-[16px] font-semibold">Ödeme talepleri</h2>
          {(payments as any[]).map((row) => (
            <div key={row.id} className="apple-panel flex justify-between rounded-[20px] p-4 text-[13px]">
              <span>{row.description} · {money(row.amount)}</span>
              <span className="text-[#86868b]">{row.status}</span>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}

async function openChat(formData: FormData) {
  'use server';
  await startVendorCoupleChatAction(String(formData.get('vendorId') || ''));
}

function StartChat({ vendorId }: { vendorId: string }) {
  return (
    <form action={openChat}>
      <input type="hidden" name="vendorId" value={vendorId} />
      <button className="apple-btn-secondary apple-btn-compact">Mesaj</button>
    </form>
  );
}
