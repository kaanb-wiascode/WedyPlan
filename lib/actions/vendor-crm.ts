"use server";

import { revalidatePath } from "next/cache";
import { updateCustomerSegmentSchema, UpdateCustomerSegmentInput } from "@/lib/validations/vendor-crm";

export async function updateCustomerSegmentAction(vendorId: string, data: UpdateCustomerSegmentInput) {
  const validation = updateCustomerSegmentSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Updating customer " + data.customerId + " segment to " + data.segment + " for vendor " + vendorId);
    revalidatePath("/vendor/crm");
    return { success: true, message: "Müşteri segmenti başarıyla güncellendi ✨" };
  } catch (error) {
    console.error("Update Customer Segment Error:", error);
    return { success: false, error: "Müşteri segmenti güncellenemedi." };
  }
}

export async function generateAICRMSummaryAction(customerId: string, coupleName: string) {
  try {
    return {
      success: true,
      healthScore: 95,
      churnRisk: "%3 (Düşük Risk)",
      summary: coupleName + " çifti ile yapılan 3 görüşme sonucunda 350 kişilik düğün paketi ve menü tadımı onaylandı. Ödemelerin %60'ı tamamlandı. Herhangi bir memnuniyetsizlik tespiti yok.",
      nextBestAction: "Düğüne 30 gün kala müzik akışı ve giriş seremonisi detaylarını teyit etmek için iletişime geçin.",
      upsellSuggestions: [
        { title: "Gece Sonu Kokteyl İkramı", price: "12.000 ₺", impact: "%15 Kar Artışı" },
        { title: "Kişiye Özel İsimli Anı Panosu", price: "6.500 ₺", impact: "Müşteri Sadakati" },
      ],
    };
  } catch (error) {
    console.error("AI CRM Summary Error:", error);
    return { success: false, error: "AI özeti üretilemedi." };
  }
}
