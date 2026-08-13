import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { AdminHeader, ReportBar, MetricCard, money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

const REPORTS = [
  { slug: 'command', name: 'Komuta özeti', desks: 'SUPER' },
  { slug: 'packages', name: 'Paket satışları', desks: 'SUPER / FINANS' },
  { slug: 'kyc', name: 'Evrak kuyruğu', desks: 'FINANS' },
  { slug: 'finance', name: 'Gelir-gider ve fatura', desks: 'FINANS / BÖLGE' },
  { slug: 'invoices', name: 'GİB fatura defteri', desks: 'FINANS' },
  { slug: 'debts', name: 'Vade yaşlandırma', desks: 'FINANS / SATIŞ' },
  { slug: 'stock', name: 'Stok sayımı', desks: 'FINANS' },
  { slug: 'payroll', name: 'Bordro dönemi', desks: 'FINANS' },
  { slug: 'sales', name: 'Satış hunisi', desks: 'SATIŞ / BÖLGE' },
  { slug: 'deals', name: 'Anlaşma listesi', desks: 'SATIŞ / BÖLGE' },
  { slug: 'customers', name: 'Müşteri envanteri', desks: 'SATIŞ / CRM' },
  { slug: 'region', name: 'Bölge performansı', desks: 'BÖLGE' },
  { slug: 'crm', name: 'Destek SLA', desks: 'CRM' },
  { slug: 'tickets', name: 'Talep dökümü', desks: 'CRM' },
  { slug: 'staff', name: 'Ekip yetkileri', desks: 'SUPER / BÖLGE' },
  { slug: 'tasks', name: 'Görev tahakkuku', desks: 'Tümü' },
];

export default async function ReportsPage() {
  const staff = await requireStaff();
  const ops = await getOpsSnapshot(staff);

  return (
    <>
      <AdminHeader
        kicker="BI"
        title="Raporlar"
        description="Her masa kendi yetkisindeki veriyi PDF veya Excel olarak çeker. Excel dosyası .xls olarak iner (Excel / Numbers açar)."
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="MRR" value={money(ops.kpis.packageMrr)} />
        <MetricCard label="Pipeline" value={money(ops.kpis.dealValue)} />
        <MetricCard label="Fatura" value={money(ops.kpis.invoiceTotal)} />
        <MetricCard label="Açık destek" value={ops.kpis.openCases} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((report) => (
          <section key={report.slug} className="apple-panel space-y-3 rounded-[20px] p-4">
            <div>
              <p className="text-[14px] font-semibold">{report.name}</p>
              <p className="text-[12px] text-[#86868b]">{report.desks}</p>
            </div>
            <ReportBar slug={report.slug} />
          </section>
        ))}
      </div>
    </>
  );
}
