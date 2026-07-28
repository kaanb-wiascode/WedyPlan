export interface ServiceSLOStatus {
  serviceName: string;
  targetSloPct: number;
  currentSliPct: number;
  remainingErrorBudgetPct: number;
  burnRateMultiplier: number;
  status: "HEALTHY" | "WARNING" | "BUDGET_EXHAUSTED";
}

export function calculateErrorBudgets(): ServiceSLOStatus[] {
  return [
    {
      serviceName: "Checkout & Payment API",
      targetSloPct: 99.95,
      currentSliPct: 99.98,
      remainingErrorBudgetPct: 84.2,
      burnRateMultiplier: 0.8,
      status: "HEALTHY",
    },
    {
      serviceName: "AI Central Brain Coordinator",
      targetSloPct: 99.90,
      currentSliPct: 99.82,
      remainingErrorBudgetPct: 41.0,
      burnRateMultiplier: 1.4,
      status: "WARNING",
    },
    {
      serviceName: "PostgreSQL Database Core",
      targetSloPct: 99.99,
      currentSliPct: 99.99,
      remainingErrorBudgetPct: 96.5,
      burnRateMultiplier: 0.2,
      status: "HEALTHY",
    },
    {
      serviceName: "Search Vector Indexing Engine",
      targetSloPct: 99.90,
      currentSliPct: 99.95,
      remainingErrorBudgetPct: 91.0,
      burnRateMultiplier: 0.5,
      status: "HEALTHY",
    },
  ];
}
