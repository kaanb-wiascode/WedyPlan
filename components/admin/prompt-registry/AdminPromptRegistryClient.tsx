"use client";

import React, { useState } from "react";
import PromptRegistryHeader from "./PromptRegistryHeader";
import AIPromptOptimizerWidget from "./AIPromptOptimizerWidget";
import PromptLibraryBento from "./PromptLibraryBento";
import PromptVersionHistoryTable from "./PromptVersionHistoryTable";

export default function AdminPromptRegistryClient() {
  const [aiReport] = useState({
    overallPromptQualityScore: 98,
    totalActivePrompts: 24,
    publishedVersionsCount: 42,
    aiAnalysis: "Tüm portallarda kullanılan 24 merkezi prompt %98 ortalama kalite skoru ve 0 hallüsinasyon riski ile çalışmaktadır. Edge Redis önbellek hits oranı %99.8'dir.",
    optimizationRecommendations: [
      "'vendor.contract_analyzer.v1' prompt'undaki değişken sayısı 6'dan 4'e düşürülerek token maliyeti %15 azaltılabilir.",
    ],
  });

  const [prompts] = useState([
    {
      id: "p_101",
      name: "AI Wedding Planner Copilot",
      promptKey: "copilot.wedding_planner",
      category: "WEDDING_PLANNING",
      activeVersion: "v1.2.0",
      variables: ["couple_name", "budget", "wedding_date"],
      qualityScore: 98,
    },
    {
      id: "p_102",
      name: "Vendor Contract Legal Analyzer",
      promptKey: "vendor.contract_analyzer",
      category: "CONTRACTS",
      activeVersion: "v2.0.1",
      variables: ["contract_text", "vendor_name"],
      qualityScore: 96,
    },
  ]);

  const [versions] = useState([
    { id: "ver_1", promptKey: "copilot.wedding_planner", versionTag: "v1.2.0", author: "Kaan (Lead Prompt Eng)", timestamp: "Bugün 01:10", qualityScore: 98, status: "PUBLISHED" },
    { id: "ver_2", promptKey: "copilot.wedding_planner", versionTag: "v1.3.0-draft", author: "Selin (AI Eng)", timestamp: "Şimdi", qualityScore: 99, status: "DRAFT" },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <PromptRegistryHeader
        qualityScore={aiReport.overallPromptQualityScore}
        totalActivePrompts={aiReport.totalActivePrompts}
        publishedVersionsCount={aiReport.publishedVersionsCount}
        onOpenNewPromptModal={() => alert("📝 Yeni Prompt Oluşturucu Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIPromptOptimizerWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6 font-sans">
          <PromptLibraryBento
            prompts={prompts}
            onSelectPrompt={(p) => alert("360° Prompt Sürüm İncelemesi: " + p.promptKey)}
          />
          <PromptVersionHistoryTable versions={versions} />
        </div>
      </div>
    </div>
  );
}
