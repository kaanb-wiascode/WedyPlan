'use client';

import React from 'react';
import { Video, Play } from 'lucide-react';
import { VendorVideo } from '@/types/vendor-detail-page';

interface VendorMediaSectionProps {
  videos: VendorVideo[];
}

export const VendorMediaSection: React.FC<VendorMediaSectionProps> = ({ videos }) => {
  if (videos.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[#1D1D1F] font-serif font-bold text-[22px]">
        <Video className="w-5 h-5 text-[#E6007E]" />
        <span>4K Tanıtım & Düğün Videoları</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((vid: VendorVideo) => (
          <div key={vid.id} className="relative group rounded-[28px] overflow-hidden bg-black h-48 border border-white/60 cursor-pointer">
            <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/90 text-[#E6007E] flex items-center justify-center group-hover:scale-110 transition shadow-md">
                <Play className="w-5 h-5 fill-[#E6007E] ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-[12px] font-bold">
              <span className="truncate">{vid.title}</span>
              <span className="bg-black/60 px-2 py-0.5 rounded text-[10px]">{vid.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};