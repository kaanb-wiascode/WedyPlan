import { z } from "zod";

export const OnboardingFormSchema = z.object({
  brideFirstName: z.string().optional(),
  brideLastName: z.string().optional(),
  groomFirstName: z.string().optional(),
  groomLastName: z.string().optional(),
  partnerEmail: z.string().email().optional().or(z.literal("")),
  weddingDate: z.string().optional(),
  weddingCity: z.string().optional(), // 👈 Buraya eklendi!
  languages: z.array(z.string()).default(["TR"]),
  estimatedGuestCount: z.number().default(150),
  estimatedBudget: z.number().default(250000),
  // ... diğer mevcut alanlarınız ...
});

export type OnboardingFormData = z.infer<typeof OnboardingFormSchema>;