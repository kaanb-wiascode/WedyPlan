import { z } from "zod";

export const vendorContextTypeEnum = z.enum([
  "FINANCE",
  "CONTRACT",
  "MARKETING",
  "GENERAL",
  "LEAD",
  "PROPOSAL",
]);

export const sendVendorAIChatSchema = z.object({
  message: z.string().min(1, "Mesaj boş olamaz"),
  contextType: vendorContextTypeEnum.optional().default("GENERAL"),
  leadId: z.string().optional(),
});

export const generateQuickCopilotDraftSchema = z.object({
  actionType: z.string().optional(),
  draftType: z.string().optional(),
  promptHint: z.string().optional(),
  recipientName: z.string().optional(),
  targetLeadId: z.string().optional(),
});

export const getVendorAIDailyBriefingSchema = z.object({
  vendorId: z.string().min(1, "Tedarikçi ID zorunludur"),
});

export type SendVendorAIChatInput = z.infer<typeof sendVendorAIChatSchema>;
export type GenerateQuickCopilotDraftInput = z.infer<typeof generateQuickCopilotDraftSchema>;
export type GetVendorAIDailyBriefingInput = z.infer<typeof getVendorAIDailyBriefingSchema>;