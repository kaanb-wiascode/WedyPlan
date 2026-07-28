"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DeveloperAppsBento({
  apps,
  onRotateKey,
}: {
  apps: any[];
  onRotateKey: (appId: string) => void;
}) {
  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        💻 Kayıtlı Geliştirici Uygulamaları & API Keyler ({apps.length} Uygulama)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {apps.map((app) => (
          <motion.div
            key={app.id}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{app.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{app.email}</span>
                </div>

                <span
                  className={"px-2 py-0.5 rounded text-[9px] font-bold font-mono " +
                    (app.environment === "PRODUCTION"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {app.environment}
                </span>
              </div>

              {/* API Key Masked UI */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">API Key Prefix:</span>
                  <span className="font-bold text-indigo-600">{app.keyPrefix}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Rate Limit:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{app.rateLimitRpm} RPM</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[9px] text-slate-400 font-mono">Scopes: {app.scopes.join(", ")}</span>
              <button
                onClick={() => onRotateKey(app.id)}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold hover:bg-indigo-100 transition text-[10px]"
              >
                Key Yenile (Rotate) 🔄
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
