export interface CiCdStatusSummary {
  totalPipelinesToday: number;
  successRatePct: number;
  avgBuildDurationMin: number;
  activeDeploymentsCount: number;
  overallRiskScorePct: number;
  environments: Array<{
    name: string;
    version: string;
    status: "HEALTHY" | "DEPLOYING" | "DEGRADED";
    lastDeployed: string;
  }>;
  pipelines: Array<{
    id: string;
    branch: string;
    commit: string;
    author: string;
    trigger: string;
    durationSeconds: number;
    status: "SUCCESS" | "RUNNING" | "FAILED";
    currentStage: string;
  }>;
}

export function getCiCdStatusSnapshot(): CiCdStatusSummary {
  return {
    totalPipelinesToday: 48,
    successRatePct: 97.9,
    avgBuildDurationMin: 3.2,
    activeDeploymentsCount: 5,
    overallRiskScorePct: 8,
    environments: [
      { name: "PRODUCTION", version: "v2.14.0", status: "HEALTHY", lastDeployed: "2 saat önce" },
      { name: "STAGING", version: "v2.15.0-rc2", status: "HEALTHY", lastDeployed: "15 dk önce" },
      { name: "QA", version: "v2.15.0-qa", status: "HEALTHY", lastDeployed: "45 dk önce" },
      { name: "DEVELOPMENT", version: "v2.15.0-dev", status: "HEALTHY", lastDeployed: "Anlık (3 dk önce)" },
      { name: "PREVIEW (PR #204)", version: "feat-ai-copilot-v2", status: "HEALTHY", lastDeployed: "10 dk önce" },
    ],
    pipelines: [
      { id: "pipe_101", branch: "main", commit: "a8f3b2c", author: "Kaan", trigger: "PR_MERGE", durationSeconds: 192, status: "SUCCESS", currentStage: "DEPLOY_PROD_VERIFIED" },
      { id: "pipe_102", branch: "release/v2.15", commit: "f4d1e9a", author: "DevOps Bot", trigger: "GIT_PUSH", durationSeconds: 145, status: "SUCCESS", currentStage: "CONTAINER_PUBLISHED" },
      { id: "pipe_103", branch: "feature/ai-model-router", commit: "b9c8d7e", author: "AI Engineer", trigger: "MANUAL_RELEASE", durationSeconds: 84, status: "RUNNING", currentStage: "SECURITY_SAST_SCAN" },
      { id: "pipe_104", branch: "fix/payment-webhook", commit: "e2f1a0d", author: "Backend Lead", trigger: "GIT_PUSH", durationSeconds: 210, status: "SUCCESS", currentStage: "STAGING_DEPLOYED" },
    ],
  };
}
