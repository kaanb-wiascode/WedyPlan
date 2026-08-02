import { z } from "zod";

export const LeadStatusEnum = z.enum([
  "NEW",             // Yeni Gelen Talep
  "CONTACTED",       // İletişim Kuruldu
  "PROPOSAL_SENT",   // Teklif Gönderildi
  "CONTRACT_STAGE",  // Sözleşme Aşaması
  "WON",             // Anlaşıldı (Kazanıldı)
  "LOST"             // Kaybedildi
]);

export type LeadStatus = z.infer<typeof LeadStatusEnum>;

export const LeadSchema = z.object({
  id: z.string(),
  coupleName: z.string().min(2, "Çift adı gereklidir"),
  avatarUrl: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
  whatsappPhone: z.string().optional(),
  weddingDate: z.string(),
  guestCount: z.number().min(1),
  budgetAmount: z.number().optional(),
  currency: z.string().default("EUR"),
  status: LeadStatusEnum,

  // ANLIK ETKİLEŞİM & PRESENCE METRİKLERİ
  isCoupleOnline: z.boolean().default(false),
  currentActivity: z.string().optional(),
  lastSeenTime: z.string().optional(),
  unreadMessagesCount: z.number().default(0),

  // AI SATIŞ SİNYALLERİ & SKORLAMA
  aiScore: z.number().min(0).max(100).default(50),
  aiSummary: z.string().optional(),
  suggestedAction: z.string().optional(),
  
  notes: z.array(z.object({
    id: z.string(),
    text: z.string(),
    createdAt: z.string(),
    author: z.string().optional()
  })).default([]),

  createdAt: z.string()
});

// Aşama/Durum Güncelleme Şeması (Build hatasını çözen kısım)
export const updateLeadStageSchema = z.object({
  leadId: z.string().optional(),
  status: LeadStatusEnum.optional(),
  stage: LeadStatusEnum.optional(),
  newStatus: LeadStatusEnum.optional(),
  newStage: LeadStatusEnum.optional(),
});

// Tip Tanımları
export type LeadFormValues = z.infer<typeof LeadSchema>;
export type Lead = LeadFormValues;
export type UpdateLeadStageInput = z.infer<typeof updateLeadStageSchema>;