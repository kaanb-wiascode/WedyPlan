'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Wallet, CheckCircle2, AlertTriangle, Download, ShieldCheck } from 'lucide-react';
import { Contract } from '@/types/vendor-contracts';
import { CONTRACT_STATUS_MAP } from '@/lib/vendor-contracts-constants';

interface ContractCardProps {
  contract: Contract;
}

export const ContractCard: React.FC<ContractCardProps> = ({ contract }) => {
  const statusInfo = CONTRACT_STATUS_MAP[contract.status as keyof typeof CONTRACT_STATUS_MAP] || CONTRACT_STATUS_MAP.DRAFT;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white/60 backdrop-blur-3xl border border-white/90 p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#86868B] font-bold">{contract.contractNumber}</span>
            <h3 className="font-bold text-[16px] text-[#1D1D1F] leading-tight">{contract.coupleNames}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>
      </div>

      {contract.aiNotes && (
        <div className={`p-3 rounded-2xl border text-[11px] flex items-start gap-2 ${
          contract.aiRiskCheckStatus === 'PASSED' 
            ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800' 
            : 'bg-amber-50/50 border-amber-200 text-amber-800'
        }`}>
          {contract.aiRiskCheckStatus === 'PASSED' ? (
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          )}
          <div>
            <strong className="font-bold">WedyAI Hukuki Asistan: </strong>
            {contract.aiNotes}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[12px] text-[#6E6E73]">
        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Düğün: {contract.weddingDate}</div>
        <div className="flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5 text-[#D4AF37]" /> Toplam: {contract.totalAmount.toLocaleString('tr-TR')} ₺</div>
        <div className="flex items-center gap-1.5 font-medium text-[#1D1D1F]"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Kapora: {contract.depositAmount.toLocaleString('tr-TR')} ₺</div>
      </div>

      {contract.signedAt && (
        <div className="text-[10px] text-[#86868B] font-mono border-t border-black/5 pt-2 flex justify-between items-center">
          <span>İmza Tarihi: {contract.signedAt}</span>
          <button className="text-[11px] font-bold text-[#1D1D1F] hover:text-[#D4AF37] flex items-center gap-1 cursor-pointer">
            <Download className="w-3.5 h-3.5" /> PDF Sözleşmeyi İndir
          </button>
        </div>
      )}
    </motion.div>
  );
};