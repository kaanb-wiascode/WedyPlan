'use client';

import React from 'react';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';
import { VendorDetail } from '@/types/vendor-detail';

export const VendorEditorialAbout: React.FC<{ vendor: VendorDetail }> = ({ vendor }) => {
  return (
    <div className="bg-white/50 backdrop-blur-3xl border border-white/90 p-8 rounded-[36px] shadow-xs space-y-6">
      <div className="border-b border-black/5 pb-4">
        <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">Showroom Hikayesi</span>
        <h2 className="font-serif font-semibold text-[26px] text-[#1D1D1F]">Firma Hakkında & Hizmet Anlayışı</h2>
      </div>

      <p className="text-[15px] text-[#6E6E73] font-light leading-relaxed">
        {vendor.story}
      </p>

      {/* Specialties Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        {vendor.specialties.map((spec, idx) => (
          <div key={idx} className="p-3 bg-white/80 rounded-[18px] border border-white flex items-center gap-2 text-[12px] font-semibold text-[#1D1D1F]">
            <CheckCircle2 className="w-4 h-4 text-[#0071e3]" />
            <span>{spec}</span>
          </div>
        ))}
      </div>

      {/* Awards & Accreditation */}
      <div className="pt-4 border-t border-black/5 space-y-3">
        <h3 className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#D4AF37]" /> Ödüller & Akreditasyonlar
        </h3>
        <div className="flex flex-wrap gap-2">
          {vendor.awards.map((award, idx) => (
            <span key={idx} className="text-[11px] font-semibold bg-amber-500/10 text-amber-800 border border-amber-200 px-3 me-1 py-1.5 rounded-full">
              🏆 {award}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};