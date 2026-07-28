"use client";

import React, { useState } from "react";
import AIOrchestrationHeader from "./AIOrchestrationHeader";
import AIProviderHealthBento from "./AIProviderHealthBento";
import AIRoutingRulesTable from "./AIRoutingRulesTable";
import AITelemetryLogsTable from "./AITelemetryLogsTable";

export default function AdminAIOrchestrationClient() {
  const [aiReport] = useState({
    overallQualityScore: 99,
    totalTokensToday: 1420000,
    totalCostUsdToday: "$4.18",
    avgLatencyMs: "18ms",
    activeCircuitBreakersCount: 0,
    aiAnalysis: "Tüm AI sağlayıcıları (OpenAI, Gemini, Anthropic, Azure, Self-Hosted) %99.99 Uptime ve ortalama 18ms yanıt süresiyle çalışmaktadır. Akıllı Yönlendirme (Smart Routing) son 24 saatte %34 maliyet tasarrufu sağlamıştır.",
    circuitBreakerStatus: "Tüm Devre Kesiciler KAPALI (CLOSED - Sağlıklı)",
    recommendation: "Görsel doğrulama görevlerinde Gemini-1.5-Flash kullanımı ile gecikmenin 12ms seviyesine düşürülebileceği öngörülmektedir.",
  });

  const [providers] = useState([
    { id: "p_1", name: "OpenAI API", defaultModel: "gpt-4o", priority: 1, latencyMs: 16, costPer1m: "$2.50", icon: "🟢", status: "HEALTHY" },
    { id: "p_2", name: "Anthropic Claude", defaultModel: "claude-3-5-sonnet", priority: 2, latencyMs: 22, costPer1m: "$3.00", icon: "🟧", status: "HEALTHY" },
    { id: "p_3", name: "Google Gemini", defaultModel: "gemini-1.5-pro", priority: 3, latencyMs: 14, costPer1m: "$1.25", icon: "🔵", status: "HEALTHY" },
    { id: "p_4", name: "Azure OpenAI", defaultModel: "gpt-4o-enterprise", priority: 4, latencyMs: 18, costPer1m: "$2.50", icon: "🔷", status: "HEALTHY" },
    { id: "p_5", name: "Self-Hosted Llama 3", defaultModel: "llama-3-8b-instruct", priority: 5, latencyMs: 8, costPer1m: "$0.00", icon: "🦙", status: "HEALTHY" },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AIOrchestrationHeader
        qualityScore={aiReport.overallQualityScore}
        totalTokensToday={aiReport.totalTokensToday}
        totalCostToday={aiReport.totalCostUsdToday}
        avgLatency={aiReport.avgLatencyMs}
        onOpenTestPlayground={() => alert("🧪 AI Gateway Test Konsolu")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-12 space-y-6">
          <AIProviderHealthBento providers={providers} />
        </div>

        <div className="lg:col-span-6 space-y-6 font-sans">
          <AIRoutingRulesTable />
        </div>

        <div className="lg:col-span-6 space-y-6 font-sans">
          <AITelemetryLogsTable />
        </div>
      </div>
    </div>
  );
}
