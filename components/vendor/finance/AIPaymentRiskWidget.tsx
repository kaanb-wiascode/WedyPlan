'use client';

import React from 'react';
import GlassCard from '@/components/shared/ui/GlassCard';
import { ShieldAlert, Sparkles, TrendingUp, BellRing } from 'lucide-react';

interface AIPaymentRiskWidgetProps {
  overdueAmount: number;
  currency: string;
}

export function AIPaymentRiskWidget({ overdueAmount, currency }: AIPaymentRiskWidgetProps) {
  return (
    <GlassCard className="p-6 bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-transparent border-amber-200/60 dark:border-amber-900/40 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-600 text-white rounded-lg shadow-xs">
              <ShieldAlert className="w-4 h-4 animate-pulse" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              WedyPlan AI Tahsilat Güvencesi
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Geciken Tahsilat Analizi: {overdueAmount.toLocaleString()} {currency}
          </h3>

          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            Selin & Mert çiftinin kapora ödemesi 5 gün gecikmede. AI tahmin modeline göre bugün nazik bir WhatsApp hatırlatması iletmeniz durumunda tahsilat oranınız <strong>%91</strong> seviyesine çıkacaktır.
          </p>
        </div>

        <div className="shrink-0">
          <div className="p-3 bg-white/70 dark:bg-zinc-900/70 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 text-center space-y-1">
            <span className="text-[10px] text-gray-500 font-semibold block">Tahsilat Başarı Oranı</span>
            <span className="text-xl font-black text-emerald-600">%96.4</span>
          </div>
        </div>

      </div>
    </GlassCard>
  );
}

export default AIPaymentRiskWidget;