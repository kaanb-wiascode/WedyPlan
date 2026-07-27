import { z } from "zod";

export const checklistTaskSchema = z.object({
  title: z.string().min(2, "Görev başlığı en az 2 karakter olmalıdır"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Kategori seçiniz"),
  dueDate: z.string().min(1, "Son tarih seçiniz"),
  priority: z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"]).default("MEDIUM"),
  assignedTo: z.enum(["UNASSIGNED", "SELF", "PARTNER", "VENDOR"]).default("UNASSIGNED"),
  vendorName: z.string().optional(),
  isRecurring: z.boolean().default(false),
});

export type ChecklistTaskFormData = z.infer<typeof checklistTaskSchema>;
