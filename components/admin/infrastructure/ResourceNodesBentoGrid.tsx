"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ResourceNodesBentoGrid({
  nodes,
  onNodeAction,
}: {
  nodes: any[];
  onNodeAction: (nodeId: string, action: any) => void;
}) {
  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🖥️ Altyapı Kaynak Düğümleri ({nodes.length} Servis)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{node.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{node.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{node.type} • {node.region}</span>
                  </div>
                </div>

                <span
                  className={"px-2 py-0.5 rounded text-[9px] font-bold font-mono " +
                    (node.status === "HEALTHY"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {node.status === "HEALTHY" ? "● ONLINE" : "DEGRADED"}
                </span>
              </div>

              {/* CPU & RAM Metrikleri */}
              <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono pt-1">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">CPU</span>
                  <span className="font-bold text-indigo-600">%{node.cpuUsage}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">RAM</span>
                  <span className="font-bold text-purple-600">{node.ramUsage}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Latency</span>
                  <span className="font-bold text-emerald-600">{node.latencyMs}ms</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[9px] text-slate-400 font-mono">{node.ipAddress}</span>
              {node.type === "REDIS_CACHE" ? (
                <button
                  onClick={() => onNodeAction(node.id, "FLUSH_CACHE")}
                  className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 font-bold hover:bg-purple-100 transition text-[10px]"
                >
                  Flush Cache 🧹
                </button>
              ) : (
                <button
                  onClick={() => onNodeAction(node.id, "RESTART")}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold hover:bg-indigo-100 transition text-[10px]"
                >
                  Restart 🔄
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
