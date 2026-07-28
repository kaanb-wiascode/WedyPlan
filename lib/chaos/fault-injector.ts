export interface ActiveChaosExperimentSummary {
  experimentId: string;
  name: string;
  targetService: string;
  type: string;
  status: "RUNNING" | "COMPLETED" | "ABORTED";
  resilienceScorePct: number;
  mttrSeconds: number;
  intensityPct: number;
}

export function getChaosStatusSnapshot(): ActiveChaosExperimentSummary[] {
  return [
    {
      experimentId: "exp_01",
      name: "AI Gateway Timeout & Fallback Simulation",
      targetService: "AI Central Brain Coordinator",
      type: "AI_PROVIDER_FAILURE",
      status: "COMPLETED",
      resilienceScorePct: 98.4,
      mttrSeconds: 2,
      intensityPct: 60,
    },
    {
      experimentId: "exp_02",
      name: "PostgreSQL Read-Replica Failover Test",
      targetService: "PostgreSQL Primary Cluster",
      type: "DATABASE_FAILURE",
      status: "COMPLETED",
      resilienceScorePct: 99.2,
      mttrSeconds: 4,
      intensityPct: 80,
    },
    {
      experimentId: "exp_03",
      name: "Redis Cache Eviction & Memory Saturation",
      targetService: "Redis Cache & Queue Engine",
      type: "MEMORY_SATURATION",
      status: "COMPLETED",
      resilienceScorePct: 96.8,
      mttrSeconds: 3,
      intensityPct: 75,
    },
  ];
}
