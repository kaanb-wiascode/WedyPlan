import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { DEAL_STAGES } from '@/lib/ops/catalog';
import { moveDealAction } from '@/lib/actions/ops';
import { AdminHeader, ReportBar, StatusPill, money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function DealsPage() {
  const staff = await requireStaff(['SUPER', 'SALES', 'REGION']);
  const ops = await getOpsSnapshot(staff);

  return (
    <>
      <AdminHeader
        kicker="Kanban"
        title="Anlaşmalar"
        description="Satış kazandı demek için bölge onayı gerekir. Onaylanınca muhasebeye vade düşer."
        actions={<ReportBar slug="deals" />}
      />
      <div className="grid gap-3 lg:grid-cols-4">
        {DEAL_STAGES.filter((s) => s.id !== 'LOST').map((stage) => {
          const items = ops.deals.filter((d: any) => d.stage === stage.id);
          return (
            <section key={stage.id} className="apple-panel space-y-2 rounded-[20px] p-3">
              <p className="text-[12px] font-semibold text-[#86868b]">{stage.label} · {items.length}</p>
              {items.map((deal: any) => (
                <div key={deal.id} className="space-y-2 rounded-2xl bg-[#f5f5f7] p-3">
                  <p className="text-[13px] font-semibold">{deal.title}</p>
                  <p className="text-[12px] text-[#86868b]">{deal.partyName} · {money(deal.amount)}</p>
                  <StatusPill status={deal.stage} />
                  <form action={moveDealAction} className="flex gap-1">
                    <input type="hidden" name="id" value={deal.id} />
                    <select name="stage" defaultValue={deal.stage} className="h-8 flex-1 rounded-lg border border-black/10 text-[11px]">
                      {DEAL_STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                    <button className="apple-btn-secondary apple-btn-compact">Taşı</button>
                  </form>
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </>
  );
}
