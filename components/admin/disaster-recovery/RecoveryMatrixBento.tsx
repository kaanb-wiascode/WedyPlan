"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RecoveryMatrixBento({ snapshots }: { snapshots: any[] }) {
  if (!snapshots || snapshots.length === 0) return null;

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Bileşen Bazlı RPO / RTO & Senkronizasyon Matrisi
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
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{item.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{item.replicationRegion} • {item.lastSyncTimestamp}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {item.syncStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">RPO (Veri Kaybı)</span>
                  <span className="font-bold text-emerald-600">{item.achievedRpoMin} dk (Hedef: {item.targetRpoMin} dk)</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">RTO (Kesinti Süresi)</span>
                  <span className="font-bold text-teal-600">{item.achievedRtoMin} dk (Hedef: {item.targetRtoMin} dk)</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
