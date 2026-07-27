'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart, Sparkles, ArrowRight, Layers } from 'lucide-react';
import { VendorListingItem } from '@/types/vendor-listing';

interface VendorListingCardProps {
  vendor: VendorListingItem;
  isCompared: boolean;
  onToggleCompare: (vendor: VendorListingItem) => void;
  isSaved: boolean;
  onToggleSave: (vendorId: string) => void;
}

export const VendorListingCard: React.FC<VendorListingCardProps> = ({
  vendor,
  isCompared,
  onToggleCompare,
  isSaved,
  onToggleSave
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className={`group bg-white/50 backdrop-blur-2xl border rounded-[32px] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between ${
        isCompared ? 'border-[#E6007E] ring-2 ring-pink-100' : 'border-white/90'
      }`}
    >
      <div>
        {/* Photo Container */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={vendor.imageUrl}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[10px] font-bold bg-[#E6007E] text-white px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> %{vendor.aiMatchScore} Uyum
            </span>
            {vendor.isVerified && (
              <span className="text-[10px] font-bold bg-white/80 backdrop-blur-md text-[#1D1D1F] px-2.5 py-1 rounded-full border border-white">
                ✓ Onaylı
              </span>
            )}
          </div>

          <button
            onClick={() => onToggleSave(vendor.id)}
            className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full border border-white text-[#1D1D1F] transition hover:scale-110 cursor-pointer shadow-xs"
            title={isSaved ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#E6007E] text-[#E6007E]' : ''}`} />
          </button>

          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#1D1D1F] border border-white flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> {vendor.rating} ({vendor.reviewCount})
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase">{vendor.category}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              vendor.isAvailable
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}>
              {vendor.isAvailable ? '⚡ Müsait' : 'Dolu'}
            </span>
          </div>

          <Link href={`/firmalar/${vendor.id}`}>
            <h3 className="font-serif font-bold text-[20px] text-[#1D1D1F] group-hover:text-[#E6007E] transition-colors line-clamp-1">
              {vendor.name}
            </h3>
          </Link>

          <div className="flex items-center gap-2 text-[12px] text-[#6E6E73]">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#E6007E]" /> {vendor.district}, {vendor.city}</span>
            {vendor.capacity > 0 && <span>• Max {vendor.capacity} Kişi</span>}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {vendor.tags.map((tag: string, idx: number) => (
              <span key={idx} className="text-[10px] font-semibold bg-white/80 text-[#6E6E73] px-2.5 py-0.5 rounded-md border border-slate-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-6 pt-0 flex items-center justify-between border-t border-black/5 mt-2 pt-4">
        <div>
          <span className="text-[10px] text-[#86868B] block font-bold uppercase">Başlangıç</span>
          <span className="font-serif font-bold text-[18px] text-[#1D1D1F]">
            {vendor.startingPrice.toLocaleString('tr-TR')} ₺
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleCompare(vendor)}
            className={`px-3 py-2 rounded-2xl text-[11px] font-bold border transition cursor-pointer flex items-center gap-1 ${
              isCompared ? 'bg-[#E6007E] text-white border-[#E6007E]' : 'bg-white/80 text-[#1D1D1F] border-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isCompared ? 'Seçildi' : 'Karşılaştır'}</span>
          </button>

          <Link
            href={`/firmalar/${vendor.id}`}
            className="bg-[#1D1D1F] hover:bg-black text-white text-[12px] font-bold px-4 py-2 rounded-2xl transition flex items-center gap-1 cursor-pointer"
          >
            <span>İncele</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};