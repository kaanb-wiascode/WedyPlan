import { z } from "zod";

export const incidentSeverityEnum = z.enum(["SEV_1_CRITICAL", "SEV_2_HIGH", "SEV_3_MEDIUM", "SEV_4_LOW"]);
export const incidentStatusEnum = z.enum(["DETECTED", "INVESTIGATING", "MITIGATED", "RESOLVED"]);

export const createSREIncidentSchema = z.object({
  title: z.string().min(3, "Olay başlığı en az 3 karakter olmalıdır"),
  affectedService: z.string().min(1, "Etkilenen servis zorunludur"),
  severity: incidentSeverityEnum.default("SEV_2_HIGH"),
  description: z.string().min(5, "Detaylı açıklama girilmelidir"),
});

export const updateSLOTargetSchema = z.object({
  serviceName: z.string().min(1),
  targetSloPct: z.number().min(90).max(99.999).default(99.95),
  errorBudgetThresholdPct: z.number().default(20),
});

export type CreateSREIncidentInput = z.infer<typeof createSREIncidentSchema>;
export type UpdateSLOTargetInput = z.infer<typeof updateSLOTargetSchema>;
