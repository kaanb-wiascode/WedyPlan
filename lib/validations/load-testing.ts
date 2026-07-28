import { z } from "zod";

export const loadTestPatternEnum = z.enum(["RAMP_UP", "SPIKE", "SOAK_TEST", "STRESS_TEST"]);

export const runLoadTestSchema = z.object({
  scenarioName: z.string().min(3, "Senaryo adı en az 3 karakter olmalıdır"),
  targetModule: z.string().min(1, "Hedef modül zorunludur"),
  virtualUsersCount: z.number().min(10).max(100000).default(5000),
  targetRps: z.number().min(50).max(50000).default(2500),
  pattern: loadTestPatternEnum.default("SPIKE"),
  durationSeconds: z.number().min(10).max(600).default(60),
});

export const abortLoadTestSchema = z.object({
  testId: z.string().optional(),
  reason: z.string().default("MANUAL_ABORT_TRIGGERED"),
});

export type RunLoadTestInput = z.infer<typeof runLoadTestSchema>;
export type AbortLoadTestInput = z.infer<typeof abortLoadTestSchema>;
