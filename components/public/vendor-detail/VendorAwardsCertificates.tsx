'use client';

import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';

interface VendorAwardsCertificatesProps {
  awards: string[];
  certificates: string[];
}

export const VendorAwardsCertificates: React.FC<VendorAwardsCertificatesProps> = ({ awards, certificates }) => {
  return (
    <div className="bg-white/50 backdrop-blur-3xl border border-white/90 p-8 rounded-[36px] space-y-6">
      <div className="space-y-3">
        <h3 className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#D4AF37]" /> Sektörel Ödüller
        </h3>
        <div className="flex flex-wrap gap-2">
          {awards.map((award: string, idx: number) => (
            <span key={idx} className="text-[11px] font-semibold bg-amber-500/10 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-full">
              🏆 {award}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-black/5">
        <h3 className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Resmi Sertifikalar
        </h3>
        <div className="flex flex-wrap gap-2">
          {certificates.map((cert: string, idx: number) => (
            <span key={idx} className="text-[11px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-full">
              ✓ {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};