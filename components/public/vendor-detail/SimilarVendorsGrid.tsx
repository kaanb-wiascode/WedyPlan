'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';

interface SimilarVendorsGridProps {
  similarVendors: {
    id: string;
    name: string;
    category: string;
    city: string;
    startingPrice: number;
    rating: number;
    imageUrl: string;
  }[];
}

export const SimilarVendorsGrid: React.FC<SimilarVendorsGridProps> = ({ similarVendors }) => {
  if (similarVendors.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-serif font-bold text-[22px] text-[#1D1D1F]">Benzer Müsait Mekanlar</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {similarVendors.map((vendor) => (
          <div key={vendor.id} className="p-4 bg-white/60 backdrop-blur-2xl rounded-[28px] border border-white flex items-center gap-4">
            <img src={vendor.imageUrl} alt={vendor.name} className="w-20 h-20 rounded-[20px] object-cover shrink-0" />
            <div className="space-y-1 flex-1 overflow-hidden">
              <h4 className="font-bold text-[14px] text-[#1D1D1F] truncate">{vendor.name}</h4>
              <span className="text-[11px] text-[#6E6E73] block">{vendor.city} • {vendor.category}</span>
              <span className="font-serif font-bold text-[13px] text-[#1D1D1F] block">{vendor.startingPrice.toLocaleString('tr-TR')} ₺</span>
            </div>
            <Link href={`/firmalar/${vendor.id}`} className="p-2.5 bg-[#1D1D1F] text-white rounded-full hover:bg-black transition">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};