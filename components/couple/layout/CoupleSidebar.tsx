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
} from 'lucide-react';

const menuItems = [
  { name: 'Genel Bakış', href: '/cift/dashboard', icon: LayoutDashboard },
  { name: 'AI Düğün Asistanı', href: '/cift/ai-asistan', icon: Sparkles, badge: 'AI' },
  { name: 'Bütçe Yönetimi', href: '/cift/butce', icon: Wallet },
  { name: 'Görevler & Adımlar', href: '/cift/gorevler', icon: CheckSquare },
  { name: 'Davetli Listesi & LCV', href: '/cift/davetliler', icon: Users },
  { name: 'Anlaşmalı Firmalarım', href: '/cift/firmalarim', icon: Building2 },
  { name: 'Dijital Davetiye', href: '/cift/dijital-davetiye', icon: Mail },
  { name: 'Mesajlar & Teklifler', href: '/cift/messages', icon: MessageSquare },
  { name: 'Ödemeler & Taksitler', href: '/cift/odeme', icon: CreditCard },
  { name: 'Hesap Ayarları', href: '/cift/settings', icon: Settings },
];

export function CoupleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl flex flex-col justify-between min-h-screen sticky top-0 transition-colors z-30">
      <div className="p-6 space-y-8">
        {/* Özel Çift Portalı Logosu */}
        <Link href="/cift/dashboard" className="flex items-center gap-3 px-2 group">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src="/assets/branding/logo-couple.svg"
              alt="WedyPlan Çift Portalı"
              fill
              className="object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg tracking-tight text-zinc-900 dark:text-white leading-none">
              WedyPlan
            </span>
            <span className="text-[10px] font-semibold text-rose-500 uppercase tracking-widest mt-1">
              Çift Portalı
            </span>
          </div>
        </Link>

        {/* Navigasyon Menüsü */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold border border-rose-500/20'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-rose-500' : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge ? (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-rose-500 text-white uppercase tracking-wider">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100 text-rose-500' : 'text-zinc-400'}`} />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profil Kartı ve Çıkış */}
      <div className="p-4 m-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/80 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
            E&M
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
              Eda & Mert
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
              Düğün: 15 Eylül 2026
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/giris';
          }}
          className="w-full py-2 px-3 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Oturumu Kapat</span>
        </button>
      </div>
    </aside>
  );
}

export default CoupleSidebar;