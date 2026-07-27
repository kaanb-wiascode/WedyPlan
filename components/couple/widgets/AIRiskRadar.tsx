"use client";

import React from "react";

export default function AIRiskRadar({ data }: { data: any }) {
  const risks = data?.risks || [
    { level: "HIGH", title: "Fotoğrafçı Rezervasyonu", desc: "Sezon yoğunluğu nedeniyle acele edilmeli." },
  ];

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          🛡️ AI Risk Radar
        </span>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          Canlı Analiz
        </span>
      </div>

      <div className="space-y-3">
        {risks.map((risk: any, i: number) => (
          <div key={i} className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/40 dark:border-rose-900/30">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{risk.title}</h4>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 pl-4">{risk.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}