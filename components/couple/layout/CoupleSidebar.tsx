'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { getCoupleSettings } from '@/lib/actions/settings';
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
  Calendar
} from 'lucide-react';

const menuItems = [
  { name: 'Genel Bakış', href: '/cift/dashboard', icon: LayoutDashboard },
  { name: 'AI Düğün Asistanı', href: '/cift/ai-asistan', icon: Sparkles, badge: 'AI' },
  { name: 'Bütçe Planlayıcı', href: '/cift/butce', icon: Wallet },
  { name: 'Görev & Adımlar', href: '/cift/gorevler', icon: CheckSquare },
  { name: 'Davetli & LCV Takibi', href: '/cift/davetliler', icon: Users },
  { name: 'Anlaşmalı Firmalar', href: '/cift/firmalar', icon: Building2 },
  { name: 'Dijital Davetiye', href: '/cift/dijital-davetiye', icon: Mail },
  { name: 'Mesajlar & Teklifler', href: '/cift/messages', icon: MessageSquare },
  { name: 'Ödeme Planı', href: '/cift/odeme', icon: CreditCard },
  { name: 'Hesap Ayarları', href: '/cift/ayarlar', icon: Settings },
];

export function CoupleSidebar() {
  const pathname = usePathname();

  const [profile, setProfile] = useState({
    partnerOneName: 'Sadi',
    partnerTwoName: 'Hamiyet',
    weddingDate: '2026-08-15',
  });

  const syncProfileData = async () => {
    try {
      const localData = localStorage.getItem('wedyplan_couple_profile');
      if (localData) {
        const parsed = JSON.parse(localData);
        if (parsed.partnerOneName || parsed.partnerTwoName) {
          setProfile({
            partnerOneName: parsed.partnerOneName || 'Sadi',
            partnerTwoName: parsed.partnerTwoName || 'Hamiyet',
            weddingDate: parsed.weddingDate || '2026-08-15',
          });
        }
      }
    } catch (e) {}

    const res = await getCoupleSettings();
    if (res.success && res.data?.profile) {
      setProfile({
        partnerOneName: res.data.profile.partnerOneName || 'Sadi',
        partnerTwoName: res.data.profile.partnerTwoName || 'Hamiyet',
        weddingDate: res.data.profile.weddingDate || '2026-08-15',
      });
    }
  };

  useEffect(() => {
    syncProfileData();

    const handleProfileUpdate = () => {
      syncProfileData();
    };

    window.addEventListener('wedyplan_profile_updated', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate);

    return () => {
      window.removeEventListener('wedyplan_profile_updated', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, [pathname]);

  const pOne = profile.partnerOneName || 'S';
  const pTwo = profile.partnerTwoName || 'H';
  const initials = `${pOne[0].toUpperCase()}&${pTwo[0].toUpperCase()}`;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Tarih Belirtilmedi';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <aside className="w-72 border-r border-rose-100/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl flex flex-col justify-between min-h-screen sticky top-0 transition-all z-30 shadow-xs">
      <div className="p-6 space-y-8">
        
        <Link href="/cift/dashboard" className="block px-2 group">
          <div className="relative w-48 h-12">
            <Image
              src="/assets/branding/logo-couple.svg"
              alt="WedyPlan Çift Portalı"
              fill
              className="object-contain object-left transition-transform group-hover:scale-102"
              priority
            />
          </div>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
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

      <div className="p-4 m-4 rounded-2xl bg-gradient-to-b from-rose-50/40 to-white/60 dark:from-zinc-900/60 dark:to-zinc-900/30 border border-rose-100 dark:border-zinc-800/80 backdrop-blur-md space-y-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-400 to-rose-600 flex items-center justify-center text-white text-xs font-bold shadow-xs ring-2 ring-white dark:ring-zinc-800 shrink-0">
            {initials}
          </div>
          <div className="flex flex-col truncate min-w-0">
            <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">
              {profile.partnerOneName} & {profile.partnerTwoName}
            </span>
            <span className="text-[10px] text-rose-500/90 font-medium flex items-center gap-1 truncate mt-0.5">
              <Calendar className="w-2.5 h-2.5 shrink-0" /> {formatDate(profile.weddingDate)}
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/giris';
          }}
          className="w-full py-2 px-3 rounded-xl text-xs font-medium text-zinc-600 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all flex items-center justify-center gap-2 border border-transparent hover:border-rose-200/50 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Oturumu Kapat</span>
        </button>
      </div>
    </aside>
  );
}

export default CoupleSidebar;