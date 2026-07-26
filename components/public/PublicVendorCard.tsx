'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Phone, Sparkles } from 'lucide-react';

export interface PublicVendor {
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

interface PublicVendorCardProps {
  vendor: PublicVendor;
  onSelectVendorForQuote?: (vendor: PublicVendor) => void;
}

export const PublicVendorCard: React.FC<PublicVendorCardProps> = ({ vendor, onSelectVendorForQuote }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-white rounded-[24px] overflow-hidden border shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
        vendor.isFeatured ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-100'
      }`}
    >
      <div>
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          <img
            src={vendor.imageUrl || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80'}
            alt={vendor.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-[10px] font-bold bg-white/90 backdrop-blur-md text-[#1D1D1F] px-2.5 py-1 rounded-full shadow-sm">
              {vendor.category}
            </span>
            {vendor.isFeatured && (
              <span className="text-[10px] font-bold bg-amber-500 text-white px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                👑 Öne Çıkan
              </span>
            )}
          </div>
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-700 border border-amber-200 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {vendor.rating || '4.8'}
          </div>
        </div>

        <div className="p-5 space-y-2">
          <h3 className="font-bold text-[17px] text-[#1D1D1F] line-clamp-1">{vendor.name}</h3>
          <div className="flex items-center gap-3 text-[12px] text-[#6E6E73]">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#E6007E]" /> {vendor.city}</span>
            <span>•</span>
            <span className="font-semibold text-[#1D1D1F]">{vendor.price}</span>
          </div>
          <p className="text-[12px] text-[#86868B] line-clamp-2 leading-relaxed">{vendor.description}</p>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center gap-2">
        {onSelectVendorForQuote && (
          <button
            onClick={() => onSelectVendorForQuote(vendor)}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[12px] font-bold py-2.5 rounded-xl hover:opacity-95 transition flex items-center justify-center gap-1.5 shadow-sm shadow-pink-200 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> WedyAI İle Teklif Al
          </button>
        )}
        {vendor.phone && (
          <a
            href={`tel:${vendor.phone}`}
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition"
            title="Ara"
          >
            <Phone className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
};