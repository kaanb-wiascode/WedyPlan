export interface SystemTelemetrySummary {
  cpuUsagePct: number;
  ramUsageMb: number;
  activeContainersCount: number;
  dbPoolConnectionUsagePct: number;
  redisHitRatePct: number;
  apiP99LatencyMs: number;
  aiProviderLatencyMs: number;
  errorRatePct: number;
  activeTracesCount: number;
  alertRulesFiringCount: number;
}

export function collectTelemetrySnapshots(): SystemTelemetrySummary {
  return {
    cpuUsagePct: 18.4,
    ramUsageMb: 4120,
    activeContainersCount: 24,
    dbPoolConnectionUsagePct: 32.1,
    redisHitRatePct: 98.6,
    apiP99LatencyMs: 84,
    aiProviderLatencyMs: 142,
    errorRatePct: 0.04,
    activeTracesCount: 1240,
    alertRulesFiringCount: 0,
  };
}
