"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProvidersStatusBento({
  providers,
  onTestConnection,
}: {
  providers: any[];
  onTestConnection: (providerKey: string) => void;
}) {
  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🌐 Desteklenen Dış Servis Entegrasyonları ({providers.length} Entegrasyon)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {providers.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{p.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{p.category}</span>
                  </div>
                </div>

                <span
                  className={"px-2 py-0.5 rounded text-[9px] font-bold font-mono " +
                    (p.status === "HEALTHY"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {p.status === "HEALTHY" ? "● ONLINE" : "DEGRADED"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Gecikme</span>
                  <span className="font-bold text-indigo-600">{p.latency}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">API Sürümü</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{p.version}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[9px] text-slate-400 font-mono">Son Sync: {p.lastSync}</span>
              <button
                onClick={() => onTestConnection(p.id)}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold hover:bg-indigo-100 transition text-[10px]"
              >
                Test Et ⚡
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
