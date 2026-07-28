import { z } from "zod";

export const forecastMetricEnum = z.enum([
  "REVENUE",
  "DEMAND",
  "VENDOR_GROWTH",
  "CUSTOMER_GROWTH",
  "CANCELLATION",
  "RENEWALS",
  "SUPPORT_LOAD",
  "MARKETING_ROI",
]);

export const runForecastModelSchema = z.object({
  metric: forecastMetricEnum.default("REVENUE"),
  timeHorizonDays: z.number().min(30).max(365).default(90),
  confidenceIntervalPct: z.number().min(80).max(99).default(95),
  growthScenario: z.enum(["PESSIMISTIC", "BASELINE", "OPTIMISTIC"]).default("BASELINE"),
});

export const predictRiskSchema = z.object({
  targetScope: z.enum(["PLATFORM_WIDE", "VENDOR_RENEWALS", "SUPPORT_SLA"]),
  riskThresholdPct: z.number().min(10).max(90).default(20),
});

export type RunForecastModelInput = z.infer<typeof runForecastModelSchema>;
export type PredictRiskInput = z.infer<typeof predictRiskSchema>;
