import { z } from "zod";

export const ticketPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL_URGENT"]);
export const ticketCategoryEnum = z.enum(["BILLING_ESCROW", "CONTRACT_DISPUTE", "TECHNICAL_ISSUE", "VENDOR_ONBOARDING"]);

export const processSupportQuerySchema = z.object({
  ticketId: z.string().min(1, "Bilet ID gereklidir"),
  userQuery: z.string().min(1, "Mesaj boş olamaz"),
  callerPortal: z.enum(["COUPLE", "VENDOR", "PUBLIC", "ADMIN"]).default("COUPLE"),
  userLanguage: z.string().default("TR"),
});

export const approveReplySchema = z.object({
  ticketId: z.string().min(1, "Bilet ID gereklidir"),
  finalReplyText: z.string().min(2, "Yanıt metni gereklidir"),
  operatorId: z.string().optional(),
});

export const escalateTicketSchema = z.object({
  ticketId: z.string().min(1, "Bilet ID gereklidir"),
  reason: z.string().min(5, "Eskalasyon gerekçesi zorunludur"),
});

export type ProcessSupportQueryInput = z.infer<typeof processSupportQuerySchema>;
export type ApproveReplyInput = z.infer<typeof approveReplySchema>;
export type EscalateTicketInput = z.infer<typeof escalateTicketSchema>;
