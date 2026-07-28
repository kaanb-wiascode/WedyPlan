"use client";

import React from "react";

export default function PromptLibraryTable({
  prompts,
  onEditPrompt,
}: {
  prompts: any[];
  onEditPrompt: (prompt: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📜 Prompt Kütüphanesi & Versiyonlama ({prompts.length} Şablon)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Prompt Başlığı / Slug</th>
            <th className="py-3 px-2">Aktif Versiyon</th>
            <th className="py-3 px-2">Hedef Model</th>
            <th className="py-3 px-2">Kalite Skoru</th>
            <th className="py-3 px-2 text-right">Aksiyon</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {prompts.map((pr) => (
            <tr key={pr.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {pr.title}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">/{pr.slug}</span>
              </td>
              <td className="py-3 px-2 font-mono font-bold text-purple-600">
                {pr.activeVersion}
              </td>
              <td className="py-3 px-2 font-mono text-indigo-600 font-semibold text-[10px]">
                {pr.targetModel}
              </td>
              <td className="py-3 px-2 font-bold text-emerald-600 text-sm">
                %{pr.qualityScore}
              </td>
              <td className="py-3 px-2 text-right">
                <button
                  onClick={() => onEditPrompt(pr)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:opacity-90 transition text-[10px]"
                >
                  Versiyonla / Düzenle →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
