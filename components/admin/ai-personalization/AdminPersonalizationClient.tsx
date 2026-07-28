"use client";

import React, { useState } from "react";
import PersonalizationHeader from "./PersonalizationHeader";
import AIPersonalizationAnalyticsWidget from "./AIPersonalizationAnalyticsWidget";
import PreferenceSignalsBento from "./PreferenceSignalsBento";
import PersonalizationSimulatorConsole from "./PersonalizationSimulatorConsole";

export default function AdminPersonalizationClient() {
  const [aiReport] = useState({
    personalizationScorePct: 94,
    totalProfilesCount: "18.4K",
    ctrImprovementPct: 38.5,
    avgModelScorePct: 91.8,
    aiAnalysis: "Personalization Engine, kullanıcıların yaşam döngüsü ve stil tercihlerini analiz ederek Marketplace tıklama oranlarında (CTR) %38.5 artış sağlamıştır.",
    topRecommendation: "Düğüne 30 gün kalan çiftlere 'Son Kontrol Listesi & Acil İhtiyaçlar' push bildirimi gönderilmesi dönüşümü %45 artırmaktadır.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <PersonalizationHeader
        personalizationScore={aiReport.personalizationScorePct}
        totalProfiles={aiReport.totalProfilesCount}
        ctrImprovement={aiReport.ctrImprovementPct}
        avgScore={aiReport.avgModelScorePct}
        onOpenSimulatorModal={() => alert("✨ Personalization Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIPersonalizationAnalyticsWidget aiReport={aiReport} />
          <PreferenceSignalsBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <PersonalizationSimulatorConsole />
        </div>
      </div>
    </div>
  );
}
