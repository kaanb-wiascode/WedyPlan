'use client';

import React from 'react';
import { TrendingUp, Users, Eye, Heart, MessageSquare, Sparkles, Award } from 'lucide-react';

export const VendorGrowthCenter: React.FC = () => {
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div>
        <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">Büyüme & Lead Analitiği</span>
        <h1 className="text-[28px] font-serif font-semibold text-[#1D1D1F]">Vendor Growth Center</h1>
        <p className="text-[13px] text-[#6E6E73]">İşletmenizin WedyPlan üzerindeki dönüşüm performansı ve WedyAI önerileri.</p>
      </div>

      {/* Metrics Bento Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-5 rounded-[24px] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#86868B]">
            <span className="text-[11px] font-bold uppercase">Profil Görüntülenmesi</span>
            <Eye className="w-4 h-4 text-[#E6007E]" />
          </div>
          <div className="text-[28px] font-serif font-bold text-[#1D1D1F]">1,240</div>
          <span className="text-[11px] text-emerald-700 font-bold">↑ %18 Geçen Aya Göre</span>
        </div>

        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-5 rounded-[24px] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#86868B]">
            <span className="text-[11px] font-bold uppercase">Favorilere Ekleme</span>
            <Heart className="w-4 h-4 text-[#E6007E]" />
          </div>
          <div className="text-[28px] font-serif font-bold text-[#1D1D1F]">312</div>
          <span className="text-[11px] text-emerald-700 font-bold">↑ %12 Yüksek İlgi</span>
        </div>

        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-5 rounded-[24px] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#86868B]">
            <span className="text-[11px] font-bold uppercase">Gelen Teklif Talebi</span>
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="text-[28px] font-serif font-bold text-[#1D1D1F]">48</div>
          <span className="text-[11px] text-[#E6007E] font-bold">%82 WedyAI Filtreli</span>
        </div>

        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-5 rounded-[24px] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#86868B]">
            <span className="text-[11px] font-bold uppercase">Kapanan Rezervasyon</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-[28px] font-serif font-bold text-[#1D1D1F]">14</div>
          <span className="text-[11px] text-emerald-700 font-bold">₺420,000 Hacim</span>
        </div>
      </div>

      {/* WedyAI Optimization Suggestions */}
      <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-white/60 backdrop-blur-3xl border border-white p-6 rounded-[32px] space-y-3">
        <div className="flex items-center gap-2 text-[#E6007E] text-[13px] font-bold">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WedyAI Dönüşüm Artırma Tavsiyesi
        </div>
        <p className="text-[13px] text-[#6E6E73] leading-relaxed">
          Gözden kaçan 6 teklif talebiniz var. Müşterilere ilk 15 dakika içinde dönüldüğünde anlaşma olasılığı <strong>4 kat artmaktadır</strong>.
        </p>
      </div>
    </div>
  );
};