"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ReleasesHeader({
  activeVersion,
  pipelineStatus,
  riskScore,
  onTriggerReleaseModal,
}: {
  activeVersion: string;
  pipelineStatus: string;
  riskScore: number;
  onTriggerReleaseModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Safe Release & CI/CD Deployment OS
            </span>
            <span className="text-xs text-slate-400">Blue-Green, Canary Releases, Migrasyonlar & Rollback</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Release & Deployment Center</h1>
        </div>

        <button
          onClick={onTriggerReleaseModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🚀 Yeni Sürüm Yayınla (Deploy Release)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Canlıdaki Aktif Kararlı Sürüm</span>
          <div className="text-2xl font-mono font-bold mt-1 text-slate-900 dark:text-slate-100">{activeVersion}</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Git Commit Hash: 8f4e222a</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">CI/CD Boru Hattı Durumu</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>{pipelineStatus}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Tüm Birim & E2E Testleri Geçti</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">AI Dağıtım Risk Skoru</span>
          <div className="text-2xl font-bold mt-1 text-purple-600 font-mono">%{riskScore} Risk</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Güvenli Yayın Parametreleri</span>
        </motion.div>
      </div>
    </div>
  );
}
