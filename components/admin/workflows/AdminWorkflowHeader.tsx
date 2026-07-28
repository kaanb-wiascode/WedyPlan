"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AdminWorkflowHeader({
  activeWorkflowsCount,
  totalExecutionsMonth,
  automationSuccessRate,
  onOpenNewWorkflowModal,
}: {
  activeWorkflowsCount: number;
  totalExecutionsMonth: number;
  automationSuccessRate: number;
  onOpenNewWorkflowModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              ✦ WedyPlan Platform Autonomous Workflow OS
            </span>
            <span className="text-xs text-slate-400">Olay Tabanlı Otomasyonlar, Tetikleyiciler & AI Akışlar</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Workflow & Automation Center</h1>
        </div>

        <button
          onClick={onOpenNewWorkflowModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          ⚡ Yeni Otomasyon Akışı Kurgula
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Aktif Otomasyon Akışları</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activeWorkflowsCount} Canlı Akış</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Olay Veriyolu (Event Bus) Dinliyor</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Bu Ay Yürütülen Toplam Eylem</span>
          <div className="text-2xl font-serif font-bold mt-1 text-indigo-600">{totalExecutionsMonth.toLocaleString("tr-TR")} Tetikleme</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Tahmini Tasarruf Edilen Adam/Saat: 340 Saat</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Otomasyon Başarı Oranı</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{automationSuccessRate}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Yüksek Kararlılık</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Otonom Hata İyileştirme (Self-Healing) Devrede</span>
        </motion.div>
      </div>
    </div>
  );
}
