import { z } from "zod";

export const biTimeframeEnum = z.enum(["TODAY", "LAST_7_DAYS", "THIS_MONTH", "YTD", "LTM"]);
export const biDashboardTabEnum = z.enum([
  "EXECUTIVE",
  "SALES",
  "MARKETING",
  "FINANCE",
  "SUPPORT",
  "OPERATIONS",
  "AI",
  "MARKETPLACE",
  "GROWTH",
]);

export const biFilterSchema = z.object({
  timeframe: biTimeframeEnum.default("THIS_MONTH"),
  selectedTab: biDashboardTabEnum.default("EXECUTIVE"),
  region: z.string().optional(),
});

export type BIFilterInput = z.infer<typeof biFilterSchema>;
