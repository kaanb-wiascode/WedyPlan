'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface VendorAboutSectionProps {
  story: string;
  specialties: string[];
}

export const VendorAboutSection: React.FC<VendorAboutSectionProps> = ({ story, specialties }) => {
  return (
    <div className="bg-white/50 backdrop-blur-3xl border border-white/90 p-8 rounded-[36px] shadow-xs space-y-6">
      <div className="border-b border-black/5 pb-4">
        <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">Showroom Hikayesi</span>
        <h2 className="font-serif font-semibold text-[26px] text-[#1D1D1F]">Firma Hakkında & Hizmet Anlayışı</h2>
      </div>

      <p className="text-[15px] text-[#6E6E73] font-light leading-relaxed">
        {story}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {specialties.map((spec: string, idx: number) => (
          <div key={idx} className="p-3.5 bg-white/80 rounded-[20px] border border-white flex items-center gap-2.5 text-[13px] font-semibold text-[#1D1D1F]">
            <CheckCircle2 className="w-4 h-4 text-[#E6007E] shrink-0" />
            <span>{spec}</span>
          </div>
        ))}
      </div>
    </div>
  );
};