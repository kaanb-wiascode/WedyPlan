"use client";

import React, { useState } from "react";
import AIGuardrailsHeader from "./AIGuardrailsHeader";
import AIGuardrailsAnalyticsWidget from "./AIGuardrailsAnalyticsWidget";
import GuardrailPoliciesBento from "./GuardrailPoliciesBento";
import SecurityLogsAndTesterTable from "./SecurityLogsAndTesterTable";

export default function AdminAIGuardrailsClient() {
  const [aiReport] = useState({
    securityHealthScore: 100,
    totalScannedPromptsToday: 142800,
    blockedThreatsToday: 14,
    piiMaskedRecordsToday: 428,
    avgScanLatencyMs: "3ms (Sub-millisecond)",
    aiAnalysis: "AI Guardrail kalkanı son 24 saatte 142.800 etkileşimi taramış; 14 Prompt Injection girişimini bloke etmiş ve 428 hassas PII verisini anonimleştirmiştir.",
    recommendation: "Kamu arama modülünde rate-limit kotalarının 120 RPM'den 60 RPM'e düşürülmesi önerilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AIGuardrailsHeader
        healthScore={aiReport.securityHealthScore}
        scannedPrompts={aiReport.totalScannedPromptsToday}
        blockedThreats={aiReport.blockedThreatsToday}
        piiMaskedCount={aiReport.piiMaskedRecordsToday}
        onOpenTestConsole={() => alert("🛡️ Live Guardrail Security Playground")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIGuardrailsAnalyticsWidget aiReport={aiReport} />
          <GuardrailPoliciesBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <SecurityLogsAndTesterTable />
        </div>
      </div>
    </div>
  );
}
