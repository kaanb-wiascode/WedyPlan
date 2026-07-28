import { z } from "zod";

export const fraudTargetTypeEnum = z.enum([
  "FAKE_VENDOR",
  "FAKE_COUPLE",
  "SPAM_BOT",
  "PAYMENT_FRAUD",
  "COUPON_ABUSE",
  "FAKE_REVIEW",
]);

export const scanFraudRiskSchema = z.object({
  targetType: fraudTargetTypeEnum.default("FAKE_VENDOR"),
  entityId: z.string().min(1, "Entity ID zorunludur"),
  ipAddress: z.string().default("192.168.1.1"),
  deviceFingerprint: z.string().default("fp_browser_hash_99"),
  contentPayload: z.string().optional(),
});

export const resolveFraudIncidentSchema = z.object({
  incidentId: z.string().min(1),
  action: z.enum(["CONFIRM_BLOCK", "CLEAR_SAFE", "REQUEST_KYC"]),
  notes: z.string().optional(),
});

export type ScanFraudRiskInput = z.infer<typeof scanFraudRiskSchema>;
export type ResolveFraudIncidentInput = z.infer<typeof resolveFraudIncidentSchema>;
