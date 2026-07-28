"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CentralAgentMeshBento() {
  const coreEngines = [
    { name: "Budget & Financial Intelligence", load: "%12 Load", status: "SYNCHRONIZED", icon: "💰", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
    { name: "Timeline & Delay Prediction", load: "%18 Load", status: "SYNCHRONIZED", icon: "📅", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { name: "Dynamic Pricing & Revenue Yield", load: "%22 Load", status: "SYNCHRONIZED", icon: "📈", color: "text-teal-600 bg-teal-50 dark:bg-teal-950/40" },
    { name: "Fraud & Anomaly Shield", load: "%8 Load", status: "PROTECTED", icon: "🛡️", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🌐 Küresel Ajan & Servis Mesh Katmanı (Global AI Mesh)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {coreEngines.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{item.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Kaynak Yükü: {item.load}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <span className="text-slate-400">Beyin Bağlantısı:</span>
              <span className="font-bold text-emerald-600 text-xs">{item.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
