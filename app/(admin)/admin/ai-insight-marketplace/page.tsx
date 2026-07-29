import { getInsightMarketplaceOverviewAction } from '@/lib/actions/admin-insight-marketplace';
import { AdminInsightMarketplaceClient } from '@/components/admin/ai-insight-marketplace/AdminInsightMarketplaceClient';

export const metadata = {
  title: 'Insight Marketplace | WedyPlan Admin',
  description: 'Catalog of reusable dashboards, reports, and AI analytics assets.',
};

export default async function AdminInsightMarketplacePage() {
  const response = await getInsightMarketplaceOverviewAction();

  return <AdminInsightMarketplaceClient initialData={response.data} />;
}