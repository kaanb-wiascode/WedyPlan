import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { completeTaskAction, saveTaskAction } from '@/lib/actions/ops';
import { AdminHeader, Field, ReportBar, StatusPill, formatWhen } from '@/components/admin/ops/ui';
import { DESKS } from '@/lib/ops/catalog';

export const dynamic = 'force-dynamic';

export default async function TasksPage() {
  const staff = await requireStaff();
  const ops = await getOpsSnapshot(staff);

  return (
    <>
      <AdminHeader
        kicker="Trello tarzı iş"
        title="Görevler"
        description="Her kullanıcının kendi to-do’su var. Yöneticiler ekibe deadline ve öncelik ile görev atar."
        actions={<ReportBar slug="tasks" />}
      />
      <form action={saveTaskAction} className="apple-panel grid gap-3 rounded-[24px] p-5 sm:grid-cols-5">
        <Field name="title" label="Görev" required />
        <Field name="details" label="Detay" />
        <label className="text-[12px] text-[#86868b]">
          Öncelik
          <select name="priority" defaultValue="MEDIUM" className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]">
            <option>URGENT</option>
            <option>HIGH</option>
            <option>MEDIUM</option>
            <option>LOW</option>
          </select>
        </label>
        <label className="text-[12px] text-[#86868b]">
          Masa
          <select name="desk" defaultValue={staff.desk} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]">
            {DESKS.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </label>
        <Field name="dueAt" label="Deadline" type="datetime-local" />
        <label className="text-[12px] text-[#86868b] sm:col-span-4">
          Ata
          <select name="assigneeUserId" className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]">
            <option value={staff.userId}>Bana</option>
            {ops.staff.map((row: any) => (
              <option key={row.userId} value={row.userId}>{row.fullName || row.email} · {row.desk}</option>
            ))}
          </select>
        </label>
        <button className="apple-btn">Oluştur</button>
      </form>
      <div className="space-y-2">
        {ops.tasks.map((task: any) => (
          <form key={task.id} action={completeTaskAction} className="apple-panel flex items-center justify-between rounded-[20px] px-4 py-3">
            <div>
              <p className="text-[14px] font-semibold">{task.title}</p>
              <p className="text-[12px] text-[#86868b]">{task.priority} · {task.desk} · {task.dueAt ? formatWhen(task.dueAt) : 'deadline yok'}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status={task.status} />
              <input type="hidden" name="id" value={task.id} />
              <input type="hidden" name="status" value={task.status === 'DONE' ? 'OPEN' : 'DONE'} />
              <button className="apple-btn-secondary apple-btn-compact">{task.status === 'DONE' ? 'Aç' : 'Tamamla'}</button>
            </div>
          </form>
        ))}
      </div>
    </>
  );
}
