import { redirect } from 'next/navigation';
import { getVendorWorkspace } from '@/lib/vendor/workspace';
import { VendorPageHeader, EmptyNote } from '@/components/vendor/portal/VendorPageHeader';
import { deleteCalendarItemAction, saveCalendarItemAction } from '@/lib/actions/vendor-workspace';
import { formatWhen } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function VendorCalendarPage() {
  const data = await getVendorWorkspace();
  if (!data) redirect('/giris');

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <VendorPageHeader
        kicker="Planlama"
        title="Takvim"
        description="Tadım, toplantı ve düğün günü. Kayıtlar denetim loguna yazılır."
      />
      <form action={saveCalendarItemAction} className="apple-panel grid gap-2 rounded-[24px] p-5 sm:grid-cols-2">
        <input name="title" required placeholder="Başlık" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <input name="coupleNames" placeholder="Çift" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <input name="startsAt" type="datetime-local" required className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <input name="endsAt" type="datetime-local" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <select name="kind" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]">
          <option value="MEETING">Toplantı</option>
          <option value="TASTING">Tadım</option>
          <option value="WEDDING">Düğün</option>
          <option value="BLOCK">Blokaj</option>
        </select>
        <select name="status" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]">
          <option value="CONFIRMED">Onaylı</option>
          <option value="OPTION">Opsiyon</option>
          <option value="PENDING">Beklemede</option>
        </select>
        <button className="apple-btn sm:col-span-2">Etkinlik ekle</button>
      </form>
      {data.events.length === 0 ? (
        <EmptyNote>Takvim boş. Anlaşmalı çiftler için randevu ekleyin.</EmptyNote>
      ) : (
        <div className="space-y-2">
          {data.events.map((event: any) => (
            <form key={event.id} action={deleteCalendarItemAction} className="apple-panel flex items-center justify-between rounded-[20px] p-4 text-[13px]">
              <div>
                <p className="font-semibold">{event.title}</p>
                <p className="text-[#86868b]">{event.coupleNames} · {formatWhen(event.startsAt)} · {event.kind}</p>
              </div>
              <input type="hidden" name="id" value={event.id} />
              <button className="text-rose-600">Sil</button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}
