import { z } from "zod";

export const interactWithVendorCoachSchema = z.object({
  vendorId: z.string().min(1, "Tedarikçi ID gereklidir"),
  userMessage: z.string().min(1, "Mesaj boş olamaz"),
  category: z.string().optional().default("VENUE"),
  city: z.string().optional().default("Bodrum"),
});

export const generateProposalSchema = z.object({
  vendorId: z.string().min(1, "Tedarikçi ID gereklidir"),
  leadId: z.string().min(1, "Talep ID gereklidir"),
  offeredPrice: z.number().min(1000, "Teklif fiyatı gereklidir"),
  specialDiscountPct: z.number().min(0).max(50).default(5),
  customNote: z.string().optional(),
});

export type InteractWithVendorCoachInput = z.infer<typeof interactWithVendorCoachSchema>;
export type GenerateProposalInput = z.infer<typeof generateProposalSchema>;
