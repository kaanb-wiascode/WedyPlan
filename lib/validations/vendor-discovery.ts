import { z } from "zod";

export const vendorFilterSchema = z.object({
  category: z.string().default("ALL"),
  city: z.string().optional(),
  priceRange: z.string().optional(),
  minRating: z.number().min(0).max(5).optional(),
  isVerified: z.boolean().default(false),
  hasCampaign: z.boolean().default(false),
  searchQuery: z.string().optional(),
});

export type VendorFilterFormData = z.infer<typeof vendorFilterSchema>;
