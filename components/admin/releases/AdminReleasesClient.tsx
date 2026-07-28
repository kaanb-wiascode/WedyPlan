"use client";

import React, { useState } from "react";
import ReleasesHeader from "./ReleasesHeader";
import AIReleaseRiskWidget from "./AIReleaseRiskWidget";
import DeploymentPipelineBento from "./DeploymentPipelineBento";
import ReleaseHistoryAndLogsTable from "./ReleaseHistoryAndLogsTable";

export default function AdminReleasesClient() {
  const [aiReport] = useState({
    deploymentRiskScore: 12,
    predictedIncidentProbability: "%0.4 (Düşük Risk)",
    latestStableVersion: "v2026.07.12",
    canaryTrafficRatio: "%25 Canary Traffic",
    aiAnalysis: "Gözlemlerimize göre 'v2026.07.12' sürümü Staging ve Canary ortamlarında 0 kilitlenme ve %0.01 HTTP 5xx hatası ile çalışmaktadır. Production genel yayına geçilmesi (%100 Rollout) son derece güvenlidir.",
    rollbackRecommendation: "Hata oranları belirlenen %1.0 threshold değerinin altında kaldığı için Rollback gereksinimi yoktur.",
    aiGeneratedReleaseNotes: "✦ Yeni Özellikler: Multi-Tenant veritabanı izolasyonu, AI Çeviri Motoru v2 ve Otomatik Hakediş Fatura modülü eklendi.",
  });

  const [releases] = useState([
    { id: "rel_101", versionTag: "v2026.07.12", commitHash: "8f4e222a", environment: "PRODUCTION", strategy: "CANARY", engineer: "Selin Kaya (Lead DevOps)", timestamp: "Bugün 01:15", status: "DEPLOYED" },
    { id: "rel_102", versionTag: "v2026.07.11", commitHash: "e3b0c442", environment: "PRODUCTION", strategy: "BLUE_GREEN", engineer: "Ahmet Yılmaz (SRE)", timestamp: "24 Temmuz 2026", status: "DEPLOYED" },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ReleasesHeader
        activeVersion={aiReport.latestStableVersion}
        pipelineStatus="PASSED (100% Success)"
        riskScore={aiReport.deploymentRiskScore}
        onTriggerReleaseModal={() => alert("🚀 Yeni Sürüm Yayın Sihirbazı Modalı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIReleaseRiskWidget aiReport={aiReport} />
          <DeploymentPipelineBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <ReleaseHistoryAndLogsTable releases={releases} />
        </div>
      </div>
    </div>
  );
}
