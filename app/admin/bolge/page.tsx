import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { moveDealAction } from '@/lib/actions/ops';
import { completeTaskAction, saveTaskAction } from '@/lib/actions/ops';
import {
  AdminHeader,
  AlertStrip,
  BarRow,
  MetricCard,
  ReportBar,
  TaskList,
  money,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function RegionDeskPage() {
  const staff = await requireStaff(['SUPER', 'REGION']);
  const ops = await getOpsSnapshot(staff);
  const pending = ops.deals.filter((d: any) => d.stage === 'PENDING_APPROVAL');
  const max = Math.max(...ops.dealPipeline.map((r) => r.amount), 1);

  return (
    <>
      <AdminHeader
        kicker={staff.regionCode || 'Türkiye'}
        title="Bölge müdürlüğü"
        description="Finans görünümü salt okunur. Satış ekibinin hunisine tam erişim, üye ekleme ve anlaşma yayını sizin onayınızla."
        actions={<ReportBar slug="region" />}
      />
      <AlertStrip alerts={ops.alerts} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Bölge pipeline" value={money(ops.kpis.dealValue)} href="/admin/satis/anlasmalar" />
        <MetricCard label="Onay bekleyen" value={pending.length} />
        <MetricCard label="Ekip" value={ops.staff.filter((s: any) => s.desk === 'SALES').length} href="/admin/bolge/ekipler" />
        <MetricCard label="Fatura toplamı" value={money(ops.kpis.invoiceTotal)} href="/admin/muhasebe" />
      </div>
      <section className="apple-panel space-y-3 rounded-[24px] p-5">
        <h2 className="text-[16px] font-semibold">Yayın onayları</h2>
        {pending.map((deal: any) => (
          <form key={deal.id} action={moveDealAction} className="flex items-center justify-between gap-3 rounded-2xl bg-[#f5f5f7] px-4 py-3">
            <div>
              <p className="text-[13px] font-semibold">{deal.title}</p>
              <p className="text-[12px] text-[#86868b]">{deal.partyName} · {money(deal.amount)}</p>
            </div>
            <input type="hidden" name="id" value={deal.id} />
            <input type="hidden" name="stage" value="WON" />
            <button className="apple-btn apple-btn-compact">Onayla ve yayına al</button>
          </form>
        ))}
      </section>
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Ekip hunisi</h2>
          {ops.dealPipeline.map((row) => (
            <BarRow key={row.stage} label={row.stage} value={row.amount} max={max} suffix="₺" />
          ))}
        </section>
        <TaskList tasks={ops.tasks} action={saveTaskAction} completeAction={completeTaskAction} />
      </div>
    </>
  );
}
