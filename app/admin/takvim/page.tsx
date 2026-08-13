import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { createEventAction } from '@/lib/actions/ops';
import { AdminHeader, Field, formatWhen } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

function googleLink(title: string, start: string, end: string, details: string, location: string) {
  const dates = `${start.replace(/[-:]/g, '').replace('.000', '')}/${end.replace(/[-:]/g, '').replace('.000', '')}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

export default async function CalendarPage() {
  const staff = await requireStaff();
  const ops = await getOpsSnapshot(staff);

  return (
    <>
      <AdminHeader
        kicker="Meet + Takvim"
        title="Toplantılar"
        description="Google Meet linki otomatik üretilir. Google Takvim şablonu ve Apple Takvim ICS indirmesi her etkinlikte var."
      />
      <form action={createEventAction} className="apple-panel grid gap-3 rounded-[24px] p-5 sm:grid-cols-2">
        <Field name="title" label="Başlık" required />
        <Field name="location" label="Konum / ofis" />
        <Field name="startsAt" label="Başlangıç" type="datetime-local" required />
        <Field name="endsAt" label="Bitiş" type="datetime-local" />
        <Field name="attendees" label="Katılımcılar (virgül)" />
        <Field name="details" label="Not" />
        <button className="apple-btn sm:col-span-2">Toplantı oluştur</button>
      </form>
      <div className="space-y-2">
        {ops.events.map((event: any) => (
          <div key={event.id} className="apple-panel space-y-2 rounded-[20px] p-4">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="text-[15px] font-semibold">{event.title}</p>
                <p className="text-[12px] text-[#86868b]">{formatWhen(event.startsAt)} → {formatWhen(event.endsAt)} · {event.location || 'online'}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.meetUrl ? <a className="apple-btn apple-btn-compact" href={event.meetUrl} target="_blank">Meet</a> : null}
                <a className="apple-btn-secondary apple-btn-compact" href={googleLink(event.title, event.startsAt, event.endsAt, event.details || '', event.location || '')} target="_blank">Google Takvim</a>
                <a className="apple-btn-secondary apple-btn-compact" href={`/api/admin/calendar/ics?id=${event.id}`}>Apple ICS</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
