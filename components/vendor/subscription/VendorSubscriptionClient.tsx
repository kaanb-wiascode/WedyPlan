"use client";

import React, { useState } from "react";
import SubscriptionHeader from "./SubscriptionHeader";
import AISubscriptionIntelligenceWidget from "./AISubscriptionIntelligenceWidget";
import UsageAnalyticsBento from "./UsageAnalyticsBento";
import PlanComparisonAndAddons from "./PlanComparisonAndAddons";
import BillingHistoryTable from "./BillingHistoryTable";
import { buyVendorCreditsAction } from "@/lib/actions/vendor-subscription";

export default function VendorSubscriptionClient({ vendorId }: { vendorId: string }) {
  const [aiData] = useState({
    recommendedPlan: "ENTERPRISE_LUXURY",
    reasoning: "Son 30 günde AI Asistan kullanımınız %92, Lead kabul oranınız %88 seviyesindedir. Enterprise pakete geçmek sınırsız AI kullanımı ve öncelikli listelenme imkanı sağlar.",
    potentialAnnualSaving: "14.400 ₺ (Yıllık Faturalandırmada %20 İndirim)",
    storageDepletionAlert: "Mevcut depolama alanınız %82 doluluğa ulaştı. 14 gün içinde ek depolama gerekebilir.",
    optimizationscore: 94,
  });

  const [usage] = useState({
    aiCreditsUsed: 460,
    aiCreditsLimit: 500,
    leadCreditsUsed: 22,
    leadCreditsLimit: 25,
    storageUsedGb: 41,
    storageLimitGb: 50,
  });

  const [invoices] = useState([
    {
      id: "inv_1",
      invoiceNumber: "INV-2026-0881",
      description: "Pro Business Abonelik Paketi (Aylık)",
      date: "01 Temmuz 2026",
      amount: 4500,
      status: "ÖDENDİ",
    },
    {
      id: "inv_2",
      invoiceNumber: "INV-2026-0742",
      description: "Pro Business Abonelik Paketi (Aylık)",
      date: "01 Haziran 2026",
      amount: 4500,
      status: "ÖDENDİ",
    },
  ]);

  const handleBuyCredits = async (addonType: string) => {
    const res = await buyVendorCreditsAction(vendorId, {
      addonType: addonType as any,
      quantity: 1,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <SubscriptionHeader
        currentPlanName="Pro Business Partner"
        billingCycle="Aylık"
        nextRenewalDate="01 Ağustos 2026"
        monthlyCost={4500}
        onOpenUpgradeModal={() => alert("⚡ Paket Değiştirme Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AISubscriptionIntelligenceWidget aiData={aiData} />
          <PlanComparisonAndAddons onBuyCredits={handleBuyCredits} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <UsageAnalyticsBento usage={usage} />
          <BillingHistoryTable invoices={invoices} />
        </div>
      </div>
    </div>
  );
}
