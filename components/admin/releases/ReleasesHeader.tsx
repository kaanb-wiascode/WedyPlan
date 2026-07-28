"use client";

import React from "react";
import { motion } from "framer-motion";
import { updateReleaseApprovalAction } from "@/lib/actions/releases";

export default function ReleasesHeader({
  activeVersion,
  upcomingReleasesCount,
  pendingApprovalsCount,
  systemReadinessScorePct,
  onOpenPlanModal,
}: {
  activeVersion: string;
  upcomingReleasesCount: number;
  pendingApprovalsCount: number;
  systemReadinessScorePct: number;
  onOpenPlanModal: () => void;
}) {
  const handleTriggerHotfix = async () => {
    if (confirm("🚨 ACİL HOTFIX: Üretim ortamı için acil yama sürümünü (Hotfix Patch) devreye almak istiyor musunuz?")) {
      const res = await updateReleaseApprovalAction({
        releaseId: "rel_02",
        action: "TRIGGER_HOTFIX",
        comment: "Acil Hotfix Devrede",
      });
      if (res.success) {
        alert(res.message);
      }
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ WedyPlan Shared Enterprise Release Automation & Semantic Versioning Engine
            </span>
            <span className="text-xs text-slate-400">Release Planning, Approval Gates, Hotfixes, Changelogs & Maintenance Windows</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Release Automation Platform</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleTriggerHotfix}
            className="px-5 py-3 rounded-2xl bg-rose-600 text-white font-mono text-xs font-bold hover:bg-rose-700 transition shadow-md"
          >
            🚨 TRIGGER EMERGENCY HOTFIX
          </button>

          <button
            onClick={onOpenPlanModal}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
          >
            🚀 Yeni Sürüm Planı Oluştur
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Aktif Prod Versiyonu</span>
          <div className="text-lg font-bold mt-1 text-emerald-600 font-mono">{activeVersion}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Live in Production</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Planlanan Sürümler</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{upcomingReleasesCount} Sürüm</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Calendar Synchronized</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Onay Bekleyenler (Gates)</span>
          <div className="text-2xl font-mono font-bold mt-1 text-amber-600">{pendingApprovalsCount} Sürüm</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Pending Approval Gate</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Sistem Hazırlık Skoru</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">%{systemReadinessScorePct}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Deployment Readiness Verified</span>
        </motion.div>
      </div>
    </div>
  );
}
