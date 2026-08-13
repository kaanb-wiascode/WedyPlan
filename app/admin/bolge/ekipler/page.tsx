import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { createStaffAction, setStaffActiveAction } from '@/lib/actions/ops';
import { AdminHeader, Field, ReportBar, StatusPill } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function RegionTeamsPage() {
  const staff = await requireStaff(['SUPER', 'REGION']);
  const ops = await getOpsSnapshot(staff);
  const sales = ops.staff.filter((row: any) => row.desk === 'SALES' && (!staff.regionCode || row.regionCode === staff.regionCode || staff.desk === 'SUPER'));

  return (
    <>
      <AdminHeader
        kicker="Bölge"
        title="Satış ekipleri"
        description="Bölge müdürü satış uzmanı ekler, yetkisini açar veya kısıtlar."
        actions={<ReportBar slug="staff" />}
      />
      <form action={createStaffAction} className="apple-panel grid gap-3 rounded-[24px] p-5 sm:grid-cols-3">
        <input type="hidden" name="desk" value="SALES" />
        <Field name="fullName" label="Ad soyad" required />
        <Field name="email" label="E-posta" type="email" required />
        <Field name="title" label="Unvan" defaultValue="Satış uzmanı" />
        <Field name="regionCode" label="Bölge" defaultValue={staff.regionCode || 'IST'} />
        <Field name="password" label="Şifre" />
        <button className="apple-btn sm:col-span-3">Ekibe al</button>
      </form>
      <div className="space-y-2">
        {sales.map((row: any) => (
          <form key={row.id} action={setStaffActiveAction} className="apple-panel flex items-center justify-between rounded-[20px] px-4 py-3">
            <div>
              <p className="text-[14px] font-semibold">{row.fullName}</p>
              <p className="text-[12px] text-[#86868b]">{row.email} · {row.regionCode}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status={row.isActive ? 'ACTIVE' : 'SUSPENDED'} />
              <input type="hidden" name="id" value={row.id} />
              <input type="hidden" name="isActive" value={row.isActive ? 'false' : 'true'} />
              <button className="apple-btn-secondary apple-btn-compact">{row.isActive ? 'Kısıtla' : 'Yetki ver'}</button>
            </div>
          </form>
        ))}
      </div>
    </>
  );
}
