"use client";

import React, { useState } from "react";
import AdminFeatureFlagsHeader from "./AdminFeatureFlagsHeader";
import AIFeatureFlagRiskWidget from "./AIFeatureFlagRiskWidget";
import FeatureFlagsTable from "./FeatureFlagsTable";
import ExperimentManagerDrawer from "./ExperimentManagerDrawer";
import { toggleFeatureFlagKillSwitchAction } from "@/lib/actions/admin-feature-flags";

export default function AdminFeatureFlagsClient() {
  const [selectedFlag, setSelectedFlag] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [aiReport] = useState({
    safeRolloutScore: 97,
    activeExperimentsCount: 2,
    aiAnalysis: "Gözlemlerimize göre 'ai_planner_v2' özelliği Production ortamında %25 kademeli yayında kusursuz çalışmaktadır. Hata oranı %0.02 seviyesindedir.",
    impactPrediction: "Yayılımın %25'ten %50'ye yükseltilmesi sunucu CPU yükünü yalnızca %1.2 artıracaktır.",
    riskDetectionAlerts: [
      "'instant_escrow_payout' deneysel özelliğinde Staging ortamında 1 adet yetkilendirme zaman aşımı algılandı. Production yayın tarihi ertelendi.",
    ],
    recommendation: "'ai_planner_v2' özelliğini Türkiye bölgesindeki tüm Enterprise tedarikçilere tam açmanız (%100 Rollout) önerilir.",
  });

  const [flags, setFlags] = useState([
    {
      id: "flag_101",
      name: "AI Wedding Planner Copilot v2",
      flagKey: "ai_planner_v2",
      environment: "PRODUCTION",
      rolloutPercentage: 25,
      status: "ENABLED",
      isKillSwitched: false,
    },
    {
      id: "flag_102",
      name: "Anında Escrow Hakediş Aktarımı",
      flagKey: "instant_escrow_payout",
      environment: "STAGING",
      rolloutPercentage: 10,
      status: "EXPERIMENT_ACTIVE",
      isKillSwitched: false,
    },
    {
      id: "flag_103",
      name: "Eski Bütçe Sihirbazı Modülü",
      flagKey: "legacy_budget_wizard",
      environment: "PRODUCTION",
      rolloutPercentage: 0,
      status: "DISABLED",
      isKillSwitched: true,
    },
  ]);

  const handleTriggerKillSwitch = async (flagKey: string) => {
    const res = await toggleFeatureFlagKillSwitchAction({
      flagKey,
      isKillSwitched: true,
      reason: "Tablo hızlı kill switch butonundan tetiklendi.",
    });

    if (res.success) {
      setFlags((prev) =>
        prev.map((f) => (f.flagKey === flagKey ? { ...f, isKillSwitched: true } : f))
      );
      alert("🚨 " + res.message);
    }
  };

  const activeFlagsCount = flags.filter((f) => f.status === "ENABLED").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <AdminFeatureFlagsHeader
        activeFlagsCount={activeFlagsCount}
        experimentsCount={aiReport.activeExperimentsCount}
        safeRolloutScore={aiReport.safeRolloutScore}
        onOpenNewFlagModal={() => alert("🚩 Yeni Özellik Bayrağı Oluşturucu Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIFeatureFlagRiskWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 font-sans">
          <FeatureFlagsTable
            flags={flags}
            onSelectFlag={(f) => {
              setSelectedFlag(f);
              setIsDrawerOpen(true);
            }}
            onTriggerKillSwitch={handleTriggerKillSwitch}
          />
        </div>
      </div>

      <ExperimentManagerDrawer
        flag={selectedFlag}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
