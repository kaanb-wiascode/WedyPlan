import { z } from "zod";

export const threatLevelEnum = z.enum(["INFO", "WARNING", "HIGH", "CRITICAL_THREAT"]);

export const blockIpSchema = z.object({
  ipAddress: z.string().min(3, "Geçerli bir IP adresi veya CIDR girilmelidir"),
  reason: z.string().min(5, "Engelleme gerekçesi belirtilmelidir"),
  durationHours: z.number().min(1).default(24),
});

export const revokeSessionSchema = z.object({
  sessionId: z.string().min(1, "Oturum ID gereklidir"),
  userId: z.string().optional(),
});

export const resolveIncidentSchema = z.object({
  incidentId: z.string().min(1, "İnsidant ID gereklidir"),
  actionTaken: z.enum(["CONTAINED", "RESOLVED", "FALSE_POSITIVE"]),
  notes: z.string().min(5, "İşlem notu zorunludur"),
});

export type BlockIpInput = z.infer<typeof blockIpSchema>;
export type RevokeSessionInput = z.infer<typeof revokeSessionSchema>;
export type ResolveIncidentInput = z.infer<typeof resolveIncidentSchema>;
