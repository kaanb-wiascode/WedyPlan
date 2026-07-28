"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VectorCollectionsBento() {
  const collections = [
    { name: "Sözleşmeler & Hukuk Dokümanları", key: "CONTRACT", vectorCount: "12,400", dimensions: "1536d", icon: "📄" },
    { name: "Tedarikçi Portföy & Hizmet Metinleri", key: "PORTFOLIO", vectorCount: "340,000", dimensions: "1536d", icon: "🖼️" },
    { name: "Bilgi Bankası & Destek Rehberleri", key: "KNOWLEDGE_BASE", vectorCount: "4,200", dimensions: "1536d", icon: "📚" },
    { name: "Blog Yazıları & Düğün Rehberi SEO", key: "BLOG", vectorCount: "1,800", dimensions: "1536d", icon: "📝" },
    { name: "Tedarikçi Profil & Vitrin Açıklamaları", key: "VENDOR_PROFILE", vectorCount: "84,000", dimensions: "1536d", icon: "🏢" },
    { name: "Görsel Medya Etiketleri & Açıklamaları", key: "DOCUMENT", vectorCount: "400,000", dimensions: "1536d", icon: "🎨" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📁 Vektör Koleksiyonları (Vector Collections - {collections.length} Koleksiyon)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {collections.map((col, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{col.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">{col.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">key: {col.key}</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <div>
                <span className="text-slate-400 block">Vektör Sayısı</span>
                <span className="font-bold text-emerald-600 text-xs">{col.vectorCount}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block">Vektör Boyutu</span>
                <span className="font-bold text-indigo-600">{col.dimensions}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-mono">
              <span className="text-emerald-600 font-bold">● HNSW Synced</span>
              <button
                onClick={() => alert("Re-index Koleksiyon: " + col.key)}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold hover:bg-indigo-100 transition"
              >
                Re-Index 🔄
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
