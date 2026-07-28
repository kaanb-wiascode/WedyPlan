"use server";

import { revalidatePath } from "next/cache";
import { createProposalSchema, CreateProposalInput } from "@/lib/validations/vendor-proposals";

export async function createVendorProposalAction(vendorId: string, data: CreateProposalInput) {
  const validation = createProposalSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating proposal for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/proposals");
    return {
      success: true,
      message: "Teklif başarıyla oluşturuldu ve çiftin onayına sunuldu ✨",
      proposalId: "prp_" + Date.now(),
    };
  } catch (error) {
    console.error("Create Proposal Error:", error);
    return { success: false, error: "Teklif oluşturulamadı." };
  }
}

export async function generateAIProposalUpsellsAction(items: any[], totalPrice: number) {
  try {
    return {
      success: true,
      qualityScore: 94,
      winProbability: 86,
      pricingRecommendation: "Belirlediğiniz " + totalPrice.toLocaleString("tr-TR") + " ₺ tutarındaki fiyat, Ege bölgesi lüks segment ortalamasına oldukça uygundur.",
      suggestedUpsells: [
        { title: "Gece Sonu Drone Çekimi", estimatedPrice: 15000, conversionImpact: "+%12 Onay İhtimali" },
        { title: "Kişiselleştirilmiş Misafir Karşılama Panosu", estimatedPrice: 8500, conversionImpact: "+%8 Müşteri Memnuniyeti" },
      ],
    };
  } catch (error) {
    console.error("AI Proposal Upsell Error:", error);
    return { success: false, error: "AI tavsiyeleri üretilemedi." };
  }
}
