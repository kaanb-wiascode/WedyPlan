import { z } from "zod";

export const healthStatusEnum = z.enum(["EXCELLENT", "HEALTHY", "AT_RISK", "CRITICAL_CHURN"]);
export const accountTypeEnum = z.enum(["VENDOR", "COUPLE"]);

export const createSuccessPlanSchema = z.object({
  accountId: z.string().min(1, "Hesap ID gereklidir"),
  planTitle: z.string().min(3, "Plan başlığı en az 3 karakter olmalıdır"),
  targetGoal: z.string().min(5, "Hedef açıklanmalıdır"),
  assignedCsm: z.string().min(2, "CSM adı girilmelidir"),
  milestones: z.array(z.string()).min(1, "En az bir milat taşı eklenmelidir"),
});

export const triggerInterventionSchema = z.object({
  accountId: z.string().min(1, "Hesap ID gereklidir"),
  interventionType: z.enum(["CALL_SCHEDULED", "FREE_TRAINING", "DISCOUNT_OFFER", "VIP_CONCIERGE"]),
  notes: z.string().min(5, "Müdahale notu yazılmalıdır"),
});

export type CreateSuccessPlanInput = z.infer<typeof createSuccessPlanSchema>;
export type TriggerInterventionInput = z.infer<typeof triggerInterventionSchema>;
