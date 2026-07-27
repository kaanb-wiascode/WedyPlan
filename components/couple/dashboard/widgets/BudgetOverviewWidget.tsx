"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BudgetOverviewWidget({
  totalBudget,
  spentBudget,
  currency,
}: {
  totalBudget: number;
  spentBudget: number;
  currency: string;
}) {
  const remaining = totalBudget - spentBudget;
  const spentPercentage = Math.round((spentBudget / totalBudget) * 100);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="h-full backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Bütçe Özeti</span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Dengeli
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 my-2">
        <div>
          <span className="text-[11px] text-slate-400 block">Toplam Bütçe</span>
          <span className="text-lg font-bold">{totalBudget.toLocaleString("tr-TR")} {currency}</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Harcanan</span>
          <span className="text-lg font-bold text-rose-600">{spentBudget.toLocaleString("tr-TR")} {currency}</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 block">Kalan</span>
          <span className="text-lg font-bold text-emerald-600">{remaining.toLocaleString("tr-TR")} {currency}</span>
        </div>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
        <div className="bg-rose-500 h-full rounded-full" style={{ width: `${spentPercentage}%` }} />
      </div>
    </motion.div>
  );
}