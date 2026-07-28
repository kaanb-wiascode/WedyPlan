import { z } from "zod";

export const releaseRiskLevelEnum = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);
export const releaseStatusEnum = z.enum(["PLANNING", "PENDING_APPROVAL", "APPROVED", "DEPLOYED", "ROLLED_BACK"]);

export const createReleasePlanSchema = z.object({
  versionTag: z.string().min(3, "Semantic versiyon zorunludur (örn: v2.15.0)"),
  title: z.string().min(3, "Sürüm başlığı zorunludur"),
  riskLevel: releaseRiskLevelEnum.default("MEDIUM"),
  maintenanceWindowStart: z.string().min(1, "Bakım başlangıcı zorunludur"),
  maintenanceWindowEnd: z.string().min(1, "Bakım bitişi zorunludur"),
});

export const updateReleaseApprovalSchema = z.object({
  releaseId: z.string().min(1),
  action: z.enum(["APPROVE", "REJECT", "TRIGGER_HOTFIX", "ROLLBACK"]),
  comment: z.string().optional(),
});

export type CreateReleasePlanInput = z.infer<typeof createReleasePlanSchema>;
export type UpdateReleaseApprovalInput = z.infer<typeof updateReleaseApprovalSchema>;
