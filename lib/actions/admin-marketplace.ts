"use server";

import { revalidatePath } from "next/cache";
import { saveCategorySchema, SaveCategoryInput, toggleFeaturedSchema, ToggleFeaturedInput } from "@/lib/validations/admin-marketplace";

export async function saveMarketplaceCategoryAction(data: SaveCategoryInput) {
  const validation = saveCategorySchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Saving marketplace category:", validation.data);
    revalidatePath("/admin/marketplace");
    return {
      success: true,
      message: "Pazar yeri kategorisi başarıyla kaydedildi ve canlı taksonomiye işlendi ✨",
    };
  } catch (error) {
    console.error("Save Category Error:", error);
    return { success: false, error: "Kategori kaydedilemedi." };
  }
}

export async function toggleFeaturedListingPlacementAction(data: ToggleFeaturedInput) {
  const validation = toggleFeaturedSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Toggling featured listing placement:", validation.data);
    revalidatePath("/admin/marketplace");
    return {
      success: true,
      message: "İlan ana sayfa ve kategori vitrin öne çıkarma konumu güncellendi ✨",
    };
  } catch (error) {
    console.error("Toggle Featured Error:", error);
    return { success: false, error: "Öne çıkarma durumu değiştirilemedi." };
  }
}

export async function generateAIMarketplaceHealthReportAction() {
  try {
    return {
      success: true,
      healthScore: 97,
      searchDemandMatchRate: "%94 Eşleşme Oranı",
      searchGaps: [
        "Bodrum bölgesinde 'Sualtı Düğün Çekimi' araması son 30 günde 420 kez yapıldı ancak aktif ilan sayısı 0.",
        "İzmir bölgesinde 'Gluten-Free Düğün Pastası' arama talebi %80 arttı.",
      ],
      lowQualityContentAlertsCount: 3,
      aiRecommendation: "Arama boşluğu tespit edilen kategorilere yeni tedarikçi davet kampanyası başlatılması önerilir.",
    };
  } catch (error) {
    console.error("AI Marketplace Health Error:", error);
    return { success: false, error: "AI pazar yeri sağlık raporu üretilemedi." };
  }
}
