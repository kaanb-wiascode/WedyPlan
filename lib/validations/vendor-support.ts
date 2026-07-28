import { z } from "zod";

export const ticketCategoryEnum = z.enum([
  "TECHNICAL",
  "BILLING",
  "ACCOUNT",
  "CAMPAIGN",
  "LEADS",
  "PAYMENTS",
  "CONTRACTS",
  "SUGGESTIONS",
]);

export const ticketPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
export const ticketStatusEnum = z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "ARCHIVED"]);

export const createTicketSchema = z.object({
  subject: z.string().min(3, "Bilet konusu en az 3 karakter olmalıdır"),
  category: ticketCategoryEnum,
  priority: ticketPriorityEnum.default("MEDIUM"),
  message: z.string().min(15, "Sorun açıklaması en az 15 karakter olmalıdır"),
  attachments: z.array(z.string()).optional(),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
