"use client";

import React from "react";

export default function WAFThreatInspector({ threats }: { threats: any[] }) {
  if (!threats || threats.length === 0) return null;

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🛡️ Canlı WAF Tehdit & Anomali Akışı (Threat Inspector)
          </span>
          <span className="text-[11px] text-purple-600 font-mono font-bold">Zero Trust Karantina Konsolu</span>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          Shield Active
        </span>
      </div>

      <div className="space-y-2 font-mono text-[11px]">
        {threats.map((item, idx) => {
          const isCritical = item.level === "CRITICAL";
          const levelColor = isCritical ? "text-rose-500 font-bold" : "text-amber-500 font-bold";

          return (
            <div key={idx} className="p-3 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">🚨 {item.type}</span>
                <span className={levelColor}>{item.level}</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                <span>Kaynak IP: {item.ip} ({item.timestamp})</span>
                <span className="text-emerald-400 font-bold">Eylem: {item.action}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
