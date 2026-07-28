"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PreferenceSignalsBento() {
  const channels = [
    { title: "Marketplace Feed Önerileri", weight: "0.95 Affinity", desc: "Favorilenen mekan ve bütçe uyumu", icon: "🛍️", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40" },
    { title: "Dinamik E-Posta Kampanyaları", weight: "0.88 Affinity", desc: "Düğün gününe kalan zamana özel teklifler", icon: "📧", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { title: "Copilot Chat Yanıt Akışı", weight: "0.92 Affinity", desc: "Konsept stil kelimeleriyle kişiselleştirme", icon: "💬", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
    { title: "Push Bildirim Zamanlaması", weight: "0.85 Affinity", desc: "Tam zamanında kritik görev hatırlatması", icon: "🔔", color: "text-teal-600 bg-teal-50 dark:bg-teal-950/40" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🎯 Çok Kanallı Yayın Katmanları (Omnichannel Delivery Channels)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {channels.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{c.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{c.desc}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <span className="text-slate-400">Kanal Ağırlığı:</span>
              <span className="font-bold text-rose-600 text-xs">{c.weight}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
