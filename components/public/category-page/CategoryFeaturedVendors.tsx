'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

interface CategoryFeaturedVendorsProps {
  vendors: any[];
}

export const CategoryFeaturedVendors: React.FC<CategoryFeaturedVendorsProps> = ({ vendors }) => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif font-bold text-[28px] text-[#1D1D1F]">Öne Çıkan Partnerler</h2>
        <Link href="/firmalar" className="text-[13px] font-bold text-[#1D1D1F] hover:text-[#0071e3] transition flex items-center gap-1">
          Tümünü Gör <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="group bg-white/50 backdrop-blur-2xl border border-white/90 rounded-[32px] overflow-hidden shadow-xs hover:shadow-xl transition-all">
            <div className="relative h-56 w-full overflow-hidden">
              <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              {vendor.isVerified && (
                <div className="absolute top-4 left-4 text-[10px] font-bold bg-white/90 backdrop-blur-md text-[#1D1D1F] px-2.5 py-1 rounded-full border border-white flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Onaylı
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#1D1D1F] border border-white flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> {vendor.rating} ({vendor.reviewCount})
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h3 className="font-serif font-bold text-[20px] text-[#1D1D1F] group-hover:text-[#0071e3] transition-colors truncate">
                {vendor.name}
              </h3>
              <div className="flex items-center gap-2 text-[12px] text-[#6E6E73]">
                <MapPin className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>{vendor.district}, {vendor.city}</span>
              </div>
              <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#86868B] uppercase font-bold block">Başlangıç</span>
                  <span className="font-serif font-bold text-[16px] text-[#1D1D1F]">{vendor.startingPrice.toLocaleString('tr-TR')} ₺</span>
                </div>
                <Link href={`/firmalar/${vendor.id}`} className="bg-[#1D1D1F] text-white text-[11px] font-bold px-4 py-2.5 rounded-full hover:bg-black transition">
                  İncele
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};