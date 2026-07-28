"use client";

import React from "react";

export default function MediaVaultWidget({ mediaAssets }: { mediaAssets: any[] }) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🖼️ Kurumsal Medya Kütüphanesi & CDN Kasası ({mediaAssets.length} Varlık)
        </span>
        <button
          onClick={() => alert("📁 Yeni Görsel Yükleyici Açılıyor...")}
          className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-[10px]"
        >
          + Medya Yükle
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {mediaAssets.map((asset) => (
          <div key={asset.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-2">
            <div className="h-20 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-2xl overflow-hidden">
              🖼️
            </div>
            <div className="truncate">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 truncate">{asset.fileName}</h4>
              <span className="text-[9px] text-slate-400 font-mono block">{asset.sizeKb} KB • WebP Auto</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
