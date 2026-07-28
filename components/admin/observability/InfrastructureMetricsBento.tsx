"use client";

import React from "react";
import { motion } from "framer-motion";

export default function InfrastructureMetricsBento() {
  const pillars = [
    { name: "PostgreSQL Database Pool", status: "%32.1 Kullanım", detail: "84 Bağlantı Aktif", icon: "🐘", color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40" },
    { name: "Redis Cache & Queues", status: "%98.6 Hit Rate", detail: "0.4ms Read Latency", icon: "⚡", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { name: "AI Providers Telemetry", status: "142ms Avg Speed", detail: "OpenAI/Claude/Gemini", icon: "🤖", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
    { name: "Payments & Webhooks", status: "100% Delivery", detail: "Iyzico & Stripe Sync", icon: "💳", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Altyapı & Mikro Servis Metrik Katmanı (Infrastructure Metrics Matrix)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pillars.map((item, i) => (
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
                    <span className="text-[10px] text-slate-400 font-mono">{item.detail}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <span className="text-slate-400">Telemetri Durumu:</span>
              <span className="font-bold text-cyan-600 text-xs">{item.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
