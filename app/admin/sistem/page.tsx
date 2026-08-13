import { requireAdmin } from '@/lib/admin/require-admin';
import { getCockpitSnapshot } from '@/lib/admin/cockpit-data';
import { savePlatformSettingAction, toggleFeatureFlagAction } from '@/lib/actions/admin-cockpit';
import { AdminHeader } from '@/components/admin/cockpit/ui';

export const dynamic = 'force-dynamic';

export default async function AdminSystemPage() {
  await requireAdmin();
  const data = await getCockpitSnapshot();

  return (
    <>
      <AdminHeader
        kicker="Kontrol"
        title="Sistem"
        description="Bakım modu, özellik bayrakları ve platform şalterleri. Bu ayarlar veritabanında saklanır."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <form action={savePlatformSettingAction} className="apple-panel space-y-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Bakım modu</h2>
          <p className="text-[13px] text-[#86868b]">
            {data.settings.maintenanceMode ? 'Site bakımda olarak işaretli.' : 'Yayın açık.'}
          </p>
          <input type="hidden" name="key" value="maintenance_mode" />
          <input type="hidden" name="value" value={data.settings.maintenanceMode ? 'false' : 'true'} />
          <button className="apple-btn">{data.settings.maintenanceMode ? 'Yayını aç' : 'Bakıma al'}</button>
        </form>

        <div className="apple-panel space-y-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Sağlık</h2>
          <p className="text-[13px]">Veritabanı: {data.health.database ? 'bağlı' : 'kopuk'}</p>
          <p className="text-[13px]">Aktif oturum: {data.counts.sessions}</p>
          <p className="text-[13px]">Komisyon: %{data.settings.commissionRate}</p>
        </div>
      </div>

      <section className="apple-panel space-y-3 rounded-[24px] p-5">
        <h2 className="text-[16px] font-semibold">Özellik bayrakları</h2>
        {data.flags.map((flag) => (
          <form key={flag.key} action={toggleFeatureFlagAction} className="flex items-center justify-between rounded-2xl bg-[#f5f5f7] px-4 py-3">
            <div>
              <p className="text-[13px] font-semibold">{flag.name}</p>
              <p className="text-[11px] text-[#86868b]">{flag.key}</p>
            </div>
            <input type="hidden" name="key" value={flag.key} />
            <input type="hidden" name="isEnabled" value={flag.isEnabled ? 'false' : 'true'} />
            <button className={`apple-btn-compact ${flag.isEnabled ? 'apple-btn' : 'apple-btn-secondary'}`}>
              {flag.isEnabled ? 'Açık' : 'Kapalı'}
            </button>
          </form>
        ))}
      </section>
    </>
  );
}
