'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, CheckCircle2 } from 'lucide-react';

export const AiValueProp: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-amber-500/10 backdrop-blur-3xl border border-white/80 p-8 sm:p-12 rounded-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Explanation */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/80 text-[#0071e3] border border-pink-200 rounded-full text-[11px] font-bold">
            <Bot className="w-3.5 h-3.5" /> WedyAI Akıllı Düzlem
          </div>

          <h2 className="font-serif font-semibold text-[32px] sm:text-[42px] text-[#1D1D1F] leading-tight">
            Klasik Rehber Değil; <br />
            <span className="italic text-[#0071e3]">Akıllı Düğün Danışmanı.</span>
          </h2>

          <p className="text-[15px] text-[#6E6E73] font-light leading-relaxed">
            WedyPlan binlerce ilanı rastgele sıralamaz. Bütçenizi, düğün tarihinizi ve davetli kapasitenizi saniyeler içinde analiz ederek sadece %90+ uyumlu onaylı mekanları önerir.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-white/60 rounded-[20px] border border-white flex items-center gap-2 text-[12px] font-semibold text-[#1D1D1F]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Görünmeyen Bütçe Sapma Analizi</span>
            </div>
            <div className="p-3 bg-white/60 rounded-[20px] border border-white flex items-center gap-2 text-[12px] font-semibold text-[#1D1D1F]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Saatlik Müsaitlik Sorgulaması</span>
            </div>
          </div>
        </div>

        {/* Right Visual Match Preview Card */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-2xl p-6 rounded-[32px] border border-white shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <span className="text-[11px] font-bold text-[#86868B] uppercase">WedyAI Canlı Analiz</span>
            <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              %98 Mükemmel Uyum
            </span>
          </div>

          <div className="space-y-2 text-[12px]">
            <div className="p-3 bg-[#f5f5f7] rounded-xl font-medium text-[#1D1D1F]">
              ✓ Belirlenen 350,000 ₺ bütçe sınırına tam uygunluk.
            </div>
            <div className="p-3 bg-[#f5f5f7] rounded-xl font-medium text-[#1D1D1F]">
              ✓ 15 Ağustos 2026 Cumartesi akşamı boş takvim slotu.
            </div>
            <div className="p-3 bg-[#f5f5f7] rounded-xl font-medium text-[#1D1D1F]">
              ✓ Boğaz manzaralı ve dış catering izinli.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};