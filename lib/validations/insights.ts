import { z } from "zod";

export const insightsFilterSchema = z.object({
  timeframe: z.enum(["ALL", "30_DAYS", "7_DAYS"]).default("ALL"),
  categoryFocus: z.string().optional(),
});

export type InsightsFilterInput = z.infer<typeof insightsFilterSchema>;
