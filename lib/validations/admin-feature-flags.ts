import { z } from "zod";

export const saveFeatureFlagConfigSchema = z.object({
  flagKey: z.string().min(1, "Flag Key zorunludur"),
  name: z.string().min(1, "İsim zorunludur"),
  environment: z.enum(["PRODUCTION", "DEVELOPMENT", "STAGING"]).default("PRODUCTION"),
  rolloutPercentage: z.number().min(0).max(100).default(100),
  targetPlans: z.array(z.string()).default(["ALL"]),
  targetCountries: z.array(z.string()).default(["TR"]),
  status: z.enum(["ENABLED", "DISABLED", "EXPERIMENT_ACTIVE"]).default("ENABLED"),
  description: z.string().optional(),
});

export const toggleFeatureFlagKillSwitchSchema = z.object({
  flagKey: z.string().min(1, "Flag Key zorunludur"),
  enabled: z.boolean().optional(),
  isKillSwitched: z.boolean().optional(),
  reason: z.string().optional(),
});

export type SaveFeatureFlagConfigInput = z.infer<typeof saveFeatureFlagConfigSchema>;
export type ToggleFeatureFlagKillSwitchInput = z.infer<typeof toggleFeatureFlagKillSwitchSchema>;