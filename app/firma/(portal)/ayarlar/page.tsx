import { redirect } from 'next/navigation';
import { getVendorWorkspace } from '@/lib/vendor/workspace';
import { VendorPageHeader } from '@/components/vendor/portal/VendorPageHeader';
import { saveVendorSettingsAction } from '@/lib/actions/vendor-workspace';
import { AccountSecurityCard } from '@/components/shared/account/AccountSecurityCard';

export const dynamic = 'force-dynamic';

export default async function VendorSettingsPage() {
  const data = await getVendorWorkspace();
  if (!data) redirect('/giris');

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <VendorPageHeader
        kicker="Hesap"
        title="Firma ayarları"
        description="Unvan ve telefon. Yasal evrak için Evrak / KYC, abonelik için Paketler sayfasını kullanın."
      />
      <form action={saveVendorSettingsAction} className="apple-panel grid gap-3 rounded-[24px] p-5">
        <label className="text-[12px] text-[#86868b]">
          Ticari unvan
          <input name="businessName" defaultValue={data.vendor.businessName} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
        </label>
        <label className="text-[12px] text-[#86868b]">
          Telefon
          <input name="phone" defaultValue={data.vendor.phone || ''} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
        </label>
        <p className="text-[12px] text-[#86868b]">KYC: {data.vendor.kycStatus || 'NOT_STARTED'} · Paket: {data.vendor.activePackageCode || 'yok'}</p>
        <button className="apple-btn">Kaydet</button>
      </form>

      <div className="apple-panel space-y-3 rounded-[24px] p-5">
        <h2 className="text-[15px] font-semibold text-[#1d1d1f]">Giriş bilgileri</h2>
        <p className="text-[12px] text-[#86868b]">Firma paneline giriş e-postası ve şifresi.</p>
        <AccountSecurityCard />
      </div>
    </div>
  );
}
