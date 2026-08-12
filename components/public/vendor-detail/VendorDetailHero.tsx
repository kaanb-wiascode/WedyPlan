'use client';

import React from 'react';
import Image from 'next/image';
import GlassCard from '@/components/shared/ui/GlassCard';
import { Star, MapPin, Heart, Share2, ChevronRight } from 'lucide-react';

interface VendorDetailHeroProps {
  vendor: any; // Mock datanızdaki tüm varyasyonları kapsaması için any veya esnek tip bırakıyoruz
  onOpenOfferModal: () => void;
}

export const VendorDetailHero: React.FC<VendorDetailHeroProps> = ({ vendor, onOpenOfferModal }) => {
  // Mock data property'lerini güvenli bir şekilde eşleştiriyoruz
  const displayName = vendor.name || vendor.companyName;
  const displayImage = vendor.coverImageUrl || (vendor.coverImages && vendor.coverImages[0]) || '/assets/placeholder-vendor.jpg';
  const displayLocation = vendor.location || [vendor.district, vendor.city].filter(Boolean).join(', ');
  const displayPrice = vendor.priceRange || (vendor.startingPrice ? `${vendor.startingPrice.toLocaleString('tr-TR')} ₺` : 'Fiyat Sorun');

  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-12 lg:pb-16 rounded-3xl overflow-hidden mt-4">
      <div className="absolute inset-0 z-0">
        <Image
          src={displayImage}
          alt={displayName || 'Firma Görseli'}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <GlassCard className="max-w-3xl p-6 md:p-8 text-white border-white/20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/20 rounded-full backdrop-blur-sm">
                  {vendor.category || 'Düğün Mekanı'}
                </span>
                <div className="flex items-center text-yellow-400 text-sm font-medium">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  {vendor.rating} <span className="text-gray-300 ml-1">({vendor.reviewCount} Yorum)</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
                {displayName}
              </h1>
              
              <div className="flex items-center text-gray-200 text-sm md:text-base">
                <MapPin className="w-4 h-4 mr-1.5 opacity-80" />
                {displayLocation}
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="text-left md:text-right">
                <p className="text-sm text-gray-300 mb-0.5">Başlangıç Fiyatı</p>
                <p className="text-2xl font-bold">{displayPrice}</p>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-sm transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={onOpenOfferModal}
                  className="apple-btn apple-btn-inline flex-1 md:flex-none"
                >
                  Teklif İste
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

          </div>
        </GlassCard>
      </div>
    </section>
  );
};