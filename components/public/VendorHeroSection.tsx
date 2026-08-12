'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ShieldCheck, Heart, Sparkles, Image as ImageIcon, Share2 } from 'lucide-react';
import { VendorDetail } from '@/types/vendor-detail';
import { VendorAiMatchModal } from './VendorAiMatchModal';

interface VendorHeroSectionProps {
  vendor: VendorDetail;
  onOpenQuoteModal: () => void;
}

export const VendorHeroSection: React.FC<VendorHeroSectionProps> = ({ vendor, onOpenQuoteModal }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Visual Editorial Gallery Grid */}
      <div className="relative rounded-[36px] overflow-hidden bg-[#1D1D1F] border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2 h-[420px] md:h-[500px]">
          {/* Main Large Photo */}
          <div className="md:col-span-2 h-full relative group overflow-hidden rounded-[28px]">
            <img
              src={vendor.coverImages[0]}
              alt={vendor.companyName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Secondary Photos */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
            {vendor.coverImages.slice(1, 4).map((imgUrl, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-[24px] h-full">
                <img
                  src={imgUrl}
                  alt={`${vendor.companyName} ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Badge */}
        <button className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-2xl px-4 py-2 rounded-full text-[12px] font-bold text-[#1D1D1F] border border-white flex items-center gap-2 hover:bg-white transition cursor-pointer shadow-md">
          <ImageIcon className="w-4 h-4 text-[#0071e3]" />
          <span>Tüm Görselleri Gör ({vendor.coverImages.length})</span>
        </button>
      </div>

      {/* Floating Liquid Glass Header Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white/50 backdrop-blur-3xl border border-white/90 p-6 sm:p-8 rounded-[36px] shadow-[0_16px_40px_rgba(0,0,0,0.04)] space-y-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-black/5 pb-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold bg-[#D4AF37]/15 text-[#D4AF37] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                {vendor.category}
              </span>

              {vendor.isVerified && (
                <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> WedyPlan Onaylı Showroom
                </span>
              )}

              {/* WedyAI Match Badge Trigger */}
              <button
                onClick={() => setShowAiModal(true)}
                className="text-[11px] font-bold bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-[#0071e3] border border-pink-200/80 px-3 py-1 rounded-full flex items-center gap-1.5 hover:scale-105 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>%{vendor.aiMatch.score} WedyAI Uyum Skoru</span>
              </button>
            </div>

            <h1 className="font-serif font-semibold text-[32px] sm:text-[42px] text-[#1D1D1F] leading-tight">
              {vendor.companyName}
            </h1>

            <p className="text-[14px] text-[#6E6E73] font-light">{vendor.tagline}</p>

            <div className="flex items-center gap-4 text-[13px] text-[#6E6E73]">
              <span className="flex items-center gap-1 font-semibold text-[#1D1D1F]">
                <MapPin className="w-4 h-4 text-[#0071e3]" /> {vendor.district}, {vendor.city}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {vendor.rating} ({vendor.reviewCount} Değerlendirme)
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3.5 rounded-full border transition-all flex items-center justify-center cursor-pointer ${
                isFavorite
                  ? 'bg-pink-50 border-pink-300 text-[#0071e3]'
                  : 'bg-white/80 border-white text-[#1D1D1F] hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#0071e3]' : ''}`} />
            </button>

            <button
              onClick={onOpenQuoteModal}
              className="bg-[#1D1D1F] hover:bg-black text-white text-[13px] font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Ücretsiz Teklif Al</span>
            </button>
          </div>
        </div>

        {/* Pricing Quick Bar */}
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-[#6E6E73]">
            Başlangıç Paketi Fiyatı: <strong className="text-[#1D1D1F] font-serif font-bold text-[18px] ml-1">{vendor.startingPrice.toLocaleString('tr-TR')} ₺</strong>
          </span>
          <span className="text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ✓ Şeffaf Bütçe Garantisi
          </span>
        </div>
      </motion.div>

      {/* AI Match Modal */}
      {showAiModal && <VendorAiMatchModal matchData={vendor.aiMatch} onClose={() => setShowAiModal(false)} />}
    </div>
  );
};