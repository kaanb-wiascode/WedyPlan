import { z } from "zod";

export const haAvailabilityTargetEnum = z.enum([
  "NINES_99_9",
  "NINES_99_95",
  "NINES_99_99",
  "NINES_99_995",
  "NINES_99_999",
]);

export const updateHAClusterSchema = z.object({
  clusterName: z.string().min(2, "Küme adı en az 2 karakter olmalıdır"),
  targetAvailability: haAvailabilityTargetEnum.default("NINES_99_999"),
  autoFailoverEnabled: z.boolean().default(true),
});

export const triggerHAFailoverSchema = z.object({
  clusterId: z.string().min(1, "Küme ID zorunludur"),
  targetNode: z.string().min(1, "Hedef düğüm zorunludur"),
  reason: z.string().default("MANUAL_FAILOVER_TEST"),
});

export type UpdateHAClusterInput = z.infer<typeof updateHAClusterSchema>;
export type TriggerHAFailoverInput = z.infer<typeof triggerHAFailoverSchema>;
