import { z } from "zod";

export const executiveCommandTypeEnum = z.enum([
  "BUSINESS_OPTIMIZATION",
  "RESOURCE_REALLOCATION",
  "RISK_MITIGATION",
  "GLOBAL_MEMORY_SYNC",
  "EMERGENCY_SHIELD_OVERRIDE",
]);

export const executeExecutiveCommandSchema = z.object({
  commandPrompt: z.string().min(5, "Executive komut metni en az 5 karakter olmalıdır"),
  commandType: executiveCommandTypeEnum.default("BUSINESS_OPTIMIZATION"),
  autoExecuteDirectives: z.boolean().default(true),
  targetDomains: z.array(z.string()).default(["PRICING", "BUDGET", "TIMELINE", "AUTOMATION"]),
});

export const coordinateAgentMeshSchema = z.object({
  meshMode: z.enum(["BALANCED_LOAD", "HIGH_PERFORMANCE_PEAK", "LOW_COST_ECO"]),
  forceSyncGlobalMemory: z.boolean().default(true),
});

export type ExecuteExecutiveCommandInput = z.infer<typeof executeExecutiveCommandSchema>;
export type CoordinateAgentMeshInput = z.infer<typeof coordinateAgentMeshSchema>;
