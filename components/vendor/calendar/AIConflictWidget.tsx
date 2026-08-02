'use client';

import React from 'react';
import GlassCard from '@/components/shared/ui/GlassCard';
import { Sparkles, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

export default function AIConflictWidget() {
  return (
    <GlassCard className="p-5 bg-gradient-to-r from-purple-500/10 via-rose-500/5 to-transparent border-purple-200/60 dark:border-purple-900/40 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
        
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-600 text-white rounded-lg shadow-xs">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
              WedyPlan AI Akıllı Takvim Asistanı
            </span>
          </div>

          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Eylül 2026 Doluluk Oranı: %85 (Yüksek Talep Dönemi)
          </h3>

          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            15 Eylül’deki <strong>Zeynep & Can</strong> düğünü ile aynı gün Teras altyapı bakım saati çakışıyor. AI, bakım saatini 2 saat öne çekmenizi öneriyor.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Takvim Optimize Edildi
          </div>
        </div>

      </div>
    </GlassCard>
  );
}