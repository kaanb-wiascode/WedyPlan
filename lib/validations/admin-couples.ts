import { z } from "zod";

export const coupleStatusEnum = z.enum(["ACTIVE", "SUSPENDED", "INACTIVE_DORMANT"]);
export const weddingStatusEnum = z.enum(["PLANNING", "D_DAY_TODAY", "COMPLETED", "CANCELLED"]);

export const updateCoupleStatusSchema = z.object({
  coupleId: z.string().min(1, "Çift ID gereklidir"),
  status: coupleStatusEnum,
  reason: z.string().optional(),
});

export const coupleInterventionSchema = z.object({
  coupleId: z.string().min(1, "Çift ID gereklidir"),
  interventionType: z.enum(["VIP_CONCIERGE", "BUDGET_ASSIST", "DISPUTE_MEDIATION"]),
  notes: z.string().min(10, "Müdahale notu girilmelidir"),
});

export type UpdateCoupleStatusInput = z.infer<typeof updateCoupleStatusSchema>;
export type CoupleInterventionInput = z.infer<typeof coupleInterventionSchema>;
