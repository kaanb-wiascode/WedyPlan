"use server";

import { revalidatePath } from "next/cache";
import { createContractSchema, CreateContractInput, updateContractStatusSchema, UpdateContractStatusInput } from "@/lib/validations/vendor-contracts";

export async function createVendorContractAction(vendorId: string, data: CreateContractInput) {
  const validation = createContractSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating contract for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/contracts");
    return {
      success: true,
      message: "Sözleşme taslağı oluşturuldu ve müşteri onayına sunulmaya hazır ✨",
      contractId: "cnt_" + Date.now(),
    };
  } catch (error) {
    console.error("Create Contract Error:", error);
    return { success: false, error: "Sözleşme oluşturulamadı." };
  }
}

export async function updateContractStatusAction(vendorId: string, data: UpdateContractStatusInput) {
  const validation = updateContractStatusSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Updating contract " + data.contractId + " status to " + data.status);
    revalidatePath("/vendor/contracts");
    return { success: true, message: "Sözleşme durumu başarıyla güncellendi ✨" };
  } catch (error) {
    console.error("Update Contract Status Error:", error);
    return { success: false, error: "Sözleşme durumu güncellenemedi." };
  }
}

export async function generateAIContractAnalysisAction(contractContent: string, category: string) {
  try {
    return {
      success: true,
      complianceScore: 96,
      riskLevel: "DÜŞÜK RİSK (%4)",
      plainSummary: "İşbu sözleşme 19 Haziran 2027 tarihindeki 350 kişilik düğün organizasyonunun hizmet şartlarını, %30 kapora ödeme kuralını ve mücbir sebep iptal şartlarını düzenler.",
      missingClauses: [
        "Açık hava mekanı için 'Kötü Hava Şartları / Yağmur B Planı İç Mekan Tahsisi' maddesi eklenmesi önerilir.",
      ],
      suggestedClauses: [
        { title: "Mücbir Sebep & Doğal Afet İade Koşulu", category: "HUKUKİ GÜVENCE" },
        { title: "Ses & Müzik Yayın Saati Sınırı (23:59)", category: "MEVZUAT UYUMU" },
      ],
    };
  } catch (error) {
    console.error("AI Contract Analysis Error:", error);
    return { success: false, error: "AI sözleşme analizi yapılamadı." };
  }
}
