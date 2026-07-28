"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PromptLibraryBento({
  prompts,
  onSelectPrompt,
}: {
  prompts: any[];
  onSelectPrompt: (prompt: any) => void;
}) {
  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📚 Kayıtlı Prompt Kütüphanesi ({prompts.length} Şablon)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prompts.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{p.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">key: {p.promptKey}</span>
                </div>

                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-mono">
                  {p.category}
                </span>
              </div>

              {/* Aktif Sürüm & Değişkenler */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Canlı Sürüm:</span>
                  <span className="font-bold text-emerald-600">{p.activeVersion} (PUBLISHED)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Değişkenler:</span>
                  <span className="font-bold text-indigo-600">{p.variables.join(", ")}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[9px] font-mono text-purple-600 font-bold">Kalite: %{p.qualityScore}</span>
              <button
                onClick={() => onSelectPrompt(p)}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold hover:bg-indigo-100 transition text-[10px]"
              >
                Sürümleri İncele & Test Et →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
