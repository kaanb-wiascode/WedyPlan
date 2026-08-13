'use server';

import { getCoupleWorkspace } from '@/lib/couple/workspace';

export async function getDashboardData() {
  const data = await getCoupleWorkspace();
  if (!data) return { success: false, error: 'Oturum bulunamadı.' };
  const { couple, kpis } = data;
  return {
    success: true,
    data: {
      profile: {
        partnerOne: couple.partnerOneName,
        partnerTwo: couple.partnerTwoName || '',
        weddingDate: couple.weddingDate ? new Date(couple.weddingDate) : new Date(),
      },
      metrics: kpis,
      tasks: data.tasks,
      events: data.events,
      threads: data.threads,
      invitation: data.invitation,
      deals: data.deals,
    },
  };
}
