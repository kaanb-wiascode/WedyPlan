"use client";

import React from "react";
import TaskItemRow from "./TaskItemRow";

export default function ChecklistCategoryGroup({
  categoryName,
  tasks,
  onToggleTask,
}: {
  categoryName: string;
  tasks: any[];
  onToggleTask: (id: string, status: boolean) => void;
}) {
  if (tasks.length === 0) return null;

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-3">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          📌 {categoryName}
        </h3>
        <span className="text-xs text-slate-400 font-semibold">{tasks.filter(t => t.isCompleted).length} / {tasks.length} Tamamlandı</span>
      </div>

      <div className="space-y-2">
        {tasks.map((t) => (
          <TaskItemRow key={t.id} task={t} onToggle={onToggleTask} />
        ))}
      </div>
    </div>
  );
}
