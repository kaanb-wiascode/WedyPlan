'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Star, Camera, Edit3 } from 'lucide-react';
import { VendorProfileData } from '@/types/vendor-profile';

interface ProfileHeaderCardProps {
  profile: VendorProfileData;
}

export const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({ profile }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white/60 backdrop-blur-3xl border border-white/90 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      <div className="relative h-48 sm:h-64 w-full bg-slate-100">
        <img
          src={profile.coverImageUrl}
          alt={profile.companyName}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold text-[#1D1D1F] border border-white flex items-center gap-1.5 cursor-pointer hover:bg-white transition">
          <Camera className="w-3.5 h-3.5 text-[#D4AF37]" /> Kapak Fotoğrafını Değiştir
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold bg-[#D4AF37]/15 text-[#D4AF37] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                {profile.category}
              </span>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-200">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {profile.rating} ({profile.reviewCount} Değerlendirme)
              </span>
            </div>
            <h2 className="font-serif font-semibold text-[24px] text-[#1D1D1F]">{profile.companyName}</h2>
          </div>

          <button className="text-[12px] font-bold text-[#1D1D1F] bg-white/90 hover:bg-white px-4 py-2 rounded-full border border-white shadow-sm transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer">
            <Edit3 className="w-4 h-4 text-[#D4AF37]" /> Profili Düzenle
          </button>
        </div>

        <p className="text-[13px] text-[#6E6E73] leading-relaxed">{profile.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px] text-[#6E6E73] pt-2">
          <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#D4AF37]" /> {profile.city}</div>
          <div className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-[#D4AF37]" /> {profile.phone}</div>
          <div className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-[#D4AF37]" /> {profile.email}</div>
        </div>
      </div>
    </motion.div>
  );
};