'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, MapPin, Star, Heart, Share2, Award } from 'lucide-react';
import { VendorDetailFull } from '@/types/vendor-detail-page';

interface VendorDetailHeroProps {
  vendor: VendorDetailFull;
  onOpenOfferModal: () => void;
}

export const VendorDetailHero: React.FC<VendorDetailHeroProps> = ({ vendor, onOpenOfferModal }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-white/50 backdrop-blur-3xl border border-white/90 p-6 sm:p-8 rounded-[36px] shadow-xs space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-black/5 pb-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold bg-[#D4AF37]/15 text-[#D4AF37] px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
              {vendor.category}
            </span>

            {vendor.isVerified && (
              <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> WedyPlan Onaylı Showroom
              </span>
            )}

            <span className="text-[11px] font-bold bg-[#E6007E]/10 text-[#E6007E] px-3 py-1 rounded-full border border-pink-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> %{vendor.aiMatchScore} WedyAI Uyum
            </span>
          </div>

          <h1 className="font-serif font-bold text-[32px] sm:text-[44px] text-[#1D1D1F] leading-tight">
            {vendor.companyName}
          </h1>

          <p className="text-[14px] text-[#6E6E73] font-light max-w-2xl">{vendor.tagline}</p>

          <div className="flex items-center gap-4 text-[13px] text-[#6E6E73]">
            <span className="flex items-center gap-1 font-semibold text-[#1D1D1F]">
              <MapPin className="w-4 h-4 text-[#E6007E]" /> {vendor.district}, {vendor.city}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {vendor.rating} ({vendor.reviewCount} Yorum)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-3.5 rounded-full border transition flex items-center justify-center cursor-pointer ${
              isSaved ? 'bg-pink-50 border-pink-300 text-[#E6007E]' : 'bg-white/80 border-white text-[#1D1D1F] hover:bg-white'
            }`}
            title="Favorilere Ekle"
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#E6007E]' : ''}`} />
          </button>

          <button
            onClick={onOpenOfferModal}
            className="bg-[#1D1D1F] hover:bg-black text-white text-[13px] font-bold px-8 py-4 rounded-full transition shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Ücretsiz Teklif Al</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Bar */}
      <div className="flex flex-wrap items-center justify-between text-[13px] text-[#6E6E73] gap-4">
        <div>
          Başlangıç Fiyatı: <strong className="font-serif font-bold text-[18px] text-[#1D1D1F] ml-1">{vendor.startingPrice.toLocaleString('tr-TR')} ₺</strong>
        </div>
        <div>Maksimum Kapasite: <strong className="text-[#1D1D1F] font-bold">{vendor.capacity} Kişi</strong></div>
        <div>Kuruluş Yılı: <strong className="text-[#1D1D1F] font-bold">{vendor.establishedYear}</strong></div>
      </div>
    </div>
  );
};