"use client";

import React, { useState } from "react";
import VoiceHeader from "./VoiceHeader";
import AIVoiceAnalyticsWidget from "./AIVoiceAnalyticsWidget";
import VoiceCapabilitiesBento from "./VoiceCapabilitiesBento";
import VoiceSimulatorConsole from "./VoiceSimulatorConsole";

export default function AdminVoiceClient() {
  const [aiReport] = useState({
    sttAccuracyPct: 97.9,
    totalSessionsCount: "24.5K",
    avgLatencyMs: 120,
    translationReady: true,
    aiAnalysis: "Voice AI Platform, son 30 günde 24,500 sesli etkileşimi %97.9 kelime doğruluğu ve 120ms ortalama yanıt süresiyle işlemiştir.",
    topRecommendation: "Tedarikçi toplantı transkriptlerinde 'Otomatik Sözleşme Maddesi Taslağı Oluşturma' özelliğinin aktif edilmesi verimi %30 artıracaktır.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <VoiceHeader
        sttAccuracy={aiReport.sttAccuracyPct}
        totalSessions={aiReport.totalSessionsCount}
        avgLatencyMs={aiReport.avgLatencyMs}
        translationReady={aiReport.translationReady}
        onOpenSimulatorModal={() => alert("🎙️ Voice AI Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIVoiceAnalyticsWidget aiReport={aiReport} />
          <VoiceCapabilitiesBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <VoiceSimulatorConsole />
        </div>
      </div>
    </div>
  );
}
