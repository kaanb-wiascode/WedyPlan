'use client';

import React from 'react';
import { MapPin, Phone, Mail, Camera } from 'lucide-react';
import { VendorDetailFull } from '@/types/vendor-detail-page';

interface VendorContactSectionProps {
  vendor: VendorDetailFull;
}

export const VendorContactSection: React.FC<VendorContactSectionProps> = ({ vendor }) => {
  return (
    <div className="bg-white/50 backdrop-blur-3xl border border-white/90 p-8 rounded-[36px] space-y-6">
      <h3 className="font-serif font-bold text-[22px] text-[#1D1D1F]">İletişim & Adres Bilgileri</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] text-[#1D1D1F]">
        <div className="flex items-center gap-3 p-3.5 bg-white/80 rounded-2xl border border-white shadow-xs">
          <MapPin className="w-5 h-5 text-[#E6007E] shrink-0" />
          <span>{vendor.address}</span>
        </div>
        <div className="flex items-center gap-3 p-3.5 bg-white/80 rounded-2xl border border-white shadow-xs">
          <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{vendor.phone}</span>
        </div>
        <div className="flex items-center gap-3 p-3.5 bg-white/80 rounded-2xl border border-white shadow-xs">
          <Mail className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{vendor.email}</span>
        </div>
        <div className="flex items-center gap-3 p-3.5 bg-white/80 rounded-2xl border border-white shadow-xs">
          <Camera className="w-5 h-5 text-pink-600 shrink-0" />
          <a href={vendor.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#E6007E] transition-colors font-semibold">
            Instagram Sayfası
          </a>
        </div>
      </div>
    </div>
  );
};