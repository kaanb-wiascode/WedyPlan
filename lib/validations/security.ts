import { z } from "zod";

export const threatLevelEnum = z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"]);
export const threatActionEnum = z.enum(["BLOCKED", "FLAGGED_FOR_REVIEW", "ALLOWED_MONITORED"]);

export const recordThreatLogSchema = z.object({
  threatType: z.string().min(2, "Tehdit türü zorunludur"),
  sourceIp: z.string().min(1, "IP adresi zorunludur"),
  threatLevel: threatLevelEnum.default("HIGH"),
  actionTaken: threatActionEnum.default("BLOCKED"),
  details: z.string().optional(),
});

export const updateComplianceCheckSchema = z.object({
  standard: z.enum(["KVKK", "GDPR", "SOC2", "ISO27001", "OWASP_TOP10"]),
  controlName: z.string().min(1),
  isCompliant: z.boolean(),
});

export type RecordThreatLogInput = z.infer<typeof recordThreatLogSchema>;
export type UpdateComplianceCheckInput = z.infer<typeof updateComplianceCheckSchema>;
