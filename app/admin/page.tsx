import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { getCockpitSnapshot } from '@/lib/admin/cockpit-data';
import { deskHome } from '@/lib/ops/catalog';
import { ImpersonateButton } from '@/components/admin/cockpit/ImpersonateButton';
import { LiveClock } from '@/components/admin/cockpit/LiveClock';
import { sendBroadcastAction } from '@/lib/actions/admin-cockpit';
import {
  AdminHeader,
  AlertStrip,
  BarRow,
  EmptyState,
  MetricCard,
  PulseFeed,
  ReportBar,
  StatusPill,
  TaskList,
  formatWhen,
  money,
} from '@/components/admin/ops/ui';
import { completeTaskAction, saveTaskAction } from '@/lib/actions/ops';

export const dynamic = 'force-dynamic';

export default async function AdminCockpitPage() {
  const staff = await requireStaff();
  if (staff.desk !== 'SUPER') redirect(deskHome(staff.desk));
  const [ops, data] = await Promise.all([getOpsSnapshot(staff), getCockpitSnapshot()]);
  const maxPipe = Math.max(...ops.dealPipeline.map((row) => row.amount), 1);

  return (
    <>
      <AdminHeader
        kicker="WedyPlan işletim sistemi"
        title="Komuta merkezi"
        description="Dört masa, paketler, evrak, finans ve canlı müşteri hattı tek ekranda. Süper admin her yetkiyi ve logu buradan görür."
        actions={
          <div className="flex flex-wrap gap-2">
            <LiveClock initial={ops.generatedAt} />
            <ReportBar slug="command" />
          </div>
        }
      />

      <AlertStrip alerts={ops.alerts} />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Paket MRR" value={money(ops.kpis.packageMrr)} href="/admin/paketler" />
        <MetricCard label="Açık anlaşma" value={money(ops.kpis.dealValue)} href="/admin/satis/anlasmalar" />
        <MetricCard label="Evrak kuyruğu" value={ops.kpis.pendingKyc} href="/admin/evrak" />
        <MetricCard label="SLA aşımı" value={ops.kpis.slaBreaches} href="/admin/crm/talepler" />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <MetricCard label="Kullanıcı" value={data.counts.users} href="/admin/kullanicilar" />
        <MetricCard label="Çift" value={data.counts.couples} href="/admin/ciftler" />
        <MetricCard label="Firma" value={data.counts.vendors} href="/admin/firmalar" />
        <MetricCard label="Onay bekleyen" value={data.counts.pendingVendors} href="/admin/onaylar" />
        <MetricCard label="Destek" value={ops.kpis.openCases} href="/admin/crm" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="apple-panel space-y-4 rounded-[24px] p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Satış hunisi</h2>
            <Link href="/admin/satis" className="apple-link text-[12px]">Satış masası</Link>
          </div>
          {ops.dealPipeline.map((row) => (
            <BarRow key={row.stage} label={`${row.stage} · ${row.count}`} value={row.amount} max={maxPipe} suffix="₺" />
          ))}
        </section>
        <PulseFeed items={ops.pulse} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <TaskList tasks={ops.tasks} action={saveTaskAction} completeAction={completeTaskAction} />
        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Canlı duyuru</h2>
          <form action={sendBroadcastAction} className="space-y-3">
            <select name="audience" className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[13px]">
              <option value="ALL">Tüm kullanıcılar</option>
              <option value="COUPLE">Çiftler</option>
              <option value="VENDOR">Firmalar</option>
            </select>
            <textarea name="message" required rows={3} placeholder="Panele düşecek mesaj" className="w-full rounded-xl border border-black/10 px-3 py-2 text-[13px]" />
            <button type="submit" className="apple-btn w-full">Yayınla</button>
          </form>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Evrak bekleyen</h2>
            <Link href="/admin/evrak" className="apple-link text-[12px]">KYC</Link>
          </div>
          {ops.kycPending.length === 0 ? <EmptyState text="Bekleyen evrak yok." /> : ops.kycPending.slice(0, 5).map((row: any) => (
            <div key={row.id} className="flex items-center justify-between text-[13px]">
              <span>{row.legalTitle || row.vendorId}</span>
              <StatusPill status={row.kycStatus} />
            </div>
          ))}
        </section>
        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Son çiftler</h2>
            <Link href="/admin/ciftler" className="apple-link text-[12px]">Yönet</Link>
          </div>
          {data.recentCouples.length === 0 ? <EmptyState text="Kayıtlı çift yok." /> : data.recentCouples.map((couple) => (
            <div key={couple.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold">{couple.partnerOneName}{couple.partnerTwoName ? ` & ${couple.partnerTwoName}` : ''}</p>
                <p className="text-[12px] text-[#86868b]">{couple.owner?.email} · {couple.city || 'Şehir yok'}</p>
              </div>
              <ImpersonateButton targetUserId={couple.userId} portal="COUPLE" />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
