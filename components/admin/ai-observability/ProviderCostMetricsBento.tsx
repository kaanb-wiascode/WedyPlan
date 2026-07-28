"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProviderCostMetricsBento() {
  const providers = [
    { name: "OpenAI (gpt-4o / mini)", share: "%48", costToday: "$5.98", latency: "16ms", status: "HEALTHY", icon: "🟢" },
    { name: "Anthropic (claude-3-5)", share: "%28", costToday: "$4.20", latency: "22ms", status: "HEALTHY", icon: "🟧" },
    { name: "Google Gemini (1.5-pro)", share: "%18", costToday: "$2.30", latency: "14ms", status: "HEALTHY", icon: "🔵" },
    { name: "Self-Hosted Llama 3", share: "%6", costToday: "$0.00", latency: "8ms", status: "HEALTHY", icon: "🦙" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        💳 Sağlayıcı Bazlı LLM Maliyet & Performans Dağılımı
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {providers.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{p.icon}</span>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{p.name}</h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
                  {p.status}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] grid grid-cols-3 gap-1">
              <div>
                <span className="text-slate-400 block">Trafik Payı</span>
                <span className="font-bold text-indigo-600">{p.share}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Bugün Maliyet</span>
                <span className="font-bold text-emerald-600">{p.costToday}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Latency</span>
                <span className="font-bold text-purple-600">{p.latency}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
