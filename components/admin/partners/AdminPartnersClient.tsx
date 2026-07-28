"use client";

import React, { useState } from "react";
import PartnersHeader from "./PartnersHeader";
import AIPartnerIntelligenceWidget from "./AIPartnerIntelligenceWidget";
import PartnerLeaderboardBento from "./PartnerLeaderboardBento";
import PartnerApplicationsTable from "./PartnerApplicationsTable";

export default function AdminPartnersClient() {
  const [aiReport] = useState({
    partnerEcosystemHealthScore: 97,
    activePartnersCount: 142,
    pendingApplicationsCount: 1,
    totalPayoutsThisMonth: "284.500 ₺",
    aiAnalysis: "Ortaklık ekosistemi bu ay platform ciro büyümesinin %28'ini sağlamıştır. Düğün Plancıları (Wedding Planners) kategorisi %42 ortalama müşteri dönüşüm oranı ile en yüksek kaliteye sahiptir.",
    fraudAlerts: [
      "Affiliate #aff_881 hesabından gelen 40 son tıklamada aynı IP çerez parmak izi saptandı. Hakediş geçici donduruldu.",
    ],
    revenueForecast: "Gelecek 30 günde partner kanalı üzerinden 1.200.000 ₺ net yeni sözleşme cirosu öngörülmektedir.",
    growthRecommendation: "Top 5 Influencer ortağa %12 olan komisyon oranının %15'e çıkarılması durumunda yönlendirme hacmi %35 artacaktır.",
  });

  const [partners] = useState([
    { id: "pt_101", name: "Selin Yılmaz (Luxury Weddings)", type: "WEDDING_PLANNER", tier: "PLATINUM_VIP", trackingCode: "SELIN-VIP", commissionRate: 15, unpaidBalance: 42800, status: "ACTIVE" },
    { id: "pt_102", name: "Bosphorus Event Agency", type: "AGENCY", tier: "GOLD", trackingCode: "BOSPHORUS2026", commissionRate: 10, unpaidBalance: 18500, status: "ACTIVE" },
    { id: "pt_103", name: "Merve Düğün Vlog (Influencer)", type: "INFLUENCER", tier: "SILVER", trackingCode: "MERVEWEDDING", commissionRate: 8, unpaidBalance: 0, status: "PENDING_APPROVAL" },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <PartnersHeader
        activePartnersCount={aiReport.activePartnersCount}
        pendingAppsCount={aiReport.pendingApplicationsCount}
        totalPayoutsMonth={aiReport.totalPayoutsThisMonth}
        ecosystemHealthScore={aiReport.partnerEcosystemHealthScore}
        onOpenNewPartnerModal={() => alert("🤝 Yeni İş Ortağı/Influencer Davet Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIPartnerIntelligenceWidget aiReport={aiReport} />
          <PartnerLeaderboardBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <PartnerApplicationsTable partners={partners} />
        </div>
      </div>
    </div>
  );
}
