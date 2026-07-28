"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BreakingPointMatrixBento({ snapshots }: { snapshots: any[] }) {
  if (!snapshots || snapshots.length === 0) return null;

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Tamamlanan Stres Fırtınası & Kırılma Noktası Raporları
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {snapshots.map((item, i) => {
          return (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{item.scenarioName}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{item.targetModule} • {item.stressType}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  BREAKING POINT
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] space-y-1">
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>Kırılma Eşiği:</span>
                  <span>{item.breakingPointRps.toLocaleString()} RPS ({item.breakingPointVu.toLocaleString()} VU)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>İlk Çöken Bileşen:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">{item.firstFailingComponent}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Toparlanma Süresi:</span>
                  <span className="text-emerald-600 font-bold">{item.recoveryDurationSeconds}s</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
