"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TimelineMilestoneView({ milestones }: { milestones: any[] }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
        🏁 Ana Milatlar & Fazlar
      </span>

      <div className="relative border-l-2 border-amber-500/30 ml-3 space-y-6 pl-6 py-2">
        {milestones.map((m, i) => (
          <div key={i} className="relative">
            <span className={"absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 " + (m.completed ? "bg-emerald-500" : "bg-amber-500")} />
            <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">{m.phase}</span>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{m.title}</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">{m.date} • {m.taskCount} Alt Görev</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
