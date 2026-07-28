"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VoiceCapabilitiesBento() {
  const capabilities = [
    { title: "Speech-to-Text (STT)", desc: "Türkçe & İngilizce Desteği", status: "%97.9 Doğruluk", icon: "🎙️", color: "text-violet-600 bg-violet-50 dark:bg-violet-950/40" },
    { title: "Text-to-Speech (TTS)", desc: "Doğal İnsan Sesi Sentezi", status: "120ms Latency", icon: "🔊", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { title: "Duygu & Ton Tespiti", desc: "Stres / Heyecan Analizi", status: "%94 Güven", icon: "🧠", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
    { title: "Otonom Toplantı Notları", desc: "Kararlar & Aksiyon Listesi", status: "AUTO TRANSCRIPT", icon: "📝", color: "text-teal-600 bg-teal-50 dark:bg-teal-950/40" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🎙️ Ses Mimarisi & Yetenek Matrisi (Voice Matrix)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {capabilities.map((item, i) => (
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
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{item.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{item.desc}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <span className="text-slate-400">Performans:</span>
              <span className="font-bold text-violet-600 text-xs">{item.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
