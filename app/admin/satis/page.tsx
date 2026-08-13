import Link from 'next/link';
import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { DEAL_STAGES } from '@/lib/ops/catalog';
import { addActivityAction, moveDealAction, saveDealAction, savePartyAction } from '@/lib/actions/ops';
import { completeTaskAction, saveTaskAction } from '@/lib/actions/ops';
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

export const dynamic = 'force-dynamic';

export default async function SalesDeskPage() {
  const staff = await requireStaff(['SUPER', 'SALES', 'REGION']);
  const ops = await getOpsSnapshot(staff);
  const max = Math.max(...ops.dealPipeline.map((row) => row.amount), 1);

  return (
    <>
      <AdminHeader
        kicker="HubSpot / Zoho tarzı CRM"
        title="Satış ve pazarlama"
        description="Günlük görüşme, anlaşma hunisi ve vade. Kazanılan anlaşma bölge onayından sonra muhasebeye borç olarak düşer."
        actions={<ReportBar slug="sales" />}
      />
      <AlertStrip alerts={ops.alerts} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Pipeline" value={money(ops.kpis.dealValue)} href="/admin/satis/anlasmalar" />
        <MetricCard label="Açık kart" value={ops.kpis.openDeals} href="/admin/satis/musteriler" />
        <MetricCard label="Firma talebi" value={ops.vendorRequests.filter((r: any) => r.status === 'OPEN').length} href="/admin/satis/talepler" />
        <MetricCard label="Bugünkü görev" value={ops.kpis.openTasks} href="/admin/gorevler" />
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <section className="apple-panel space-y-3 rounded-[24px] p-5 lg:col-span-2">
          <div className="flex justify-between">
            <h2 className="text-[16px] font-semibold">Huni</h2>
            <Link href="/admin/satis/anlasmalar" className="apple-link text-[12px]">Kanban</Link>
          </div>
          {ops.dealPipeline.map((row) => (
            <BarRow key={row.stage} label={`${DEAL_STAGES.find((s) => s.id === row.stage)?.label || row.stage} · ${row.count}`} value={row.amount} max={max} suffix="₺" />
          ))}
        </section>
        <PulseFeed items={ops.pulse.filter((i) => i.category === 'DEAL' || i.category === 'CRM' || i.category === 'PACKAGE')} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <form action={savePartyAction} className="apple-panel grid gap-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Müşteri kartı</h2>
          <Field name="name" label="Unvan / isim" required />
          <Field name="phone" label="Telefon" />
          <Field name="email" label="E-posta" />
          <Field name="city" label="Şehir" />
          <select name="kind" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]">
            <option value="PROSPECT">Aday</option>
            <option value="VENDOR">Firma</option>
            <option value="COUPLE">Çift</option>
          </select>
          <button className="apple-btn">Ekle</button>
        </form>
        <form action={saveDealAction} className="apple-panel grid gap-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Anlaşma</h2>
          <select name="partyId" required className="h-10 rounded-xl border border-black/10 px-3 text-[13px]">
            <option value="">Müşteri seç</option>
            {ops.parties.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <Field name="title" label="Başlık" required />
          <Field name="amount" label="Sözleşme tutarı" type="number" required />
          <Field name="paymentTerms" label="Vade / ödeme" defaultValue="30 gün" />
          <Field name="installmentCount" label="Taksit" type="number" defaultValue={1} />
          <button className="apple-btn">Huniye al</button>
        </form>
      </div>
      <TaskList tasks={ops.tasks} action={saveTaskAction} completeAction={completeTaskAction} />
    </>
  );
}
