"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BudgetHeader({
  totalBudget,
  spentBudget,
  remainingBudget,
  emergencyFund,
  currency,
}: {
  totalBudget: number;
  spentBudget: number;
  remainingBudget: number;
  emergencyFund: number;
  currency: string;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ AI Financial Assistant
            </span>
            <span className="text-xs text-slate-400">Canlı Bütçe Yönetimi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Enterprise Wedding Budget</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Toplam Bütçe Hedefi</span>
          <div className="text-2xl font-bold mt-2 text-slate-900 dark:text-slate-100">
            {totalBudget.toLocaleString("tr-TR")} {currency}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Planlanan Tavan Limit</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Harcanan Toplam</span>
          <div className="text-2xl font-bold mt-2 text-rose-600 dark:text-rose-400">
            {spentBudget.toLocaleString("tr-TR")} {currency}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Ödenen ve Onaylananlar</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Kullanılabilir Kalan</span>
          <div className="text-2xl font-bold mt-2 text-emerald-600 dark:text-emerald-400">
            {remainingBudget.toLocaleString("tr-TR")} {currency}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Serbest Bütçe Bakiyesi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-amber-500/10 via-white/70 to-amber-500/5 dark:from-amber-950/20 dark:via-slate-900/70 dark:to-amber-900/10 border border-amber-200/50 dark:border-amber-900/40 rounded-3xl shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">🛡️ Acil Durum Fonu (%10)</span>
          <div className="text-2xl font-bold mt-2 text-amber-700 dark:text-amber-300">
            {emergencyFund.toLocaleString("tr-TR")} {currency}
          </div>
          <span className="text-[11px] text-amber-600/80 dark:text-amber-400/80 mt-1 block">Ayrılmış Güvence Akçesi</span>
        </motion.div>
      </div>
    </div>
  );
}
