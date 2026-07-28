"use client";

import React, { useState } from "react";
import CommandCenterHeader from "./CommandCenterHeader";
import AIMorningBriefingWidget from "./AIMorningBriefingWidget";
import UniversalCommandPalette from "./UniversalCommandPalette";
import ExecutivePanelsBentoGrid from "./ExecutivePanelsBentoGrid";
import { executeExecutiveQuickAction } from "@/lib/actions/admin-command-center";

export default function ExecutiveCommandClient() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isListeningVoice, setIsListeningVoice] = useState(false);

  const [aiReport] = useState({
    ecosystemHealthScore: 99,
    morningBriefingSummary: "Günaydın! WedyPlan ekosistemi %99 genel sağlık skoru ile yeni güne başladı. Son 12 saatte 420 yeni çift kaydı alındı, 14 sözleşme e-imzalandı ve net MRR 1.420.000 ₺ seviyesini korudu.",
    dailyRisks: [
      "Marmara bölgesinde fotoğrafçılık kategorisinde 2 tedarikçi yanıt süresi 4 saati aştı.",
    ],
    criticalIncidentsCount: 0,
    revenueOpportunities: "Bodrum ve Çeşme'deki lüks mekanlarda 'Featured Choice' vitrin ilan fiyatlarının %15 güncellenmesi ek 85.000 ₺ MRR getirecektir.",
    platformOptimization: "Redis önbellek hits oranı %98.4 seviyesindedir. Altyapı maliyeti %12 düşürülebilir.",
    aiBusinessCoachRecommendation: "Bu hafta sonu gerçekleşecek 142 düğün için otomatik WhatsApp hatırlatma otomasyonunu (Workflow #104) tetiklemeniz müşteri CSAT puanını %98'e çıkaracaktır.",
  });

  const handleToggleVoice = () => {
    setIsListeningVoice(!isListeningVoice);
    if (!isListeningVoice) {
      alert("🎙️ Sesli komut dinleyicisi aktif! Lütfen konuşun (Örn: 'Tedarikçi onay listesini aç')...");
    }
  };

  const handleQuickAction = async (actionType: any) => {
    const res = await executeExecutiveQuickAction({
      actionType,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <CommandCenterHeader
        ecosystemHealthScore={aiReport.ecosystemHealthScore}
        criticalIncidentsCount={aiReport.criticalIncidentsCount}
        onOpenCommandPalette={() => setIsPaletteOpen(true)}
        onToggleVoiceCommand={handleToggleVoice}
        isListeningVoice={isListeningVoice}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIMorningBriefingWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <ExecutivePanelsBentoGrid onQuickAction={handleQuickAction} />
        </div>
      </div>

      <UniversalCommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />
    </div>
  );
}
