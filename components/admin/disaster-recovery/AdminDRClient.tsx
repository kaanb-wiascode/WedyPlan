"use client";

import React, { useState } from "react";
import DRHeader from "./DRHeader";
import RecoveryMatrixBento from "./RecoveryMatrixBento";
import FailoverSimulatorConsole from "./FailoverSimulatorConsole";
import ReadinessAnalysisViewer from "./ReadinessAnalysisViewer";

export default function AdminDRClient() {
  const [data] = useState({
    readinessScore: 99.4,
    achievedRpoMin: 0.2,
    achievedRtoMin: 2.5,
    syncStatusText: "ALL_SYSTEMS_IN_SYNC",
    snapshots: [
      { component: "DATABASE", name: "PostgreSQL Primary WAL Streaming", targetRpoMin: 1, achievedRpoMin: 0.2, targetRtoMin: 5, achievedRtoMin: 2.5, lastSyncTimestamp: "Anlık (12s önce)", syncStatus: "IN_SYNC", replicationRegion: "eu-central-1 (Frankfurt)" },
      { component: "OBJECT_STORAGE", name: "S3 Wedding Media Storage Cross-Region", targetRpoMin: 5, achievedRpoMin: 1.0, targetRtoMin: 15, achievedRtoMin: 8.0, lastSyncTimestamp: "1 dk önce", syncStatus: "IN_SYNC", replicationRegion: "eu-west-1 (Ireland)" },
      { component: "AI_MEMORY", name: "Vector Memory Store & Embeddings Dump", targetRpoMin: 2, achievedRpoMin: 0.5, targetRtoMin: 10, achievedRtoMin: 4.0, lastSyncTimestamp: "30s önce", syncStatus: "IN_SYNC", replicationRegion: "eu-central-1 (Frankfurt)" },
      { component: "SECRETS", name: "Vault KMS Encrypted Secrets Sync", targetRpoMin: 1, achievedRpoMin: 0.1, targetRtoMin: 3, achievedRtoMin: 1.0, lastSyncTimestamp: "Anlık (5s önce)", syncStatus: "IN_SYNC", replicationRegion: "eu-west-1 (Ireland)" },
    ],
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <DRHeader
        readinessScore={data.readinessScore}
        achievedRpoMin={data.achievedRpoMin}
        achievedRtoMin={data.achievedRtoMin}
        syncStatusText={data.syncStatusText}
        onOpenSimulatorModal={() => alert("🛡️ DR Simulator Studio Konsoluna Odaklanıldı")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <FailoverSimulatorConsole />
          <ReadinessAnalysisViewer />
        </div>

        <div className="lg:col-span-7 font-sans">
          <RecoveryMatrixBento snapshots={data.snapshots} />
        </div>
      </div>
    </div>
  );
}
