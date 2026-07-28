"use client";

import React, { useState } from "react";
import AdminSubscriptionHeader from "./AdminSubscriptionHeader";
import AISubscriptionAnalyticsWidget from "./AISubscriptionAnalyticsWidget";
import SubscriptionPlansTable from "./SubscriptionPlansTable";
import InvoicesAndCouponsDrawer from "./InvoicesAndCouponsDrawer";

export default function AdminSubscriptionsClient() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [aiReport] = useState({
    churnRate: "%1.2 (Sektör Ortalamasının Altında)",
    predictedNextMrr: "1.680.000 ₺ (Gelecek Ay Projeksiyonu)",
    highChurnRiskCount: 4,
    upsellOpportunitiesCount: 18,
    aiAnalysis: "Son 30 günde 'Pro Business' paketten 'Enterprise' pakete geçiş yapan tedarikçi sayısı %24 arttı. Fotoğraf kategorisinde ek Lead kredisi talebi yüksek.",
    recommendation: "'Yıllık Peşin Ödemede %20 İndirim' kuponunu yeni onaylanan 12 tedarikçiye fırlatmanız önerilir.",
  });

  const [plans] = useState([
    {
      id: "plan_101",
      planName: "Basic Partner",
      tier: "BASIC",
      priceMonthly: 1800,
      priceAnnual: 18000,
      commissionPercentage: 8,
      aiCreditsLimit: 100,
      leadCreditsLimit: 10,
      storageGbLimit: 15,
      activeSubscribersCount: 220,
    },
    {
      id: "plan_102",
      planName: "Pro Business Partner",
      tier: "PRO_BUSINESS",
      priceMonthly: 4500,
      priceAnnual: 45000,
      commissionPercentage: 5,
      aiCreditsLimit: 500,
      leadCreditsLimit: 25,
      storageGbLimit: 50,
      activeSubscribersCount: 540,
    },
    {
      id: "plan_103",
      planName: "Enterprise Luxury Partner",
      tier: "ENTERPRISE_LUXURY",
      priceMonthly: 9500,
      priceAnnual: 95000,
      commissionPercentage: 3,
      aiCreditsLimit: 2500,
      leadCreditsLimit: 100,
      storageGbLimit: 250,
      activeSubscribersCount: 80,
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminSubscriptionHeader
        mrrAmount="1.420.000 ₺"
        arrAmount="17.040.000 ₺"
        activeSubscribers={840}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AISubscriptionAnalyticsWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7">
          <SubscriptionPlansTable
            plans={plans}
            onEditPlan={(plan) => alert("✏️ Paket Düzenleyici Modalı: " + plan.planName)}
          />
        </div>
      </div>

      <InvoicesAndCouponsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
