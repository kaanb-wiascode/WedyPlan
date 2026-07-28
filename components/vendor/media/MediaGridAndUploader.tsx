"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MediaGridAndUploader({
  assets,
  onUploadClick,
}: {
  assets: any[];
  onUploadClick: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🖼️ Portföy Medya Izgarası ({assets.length} Varlık)
        </span>

        <button
          onClick={onUploadClick}
          className="text-xs font-bold text-rose-600 hover:underline"
        >
          + Sürükle & Bırak Yükle
        </button>
      </div>

      {/* Sürükle Bırak Yükleme Bitişi */}
      <div
        onClick={onUploadClick}
        className="p-8 border-2 border-dashed border-rose-200 dark:border-rose-900/40 rounded-3xl bg-rose-50/30 dark:bg-rose-950/10 text-center space-y-2 cursor-pointer hover:border-rose-400 transition"
      >
        <span className="text-2xl block">📸</span>
        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Görsel veya Videoları Buraya Sürükleyin</h4>
        <p className="text-[10px] text-slate-400">PNG, JPG, WEBP veya MP4 (Max 50MB) • Otomatik Filigran ve SEO Uygulanır</p>
      </div>

      {/* Görsel Galerisi Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {assets.map((ast) => (
          <motion.div
            key={ast.id}
            whileHover={{ scale: 1.02 }}
            className="relative h-44 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 group shadow-sm"
          >
            <img src={ast.url} alt={ast.title} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-3 flex flex-col justify-end text-white text-xs">
              <span className="font-bold line-clamp-1">{ast.title}</span>
              <span className="text-[10px] text-slate-300">{ast.category}</span>

              <div className="flex gap-1 pt-2">
                <button onClick={() => alert("Kapak Görseli Yapıldı")} className="px-2 py-1 rounded bg-white text-slate-900 text-[9px] font-bold">
                  Kapak Yap
                </button>
                <button onClick={() => alert("Silindi")} className="px-2 py-1 rounded bg-rose-600 text-white text-[9px] font-bold">
                  Sil
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
