import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { createDebtAction, settleDebtAction } from '@/lib/actions/ops';
import { AdminHeader, Field, ReportBar, StatusPill, formatWhen, money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function DebtsPage() {
  const staff = await requireStaff(['SUPER', 'FINANCE', 'SALES', 'REGION']);
  const ops = await getOpsSnapshot(staff);
  const write = staff.desk !== 'REGION';

  return (
    <>
      <AdminHeader
        kicker="Tahsilat"
        title="Borç ve vadeler"
        description="Satış anlaşmasından düşen vadeler ve manuel borçlandırma. Vadesi geçenler kokpit uyarısına düşer."
        actions={<ReportBar slug="debts" />}
      />
      {write ? (
        <form action={createDebtAction} className="apple-panel grid gap-3 rounded-[24px] p-5 sm:grid-cols-5">
          <Field name="partyName" label="Cari" required />
          <Field name="title" label="Başlık" required />
          <Field name="amount" label="Tutar" type="number" required />
          <Field name="dueDate" label="Vade" type="date" required />
          <Field name="installment" label="Taksit" type="number" defaultValue={1} />
          <button className="apple-btn sm:col-span-5">Borçlandır</button>
        </form>
      ) : null}
      <div className="space-y-2">
        {ops.debts.map((row: any) => (
          <div key={row.id} className="apple-panel flex items-center justify-between rounded-[20px] px-4 py-3">
            <div>
              <p className="text-[14px] font-semibold">{row.partyName} · {money(row.amount)}</p>
              <p className="text-[12px] text-[#86868b]">{row.title} · vade {formatWhen(row.dueDate)} · {row.installment} taksit</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status={row.status} />
              {write && row.status !== 'PAID' ? (
                <form action={settleDebtAction}>
                  <input type="hidden" name="id" value={row.id} />
                  <button className="apple-btn apple-btn-compact">Tahsil et</button>
                </form>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
