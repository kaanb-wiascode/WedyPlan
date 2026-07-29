'use server';

import { DataCommandCenterEngine, ExecutiveDashboardData } from '@/lib/ai-native/ai-data-command-center-engine';
import { executiveRoleViewSchema } from '@/lib/validations/ai-data-command-center';
import { revalidatePath } from 'next/cache';

export async function getExecutiveDataDashboardAction(roleInput: string = 'CEO') {
  const validated = executiveRoleViewSchema.parse({ role: roleInput });
  const dashboardData = DataCommandCenterEngine.generateExecutiveDashboard(validated.role);

  return {
    success: true,
    data: dashboardData,
  };
}

export async function triggerSubsystemOptimizationAction(subsystemKey: string) {
  revalidatePath('/admin/central-intelligence');
  return {
    success: true,
    message: `${subsystemKey} alt sistemi için AI optimizasyon döngüsü başarıyla başlatıldı.`,
  };
}