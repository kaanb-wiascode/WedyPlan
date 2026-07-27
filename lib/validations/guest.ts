import { z } from "zod";

export const guestSchema = z.object({
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz").optional().or(z.literal("")),
  phone: z.string().optional(),
  category: z.enum(["FAMILY", "FRIEND", "VIP", "WORK", "NEIGHBOR"]).default("FRIEND"),
  isChild: z.boolean().default(false),
  plusOneAllowed: z.boolean().default(false),
  plusOneName: z.string().optional(),
  rsvpStatus: z.enum(["PENDING", "CONFIRMED", "DECLINED"]).default("PENDING"),
  dietaryPreference: z.enum(["NONE", "VEGAN", "VEGETARIAN", "GLUTEN_FREE", "HALAL"]).default("NONE"),
  allergies: z.string().optional(),
  needsTransport: z.boolean().default(false),
  needsAccommodation: z.boolean().default(false),
  tableId: z.string().optional(),
  notes: z.string().optional(),
  giftReceived: z.string().optional(),
});

export type GuestFormData = z.infer<typeof guestSchema>;
