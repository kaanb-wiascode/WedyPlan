import Link from 'next/link';
import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { completeTaskAction, saveTaskAction } from '@/lib/actions/ops';
import {
  AdminHeader,
  AlertStrip,
  MetricCard,
  PulseFeed,
  ReportBar,
  StatusPill,
  TaskList,
  formatWhen,
} from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function CrmDeskPage() {
  const staff = await requireStaff(['SUPER', 'CRM', 'REGION']);
  const ops = await getOpsSnapshot(staff);

  return (
    <>
      <AdminHeader
        kicker="Müşteri hattı"
        title="CRM ve müşteri hizmetleri"
        description="Çiftler, anonim site ziyaretçileri ve chatbot. SLA saati dolan kayıtlar kırmızıya düşer; ilgili masaya yönlendirebilirsiniz."
        actions={<ReportBar slug="crm" />}
      />
      <AlertStrip alerts={ops.alerts} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Açık kayıt" value={ops.kpis.openCases} href="/admin/crm/talepler" />
        <MetricCard label="SLA aşımı" value={ops.kpis.slaBreaches} />
        <MetricCard label="Anonim + çift" value={ops.cases.filter((c: any) => c.source !== 'VENDOR').length} />
        <MetricCard label="Chat" value={ops.cases.filter((c: any) => c.channel === 'CHAT').length} href="/admin/crm/sohbet" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <div className="flex justify-between">
            <h2 className="text-[16px] font-semibold">Kuyruk</h2>
            <Link href="/admin/crm/talepler" className="apple-link text-[12px]">Tümü</Link>
          </div>
          {ops.cases.slice(0, 6).map((row: any) => (
            <div key={row.id} className="rounded-2xl bg-[#f5f5f7] p-3">
              <div className="flex justify-between">
                <p className="text-[13px] font-semibold">{row.subject}</p>
                <StatusPill status={row.ageMinutes > row.slaMinutes ? 'SUSPENDED' : row.status} />
              </div>
              <p className="text-[12px] text-[#86868b]">{row.source} · {row.name} · {formatWhen(row.createdAt)}</p>
            </div>
          ))}
        </section>
        <PulseFeed items={ops.pulse} />
      </div>
      <TaskList tasks={ops.tasks} action={saveTaskAction} completeAction={completeTaskAction} />
    </>
  );
}
