'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Heart, Sparkles, ArrowRight, Layers } from 'lucide-react';
import { VendorListingItem } from '@/types/vendor-listing';
import GlassCard from '@/components/shared/ui/GlassCard';

interface VendorListingCardProps {
  vendor: VendorListingItem;
  isCompared: boolean;
  onToggleCompare: (vendor: VendorListingItem) => void;
  isSaved: boolean;
  onToggleSave: (vendorId: string) => void;
}

export const VendorListingCard: React.FC<VendorListingCardProps> = ({
  vendor,
  isCompared,
  onToggleCompare,
  isSaved,
  onToggleSave
}) => {
  return (
    <GlassCard
      hoverEffect
      className={`group flex flex-col justify-between h-full overflow-hidden ${
        isCompared ? 'border-[#0071e3]/50 ring-2 ring-[#0071e3]/20' : 'border-white/60'
      }`}
    >
      <div>
        {/* Fotoğraf Alanı */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          <Image
            src={vendor.imageUrl || '/assets/placeholder-vendor.jpg'}
            alt={vendor.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

          {/* Sol Üst: Badge'ler */}
          <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
            {vendor.aiMatchScore && (
              <span className="text-[11px] font-bold bg-gradient-to-r from-[#0071e3] to-purple-600 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> %{vendor.aiMatchScore} AI Uyumu
              </span>
            )}
            {vendor.isVerified && (
              <span className="text-[10px] font-bold bg-white/90 backdrop-blur-md text-emerald-700 px-2.5 py-1 rounded-full shadow-sm">
                ✓ Onaylı Firma
              </span>
            )}
          </div>

          {/* Sağ Üst: Favori Butonu */}
          <button
            onClick={(e) => { e.preventDefault(); onToggleSave(vendor.id); }}
            className="absolute top-4 right-4 p-2.5 bg-white/50 hover:bg-white/90 backdrop-blur-md rounded-full transition-all cursor-pointer shadow-sm z-10"
          >
            <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-[#0071e3] text-[#0071e3]' : 'text-gray-900'}`} />
          </button>

          {/* Sağ Alt: Puan */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[12px] font-bold text-gray-900 shadow-sm flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> 
            {vendor.rating} <span className="text-[10px] text-gray-500 font-medium">({vendor.reviewCount})</span>
          </div>
        </div>

        {/* İçerik Alanı */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#0071e3] uppercase tracking-wider">{vendor.category}</span>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
              vendor.isAvailable
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700'
            }`}>
              {vendor.isAvailable ? '⚡ Müsait' : 'Takvimi Dolu'}
            </span>
          </div>

          <Link href={`/firmalar/${vendor.id}`}>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0071e3] transition-colors line-clamp-1">
              {vendor.name}
            </h3>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-[13px] text-gray-600 font-medium">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gray-400" /> {vendor.district}, {vendor.city}</span>
            {vendor.capacity > 0 && <span className="flex items-center gap-1">• Kapasite: {vendor.capacity}</span>}
          </div>

          {/* Etiketler (Tags) */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {vendor.tags?.slice(0, 3).map((tag: string, idx: number) => (
              <span key={idx} className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
                {tag}
              </span>
            ))}
            {vendor.tags?.length > 3 && (
              <span className="text-[11px] font-medium text-gray-400 px-1 py-1">+{vendor.tags.length - 3}</span>
            )}
          </div>
        </div>
      </div>

      {/* Kart Altı (Footer) - Fiyat ve Butonlar */}
      <div className="p-5 pt-4 border-t border-gray-100 flex items-center justify-between mt-auto bg-gray-50/50">
        <div>
          <span className="text-[10px] text-gray-500 block font-bold uppercase mb-0.5">Başlangıç Fiyatı</span>
          <span className="font-bold text-[18px] text-gray-900">
            {vendor.startingPrice ? `${vendor.startingPrice.toLocaleString('tr-TR')} ₺` : 'Fiyat Sorun'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleCompare(vendor)}
            title="Karşılaştır"
            className={`p-2.5 rounded-xl transition-all ${
              isCompared ? 'bg-[#0071e3] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>

          <Link
            href={`/firmalar/${vendor.id}`}
            className="bg-[#1D1D1F] hover:bg-black text-white text-[13px] font-bold px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-1.5"
          >
            <span>İncele</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </GlassCard>
  );
};