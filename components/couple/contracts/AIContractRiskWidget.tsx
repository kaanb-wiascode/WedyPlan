"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIContractRiskWidget({
  summary,
  risks,
  missingClauses,
  dates,
}: {
  summary: string;
  risks: string[];
  missingClauses: string[];
  dates: { date: string; title: string }[];
}) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-emerald-500/10 via-white/80 to-indigo-500/10 dark:from-emerald-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-emerald-200/50 dark:border-emerald-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          ✦ AI Legal Guard & Plain Language Summary
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Düşük Risk (%12)
        </span>
      </div>

      <div>
        <span className="text-[10px] text-slate-400 uppercase font-semibold">Sade Dille Anlaşılır Özet</span>
        <p className="text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">
          {summary}
        </p>
      </div>

      <div className="space-y-3 pt-2 border-t border-emerald-100 dark:border-emerald-900/40 text-xs">
        {/* Riskler */}
        {risks.length > 0 && (
          <div>
            <span className="text-[10px] text-rose-600 font-bold uppercase block mb-1">⚠️ Tespit Edilen Risk Maddeleri</span>
            {risks.map((r, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/50 text-rose-800 dark:text-rose-300">
                🚨 {r}
              </div>
            ))}
          </div>
        )}

        {/* Eksik Maddeler */}
        {missingClauses.length > 0 && (
          <div>
            <span className="text-[10px] text-amber-600 font-bold uppercase block mb-1">🔍 Eksik Güvence Maddeleri</span>
            {missingClauses.map((m, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/50 text-amber-800 dark:text-amber-300">
                ⚠️ {m}
              </div>
            ))}
          </div>
        )}

        {/* Önemli Tarihler */}
        {dates.length > 0 && (
          <div>
            <span className="text-[10px] text-indigo-600 font-bold uppercase block mb-1">📅 Kritik Yükümlülük Tarihleri</span>
            <div className="space-y-1">
              {dates.map((d, i) => (
                <div key={i} className="flex justify-between p-2 rounded-xl bg-white/60 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300">
                  <span>{d.title}</span>
                  <span className="font-bold text-indigo-600">{d.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
