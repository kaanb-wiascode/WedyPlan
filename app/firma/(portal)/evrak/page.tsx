import { getSession } from '@/lib/auth/session';
import { COMPANY_TYPES, docsForCompany } from '@/lib/ops/catalog';
import { saveLegalProfileAction, submitKycAction, uploadKycDocAction } from '@/lib/actions/ops-vendor';
import { getVendorEntitlements } from '@/lib/ops/data';
import { AdminHeader, StatusPill } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function VendorKycPage() {
  const session = await getSession();
  const data = session?.userId ? await getVendorEntitlements(session.userId) : null;
  const type = data?.legal?.companyType || 'SOLE';
  const needed = docsForCompany(type);

  return (
    <div className="mx-auto max-w-4xl space-y-5 p-6">
      <AdminHeader
        kicker="Uyumluluk"
        title="Evrak yükleme"
        description="Kayıt onayından sonra şirket türünüze göre evrakları yükleyin. İnceleme bitince paneliniz aktifleşir."
      />
      <p className="text-[13px] text-[#86868b]">Durum: <StatusPill status={data?.kycStatus || 'NOT_STARTED'} /></p>

      <form action={saveLegalProfileAction} className="apple-panel grid gap-3 rounded-[24px] p-5 sm:grid-cols-2">
        <label className="text-[12px] text-[#86868b]">
          Şirket türü
          <select name="companyType" defaultValue={type} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]">
            {COMPANY_TYPES.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        <label className="text-[12px] text-[#86868b]">Unvan<input name="legalTitle" defaultValue={data?.legal?.legalTitle || data?.businessName || ''} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" /></label>
        <label className="text-[12px] text-[#86868b]">Yetkili<input name="authorizedName" defaultValue={data?.legal?.authorizedName || ''} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" /></label>
        <label className="text-[12px] text-[#86868b]">Telefon<input name="phone" defaultValue={data?.legal?.phone || ''} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" /></label>
        <label className="text-[12px] text-[#86868b]">E-posta<input name="email" type="email" defaultValue={data?.legal?.email || ''} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" /></label>
        <label className="text-[12px] text-[#86868b] sm:col-span-2">Adres<input name="address" defaultValue={data?.legal?.address || ''} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" /></label>
        <label className="text-[12px] text-[#86868b]">VKN<input name="taxNumber" defaultValue={data?.legal?.taxNumber || ''} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" /></label>
        <label className="text-[12px] text-[#86868b]">Vergi dairesi<input name="taxOffice" defaultValue={data?.legal?.taxOffice || ''} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" /></label>
        <button className="apple-btn sm:col-span-2">Bilgileri kaydet</button>
      </form>

      <div className="space-y-3">
        {needed.filter((doc) => doc.file).map((doc) => {
          const uploaded = data?.docs?.find((row: any) => row.docType === doc.id);
          return (
            <form key={doc.id} action={uploadKycDocAction} className="apple-panel flex flex-wrap items-center justify-between gap-3 rounded-[20px] p-4">
              <div>
                <p className="text-[14px] font-semibold">{doc.label}</p>
                <p className="text-[12px] text-[#86868b]">{doc.accept} {uploaded ? `· ${uploaded.fileName}` : ''}</p>
              </div>
              <div className="flex items-center gap-2">
                {uploaded ? <StatusPill status={uploaded.status} /> : null}
                <input type="hidden" name="docType" value={doc.id} />
                <input name="file" type="file" accept={doc.accept} required className="text-[12px]" />
                <button className="apple-btn apple-btn-compact">Yükle</button>
              </div>
            </form>
          );
        })}
      </div>

      <form action={submitKycAction}>
        <button className="apple-btn">İncelemeye gönder</button>
      </form>
    </div>
  );
}
