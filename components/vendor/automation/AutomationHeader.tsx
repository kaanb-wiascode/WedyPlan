"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AutomationHeader({
  activeWorkflowsCount,
  totalExecutionsCount,
  healthScore,
  onOpenBuilder,
}: {
  activeWorkflowsCount: number;
  totalExecutionsCount: number;
  healthScore: number;
  onOpenBuilder: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ Process Automation OS
            </span>
            <span className="text-xs text-slate-400">Otonom İş Akışları & Robotik Süreçler</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Automation & Workflow Builder</h1>
        </div>

        <button
          onClick={onOpenBuilder}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold hover:shadow-lg transition flex items-center gap-2"
        >
          + Yeni Otomasyon Akışı Tasarla
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Yayındaki Aktif Akışlar</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activeWorkflowsCount} Otonom Akış</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">7/24 Kesintisiz Çalışıyor</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Toplam Tamamlanan İcra</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">+{totalExecutionsCount.toLocaleString("tr-TR")} Otomatik Eylem</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Zamandan %85 Tasarruf Sağlandı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Otomasyon Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-purple-600">%{healthScore} Mükemmel</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Hata Oranı: %0.02</span>
        </motion.div>
      </div>
    </div>
  );
}
