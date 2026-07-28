"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DeploymentPipelineBento() {
  const environments = [
    { env: "DEVELOPMENT", version: "v2026.07.13-dev", status: "HEALTHY", traffic: "İç Ekip" },
    { env: "TESTING", version: "v2026.07.13-rc1", status: "HEALTHY", traffic: "QA Otomasyon" },
    { env: "STAGING", version: "v2026.07.12-staging", status: "HEALTHY", traffic: "Pre-Prod Sandbox" },
    { env: "PRODUCTION", version: "v2026.07.12", status: "CANARY_ACTIVE", traffic: "%25 Canary / %75 Green" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🌐 4 Çalışma Ortamı & Canary Trafik Yönlendirme Durumu
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {environments.map((e, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{e.env}</h4>
              <span
                className={"px-2 py-0.5 rounded text-[9px] font-bold font-mono " +
                  (e.env === "PRODUCTION"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300")
                }
              >
                {e.status}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Sürüm:</span>
                <span className="font-bold text-indigo-600">{e.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Trafik Yükü:</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">{e.traffic}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
