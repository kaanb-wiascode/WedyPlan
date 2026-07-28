"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MultimodalCapabilitiesBento() {
  const capabilities = [
    { title: "Görsel Anlama & Stil Tespiti", desc: "Renk Paleti & Obje Ayrıştırma", accuracy: "%96 Uyum", icon: "🖼️", color: "text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-950/40" },
    { title: "Sözleşme & PDF OCR Extraction", desc: "Hukuki Kloz & Kapora Taraması", accuracy: "%99.1 Doğruluk", icon: "📄", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { title: "Görsel Arama (Visual Search)", desc: "Moodboard Resminden Mekan Bulma", accuracy: "145ms Speed", icon: "🔍", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
    { title: "Portfolyo Otomatik Etiketleme", desc: "Fotoğrafçı & Dekoratör Etiketleri", accuracy: "AUTO TAGGING", icon: "🏷️", color: "text-pink-600 bg-pink-50 dark:bg-pink-950/40" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🔮 Multimodal Yetenek Matrisi (Multimodal Capabilities Matrix)
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
              <span className="font-bold text-fuchsia-600 text-xs">{item.accuracy}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
