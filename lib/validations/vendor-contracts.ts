import { z } from "zod";

export const contractStatusEnum = z.enum([
  "DRAFT",
  "WAITING_CUSTOMER_APPROVAL",
  "WAITING_VENDOR_APPROVAL",
  "PENDING_PAYMENT",
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
  "EXPIRED",
  "ARCHIVED",
]);

export const createContractSchema = z.object({
  title: z.string().min(3, "Sözleşme başlığı gereklidir"),
  coupleName: z.string().min(2, "Çift / Müşteri adı gereklidir"),
  weddingDate: z.string().min(1, "Düğün tarihi seçilmelidir"),
  totalAmount: z.number().min(1, "Sözleşme tutarı 0'dan büyük olmalıdır"),
  depositAmount: z.number().min(0),
  expirationDate: z.string().min(1, "Son geçerlilik tarihi gereklidir"),
  content: z.string().min(20, "Sözleşme içeriği en az 20 karakter olmalıdır"),
  selectedClauses: z.array(z.string()).optional(),
});

export const updateContractStatusSchema = z.object({
  contractId: z.string().min(1),
  status: contractStatusEnum,
  notes: z.string().optional(),
});

export type CreateContractInput = z.infer<typeof createContractSchema>;
export type UpdateContractStatusInput = z.infer<typeof updateContractStatusSchema>;
