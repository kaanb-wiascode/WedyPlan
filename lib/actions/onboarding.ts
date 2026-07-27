"use server";

import { revalidatePath } from "next/cache";
import { fullOnboardingSchema, OnboardingFormData } from "@/lib/validations/onboarding";

export async function saveOnboardingDraft(userId: string, currentStep: number, data: Partial<OnboardingFormData>) {
  try {
    // Projenizdeki Prisma istemcisini içe aktarın
    // const { prisma } = await import("@/lib/prisma");
    
    // Taslak kaydedilme simülasyonu / Prisma güncellemesi
    console.log(`[Auto-Save] User: ${userId}, Step: ${currentStep}`, data);

    return { success: true };
  } catch (error) {
    console.error("Draft save error:", error);
    return { success: false, error: "Taslak kaydedilemedi." };
  }
}

export async function completeOnboarding(userId: string, data: OnboardingFormData) {
  const validation = fullOnboardingSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten() };
  }

  try {
    // Prisma veritabanı güncellemesi ve AI ön hesaplaması
    console.log(`[Complete Onboarding] Initializing AI Personalization for user: ${userId}`);

    // Düğün profili oluşturuldu olarak işaretlenir
    revalidatePath("/couple");
    return { success: true, redirectUrl: "/couple/onboarding/success" };
  } catch (error) {
    console.error("Onboarding error:", error);
    return { success: false, error: "Onboarding tamamlanırken bir hata oluştu." };
  }
}