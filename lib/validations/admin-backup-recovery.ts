import { z } from "zod";

export const executeSystemRestoreSchema = z.object({
  snapshotId: z.string().min(1, "Snapshot ID gereklidir"),
  targetEnvironment: z.enum(["STAGING_SANDBOX", "PRODUCTION_FAILOVER"]),
  confirmCode: z.literal("CONFIRM_RESTORE_2026"),
  reason: z.string().min(5, "Gerekçe en az 5 karakter olmalıdır"),
});

export type ExecuteSystemRestoreInput = z.infer<typeof executeSystemRestoreSchema>;
