"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AgentRegistryBento() {
  const agents = [
    { key: "agent.wedding_planner", name: "Düğün Planlama Ajanı", role: "PLANNER", tools: 6, icon: "💍", desc: "Çift bütçesini, takvimini ve konsept isteklerini adımlara böler" },
    { key: "agent.vendor_finder", name: "Tedarikçi Arama & Eşleme", role: "EXECUTOR", tools: 4, icon: "🏢", desc: "Pazar yerinde kriterlere uygun tedarikçileri filtreler" },
    { key: "agent.contract_auditor", name: "Sözleşme Denetim Ajanı", role: "REVIEWER", tools: 3, icon: "📄", desc: "Escrow ve hukuki sözleşme maddelerini RAG ile doğrular" },
    { key: "agent.platform_supervisor", name: "Platform Denetçi Ajanı", role: "SUPERVISOR", tools: 5, icon: "👑", desc: "Tüm ajan çıktılarının kalite skorunu onaylar" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🤖 Tanımlı Uzman Yapay Zeka Ajanları (Agent Registry - {agents.length} Ajan)
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
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{a.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">key: {a.key}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-mono">
                  {a.role}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">{a.desc}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono">
              <span className="text-indigo-600 font-bold">{a.tools} Araç Bağlı</span>
              <span className="text-emerald-600 font-bold">✓ Ready</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
