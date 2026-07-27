'use client';

import React from 'react';
import { Image as ImageIcon, Video, Eye } from 'lucide-react';

interface VendorGalleryGridProps {
  coverImages: string[];
}

export const VendorGalleryGrid: React.FC<VendorGalleryGridProps> = ({ coverImages }) => {
  return (
    <div className="relative rounded-[36px] overflow-hidden bg-[#1D1D1F] border border-white/60 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2 h-[420px] md:h-[480px]">
        {/* Main Photo */}
        <div className="md:col-span-2 h-full relative group overflow-hidden rounded-[28px]">
          <img
            src={coverImages[0]}
            alt="Mekan Ana Görsel"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Secondary Grid */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
          {coverImages.slice(1, 4).map((imgUrl: string, idx: number) => (
            <div key={idx} className="relative group overflow-hidden rounded-[24px] h-full">
              <img
                src={imgUrl}
                alt={`Mekan Görsel ${idx + 2}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </div>
      </div>

      <button className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[12px] font-bold text-[#1D1D1F] border border-white flex items-center gap-2 hover:bg-white transition cursor-pointer shadow-md">
        <ImageIcon className="w-4 h-4 text-[#E6007E]" />
        <span>Tüm Fotoğrafları Gör ({coverImages.length})</span>
      </button>
    </div>
  );
};