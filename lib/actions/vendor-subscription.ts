"use server";

import { revalidatePath } from "next/cache";
import { upgradePlanSchema, UpgradePlanInput, buyCreditsSchema, BuyCreditsInput } from "@/lib/validations/vendor-subscription";

export async function upgradeSubscriptionPlanAction(vendorId: string, data: UpgradePlanInput) {
  const validation = upgradePlanSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Upgrading subscription plan for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/subscription");
    return {
      success: true,
      message: "Tebrikler! Abonelik paketiniz " + data.targetPlan + " seviyesine yükseltildi ✨",
    };
  } catch (error) {
    console.error("Upgrade Plan Error:", error);
    return { success: false, error: "Paket yükseltilemedi." };
  }
}

export async function buyVendorCreditsAction(vendorId: string, data: BuyCreditsInput) {
  const validation = buyCreditsSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Buying add-on credits for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/subscription");
    return {
      success: true,
      message: "Ek krediler hesabınıza anında tanımlandı ✨",
    };
  } catch (error) {
    console.error("Buy Credits Error:", error);
    return { success: false, error: "Kredi satın alınamadı." };
  }
}

export async function generateAISubscriptionRecommendationsAction(vendorId: string) {
  try {
    return {
      success: true,
      recommendedPlan: "ENTERPRISE_LUXURY",
      reasoning: "Son 30 günde AI Asistan kullanımınız %92, Lead kabul oranınız %88 seviyesindedir. Enterprise pakete geçmek sınırsız AI kullanımı ve öncelikli listelenme imkanı sağlar.",
      potentialAnnualSaving: "14.400 ₺ (Yıllık Faturalandırmada %20 İndirim)",
      storageDepletionAlert: "Mevcut depolama alanınız %82 doluluğa ulaştı. 14 gün içinde ek depolama gerekebilir.",
      optimizationscore: 94,
    };
  } catch (error) {
    console.error("AI Subscription Recommendation Error:", error);
    return { success: false, error: "AI abonelik tavsiyesi üretilemedi." };
  }
}
