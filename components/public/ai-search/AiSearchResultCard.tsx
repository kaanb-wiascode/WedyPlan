'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, Sparkles, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { AiSearchVendor } from '@/types/ai-search';

interface AiSearchResultCardProps {
  vendor: AiSearchVendor;
}

export const AiSearchResultCard: React.FC<AiSearchResultCardProps> = ({ vendor }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="group bg-white/50 backdrop-blur-2xl border border-white/90 rounded-[32px] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
    >
      <div>
        {/* Cover Image & Badges */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={vendor.imageUrl}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[10px] font-bold bg-[#0071e3] text-white px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> %{vendor.matchScore} Uyum
            </span>
            {vendor.isVerified && (
              <span className="text-[10px] font-bold bg-white/80 backdrop-blur-md text-[#1D1D1F] px-2.5 py-1 rounded-full border border-white">
                ✓ Onaylı
              </span>
            )}
          </div>

          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full border border-white text-[#1D1D1F] transition hover:scale-110 cursor-pointer shadow-xs"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#0071e3] text-[#0071e3]' : ''}`} />
          </button>

          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#1D1D1F] border border-white flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> {vendor.rating} ({vendor.reviewCount})
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase">{vendor.category}</span>
            {vendor.capacity > 0 && (
              <span className="text-[11px] text-[#6E6E73]">Max {vendor.capacity} Kişi</span>
            )}
          </div>

          <Link href={`/firmalar/${vendor.id}`}>
            <h3 className="font-serif font-bold text-[20px] text-[#1D1D1F] group-hover:text-[#0071e3] transition-colors line-clamp-1">
              {vendor.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1.5 text-[12px] text-[#6E6E73]">
            <MapPin className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>{vendor.district}, {vendor.city}</span>
          </div>

          {/* AI Match Breakdown Bullet Points */}
          <div className="space-y-1 bg-white/60 p-3 rounded-[18px] border border-white text-[11px] text-[#1D1D1F]">
            {vendor.matchBreakdown.map((point, idx) => (
              <p key={idx} className="line-clamp-1">{point}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-6 pt-0 flex items-center justify-between border-t border-black/5 mt-2 pt-4">
        <div>
          <span className="text-[10px] text-[#86868B] block font-bold uppercase">Başlangıç</span>
          <span className="font-serif font-bold text-[18px] text-[#1D1D1F]">
            {vendor.startingPrice.toLocaleString('tr-TR')} ₺
          </span>
        </div>

        <Link
          href={`/firmalar/${vendor.id}`}
          className="bg-[#1D1D1F] hover:bg-black text-white text-[12px] font-bold px-5 py-2.5 rounded-2xl transition flex items-center gap-1 cursor-pointer"
        >
          <span>İncele</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
};