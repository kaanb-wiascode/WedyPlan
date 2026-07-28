"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PricingFactorsBento() {
  const factors = [
    { title: "Sezonsallık (Seasonality)", value: "1.35x Multiplier", desc: "Mayıs - Eylül Yüksek Sezon", icon: "☀️", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
    { title: "Doluluk Oranı (Occupancy)", value: "1.25x Multiplier", desc: ">%80 Dolulukta Premium Mod", icon: "📈", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { title: "Rakip Fiyat Endeksi", value: "+%5 Premium", desc: "Bölgesel Liderlik Konumu", icon: "🏆", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
    { title: "Lead Kalite Skoru", value: "80/100 Index", desc: "Yüksek Dönüşüm Potansiyeli", icon: "🎯", color: "text-teal-600 bg-teal-50 dark:bg-teal-950/40" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        ⚙️ Fiyatlandırma Faktör Matrisi (Pricing Factor Matrix)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {factors.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{f.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{f.desc}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <span className="text-slate-400">Çarpan Etkisi:</span>
              <span className="font-bold text-emerald-600 text-xs">{f.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
