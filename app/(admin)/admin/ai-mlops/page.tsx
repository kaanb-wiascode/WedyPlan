import { getMlopsOverviewAction } from '@/lib/actions/admin-mlops-data';
import { AdminMlopsClient } from '@/components/admin/ai-mlops/AdminMlopsClient';

export const metadata = {
  title: 'Enterprise MLOps Data Center | WedyPlan Admin',
  description: 'AI model lifecycle, training datasets, and drift monitoring platform.',
};

export default async function AdminMlopsPage() {
  const response = await getMlopsOverviewAction();

  return <AdminMlopsClient initialData={response.data} />;
}