"use client";

import React from "react";

export default function TaskListWidget({ tasks, onToggle }: { tasks: any[]; onToggle: (id: string, status: string) => void }) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📋 Görev ve Son Tarihler ({tasks.length})
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between transition hover:border-slate-200"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.status === "COMPLETED"}
                onChange={() => onToggle(t.id, t.status)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
              <div>
                <h4 className={"text-xs font-bold " + (t.status === "COMPLETED" ? "line-through text-slate-400" : "text-slate-800 dark:text-slate-100")}>
                  {t.title}
                </h4>
                <p className="text-[10px] text-slate-400">{t.dueDate} • {t.vendorName || "Genel"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={"px-2 py-0.5 rounded-full text-[10px] font-bold " +
                (t.priority === "CRITICAL"
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                  : t.priority === "HIGH"
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                  : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300")
              }>
                {t.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
