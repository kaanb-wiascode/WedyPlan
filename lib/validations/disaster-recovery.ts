import { z } from "zod";

export const recoveryComponentEnum = z.enum([
  "DATABASE",
  "OBJECT_STORAGE",
  "REDIS",
  "QUEUES",
  "FILES",
  "CONFIGURATIONS",
  "SECRETS",
  "AI_MEMORY",
]);

export const runDRSimulationSchema = z.object({
  planName: z.string().min(3, "Plan adı en az 3 karakter olmalıdır"),
  targetComponent: recoveryComponentEnum.default("DATABASE"),
  simulationType: z.enum(["DRY_RUN", "FULL_FAILOVER_TEST", "DATA_INTEGRITY_CHECK"]).default("DRY_RUN"),
});

export const updateRecoveryTargetSchema = z.object({
  targetComponent: recoveryComponentEnum,
  targetRpoMinutes: z.number().min(0).max(60).default(1),
  targetRtoMinutes: z.number().min(1).max(240).default(5),
});

export type RunDRSimulationInput = z.infer<typeof runDRSimulationSchema>;
export type UpdateRecoveryTargetInput = z.infer<typeof updateRecoveryTargetSchema>;
