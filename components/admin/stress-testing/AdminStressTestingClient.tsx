"use client";

import React, { useState } from "react";
import StressTestingHeader from "./StressTestingHeader";
import BreakingPointMatrixBento from "./BreakingPointMatrixBento";
import StormGeneratorConsole from "./StormGeneratorConsole";
import RecoveryAnalysisViewer from "./RecoveryAnalysisViewer";

export default function AdminStressTestingClient() {
  const [data] = useState({
    breakingPointRps: 28400,
    breakingPointVu: 65000,
    recoverySeconds: 4,
    selfHealingScore: 97.8,
    snapshots: [
      { testId: "str_01", scenarioName: "Extreme Traffic & Marketplace Search Storm", stressType: "SEARCH_STORM", targetModule: "Hybrid Search Vector Engine", breakingPointRps: 28400, breakingPointVu: 65000, firstFailingComponent: "Redis Vector Index Cache Memory", recoveryDurationSeconds: 4, status: "BREAKING_POINT_REACHED" },
      { testId: "str_02", scenarioName: "Mass AI Copilot Proposal Generation Storm", stressType: "MASS_AI_REQUESTS", targetModule: "AI Central Brain Coordinator", breakingPointRps: 8500, breakingPointVu: 22000, firstFailingComponent: "AI Provider Rate Limit & Token Buffer", recoveryDurationSeconds: 6, status: "BREAKING_POINT_REACHED" },
      { testId: "str_03", scenarioName: "Mass Flash Deal Payments & Checkout Storm", stressType: "MASS_PAYMENTS", targetModule: "Checkout & Iyzico Payment Gateway", breakingPointRps: 18200, breakingPointVu: 48000, firstFailingComponent: "PostgreSQL Primary Connection Pool", recoveryDurationSeconds: 3, status: "BREAKING_POINT_REACHED" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <StressTestingHeader
        breakingPointRps={data.breakingPointRps}
        breakingPointVu={data.breakingPointVu}
        recoverySeconds={data.recoverySeconds}
        selfHealingScore={data.selfHealingScore}
        onOpenGeneratorModal={() => alert("⚡ Storm Generator Studio Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <StormGeneratorConsole />
          <RecoveryAnalysisViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <BreakingPointMatrixBento snapshots={data.snapshots} />
        </div>
      </div>
    </div>
  );
}
