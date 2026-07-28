"use client";

import React from "react";
import { publishPromptVersionAction } from "@/lib/actions/ai-prompt-registry";

export default function PromptVersionHistoryTable({
  versions,
}: {
  versions: any[];
}) {
  const handlePublish = async (promptKey: string, versionTag: string) => {
    const res = await publishPromptVersionAction({
      promptKey,
      versionTag,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📜 Sürüm Geçmişi & Canlıya Alma Masası ({versions.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Prompt Key / Versiyon</th>
            <th className="py-3 px-2">Yazar</th>
            <th className="py-3 px-2">Zaman</th>
            <th className="py-3 px-2">Kalite Skoru</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {versions.map((v) => (
            <tr key={v.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {v.promptKey}
                <span className="block text-[10px] text-indigo-600 font-mono">{v.versionTag}</span>
              </td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300 font-medium">{v.author}</td>
              <td className="py-3 px-2 text-slate-500 font-mono">{v.timestamp}</td>
              <td className="py-3 px-2 font-mono font-bold text-emerald-600">%{v.qualityScore}</td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (v.status === "PUBLISHED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300")
                  }
                >
                  {v.status === "PUBLISHED" ? "● Canlıda" : "Draft / Onay Bekliyor"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                {v.status !== "PUBLISHED" && (
                  <button
                    onClick={() => handlePublish(v.promptKey, v.versionTag)}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition text-[10px]"
                  >
                    Canlıya Al (Publish) 🚀
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
