'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Calendar, ShieldCheck, Sun, Clock, Globe } from 'lucide-react';
import { PortalMode } from '@/types/couple-command';

interface CoupleCommandHeaderProps {
  mode: PortalMode;
  onModeChange: (newMode: PortalMode) => void;
  onOpenWebsiteModal: () => void;
}

export const CoupleCommandHeader: React.FC<CoupleCommandHeaderProps> = ({ mode, onModeChange, onOpenWebsiteModal }) => {
  return (
    <div className="bg-white/40 backdrop-blur-3xl border border-white/80 p-6 sm:p-8 rounded-[36px] shadow-[0_16px_40px_rgba(0,0,0,0.04)] space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E6007E]/10 text-[#E6007E] border border-pink-200/80 rounded-full text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> WedyPlan Command Center
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> %100 Kontrol Altında
            </span>
          </div>

          <h1 className="font-serif font-semibold text-[32px] sm:text-[42px] text-[#1D1D1F] leading-tight">
            Selin & Kaan Düğün Yönetimi
          </h1>
          <p className="text-[13px] text-[#6E6E73] font-light">
            15 Ağustos 2026 Cumartesi • Luxe Kır Bahçesi & Balo Salonu
          </p>
        </div>

        {/* Live Countdown & Mode Switchers */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="bg-white/80 p-4 rounded-[24px] border border-white shadow-xs text-center">
            <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider block">Büyük Güne Kalan</span>
            <span className="font-serif font-bold text-[24px] text-[#E6007E]">20 Gün</span>
          </div>

          <button
            onClick={onOpenWebsiteModal}
            className="p-3.5 bg-white/80 hover:bg-white text-[#1D1D1F] border border-white rounded-[24px] text-[12px] font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#E6007E]" />
            <span>Düğün Sitem</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-black/5 rounded-2xl text-[12px] font-bold">
        <button
          onClick={() => onModeChange('COMMAND_CENTER')}
          className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
            mode === 'COMMAND_CENTER' ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#E6007E]" /> Düğün Hazırlık Merkezi
        </button>

        <button
          onClick={() => onModeChange('WEDDING_DAY_MODE')}
          className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
            mode === 'WEDDING_DAY_MODE' ? 'bg-[#1D1D1F] text-white shadow-md' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
          }`}
        >
          <Clock className="w-4 h-4 text-[#D4AF37]" /> Düğün Günü Canlı Akış
        </button>

        <button
          onClick={() => onModeChange('AFTER_WEDDING')}
          className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
            mode === 'AFTER_WEDDING' ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
          }`}
        >
          <Sun className="w-4 h-4 text-purple-600" /> Balayı & Anılar
        </button>
      </div>
    </div>
  );
};