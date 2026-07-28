"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ModelProvidersGrid({
  providers,
  onToggleProvider,
}: {
  providers: any[];
  onToggleProvider: (providerKey: string, currentStatus: boolean) => void;
}) {
  return (
    <div className="space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🤖 Entegre LLM Model Sağlayıcıları ({providers.length} Sağlayıcı)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {providers.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -2 }}
            className="p-5 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{p.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono font-semibold">{p.activeModel}</span>
                  </div>
                </div>

                <span
                  className={"w-2.5 h-2.5 rounded-full " +
                    (p.status === "HEALTHY" ? "bg-emerald-500 animate-pulse" : "bg-amber-500")
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Gecikme</span>
                  <span className="font-bold text-indigo-600">{p.latency}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">RPM Limiti</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{p.rateLimitRpm}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-mono">
                {p.isPrimary ? "★ Birincil Model" : p.isFallback ? "🛡️ Fallback Yedek" : "Pasif Mode"}
              </span>

              <button
                onClick={() => onToggleProvider(p.id, p.isActive)}
                className={"px-3 py-1.5 rounded-xl text-[10px] font-bold transition " +
                  (p.isActive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300")
                }
              >
                {p.isActive ? "● Aktif" : "Devre Dışı"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
