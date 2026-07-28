"use client";

import React from "react";

export default function TranslationKeysTable({
  keys,
  onEditKey,
  onAITranslateKey,
}: {
  keys: any[];
  onEditKey: (keyItem: any) => void;
  onAITranslateKey: (keyItem: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📜 8 Dilli Çeviri Anahtarları & Metin Kütüphanesi ({keys.length} Key)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Çeviri Anahtarı (Key)</th>
            <th className="py-3 px-2">Kategori</th>
            <th className="py-3 px-2">Türkçe (TR)</th>
            <th className="py-3 px-2">İngilizce (EN)</th>
            <th className="py-3 px-2">Almanca (DE)</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {keys.map((k) => (
            <tr key={k.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-mono font-bold text-indigo-600 text-[10px]">
                {k.key}
              </td>
              <td className="py-3 px-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-mono">
                  {k.category}
                </span>
              </td>
              <td className="py-3 px-2 text-slate-800 dark:text-slate-100 max-w-[150px] truncate">{k.tr}</td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300 max-w-[150px] truncate">{k.en}</td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300 max-w-[150px] truncate">{k.de || "⚠️ Eksik"}</td>
              <td className="py-3 px-2 text-right space-x-2">
                <button
                  onClick={() => onAITranslateKey(k)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-bold hover:bg-emerald-100 transition text-[10px]"
                >
                  AI Çevir ✨
                </button>
                <button
                  onClick={() => onEditKey(k)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold hover:bg-indigo-100 transition text-[10px]"
                >
                  Düzenle ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
