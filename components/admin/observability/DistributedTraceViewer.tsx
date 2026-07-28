"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DistributedTraceViewer({ trace }: { trace: any }) {
  if (!trace) return null;

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🔗 Distributed Tracing (Waterfall View)
          </span>
          <span className="text-[11px] text-cyan-600 font-mono font-bold">{trace.traceId}</span>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Total Duration: {trace.durationMs}ms
        </span>
      </div>

      <div className="space-y-2 font-mono text-[11px]">
        <div className="p-3 rounded-xl bg-slate-950 text-cyan-300 border border-slate-800 space-y-1">
          <div className="flex justify-between font-bold text-white">
            <span>● {trace.operationName}</span>
            <span>{trace.durationMs}ms [{trace.service}]</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full w-full" />
          </div>
        </div>

        {trace.children && trace.children.map((child: any, idx: number) => {
          const widthPct = Math.max(10, Math.min(100, (child.durationMs / trace.durationMs) * 100));
          return (
            <motion.div
              key={idx}
              whileHover={{ x: 2 }}
              className="pl-4 border-l-2 border-cyan-500/30 space-y-1 py-1"
            >
              <div className="flex justify-between text-slate-700 dark:text-slate-300 text-[10px]">
                <span>├─ {child.operationName} ({child.service})</span>
                <span className="text-teal-600 font-bold">{child.durationMs}ms</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full" style={{ width: `${widthPct}%` }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
