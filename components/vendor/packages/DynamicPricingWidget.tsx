'use client';

import React from 'react';
import GlassCard from '@/components/shared/ui/GlassCard';
import { TrendingUp, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function DynamicPricingWidget() {
  return (
    <GlassCard className="p-6 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-200/60 dark:border-emerald-900/40 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-600 text-white rounded-lg shadow-xs">
              <TrendingUp className="w-4 h-4 animate-bounce" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              WedyPlan Piyasa Radarı
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Bölgenizdeki Düğün Talepleri %35 Arttı!
          </h3>

          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            Bulunduğunuz lokasyondaki rakip mekanların <strong>Yemekli Paket</strong> fiyat ortalaması son 30 günde <strong>265.000 TL</strong> bandına yükseldi. Yapay zekâ, paket fiyatlarınızı güncelleyerek kar marjınızı %12 artırabileceğinizi öngörüyor.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/60 dark:bg-zinc-900/60 p-3 rounded-2xl border border-slate-100 dark:border-zinc-800">
          <div className="text-center px-4 border-r border-slate-200 dark:border-zinc-700">
            <span className="text-[10px] text-gray-500 block font-semibold">Piyasa Ortalaması</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">265K ₺</span>
          </div>
          <div className="text-center px-4">
            <span className="text-[10px] text-emerald-600 block font-bold flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" /> Potansiyel Artış
            </span>
            <span className="text-lg font-bold text-emerald-600">+%12</span>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}