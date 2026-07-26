'use client';

import React from 'react';
import { Clock, CheckCircle2, MapPin, Phone, AlertCircle, Sparkles } from 'lucide-react';
import { WEDDING_DAY_STEPS } from '@/lib/couple-command-constants';

export const WeddingDayModeWidget: React.FC = () => {
  return (
    <div className="bg-[#1D1D1F] text-white p-8 rounded-[36px] shadow-2xl space-y-8 border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">Düğün Günü Canlı Operasyon</span>
          <h2 className="font-serif font-bold text-[32px]">15 Ağustos 2026 — Zaman Akışı</h2>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-full text-[12px] font-bold w-fit">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Canlı Zaman Sayacı Aktif</span>
        </div>
      </div>

      {/* Step List */}
      <div className="space-y-4">
        {WEDDING_DAY_STEPS.map((step) => (
          <div
            key={step.id}
            className={`p-6 rounded-[28px] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              step.status === 'ACTIVE'
                ? 'bg-gradient-to-r from-[#E6007E]/20 to-purple-900/30 border-[#E6007E] shadow-lg'
                : step.status === 'COMPLETED'
                ? 'bg-slate-900/60 border-slate-800 opacity-60'
                : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="font-mono font-bold text-[20px] text-[#D4AF37] bg-black/40 px-3.5 py-1.5 rounded-xl border border-slate-800">
                {step.time}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[18px] text-white">{step.title}</h4>
                  {step.status === 'ACTIVE' && (
                    <span className="text-[10px] font-bold bg-[#E6007E] text-white px-2.5 py-0.5 rounded-full animate-pulse">
                      ⚡ Şu An Yapılıyor
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[12px] text-slate-400">
                  <span>Sorumlu: <strong className="text-slate-200">{step.responsiblePerson}</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#E6007E]" /> {step.location}</span>
                </div>
                {step.note && <p className="text-[11px] text-[#D4AF37] italic pt-1">💡 Not: {step.note}</p>}
              </div>
            </div>

            <span className={`text-[11px] font-bold px-4 py-1.5 rounded-full border w-fit ${
              step.status === 'COMPLETED'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : step.status === 'ACTIVE'
                ? 'bg-pink-500/20 text-[#E6007E] border-pink-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}>
              {step.status === 'COMPLETED' ? '✓ Tamamlandı' : step.status === 'ACTIVE' ? 'Süreçte' : 'Bekliyor'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};