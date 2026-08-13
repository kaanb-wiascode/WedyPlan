import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/require-admin';
import { getCockpitSnapshot } from '@/lib/admin/cockpit-data';
import { AdminHeader, EmptyState, MetricCard, StatusPill, formatWhen } from '@/components/admin/cockpit/ui';
import { ImpersonateButton } from '@/components/admin/cockpit/ImpersonateButton';
import { LiveClock } from '@/components/admin/cockpit/LiveClock';
import { sendBroadcastAction } from '@/lib/actions/admin-cockpit';

export const dynamic = 'force-dynamic';

export default async function AdminCockpitPage() {
  await requireAdmin();
  const data = await getCockpitSnapshot();

  return (
    <>
      <AdminHeader
        kicker="WedyPlan kokpit"
        title="Komuta merkezi"
        description="Çiftler, firmalar, onay kuyruğu, talepler ve sistem şalterleri gerçek zamanlı Neon verisiyle."
        actions={<LiveClock initial={data.generatedAt} />}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <MetricCard label="Kullanıcı" value={data.counts.users} href="/admin/kullanicilar" />
        <MetricCard label="Çift" value={data.counts.couples} href="/admin/ciftler" />
        <MetricCard label="Firma" value={data.counts.vendors} href="/admin/firmalar" />
        <MetricCard label="Onay bekleyen" value={data.counts.pendingVendors} hint="Firma kuyruğu" href="/admin/onaylar" />
        <MetricCard label="Açık talep" value={data.counts.openLeads} href="/admin/talepler" />
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        <HealthChip ok={data.health.database} label="Veritabanı" on="Bağlı" off="Kopuk" />
        <HealthChip ok={!data.health.maintenanceMode} label="Yayın" on="Açık" off="Bakım" />
        <HealthChip ok={!data.health.payoutHold} label="Hakediş" on="Akışta" off="Bloke" />
        <HealthChip ok={data.counts.sessions >= 0} label="Oturum" on={`${data.counts.sessions} aktif`} off="Yok" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="apple-panel space-y-3 rounded-[24px] p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Onay kuyruğu</h2>
            <Link href="/admin/onaylar" className="apple-link text-[12px]">Tümü</Link>
          </div>
          {data.pendingVendors.length === 0 ? (
            <EmptyState text="Bekleyen firma başvurusu yok." />
          ) : (
            data.pendingVendors.map((vendor) => (
              <div key={vendor.id} className="flex items-center justify-between gap-3 rounded-2xl bg-[#f5f5f7] px-4 py-3">
                <div>
                  <p className="text-[13px] font-semibold">{vendor.businessName}</p>
                  <p className="text-[12px] text-[#86868b]">
                    {vendor.businessCategory} · {vendor.city || 'Şehir yok'} · {vendor.owner?.email}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill status={vendor.status} />
                  <Link href={`/admin/firmalar/${vendor.id}`} className="apple-btn-secondary apple-btn-compact">İncele</Link>
                </div>
              </div>
            ))
          )}
        </section>

        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Canlı duyuru</h2>
          <form action={sendBroadcastAction} className="space-y-3">
            <select name="audience" className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[13px]">
              <option value="ALL">Tüm kullanıcılar</option>
              <option value="COUPLE">Çiftler</option>
              <option value="VENDOR">Firmalar</option>
            </select>
            <textarea name="message" required rows={4} placeholder="Panele düşecek mesaj" className="w-full rounded-xl border border-black/10 px-3 py-2 text-[13px]" />
            <button type="submit" className="apple-btn w-full">Yayınla</button>
          </form>
          {data.broadcasts.slice(0, 3).map((item) => (
            <p key={item.id} className="text-[12px] text-[#86868b]">
              {formatWhen(item.createdAt)} · {item.message}
            </p>
          ))}
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
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

        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Son firmalar</h2>
            <Link href="/admin/firmalar" className="apple-link text-[12px]">Yönet</Link>
          </div>
          {data.recentVendors.length === 0 ? <EmptyState text="Kayıtlı firma yok." /> : data.recentVendors.map((vendor) => (
            <div key={vendor.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold">{vendor.businessName}</p>
                <p className="text-[12px] text-[#86868b]">{vendor.owner?.email} · {vendor.status}</p>
              </div>
              <ImpersonateButton targetUserId={vendor.userId} portal="VENDOR" />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

function HealthChip({ ok, label, on, off }: { ok: boolean; label: string; on: string; off: string }) {
  return (
    <div className="apple-panel flex items-center justify-between rounded-2xl px-4 py-3">
      <span className="text-[12px] text-[#86868b]">{label}</span>
      <span className={`text-[12px] font-semibold ${ok ? 'text-emerald-600' : 'text-rose-600'}`}>
        {ok ? on : off}
      </span>
    </div>
  );
}
