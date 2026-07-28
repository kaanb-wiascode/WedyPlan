import { z } from "zod";

export const environmentEnum = z.enum(["DEVELOPMENT", "TESTING", "STAGING", "PRODUCTION"]);
export const strategyEnum = z.enum(["BLUE_GREEN", "CANARY", "DIRECT_ROLLOUT"]);

export const triggerReleaseSchema = z.object({
  versionTag: z.string().min(2, "Versiyon etiketi gereklidir"),
  commitHash: z.string().min(7, "Git commit hash en az 7 karakter olmalıdır"),
  environment: environmentEnum.default("STAGING"),
  strategy: strategyEnum.default("CANARY"),
  canaryPercentage: z.number().min(5).max(100).default(10),
  runMigrations: z.boolean().default(true),
});

export const rollbackReleaseSchema = z.object({
  targetReleaseId: z.string().min(1, "Hedef sürüm ID gereklidir"),
  reason: z.string().min(5, "Geri alma gerekçesi açıklanmalıdır"),
  forceImmediate: z.boolean().default(true),
});

export const maintenanceModeSchema = z.object({
  isMaintenanceActive: z.boolean(),
  maintenanceMessage: z.string().min(5, "Bakım mesajı zorunludur"),
  allowedAdminIps: z.array(z.string()).default([]),
});

export type TriggerReleaseInput = z.infer<typeof triggerReleaseSchema>;
export type RollbackReleaseInput = z.infer<typeof rollbackReleaseSchema>;
export type MaintenanceModeInput = z.infer<typeof maintenanceModeSchema>;
