"use server";

import { revalidatePath } from "next/cache";
import { generateApiKeySchema, GenerateApiKeyInput } from "@/lib/validations/api-dev";

export async function generateNewApiKeyAction(data: GenerateApiKeyInput) {
  const validation = generateApiKeySchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const mockKey = "wp_live_" + Math.random().toString(36).substring(2, 18);
    revalidatePath("/admin/api-dev");

    return {
      success: true,
      newApiKey: mockKey,
      message: validation.data.keyName + " için yeni API Key üretildi",
    };
  } catch (error) {
    console.error("Generate API Key Error:", error);
    return { success: false, error: "API Key üretilemedi." };
  }
}
