'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { FinancialTransaction } from '@/types/vendor-finance';

interface TransactionRowProps {
  transaction: FinancialTransaction;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  const isIncome = transaction.type === 'INCOME';

  const statusBadges = {
    COMPLETED: { label: 'Tahsil Edildi / Ödendi', icon: CheckCircle2, style: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    PENDING: { label: 'Ödeme Vadesi Bekliyor', icon: Clock, style: 'bg-amber-50 text-amber-700 border-amber-200' },
    OVERDUE: { label: 'Gecikmiş Tahsilat', icon: AlertCircle, style: 'bg-rose-50 text-rose-700 border-rose-200' },
  };

  const statusInfo = statusBadges[transaction.status as keyof typeof statusBadges] || statusBadges.PENDING;
  const StatusIcon = statusInfo.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      className="bg-white/60 backdrop-blur-2xl border border-white/90 p-4 rounded-[20px] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${isIncome ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
          {isIncome ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-[14px] text-[#1D1D1F]">{transaction.title}</h4>
            <span className="text-[9px] font-mono font-bold bg-black/5 px-2 py-0.5 rounded text-[#6E6E73]">
              {transaction.category}
            </span>
          </div>
          <p className="text-[11px] text-[#86868B]">{transaction.relatedName} • Vade: {transaction.dueDate}</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-black/5 pt-2 sm:pt-0">
        <div className={`text-[11px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${statusInfo.style}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{statusInfo.label}</span>
        </div>

        <div className="text-right">
          <div className={`font-serif font-bold text-[16px] ${isIncome ? 'text-emerald-700' : 'text-rose-600'}`}>
            {isIncome ? '+' : '-'}{transaction.amount.toLocaleString('tr-TR')} ₺
          </div>
          {transaction.invoiceNumber && (
            <span className="text-[10px] font-mono text-[#86868B] flex items-center justify-end gap-0.5">
              <FileText className="w-3 h-3" /> {transaction.invoiceNumber}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};