'use client';

import React from 'react';
import { Globe, X, Check, ExternalLink } from 'lucide-react';
import { DEFAULT_WEBSITE_CONFIG } from '@/lib/couple-command-constants';

export const WeddingWebsiteBuilderModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const config = DEFAULT_WEBSITE_CONFIG;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-3xl border border-white rounded-[36px] max-w-lg w-full p-8 space-y-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-[10px] font-bold text-[#E6007E] bg-pink-50 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" /> Tek Tıkla Düğün Web Sitesi
          </span>
          <h3 className="font-serif font-bold text-[24px] text-[#1D1D1F]">{config.title}</h3>
          <p className="text-[12px] text-[#6E6E73]">Davetlilerinizin RSVP yanıtı verebileceği ve konumu görebileceği özel web siteniz.</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-[20px] border border-slate-200 text-[12px] space-y-2">
          <div className="flex items-center justify-between font-mono font-bold text-[#E6007E]">
            <span>https://{config.slug}.wedyplan.com</span>
            <ExternalLink className="w-4 h-4" />
          </div>
          <p className="text-[#6E6E73] italic">"{config.storyText}"</p>
        </div>

        <button onClick={onClose} className="w-full bg-[#1D1D1F] text-white font-bold text-[12px] py-3.5 rounded-full hover:bg-black transition cursor-pointer">
          Web Sitemi Güncelle & Yayınla
        </button>
      </div>
    </div>
  );
};