import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getVendorWorkspace } from '@/lib/vendor/workspace';
import { catalogHref } from '@/lib/catalog/taxonomy';
import { VendorPageHeader } from '@/components/vendor/portal/VendorPageHeader';
import { money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

export default async function VendorDashboardPage() {
  const data = await getVendorWorkspace();
  if (!data) redirect('/giris');
  const href = data.showcase?.published
    ? catalogHref(data.showcase.categorySlug, data.showcase.citySlug, data.showcase.slug)
    : null;

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <VendorPageHeader
        kicker="Firma ofisi"
        title={data.vendor.businessName}
        description="Vitrin, teklif, çift mesajı, sözleşme ve süreç takibi tek yerde. Tüm işlemler admin denetim kaydına düşer."
        action={
          href ? (
            <Link href={href} className="apple-btn apple-btn-compact" target="_blank">
              Canlı vitrin
            </Link>
          ) : (
            <Link href="/firma/vitrin" className="apple-btn apple-btn-compact">
              Vitrini yayınla
            </Link>
          )
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric href="/firma/talepler" label="Açık talep" value={data.kpis.openLeads} />
        <Metric href="/firma/sozlesmeler" label="Anlaşma" value={money(data.kpis.pipeline)} />
        <Metric href="/firma/mesajlar" label="Sohbet" value={data.kpis.messages} />
        <Metric href="/firma/degerlendirmeler" label="Puan" value={data.kpis.rating || '—'} />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Son talepler</h2>
            <Link href="/firma/talepler" className="apple-link text-[12px]">Tümü</Link>
          </div>
          {data.leads.slice(0, 5).length === 0 ? (
            <p className="text-[13px] text-[#86868b]">Katalogdan gelen teklif talepleri burada görünür.</p>
          ) : (
            data.leads.slice(0, 5).map((lead: any) => (
              <div key={lead.id} className="flex items-center justify-between text-[13px]">
                <span>{lead.coupleNames}</span>
                <span className="text-[#86868b]">{lead.status}</span>
              </div>
            ))
          )}
        </section>
        <section className="apple-panel space-y-3 rounded-[24px] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Süreçler</h2>
            <Link href="/firma/organizasyon" className="apple-link text-[12px]">Takip</Link>
          </div>
          {data.deals.slice(0, 5).length === 0 ? (
            <p className="text-[13px] text-[#86868b]">Teklif gönderince anlaşma ve kilometre taşları oluşur.</p>
          ) : (
            data.deals.slice(0, 5).map((deal: any) => (
              <div key={deal.id} className="flex items-center justify-between text-[13px]">
                <span>{deal.coupleNames}</span>
                <span className="text-[#86868b]">{deal.status}</span>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

function Metric({ href, label, value }: { href: string; label: string; value: string | number }) {
  return (
    <Link href={href} className="apple-panel rounded-[20px] p-4">
      <p className="text-[11px] uppercase tracking-wide text-[#86868b]">{label}</p>
      <p className="mt-1 text-[22px] font-semibold tracking-tight">{value}</p>
    </Link>
  );
}
