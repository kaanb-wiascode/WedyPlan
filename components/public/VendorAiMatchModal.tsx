'use client';

import React from 'react';
import { Sparkles, Check, X } from 'lucide-react';
import { AiMatchScoreData } from '@/types/vendor-detail';

interface VendorAiMatchModalProps {
  matchData: AiMatchScoreData;
  onClose: () => void;
}

export const VendorAiMatchModal: React.FC<VendorAiMatchModalProps> = ({ matchData, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-3xl border border-white rounded-[32px] max-w-lg w-full p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-500/10 text-[#E6007E] border border-pink-200 rounded-full text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Kişiselleştirilmiş Uyum Skoru
          </div>
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-[48px] text-[#1D1D1F]">%{matchData.score}</span>
            <span className="text-[13px] text-[#6E6E73] font-light leading-snug">{matchData.summary}</span>
          </div>
        </div>

        <div className="space-y-3 border-t border-black/5 pt-4">
          <h4 className="font-bold text-[13px] text-[#1D1D1F] uppercase tracking-wider">Uyum Kriterleri Analizi</h4>
          {matchData.criterias.map((crit, idx) => (
            <div key={idx} className="p-3.5 bg-white/80 rounded-[20px] border border-white flex items-start gap-3">
              <div className="p-1.5 bg-emerald-500/10 text-emerald-600 rounded-xl shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-[13px] font-bold text-[#1D1D1F] block">{crit.label}</strong>
                <p className="text-[11px] text-[#6E6E73]">{crit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#1D1D1F] text-white font-bold text-[12px] py-3.5 rounded-full hover:bg-black transition cursor-pointer"
        >
          Anladım
        </button>
      </div>
    </div>
  );
};