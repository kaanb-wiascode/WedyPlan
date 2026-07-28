import { z } from "zod";

export const dealStageEnum = z.enum(["LEAD_QUALIFIED", "PROPOSAL_SENT", "NEGOTIATION", "CLOSED_WON", "CLOSED_LOST"]);

export const processSalesQuerySchema = z.object({
  opportunityId: z.string().min(1, "Fırsat ID gereklidir"),
  userQuery: z.string().min(1, "Mesaj veya sorgu boş olamaz"),
  offeredAmount: z.number().optional().default(450000),
  callerPortal: z.enum(["COUPLE", "VENDOR", "PUBLIC", "ADMIN"]).default("ADMIN"),
});

export const optimizeProposalSchema = z.object({
  opportunityId: z.string().min(1, "Fırsat ID gereklidir"),
  targetUpsellItem: z.string().optional(),
  discountRatePct: z.number().min(0).max(30).default(5),
});

export type ProcessSalesQueryInput = z.infer<typeof processSalesQuerySchema>;
export type OptimizeProposalInput = z.infer<typeof optimizeProposalSchema>;
