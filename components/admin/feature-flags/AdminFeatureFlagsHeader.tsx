"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AdminFeatureFlagsHeader({
  activeFlagsCount,
  experimentsCount,
  safeRolloutScore,
  onOpenNewFlagModal,
}: {
  activeFlagsCount: number;
  experimentsCount: number;
  safeRolloutScore: number;
  onOpenNewFlagModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ WedyPlan Safe Rollout & Feature Governance OS
            </span>
            <span className="text-xs text-slate-400">Canlı Özellik Yönetimi, A/B Testleri & Kill Switches</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Feature Flag Management</h1>
        </div>

        <button
          onClick={onOpenNewFlagModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🚩 Yeni Özellik Bayrağı / A-B Deney Tanımla
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Aktif Özellik Bayrakları</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activeFlagsCount} Özellik</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Sub-millisecond Edge Evaluation</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Canlıdaki A/B Deneyleri</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">{experimentsCount} Aktif Deney</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Dönüşüm & CSAT Etkisi Ölçülüyor</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Güvenli Yayın Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{safeRolloutScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Risk Sıfır</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Otonom Rollback Kalkanı Devrede</span>
        </motion.div>
      </div>
    </div>
  );
}
