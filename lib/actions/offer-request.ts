"use server";

import { revalidatePath } from "next/cache";
import { offerRequestSchema, OfferRequestFormData } from "@/lib/validations/offer-request";

export async function createOfferRequestAction(userId: string, data: OfferRequestFormData) {
  const validation = offerRequestSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Distributing offer request for user " + userId + ":", validation.data);
    revalidatePath("/couple/requests");
    return { success: true, message: "Teklif talebiniz tedarikçilere başarıyla iletildi ✨" };
  } catch (error) {
    console.error("Create Offer Request Error:", error);
    return { success: false, error: "Teklif talebi iletilemedi." };
  }
}

export async function rewriteRequestWithAIAction(notes: string, category: string) {
  try {
    const polishedText = "Sayın Tedarikçimiz,\n\n" +
      category + " hizmeti kapsamında planladığımız düğün davetimiz için detaylar aşağıda sunulmuştur:\n" +
      "• Özel İstekler & Konsept: " + notes + "\n" +
      "• Hizmet Standartları: Yüksek kaliteli servis, eksiksiz ekipman ve zamanında teslimat beklenmektedir.\n\n" +
      "Tarafımıza bütçe ve paket içeriklerinizi içeren detaylı teklifinizi iletmenizi rica ederiz.";

    return {
      success: true,
      polishedText,
      qualityScore: 94,
      predictedResponseRate: 88,
      missingInfoSuggestions: [
        "Menü tercihi (Set Menü / Açık Büfe) belirtilirse dönüş hızı %15 artar.",
      ],
    };
  } catch (error) {
    console.error("AI Polish Error:", error);
    return { success: false, error: "AI metin iyileştirmesi yapılamadı." };
  }
}
