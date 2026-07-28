"use client";

import React, { useState } from "react";
import ChaosHeader from "./ChaosHeader";
import ExperimentMatrixBento from "./ExperimentMatrixBento";
import ChaosInjectorConsole from "./ChaosInjectorConsole";
import FailureReportViewer from "./FailureReportViewer";

export default function AdminChaosClient() {
  const [data] = useState({
    resilienceScore: 98.1,
    activeExperimentsCount: 3,
    riskScore: 12,
    experiments: [
      { experimentId: "exp_01", name: "AI Gateway Timeout & Fallback Simulation", targetService: "AI Central Brain Coordinator", type: "AI_PROVIDER_FAILURE", status: "COMPLETED", resilienceScorePct: 98.4, mttrSeconds: 2, intensityPct: 60 },
      { experimentId: "exp_02", name: "PostgreSQL Read-Replica Failover Test", targetService: "PostgreSQL Primary Cluster", type: "DATABASE_FAILURE", status: "COMPLETED", resilienceScorePct: 99.2, mttrSeconds: 4, intensityPct: 80 },
      { experimentId: "exp_03", name: "Redis Cache Eviction & Memory Saturation", targetService: "Redis Cache & Queue Engine", type: "MEMORY_SATURATION", status: "COMPLETED", resilienceScorePct: 96.8, mttrSeconds: 3, intensityPct: 75 },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ChaosHeader
        resilienceScore={data.resilienceScore}
        activeExperimentsCount={data.activeExperimentsCount}
        riskScore={data.riskScore}
        onOpenInjectorModal={() => alert("💥 Chaos Injector Studio Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <ChaosInjectorConsole />
          <FailureReportViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ExperimentMatrixBento experiments={data.experiments} />
        </div>
      </div>
    </div>
  );
}
