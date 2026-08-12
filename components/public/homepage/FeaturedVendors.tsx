'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FEATURED_PUBLIC_VENDORS } from '@/lib/data/homepage-data';
import { Star, MapPin, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const FeaturedVendors: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">Onaylı Partnerler</span>
          <h2 className="font-serif font-semibold text-[32px] text-[#1D1D1F]">Öne Çıkan Düğün Mekanları</h2>
        </div>
        <Link href="/firmalar" className="text-[13px] font-bold text-[#1D1D1F] hover:text-[#0071e3] transition flex items-center gap-1">
          Tümünü Gör <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURED_PUBLIC_VENDORS.map((vendor) => (
          <motion.div
            key={vendor.id}
            whileHover={{ y: -6 }}
            className="group bg-white/40 backdrop-blur-2xl border border-white/90 rounded-[32px] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <img
                  src={vendor.imageUrl}
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#0071e3] text-white px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" /> %{vendor.aiMatchScore} Uyum
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#1D1D1F] border border-white flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> {vendor.rating} ({vendor.reviewCount})
                </div>
              </div>

              <div className="p-6 space-y-3">
                <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase">{vendor.category}</span>
                <h3 className="font-serif font-bold text-[20px] text-[#1D1D1F] group-hover:text-[#0071e3] transition-colors">
                  {vendor.name}
                </h3>
                <div className="flex items-center gap-2 text-[12px] text-[#6E6E73]">
                  <MapPin className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span>{vendor.district}, {vendor.city}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-black/5 mt-4 pt-4">
              <div>
                <span className="text-[10px] text-[#86868B] block font-bold uppercase">Başlangıç</span>
                <span className="font-serif font-bold text-[18px] text-[#1D1D1F]">
                  {vendor.startingPrice.toLocaleString('tr-TR')} ₺
                </span>
              </div>
              <Link
                href={`/firmalar/${vendor.id}`}
                className="bg-[#1D1D1F] text-white text-[11px] font-bold px-4 py-2.5 rounded-full hover:bg-black transition cursor-pointer"
              >
                İncele
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};