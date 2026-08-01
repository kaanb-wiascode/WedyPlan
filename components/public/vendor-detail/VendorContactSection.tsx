'use client';

import React from 'react';
import { Phone, Mail, MapPin, Globe, AtSign } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface VendorContactSectionProps {
  vendor: {
    phone?: string;
    email?: string;
    website?: string;
    instagram?: string;
    fullAddress?: string;
  };
}

export const VendorContactSection: React.FC<VendorContactSectionProps> = ({ vendor }) => {
  return (
    <section className="space-y-6 pt-6 border-t border-gray-200/50">
      <div className="flex items-center gap-2 px-2">
        <MapPin className="w-6 h-6 text-gray-900" />
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">İletişim & Konum</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Telefon */}
        {vendor.phone && (
          <GlassCard className="p-5 flex flex-col items-center justify-center text-center border-white/60" hoverEffect>
            <div className="p-3 bg-emerald-50 rounded-full mb-3">
              <Phone className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Telefon</span>
            <a href={`tel:${vendor.phone}`} className="text-[14px] font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
              {vendor.phone}
            </a>
          </GlassCard>
        )}

        {/* E-Posta */}
        {vendor.email && (
          <GlassCard className="p-5 flex flex-col items-center justify-center text-center border-white/60" hoverEffect>
            <div className="p-3 bg-blue-50 rounded-full mb-3">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">E-Posta</span>
            <a href={`mailto:${vendor.email}`} className="text-[14px] font-semibold text-gray-900 hover:text-blue-600 transition-colors truncate w-full">
              {vendor.email}
            </a>
          </GlassCard>
        )}

        {/* Sosyal Medya (Instagram yerine AtSign kullanıldı) */}
        {vendor.instagram && (
          <GlassCard className="p-5 flex flex-col items-center justify-center text-center border-white/60" hoverEffect>
            <div className="p-3 bg-pink-50 rounded-full mb-3">
              <AtSign className="w-5 h-5 text-pink-600" />
            </div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Instagram</span>
            <a href={`https://instagram.com/${vendor.instagram}`} target="_blank" rel="noreferrer" className="text-[14px] font-semibold text-gray-900 hover:text-pink-600 transition-colors truncate w-full">
              @{vendor.instagram}
            </a>
          </GlassCard>
        )}

        {/* Web Sitesi */}
        {vendor.website && (
          <GlassCard className="p-5 flex flex-col items-center justify-center text-center border-white/60" hoverEffect>
            <div className="p-3 bg-purple-50 rounded-full mb-3">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Web Sitesi</span>
            <a href={vendor.website} target="_blank" rel="noreferrer" className="text-[14px] font-semibold text-gray-900 hover:text-purple-600 transition-colors truncate w-full">
              Ziyaret Et
            </a>
          </GlassCard>
        )}

        {/* Tam Adres (Tam Genişlik) */}
        {vendor.fullAddress && (
          <GlassCard className="col-span-2 md:col-span-4 p-5 flex items-center justify-between border-white/60" hoverEffect>
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Açık Adres</span>
              <p className="text-[14px] text-gray-800 font-medium">{vendor.fullAddress}</p>
            </div>
            <button className="shrink-0 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg transition-colors">
              Haritada Aç
            </button>
          </GlassCard>
        )}

      </div>
    </section>
  );
};