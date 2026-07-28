import { z } from "zod";

export const mtlsModeEnum = z.enum(["STRICT_MTLS_1_3", "PERMISSIVE", "DISABLED"]);

export const updateMeshPolicySchema = z.object({
  sourceService: z.string().min(1, "Kaynak servis zorunludur"),
  targetService: z.string().min(1, "Hedef servis zorunludur"),
  mtlsMode: mtlsModeEnum.default("STRICT_MTLS_1_3"),
  timeoutMs: z.number().min(100).max(30000).default(1500),
  retryAttempts: z.number().min(0).max(10).default(3),
  circuitBreakerThresholdPct: z.number().min(1).max(50).default(10),
});

export const updateCircuitBreakerSchema = z.object({
  serviceName: z.string().min(1),
  circuitBreakerState: z.enum(["CLOSED_NORMAL", "OPEN_TRIPPED", "HALF_OPEN_TESTING"]),
});

export type UpdateMeshPolicyInput = z.infer<typeof updateMeshPolicySchema>;
export type UpdateCircuitBreakerInput = z.infer<typeof updateCircuitBreakerSchema>;
