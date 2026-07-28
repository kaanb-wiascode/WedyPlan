"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BIDashboardBentoGrid({ dimensions }: { dimensions: any[] }) {
  if (!dimensions) return null;

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 9 Boyutlu Çapraz Veri Ambarı Kartları
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dimensions.map((dim, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-5 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">{dim.name}</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">{dim.value}</div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px]">
              <span className="font-mono font-bold text-emerald-600">{dim.trend} Trend</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                {dim.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
