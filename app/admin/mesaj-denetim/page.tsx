import { requireStaff } from '@/lib/ops/staff';
import { getAdminInboxAction } from '@/lib/actions/vendor-messages';
import { AdminHeader } from '@/components/admin/ops/ui';
import { VendorMessageAudit } from '@/components/admin/ops/VendorMessageAudit';

export const dynamic = 'force-dynamic';

export default async function AdminVendorMessagesPage() {
  await requireStaff(['SUPER', 'CRM', 'REGION']);
  const inbox = await getAdminInboxAction();

  return (
    <>
      <AdminHeader
        kicker="Denetim"
        title="Firma–çift mesajları"
        description="Firmaların tüm yazışmaları burada. İşaretleyin veya arabulucu olarak dahil olun."
      />
      <VendorMessageAudit initial={inbox.threads || []} />
    </>
  );
}
