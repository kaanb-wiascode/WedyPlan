"use client";

import React from "react";

export default function AIMoodBoardIdeas({ data }: { data: any }) {
  const palette = data?.palette || ["#F8FAFC", "#D97706", "#E11D48"];
  const ideas = data?.ideas || ["Bohem lüks masa düzeni ve fener süslemeleri"];

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 block">
        🎨 AI Mood Board & İlham
      </span>

      <div className="flex gap-2 mb-4">
        {palette.map((color: string, i: number) => (
          <div key={i} className="h-6 flex-1 rounded-lg border border-slate-200" style={{ backgroundColor: color }} />
        ))}
      </div>

      <div className="space-y-2">
        {ideas.map((idea: string, i: number) => (
          <div key={i} className="text-xs text-slate-600 dark:text-slate-300 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/30">
            ✦ {idea}
          </div>
        ))}
      </div>
    </div>
  );
}