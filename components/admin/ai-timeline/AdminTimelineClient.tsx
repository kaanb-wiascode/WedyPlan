"use client";

import React, { useState } from "react";
import TimelineHeader from "./TimelineHeader";
import AITimelineAnalyticsWidget from "./AITimelineAnalyticsWidget";
import TimelineTasksBento from "./TimelineTasksBento";
import TimelineReschedulerConsole from "./TimelineReschedulerConsole";

export default function AdminTimelineClient() {
  const [aiReport] = useState({
    trainingHealthScore: 94,
    activeTimelinesCount: 850,
    preventedDelaysCount: 312,
    avgHealthScorePct: 93.4,
    aiAnalysis: "Wedding Timeline Intelligence Engine, son 30 günde 312 potansiyel düğün günü aksamasını Kritik Yol (Critical Path) tamponlama algoritması sayesinde önlemiştir.",
    topRecommendation: "Dış çekim ile seremoni arasına minimum 45 dakika tampon süre eklenmesi düğün günü stresini %40 oranında azaltmaktadır.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <TimelineHeader
        healthScore={aiReport.trainingHealthScore}
        activeTimelines={aiReport.activeTimelinesCount}
        preventedDelays={aiReport.preventedDelaysCount}
        avgHealth={aiReport.avgHealthScorePct}
        onOpenReschedulerModal={() => alert("⚡ Otomatik Yeniden Planlayıcı Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AITimelineAnalyticsWidget aiReport={aiReport} />
          <TimelineTasksBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <TimelineReschedulerConsole />
        </div>
      </div>
    </div>
  );
}
