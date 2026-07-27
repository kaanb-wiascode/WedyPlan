'use client';

import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { TimelineItem } from '@/types/enterprise-components';

interface TimelineWidgetProps {
  items: TimelineItem[];
}

export const TimelineWidget: React.FC<TimelineWidgetProps> = ({ items }) => {
  return (
    <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/80 dark:border-zinc-800/80 p-6 rounded-[32px] shadow-xs space-y-6">
      <h3 className="font-serif font-bold text-[20px] text-[#1D1D1F] dark:text-white">İş Akışı & Zaman Tüneli</h3>

      <div className="relative pl-6 space-y-6 border-l-2 border-slate-200 dark:border-zinc-800">
        {items.map((item) => {
          const isDone = item.status === 'COMPLETED';
          const isInProgress = item.status === 'IN_PROGRESS';

          return (
            <div key={item.id} className="relative group">
              <span className="absolute -left-[31px] top-0 p-1 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700">
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                {isInProgress && <Clock className="w-4 h-4 text-[#E6007E] animate-spin" />}
                {!isDone && !isInProgress && <AlertCircle className="w-4 h-4 text-slate-400" />}
              </span>

              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#86868B] block">{item.timeSlot}</span>
                <h4 className="font-bold text-[14px] text-[#1D1D1F] dark:text-white">{item.title}</h4>
                {item.description && <p className="text-[12px] text-[#6E6E73] dark:text-zinc-400">{item.description}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};