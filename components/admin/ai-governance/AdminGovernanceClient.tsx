"use client";

import React, { useState } from "react";
import GovernanceHeader from "./GovernanceHeader";
import AIGovernanceAnalyticsWidget from "./AIGovernanceAnalyticsWidget";
import GovernancePoliciesBento from "./GovernancePoliciesBento";
import GovernanceSimulatorConsole from "./GovernanceSimulatorConsole";

export default function AdminGovernanceClient() {
  const [aiReport] = useState({
    overallComplianceScorePct: 99.8,
    totalAuditedRequestsCount: "184.5K",
    blockedSecurityViolationsCount: 342,
    avgAuditLatencyMs: 14,
    aiAnalysis: "AI Governance Center, platform genelinde işlenen 184,500 AI çağrısını %99.8 uyum skoruyla denetlemiş ve 342 istem enjeksiyonu/PII sızıntı girişimini anında engellemiştir.",
    topRecommendation: "EU AI Act Şeffaflık Standardı uyarınca Copilot ses yanıtlarına otomatik 'AI Generated' damgasının eklenmesi önerilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <GovernanceHeader
        complianceScore={aiReport.overallComplianceScorePct}
        totalAudited={aiReport.totalAuditedRequestsCount}
        blockedViolations={aiReport.blockedSecurityViolationsCount}
        avgLatencyMs={aiReport.avgAuditLatencyMs}
        onOpenSimulatorModal={() => alert("🛡️ AI Governance Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIGovernanceAnalyticsWidget aiReport={aiReport} />
          <GovernancePoliciesBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <GovernanceSimulatorConsole />
        </div>
      </div>
    </div>
  );
}
