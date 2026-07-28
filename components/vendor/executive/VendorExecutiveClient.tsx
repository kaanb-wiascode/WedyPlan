"use client";

import React, { useState } from "react";
import ExecutiveHeader from "./ExecutiveHeader";
import AICommandCenterWidget from "./AICommandCenterWidget";
import ExecutiveKpiBentoGrid from "./ExecutiveKpiBentoGrid";
import ExecutiveQuickActionsBar from "./ExecutiveQuickActionsBar";

export default function VendorExecutiveClient({ vendorId }: { vendorId: string }) {
  const [aiData] = useState({
    businessHealthScore: 97,
    morningBriefing: "Günaydın Sayın Yönetici! Bugün 102.750 ₺ kapora tahsilat vadeniz bulunmaktadır. Bodrum Sunset Venue'deki düğün için kurulum ekibi %100 tamamlandı.",
    eveningSummary: "Dünün raporu: 2 yeni nitelikli talep alındı, 1 sözleşme onaylandı, 0 şikayet veya kriz yaşanmadı.",
    growthOpportunities: [
      "Temmuz ayının 2. haftasındaki boş Cuma günü için %10 Fırsat Kampanyası başlatmak ek 180.000 ₺ ciro getirebilir.",
    ],
    revenueRisks: [
      "Ece & Mert çiftinin sözleşme onay süresi 3 gündür beklemede. Müşteri temsilcisini yönlendirmeniz önerilir.",
    ],
    competitorSignals: "Bodrum lüks düğün kategorisinde yanıt verme süreniz rakiplerinizden %42 daha hızlı.",
  });

  const [kpis] = useState({
    conversionRate: "%38 (Sektör Üstü)",
    responseTime: "12 Dakika",
    cashFlow: "+420.000 ₺ (Net)",
    upcomingCollection: "102.750 ₺ (Bugün)",
    activeContractsCount: 14,
    pendingApprovalsCount: 2,
    inventoryUtilization: 88,
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ExecutiveHeader
        vendorName="Bodrum Sunset Venue & Luxury Events"
        businessHealthScore={aiData.businessHealthScore}
        monthlyRevenue={1240000}
        onOpenQuickAction={() => alert("⚡ Yönetici Hızlı Onay Çekmecesi")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AICommandCenterWidget aiData={aiData} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <ExecutiveKpiBentoGrid kpis={kpis} />
          <ExecutiveQuickActionsBar vendorId={vendorId} />
        </div>
      </div>
    </div>
  );
}
