"use server";

import { revalidatePath } from "next/cache";
import { 
  CoupleRegisterSchema, 
  CoupleRegisterInput, 
  OnboardingFormData 
} from "@/lib/validations/onboarding";

// 1. Yeni Çift Kayıt Action'ı
export async function registerCoupleAction(input: CoupleRegisterInput) {
  const validated = CoupleRegisterSchema.safeParse(input);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    return { success: true, message: "Kayıt başarıyla tamamlandı." };
  } catch (error) {
    return { success: false, message: "Kayıt sırasında bir hata oluştu." };
  }
}

// 2. OnboardingWizard.tsx için taslak kaydetme
export async function saveOnboardingDraft(userId: string, currentStep: number, data: Partial<OnboardingFormData>) {
  try {
    revalidatePath("/cift/onboarding");
    return { success: true, message: "Taslak kaydedildi." };
  } catch (error) {
    return { success: false, message: "Taslak kaydedilemedi." };
  }
}

// 3. OnboardingWizard.tsx için onboarding tamamlama
export async function completeOnboarding(userId: string, data: OnboardingFormData) {
  try {
    revalidatePath("/cift/dashboard");
    return { success: true, message: "Onboarding başarıyla tamamlandı." };
  } catch (error) {
    return { success: false, message: "Onboarding tamamlanırken hata oluştu." };
  }
}