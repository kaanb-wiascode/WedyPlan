"use client";

import React from "react";

export default function AIWeeklyPlanWidget({
  weeklyPlan,
  onToggleTask,
}: {
  weeklyPlan: any[];
  onToggleTask: (id: string) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📅 AI Akıllı Koçluk: Kişiselleştirilmiş Haftalık Odak Planı
        </span>
        <span className="text-xs text-rose-600 font-bold">3 Hedef</span>
      </div>

      <div className="space-y-3">
        {weeklyPlan.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between transition hover:border-slate-300"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggleTask(item.id)}
                className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
              />
              <span className={"text-xs font-bold " + (item.completed ? "line-through text-slate-400" : "text-slate-800 dark:text-slate-100")}>
                {item.title}
              </span>
            </div>
            <span className={"px-2 py-0.5 rounded-full text-[10px] font-bold " + (item.completed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
              {item.completed ? "Tamamlandı" : "Odaklan"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
