import { z } from "zod";

export const healthCheckStatusEnum = z.enum(["HEALTHY", "DEGRADED", "CRITICAL_DOWN"]);

export const registerHealthCheckSchema = z.object({
  serviceName: z.string().min(1, "Servis adı zorunludur"),
  checkType: z.enum(["LIVENESS", "READINESS", "STARTUP", "HEARTBEAT"]).default("HEARTBEAT"),
  status: healthCheckStatusEnum.default("HEALTHY"),
  latencyMs: z.number().default(12),
  details: z.record(z.string(), z.any()).optional(),
});

export const updateSLATargetSchema = z.object({
  serviceName: z.string().min(1),
  targetAvailabilityPct: z.number().min(90).max(100).default(99.99),
  maxAllowedLatencyMs: z.number().default(200),
});

export type RegisterHealthCheckInput = z.infer<typeof registerHealthCheckSchema>;
export type UpdateSLATargetInput = z.infer<typeof updateSLATargetSchema>;