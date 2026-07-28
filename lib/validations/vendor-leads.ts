import { z } from "zod";

export const leadStageEnum = z.enum([
  "NEW",
  "QUALIFIED",
  "CONTACTED",
  "OFFER_SENT",
  "NEGOTIATION",
  "WON",
  "LOST",
  "ARCHIVED",
]);

export const updateLeadStageSchema = z.object({
  leadId: z.string().min(1, "Müşteri ID gereklidir"),
  stage: leadStageEnum,
});

export const addLeadNoteSchema = z.object({
  leadId: z.string().min(1),
  noteText: z.string().min(3, "Not en az 3 karakter olmalıdır"),
});

export type UpdateLeadStageInput = z.infer<typeof updateLeadStageSchema>;
export type AddLeadNoteInput = z.infer<typeof addLeadNoteSchema>;
