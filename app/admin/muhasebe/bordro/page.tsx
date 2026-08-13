import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { runPayrollAction, saveEmployeeAction } from '@/lib/actions/ops';
import { AdminHeader, Field, ReportBar, StatusPill, money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function PayrollPage() {
  const staff = await requireStaff(['SUPER', 'FINANCE', 'REGION']);
  const ops = await getOpsSnapshot(staff);
  const write = staff.desk !== 'REGION';

  return (
    <>
      <AdminHeader
        kicker="İnsan kaynakları"
        title="İK ve bordro"
        description="Çalışan kartı, brüt ücret ve dönemsel bordro. GİB / e-bildirge köprüsü entegrasyon anahtarından açılır."
        actions={<ReportBar slug="payroll" />}
      />
      {write ? (
        <div className="grid gap-5 lg:grid-cols-2">
          <form action={saveEmployeeAction} className="apple-panel grid gap-3 rounded-[24px] p-5">
            <h2 className="text-[16px] font-semibold">Çalışan</h2>
            <Field name="fullName" label="Ad soyad" required />
            <Field name="title" label="Unvan" />
            <Field name="department" label="Departman" />
            <Field name="salaryGross" label="Brüt" type="number" />
            <Field name="startDate" label="İşe giriş" type="date" />
            <button className="apple-btn">Ekle</button>
          </form>
          <form action={runPayrollAction} className="apple-panel grid gap-3 rounded-[24px] p-5">
            <h2 className="text-[16px] font-semibold">Bordro çalıştır</h2>
            <Field name="period" label="Dönem" defaultValue={new Date().toISOString().slice(0, 7)} />
            <button className="apple-btn">Hesapla</button>
          </form>
        </div>
      ) : null}
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="apple-panel space-y-2 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Çalışanlar</h2>
          {ops.employees.map((row: any) => (
            <div key={row.id} className="flex justify-between text-[13px]">
              <span>{row.fullName} · {row.title}</span>
              <span>{money(row.salaryGross)}</span>
            </div>
          ))}
        </section>
        <section className="apple-panel space-y-2 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Dönemler</h2>
          {ops.payrolls.map((row: any) => (
            <div key={row.id} className="flex items-center justify-between text-[13px]">
              <span>{row.period} · {row.employeeCount} kişi · {money(row.totalNet)}</span>
              <StatusPill status={row.status} />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
