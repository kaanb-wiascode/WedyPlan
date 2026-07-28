import { z } from "zod";

export const requestTypeEnum = z.enum(["DATA_EXPORT_GDPR", "RIGHT_TO_BE_FORGOTTEN_KVKK"]);
export const requestStatusEnum = z.enum(["PENDING", "PROCESSING", "COMPLETED", "REJECTED"]);

export const processComplianceRequestSchema = z.object({
  requestId: z.string().min(1, "Talep ID gereklidir"),
  action: z.enum(["APPROVE_EXPORT", "EXECUTE_ANONYMIZATION", "REJECT"]),
  notes: z.string().min(5, "Lütfen işlem notunu belirtiniz"),
});

export const updateRetentionPolicySchema = z.object({
  categoryKey: z.string().min(2, "Kategori gereklidir"),
  retentionYears: z.number().min(1).max(10).default(2),
  autoAnonymize: z.boolean().default(true),
});

export type ProcessComplianceRequestInput = z.infer<typeof processComplianceRequestSchema>;
export type UpdateRetentionPolicyInput = z.infer<typeof updateRetentionPolicySchema>;
