import { z } from "zod";

export const vendorDashboardFilterSchema = z.object({
  timeframe: z.enum(["TODAY", "THIS_MONTH", "THIS_QUARTER", "THIS_YEAR"]).default("THIS_MONTH"),
  category: z.string().optional(),
});

export type VendorDashboardFilterInput = z.infer<typeof vendorDashboardFilterSchema>;
