'use client';

import React from 'react';
import { Sparkles, AlertTriangle, CloudSun, Wallet } from 'lucide-react';
import { AI_PLANNER_INSIGHTS } from '@/lib/couple-command-constants';

export const AiPlannerCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-white/60 backdrop-blur-3xl border border-white/90 p-8 rounded-[36px] shadow-[0_16px_40px_rgba(0,0,0,0.04)] space-y-6">
      <div className="flex items-center gap-2 text-[#E6007E]">
        <Sparkles className="w-5 h-5 text-[#D4AF37]" />
        <h3 className="font-serif font-bold text-[22px] text-[#1D1D1F]">WedyAI Proaktif Düğün Danışmanı</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AI_PLANNER_INSIGHTS.map((insight) => (
          <div key={insight.id} className="bg-white/80 p-5 rounded-[24px] border border-white space-y-3 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {insight.type === 'WEATHER' && <CloudSun className="w-4 h-4 text-amber-500" />}
                {insight.type === 'SAVING' && <Wallet className="w-4 h-4 text-emerald-600" />}
                {insight.type === 'RISK' && <AlertTriangle className="w-4 h-4 text-[#E6007E]" />}
                <h4 className="font-bold text-[14px] text-[#1D1D1F]">{insight.title}</h4>
              </div>
              <p className="text-[12px] text-[#6E6E73] leading-relaxed">{insight.description}</p>
            </div>

            <button className="w-full text-left text-[11px] font-bold text-[#E6007E] hover:underline pt-2 cursor-pointer">
              → {insight.actionText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};