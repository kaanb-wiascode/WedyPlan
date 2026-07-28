"use client";

import React from "react";

export default function BIAnalyticsCharts({
  benchmark,
  leadSources,
}: {
  benchmark: any;
  leadSources: any[];
}) {
  return (
    <div className="space-y-6 text-xs">
      {/* Rakip Kiyaslama & Pazar Sıralaması */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            🏆 Bölgesel Pazar Sıralaması & Rakip Benchmark
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            Pazar Lideri Adayı
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Bölgesel Sıralama</span>
            <div className="text-lg font-serif font-bold text-violet-600">{benchmark?.regionalRank}</div>
            <p className="text-[10px] text-slate-400">Bodrum Lüks Düğün Kategorisinde</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Fiyat Konumlandırması</span>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-100">{benchmark?.pricePositioning}</div>
            <p className="text-[10px] text-slate-400">Piyasa Marjı Dengeli</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Yanıt Hızı Kıyaslaması</span>
            <div className="text-lg font-bold text-emerald-600">{benchmark?.responseSpeedComparison}</div>
            <p className="text-[10px] text-slate-400">Müşteri Dönüş Süresi Üstünlüğü</p>
          </div>
        </div>
      </div>

      {/* Müşteri Talep Kaynak Dağılımı */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📍 Müşteri Talep Kaynak Dağılımı (Lead Attribution)
        </span>

        <div className="space-y-3">
          {leadSources?.map((ls: any, i: number) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                <span>{ls.source}</span>
                <span className="font-mono text-violet-600">%{ls.percentage}</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full"
                  style={{ width: ls.percentage + "%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
