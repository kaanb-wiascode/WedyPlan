'use client';

import React from 'react';
import { CheckCircle2, BookOpen, Star, Sparkles } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface VendorAboutSectionProps {
  story: string;
  specialties: string[];
}

export const VendorAboutSection: React.FC<VendorAboutSectionProps> = ({ story, specialties }) => {
  return (
    <section className="space-y-6">
      {/* Bölüm Başlığı */}
      <div className="flex items-center gap-2 px-2">
        <Sparkles className="w-6 h-6 text-[#E6007E]" />
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Firma Hakkında</h2>
      </div>

      {/* Bento Grid Taşıyıcısı */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
        
        {/* Sol Büyük Kart: Hikaye (8 Kolon Kaplar) */}
        <GlassCard className="col-span-1 md:col-span-8 p-6 md:p-8" hoverEffect>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-[#E6007E]/10 rounded-xl">
              <BookOpen className="w-5 h-5 text-[#E6007E]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Hikayemiz & Hizmet Anlayışımız</h3>
          </div>
          <p className="text-gray-600 leading-relaxed font-light text-[15px] md:text-base">
            {story}
          </p>
        </GlassCard>

        {/* Sağ Üst Kart: Öne Çıkan Uzmanlıklar (4 Kolon Kaplar) */}
        <GlassCard className="col-span-1 md:col-span-4 p-6 md:p-8 bg-gradient-to-br from-white/60 to-white/10" hoverEffect>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-yellow-400/10 rounded-xl">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Neden Biz?</h3>
          </div>
          <div className="space-y-4">
            {/* İlk 4 özelliği burada listeliyoruz */}
            {specialties.slice(0, 4).map((spec, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E6007E] shrink-0 mt-0.5" />
                <span className="text-[14px] text-gray-800 font-medium leading-snug">{spec}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Alt Küçük Kartlar: Geri Kalan Uzmanlıklar (Mini Bento Kutu Stili) */}
        {specialties.length > 4 && (
          <div className="col-span-1 md:col-span-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* 4. indexten sonrakileri küçük cam kartlar halinde diziyoruz */}
            {specialties.slice(4).map((spec, idx) => (
              <GlassCard key={idx} className="p-4 flex items-center justify-center text-center border-white/40" hoverEffect>
                <span className="text-[13px] font-semibold text-gray-700">{spec}</span>
              </GlassCard>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};