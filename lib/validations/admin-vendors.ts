import { z } from "zod";

export const vendorStatusEnum = z.enum(["ACTIVE", "PENDING_APPROVAL", "SUSPENDED", "BLACKLISTED"]);
export const verificationStatusEnum = z.enum(["VERIFIED", "PENDING_DOCS", "REJECTED"]);

export const approveVendorSchema = z.object({
  vendorId: z.string().min(1, "Tedarikçi ID gereklidir"),
  commissionPercentage: z.number().min(0).max(50).default(5),
  isFeatured: z.boolean().default(false),
  isPremium: z.boolean().default(false),
});

export const suspendVendorSchema = z.object({
  vendorId: z.string().min(1, "Tedarikçi ID gereklidir"),
  action: z.enum(["SUSPEND", "BLACKLIST", "REINSTATE"]),
  reason: z.string().min(5, "Lütfen işlem gerekçesini belirtiniz"),
});

export const issueWarningSchema = z.object({
  vendorId: z.string().min(1, "Tedarikçi ID gereklidir"),
  violationType: z.enum(["OFF_PLATFORM_PAYMENT", "MISCONDUCT", "SLA_BREACH", "FAKE_REVIEWS"]),
  penaltyPoints: z.number().min(1).max(100),
  details: z.string().min(10, "Uyarı detayları girilmelidir"),
});

export type ApproveVendorInput = z.infer<typeof approveVendorSchema>;
export type SuspendVendorInput = z.infer<typeof suspendVendorSchema>;
export type IssueWarningInput = z.infer<typeof issueWarningSchema>;
