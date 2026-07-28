"use server";

import { revalidatePath } from "next/cache";
import { createExpenseSchema, CreateExpenseInput } from "@/lib/validations/vendor-finance";

export async function createVendorExpenseAction(vendorId: string, data: CreateExpenseInput) {
  const validation = createExpenseSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Saving financial transaction for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/finance");
    return {
      success: true,
      message: "Finansal işlem ve gider kaydı başarıyla eklendi ✨",
    };
  } catch (error) {
    console.error("Create Expense Error:", error);
    return { success: false, error: "İşlem kaydedilemedi." };
  }
}

export async function generateAIFinanceInsightsAction(vendorId: string) {
  try {
    return {
      success: true,
      financialHealthScore: 92,
      netProfitMarginPercentage: 38,
      cashFlowPrediction30Days: "+320.000 ₺ Pozitif Nakit Akışı",
      taxProvisionAmount: "42.500 ₺ (Önümüzdeki Ay Ödenecek KDV/Stopaj)",
      savingsRecommendations: [
        { title: "Dış Ekipman Kiralama Maliyeti", advice: "Geçen aya göre dış ekipman maliyetiniz %18 arttı. Kendi ses/ışık sisteminizi satın almanız 4 ay içinde amorti sağlayacaktır.", potentialSaving: "18.500 ₺ / Ay" },
      ],
      profitOptimizationScore: 95,
    };
  } catch (error) {
    console.error("AI Finance Insights Error:", error);
    return { success: false, error: "AI finans analizi yapılamadı." };
  }
}
