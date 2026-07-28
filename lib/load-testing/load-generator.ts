export interface LoadBenchmarkSummary {
  testId: string;
  scenarioName: string;
  targetModule: string;
  concurrentUsersCount: number;
  achievedRps: number;
  avgResponseMs: number;
  p95Ms: number;
  p99Ms: number;
  dbPoolUsagePct: number;
  queueLength: number;
  status: "COMPLETED" | "RUNNING" | "FAILED_SLA";
}

export function getLoadTestingStatusSnapshot(): LoadBenchmarkSummary[] {
  return [
    {
      testId: "bench_01",
      scenarioName: "Peak Season Wedding Venue Search Spike",
      targetModule: "Marketplace Search Engine",
      concurrentUsersCount: 15000,
      achievedRps: 4200,
      avgResponseMs: 14,
      p95Ms: 32,
      p99Ms: 58,
      dbPoolUsagePct: 42.1,
      queueLength: 0,
      status: "COMPLETED",
    },
    {
      testId: "bench_02",
      scenarioName: "AI Copilot Concurrent Proposal Draft Generation",
      targetModule: "AI Central Brain Coordinator",
      concurrentUsersCount: 2500,
      achievedRps: 850,
      avgResponseMs: 124,
      p95Ms: 180,
      p99Ms: 240,
      dbPoolUsagePct: 28.4,
      queueLength: 12,
      status: "COMPLETED",
    },
    {
      testId: "bench_03",
      scenarioName: "Flash Deal Checkout & Iyzico Payment Load",
      targetModule: "Checkout & Payment Gateway",
      concurrentUsersCount: 8000,
      achievedRps: 1800,
      avgResponseMs: 38,
      p95Ms: 64,
      p99Ms: 92,
      dbPoolUsagePct: 56.0,
      queueLength: 4,
      status: "COMPLETED",
    },
  ];
}
