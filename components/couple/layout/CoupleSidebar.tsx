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
    <aside className="w-72 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl flex flex-col justify-between min-h-screen sticky top-0 transition-all z-30 shadow-xs">
      <div className="p-6 space-y-8">
        
        <Link href="/cift/dashboard" className="block px-2 group">
          <div className="relative w-48 h-12">
            <Image
              src="/assets/branding/logo-couple.svg"
              alt="WedyPlan Çift Portalı"
              fill
              className="object-contain object-left transition-opacity group-hover:opacity-80"
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
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all group ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white dark:text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge ? (
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-wider ${isActive ? 'bg-white/20 text-white dark:bg-black/20 dark:text-zinc-900' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}>
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className={`w-3.5 h-3.5 transition-all ${isActive ? 'opacity-80 translate-x-0.5' : 'opacity-0 group-hover:opacity-100 text-zinc-400'}`} />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 m-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md space-y-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold flex items-center justify-center shadow-xs shrink-0">
            {initials}
          </div>
          <div className="flex flex-col truncate min-w-0">
            <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">
              {profile.partnerOneName} & {profile.partnerTwoName}
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1 truncate mt-0.5">
              <Calendar className="w-2.5 h-2.5 shrink-0 text-zinc-400" /> {formatDate(profile.weddingDate)}
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            document.cookie = 'wedyplan_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            window.location.href = '/giris';
          }}
          className="w-full py-2 px-3 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-all flex items-center justify-center gap-2 border border-transparent cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Oturumu Kapat</span>
        </button>
      </div>
    </aside>
  );
}

export default CoupleSidebar;