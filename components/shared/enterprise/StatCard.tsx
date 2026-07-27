'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { StatCardData } from '@/types/enterprise-components';
import { Icon } from '@/components/shared/ui/Icon';
import { MiniChart } from './MiniChart';

interface StatCardProps {
  data: StatCardData;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ data, className = '' }) => {
  const isPositive = data.trend === 'up';
  const isNegative = data.trend === 'down';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/80 dark:border-zinc-800/80 p-6 rounded-[32px] shadow-xs flex flex-col justify-between space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#86868B] dark:text-zinc-400 uppercase tracking-wider">
          {data.title}
        </span>
        {data.iconName && (
          <div className="p-2.5 rounded-2xl bg-black/5 dark:bg-white/10 text-[#1D1D1F] dark:text-white">
            <Icon name={data.iconName as any} size={18} />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="font-serif font-bold text-[32px] text-[#1D1D1F] dark:text-white leading-none">
          {data.value}
        </div>

        {data.changePercent !== undefined && (
          <div
            className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
              isPositive
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                : isNegative
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-700'
            }`}
          >
            {isPositive && <TrendingUp className="w-3 h-3" />}
            {isNegative && <TrendingDown className="w-3 h-3" />}
            {!isPositive && !isNegative && <Minus className="w-3 h-3" />}
            <span>%{Math.abs(data.changePercent)}</span>
          </div>
        )}
      </div>

      {data.sparklineData && data.sparklineData.length > 0 && (
        <div className="pt-2">
          <MiniChart data={data.sparklineData} type="area" height={36} color={isNegative ? '#EF4444' : '#E6007E'} />
        </div>
      )}

      {data.changePeriod && (
        <span className="text-[10px] text-[#86868B] dark:text-zinc-500 font-medium block">
          {data.changePeriod}
        </span>
      )}
    </motion.div>
  );
};