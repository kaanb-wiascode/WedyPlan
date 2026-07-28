"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ServiceHealthMatrixBento({ services }: { services: any[] }) {
  if (!services || services.length === 0) return null;

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🟩 Servis Sağlık & Heartbeat Matrisi (Live Health Matrix)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((item, i) => {
          const isHealthy = item.status === "HEALTHY";
          const isDegraded = item.status === "DEGRADED";

          const pingColor = isHealthy ? "bg-emerald-400" : isDegraded ? "bg-amber-400" : "bg-rose-400";
          const dotColor = isHealthy ? "bg-emerald-500" : isDegraded ? "bg-amber-500" : "bg-rose-500";
          const badgeStyle = isHealthy
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
            : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";

          return (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className={"animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 " + pingColor}></span>
                      <span className={"relative inline-flex rounded-full h-3 w-3 " + dotColor}></span>
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{item.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{item.category} • {item.lastHeartbeat}</span>
                    </div>
                  </div>

                  <span className={"px-2 py-0.5 rounded text-[10px] font-bold font-mono " + badgeStyle}>
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
                <span className="text-slate-400">Latens / Uptime:</span>
                <span className="font-bold text-emerald-600 text-xs">{item.latencyMs}ms | %{item.uptimePct}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
