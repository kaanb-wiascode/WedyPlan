import { requireStaff } from '@/lib/ops/staff';
import { AdminHeader } from '@/components/admin/cockpit/ui';
import { AccountSecurityCard } from '@/components/shared/account/AccountSecurityCard';

export const dynamic = 'force-dynamic';

export default async function AdminAccountPage() {
  const staff = await requireStaff();

  return (
    <>
      <AdminHeader
        kicker="Hesap"
        title="Giriş bilgileri"
        description={`${staff.fullName} · ${staff.desk}. Bu sayfa yalnızca sizin e-posta ve şifrenizi değiştirir.`}
      />
      <section className="apple-panel mx-auto max-w-xl space-y-3 rounded-[24px] p-5">
        <AccountSecurityCard />
      </section>
    </>
  );
}
