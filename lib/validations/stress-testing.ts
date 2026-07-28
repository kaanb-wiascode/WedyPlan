import { z } from "zod";

export const stressTypeEnum = z.enum([
  "EXTREME_TRAFFIC",
  "MASS_REGISTRATIONS",
  "MASS_PAYMENTS",
  "MASS_AI_REQUESTS",
  "MASS_UPLOADS",
  "SEARCH_STORM",
  "NOTIFICATION_STORM",
]);

export const runStressTestSchema = z.object({
  scenarioName: z.string().min(3, "Senaryo adı en az 3 karakter olmalıdır"),
  stressType: stressTypeEnum.default("EXTREME_TRAFFIC"),
  targetModule: z.string().min(1, "Hedef modül zorunludur"),
  targetBreakingRps: z.number().min(1000).max(500000).default(50000),
  virtualUsersCount: z.number().min(5000).max(1000000).default(100000),
  durationSeconds: z.number().min(10).max(300).default(60),
});

export const abortStressTestSchema = z.object({
  testId: z.string().optional(),
  reason: z.string().default("EMERGENCY_STRESS_ABORT_TRIGGERED"),
});

export type RunStressTestInput = z.infer<typeof runStressTestSchema>;
export type AbortStressTestInput = z.infer<typeof abortStressTestSchema>;
