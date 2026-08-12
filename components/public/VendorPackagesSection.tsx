'use client';

import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { VendorDetailPackage } from '@/types/vendor-detail';

interface VendorPackagesSectionProps {
  packages: VendorDetailPackage[];
  onSelectPackage: (pkg: VendorDetailPackage) => void;
}

export const VendorPackagesSection: React.FC<VendorPackagesSectionProps> = ({ packages, onSelectPackage }) => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-bold text-[#0071e3] uppercase tracking-widest block mb-1">Şeffaf Fiyatlandırma</span>
        <h2 className="font-serif font-semibold text-[28px] text-[#1D1D1F]">Düğün Paketleri & Seçenekler</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white/60 backdrop-blur-3xl p-8 rounded-[32px] border space-y-6 flex flex-col justify-between transition-all ${
              pkg.isPopular ? 'border-[#D4AF37] shadow-xl ring-2 ring-amber-100 bg-amber-50/10' : 'border-white/90'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[22px] text-[#1D1D1F]">{pkg.name}</h3>
                {pkg.isPopular && (
                  <span className="text-[10px] font-bold bg-[#D4AF37] text-white px-3 py-1 rounded-full">
                    🌟 Çiftlerin Favorisi
                  </span>
                )}
              </div>
              <p className="text-[13px] text-[#6E6E73]">{pkg.tagline}</p>

              <div className="space-y-2 border-t border-black/5 pt-4">
                {pkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-[13px] text-[#1D1D1F]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-black/5 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#86868B] block uppercase font-bold">Paket Başlangıç</span>
                <span className="font-serif font-bold text-[24px] text-[#1D1D1F]">
                  {pkg.price.toLocaleString('tr-TR')} ₺
                </span>
              </div>

              <button
                onClick={() => onSelectPackage(pkg)}
                className="bg-[#1D1D1F] hover:bg-black text-white text-[12px] font-bold px-6 py-3 rounded-full transition cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Teklif İsteyin
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};