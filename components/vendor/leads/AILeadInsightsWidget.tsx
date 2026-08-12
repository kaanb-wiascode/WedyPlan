'use client';

import React from 'react';
import GlassCard from '@/components/shared/ui/GlassCard';
import { Sparkles, Radio, Activity, Zap } from 'lucide-react';
import { LeadFormValues } from '@/lib/validations/vendor-leads';

interface AILeadInsightsWidgetProps {
  totalLeads: number;
  onlineCount: number;
  hotLeadsCount: number;
  selectedLead?: LeadFormValues | null;
}

export function AILeadInsightsWidget({
  totalLeads = 12,
  onlineCount = 2,
  hotLeadsCount = 5,
  selectedLead,
}: AILeadInsightsWidgetProps) {
  return (
    <GlassCard className="p-6 bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-purple-500/10 border-rose-200/80 dark:border-rose-900/40 relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 bg-rose-500 text-white rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-xs">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              CANLI ETKİLEŞİM SİNYALİ
            </div>
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" />
              {onlineCount} Çift Şu An Sayfanızda Aktif
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {selectedLead
              ? `${selectedLead.coupleName} çifti sayfanızı inceliyor!`
              : "Yüksek Dönüşüm Potansiyelli Yeni Talepleriniz Var!"}
          </h3>

          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {selectedLead?.aiSummary ||
              "WedyPlan AI, çiftlerin bütçe ve düğün tarihi uyumunu anlık hesaplar. Çevrimiçi çiftlere ilk 15 dakika içinde verilen tekliflerde anlaşma ihtimali %30 daha yüksektir."}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full lg:w-auto shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-200/60 dark:border-zinc-800">
          <div className="p-3.5 bg-white/70 dark:bg-zinc-800/70 rounded-2xl text-center border border-slate-200/60 dark:border-zinc-700/60">
            <span className="text-[10px] font-medium text-gray-500 block">Toplam Talep</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">{totalLeads}</span>
          </div>

          <div className="p-3.5 bg-white/70 dark:bg-zinc-800/70 rounded-2xl text-center border border-rose-200/60 dark:border-rose-900/40">
            <span className="text-[10px] font-bold text-rose-600 flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Online
            </span>
            <span className="text-lg font-bold text-emerald-600">{onlineCount} Çift</span>
          </div>

          <div className="p-3.5 bg-white/70 dark:bg-zinc-800/70 rounded-2xl text-center border border-amber-200/60 dark:border-amber-900/40">
            <span className="text-[10px] font-bold text-amber-600 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3" /> Sıcak Fırsat
            </span>
            <span className="text-lg font-bold text-amber-600">{hotLeadsCount}</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default AILeadInsightsWidget;