"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WeddingPlannerHeader({
  readinessScore,
  daysRemaining,
  riskLevel,
  onOpenCopilotModal,
}: {
  readinessScore: number;
  daysRemaining: number;
  riskLevel: string;
  onOpenCopilotModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300">
              ✦ WedyPlan Flagship AI Agent — Wedding Planner Copilot
            </span>
            <span className="text-xs text-slate-400">360° Düğün Yol Haritası, Bütçe & Otonom Risk Radarı</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Wedding Planner AI Agent</h1>
        </div>

        <button
          onClick={onOpenCopilotModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          💍 AI Düğün Asistanı İle Konuş (Copilot)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-pink-600 font-medium uppercase">Düğün Hazırlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{readinessScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Harika İlerleme</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">18 / 22 Kritik Görev Tamamlandı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Düğüne Kalan Süre</span>
          <div className="text-2xl font-mono font-bold mt-1 text-slate-900 dark:text-slate-100">{daysRemaining} Gün</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Takvim Senkronize</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">AI Risk Durumu</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="text-emerald-600">{riskLevel} DÜŞÜK RİSK</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Otonom Erken Uyarı Aktif</span>
        </motion.div>
      </div>
    </div>
  );
}
