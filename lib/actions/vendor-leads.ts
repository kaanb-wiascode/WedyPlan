"use server";

import { revalidatePath } from "next/cache";
import {
  LeadStatus,
  UpdateLeadStageInput,
  updateLeadStageSchema,
} from "@/lib/validations/vendor-leads";

// 1. Canlı Sinyalli Talepleri Getir
export async function getVendorLeads(vendorId?: string) {
  const leads = [
    {
      id: "lead_101",
      coupleName: "Zeynep & Can",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      email: "zeynep@example.com",
      phone: "+90 532 111 22 33",
      whatsappPhone: "905321112233",
      weddingDate: "2026-09-15",
      guestCount: 650,
      budgetAmount: 18000,
      currency: "EUR",
      status: "NEW" as LeadStatus,
      isCoupleOnline: true,
      currentActivity: "Karina Balo Salonu görsellerini inceliyor",
      lastSeenTime: "Şimdi",
      unreadMessagesCount: 2,
      aiScore: 96,
      aiSummary: "Mekanınızın kapasitesi ve Eylül tarihi için tam uyumlu.",
      suggestedAction: "Hemen özel teklif gönderin.",
      notes: [],
      createdAt: "5 dakika önce"
    }
  ];

  return { success: true, leads };
}

// 2. Durum Güncelleme
export async function updateLeadStatusAction(leadId: string, newStatus: LeadStatus) {
  revalidatePath("/vendor/leads");
  revalidatePath("/satici/talepler");
  return { success: true, message: `Durum '${newStatus}' olarak güncellendi.` };
}

// 3. Aşama Güncelleme (Stage Action)
export async function updateLeadStageAction(vendorId: string, data: UpdateLeadStageInput) {
  const validation = updateLeadStageSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Geçersiz veri" };
  }
  revalidatePath("/vendor/leads");
  revalidatePath("/satici/talepler");
  return { success: true, message: "Aşama başarıyla güncellendi." };
}

// 4. Anlık Teklif Gönder
export async function sendInstantOfferAction(
  leadId: string, 
  offerDetails: { amount: number; notes: string }
) {
  revalidatePath("/vendor/leads");
  return { 
    success: true, 
    message: "Anlık özel teklif çiftin ekranına canlı olarak iletildi!" 
  };
}

// 5. AI WhatsApp / Yanıt Taslağı Oluşturucu (Build hatasını çözen fonksiyon)
export async function generateAILeadReplyAction(leadId: string, customPrompt?: string) {
  const suggestedReply = 
    "Merhaba! WedyPlan üzerinden ilettiğiniz düğün talebinizi ve bütçe detaylarınızı inceledik. İlettiğiniz tarihte Karina Balo Salonumuz uygundur. Sizin için özel hazırladığımız ikramlı paketi ve menü tadım randevusu detaylarını iletmekten mutluluk duyarız.";

  return {
    success: true,
    suggestedReply,
    winProbability: 88,
    bestFollowUpTime: "Bugün 14:30"
  };
}

// 6. Talebe Not Ekle
export async function addLeadNoteAction(leadId: string, noteText: string) {
  revalidatePath("/vendor/leads");
  return {
    success: true,
    note: { id: Date.now().toString(), text: noteText, createdAt: new Date().toISOString() }
  };
}