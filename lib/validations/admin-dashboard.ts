import { z } from "zod";

export const platformTimeframeEnum = z.enum(["TODAY", "WEEKLY", "MONTHLY", "ANNUAL"]);

export const adminActionTypeEnum = z.enum([
  "APPROVE_VENDOR",
  "RESOLVE_INCIDENT",
  "PURGE_CACHE",
  "TRIGGER_BACKUP",
  "SCALE_INFRASTRUCTURE",
]);

export const executeAdminActionSchema = z.object({
  actionType: adminActionTypeEnum,
  targetId: z.string().optional(),
  reason: z.string().optional(),
});

export type ExecuteAdminActionInput = z.infer<typeof executeAdminActionSchema>;
