"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WorkflowAgentsBento() {
  const agents = [
    { title: "Planner Agent (Planlama)", role: "Görev Bölümleme", status: "ÇALIŞIYOR", icon: "🧠", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
    { title: "Execution Agent (İnfaz)", role: "API & Model Tetikleme", status: "ÇALIŞIYOR", icon: "⚡", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { title: "Validator Agent (Doğrulama)", role: "Çıktı & Kalite Kontrolü", status: "ÇALIŞIYOR", icon: "🛡️", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
    { title: "Human Approval Gate", role: "Kritik Onay Kilit Paneli", status: "ONAY BEKLİYOR", icon: "🔑", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🤖 Çoklu Ajan Ağı & Orkestrasyon Katmanı (Multi-Agent Mesh)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {agents.map((a, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{a.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{a.role}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <span className="text-slate-400">Ajan Durumu:</span>
              <span className={`font-bold text-xs ${a.color}`}>{a.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
