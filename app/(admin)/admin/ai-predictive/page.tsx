import { getPredictiveOverviewAction } from '@/lib/actions/admin-predictive-analytics';
import { AdminPredictiveClient } from '@/components/admin/ai-predictive/AdminPredictiveClient';

export const metadata = {
  title: 'Predictive Analytics Center | WedyPlan Admin',
  description: 'Enterprise forecasts, scenario simulations, and AI risk prediction platform.',
};

export default async function AdminPredictivePage() {
  const response = await getPredictiveOverviewAction();

  return <AdminPredictiveClient initialData={response.data} />;
}