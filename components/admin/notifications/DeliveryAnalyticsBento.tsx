"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DeliveryAnalyticsBento({ channelHealth }: { channelHealth: any }) {
  const channels = [
    { name: "WhatsApp Cloud API", icon: "💬", status: "ONLINE", latency: "35ms", rate: "%99.8 İletim" },
    { name: "Resend E-Mail CDN", icon: "📧", status: "ONLINE", latency: "42ms", rate: "%98.9 İletim" },
    { name: "Netgsm / Twilio SMS", icon: "📱", status: "ONLINE", latency: "28ms", rate: "%99.2 İletim" },
    { name: "Firebase Web/Mobile Push", icon: "🔔", status: "ONLINE", latency: "18ms", rate: "%97.5 İletim" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Kanal Bazlı Canlı İletim & Sağlık Durumları
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {channels.map((ch, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-2xl">{ch.icon}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100">{ch.name}</h4>
              <span className="text-[10px] text-slate-400 font-mono">{ch.latency} Latency</span>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="font-mono font-bold text-emerald-600 text-[10px]">{ch.rate}</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                {ch.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
