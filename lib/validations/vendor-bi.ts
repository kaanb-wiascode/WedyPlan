import { z } from "zod";

export const timeframeEnum = z.enum(["DAILY", "WEEKLY", "MONTHLY", "ANNUAL"]);
export const dashboardViewEnum = z.enum([
  "EXECUTIVE",
  "SALES",
  "MARKETING",
  "FINANCE",
  "OPERATIONS",
]);

export const biFilterSchema = z.object({
  timeframe: timeframeEnum.default("MONTHLY"),
  viewMode: dashboardViewEnum.default("EXECUTIVE"),
});

export type BIFilterInput = z.infer<typeof biFilterSchema>;
