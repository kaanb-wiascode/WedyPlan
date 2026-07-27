"use client";

import React from "react";

export default function TaskItemRow({ task, onToggle }: { task: any; onToggle: (id: string, status: boolean) => void }) {
  return (
    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between transition hover:border-slate-200">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggle(task.id, task.isCompleted)}
          className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
        />
        <div>
          <h4 className={"text-xs font-bold " + (task.isCompleted ? "line-through text-slate-400" : "text-slate-800 dark:text-slate-100")}>
            {task.title}
          </h4>
          <p className="text-[10px] text-slate-400">{task.dueDate} • Atanan: <span className="font-semibold text-slate-600 dark:text-slate-300">{task.assignedTo}</span></p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={"px-2 py-0.5 rounded-full text-[10px] font-bold " +
          (task.priority === "CRITICAL"
            ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
            : task.priority === "HIGH"
            ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300")
        }>
          {task.priority}
        </span>
      </div>
    </div>
  );
}
