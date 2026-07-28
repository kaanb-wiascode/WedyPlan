"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AdminCoupleHeader({
  totalCouplesCount,
  activePlanningCount,
  todayWeddingsCount,
  searchQuery,
  setSearchQuery,
}: {
  totalCouplesCount: number;
  activePlanningCount: number;
  todayWeddingsCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ WedyPlan Couple Ecosystem OS
            </span>
            <span className="text-xs text-slate-400">Çift Hesapları, Düğün Takibi & Risk Yönetimi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Couple Management Center</h1>
        </div>

        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Çift adı, e-posta veya şehir arayın..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Kayıtlı Toplam Çift</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{totalCouplesCount.toLocaleString("tr-TR")} Çift</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Platform Müşteri Ekosistemi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Aktif Düğün Planlayanlar</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">{activePlanningCount.toLocaleString("tr-TR")} Çift</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sözleşme & Bütçe Aşamasında</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Bugün Düğünü Olan Çiftler (D-Day)</span>
          <div className="text-2xl font-bold mt-1 text-amber-600 flex items-center gap-2">
            <span>{todayWeddingsCount} Düğün</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Canlı Saha Operasyon Sürecinde</span>
        </motion.div>
      </div>
    </div>
  );
}
