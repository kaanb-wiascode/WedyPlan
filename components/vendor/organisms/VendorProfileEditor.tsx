'use client';

import React, { useState } from 'react';
import { INITIAL_VENDOR_PROFILE } from '@/lib/vendor-profile-constants';
import { VendorProfileData, VendorPackage } from '@/types/vendor-profile';
import { ProfileHeaderCard } from '@/components/vendor/molecules/ProfileHeaderCard';
import { Check, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';

export const VendorProfileEditor: React.FC = () => {
  const [profile] = useState<VendorProfileData>(INITIAL_VENDOR_PROFILE);

  return (
    <div className="space-y-8">
      {/* Profil Header Kartı */}
      <ProfileHeaderCard profile={profile} />

      {/* WedyAI Vitrin Skor Kartı */}
      <div className="p-4 bg-gradient-to-r from-emerald-500/10 via-white/80 to-white/40 border border-emerald-200 rounded-[24px] backdrop-blur-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-sm shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-[15px] text-[#1D1D1F]">WedyAI Pazaryeri Vitrin Skoru</h4>
            <p className="text-[12px] text-[#6E6E73]">
              Vitrin doluluk oranınız <strong className="text-emerald-700">%92</strong> seviyesinde. Yüksek kaliteli görseller ve detaylı paket fiyatları çift tıklanma oranınızı <strong className="text-[#1D1D1F]">%35 artırır</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Paketler & Hizmet İçerikleri */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <div>
            <h3 className="font-serif text-[20px] font-semibold text-[#1D1D1F]">Düğün Paketleri & Fiyatlandırma</h3>
            <p className="text-[12px] text-[#6E6E73]">Çiftlerin pazaryerinde inceleyebileceği hizmet paketleri.</p>
          </div>

          <button className="text-[12px] font-bold text-[#1D1D1F] bg-white/90 hover:bg-white px-4 py-2 rounded-full border border-white shadow-sm transition flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-4 h-4 text-[#D4AF37]" /> Yeni Paket Ekle
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.packages.map((pkg: VendorPackage) => (
            <div
              key={pkg.id}
              className={`bg-white/60 backdrop-blur-3xl p-6 rounded-[24px] border space-y-4 flex flex-col justify-between ${
                pkg.isPopular ? 'border-[#D4AF37] shadow-md bg-amber-50/10' : 'border-white/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-[18px] text-[#1D1D1F]">{pkg.name}</h4>
                  {pkg.isPopular && (
                    <span className="text-[10px] font-bold bg-[#D4AF37] text-white px-2.5 py-0.5 rounded-full">
                      🌟 Çiftlerin Favorisi
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-[#6E6E73] mb-4">{pkg.description}</p>

                <div className="space-y-2 border-t border-black/5 pt-3">
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[12px] text-[#1D1D1F]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#86868B] block">Başlangıç Fiyatı</span>
                  <span className="font-serif font-bold text-[20px] text-[#1D1D1F]">
                    {pkg.price.toLocaleString('tr-TR')} ₺
                  </span>
                </div>

                <button className="text-[11px] font-bold text-[#1D1D1F] bg-white hover:bg-black/5 px-3.5 py-1.5 rounded-full border border-black/10 transition cursor-pointer">
                  Paketi Düzenle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Galeri Görselleri */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <div>
            <h3 className="font-serif text-[20px] font-semibold text-[#1D1D1F]">Saha & Mekan Galerisi</h3>
            <p className="text-[12px] text-[#6E6E73]">Çiftlerin mekanınızı 360° keşfetmesini sağlayan yüksek çözünürlüklü fotoğraflar.</p>
          </div>

          <button className="text-[12px] font-bold text-[#1D1D1F] bg-white/90 hover:bg-white px-4 py-2 rounded-full border border-white shadow-sm transition flex items-center gap-1.5 cursor-pointer">
            <ImageIcon className="w-4 h-4 text-[#D4AF37]" /> Fotoğraf Yükle
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {profile.galleryImages.map((img, index) => (
            <div key={index} className="relative h-44 rounded-[20px] overflow-hidden group border border-white">
              <img src={img} alt={`Galeri ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};