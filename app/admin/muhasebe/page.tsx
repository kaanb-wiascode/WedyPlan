import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import {
  createInvoiceAction,
  saveEmployeeAction,
  runPayrollAction,
} from '@/lib/actions/ops';
import {
  AdminHeader,
  AlertStrip,
  BarRow,
  Field,
  MetricCard,
  PulseFeed,
  ReportBar,
  TaskList,
  money,
} from '@/components/admin/ops/ui';
import { completeTaskAction, saveTaskAction } from '@/lib/actions/ops';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function FinanceDeskPage() {
  const staff = await requireStaff(['SUPER', 'FINANCE', 'REGION']);
  const ops = await getOpsSnapshot(staff);
  const readOnly = staff.desk === 'REGION';
  const maxInv = Math.max(...ops.invoices.map((row: any) => row.grandTotal), 1);

  return (
    <>
      <AdminHeader
        kicker="Paraşüt tarzı ön muhasebe"
        title="Muhasebe ve finans"
        description={readOnly ? 'Bölge müdürü görünümü: fatura, borç, stok ve bordro salt okunur.' : 'Fatura, GİB kuyruğu, borçlandırma, stok, İK ve bordro. Entegrasyon anahtarlarını sistemden bağlayın.'}
        actions={<ReportBar slug="finance" />}
      />
      <AlertStrip alerts={ops.alerts} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Kesilen fatura" value={money(ops.kpis.invoiceTotal)} href="/admin/muhasebe/faturalar" />
        <MetricCard label="Geciken borç" value={ops.kpis.overdueDebt} href="/admin/muhasebe/borclar" />
        <MetricCard label="Kritik stok" value={ops.kpis.lowStock} href="/admin/muhasebe/stok" />
        <MetricCard label="Paket MRR" value={money(ops.kpis.packageMrr)} href="/admin/paketler" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="apple-panel space-y-3 rounded-[24px] p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Nakit akışı</h2>
            <Link href="/admin/muhasebe/faturalar" className="apple-link text-[12px]">Faturalar</Link>
          </div>
          {ops.invoices.slice(0, 6).map((row: any) => (
            <BarRow key={row.id} label={row.number} value={row.grandTotal} max={maxInv} suffix="₺" />
          ))}
        </section>
        <PulseFeed items={ops.pulse.filter((item) => item.category === 'INVOICE' || item.category === 'PAYROLL' || item.category === 'GIB' || item.category === 'STOCK')} />
      </div>

      {!readOnly ? (
        <div className="grid gap-5 lg:grid-cols-2">
          <form action={createInvoiceAction} className="apple-panel grid gap-3 rounded-[24px] p-5">
            <h2 className="text-[16px] font-semibold">Hızlı fatura</h2>
            <Field name="partyName" label="Cari / unvan" required />
            <Field name="partyTaxNo" label="VKN / TCKN" />
            <Field name="subTotal" label="Matrah ₺" type="number" required />
            <Field name="description" label="Açıklama" />
            <Field name="dueDate" label="Vade" type="date" />
            <button className="apple-btn">Fatura kes</button>
          </form>
          <form action={runPayrollAction} className="apple-panel grid gap-3 rounded-[24px] p-5">
            <h2 className="text-[16px] font-semibold">Bordro dönemi</h2>
            <Field name="period" label="Dönem (YYYY-AA)" defaultValue={new Date().toISOString().slice(0, 7)} />
            <p className="text-[13px] text-[#86868b]">{ops.employees.length} aktif çalışan. Net ≈ brüt × 0,72 (taslak SGK).</p>
            <button className="apple-btn">Bordroyu çalıştır</button>
          </form>
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        <TaskList tasks={ops.tasks} action={saveTaskAction} completeAction={completeTaskAction} />
        {!readOnly ? (
          <form action={saveEmployeeAction} className="apple-panel grid gap-3 rounded-[24px] p-5">
            <h2 className="text-[16px] font-semibold">Çalışan ekle</h2>
            <Field name="fullName" label="Ad soyad" required />
            <Field name="title" label="Unvan" />
            <Field name="department" label="Departman" />
            <Field name="salaryGross" label="Brüt ₺" type="number" />
            <Field name="startDate" label="İşe giriş" type="date" />
            <button className="apple-btn-secondary">Kaydet</button>
          </form>
        ) : (
          <section className="apple-panel space-y-2 rounded-[24px] p-5">
            <h2 className="text-[16px] font-semibold">Çalışanlar</h2>
            {ops.employees.map((row: any) => (
              <p key={row.id} className="text-[13px]">{row.fullName} · {money(row.salaryGross)}</p>
            ))}
          </section>
        )}
      </div>
    </>
  );
}
