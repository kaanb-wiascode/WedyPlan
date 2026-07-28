"use client";

import React, { useState } from "react";
import K8sHeader from "./K8sHeader";
import K8sResourceMatrixBento from "./K8sResourceMatrixBento";
import DeploymentManagerConsole from "./DeploymentManagerConsole";
import ClusterOptimizationViewer from "./ClusterOptimizationViewer";

export default function AdminK8sClient() {
  const [data] = useState({
    clusterName: "k8s-prod-eu-central-01",
    activeNodesCount: 16,
    totalPodsCount: 142,
    cpuUsagePct: 42.8,
    deployments: [
      { name: "wedyplan-ai-brain-api", namespace: "prod-ai", replicasAvailable: "8/8", strategy: "CANARY (10%)", status: "CANARY_TESTING", version: "v2.14.0" },
      { name: "wedyplan-marketplace-core", namespace: "prod-core", replicasAvailable: "12/12", strategy: "ROLLING_UPDATE", status: "RUNNING", version: "v2.13.8" },
      { name: "wedyplan-checkout-payment", namespace: "prod-core", replicasAvailable: "6/6", strategy: "BLUE_GREEN", status: "RUNNING", version: "v2.13.8" },
      { name: "wedyplan-search-indexer", namespace: "prod-search", replicasAvailable: "4/4", strategy: "ROLLING_UPDATE", status: "RUNNING", version: "v2.13.5" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <K8sHeader
        clusterName={data.clusterName}
        activeNodesCount={data.activeNodesCount}
        totalPodsCount={data.totalPodsCount}
        cpuUsagePct={data.cpuUsagePct}
        onOpenDeployModal={() => alert("☸️ Deployment Manager Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <DeploymentManagerConsole />
          <ClusterOptimizationViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <K8sResourceMatrixBento deployments={data.deployments} />
        </div>
      </div>
    </div>
  );
}
