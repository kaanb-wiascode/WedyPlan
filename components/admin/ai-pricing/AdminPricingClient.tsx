"use client";

import React, { useState } from "react";
import PricingHeader from "./PricingHeader";
import AIPricingAnalyticsWidget from "./AIPricingAnalyticsWidget";
import PricingFactorsBento from "./PricingFactorsBento";
import PricingSimulatorConsole from "./PricingSimulatorConsole";

export default function AdminPricingClient() {
  const [aiReport] = useState({
    avgRevenueBoostPct: 22.4,
    totalPackagesCount: 3420,
    totalVendorYieldUsd: "$12.8M",
    aiAnalysis: "Dynamic Pricing Engine, yüksek sezonda premium fiyatlandırma ve düşük sezonda erken rezervasyon kampanyalarıyla tedarikçi cirolarında ortalama %22.4 artış sağlamıştır.",
    topRecommendation: "Ağustos ayı son dakika boş kalan tarihler için %10 'Flash Deal' indirimi tanımlanması doluluk oranını %95 seviyesine çıkarabilir.",
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <PricingHeader
        avgRevenueBoost={aiReport.avgRevenueBoostPct}
        totalPackages={aiReport.totalPackagesCount}
        totalYield={aiReport.totalVendorYieldUsd}
        onOpenSimulatorModal={() => alert("💡 Dynamic Pricing Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIPricingAnalyticsWidget aiReport={aiReport} />
          <PricingFactorsBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <PricingSimulatorConsole />
        </div>
      </div>
    </div>
  );
}
