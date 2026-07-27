'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Star, MapPin, ArrowRight } from 'lucide-react';
import { VendorListingItem } from '@/types/vendor-listing';

interface AiRecommendedVendorsProps {
  recommendedVendors: VendorListingItem[];
}

export const AiRecommendedVendors: React.FC<AiRecommendedVendorsProps> = ({ recommendedVendors }) => {
  if (recommendedVendors.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#E6007E] font-bold text-[13px]">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>WedyAI Öne Çıkarılan Tavsiyeler</span>
        </div>
        <span className="text-[11px] font-semibold text-[#86868B]">Yüksek Uyum Skorlu İşletmeler</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendedVendors.slice(0, 3).map((vendor) => (
          <motion.div
            key={`rec-${vendor.id}`}
            whileHover={{ y: -4 }}
            className="bg-gradient-to-r from-amber-500/10 via-white/80 to-white/60 backdrop-blur-2xl border border-amber-200/80 p-4 rounded-[28px] shadow-2xs flex items-center gap-4"
          >
            <img
              src={vendor.imageUrl}
              alt={vendor.name}
              className="w-20 h-20 rounded-[20px] object-cover shrink-0 border border-white"
            />
            <div className="space-y-1 overflow-hidden flex-1">
              <span className="text-[10px] font-bold text-[#E6007E] bg-pink-50 px-2 py-0.5 rounded-md inline-block">
                %{vendor.aiMatchScore} Uyumlu
              </span>
              <h4 className="font-serif font-bold text-[14px] text-[#1D1D1F] truncate">{vendor.name}</h4>
              <div className="flex items-center gap-2 text-[11px] text-[#6E6E73]">
                <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-[#E6007E]" /> {vendor.district}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-amber-800 font-bold"><Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {vendor.rating}</span>
              </div>
            </div>
            <Link
              href={`/firmalar/${vendor.id}`}
              className="p-2.5 bg-[#1D1D1F] text-white rounded-full hover:bg-black transition shrink-0"
              title="İncele"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};