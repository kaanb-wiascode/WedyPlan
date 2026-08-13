import { requireStaff } from '@/lib/ops/staff';
import { getOpsSnapshot } from '@/lib/ops/data';
import { prisma } from '@/lib/db';
import { COMPANY_TYPES, docsForCompany } from '@/lib/ops/catalog';
import { reviewKycAction, reviewKycDocAction } from '@/lib/actions/ops';
import { AdminHeader, EmptyState, ReportBar, StatusPill } from '@/components/admin/ops/ui';

export const dynamic = 'force-dynamic';

const db = prisma as any;

export default async function KycPage() {
  const staff = await requireStaff(['SUPER', 'FINANCE', 'CRM']);
  const ops = await getOpsSnapshot(staff);
  const profiles = await db.vendorLegalProfile.findMany({ orderBy: { updatedAt: 'desc' }, take: 40 }).catch(() => []);
  const docs = await db.vendorKycDocument.findMany({ orderBy: { createdAt: 'desc' }, take: 80 }).catch(() => []);
  const vendors = new Map(ops.vendors.map((v: any) => [v.id, v]));

  return (
    <>
      <AdminHeader
        kicker="Uyumluluk"
        title="Evrak ve KYC"
        description="Şahıs, limited ve anonim şirketler için ayrı evrak seti. Onaydan sonra firma paneli aktifleşir; vitrin ancak evrak yeşil olduktan sonra açılır."
        actions={<ReportBar slug="kyc" />}
      />

      {profiles.length === 0 ? (
        <EmptyState text="Henüz evrak dosyası yok. Firmalar /firma/evrak üzerinden yükler." />
      ) : (
        <div className="space-y-4">
          {profiles.map((profile: any) => {
            const vendor = vendors.get(profile.vendorId);
            const needed = docsForCompany(profile.companyType);
            const vendorDocs = docs.filter((doc: any) => doc.vendorId === profile.vendorId);
            return (
              <section key={profile.id} className="apple-panel space-y-4 rounded-[24px] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[16px] font-semibold">{profile.legalTitle || vendor?.businessName}</p>
                    <p className="text-[12px] text-[#86868b]">
                      {COMPANY_TYPES.find((t) => t.id === profile.companyType)?.name} · {profile.authorizedName} · {profile.email}
                    </p>
                    <p className="text-[12px] text-[#86868b]">{profile.address} · {profile.phone}</p>
                  </div>
                  <StatusPill status={profile.kycStatus} />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {needed.filter((d) => d.file).map((doc) => {
                    const uploaded = vendorDocs.find((row: any) => row.docType === doc.id);
                    return (
                      <div key={doc.id} className="rounded-2xl bg-[#f5f5f7] px-3 py-2 text-[12px]">
                        <div className="flex items-center justify-between">
                          <span>{doc.label}</span>
                          <StatusPill status={uploaded?.status || 'PENDING'} />
                        </div>
                        {uploaded ? (
                          <form action={reviewKycDocAction} className="mt-2 flex gap-2">
                            <input type="hidden" name="id" value={uploaded.id} />
                            <select name="status" className="h-8 rounded-lg border border-black/10 px-2 text-[11px]">
                              <option>APPROVED</option>
                              <option>REJECTED</option>
                              <option>PENDING</option>
                            </select>
                            <button className="apple-btn-secondary apple-btn-compact">Kaydet</button>
                          </form>
                        ) : (
                          <p className="mt-1 text-[#86868b]">Yüklenmedi</p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <form action={reviewKycAction} className="flex flex-wrap gap-2">
                  <input type="hidden" name="vendorId" value={profile.vendorId} />
                  <input name="reviewNotes" placeholder="İnceleme notu" className="h-10 flex-1 rounded-xl border border-black/10 px-3 text-[13px]" />
                  <select name="status" className="h-10 rounded-xl border border-black/10 px-3 text-[13px]">
                    <option value="IN_REVIEW">İncelemede</option>
                    <option value="ACTIVE">Paneli aktifleştir</option>
                    <option value="REJECTED">Reddet</option>
                  </select>
                  <button className="apple-btn">Uygula</button>
                </form>
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}
