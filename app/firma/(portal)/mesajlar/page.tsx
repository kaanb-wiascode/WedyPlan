import { VendorPageHeader } from '@/components/vendor/portal/VendorPageHeader';
import { VendorInbox } from '@/components/vendor/portal/VendorInbox';

export const dynamic = 'force-dynamic';

export default function VendorMessagesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <VendorPageHeader
        kicker="İletişim"
        title="Çift mesajları"
        description="Tüm yazışmalar WedyPlan üzerinde tutulur. Admin CRM masası sohbeti okuyabilir ve işaretleyebilir."
      />
      <VendorInbox perspective="VENDOR" />
    </div>
  );
}
