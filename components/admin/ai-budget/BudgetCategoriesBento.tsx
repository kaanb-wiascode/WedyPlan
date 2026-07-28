"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BudgetCategoriesBento() {
  const categories = [
    { name: "Mekan & Konaklama", share: "%40", risk: "DÜŞÜK RİSK", icon: "🏰", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
    { name: "Catering & Yeme İçme", share: "%25", risk: "DÜŞÜK RİSK", icon: "🍽️", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
    { name: "Fotoğraf & Video Production", share: "%12", risk: "DÜŞÜK RİSK", icon: "📸", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { name: "Dekorasyon & Çiçek Tasarım", share: "%13", risk: "AŞIM RİSKİ", icon: "💐", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Ideal Bütçe Dağılım Modeli (Recommended Allocation)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{c.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Önerilen Pay: {c.share}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono ${c.color}`}>
                  {c.risk}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <span className="text-slate-400">Optimizasyon Skoru:</span>
              <span className="font-bold text-emerald-600 text-xs">%94 Uygun</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
