"use server";

import { revalidatePath } from "next/cache";
import { generalProfileSchema, GeneralProfileInput, seoProfileSchema, SEOProfileInput } from "@/lib/validations/vendor-profile";

export async function updateVendorProfileSectionAction(vendorId: string, data: GeneralProfileInput) {
  const validation = generalProfileSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Updating profile for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/profile");
    return { success: true, message: "Profil bilgileri başarıyla güncellendi ve vitrine işlendi ✨" };
  } catch (error) {
    console.error("Update Vendor Profile Error:", error);
    return { success: false, error: "Profil güncellenemedi." };
  }
}

export async function generateAISEOAndKeywordsAction(businessName: string, category: string, city: string) {
  try {
    return {
      success: true,
      metaTitle: businessName + " | " + city + " " + category + " & Düğün Organizasyonu",
      metaDescription: city + " bölgesinin en popüler " + category + " firması " + businessName + ". Lüks düğün paketleri, güncel fiyatlar ve detaylı portföy için tıklayın.",
      suggestedKeywords: [
        "#" + city + "DüğünMekanı",
        "#" + category + "Fiyatları",
        "#LüksDüğün" + city,
        "#WedyPlanVerified",
      ],
      missingFields: [
        "Sıkça Sorulan Sorular (SSS) sekmesinde henüz 'İptal ve İade Şartları' belirtilmemiş.",
        "Portföy galerisinde en az 5 yüksek çözünürlüklü görsel bulunmalıdır (Mevcut: 3).",
      ],
    };
  } catch (error) {
    console.error("AI SEO Error:", error);
    return { success: false, error: "AI SEO içerik üretilemedi." };
  }
}
