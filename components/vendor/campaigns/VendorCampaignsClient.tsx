"use client";

import React, { useState } from "react";
import CampaignHeader from "./CampaignHeader";
import AICampaignIntelligenceWidget from "./AICampaignIntelligenceWidget";
import CampaignBuilderModal from "./CampaignBuilderModal";
import CampaignListTable from "./CampaignListTable";

export default function VendorCampaignsClient({ vendorId }: { vendorId: string }) {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const [aiData] = useState({
    marketingCopy: "✨ Hayalinizdeki Düğün İçin Erken Rezervasyon Fırsatı! %15 özel indirim ve sınırlı sayıda rezervasyon opsiyonuyla Bodrum Sunset Venue'de unutulmaz bir geceye davetlisiniz. Kod: EARLY2027 ile hemen teklif alın!",
    bestLaunchTime: "Perşembe Saat 20:00 (En Yüksek Çift Etkileşimi)",
    estimatedRoi: "%340 ROI (3.4x Gelir Çarpanı)",
    targetAudienceSuggestion: "Düğününe 6-12 ay kalan ve Ege bölgesini tercih eden yüksek bütçeli çiftler.",
    campaignScore: 94,
  });

  const [campaigns] = useState([
    {
      id: "cmp_1",
      title: "2027 Erken Rezervasyon Fırsatı",
      type: "EARLY_BOOKING",
      discountPercentage: 15,
      couponCode: "EARLY2027",
      leadsGenerated: 18,
      roi: 340,
      status: "YAYINDA",
    },
    {
      id: "cmp_2",
      title: "Cuma Gününe Özel Son Dakika Paket İndirimi",
      type: "LAST_MINUTE",
      discountPercentage: 20,
      couponCode: "LAST20",
      leadsGenerated: 9,
      roi: 220,
      status: "TAMAMLANDI",
    },
  ]);

  const activeCampaignsCount = campaigns.filter((c) => c.status === "YAYINDA").length;
  const totalLeadsGenerated = campaigns.reduce((sum, c) => sum + c.leadsGenerated, 0);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <CampaignHeader
        activeCampaignsCount={activeCampaignsCount}
        totalLeadsGenerated={totalLeadsGenerated}
        averageRoi={340}
        onOpenBuilder={() => setIsBuilderOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5">
          <AICampaignIntelligenceWidget aiData={aiData} />
        </div>

        <div className="lg:col-span-7">
          <CampaignListTable campaigns={campaigns} />
        </div>
      </div>

      <CampaignBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        vendorId={vendorId}
      />
    </div>
  );
}
