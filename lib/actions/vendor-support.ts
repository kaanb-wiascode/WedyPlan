"use server";

import { revalidatePath } from "next/cache";
import { createTicketSchema, CreateTicketInput } from "@/lib/validations/vendor-support";

export async function createVendorSupportTicketAction(vendorId: string, data: CreateTicketInput) {
  const validation = createTicketSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    console.log("Creating support ticket for vendor " + vendorId + ":", validation.data);
    revalidatePath("/vendor/support");
    return {
      success: true,
      message: "Destek talebiniz oluşturuldu. Müşteri temsilcimiz ve AI Copilot incelemeye aldı ✨",
      ticketId: "tkt_" + Date.now(),
    };
  } catch (error) {
    console.error("Create Support Ticket Error:", error);
    return { success: false, error: "Destek talebi oluşturulamadı." };
  }
}

export async function generateAISupportSolutionAction(subject: string, message: string) {
  try {
    let suggestedCategory = "TECHNICAL";
    let priority = "MEDIUM";

    if (message.toLowerCase().includes("fatura") || message.toLowerCase().includes("ödeme")) {
      suggestedCategory = "BILLING";
      priority = "HIGH";
    }

    return {
      success: true,
      suggestedCategory,
      detectedPriority: priority,
      suggestedSolution: "İncelediğimiz kadarıyla durumunuz ödeme altyapısı güncellemesiyle ilgili olabilir. 'Abonelik & Fatura Merkezi' sekmesinden kayıtlı kartınızı doğrulamanız sorunu anında çözecektir.",
      relatedKbArticles: [
        { id: "kb_1", title: "Fatura ve Kredi Kartı Güncelleme Rehberi", readTime: "2 dk" },
        { id: "kb_2", title: "AI Mesaj Kredileri Nasıl Tanımlanır?", readTime: "1 dk" },
      ],
      isDuplicateRisk: false,
    };
  } catch (error) {
    console.error("AI Support Solution Error:", error);
    return { success: false, error: "AI çözüm önerisi üretilemedi." };
  }
}

export async function getSystemStatusAction() {
  try {
    return {
      success: true,
      overallStatus: "OPERATIONAL",
      uptimePercentage: "99.98%",
      services: [
        { name: "Pazar Yeri & Vitrin Servisi", status: "ONLINE", latency: "24ms" },
        { name: "Ödeme & Escrow Altyapısı", status: "ONLINE", latency: "42ms" },
        { name: "AI Assistant & Copilot API", status: "ONLINE", latency: "110ms" },
        { name: "Sözleşme & E-İmza Motoru", status: "ONLINE", latency: "35ms" },
      ],
    };
  } catch (error) {
    console.error("Get System Status Error:", error);
    return { success: false, error: "Sistem durumu alınamadı." };
  }
}
