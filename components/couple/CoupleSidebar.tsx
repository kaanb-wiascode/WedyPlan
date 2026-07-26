'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Heart, 
  LayoutDashboard, 
  Wallet, 
  Users, 
  CheckSquare, 
  Store, 
  Sparkles,
  LogOut
} from 'lucide-react';

export const CoupleSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Genel Bakış', href: '/cift', icon: LayoutDashboard },
    { label: 'Bütçe Planlayıcı', href: '/cift/butce', icon: Wallet },
    { label: 'Davetliler & Masalar', href: '/cift/davetliler', icon: Users },
    { label: 'Düğün Görevleri', href: '/cift/gorevler', icon: CheckSquare },
    { label: 'Firmalarım & Favoriler', href: '/cift/firmalarim', icon: Store },
  ];

  return (
    <aside className="w-64 bg-white/40 backdrop-blur-3xl border-r border-white/60 p-6 flex flex-col justify-between hidden md:flex shrink-0 min-h-screen">
      <div className="space-y-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E6007E] to-pink-400 flex items-center justify-center text-white shadow-md shadow-pink-200">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="font-serif font-bold text-[18px] text-[#1D1D1F]">WedyPlan</span>
            <span className="text-[10px] font-semibold text-[#E6007E] block -mt-1">Çift Paneli</span>
          </div>
        </Link>

        {/* Menü Linkleri */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-[#E6007E] border border-pink-200 shadow-sm'
                    : 'text-[#6E6E73] hover:bg-white/50 hover:text-[#1D1D1F]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#E6007E]' : 'text-[#86868B]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* WedyAI Asistan Rozeti */}
      <div className="space-y-3">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-white/50 border border-pink-200/60 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[#E6007E] text-[12px] font-bold mb-1">
            <Sparkles className="w-4 h-4" /> WedyAI Düğün Asistanı
          </div>
          <p className="text-[11px] text-[#6E6E73] leading-relaxed">
            Düğününe 20 gün kaldı! Bütçe ve davetli listen tamamen kontrol altında.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-[12px] font-semibold text-[#86868B] hover:text-rose-600 transition"
        >
          <LogOut className="w-4 h-4" /> Ana Sayfaya Dön
        </Link>
      </div>
    </aside>
  );
};