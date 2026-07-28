"use client";

import React, { useState } from "react";
import WorkflowHeader from "./WorkflowHeader";
import AIWorkflowAnalyticsWidget from "./AIWorkflowAnalyticsWidget";
import WorkflowAgentsBento from "./WorkflowAgentsBento";
import WorkflowSimulatorConsole from "./WorkflowSimulatorConsole";

export default function AdminWorkflowClient() {
  const [aiReport] = useState({
    workflowSuccessRatePct: 98.6,
    totalWorkflowsCount: "14.2K",
    autoRecoveredFailuresCount: 420,
    pendingHumanApprovalsCount: 3,
    aiAnalysis: "AI Workflow Engine, son 30 günde 14,200 karmaşık ajan akışını %98.6 başarı oranıyla tamamlamış, 420 geçici hatayı insan müdahalesi olmadan otomatik düzeltmiştir.",
    topRecommendation: "Sözleşme onay adımlarında 10,000 ₺ üzeri limitlerde 'Human Approval' kapısının zorunlu tutulması riskleri %100 sıfırlamaktadır.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <WorkflowHeader
        successRate={aiReport.workflowSuccessRatePct}
        totalWorkflows={aiReport.totalWorkflowsCount}
        autoRecovered={aiReport.autoRecoveredFailuresCount}
        pendingApprovals={aiReport.pendingHumanApprovalsCount}
        onOpenSimulatorModal={() => alert("⚡ AI Workflow Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIWorkflowAnalyticsWidget aiReport={aiReport} />
          <WorkflowAgentsBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <WorkflowSimulatorConsole />
        </div>
      </div>
    </div>
  );
}
