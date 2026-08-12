'use client';

import React from 'react';
import { Check, Sparkles, Star } from 'lucide-react';
import { VendorPackage } from '@/types/vendor-detail-page';
import GlassCard from '@/components/shared/ui/GlassCard';

interface VendorPackagesPricingProps {
  packages: VendorPackage[];
  onOpenOfferModal: () => void;
}

export const VendorPackagesPricing: React.FC<VendorPackagesPricingProps> = ({ packages, onOpenOfferModal }) => {
  return (
    <section className="space-y-6">
      {/* Bölüm Başlığı */}
      <div className="flex flex-col gap-1 px-2">
        <span className="text-[11px] font-bold text-[#0071e3] uppercase tracking-widest flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Şeffaf Bütçe
        </span>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Düğün Paketleri & Seçenekler</h2>
      </div>

      {/* Paketler Grid (Bento Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg: VendorPackage) => (
          <GlassCard
            key={pkg.id}
            hoverEffect
            className={`flex flex-col h-full p-6 md:p-8 ${
              pkg.isPopular 
                ? 'border-[#D4AF37]/50 ring-1 ring-[#D4AF37]/30 bg-gradient-to-br from-amber-50/40 to-transparent' 
                : 'border-white/40'
            }`}
          >
            {/* Popüler Paket Etiketi */}
            {pkg.isPopular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-2xl shadow-md flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" /> EN ÇOK TERCİH EDİLEN
              </div>
            )}

            <div className="flex-1 space-y-5">
              <div>
                <h3 className="font-bold text-2xl text-gray-900 mb-1">{pkg.name}</h3>
                <p className="text-[14px] text-gray-600 font-light">{pkg.tagline}</p>
              </div>

              {/* Özellikler Listesi */}
              <div className="space-y-3 border-t border-gray-200/50 pt-5">
                {pkg.features.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="p-0.5 rounded-full bg-emerald-100/50 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </div>
                    <span className="text-[14px] text-gray-800 leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fiyat ve Aksiyon Alanı */}
            <div className="mt-8 pt-5 border-t border-gray-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-gray-500 block uppercase font-bold tracking-wider mb-0.5">Paket Tutarı</span>
                <span className="font-bold text-3xl text-gray-900 tracking-tight">
                  {pkg.price.toLocaleString('tr-TR')} <span className="text-xl text-gray-500 font-medium">₺</span>
                </span>
              </div>

              <button
                onClick={onOpenOfferModal}
                className="group w-full sm:w-auto bg-gray-900 hover:bg-black text-white text-[13px] font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:animate-pulse" /> 
                Teklif İsteyin
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};