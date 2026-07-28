export interface PerformanceSummary {
  overallScore: number;
  lcpMs: number;
  clsScore: number;
  inpMs: number;
  ttfbMs: number;
  fpsAvg: number;
  cdnCacheHitRatePct: number;
  aiResponseLatencyMs: number;
  routesPerformance: Array<{
    path: string;
    lcp: number;
    inp: number;
    cls: number;
    status: "GOOD" | "NEEDS_IMPROVEMENT" | "POOR";
  }>;
}

export function getPerformanceStatusSnapshot(): PerformanceSummary {
  return {
    overallScore: 98,
    lcpMs: 820,
    clsScore: 0.01,
    inpMs: 42,
    ttfbMs: 64,
    fpsAvg: 60,
    cdnCacheHitRatePct: 99.4,
    aiResponseLatencyMs: 142,
    routesPerformance: [
      { path: "/marketplace/wedding-venues", lcp: 740, inp: 38, cls: 0.00, status: "GOOD" },
      { path: "/couple/dashboard", lcp: 880, inp: 45, cls: 0.01, status: "GOOD" },
      { path: "/vendor/offers", lcp: 920, inp: 52, cls: 0.02, status: "GOOD" },
      { path: "/api/ai/copilot-draft", lcp: 1100, inp: 85, cls: 0.00, status: "NEEDS_IMPROVEMENT" },
    ],
  };
}
