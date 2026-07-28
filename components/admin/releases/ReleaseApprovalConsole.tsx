"use client";

import React, { useState } from "react";
import { createReleasePlanAction, updateReleaseApprovalAction } from "@/lib/actions/releases";

export default function ReleaseApprovalConsole() {
  const [versionTag, setVersionTag] = useState("v2.15.0");
  const [title, setTitle] = useState("Q3 Peak Season Core Release");
  const [riskLevel, setRiskLevel] = useState<any>("MEDIUM");
  const [maintenanceWindowStart, setMaintenanceWindowStart] = useState("Salı 03:00 UTC");
  const [maintenanceWindowEnd, setMaintenanceWindowEnd] = useState("Salı 04:00 UTC");

  const handleCreateRelease = async () => {
    const res = await createReleasePlanAction({
      versionTag,
      title,
      riskLevel,
      maintenanceWindowStart,
      maintenanceWindowEnd,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const handleApproveRelease = async () => {
    const res = await updateReleaseApprovalAction({
      releaseId: "rel_01",
      action: "APPROVE",
      comment: "Sürüm onaylandı, bakım penceresi açıldı.",
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🚀 Sürüm Planlama & Approval Gate Konsolu
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Approval Gate Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Semantic Versiyon (Tag)</label>
            <input
              type="text"
              value={versionTag}
              onChange={(e) => setVersionTag(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-emerald-600"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Sürüm Başlığı</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Risk Seviyesi</label>
            <select
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="LOW">Low Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Risk</option>
              <option value="CRITICAL">Critical Risk</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Bakım Başlangıcı</label>
            <input
              type="text"
              value={maintenanceWindowStart}
              onChange={(e) => setMaintenanceWindowStart(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Bakım Bitişi</label>
            <input
              type="text"
              value={maintenanceWindowEnd}
              onChange={(e) => setMaintenanceWindowEnd(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={handleCreateRelease}
            className="py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
          >
            🚀 Sürüm Planını Kaydet
          </button>

          <button
            onClick={handleApproveRelease}
            className="py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
          >
            ✓ Onay Ver (Approve Gate)
          </button>
        </div>
      </div>
    </div>
  );
}
