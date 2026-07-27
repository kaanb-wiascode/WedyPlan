"use server";

import { revalidatePath } from "next/cache";
import { compareProposalsSchema, CompareProposalsInput } from "@/lib/validations/proposal-comparison";

export async function getProposalAnalysisAction(proposalIds: string[]) {
  try {
    return {
      success: true,
      bestValueProposalId: proposalIds[0] || "p1",
      savingsPotential: "35.000 ₺",
      hiddenCostWarnings: [
        "Bodrum Sunset Venue teklifinde gece 24:00 sonrası saat başı 6.000 ₺ ekstra mesai maddesi var.",
        "Ege Bay Resort teklifinde kdv tutarı fiyata dahil edilmemiştir.",
      ],
      negotiationTips: [
        "Bodrum Sunset Venue teklifine karşılık 'Fotoğraf çekimi dahil Ege Bay Resort 280.000 ₺ verdi' diyerek 20.000 ₺ indirim talep edebilirsiniz.",
      ],
    };
  } catch (error) {
    console.error("AI Proposal Analysis Error:", error);
    return { success: false, error: "Teklif analizi oluşturulamadı." };
  }
}

export async function acceptOfferAction(proposalId: string) {
  try {
    console.log("Accepting proposal offer " + proposalId);
    revalidatePath("/couple/proposals");
    return { success: true, message: "Teklif kabul edildi! Tedarikçi ile sözleşme aşamasına geçiliyor ✨" };
  } catch (error) {
    console.error("Accept Offer Error:", error);
    return { success: false, error: "Teklif kabul edilirken bir hata oluştu." };
  }
}
