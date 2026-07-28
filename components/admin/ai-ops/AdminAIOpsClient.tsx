"use client";

import React, { useState } from "react";
import AdminAIOpsHeader from "./AdminAIOpsHeader";
import AIOpsAnalyticsWidget from "./AIOpsAnalyticsWidget";
import ModelProvidersGrid from "./ModelProvidersGrid";
import PromptLibraryTable from "./PromptLibraryTable";
import { toggleAIModelProviderAction } from "@/lib/actions/admin-ai-ops";

export default function AdminAIOpsClient() {
  const [aiReport] = useState({
    monthlyAiCostUSD: "$1,420.50 (Bütçe Dahilinde)",
    avgLatencyMs: "185ms (Işık Hızında)",
    overallQualityScore: 97,
    activeProvidersCount: 4,
    vectorStoreIndexedItems: "1,240,000 Vektör Düğümü",
    aiAnalysis: "Gözlemlerimize göre 'Sözleşme Analizi' için Claude 3.5 Sonnet kullanımı doğruluk oranını %14 artırırken maliyeti $0.02/istek seviyesinde tutmuştur.",
    costOptimizationRecommendation: "Basit WhatsApp ilk karşılama mesajlarını GPT-4o yerine GPT-4o-mini modeline yönlendirerek aylık $350 tasarruf sağlayabilirsiniz.",
    failoverStatus: "Otomatik Yedekleme (Fallback Router) Aktif. Son 30 günde 0 kesinti yaşandı.",
  });

  const [providers, setProviders] = useState([
    {
      id: "OPENAI",
      name: "OpenAI API",
      activeModel: "gpt-4o / gpt-4o-mini",
      icon: "⚡",
      latency: "140ms",
      rateLimitRpm: "10,000 RPM",
      status: "HEALTHY",
      isActive: true,
      isPrimary: true,
      isFallback: false,
    },
    {
      id: "CLAUDE",
      name: "Anthropic Claude",
      activeModel: "claude-3-5-sonnet",
      icon: "🧠",
      latency: "190ms",
      rateLimitRpm: "4,000 RPM",
      status: "HEALTHY",
      isActive: true,
      isPrimary: false,
      isFallback: true,
    },
    {
      id: "GEMINI",
      name: "Google Gemini API",
      activeModel: "gemini-1.5-pro",
      icon: "💎",
      latency: "210ms",
      rateLimitRpm: "8,000 RPM",
      status: "HEALTHY",
      isActive: true,
      isPrimary: false,
      isFallback: true,
    },
  ]);

  const [prompts] = useState([
    {
      id: "pr_101",
      title: "WedyPlan Wedding Planner Copilot",
      slug: "wedding_planner_copilot",
      activeVersion: "v2.4",
      targetModel: "gpt-4o",
      qualityScore: 98,
    },
    {
      id: "pr_102",
      title: "Dijital Sözleşme Risk & Madde Analizcisi",
      slug: "contract_risk_analyzer",
      activeVersion: "v1.8",
      targetModel: "claude-3-5-sonnet",
      qualityScore: 96,
    },
  ]);

  const handleToggleProvider = async (providerKey: string, currentStatus: boolean) => {
    const targetProvider = providers.find((p) => p.id === providerKey);
    const isFallback = targetProvider ? targetProvider.isFallback : false;

    const res = await toggleAIModelProviderAction({
      provider: providerKey as any,
      isActive: !currentStatus,
      isFallback: isFallback,
    });

    if (res.success) {
      setProviders((prev) =>
        prev.map((p) => (p.id === providerKey ? { ...p, isActive: !currentStatus } : p))
      );
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminAIOpsHeader
        monthlyCost={aiReport.monthlyAiCostUSD}
        avgLatency={aiReport.avgLatencyMs}
        qualityScore={aiReport.overallQualityScore}
        onOpenPlayground={() => alert("🧪 Prompt Test Konsolu (Playground) Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIOpsAnalyticsWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <ModelProvidersGrid
            providers={providers}
            onToggleProvider={handleToggleProvider}
          />
          <PromptLibraryTable
            prompts={prompts}
            onEditPrompt={(p) => alert("✏️ Prompt Versiyon Düzenleyici: " + p.title)}
          />
        </div>
      </div>
    </div>
  );
}