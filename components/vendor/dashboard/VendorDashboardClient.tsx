"use client";

import React, { useState } from "react";
import VendorDashboardHeader from "./VendorDashboardHeader";
import ExecutiveKpiBento from "./ExecutiveKpiBento";
import AIBusinessIntelligenceWidget from "./AIBusinessIntelligenceWidget";

export default function VendorDashboardClient({ vendorId }: { vendorId: string }) {
  const [data] = useState({
    vendorName: "Bodrum Sunset Venue & Events",
    kpis: {
      todayRevenue: "45.000 ₺",
      monthlyRevenue: "380.000 ₺",
      revenueGrowth: "+%18",
      newLeadsCount: 14,
      pendingOffersCount: 5,
      signedContractsCount: 8,
      upcomingWeddingsCount: 3,
      todayMeetingsCount: 2,
      unreadMessagesCount: 4,
      conversionRate: "%32",
      responseTimeMinutes: "14 dk",
      customerSatisfactionScore: 4.9,
      aiBusinessScore: 94,
      profileQualityScore: 98,
    },
    aiInsights: {
      todayPriorities: [
        "Selin & Kaan çiftinin 350 kişilik düğün mekan teklifini onaylayın (Bütçe: 320.000 ₺).",
        "Saat 15:00'teki menü tadımı toplantısı için mutfak ekibini bilgilendirin.",
      ],
      lostOpportunityAlert: "2 teklif talebi 48 saattir yanıt bekliyor. Yanıt süresi uzarsa dönüşüm ihtimali %60 düşer.",
      revenuePrediction: "Önümüzdeki 30 gün içinde beklenen tahmini ciro: 420.000 ₺ (%15 büyüme).",
      recommendedActions: [
        "Cuma günkü boş kalan açık hava salonu için %10 'Erken Rezervasyon' kampanyası başlatın.",
      ],
    },
    upcomingMeetings: [
      { id: "m1", coupleNames: "Selin & Kaan", title: "Menü Tadımı & Masa Düzeni", time: "15:00", type: "YÜZ YÜZE" },
      { id: "m2", coupleNames: "Ece & Mert", title: "Sözleşme Revizyonu", time: "17:30", type: "ONLINE" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <VendorDashboardHeader
        vendorName={data.vendorName}
        aiBusinessScore={data.kpis.aiBusinessScore}
        profileQualityScore={data.kpis.profileQualityScore}
        unreadCount={data.kpis.unreadMessagesCount}
      />

      <ExecutiveKpiBento kpis={data.kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-6">
          <AIBusinessIntelligenceWidget insights={data.aiInsights} />
        </div>

        <div className="lg:col-span-6 p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            📅 Bugünün Görüşme & Toplantı Takvimi ({data.upcomingMeetings.length})
          </span>

          <div className="space-y-3">
            {data.upcomingMeetings.map((m) => (
              <div key={m.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{m.coupleNames}</h4>
                  <p className="text-[10px] text-slate-400">{m.title}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-indigo-600 block">{m.time}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 font-semibold">{m.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
