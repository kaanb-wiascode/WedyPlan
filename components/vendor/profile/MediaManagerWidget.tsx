"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MediaManagerWidget({
  photos,
  onUploadNew,
}: {
  photos: any[];
  onUploadNew: () => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🖼️ Portföy & Görsel Galerisi ({photos.length} Fotoğraf)
        </span>
        <button
          onClick={onUploadNew}
          className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition"
        >
          + Görsel Yükle
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="relative h-32 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 group"
          >
            <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button onClick={() => alert("Kapak Görseli Yapıldı")} className="p-1.5 rounded-lg bg-white text-slate-900 text-[10px] font-bold">Kapak Yap</button>
              <button onClick={() => alert("Silindi")} className="p-1.5 rounded-lg bg-rose-600 text-white text-[10px] font-bold">Sil</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
