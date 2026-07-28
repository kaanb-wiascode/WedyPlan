"use client";

import React, { useState } from "react";
import AIAgentsHeader from "./AIAgentsHeader";
import AIAgentAnalyticsWidget from "./AIAgentAnalyticsWidget";
import AgentRegistryBento from "./AgentRegistryBento";
import AgentWorkflowsAndBusTable from "./AgentWorkflowsAndBusTable";

export default function AdminAIAgentsClient() {
  const [aiReport] = useState({
    agentSwarmHealthScore: 99,
    activeAgentsCount: 8,
    registeredToolsCount: 24,
    tasksCompletedToday: 1240,
    humanApprovalsPendingCount: 1,
    aiAnalysis: "Tüm uzman ajanlar (Planner, Executor, Reviewer, Supervisor) ReAct döngüsüyle %99.2 başarı oranıyla çalışmaktadır. Ajanlar arası ortalama bağlam aktarım süresi 2ms'dir.",
    recommendation: "Finansal ödeme eylemlerindeki insan onay kalkanının (Human-in-the-Loop) çift faktörlü doğrulama (2FA) ile birleştirilmesi önerilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AIAgentsHeader
        healthScore={aiReport.agentSwarmHealthScore}
        activeAgentsCount={aiReport.activeAgentsCount}
        registeredToolsCount={aiReport.registeredToolsCount}
        tasksToday={aiReport.tasksCompletedToday}
        pendingApprovals={aiReport.humanApprovalsPendingCount}
        onOpenTestTaskModal={() => alert("🤖 Live Agent Task & Swarm Simulator Konsolu")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIAgentAnalyticsWidget aiReport={aiReport} />
          <AgentRegistryBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <AgentWorkflowsAndBusTable />
        </div>
      </div>
    </div>
  );
}
