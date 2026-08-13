import { requireAdmin } from '@/lib/admin/require-admin';
import { listLeads } from '@/lib/admin/cockpit-data';
import { updateLeadStatusAction } from '@/lib/actions/admin-cockpit';
import { AdminHeader, EmptyState, StatusPill, formatWhen } from '@/components/admin/cockpit/ui';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  await requireAdmin();
  const leads = await listLeads();

  return (
    <>
      <AdminHeader
        kicker="Operasyon"
        title="Teklif talepleri"
        description="Katalog ve vitrinden gelen gerçek teklif talepleri. Durumu güncelleyin, spam’i kapatın."
      />
      <section className="space-y-2">
        {leads.length === 0 ? (
          <EmptyState text="Henüz teklif talebi yok. Katalogdaki Teklif Al formu buraya düşer." />
        ) : (
          leads.map((lead: any) => (
            <div key={lead.id} className="apple-panel space-y-2 rounded-[20px] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[14px] font-semibold">{lead.coupleNames} → {lead.vendorName}</p>
                  <p className="text-[12px] text-[#86868b]">
                    {lead.city} {lead.district ? `/ ${lead.district}` : ''} · {lead.phone} · {lead.email || 'e-posta yok'} · {formatWhen(lead.createdAt)}
                  </p>
                  {lead.note ? <p className="mt-1 text-[13px] text-[#1d1d1f]">{lead.note}</p> : null}
                </div>
                <StatusPill status={lead.status} />
              </div>
              <div className="flex flex-wrap gap-2">
                {['PENDING', 'CONTACTED', 'CLOSED', 'SPAM'].map((status) => (
                  <form key={status} action={updateLeadStatusAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <input type="hidden" name="status" value={status} />
                    <button className="apple-btn-secondary apple-btn-compact">{status}</button>
                  </form>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}
