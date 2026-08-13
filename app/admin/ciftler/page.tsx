import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/require-admin';
import { listCouples, type CockpitCouple } from '@/lib/admin/cockpit-data';
import { createCoupleAction } from '@/lib/actions/admin-cockpit';
import { AdminHeader, EmptyState, StatusPill } from '@/components/admin/cockpit/ui';
import { ImpersonateButton } from '@/components/admin/cockpit/ImpersonateButton';

export const dynamic = 'force-dynamic';

export default async function AdminCouplesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdmin();
  const { q } = await searchParams;
  const couples = await listCouples({ q });

  return (
    <>
      <AdminHeader
        kicker="Operasyon"
        title="Çiftler"
        description="Çift hesaplarını oluşturun, düzenleyin ve düğün panosuna yönetici olarak girin."
      />

      <section className="apple-panel space-y-4 rounded-[24px] p-5">
        <form className="flex gap-2">
          <input name="q" defaultValue={q} placeholder="İsim veya şehir" className="h-10 flex-1 rounded-xl border border-black/10 px-3 text-[13px]" />
          <button className="apple-btn apple-btn-compact">Ara</button>
        </form>
        <form action={createCoupleAction} className="grid gap-2 rounded-2xl bg-[#f5f5f7] p-4 sm:grid-cols-2 lg:grid-cols-6">
          <input name="partnerOneName" required placeholder="1. isim" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="partnerTwoName" placeholder="2. isim" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="email" type="email" required placeholder="Giriş e-postası" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="city" placeholder="Şehir" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="weddingDate" type="date" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <button className="apple-btn apple-btn-compact">Çift oluştur</button>
        </form>
      </section>

      <section className="space-y-2">
        {couples.length === 0 ? (
          <EmptyState text="Çift bulunamadı." />
        ) : (
          couples.map((couple: CockpitCouple) => (
            <div key={couple.id} className="apple-panel flex flex-col gap-3 rounded-[20px] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[14px] font-semibold">
                  {couple.partnerOneName}{couple.partnerTwoName ? ` & ${couple.partnerTwoName}` : ''}
                </p>
                <p className="text-[12px] text-[#86868b]">
                  {couple.owner?.email} · {couple.city || 'Şehir yok'} · ₺{couple.targetBudget.toLocaleString('tr-TR')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill status={couple.status} />
                <Link href={`/admin/ciftler/${couple.id}`} className="apple-btn-secondary apple-btn-compact">Düzenle</Link>
                <ImpersonateButton targetUserId={couple.userId} portal="COUPLE" />
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
