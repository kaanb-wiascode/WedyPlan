import { requireAdmin } from '@/lib/admin/require-admin';
import { listUsers } from '@/lib/admin/cockpit-data';
import { setUserStatusAction } from '@/lib/actions/admin-cockpit';
import { AdminHeader, EmptyState, StatusPill } from '@/components/admin/cockpit/ui';
import { ImpersonateButton } from '@/components/admin/cockpit/ImpersonateButton';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  await requireAdmin();
  const users = await listUsers();

  return (
    <>
      <AdminHeader
        kicker="Kontrol"
        title="Kullanıcılar"
        description="Tüm kimlikler, portal yetkileri ve hesap kilidi. Çift veya firma portalı varsa doğrudan girin."
      />
      <section className="apple-panel overflow-hidden rounded-[24px]">
        {users.length === 0 ? (
          <div className="p-5"><EmptyState text="Kullanıcı yok." /></div>
        ) : (
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#f5f5f7] text-[11px] uppercase tracking-wide text-[#86868b]">
              <tr>
                <th className="px-4 py-3">Kullanıcı</th>
                <th className="px-4 py-3">Portallar</th>
                <th className="px-4 py-3">Durum</th>
                <th className="px-4 py-3 text-right">Kontrol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-black/5">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{user.fullName}</p>
                    <p className="text-[12px] text-[#86868b]">{user.email}</p>
                  </td>
                  <td className="px-4 py-3 text-[12px]">{user.portals.join(', ') || '—'}</td>
                  <td className="px-4 py-3"><StatusPill status={user.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {user.portals.includes('COUPLE') ? (
                        <ImpersonateButton targetUserId={user.id} portal="COUPLE" label="Çift" />
                      ) : null}
                      {user.portals.includes('VENDOR') ? (
                        <ImpersonateButton targetUserId={user.id} portal="VENDOR" label="Firma" />
                      ) : null}
                      <form action={setUserStatusAction}>
                        <input type="hidden" name="id" value={user.id} />
                        <input type="hidden" name="status" value={user.status === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED'} />
                        <button className="apple-btn-secondary apple-btn-compact">
                          {user.status === 'SUSPENDED' ? 'Aktif et' : 'Askıya al'}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
