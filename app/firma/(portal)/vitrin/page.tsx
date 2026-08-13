import { redirect } from 'next/navigation';
import { getVendorWorkspace } from '@/lib/vendor/workspace';
import { CATALOG_CATEGORIES } from '@/lib/catalog/taxonomy';
import { catalogHref } from '@/lib/catalog/taxonomy';
import { VendorPageHeader } from '@/components/vendor/portal/VendorPageHeader';
import {
  addGalleryItemAction,
  deleteCampaignAction,
  deleteFaqAction,
  deleteOfferAction,
  removeGalleryItemAction,
  saveCampaignAction,
  saveFaqAction,
  saveOfferAction,
  saveShowcaseAction,
} from '@/lib/actions/vendor-workspace';

export const dynamic = 'force-dynamic';

export default async function VendorShowcasePage() {
  const data = await getVendorWorkspace();
  if (!data) redirect('/giris');
  const s = data.showcase;
  const publicHref = s?.published ? catalogHref(s.categorySlug, s.citySlug, s.slug) : null;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <VendorPageHeader
        kicker="Katalog vitrini"
        title="Ziyaretçinin göreceği sayfa"
        description="Görseller, iletişim, konum, menü/paket, avantajlar ve Instagram buradan firmalar sayfasına düşer."
        action={
          publicHref ? (
            <a href={publicHref} className="apple-btn apple-btn-compact" target="_blank" rel="noreferrer">
              Yayındaki sayfa
            </a>
          ) : null
        }
      />

      <form action={saveShowcaseAction} className="apple-panel grid gap-3 rounded-[24px] p-5 sm:grid-cols-2">
        <h2 className="text-[16px] font-semibold sm:col-span-2">Kimlik ve iletişim</h2>
        <Field name="businessName" label="Ticari unvan" defaultValue={data.vendor.businessName} />
        <Field name="slug" label="URL slug" defaultValue={s?.slug} />
        <label className="text-[12px] text-[#86868b]">
          Kategori
          <select name="categorySlug" defaultValue={s?.categorySlug} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]">
            {CATALOG_CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </label>
        <Field name="tagline" label="Kısa slogan" defaultValue={s?.tagline} />
        <label className="text-[12px] text-[#86868b] sm:col-span-2">
          Hakkımızda
          <textarea name="story" defaultValue={s?.story} rows={4} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-[13px]" />
        </label>
        <Field name="contactName" label="Yetkili" defaultValue={s?.contactName} />
        <Field name="contactTitle" label="Unvan" defaultValue={s?.contactTitle} />
        <Field name="contactPhone" label="Telefon" defaultValue={s?.contactPhone} />
        <Field name="contactEmail" label="E-posta" defaultValue={s?.contactEmail} />
        <Field name="whatsapp" label="WhatsApp" defaultValue={s?.whatsapp} />
        <Field name="instagram" label="Instagram" defaultValue={s?.instagram} />
        <Field name="website" label="Web sitesi" defaultValue={s?.website} />
        <Field name="youtube" label="YouTube" defaultValue={s?.youtube} />
        <Field name="address" label="Adres" defaultValue={s?.address} className="sm:col-span-2" />
        <Field name="city" label="Şehir" defaultValue={s?.city} />
        <Field name="district" label="İlçe" defaultValue={s?.district} />
        <Field name="lat" label="Enlem" defaultValue={s?.lat} />
        <Field name="lng" label="Boylam" defaultValue={s?.lng} />
        <Field name="seatedCapacity" label="Oturarak kapasite" type="number" defaultValue={s?.seatedCapacity} />
        <Field name="cocktailCapacity" label="Ayakta kapasite" type="number" defaultValue={s?.cocktailCapacity} />
        <Field name="parking" label="Otopark" type="number" defaultValue={s?.parking} />
        <Field name="priceFrom" label="Başlangıç fiyatı ₺" type="number" defaultValue={s?.priceFrom} />
        <label className="text-[12px] text-[#86868b] sm:col-span-2">
          Tesis olanakları (virgülle)
          <input name="features" defaultValue={(s?.features || []).join(', ')} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
        </label>
        <label className="text-[12px] text-[#86868b] sm:col-span-2">
          Sunduğunuz avantajlar (virgülle)
          <input name="usps" defaultValue={(s?.usps || []).join(', ')} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
        </label>
        <label className="text-[12px] text-[#86868b] sm:col-span-2">
          Ulaşım notu
          <input name="transportNotes" defaultValue={s?.transportNotes} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px]" />
        </label>
        <input type="hidden" name="published" value="true" />
        <button className="apple-btn sm:col-span-2">Kaydet ve katalogda yayınla</button>
      </form>

      <section className="apple-panel space-y-3 rounded-[24px] p-5">
        <h2 className="text-[16px] font-semibold">Galeri</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {data.gallery.map((item: any) => (
            <form key={item.id} action={removeGalleryItemAction} className="relative overflow-hidden rounded-2xl">
              <img src={item.url} alt="" className="h-28 w-full object-cover" />
              <input type="hidden" name="id" value={item.id} />
              <button className="absolute right-2 top-2 rounded-full bg-white/90 px-2 text-[11px]">Sil</button>
            </form>
          ))}
        </div>
        <form action={addGalleryItemAction} className="grid gap-2 sm:grid-cols-[1fr_auto]">
          <input name="url" required placeholder="Görsel URL (Unsplash veya CDN)" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <button className="apple-btn apple-btn-compact">Ekle</button>
        </form>
      </section>

      <section className="apple-panel space-y-3 rounded-[24px] p-5">
        <h2 className="text-[16px] font-semibold">Menü ve paketler</h2>
        {data.offers.map((offer: any) => (
          <form key={offer.id} action={deleteOfferAction} className="flex items-center justify-between rounded-xl bg-[#f5f5f7] px-3 py-2 text-[13px]">
            <span>{offer.name} · {Number(offer.weekendPrice).toLocaleString('tr-TR')} ₺</span>
            <input type="hidden" name="id" value={offer.id} />
            <button className="text-rose-600">Sil</button>
          </form>
        ))}
        <form action={saveOfferAction} className="grid gap-2 sm:grid-cols-2">
          <select name="kind" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]">
            <option value="MENU">Menü</option>
            <option value="PACKAGE">Paket</option>
            <option value="ADDON">Ek hizmet</option>
          </select>
          <input name="name" required placeholder="Ad" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="weekdayPrice" type="number" placeholder="Hafta içi ₺" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="weekendPrice" type="number" placeholder="Hafta sonu ₺" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
          <input name="description" placeholder="İçerik" className="h-10 rounded-xl border border-black/10 px-3 text-[13px] sm:col-span-2" />
          <input name="includes" placeholder="Dahil olanlar, virgülle" className="h-10 rounded-xl border border-black/10 px-3 text-[13px] sm:col-span-2" />
          <button className="apple-btn sm:col-span-2">Paket / menü ekle</button>
        </form>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">Kampanyalar</h2>
          {data.campaigns.map((row: any) => (
            <form key={row.id} action={deleteCampaignAction} className="flex justify-between text-[13px]">
              <span>{row.title} · {row.discount}</span>
              <input type="hidden" name="id" value={row.id} />
              <button className="text-rose-600">Sil</button>
            </form>
          ))}
          <form action={saveCampaignAction} className="grid gap-2">
            <input name="title" required placeholder="Kampanya adı" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
            <input name="discount" placeholder="%15 erken rezervasyon" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
            <button className="apple-btn apple-btn-compact">Ekle</button>
          </form>
        </section>
        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <h2 className="text-[16px] font-semibold">SSS</h2>
          {data.faqs.map((row: any) => (
            <form key={row.id} action={deleteFaqAction} className="space-y-1 text-[13px]">
              <p className="font-medium">{row.question}</p>
              <input type="hidden" name="id" value={row.id} />
              <button className="text-rose-600">Sil</button>
            </form>
          ))}
          <form action={saveFaqAction} className="grid gap-2">
            <input name="question" required placeholder="Soru" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
            <input name="answer" required placeholder="Yanıt" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
            <button className="apple-btn apple-btn-compact">Ekle</button>
          </form>
        </section>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
  type = 'text',
  className = '',
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`text-[12px] text-[#86868b] ${className}`}>
      {label}
      <input name={name} type={type} defaultValue={defaultValue ?? ''} className="mt-1 h-10 w-full rounded-xl border border-black/10 px-3 text-[13px] text-[#1d1d1f]" />
    </label>
  );
}
