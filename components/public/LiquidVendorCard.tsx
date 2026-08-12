'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export interface LiquidVendor {
  id: string;
  name: string;
  category: string;
  city: string;
  price: string;
  rating: number | string;
  imageUrl: string;
  description: string;
  phone: string;
  isFeatured?: boolean;
}

interface LiquidVendorCardProps {
  vendor: LiquidVendor;
  onSelectVendorForQuote?: (vendor: LiquidVendor) => void;
}

export const LiquidVendorCard: React.FC<LiquidVendorCardProps> = ({ vendor, onSelectVendorForQuote }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-white/40 backdrop-blur-xl sm:backdrop-blur-2xl border rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between ${
        vendor.isFeatured ? 'border-[#D4AF37]/60 bg-gradient-to-b from-amber-500/5 to-white/50' : 'border-white/80'
      }`}
    >
      <div>
        {/* Luxury Editorial Image Container */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={vendor.imageUrl || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80'}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Floating Glass Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[10px] font-bold bg-white/80 backdrop-blur-md text-[#1D1D1F] px-3 py-1 rounded-full border border-white/60 shadow-xs">
              {vendor.category}
            </span>
            {vendor.isFeatured && (
              <span className="text-[10px] font-bold bg-[#D4AF37] text-white px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                👑 Öne Çıkan
              </span>
            )}
          </div>

          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#1D1D1F] border border-white/80 flex items-center gap-1 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> {vendor.rating || '4.9'}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-1.5 text-[#D4AF37] text-[11px] font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>WedyPlan Onaylı Partner</span>
          </div>

          <h3 className="font-serif font-semibold text-[20px] text-[#1D1D1F] group-hover:text-[#0071e3] transition-colors line-clamp-1">
            {vendor.name}
          </h3>

          <div className="flex items-center gap-2 text-[12px] text-[#6E6E73]">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#0071e3]" /> {vendor.city}</span>
            <span>•</span>
            <span className="font-serif font-bold text-[#1D1D1F]">{vendor.price}</span>
          </div>

          <p className="text-[12px] text-[#6E6E73] line-clamp-2 leading-relaxed">
            {vendor.description}
          </p>
        </div>
      </div>

      {/* Glass Action Bottom */}
      <div className="p-6 pt-0">
        <button
          onClick={() => onSelectVendorForQuote && onSelectVendorForQuote(vendor)}
          className="w-full bg-white/80 hover:bg-[#1D1D1F] hover:text-white text-[#1D1D1F] text-[12px] font-bold py-3 rounded-2xl border border-white/90 shadow-xs transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#0071e3] group-hover/btn:text-[#D4AF37] transition-colors" />
          <span>WedyAI İle Teklif Al</span>
          <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};