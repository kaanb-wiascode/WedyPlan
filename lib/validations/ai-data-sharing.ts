import { z } from 'zod';

export const createDataSharePolicySchema = z.object({
  name: z.string().min(3, 'Politika adı en az 3 karakter olmalıdır'),
  targetType: z.enum(['INTERNAL_ROLE', 'PARTNER_VENDOR', 'EXTERNAL_API']),
  targetIdentifier: z.string().min(1, 'Hedef kimliği/rolü zorunludur'),
  dataScope: z.string().min(1, 'Veri kapsamı belirtilmelidir'),
  sensitivityLevel: z.enum(['PUBLIC', 'INTERNAL', 'SENSITIVE', 'CRITICAL']),
  hasDataContract: z.boolean().default(true),
  expiresAt: z.string().optional(),
});

export const auditDataExportSchema = z.object({
  policyId: z.string().min(1, 'Policy ID zorunludur'),
  recordsAccessed: z.number().int().positive(),
  actionType: z.enum(['EXPORT_CSV', 'API_QUERY', 'CONTRACT_VALIDATION']),
});

export type CreateDataSharePolicyInput = z.infer<typeof createDataSharePolicySchema>;
export type AuditDataExportInput = z.infer<typeof auditDataExportSchema>;