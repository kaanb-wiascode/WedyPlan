'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Sparkles,
  Inbox,
  Calendar,
  FileText,
  Wallet,
  Store,
  Star,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  FolderCheck,
  Gem
} from 'lucide-react';
import { SidebarPortalSwitcher } from '@/components/shared/layout/SidebarPortalSwitcher';

const menuItems = [
  { name: 'Genel bakış', href: '/firma/dashboard', icon: LayoutDashboard, feature: null as string | null },
  { name: 'AI asistan', href: '/firma/ai-asistan', icon: Sparkles, badge: 'AI', feature: 'ai_assistant' },
  { name: 'Talepler', href: '/firma/talepler', icon: Inbox, feature: 'leads' },
  { name: 'Takvim', href: '/firma/takvim', icon: Calendar, feature: 'calendar' },
  { name: 'Sözleşmeler', href: '/firma/sozlesmeler', icon: FileText, feature: 'contracts' },
  { name: 'Finans', href: '/firma/finans', icon: Wallet, feature: 'finance' },
  { name: 'Vitrin', href: '/firma/vitrin', icon: Store, feature: 'showcase' },
  { name: 'Yorumlar', href: '/firma/degerlendirmeler', icon: Star, feature: 'reviews' },
  { name: 'Ekip', href: '/firma/organizasyon', icon: Users, feature: 'team' },
  { name: 'Evrak / KYC', href: '/firma/evrak', icon: FolderCheck, feature: null },
  { name: 'Paketler', href: '/firma/paket', icon: Gem, feature: null },
  { name: 'Ayarlar', href: '/firma/ayarlar', icon: Settings, feature: null },
];

export function VendorSidebar() {
  const pathname = usePathname();

  const [vendorProfile, setVendorProfile] = useState({
    companyName: 'Beykoz Secret Garden',
    category: 'Düğün Mekanı',
  });

  const [features, setFeatures] = useState<string[] | null>(null);

  useEffect(() => {
    try {
      const localData = localStorage.getItem('wedyplan_vendor_profile');
      if (localData) {
        const parsed = JSON.parse(localData);
        setVendorProfile({
          companyName: parsed.companyName || 'Beykoz Secret Garden',
          category: parsed.category || 'Düğün Mekanı',
        });
      }
    } catch (e) {}
    fetch('/api/firma/entitlements')
      .then((res) => res.json())
      .then((payload) => {
        if (payload?.data?.features) setFeatures(payload.data.features);
        if (payload?.data?.businessName) {
          setVendorProfile((current) => ({ ...current, companyName: payload.data.businessName }));
        }
      })
      .catch(() => setFeatures([]));
  }, []);

  return (
    <aside className="apple-sidebar sticky top-0 z-40 flex h-screen w-60 shrink-0 flex-col justify-between">
      <div className="space-y-5 overflow-y-auto p-4 scrollbar-none">
        
        {/* Orijinal WedyPlan Firma Logosu */}
        <Link href="/firma/dashboard" className="block px-1 cursor-pointer">
          <div className="flex items-center gap-3">
            <img
              src="/assets/branding/logo-vendor.svg"
              alt="WedyPlan Firma Portalı"
              className="h-8 w-auto object-contain dark:invert"
            />
          </div>
        </Link>

        {/* Menü Linkleri */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            if (item.feature && features && !features.includes(item.feature)) return null;
            const isActive =
              pathname === item.href ||
              (pathname?.startsWith(`${item.href}/`) && item.href !== '/firma/dashboard');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`apple-nav-item group cursor-pointer select-none ${isActive ? 'apple-nav-item-active' : ''}`}
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

      {/* Profil Alt Kutusu */}
      <div className="apple-panel m-3 space-y-3 rounded-2xl p-3.5">
        <SidebarPortalSwitcher fallbackPortal="VENDOR" />
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-xs font-semibold text-white">
            {vendorProfile.companyName[0]}
          </div>
          <div className="flex min-w-0 flex-col truncate">
            <span className="truncate text-[13px] font-medium text-[#1d1d1f]">
              {vendorProfile.companyName}
            </span>
            <span className="mt-0.5 truncate text-[11px] text-[#86868b]">
              {vendorProfile.category}
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

export default VendorSidebar;