import { z } from 'zod';

export const executiveRoleViewSchema = z.object({
  role: z.enum(['CEO', 'CTO', 'CIO', 'CDO', 'CFO', 'AI_DIRECTOR']),
});

export const triggerSystemOptimizationSchema = z.object({
  subsystemKey: z.string().min(1, 'Alt sistem anahtarı zorunludur'),
  actionType: z.string().min(1, 'Aksiyon türü zorunludur'),
});

export type ExecutiveRoleViewInput = z.infer<typeof executiveRoleViewSchema>;
export type TriggerSystemOptimizationInput = z.infer<typeof triggerSystemOptimizationSchema>;