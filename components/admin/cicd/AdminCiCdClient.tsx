"use client";

import React, { useState } from "react";
import CiCdHeader from "./CiCdHeader";
import PipelineMatrixBento from "./PipelineMatrixBento";
import PipelineTriggerConsole from "./PipelineTriggerConsole";
import CiCdAnalyticsViewer from "./CiCdAnalyticsViewer";

export default function AdminCiCdClient() {
  const [data] = useState({
    totalPipelinesToday: 48,
    successRatePct: 97.9,
    avgBuildDurationMin: 3.2,
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
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <CiCdHeader
        totalPipelinesToday={data.totalPipelinesToday}
        successRatePct={data.successRatePct}
        avgBuildDurationMin={data.avgBuildDurationMin}
        overallRiskScorePct={data.overallRiskScorePct}
        onOpenTriggerModal={() => alert("🚀 Pipeline Trigger Studio Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <PipelineTriggerConsole />
          <CiCdAnalyticsViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <PipelineMatrixBento pipelines={data.pipelines} environments={data.environments} />
        </div>
      </div>
    </div>
  );
}
