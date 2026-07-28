import { z } from "zod";

export const webVitalMetricEnum = z.enum(["LCP", "CLS", "INP", "TTFB", "FPS", "MEMORY", "CPU"]);

export const recordPerformanceMetricSchema = z.object({
  routePath: z.string().min(1, "Rota path zorunludur"),
  metricType: webVitalMetricEnum.default("LCP"),
  metricValue: z.number(),
  deviceCategory: z.enum(["DESKTOP", "MOBILE", "TABLET"]).default("DESKTOP"),
});

export const applyOptimizationRuleSchema = z.object({
  targetModule: z.string().min(1),
  optimizationType: z.enum(["CODE_SPLITTING", "LAZY_LOADING", "STREAMING", "EDGE_CACHE", "DB_INDEXING"]),
});

export type RecordPerformanceMetricInput = z.infer<typeof recordPerformanceMetricSchema>;
export type ApplyOptimizationRuleInput = z.infer<typeof applyOptimizationRuleSchema>;
