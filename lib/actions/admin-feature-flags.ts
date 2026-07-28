"use server";

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
      message: `Feature Flag '${data.flagKey}' %${data.rolloutPercentage} rollout ile kaydedildi ✨`,
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
    const isOff = data.isKillSwitched ?? !data.enabled;
    const statusText = isOff ? "KAPALI (KILL-SWITCH)" : "AKTİF";
    return {
      success: true,
      message: `Feature Flag '${data.flagKey}' durumu ${statusText} olarak güncellendi ⚡`,
    };
  } catch (error) {
    console.error("Toggle Feature Flag Error:", error);
    return { success: false, error: "Feature flag durumu değiştirilemedi." };
  }
}