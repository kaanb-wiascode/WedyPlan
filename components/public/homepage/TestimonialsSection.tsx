'use client';

import React from 'react';
import { TESTIMONIALS_LIST } from '@/lib/data/homepage-data';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <span className="text-[11px] font-bold text-[#E6007E] uppercase tracking-widest block">Sosyal Kanıt & Güven</span>
        <h2 className="font-serif font-semibold text-[32px] sm:text-[40px] text-[#1D1D1F]">Çiftler ve Partnerler Ne Diyor?</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS_LIST.map((item) => (
          <div
            key={item.id}
            className="bg-white/50 backdrop-blur-2xl border border-white p-8 rounded-[36px] shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>
                {item.verifiedBooking && (
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Onaylı Deneyim
                  </span>
                )}
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-[#E6007E]/20 absolute -top-2 -left-2 -z-10" />
                <p className="text-[15px] text-[#1D1D1F] font-light leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-black/5">
              <img
                src={item.avatarUrl}
                alt={item.authorNames}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
              />
              <div>
                <h3 className="font-bold text-[15px] text-[#1D1D1F]">{item.authorNames}</h3>
                <span className="text-[11px] text-[#86868B] block">{item.role} • {item.weddingLocation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};