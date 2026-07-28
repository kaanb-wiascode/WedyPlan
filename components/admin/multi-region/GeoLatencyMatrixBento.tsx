"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GeoLatencyMatrixBento({ nodes }: { nodes: any[] }) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 6 Kıta Bölgesel Düğüm & Coğrafi Latens Matrisi
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {nodes.map((item, i) => {
          return (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{item.regionName}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{item.activeUsersCount.toLocaleString()} Aktif Kullanıcı</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Latens</span>
                  <span className="font-bold text-emerald-600">{item.avgLatencyMs} ms</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Veri Yasası</span>
                  <span className="font-bold text-indigo-600">{item.dataResidencyStatus}</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[10px] font-mono space-y-0.5 text-slate-400">
                <div>DB: <span className="text-slate-700 dark:text-slate-300 font-semibold">{item.regionalDbStatus}</span></div>
                <div>AI: <span className="text-purple-600 font-semibold">{item.regionalAiProvider}</span></div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
