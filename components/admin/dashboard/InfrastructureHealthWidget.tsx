"use client";

import React from "react";

export default function InfrastructureHealthWidget({ infra }: { infra: any }) {
  if (!infra) return null;

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🛠️ Altyapı, Mesaj Kuyrukları & AI LLM Model Sağlığı
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          %99.99 Uptime
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Veritabanı (Prisma/PostgreSQL)</span>
          <span className="font-mono font-bold text-emerald-600 text-xs block">{infra.dbHealth}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">API & Gateway Latency</span>
          <span className="font-mono font-bold text-indigo-600 text-xs block">{infra.apiHealth}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Background Queue (Redis BullMQ)</span>
          <span className="font-mono font-bold text-emerald-600 text-xs block">{infra.queueHealth}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">AI Model Gateway (LLM)</span>
          <span className="font-mono font-bold text-purple-600 text-xs block">{infra.aiModelStatus}</span>
        </div>
      </div>
    </div>
  );
}
