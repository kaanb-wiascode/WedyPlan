"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AISettingsWidget({
  aiTone,
  setAiTone,
  autoReply,
  setAutoReply,
}: {
  aiTone: string;
  setAiTone: (tone: string) => void;
  autoReply: boolean;
  setAutoReply: (val: boolean) => void;
}) {
  const tones = [
    { id: "LUXURY_FORMAL", label: "👑 Lüks & Kurumsal Formal", desc: "Saygın, resmi ve yüksek prestijli marka dili." },
    { id: "WARM_FRIENDLY", label: "✨ Sıcak & Samimi", desc: "İçten, heyecan paylaşan ve samimi düğün dili." },
    { id: "DIRECT_EXECUTIVE", label: "🎯 Doğrudan & Sonuç Odaklı", desc: "Kısa, net ve detaylara hızlı giren iş dili." },
  ];

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-white/80 to-indigo-500/10 dark:from-purple-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-purple-200/50 dark:border-purple-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
          ✦ AI Brand Voice & Communication Tuning
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          Yapay Zeka Mimarisi
        </span>
      </div>

      <div className="space-y-3">
        <label className="font-semibold block text-slate-800 dark:text-slate-100">
          Yapay Zeka Copilot'unuz Çiftlerle Konuşurken Hangi Tonu Kullansın?
        </label>

        <div className="space-y-2">
          {tones.map((t) => (
            <div
              key={t.id}
              onClick={() => setAiTone(t.id)}
              className={"p-3.5 rounded-2xl border cursor-pointer transition flex justify-between items-center " +
                (aiTone === t.id
                  ? "bg-white dark:bg-slate-800 border-purple-500 shadow-sm"
                  : "bg-white/40 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800")
              }
            >
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100">{t.label}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{t.desc}</p>
              </div>
              <span className={"w-4 h-4 rounded-full border-2 flex items-center justify-center " + (aiTone === t.id ? "border-purple-600 bg-purple-600" : "border-slate-300")}>
                {aiTone === t.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Otomatik Yanıt Kuralı Toggle */}
      <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/40 flex justify-between items-center pt-3">
        <div>
          <h4 className="font-bold text-slate-800 dark:text-slate-100">Otonom İlk WhatsApp/E-posta Yanıtı</h4>
          <p className="text-[10px] text-slate-400">Yeni talep geldiğinde AI 5 dakika içinde bu tonla taslak üretsin.</p>
        </div>
        <input
          type="checkbox"
          checked={autoReply}
          onChange={(e) => setAutoReply(e.target.checked)}
          className="w-5 h-5 rounded text-purple-600 border-slate-300 focus:ring-purple-500"
        />
      </div>
    </motion.div>
  );
}
