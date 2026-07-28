import { z } from "zod";

export const interactWithPlannerSchema = z.object({
  coupleId: z.string().min(1, "Çift ID gereklidir"),
  userMessage: z.string().min(1, "Mesaj boş olamaz"),
  weddingDate: z.string().optional(),
  totalBudget: z.number().optional().default(750000),
  city: z.string().optional().default("Bodrum"),
});

export const createChecklistSchema = z.object({
  coupleId: z.string().min(1, "Çift ID gereklidir"),
  daysRemaining: z.number().min(1).default(120),
  guestCount: z.number().default(200),
});

export type InteractWithPlannerInput = z.infer<typeof interactWithPlannerSchema>;
export type CreateChecklistInput = z.infer<typeof createChecklistSchema>;
