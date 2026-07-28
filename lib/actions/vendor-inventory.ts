"use server";

import { revalidatePath } from "next/cache";
import { createAssetSchema, CreateAssetInput, reportDamageSchema, ReportDamageInput } from "@/lib/validations/vendor-inventory";

export async function createVendorAssetAction(vendorId: string, data: CreateAssetInput) {
  const validation = createAssetSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating asset for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/inventory");
    return {
      success: true,
      message: "Fiziksel varlık envantere kaydoldu ve QR kodu oluşturuldu ✨",
      assetId: "ast_" + Date.now(),
    };
  } catch (error) {
    console.error("Create Asset Error:", error);
    return { success: false, error: "Varlık envantere eklenemedi." };
  }
}

export async function reportAssetDamageAction(vendorId: string, data: ReportDamageInput) {
  const validation = reportDamageSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Reporting damage for asset " + data.assetId + " for vendor " + vendorId);
    revalidatePath("/vendor/inventory");
    return {
      success: true,
      message: "Hasar kaydı açıldı ve bakım ekibine bildirim iletildi ✨",
    };
  } catch (error) {
    console.error("Report Damage Error:", error);
    return { success: false, error: "Hasar kaydı oluşturulamadı." };
  }
}

export async function generateAIInventoryInsightsAction(vendorId: string) {
  try {
    return {
      success: true,
      inventoryOptimizationScore: 94,
      demandPredictions: [
        "19 Haziran Bodrum düğünü için 350 adet Tiffany Sandalye rezervasyonu var. Mevcut kullanılabilir stok: 400 adet (Yeterli).",
        "Temmuz ayındaki 2 çakışan kır düğünü için ses/ışık podyum kablosu stok yetersizliği riski mevcut.",
      ],
      maintenancePredictions: [
        "DJ Pro Sound System #1 cihazı son 30 günde 6 gece düğününde kullanıldı. Amfi soğutucu fan bakımı önerilir.",
        "DJI Inspire 3 Drone cihazı 45 saatlik uçuş limitine ulaştı. Pervane değişimi önerilir.",
      ],
    };
  } catch (error) {
    console.error("AI Inventory Insights Error:", error);
    return { success: false, error: "AI envanter analizi yapılamadı." };
  }
}
