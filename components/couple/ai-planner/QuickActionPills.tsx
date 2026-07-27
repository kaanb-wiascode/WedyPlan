"use client";

import React from "react";

export default function QuickActionPills({ onSelect }: { onSelect: (prompt: string) => void }) {
  const actions = [
    { label: "⚡ Risk Tespiti Yap", prompt: "Düğün planımdaki bütçe ve zamanlama risklerini tespit et." },
    { label: "📅 Düğün Günü Timeline Üret", prompt: "Düğün günü için detaylı bir saatlik zaman çizelgesi hazırla." },
    { label: "🎨 Mood Board & Tema Fikirleri", prompt: "Düğün temam için renk paleti ve dekorasyon fikirleri ver." },
    { label: "💡 Bütçe Optimizasyonu", prompt: "Bütçemi %10 oranında düşürmek için öneriler sun." },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {actions.map((act, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(act.prompt)}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition whitespace-nowrap border border-slate-200/50 dark:border-slate-700/50"
        >
          {act.label}
        </button>
      ))}
    </div>
  );
}
