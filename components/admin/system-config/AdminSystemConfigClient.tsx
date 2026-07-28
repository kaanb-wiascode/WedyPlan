"use client";

import React, { useState } from "react";
import SystemConfigHeader from "./SystemConfigHeader";
import AISystemConfigWidget from "./AISystemConfigWidget";
import SettingsCategoryBento from "./SettingsCategoryBento";
import VersionHistoryDrawer from "./VersionHistoryDrawer";
import { updateSystemCategoryConfigAction } from "@/lib/actions/admin-system-config";

export default function AdminSystemConfigClient() {
  const [isVersionDrawerOpen, setIsVersionDrawerOpen] = useState(false);

  const [aiReport] = useState({
    configHealthScore: 99,
    bestPracticesScore: 96,
    detectedConflictsCount: 0,
    aiAnalysis: "Platform genelindeki 11 konfigürasyon kategorisinin tamamı doğrulama testlerinden geçmiş ve birbiriyle uyumlu parametrelerle çalışmaktadır.",
    conflictWarnings: [],
    bestPracticesRecommendations: [
      "Siber güvenlik kategorisindeki 'Session Inactivity Timeout' süresinin 60 dakikadan 30 dakikaya düşürülmesi ISO-27001 uyumunu güçlendirecektir.",
    ],
    lastApprovedVersion: "v4.2 (Kriptografik İmzalı)",
  });

  const handleSelectCategory = async (categoryKey: string) => {
    const res = await updateSystemCategoryConfigAction({
      category: categoryKey as any,
      settings: { updated: true, timestamp: Date.now() },
      changeReason: "Yönetici panelinden test ayar güncellemesi yapıldı.",
      requiresApproval: false,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <SystemConfigHeader
        healthScore={aiReport.configHealthScore}
        activeVersion="v4.2"
        conflictsCount={aiReport.detectedConflictsCount}
        onOpenVersionDrawer={() => setIsVersionDrawerOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AISystemConfigWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <SettingsCategoryBento onSelectCategory={handleSelectCategory} />
        </div>
      </div>

      <VersionHistoryDrawer
        isOpen={isVersionDrawerOpen}
        onClose={() => setIsVersionDrawerOpen(false)}
        activeVersion="v4.2"
      />
    </div>
  );
}
