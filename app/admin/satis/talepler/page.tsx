import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { vendorRequestAction } from '@/lib/actions/ops';
import { AdminHeader, ReportBar, StatusPill } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function SalesRequestsPage() {
  const staff = await requireStaff(['SUPER', 'SALES', 'REGION', 'CRM']);
  const ops = await getOpsSnapshot(staff);

  return (
    <>
      <AdminHeader
        kicker="Firma portalı"
        title="Firma talep ve istekleri"
        description="Paket yükseltme, vitrin, sözleşme ve destek talepleri satış kuyruğuna düşer."
        actions={<ReportBar slug="vendor-requests" />}
      />
      <div className="space-y-2">
        {ops.vendorRequests.map((row: any) => (
          <div key={row.id} className="apple-panel space-y-3 rounded-[20px] p-4">
            <div className="flex justify-between gap-3">
              <div>
                <p className="text-[14px] font-semibold">{row.title}</p>
                <p className="text-[12px] text-[#86868b]">{row.category} · {row.body}</p>
              </div>
              <StatusPill status={row.status} />
            </div>
            <form action={vendorRequestAction} className="flex gap-2">
              <input type="hidden" name="id" value={row.id} />
              <select name="status" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]">
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
              <button className="apple-btn apple-btn-compact">Güncelle</button>
            </form>
          </div>
        ))}
      </div>
    </>
  );
}
