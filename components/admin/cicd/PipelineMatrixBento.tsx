"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PipelineMatrixBento({ pipelines, environments }: { pipelines: any[]; environments: any[] }) {
  return (
    <div className="space-y-6 text-xs">
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🌐 Aktif Dağıtım Ortamları (Deployment Environments)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {environments.map((env, i) => (
            <div key={i} className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-xs font-mono">{env.name}</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {env.status}
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                <span>Versiyon: {env.version}</span>
                <span>{env.lastDeployed}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📊 Son CI/CD Boru Hattı Çalıştırmaları (Pipeline Runs)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pipelines.map((item, i) => {
            const isSuccess = item.status === "SUCCESS";
            const isRunning = item.status === "RUNNING";
            const badgeClass = isSuccess
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
              : isRunning
              ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
              : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300";

            return (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs font-mono">{item.branch} ({item.commit})</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Geliştirici: {item.author} • Tetikleyici: {item.trigger}</span>
                  </div>
                  <span className={"px-2 py-0.5 rounded text-[10px] font-bold font-mono " + badgeClass}>
                    {item.status}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
                  <span className="text-slate-400">Aktif Aşama / Süre:</span>
                  <span className="font-bold text-emerald-600 text-xs">{item.currentStage} ({item.durationSeconds}s)</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
