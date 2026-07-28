"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AdminExecutiveHeader({
  mrrAmount,
  activeCouplesCount,
  activeVendorsCount,
  onTriggerAction,
}: {
  mrrAmount: string;
  activeCouplesCount: number;
  activeVendorsCount: number;
  onTriggerAction: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-500/20 to-indigo-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30">
              ✦ WedyPlan Platform Control Tower
            </span>
            <span className="text-xs text-slate-400">Tüm Ekosistem Komuta Merkezi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Executive Platform Dashboard</h1>
        </div>

        <button
          onClick={onTriggerAction}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          ⚡ Platform Yönetici İşlemleri
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Platform Aylık Tekrarlayan Gelir (MRR)</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{mrrAmount}</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ %18.4 Büyüme Oranı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Aktif Ekosistem Çift Sayısı</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">{activeCouplesCount.toLocaleString("tr-TR")} Çift</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Aylık 340k Tekil Ziyaretçi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Doğrulanmış Onaylı Tedarikçi</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activeVendorsCount} Tedarikçi</div>
          <span className="text-[11px] text-amber-600 font-bold mt-0.5 block">12 Yeni Tedarikçi Onay Bekliyor</span>
        </motion.div>
      </div>
    </div>
  );
}
