'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, CheckCircle2 } from 'lucide-react';

interface AiRecommendationCardProps {
  queryPrompt: string;
  resultCount: number;
}

export const AiRecommendationCard: React.FC<AiRecommendationCardProps> = ({
  queryPrompt,
  resultCount
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-amber-500/10 backdrop-blur-3xl border border-white/90 p-6 rounded-[32px] shadow-xs space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#E6007E] font-bold text-[13px]">
          <Bot className="w-4 h-4 text-[#D4AF37]" />
          <span>WedyAI Arama & Analiz Özeti</span>
        </div>
        <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
          {resultCount} Onaylı Eşleşme Bulundu
        </span>
      </div>

      <p className="text-[13px] text-[#1D1D1F] font-medium leading-relaxed">
        {queryPrompt
          ? `"${queryPrompt}" cümleniz analiz edildi. Bütçe, lokasyon ve kapasite kriterlerinize %85 ve üzeri uyum sağlayan firmalar listelendi.`
          : 'Tüm onaylı WedyPlan partnerleri listeleniyor. Spesifik bir arama yapmak için yukarıdaki arama kutusuna isteğinizi yazabilirsiniz.'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px] font-semibold text-[#6E6E73]">
        <div className="flex items-center gap-1.5 bg-white/60 p-2.5 rounded-xl border border-white">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Saatlik Çakışmasız Takvim Kontrol Edildi</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/60 p-2.5 rounded-xl border border-white">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Şeffaf Bütçe Garantili Paketler</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/60 p-2.5 rounded-xl border border-white">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>%100 Doğrulanmış İşletme Rozeti</span>
        </div>
      </div>
    </motion.div>
  );
};