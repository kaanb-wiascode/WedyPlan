"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TimelineTasksBento() {
  const criticalTasks = [
    { title: "Saç & Makyaj Hazırlığı", time: "10:00 - 13:00", isCritical: true, risk: "%35 Gecikme Riski", icon: "💄" },
    { title: "Dış Çekim & Video Production", time: "13:30 - 15:30", isCritical: true, risk: "%20 Gecikme Riski", icon: "📸" },
    { title: "Nikah Seremonisi & İlk Dans", time: "19:30 - 20:15", isCritical: true, risk: "%15 Gecikme Riski", icon: "💍" },
    { title: "Pasta Kesimi & Tebrikler", time: "22:30 - 23:00", isCritical: true, risk: "%5 Gecikme Riski", icon: "🎂" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🔗 Kritik Yol Görev Zinciri (Critical Path Sequence)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {criticalTasks.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{t.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{t.time}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-rose-50 text-rose-600 dark:bg-rose-950/40">
                  KRİTİK YOL
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <span className="text-slate-400">Tahmini Risk:</span>
              <span className="font-bold text-amber-600 text-xs">{t.risk}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
