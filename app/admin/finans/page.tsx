import { requireAdmin } from '@/lib/admin/require-admin';
import { getFinanceSnapshot } from '@/lib/admin/cockpit-data';
import { saveCommissionAction, savePlatformSettingAction, upsertSubscriptionPlanAction } from '@/lib/actions/admin-cockpit';
import { AdminHeader, MetricCard, StatusPill, formatWhen } from '@/components/admin/cockpit/ui';

export const dynamic = 'force-dynamic';

export default async function AdminFinancePage() {
  await requireAdmin();
  const data = await getFinanceSnapshot();

  return (
    <>
      <AdminHeader
        kicker="Kontrol"
        title="Finans"
        description="Komisyon, hakediş kilidi, abonelik paketleri ve ödeme hareketleri."
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Komisyon" value={`%${data.commissionRate}`} />
        <MetricCard label="Hakediş" value={data.payoutHold ? 'Bloke' : 'Açık'} />
        <MetricCard label="Abonelik" value={data.subscriptionCount} />
        <MetricCard label="Son ödemeler" value={data.payments.length} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <form action={saveCommissionAction} className="apple-panel space-y-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Komisyon oranı</h2>
          <input name="commissionRate" type="number" defaultValue={data.commissionRate} className="h-10 w-28 rounded-xl border border-black/10 px-3 text-[13px]" />
          <button className="apple-btn apple-btn-compact">Kaydet</button>
        </form>
        <form action={savePlatformSettingAction} className="apple-panel space-y-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Hakediş şalteri</h2>
          <input type="hidden" name="key" value="payout_hold" />
          <input type="hidden" name="value" value={data.payoutHold ? 'false' : 'true'} />
          <p className="text-[13px] text-[#86868b]">Şu an {data.payoutHold ? 'tüm hakedişler durduruldu.' : 'ödemeler normal akıyor.'}</p>
          <button className="apple-btn apple-btn-compact">{data.payoutHold ? 'Kilidi aç' : 'Hakedişi durdur'}</button>
        </form>
      </div>

      <section className="apple-panel space-y-4 rounded-[24px] p-5">
        <h2 className="text-[16px] font-semibold">Abonelik paketi</h2>
        <form action={upsertSubscriptionPlanAction} className="grid gap-2 sm:grid-cols-4">
          <input name="code" required placeholder="VENDOR_PRO" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="name" required placeholder="Paket adı" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="price" type="number" required placeholder="Fiyat" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <button className="apple-btn apple-btn-compact">Paketi kaydet</button>
        </form>
        <div className="grid gap-3 sm:grid-cols-3">
          {data.plans.map((plan: any) => (
            <div key={plan.id} className="rounded-2xl bg-[#f5f5f7] p-4">
              <p className="text-[13px] font-semibold">{plan.name}</p>
              <p className="text-[12px] text-[#86868b]">{plan.code} · ₺{String(plan.price)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="apple-panel space-y-2 rounded-[24px] p-5">
        <h2 className="text-[16px] font-semibold">Ödemeler</h2>
        {data.payments.length === 0 ? (
          <p className="text-[13px] text-[#86868b]">Henüz ödeme kaydı yok.</p>
        ) : (
          data.payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between text-[13px]">
              <span>{payment.type} · ₺{payment.grossAmount}</span>
              <span className="flex items-center gap-2">
                <StatusPill status={payment.status} />
                <span className="text-[#86868b]">{formatWhen(payment.createdAt)}</span>
              </span>
            </div>
          ))
        )}
      </section>
    </>
  );
}
