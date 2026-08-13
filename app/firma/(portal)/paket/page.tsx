import { getSession } from '@/lib/auth/session';
import { getVendorEntitlements, ensureOpsDefaults } from '@/lib/ops/data';
import { prisma } from '@/lib/db';
import { VENDOR_FEATURES } from '@/lib/ops/catalog';
import { requestPackageAction, createVendorOpsRequestAction } from '@/lib/actions/ops-vendor';
import { AdminHeader, money } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

const db = prisma as any;

export default async function VendorPackagePage() {
  const session = await getSession();
  await ensureOpsDefaults();
  const data = session?.userId ? await getVendorEntitlements(session.userId) : null;
  const packages = await db.vendorPackage.findMany({ where: { isPublic: true, isActive: true }, orderBy: { sortOrder: 'asc' } }).catch(() => []);

  return (
    <div className="mx-auto max-w-5xl space-y-5 p-6">
      <AdminHeader
        kicker="Abonelik"
        title="Paketler"
        description="Vitrin, Profesyonel veya Prestij. Satın alma talebi satış ekibine düşer; bölge onayından sonra panel özellikleri açılır."
      />
      {data?.packageName ? (
        <p className="text-[13px] text-[#86868b]">Aktif paket: <strong>{data.packageName}</strong></p>
      ) : null}
      <div className="grid gap-4 lg:grid-cols-3">
        {packages.map((pack: any) => (
          <section key={pack.id} className="apple-panel flex flex-col rounded-[24px] p-5">
            <p className="text-[18px] font-semibold">{pack.name}</p>
            <p className="text-[12px] text-[#86868b]">{pack.tagline}</p>
            <p className="mt-4 text-[28px] font-semibold">{money(Number(pack.monthlyPrice))}<span className="text-[13px] font-normal text-[#86868b]"> / ay</span></p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(pack.features || []).map((key: string) => (
                <span key={key} className="apple-chip">{VENDOR_FEATURES.find((f) => f.key === key)?.label || key}</span>
              ))}
            </div>
            <form action={requestPackageAction} className="mt-auto pt-4">
              <input type="hidden" name="packageId" value={pack.id} />
              <button className="apple-btn w-full">{data?.packageCode === pack.code ? 'Yenile' : 'Talep et'}</button>
            </form>
          </section>
        ))}
      </div>
      <form action={createVendorOpsRequestAction} className="apple-panel grid gap-3 rounded-[24px] p-5">
        <h2 className="text-[16px] font-semibold">Satış / destek talebi</h2>
        <input name="title" required placeholder="Konu" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]" />
        <textarea name="body" required rows={4} placeholder="Ne ihtiyacınız var?" className="rounded-xl border border-black/10 px-3 py-2 text-[13px]" />
        <button className="apple-btn">Gönder</button>
      </form>
    </div>
  );
}
