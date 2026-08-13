import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { addActivityAction, savePartyAction } from '@/lib/actions/ops';
import { AdminHeader, Field, ReportBar, StatusPill } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function CustomersPage() {
  const staff = await requireStaff(['SUPER', 'SALES', 'REGION', 'CRM']);
  const ops = await getOpsSnapshot(staff);

  return (
    <>
      <AdminHeader
        kicker="CRM"
        title="Müşteriler"
        description="Görüşülen, takip edilen ve anlaşması yapılan kartlar. Skor 0–100; kaynak kampanya veya manuel."
        actions={<ReportBar slug="customers" />}
      />
      <form action={savePartyAction} className="apple-panel grid gap-2 rounded-[24px] p-5 sm:grid-cols-5">
        <Field name="name" label="İsim" required />
        <Field name="phone" label="Telefon" />
        <Field name="city" label="Şehir" />
        <Field name="score" label="Skor" type="number" defaultValue={55} />
        <button className="apple-btn self-end">Ekle</button>
      </form>
      <div className="space-y-2">
        {ops.parties.map((row: any) => (
          <div key={row.id} className="apple-panel flex flex-wrap items-center justify-between gap-3 rounded-[20px] p-4">
            <div>
              <p className="text-[14px] font-semibold">{row.name}</p>
              <p className="text-[12px] text-[#86868b]">{row.kind} · {row.city || '—'} · {row.phone || row.email || 'iletişim yok'} · skor {row.score}</p>
            </div>
            <form action={addActivityAction} className="flex gap-2">
              <input type="hidden" name="partyId" value={row.id} />
              <input type="hidden" name="type" value="CALL" />
              <input name="body" placeholder="Görüşme notu" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
              <button className="apple-btn-secondary apple-btn-compact">Not</button>
            </form>
          </div>
        ))}
      </div>
    </>
  );
}
