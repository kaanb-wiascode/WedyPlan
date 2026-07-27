import { z } from "zod";

export const timelineTaskSchema = z.object({
  title: z.string().min(2, "Görev başlığı en az 2 karakter olmalıdır"),
  description: z.string().optional(),
  dueDate: z.string().min(1, "Son tarih seçiniz"),
  priority: z.enum(["CRITICAL", "HIGH", "MEDIUM", "LOW"]).default("MEDIUM"),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "DELAYED"]).default("PENDING"),
  category: z.enum(["VENUE", "VENDOR", "ATTIRE", "INVITATION", "LEGAL", "DAY_OF"]).default("VENDOR"),
  parentTaskId: z.string().optional(),
  vendorName: z.string().optional(),
  isMilestone: z.boolean().default(false),
});

export type TimelineTaskFormData = z.infer<typeof timelineTaskSchema>;
