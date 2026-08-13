import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { VENDOR_FEATURES } from '@/lib/ops/catalog';
import { assignPackageAction, savePackageAction } from '@/lib/actions/ops';
import { AdminHeader, Field, MetricCard, ReportBar, StatusPill, money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function PackagesPage() {
  const staff = await requireStaff(['SUPER', 'FINANCE', 'SALES', 'REGION']);
  const ops = await getOpsSnapshot(staff);

  return (
    <>
      <AdminHeader
        kicker="Ticari ürün"
        title="Firma paketleri"
        description="Vitrin, Profesyonel ve Prestij paketlerini oluşturun. Hangi portal özelliğinin hangi pakette açılacağını işaretleyin, satış adedini canlı izleyin."
        actions={<ReportBar slug="packages" />}
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="MRR" value={money(ops.kpis.packageMrr)} />
        <MetricCard label="Aktif abonelik" value={ops.kpis.activePackages} />
        <MetricCard label="Paket sayısı" value={ops.packages.length} />
        <MetricCard label="Bekleyen talep" value={ops.sales.filter((row: any) => row.status === 'PENDING').length} />
      </div>

      <form action={savePackageAction} className="apple-panel grid gap-3 rounded-[24px] p-5 sm:grid-cols-3">
        <Field name="code" label="Kod" required />
        <Field name="name" label="Paket adı" required />
        <Field name="tagline" label="Kısa vaat" />
        <Field name="monthlyPrice" label="Aylık ₺" type="number" required />
        <Field name="yearlyPrice" label="Yıllık ₺" type="number" required />
        <Field name="commissionPct" label="Komisyon %" type="number" />
        <Field name="leadQuota" label="Talep kotası" type="number" />
        <Field name="featuredSlots" label="Öne çıkan slot" type="number" />
        <Field name="teamSeats" label="Ekip koltuğu" type="number" />
        <label className="sm:col-span-3 block text-[12px] text-[#86868b]">
          Özellikler (virgülle feature key)
          <input name="features" placeholder={VENDOR_FEATURES.map((f) => f.key).join(', ')} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
        </label>
        <button className="apple-btn sm:col-span-3">Paket kaydet</button>
      </form>

      <div className="grid gap-4 lg:grid-cols-3">
        {ops.packages.map((pack: any) => (
          <section key={pack.id} className="apple-panel space-y-3 rounded-[24px] p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[18px] font-semibold">{pack.name}</p>
                <p className="text-[12px] text-[#86868b]">{pack.tagline}</p>
              </div>
              <StatusPill status={pack.isActive ? 'ACTIVE' : 'SUSPENDED'} />
            </div>
            <p className="text-[28px] font-semibold">{money(pack.monthlyPrice)}<span className="text-[13px] font-normal text-[#86868b]"> / ay</span></p>
            <p className="text-[13px] text-[#86868b]">{pack.soldCount} satış · {money(pack.soldRevenue)}</p>
            <div className="flex flex-wrap gap-1.5">
              {(pack.features || []).map((key: string) => (
                <span key={key} className="apple-chip">{VENDOR_FEATURES.find((f) => f.key === key)?.label || key}</span>
              ))}
            </div>
            <form action={savePackageAction} className="space-y-2">
              <input type="hidden" name="id" value={pack.id} />
              <input type="hidden" name="code" value={pack.code} />
              <input type="hidden" name="name" value={pack.name} />
              <input type="hidden" name="tagline" value={pack.tagline} />
              <input type="hidden" name="monthlyPrice" value={pack.monthlyPrice} />
              <input type="hidden" name="yearlyPrice" value={pack.yearlyPrice} />
              <input type="hidden" name="commissionPct" value={pack.commissionPct} />
              <input type="hidden" name="leadQuota" value={pack.leadQuota} />
              <input type="hidden" name="featuredSlots" value={pack.featuredSlots} />
              <input type="hidden" name="teamSeats" value={pack.teamSeats} />
              <textarea name="features" defaultValue={(pack.features || []).join(', ')} rows={2} className="w-full rounded-xl border border-black/10 px-3 py-2 text-[12px]" />
              <button className="apple-btn-secondary apple-btn-compact">Özellikleri güncelle</button>
            </form>
          </section>
        ))}
      </div>

      <section className="apple-panel space-y-3 rounded-[24px] p-5">
        <h2 className="text-[16px] font-semibold">Paketi firmaya bağla</h2>
        <form action={assignPackageAction} className="grid gap-2 sm:grid-cols-3">
          <select name="vendorId" required className="h-10 rounded-xl border border-black/10 px-3 text-[13px]">
            <option value="">Firma seç</option>
            {ops.vendors.map((vendor: any) => (
              <option key={vendor.id} value={vendor.id}>{vendor.businessName}</option>
            ))}
          </select>
          <select name="packageId" required className="h-10 rounded-xl border border-black/10 px-3 text-[13px]">
            {ops.packages.map((pack: any) => (
              <option key={pack.id} value={pack.id}>{pack.name}</option>
            ))}
          </select>
          <button className="apple-btn">Aktif et</button>
        </form>
      </section>
    </>
  );
}
