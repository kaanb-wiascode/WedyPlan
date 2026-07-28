"use server";

import { revalidatePath } from "next/cache";
import { vendorOnboardingSchema, VendorOnboardingFormData } from "@/lib/validations/vendor-onboarding";

export async function saveVendorOnboardingAction(vendorId: string, data: VendorOnboardingFormData) {
  const validation = vendorOnboardingSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Saving vendor onboarding profile for " + vendorId + ":", validation.data);
    revalidatePath("/vendor/dashboard");
    return {
      success: true,
      message: "Tebrikler! İşletme profiliniz başarıyla oluşturuldu ve doğrulamaya alındı ✨",
      redirectUrl: "/vendor/dashboard",
    };
  } catch (error) {
    console.error("Save Vendor Onboarding Error:", error);
    return { success: false, error: "İşletme profili kaydedilemedi." };
  }
}

export async function enhanceVendorBioWithAIAction(rawBio: string, category: string, city: string) {
  try {
    const enhancedText = city + " bölgesinde " + category + " alanında faaliyet gösteren işletmemiz; yüksek kalite standartları, yenilikçi vizyonu ve kişiselleştirilmiş hizmet anlayışıyla en özel günlerinizi unutulmaz kılmaktadır.\n\n" +
      "Detaylara verdiğimiz önem ve profesyonel ekibimizle kusursuz bir düğün deneyimi sunuyoruz.\n\n" + rawBio;

    const keywords = ["#" + city + "Düğün", "#" + category, "#LüksDüğün", "#WedyPlanVerified"];
    
    return {
      success: true,
      enhancedBio: enhancedText,
      qualityScore: 98,
      keywords,
      seoSuggestions: {
        metaTitle: city + " " + category + " Hizmetleri | WedyPlan Verified",
        metaDescription: city + " bölgesinin önde gelen " + category + " firması. Detaylar ve online teklif alım imkanı.",
      },
    };
  } catch (error) {
    console.error("AI Enhance Bio Error:", error);
    return { success: false, error: "AI metin iyileştirmesi yapılamadı." };
  }
}
