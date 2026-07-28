import { z } from "zod";

export const ticketCategoryEnum = z.enum([
  "TECHNICAL",
  "BILLING",
  "ESCROW_DISPUTE",
  "ONBOARDING",
  "D_DAY_EMERGENCY",
]);

export const ticketPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT_D_DAY"]);
export const ticketStatusEnum = z.enum(["OPEN", "PENDING_CUSTOMER", "RESOLVED", "ESCALATED"]);

export const processTicketResponseSchema = z.object({
  ticketId: z.string().min(1, "Bilet ID gereklidir"),
  messageText: z.string().min(2, "Yanıt metni boş olamaz"),
  isInternalNote: z.boolean().default(false),
  assignedAgent: z.string().optional(),
});

export const updateTicketStatusSchema = z.object({
  ticketId: z.string().min(1, "Bilet ID gereklidir"),
  status: ticketStatusEnum,
  priority: ticketPriorityEnum.optional(),
  escalationReason: z.string().optional(),
});

export type ProcessTicketResponseInput = z.infer<typeof processTicketResponseSchema>;
export type UpdateTicketStatusInput = z.infer<typeof updateTicketStatusSchema>;
