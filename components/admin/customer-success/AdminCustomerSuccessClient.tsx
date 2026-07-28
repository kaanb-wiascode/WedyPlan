"use client";

import React, { useState } from "react";
import CustomerSuccessHeader from "./CustomerSuccessHeader";
import AICustomerSuccessWidget from "./AICustomerSuccessWidget";
import CustomerHealthTable from "./CustomerHealthTable";
import SuccessPlanDrawer from "./SuccessPlanDrawer";
import { triggerCustomerInterventionAction } from "@/lib/actions/admin-customer-success";

export default function AdminCustomerSuccessClient() {
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [aiReport] = useState({
    averageHealthScore: 94,
    churnRiskCount: 1,
    upsellCandidatesCount: 14,
    aiAnalysis: "Tedarikçilerin %88'i onboarding sürecini ilk 48 saatte tamamlıyor. 'Ege Panorama Fotoğraf' hesabı son 10 gündür teklif modülünü kullanmadığı için Churn riski taşıyor.",
    growthOpportunities: "Pro paketteki 14 yüksek sağlıklı tedarikçinin Enterprise paket kotalarına yaklaşması nedeniyle özel Upsell indirimi önerilir.",
    recommendation: "Onboarding tamamlama oranı %50 altında kalan 5 tedarikçiye otonom interaktif eğitim videosu iletilmelidir.",
  });

  const [accounts] = useState([
    {
      id: "acc_101",
      name: "Bodrum Sunset Venue",
      type: "VENDOR",
      healthScore: 98,
      onboardingProgress: 100,
      adoptionScore: 96,
      healthStatus: "EXCELLENT",
      assignedCsm: "Selin Yılmaz",
      isVIP: true,
    },
    {
      id: "acc_102",
      name: "Ege Panorama Fotoğraf & Sinema",
      type: "VENDOR",
      healthScore: 42,
      onboardingProgress: 60,
      adoptionScore: 35,
      healthStatus: "AT_RISK",
      assignedCsm: "Ahmet Demir",
      isVIP: false,
    },
  ]);

  const handleTriggerIntervention = async (accountId: string) => {
    const res = await triggerCustomerInterventionAction({
      accountId,
      interventionType: "CALL_SCHEDULED",
      notes: "Hızlı risk müdahale butonundan çağrı başlatıldı.",
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const riskAccountsCount = accounts.filter((a) => a.healthStatus === "AT_RISK").length;
  const vipAccountsCount = accounts.filter((a) => a.isVIP).length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <CustomerSuccessHeader
        averageHealthScore={aiReport.averageHealthScore}
        riskAccountsCount={riskAccountsCount}
        vipAccountsCount={vipAccountsCount}
        onOpenNewPlanModal={() => alert("🎯 Yeni Başarı Planı Oluşturucu Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AICustomerSuccessWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7">
          <CustomerHealthTable
            accounts={accounts}
            onSelectAccount={(acc) => {
              setSelectedAccount(acc);
              setIsDrawerOpen(true);
            }}
            onTriggerIntervention={handleTriggerIntervention}
          />
        </div>
      </div>

      <SuccessPlanDrawer
        account={selectedAccount}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
