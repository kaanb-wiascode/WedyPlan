import { z } from "zod";

export const violationCategoryEnum = z.enum([
  "SPAM",
  "FAKE_ACCOUNT",
  "COPYRIGHT_INFRINGEMENT",
  "COMMUNITY_VIOLATION",
  "OFF_PLATFORM_PAYMENT_BYPASS",
  "TOXIC_LANGUAGE",
]);

export const moderationDecisionEnum = z.enum([
  "APPROVE_CLEAN",
  "REMOVE_CONTENT",
  "ISSUE_WARNING",
  "BAN_ACCOUNT",
  "DISMISS_REPORT",
]);

export const resolveReportSchema = z.object({
  reportId: z.string().min(1, "Rapor ID gereklidir"),
  decision: moderationDecisionEnum,
  reasonNotes: z.string().min(5, "Lütfen karar gerekçesini açıklayınız"),
  applyBan: z.boolean().default(false),
});

export type ResolveReportInput = z.infer<typeof resolveReportSchema>;
