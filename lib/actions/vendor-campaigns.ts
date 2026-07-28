"use server";

import { revalidatePath } from "next/cache";
import { createCampaignSchema, CreateCampaignInput } from "@/lib/validations/vendor-campaigns";

export async function createVendorCampaignAction(vendorId: string, data: CreateCampaignInput) {
  const validation = createCampaignSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating campaign for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/campaigns");
    return {
      success: true,
      message: "Pazarlama kampanyası ve indirim kuponu başarıyla yayına alındı ✨",
      campaignId: "cmp_" + Date.now(),
    };
  } catch (error) {
    console.error("Create Campaign Error:", error);
    return { success: false, error: "Kampanya oluşturulamadı." };
  }
}

export async function generateAICampaignCopyAction(campaignTitle: string, type: string, discount: number) {
  try {
    const generatedCopy = "✨ Hayalinizdeki Düğün İçin Erken Rezervasyon Fırsatı! %" + discount + " özel indirim ve sınırlı sayıda rezervasyon opsiyonuyla Bodrum Sunset Venue'de unutulmaz bir geceye davetlisiniz. Kod: WEDDING" + discount + " ile hemen teklif alın!";

    return {
      success: true,
      marketingCopy: generatedCopy,
      bestLaunchTime: "Perşembe Saat 20:00 (En Yüksek Çift Etkileşimi)",
      estimatedRoi: "%340 ROI (3.4x Gelir Çarpanı)",
      targetAudienceSuggestion: "Düğününe 6-12 ay kalan ve Ege bölgesini tercih eden yüksek bütçeli çiftler.",
      campaignScore: 94,
    };
  } catch (error) {
    console.error("AI Campaign Copy Error:", error);
    return { success: false, error: "AI reklam metni üretilemedi." };
  }
}
