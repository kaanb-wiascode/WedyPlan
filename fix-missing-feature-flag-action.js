const fs = require("fs");

const files = {
  // 1. lib/validations/admin-feature-flags.ts
  "lib/validations/admin-feature-flags.ts": `import { z } from "zod";

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
  enabled: z.boolean(),
});

export type SaveFeatureFlagConfigInput = z.infer<typeof saveFeatureFlagConfigSchema>;
export type ToggleFeatureFlagKillSwitchInput = z.infer<typeof toggleFeatureFlagKillSwitchSchema>;
`,

  // 2. lib/actions/admin-feature-flags.ts
  "lib/actions/admin-feature-flags.ts": `"use server";

import { revalidatePath } from "next/cache";
import {
  saveFeatureFlagConfigSchema,
  SaveFeatureFlagConfigInput,
  toggleFeatureFlagKillSwitchSchema,
  ToggleFeatureFlagKillSwitchInput,
} from "@/lib/validations/admin-feature-flags";

export async function saveFeatureFlagConfigAction(data: SaveFeatureFlagConfigInput) {
  const validation = saveFeatureFlagConfigSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    revalidatePath("/admin/feature-flags");
    return {
      success: true,
      message: \`Feature Flag '\${data.flagKey}' % \${data.rolloutPercentage} rollout ile kaydedildi ✨\`,
    };
  } catch (error) {
    console.error("Save Feature Flag Error:", error);
    return { success: false, error: "Feature flag kaydedilemedi." };
  }
}

export async function toggleFeatureFlagKillSwitchAction(data: ToggleFeatureFlagKillSwitchInput) {
  const validation = toggleFeatureFlagKillSwitchSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    revalidatePath("/admin/feature-flags");
    const statusText = data.enabled ? "AKTİF" : "KAPALI (KILL-SWITCH)";
    return {
      success: true,
      message: \`Feature Flag '\${data.flagKey}' durumu \${statusText} olarak güncellendi ⚡\`,
    };
  } catch (error) {
    console.error("Toggle Feature Flag Error:", error);
    return { success: false, error: "Feature flag durumu değiştirilemedi." };
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(filePath, content);
}

console.log("✅ Feature Flags eksik action (toggleFeatureFlagKillSwitchAction) başarıyla tanımlandı!");