'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShieldCheck } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="border-t border-white/80 bg-white/40 backdrop-blur-2xl mt-20 pt-16 pb-12 px-6 sm:px-8 text-[#1D1D1F]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-black/5">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E6007E] flex items-center justify-center text-white">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <span className="font-serif font-bold text-[20px] text-[#1D1D1F]">WedyPlan</span>
          </div>

          <p className="text-[13px] text-[#6E6E73] font-light max-w-sm leading-relaxed">
            AI Powered Wedding Commerce Operating System. Çiftler ve işletmeler için tasarlanmış yeni nesil akıllı düğün platformu.
          </p>

          <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> WedyPlan Güvenli Ekosistem
          </div>
        </div>

        {/* Portal Links */}
        <div className="space-y-3">
          <h4 className="font-bold text-[13px] text-[#1D1D1F] uppercase tracking-wider">Portallar</h4>
          <ul className="space-y-2 text-[13px] text-[#6E6E73]">
            <li><Link href="/cift" className="hover:text-[#E6007E] transition">Çift Paneli</Link></li>
            <li><Link href="/firma-katil" className="hover:text-[#E6007E] transition">Firma Paneli (WOS)</Link></li>
            <li><Link href="/admin" className="hover:text-[#E6007E] transition">System Admin</Link></li>
          </ul>
        </div>

        {/* Directory Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-[13px] text-[#1D1D1F] uppercase tracking-wider">Kategoriler</h4>
          <ul className="space-y-2 text-[13px] text-[#6E6E73]">
            <li><Link href="/firmalar?category=dugun-salonlari" className="hover:text-[#E6007E] transition">Düğün Salonları</Link></li>
            <li><Link href="/firmalar?category=fotografcilar" className="hover:text-[#E6007E] transition">Fotoğrafçılar</Link></li>
            <li><Link href="/firmalar?category=gelinlik" className="hover:text-[#E6007E] transition">Gelinlik & Moda</Link></li>
          </ul>
        </div>

        {/* Legal & Corporate */}
        <div className="space-y-3">
          <h4 className="font-bold text-[13px] text-[#1D1D1F] uppercase tracking-wider">Kurumsal</h4>
          <ul className="space-y-2 text-[13px] text-[#6E6E73]">
            <li><span className="hover:text-[#E6007E] transition cursor-pointer">Gizlilik Politikası</span></li>
            <li><span className="hover:text-[#E6007E] transition cursor-pointer">Kullanım Koşulları</span></li>
            <li><span className="hover:text-[#E6007E] transition cursor-pointer">İletişim & Destek</span></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#86868B] gap-4">
        <p>© 2026 WedyPlan Inc. Tüm Hakları Saklıdır.</p>
        <p className="font-serif italic text-[#1D1D1F]">Engineered with Liquid Glass Architecture</p>
      </div>
    </footer>
  );
};