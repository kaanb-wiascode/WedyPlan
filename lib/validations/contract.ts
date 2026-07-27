import { z } from "zod";

export const contractSchema = z.object({
  title: z.string().min(3, "Sözleşme başlığı en az 3 karakter olmalıdır"),
  vendorName: z.string().min(2, "Tedarikçi adı belirtilmelidir"),
  category: z.string().min(1, "Kategori seçilmelidir"),
  amount: z.number().positive("Tutar pozitif olmalıdır"),
  currency: z.enum(["TRY", "USD", "EUR", "GBP"]).default("TRY"),
  status: z.enum(["PENDING", "SIGNED", "EXPIRED", "CANCELLED"]).default("PENDING"),
  expiryDate: z.string().optional(),
  fileUrl: z.string().optional(),
  notes: z.string().optional(),
});

export const signContractSchema = z.object({
  contractId: z.string().min(1, "Sözleşme ID gereklidir"),
  signatureData: z.string().min(10, "Geçerli bir dijital imza gereklidir"),
  confirmedTerms: z.boolean().refine((val) => val === true, "Şartları onaylamalısınız"),
});

export type ContractFormData = z.infer<typeof contractSchema>;
export type SignContractInput = z.infer<typeof signContractSchema>;
