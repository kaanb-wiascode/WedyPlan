import { requireAdmin } from '@/lib/admin/require-admin';
import { listAuditLogs } from '@/lib/admin/cockpit-data';
import { AdminHeader, EmptyState, formatWhen } from '@/components/admin/cockpit/ui';

export const dynamic = 'force-dynamic';

export default async function AdminAuditPage() {
  await requireAdmin();
  const logs = await listAuditLogs();

  return (
    <>
      <AdminHeader
        kicker="Kontrol"
        title="Denetim kaydı"
        description="Girişler, gölge oturumlar, onaylar ve sistem değişiklikleri zaman damgasıyla burada."
      />
      <section className="apple-panel space-y-2 rounded-[24px] p-5">
        {logs.length === 0 ? (
          <EmptyState text="Henüz denetim kaydı yok." />
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#f5f5f7] px-4 py-3 text-[12px]">
              <span>
                <strong>{log.action}</strong>
                <span className="text-[#86868b]"> · {log.category}{log.targetEntity ? ` · ${log.targetEntity}` : ''}</span>
              </span>
              <span className="font-mono text-[#86868b]">{formatWhen(log.createdAt)}</span>
            </div>
          ))
        )}
      </section>
    </>
  );
}
