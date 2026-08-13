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
  Calendar,
  Camera
} from 'lucide-react';
import { SidebarPortalSwitcher } from '@/components/shared/layout/SidebarPortalSwitcher';

const menuItems = [
  { name: 'Genel bakış', href: '/cift/dashboard', icon: LayoutDashboard },
  { name: 'AI asistan', href: '/cift/ai-asistan', icon: Sparkles, badge: 'AI' },
  { name: 'Bütçe', href: '/cift/butce', icon: Wallet },
  { name: 'Görevler', href: '/cift/gorevler', icon: CheckSquare },
  { name: 'Davetliler', href: '/cift/davetliler', icon: Users },
  { name: 'Firmalar', href: '/cift/firmalar', icon: Building2 },
  { name: 'Davetiye', href: '/cift/dijital-davetiye', icon: Mail },
  { name: 'Fotoğraf duvarı', href: '/cift/fotograf-duvari', icon: Camera },
  { name: 'Mesajlar', href: '/cift/messages', icon: MessageSquare },
  { name: 'Ödeme', href: '/cift/odeme', icon: CreditCard },
  { name: 'Ayarlar', href: '/cift/ayarlar', icon: Settings },
];

export function CoupleSidebar() {
  const pathname = usePathname();

  const [profile, setProfile] = useState({
    partnerOneName: '',
    partnerTwoName: '',
    weddingDate: '',
  });

  const syncProfileData = async () => {
    try {
      const localData = localStorage.getItem('wedyplan_couple_profile');
      if (localData) {
        const parsed = JSON.parse(localData);
        if (parsed.partnerOneName || parsed.partnerTwoName) {
          setProfile({
            partnerOneName: parsed.partnerOneName || '',
            partnerTwoName: parsed.partnerTwoName || '',
            weddingDate: parsed.weddingDate || '',
          });
        }
      }
    } catch (e) {}

    const res = await getCoupleSettings();
    if (res.success && res.data?.profile) {
      setProfile({
        partnerOneName: res.data.profile.partnerOneName || '',
        partnerTwoName: res.data.profile.partnerTwoName || '',
        weddingDate: res.data.profile.weddingDate || '',
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

  const pOne = profile.partnerOneName || 'Ç';
  const pTwo = profile.partnerTwoName || '';
  const initials = pTwo ? `${pOne[0]?.toUpperCase()}&${pTwo[0]?.toUpperCase()}` : (pOne[0]?.toUpperCase() || 'Ç');

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
    <aside className="apple-sidebar sticky top-0 z-30 flex h-screen w-60 shrink-0 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4">
        
        <Link href="/cift/dashboard" className="block px-2 group">
          <div className="relative w-40 h-10">
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
                className={`apple-nav-item group ${isActive ? 'apple-nav-item-active' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-[18px] w-[18px] ${isActive ? 'text-[#1d1d1f]' : 'text-[#6e6e73]'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge ? (
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${isActive ? 'bg-black/8 text-[#1d1d1f]' : 'bg-black/5 text-[#6e6e73]'}`}>
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className={`h-3.5 w-3.5 ${isActive ? 'translate-x-0.5 opacity-80' : 'text-[#86868b] opacity-0 group-hover:opacity-100'}`} />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="apple-panel m-3 space-y-3 rounded-2xl p-3.5">
        <SidebarPortalSwitcher fallbackPortal="COUPLE" />
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-xs font-semibold text-white">
            {initials}
          </div>
          <div className="flex min-w-0 flex-col truncate">
            <span className="truncate text-[13px] font-medium text-[#1d1d1f]">
              {profile.partnerTwoName ? `${profile.partnerOneName} & ${profile.partnerTwoName}` : (profile.partnerOneName || 'Çift')}
            </span>
            <span className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-[#86868b]">
              <Calendar className="h-2.5 w-2.5 shrink-0" /> {formatDate(profile.weddingDate)}
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            document.cookie = 'wedyplan_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            window.location.href = '/giris';
          }}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium text-[#6e6e73] hover:bg-black/5 hover:text-[#1d1d1f]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Oturumu Kapat</span>
        </button>
      </div>
    </aside>
  );
}

export default CoupleSidebar;