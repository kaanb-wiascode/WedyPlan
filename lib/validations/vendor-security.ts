import { z } from "zod";

export const revokeSessionSchema = z.object({
  sessionId: z.string().min(1, "Oturum ID gereklidir"),
});

export const createApiKeySchema = z.object({
  keyName: z.string().min(2, "API anahtar adı gereklidir"),
  scopes: z.array(z.string()).min(1, "En az bir yetki kapsamı seçilmelidir"),
  expirationDays: z.number().min(30).max(365).default(90),
});

export const requestDataExportSchema = z.object({
  includeFinancials: z.boolean().default(true),
  includeContracts: z.boolean().default(true),
  includeCustomerLogs: z.boolean().default(true),
  confirmationText: z.string().refine((val) => val === "VERILERIMI_INDIR", {
    message: "Lütfen doğrulama için 'VERILERIMI_INDIR' yazınız",
  }),
});

export type RevokeSessionInput = z.infer<typeof revokeSessionSchema>;
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
export type RequestDataExportInput = z.infer<typeof requestDataExportSchema>;
