'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { AiQualityScoreResult } from '@/types/vendor-onboarding';

interface AiQualityAnalyzerProps {
  analysis: AiQualityScoreResult;
  onProceedToCheckout: () => void;
}

export const AiQualityAnalyzer: React.FC<AiQualityAnalyzerProps> = ({ analysis, onProceedToCheckout }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/60 backdrop-blur-3xl border border-white p-8 rounded-[36px] shadow-xl space-y-6 max-w-2xl mx-auto"
    >
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-pink-500/10 text-[#E6007E] border border-pink-200 rounded-full text-[11px] font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> WedyAI Kalite & Performans Analizi
        </span>
        <h2 className="font-serif font-bold text-[28px] text-[#1D1D1F]">
          Profil Kalite Skorunuz Hazır!
        </h2>
        <p className="text-[13px] text-[#6E6E73] font-light">
          Girdiğiniz veriler WedyAI tarafından analiz edildi. Yayınlandığınızda alacağınız tahmini performans.
        </p>
      </div>

      {/* Main Score & Metrics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/80 p-5 rounded-[24px] border border-white text-center space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-[#86868B] uppercase">Kalite Skoru</span>
          <div className="font-serif font-bold text-[36px] text-[#1D1D1F]">{analysis.score}/100</div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Mükemmel Seviye
          </span>
        </div>

        <div className="bg-white/80 p-5 rounded-[24px] border border-white text-center space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-[#86868B] uppercase">Kazanılan Rozet</span>
          <div className="text-[16px] font-bold text-[#D4AF37] pt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" /> {analysis.badge.replace('_', ' ')}
          </div>
          <span className="text-[10px] text-[#6E6E73]">Onaylı Showroom</span>
        </div>

        <div className="bg-white/80 p-5 rounded-[24px] border border-white text-center space-y-1 shadow-xs">
          <span className="text-[10px] font-bold text-[#86868B] uppercase">Tahmini Aylık Lead</span>
          <div className="font-serif font-bold text-[36px] text-[#E6007E]">~{analysis.predictedMonthlyLeads}</div>
          <span className="text-[10px] text-[#6E6E73]">Doğrudan Müşteri Talebi</span>
        </div>
      </div>

      {/* AI Recommendations Checklist */}
      <div className="space-y-3 pt-2">
        <h4 className="font-bold text-[13px] text-[#1D1D1F] uppercase tracking-wider">WedyAI Büyüme İpuçları</h4>
        {analysis.recommendations.map((rec, idx) => (
          <div key={idx} className="p-3.5 bg-white/80 rounded-[20px] border border-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 text-amber-700 rounded-xl">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-[13px] font-bold text-[#1D1D1F] block">{rec.title}</strong>
                <span className="text-[11px] text-[#6E6E73]">{rec.actionText}</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 shrink-0">
              +{rec.scoreImpact} Puan
            </span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button
        onClick={onProceedToCheckout}
        className="w-full bg-[#1D1D1F] hover:bg-black text-white font-bold text-[13px] py-4 rounded-full transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
      >
        <span>Paket Seçimine Geç & İlanı Yayınla</span>
        <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
      </button>
    </motion.div>
  );
};