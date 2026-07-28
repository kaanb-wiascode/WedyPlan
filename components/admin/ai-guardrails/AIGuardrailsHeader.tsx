"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIGuardrailsHeader({
  healthScore,
  scannedPrompts,
  blockedThreats,
  piiMaskedCount,
  onOpenTestConsole,
}: {
  healthScore: number;
  scannedPrompts: number;
  blockedThreats: number;
  piiMaskedCount: number;
  onOpenTestConsole: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ WedyPlan Shared AI Security & Guardrails OS
            </span>
            <span className="text-xs text-slate-400">Prompt Injection, Jailbreak Kalkanı & PII Maskeleme</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">AI Guardrails & Security Engine</h1>
        </div>

        <button
          onClick={onOpenTestConsole}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🛡️ Live Guardrail & Security Playground
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">AI Güvenlik Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{healthScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Kusursuz Kalkan</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Zero Trust AI Security Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Bugün Taranan Etkileşim</span>
          <div className="text-2xl font-mono font-bold mt-1 text-slate-900 dark:text-slate-100">{(scannedPrompts / 1000).toFixed(1)}K Prompt</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Avg Latency: 3ms</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Engellenen Tehdit & Injection</span>
          <div className="text-2xl font-mono font-bold mt-1 text-rose-600">{blockedThreats} Saldırı</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Jailbreak & System Override</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Anonimleştirilen PII Verisi</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">{piiMaskedCount} Kayıt</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">KVKK / GDPR Masked %100</span>
        </motion.div>
      </div>
    </div>
  );
}
