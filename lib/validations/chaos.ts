import { z } from "zod";

export const chaosExperimentTypeEnum = z.enum([
  "SERVER_FAILURE",
  "DATABASE_FAILURE",
  "REDIS_FAILURE",
  "AI_PROVIDER_FAILURE",
  "PAYMENT_FAILURE",
  "LATENCY_INJECTION",
  "PACKET_LOSS",
  "CPU_SATURATION",
  "MEMORY_SATURATION",
]);

export const runChaosExperimentSchema = z.object({
  experimentName: z.string().min(3, "Deney adı en az 3 karakter olmalıdır"),
  targetService: z.string().min(1, "Hedef servis zorunludur"),
  experimentType: chaosExperimentTypeEnum.default("LATENCY_INJECTION"),
  durationSeconds: z.number().min(5).max(300).default(30),
  intensityPct: z.number().min(10).max(100).default(50),
});

export const abortChaosExperimentSchema = z.object({
  experimentId: z.string().optional(),
  reason: z.string().default("EMERGENCY_KILL_SWITCH_ACTIVATED"),
});

export type RunChaosExperimentInput = z.infer<typeof runChaosExperimentSchema>;
export type AbortChaosExperimentInput = z.infer<typeof abortChaosExperimentSchema>;
