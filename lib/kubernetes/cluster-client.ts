export interface K8sClusterSummary {
  clusterName: string;
  status: "HEALTHY" | "DEGRADED" | "SCALING";
  activeNodesCount: number;
  totalPodsCount: number;
  runningDeploymentsCount: number;
  ingressRulesCount: number;
  secretsCount: number;
  cpuRequestsVsLimitPct: number;
  ramRequestsVsLimitPct: number;
  deployments: Array<{
    name: string;
    namespace: string;
    replicasAvailable: string;
    strategy: string;
    status: "RUNNING" | "CANARY_TESTING" | "CRASH_LOOP";
    version: string;
  }>;
}

export function getK8sStatusSnapshot(): K8sClusterSummary {
  return {
    clusterName: "k8s-prod-eu-central-01",
    status: "HEALTHY",
    activeNodesCount: 16,
    totalPodsCount: 142,
    runningDeploymentsCount: 18,
    ingressRulesCount: 24,
    secretsCount: 56,
    cpuRequestsVsLimitPct: 42.8,
    ramRequestsVsLimitPct: 58.4,
    deployments: [
      { name: "wedyplan-ai-brain-api", namespace: "prod-ai", replicasAvailable: "8/8", strategy: "CANARY (10%)", status: "CANARY_TESTING", version: "v2.14.0" },
      { name: "wedyplan-marketplace-core", namespace: "prod-core", replicasAvailable: "12/12", strategy: "ROLLING_UPDATE", status: "RUNNING", version: "v2.13.8" },
      { name: "wedyplan-checkout-payment", namespace: "prod-core", replicasAvailable: "6/6", strategy: "BLUE_GREEN", status: "RUNNING", version: "v2.13.8" },
      { name: "wedyplan-search-indexer", namespace: "prod-search", replicasAvailable: "4/4", strategy: "ROLLING_UPDATE", status: "RUNNING", version: "v2.13.5" },
    ],
  };
}
