"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ComponentLibraryBento({ components, docs }: { components: any[]; docs: any[] }) {
  return (
    <div className="space-y-6 text-xs">
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🎨 Design System Component Library & Storybook Tokens
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {components.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs font-mono">{item.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">Paket: {item.package}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {item.status}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
                <span className="text-slate-400">Tokens / Storybook:</span>
                <a href={item.storybookUrl} target="_blank" rel="noreferrer" className="font-bold text-violet-600 text-xs hover:underline">
                  {item.tokensStatus} ↗
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📖 Öne Çıkan Mühendislik Wiki Dokümanları
        </span>

        <div className="grid grid-cols-1 gap-2">
          {docs.map((doc, i) => (
            <div key={i} className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm flex justify-between items-center font-mono">
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">{doc.title}</span>
                <span className="text-[10px] text-slate-400">Kategori: {doc.category} • Yazar: {doc.author}</span>
              </div>
              <span className="text-[10px] text-violet-600 font-bold">{doc.updatedAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
