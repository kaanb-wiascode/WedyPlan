import { z } from "zod";

export const payoutStatusEnum = z.enum(["PENDING_ESCROW", "RELEASED", "HELD_DISPUTE", "CANCELLED"]);

export const processPayoutSchema = z.object({
  payoutId: z.string().min(1, "Hakediş ID gereklidir"),
  vendorId: z.string().min(1, "Tedarikçi ID gereklidir"),
  amount: z.number().min(1, "Tutar 0'dan büyük olmalıdır"),
  action: z.enum(["RELEASE", "HOLD", "CANCEL"]),
  notes: z.string().optional(),
});

export const handleChargebackSchema = z.object({
  chargebackId: z.string().min(1, "Ters İbraz ID gereklidir"),
  action: z.enum(["ACCEPT", "CONTEST_WITH_EVIDENCE"]),
  evidenceDetails: z.string().optional(),
});

export type ProcessPayoutInput = z.infer<typeof processPayoutSchema>;
export type HandleChargebackInput = z.infer<typeof handleChargebackSchema>;
