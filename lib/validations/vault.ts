import { z } from "zod";

export const uploadDocumentSchema = z.object({
  title: z.string().min(2, "Dosya adı en az 2 karakter olmalıdır"),
  category: z.enum(["CONTRACT", "INVOICE", "RECEIPT", "GUEST_FILE", "VENDOR_FILE", "MEDIA", "CERTIFICATE"]).default("CONTRACT"),
  folderName: z.string().default("Genel Belgeler"),
  fileUrl: z.string().min(1, "Lütfen bir dosya seçiniz"),
  fileSizeMb: z.number().positive(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type UploadDocumentInput = z.infer<typeof uploadDocumentSchema>;
