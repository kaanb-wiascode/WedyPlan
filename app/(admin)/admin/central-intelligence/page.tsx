import { getExecutiveDataDashboardAction } from '@/lib/actions/admin-data-command-center';
import { ExecutiveDataCommandClient } from '@/components/admin/central-intelligence/ExecutiveDataCommandClient';

export const metadata = {
  title: 'Enterprise Data Command Center | WedyPlan Admin',
  description: 'Executive control center for the entire enterprise data ecosystem.',
};

export default async function ExecutiveDataCommandPage() {
  const response = await getExecutiveDataDashboardAction('CEO');

  return <ExecutiveDataCommandClient initialData={response.data} />;
}