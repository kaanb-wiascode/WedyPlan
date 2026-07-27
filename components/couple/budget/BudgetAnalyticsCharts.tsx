"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BudgetAnalyticsCharts({ categories, currency }: { categories: any[]; currency: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
        📊 Kategori Dağılımı & Nakit Akışı Projeksiyonu
      </span>

      <div className="space-y-3 pt-2">
        {categories.map((cat) => {
          const catPercentage = Math.round((cat.actual / cat.estimated) * 100);
          return (
            <div key={cat.id} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span>{cat.name}</span>
                <span className={cat.actual > cat.estimated ? "text-rose-600" : "text-slate-600 dark:text-slate-300"}>
                  {cat.actual.toLocaleString("tr-TR")} / {cat.estimated.toLocaleString("tr-TR")} {currency} (%{catPercentage})
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={"h-full rounded-full " + (cat.actual > cat.estimated ? "bg-rose-500" : "bg-emerald-500")}
                  style={{ width: Math.min(catPercentage, 100) + "%" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
