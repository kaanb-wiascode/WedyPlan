'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Wallet,
  CheckSquare,
  Users,
  Building2,
  Mail,
  Sparkles,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Heart,
  Calendar
} from 'lucide-react';

const menuItems = [
  { name: 'Genel Bakış', href: '/cift/dashboard', icon: LayoutDashboard },
  { name: 'AI Düğün Asistanı', href: '/cift/ai-asistan', icon: Sparkles, badge: 'AI' },
  { name: 'Bütçe Planlayıcı', href: '/cift/butce', icon: Wallet },
  { name: 'Görev & Adımlar', href: '/cift/gorevler', icon: CheckSquare },
  { name: 'Davetli & LCV Takibi', href: '/cift/davetliler', icon: Users },
  { name: 'Anlaşmalı Firmalar', href: '/cift/firmalarim', icon: Building2 },
  { name: 'Dijital Davetiye', href: '/cift/dijital-davetiye', icon: Mail },
  { name: 'Mesajlar & Teklifler', href: '/cift/messages', icon: MessageSquare },
  { name: 'Ödeme Planı', href: '/cift/odeme', icon: CreditCard },
  { name: 'Hesap Ayarları', href: '/cift/settings', icon: Settings },
];

export function CoupleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-rose-100/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl flex flex-col justify-between min-h-screen sticky top-0 transition-all z-30 shadow-sm">
      <div className="p-6 space-y-8">
        
        {/* Özel Çift Portalı Logosu */}
        <Link href="/cift/dashboard" className="flex items-center gap-3 px-2 group">
          <div className="relative w-10 h-10 shrink-0 p-1 rounded-2xl bg-gradient-to-tr from-rose-50 to-rose-100/80 dark:from-zinc-900 dark:to-zinc-800 border border-rose-200/50 dark:border-zinc-700/50 shadow-sm">
            <Image
              src="/assets/branding/logo-couple.svg"
              alt="WedyPlan Çift Portalı"
              fill
              className="object-contain p-1.5 transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg tracking-tight text-zinc-900 dark:text-white leading-none">
              WedyPlan
            </span>
            <span className="text-[10px] font-semibold text-rose-500 uppercase tracking-widest mt-1 flex items-center gap-1">
              <Heart className="w-2.5 h-2.5 fill-rose-500" /> Çift Portalı
            </span>
          </div>
        </Link>

        {/* Navigasyon Menüsü */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold border border-rose-200/60 dark:border-rose-900/30 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-rose-50/50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-rose-500' : 'text-zinc-400 group-hover:text-rose-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge ? (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-rose-500 text-white uppercase tracking-wider shadow-xs">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className={`w-3.5 h-3.5 transition-all ${isActive ? 'opacity-100 text-rose-500 translate-x-0.5' : 'opacity-0 group-hover:opacity-100 text-zinc-400'}`} />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profil Alt Kartı */}
      <div className="p-4 m-4 rounded-2xl bg-gradient-to-b from-rose-50/40 to-white/60 dark:from-zinc-900/60 dark:to-zinc-900/30 border border-rose-100 dark:border-zinc-800/80 backdrop-blur-md space-y-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-400 to-rose-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm ring-2 ring-white dark:ring-zinc-800">
            E&M
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
              Eda & Mert
            </span>
            <span className="text-[10px] text-rose-500/90 font-medium flex items-center gap-1 truncate">
              <Calendar className="w-2.5 h-2.5" /> 15 Eylül 2026
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/giris';
          }}
          className="w-full py-2 px-3 rounded-xl text-xs font-medium text-zinc-600 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all flex items-center justify-center gap-2 border border-transparent hover:border-rose-200/50"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Oturumu Kapat</span>
        </button>
      </div>
    </aside>
  );
}

export default CoupleSidebar;