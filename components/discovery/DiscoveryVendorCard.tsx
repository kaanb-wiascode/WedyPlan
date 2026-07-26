'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart, Sparkles, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import { DiscoveryVendor } from '@/types/vendor-discovery';

interface DiscoveryVendorCardProps {
  vendor: DiscoveryVendor;
  isCompared: boolean;
  onToggleCompare: (vendor: DiscoveryVendor) => void;
}

export const DiscoveryVendorCard: React.FC<DiscoveryVendorCardProps> = ({ vendor, isCompared, onToggleCompare }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-white/40 backdrop-blur-2xl border rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between ${
        isCompared ? 'border-[#E6007E] ring-2 ring-pink-100' : 'border-white/90'
      }`}
    >
      <div>
        {/* Cover Photo Container */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={vendor.imageUrl}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[10px] font-bold bg-[#E6007E] text-white px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> %{vendor.matchScore} Uyum
            </span>
            {vendor.isVerified && (
              <span className="text-[10px] font-bold bg-white/80 backdrop-blur-md text-[#1D1D1F] px-2.5 py-1 rounded-full border border-white/80">
                ✓ Onaylı
              </span>
            )}
          </div>

          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full border border-white text-[#1D1D1F] transition hover:scale-110 cursor-pointer shadow-xs"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#E6007E] text-[#E6007E]' : ''}`} />
          </button>

          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#1D1D1F] border border-white flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> {vendor.rating} ({vendor.reviewCount})
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase tracking-wider">{vendor.category}</span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ⚡ Yanıt: {vendor.responseTime}
            </span>
          </div>

          <Link href={`/firmalar/${vendor.id}`}>
            <h3 className="font-serif font-semibold text-[20px] text-[#1D1D1F] group-hover:text-[#E6007E] transition-colors line-clamp-1">
              {vendor.name}
            </h3>
          </Link>

          <div className="flex items-center gap-2 text-[12px] text-[#6E6E73]">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#E6007E]" /> {vendor.district}, {vendor.city}</span>
            {vendor.capacity > 0 && <span>• Max {vendor.capacity} Kişi</span>}
          </div>

          {/* AI Match Breakdown Bullet Points */}
          <div className="space-y-1 bg-white/60 p-3 rounded-[18px] border border-white text-[11px] text-[#1D1D1F]">
            {vendor.matchBreakdown.map((item, idx) => (
              <p key={idx} className="line-clamp-1">{item}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-6 pt-0 flex items-center gap-2">
        <button
          onClick={() => onToggleCompare(vendor)}
          className={`px-3 py-2.5 rounded-2xl text-[11px] font-bold border transition cursor-pointer flex items-center gap-1 ${
            isCompared ? 'bg-[#E6007E] text-white border-[#E6007E]' : 'bg-white/80 text-[#1D1D1F] border-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{isCompared ? 'Seçildi' : 'Karşılaştır'}</span>
        </button>

        <Link
          href={`/firmalar/${vendor.id}`}
          className="flex-1 bg-[#1D1D1F] hover:bg-black text-white text-[12px] font-bold py-2.5 rounded-2xl transition flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>İncele & Teklif Al</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
};