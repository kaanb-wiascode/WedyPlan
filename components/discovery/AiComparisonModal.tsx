'use client';

import React from 'react';
import { Sparkles, X, Check, ArrowRight } from 'lucide-react';
import { DiscoveryVendor } from '@/types/vendor-discovery';

interface AiComparisonModalProps {
  vendors: DiscoveryVendor[];
  onClose: () => void;
}

export const AiComparisonModal: React.FC<AiComparisonModalProps> = ({ vendors, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-3xl border border-white rounded-[36px] max-w-4xl w-full p-8 space-y-6 shadow-2xl relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-500/10 text-[#E6007E] border border-pink-200 rounded-full text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Karar Destek Asistanı
          </div>
          <h3 className="font-serif font-bold text-[24px] text-[#1D1D1F]">
            Seçtiğiniz {vendors.length} Firmanın Karşılaştırması
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {vendors.map((v) => (
            <div key={v.id} className="bg-white/80 p-5 rounded-[24px] border border-white space-y-3">
              <img src={v.imageUrl} alt={v.name} className="w-full h-32 rounded-xl object-cover" />
              <div>
                <span className="text-[10px] font-bold text-[#E6007E] block">%{v.matchScore} Uyumlu</span>
                <h4 className="font-serif font-bold text-[16px] text-[#1D1D1F] mt-0.5">{v.name}</h4>
                <p className="text-[12px] text-[#6E6E73]">{v.district}, {v.city}</p>
              </div>

              <div className="border-t border-black/5 pt-2 text-[12px] space-y-1">
                <div>Başlangıç: <strong className="font-serif font-bold">{v.priceStart.toLocaleString('tr-TR')} ₺</strong></div>
                <div>Kapasite: <strong>{v.capacity} Kişi</strong></div>
                <div>Puan: <strong>⭐ {v.rating}</strong></div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="w-full bg-[#1D1D1F] text-white font-bold text-[12px] py-3.5 rounded-full hover:bg-black transition cursor-pointer">
          Karşılaştırmayı Kapat
        </button>
      </div>
    </div>
  );
};