import { redirect } from 'next/navigation';
import { getVendorWorkspace } from '@/lib/vendor/workspace';
import { VendorPageHeader, EmptyNote } from '@/components/vendor/portal/VendorPageHeader';
import { deleteStaffAction, saveStaffAction, toggleMilestoneAction } from '@/lib/actions/vendor-workspace';

export const dynamic = 'force-dynamic';

export default async function VendorOpsPage() {
  const data = await getVendorWorkspace();
  if (!data) redirect('/giris');

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <VendorPageHeader
        kicker="Operasyon"
        title="Süreç ve ekip"
        description="Anlaşma kilometre taşları ve saha kadrosu. Çift organizasyonu buradan takip edilir."
      />

      <section className="space-y-3">
        <h2 className="text-[16px] font-semibold">Anlaşma süreçleri</h2>
        {data.deals.length === 0 ? (
          <EmptyNote>Süreç takibi için önce anlaşma oluşturun.</EmptyNote>
        ) : (
          data.deals.map((deal: any) => (
            <article key={deal.id} className="apple-panel space-y-3 rounded-[24px] p-5">
              <p className="text-[15px] font-semibold">{deal.coupleNames} · {deal.status}</p>
              <div className="flex flex-wrap gap-2">
                {(deal.milestones || []).map((m: any) => (
                  <form key={m.id} action={toggleMilestoneAction}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="isDone" value={m.isDone ? 'true' : 'false'} />
                    <button className={`apple-btn-compact ${m.isDone ? 'apple-btn' : 'apple-btn-secondary'}`}>
                      {m.title}
                    </button>
                  </form>
                ))}
              </div>
            </article>
          ))
        )}
      </section>

      <section className="apple-panel space-y-3 rounded-[24px] p-5">
        <h2 className="text-[16px] font-semibold">Ekip</h2>
        {data.staff.map((row: any) => (
          <form key={row.id} action={deleteStaffAction} className="flex justify-between text-[13px]">
            <span>{row.name} · {row.role} · {row.assignedEvent || 'Atama yok'}</span>
            <input type="hidden" name="id" value={row.id} />
            <button className="text-rose-600">Çıkar</button>
          </form>
        ))}
        <form action={saveStaffAction} className="grid gap-2 sm:grid-cols-2">
          <input name="name" required placeholder="Ad" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="role" placeholder="Görev" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="phone" placeholder="Telefon" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="assignedEvent" placeholder="Atanan etkinlik" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <button className="apple-btn sm:col-span-2">Personel ekle</button>
        </form>
      </section>
    </div>
  );
}
