'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Star, MapPin } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface SimilarVendor {
  id: string;
  name?: string;
  companyName?: string;
  category: string;
  rating: number;
  location?: string;
  city?: string; // TS Hatasını çözen ekleme
  district?: string;
  imageUrl?: string;
  coverImages?: string[];
}

interface SimilarVendorsGridProps {
  similarVendors?: SimilarVendor[];
}

export const SimilarVendorsGrid: React.FC<SimilarVendorsGridProps> = ({ similarVendors = [] }) => {
  if (!similarVendors.length) return null;

  return (
    <section className="space-y-6 pt-8 border-t border-gray-200/50">
      <div className="flex items-center gap-2 px-2">
        <Users className="w-6 h-6 text-gray-900" />
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Benzer Firmalar</h2>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar">
        {similarVendors.map((vendor, idx) => {
          const displayName = vendor.name || vendor.companyName;
          const displayImage = vendor.imageUrl || (vendor.coverImages && vendor.coverImages[0]) || '/assets/placeholder-vendor.jpg';
          const displayLocation = vendor.location || [vendor.district, vendor.city].filter(Boolean).join(', ');

          return (
            <Link key={vendor.id || idx} href={`/firmalar/${vendor.id || idx}`} className="snap-start shrink-0 w-[260px]">
              <GlassCard hoverEffect className="h-full border-white/60 p-3">
                <div className="relative h-36 w-full rounded-xl overflow-hidden mb-4">
                  <Image 
                    src={displayImage} 
                    alt={displayName || 'Firma'} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-[11px] font-bold">{vendor.rating}</span>
                  </div>
                </div>
                
                <div className="px-1">
                  <span className="text-[10px] font-bold text-[#0071e3] uppercase tracking-wider block mb-1">
                    {vendor.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mb-1 truncate">{displayName}</h3>
                  <div className="flex items-center text-[12px] text-gray-500">
                    <MapPin className="w-3 h-3 mr-1 shrink-0" />
                    <span className="truncate">{displayLocation}</span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </section>
  );
};