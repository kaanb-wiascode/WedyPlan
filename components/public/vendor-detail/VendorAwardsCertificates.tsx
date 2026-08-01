'use client';

import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface VendorAwardsCertificatesProps {
  awards: string[];
  certificates: string[];
}

export const VendorAwardsCertificates: React.FC<VendorAwardsCertificatesProps> = ({ awards, certificates }) => {
  // Eğer her ikisi de boşsa component'i render etme
  if (!awards.length && !certificates.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
      
      {/* Sol Bento Kutu: Ödüller */}
      {awards.length > 0 && (
        <GlassCard className="p-6 md:p-8 border-white/40" hoverEffect>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-amber-100 rounded-xl">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Sektörel Ödüller</h3>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            {awards.map((award: string, idx: number) => (
              <span 
                key={idx} 
                className="text-[13px] font-medium bg-gradient-to-r from-amber-50 to-white border border-amber-200/60 text-amber-900 px-3.5 py-2 rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <span className="text-amber-500">🏆</span> {award}
              </span>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Sağ Bento Kutu: Sertifikalar */}
      {certificates.length > 0 && (
        <GlassCard className="p-6 md:p-8 border-white/40" hoverEffect>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-emerald-100 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Resmi Sertifikalar</h3>
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            {certificates.map((cert: string, idx: number) => (
              <span 
                key={idx} 
                className="text-[13px] font-medium bg-gradient-to-r from-emerald-50 to-white border border-emerald-200/60 text-emerald-900 px-3.5 py-2 rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <span className="text-emerald-500">✓</span> {cert}
              </span>
            ))}
          </div>
        </GlassCard>
      )}
      
    </div>
  );
};