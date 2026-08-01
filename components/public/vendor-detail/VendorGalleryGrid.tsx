'use client';

import React from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface VendorGalleryGridProps {
  coverImages?: string[];
}

export const VendorGalleryGrid: React.FC<VendorGalleryGridProps> = ({ coverImages = [] }) => {
  if (!coverImages.length) return null;

  // Sadece ilk 5 görseli gösterelim ki bento grid estetiği bozulmasın
  const displayImages = coverImages.slice(0, 5);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-gray-900" />
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Galeri</h2>
        </div>
        {coverImages.length > 5 && (
          <button className="text-sm font-semibold text-[#E6007E] hover:underline">
            Tümünü Gör ({coverImages.length})
          </button>
        )}
      </div>

      <GlassCard className="p-2 md:p-3 border-white/40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 h-[400px] md:h-[500px]">
          {displayImages.map((src, idx) => {
            // Bento düzeni: İlk görseli büyük yapıyoruz
            const isFeatured = idx === 0;
            return (
              <div 
                key={idx} 
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                  isFeatured ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                }`}
              >
                <Image
                  src={src}
                  alt={`Galeri Görseli ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            );
          })}
        </div>
      </GlassCard>
    </section>
  );
};