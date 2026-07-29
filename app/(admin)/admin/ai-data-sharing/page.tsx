import { getDataSharingOverviewAction } from '@/lib/actions/admin-data-sharing';
import { AdminDataSharingClient } from '@/components/admin/ai-data-sharing/AdminDataSharingClient';

export const metadata = {
  title: 'Data Sharing Center | WedyPlan Admin',
  description: 'Enterprise data sharing, data contracts, and sharing risk analysis platform.',
};

export default async function AdminDataSharingPage() {
  const response = await getDataSharingOverviewAction();

  return <AdminDataSharingClient initialData={response.data} />;
}