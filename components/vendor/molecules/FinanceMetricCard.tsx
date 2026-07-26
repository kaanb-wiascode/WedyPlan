'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface FinanceMetricCardProps {
  title: string;
  amount: number;
  subText: string;
  icon: React.ReactNode;
  trend?: string;
  variant?: 'normal' | 'gold' | 'emerald' | 'rose';
}

export const FinanceMetricCard: React.FC<FinanceMetricCardProps> = ({
  title,
  amount,
  subText,
  icon,
  trend,
  variant = 'normal',
}) => {
  const borderStyles = {
    normal: 'border-white/80 bg-white/50',
    gold: 'border-[#D4AF37]/40 bg-[#D4AF37]/10',
    emerald: 'border-emerald-200 bg-emerald-500/10',
    rose: 'border-rose-200 bg-rose-500/10',
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`p-5 rounded-[24px] border backdrop-blur-2xl shadow-sm transition-all space-y-3 ${borderStyles[variant]}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold text-[#6E6E73]">{title}</span>
        <div className="p-2 rounded-xl bg-white/80 text-[#1D1D1F] shadow-sm">{icon}</div>
      </div>

      <div>
        <div className="text-[24px] font-serif font-bold text-[#1D1D1F] tracking-tight">
          {amount.toLocaleString('tr-TR')} ₺
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-[#86868B]">{subText}</span>
          {trend && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              {trend}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};