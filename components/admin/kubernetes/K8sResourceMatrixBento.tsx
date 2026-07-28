"use client";

import React from "react";
import { motion } from "framer-motion";

export default function K8sResourceMatrixBento({ deployments }: { deployments: any[] }) {
  if (!deployments || deployments.length === 0) return null;

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Active Kubernetes Deployments & Pods Status
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {deployments.map((item, i) => {
          const isCanary = item.status === "CANARY_TESTING";
          const badgeClass = isCanary
            ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";

          return (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs font-mono">{item.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">Namespace: {item.namespace} • Tag: {item.version}</span>
                </div>
                <span className={"px-2 py-0.5 rounded text-[10px] font-bold font-mono " + badgeClass}>
                  {item.status}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
                <span className="text-slate-400">Replicas / Strateji:</span>
                <span className="font-bold text-blue-600 text-xs">{item.replicasAvailable} ({item.strategy})</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
