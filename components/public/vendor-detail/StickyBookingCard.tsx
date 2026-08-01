'use client';

import React from 'react';
import { Sparkles, Calendar, ShieldCheck, Clock } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface StickyBookingCardProps {
  startingPrice: number;
  onOpenOfferModal: () => void;
}

export const StickyBookingCard: React.FC<StickyBookingCardProps> = ({ startingPrice, onOpenOfferModal }) => {
  return (
    <div className="sticky top-32 z-40">
      <GlassCard className="p-6 md:p-8 border-white/60 bg-white/70 shadow-2xl" hoverEffect>
        
        {/* Fiyat Alanı */}
        <div className="mb-6 pb-6 border-b border-gray-200/60">
          <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Başlangıç Fiyatı
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-gray-900 tracking-tight">
              {startingPrice ? startingPrice.toLocaleString('tr-TR') : 'Fiyat Sorun'}
            </span>
            {startingPrice && <span className="text-xl font-medium text-gray-500">₺</span>}
          </div>
        </div>

        {/* Aksiyon Butonu */}
        <button
          onClick={onOpenOfferModal}
          className="group w-full bg-[#E6007E] hover:bg-[#c5006b] text-white text-[15px] font-bold px-6 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-white/90 group-hover:animate-pulse" /> 
          Ücretsiz Fiyat Teklifi Al
        </button>

        {/* Güven Verici Özellikler (Trust Badges) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="font-medium">WedyPlan Onaylı Firma</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <span className="font-medium">Ort. 2 saat içinde yanıtlar</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <span className="font-medium">2027 Takvimi Açık</span>
          </div>
        </div>

      </GlassCard>
    </div>
  );
};