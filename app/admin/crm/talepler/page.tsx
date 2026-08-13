import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { assignCaseAction, replyCaseAction } from '@/lib/actions/ops';
import { AdminHeader, ReportBar, StatusPill, formatWhen } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function TicketsPage() {
  const staff = await requireStaff(['SUPER', 'CRM', 'REGION']);
  const ops = await getOpsSnapshot(staff);

  return (
    <>
      <AdminHeader
        kicker="Kuyruk"
        title="Destek talepleri"
        description="Form, chatbot ve telefon. İlgili masaya (satış / finans / bölge) raporlayın."
        actions={<ReportBar slug="tickets" />}
      />
      <div className="space-y-3">
        {ops.cases.map((row: any) => (
          <section key={row.id} className="apple-panel space-y-3 rounded-[24px] p-5">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="text-[15px] font-semibold">{row.subject}</p>
                <p className="text-[12px] text-[#86868b]">{row.name} · {row.email || row.phone || 'anonim'} · {row.source}/{row.channel} · {formatWhen(row.createdAt)}</p>
                <p className="mt-2 text-[13px]">{row.body}</p>
              </div>
              <StatusPill status={row.status} />
            </div>
            {(row.messages || []).map((msg: any) => (
              <p key={msg.id} className="rounded-xl bg-[#f5f5f7] px-3 py-2 text-[12px]"><strong>{msg.author}:</strong> {msg.body}</p>
            ))}
            <div className="grid gap-2 sm:grid-cols-2">
              <form action={replyCaseAction} className="flex gap-2">
                <input type="hidden" name="id" value={row.id} />
                <input name="body" required placeholder="Yanıt" className="h-10 flex-1 rounded-xl border border-black/10 px-3 text-[13px]" />
                <button className="apple-btn apple-btn-compact">Gönder</button>
              </form>
              <form action={assignCaseAction} className="flex gap-2">
                <input type="hidden" name="id" value={row.id} />
                <select name="relatedDesk" className="h-10 rounded-xl border border-black/10 px-2 text-[12px]">
                  <option value="CRM">CRM</option>
                  <option value="SALES">Satış</option>
                  <option value="FINANCE">Finans</option>
                  <option value="REGION">Bölge</option>
                </select>
                <button className="apple-btn-secondary apple-btn-compact">Yönlendir</button>
              </form>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
