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
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { name: 'Genel Bakış', href: '/firma/dashboard', icon: LayoutDashboard },
  { name: 'WedyAI Firma Copilot', href: '/firma/ai-asistan', icon: Sparkles, badge: 'AI' },
  { name: 'Talepler & CRM', href: '/firma/talepler', icon: Inbox },
  { name: 'Takvim & Randevular', href: '/firma/takvim', icon: Calendar },
  { name: 'Teklif & Sözleşmeler', href: '/firma/sozlesmeler', icon: FileText },
  { name: 'Finans & Hakedişler', href: '/firma/finans', icon: Wallet },
  { name: 'Vitrin & Medya', href: '/firma/vitrin', icon: Store },
  { name: 'Yorumlar & İtibar', href: '/firma/degerlendirmeler', icon: Star },
  { name: 'Ekip & Operasyon', href: '/firma/organizasyon', icon: Users },
  { name: 'Firma Ayarları', href: '/firma/ayarlar', icon: Settings },
];

export function VendorSidebar() {
  const pathname = usePathname();

  const [vendorProfile, setVendorProfile] = useState({
    companyName: 'Beykoz Secret Garden',
    category: 'Düğün Mekanı',
  });

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
  }, []);

  return (
    <aside className="w-72 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl flex flex-col justify-between h-screen sticky top-0 z-40 shrink-0 shadow-xs font-sans antialiased">
      <div className="p-6 space-y-6 overflow-y-auto scrollbar-none">
        
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
            const isActive =
              pathname === item.href ||
              (pathname?.startsWith(`${item.href}/`) && item.href !== '/firma/dashboard');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white dark:text-zinc-900' : 'text-zinc-400'}`} />
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

      {/* Profil Alt Kutusu */}
      <div className="p-4 m-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-md space-y-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold flex items-center justify-center shadow-xs shrink-0">
            {vendorProfile.companyName[0]}
          </div>
          <div className="flex flex-col truncate min-w-0">
            <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">
              {vendorProfile.companyName}
            </span>
            <span className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">
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
          className="w-full py-2 px-3 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Oturumu Kapat</span>
        </button>
      </div>
    </aside>
  );
}

export default VendorSidebar;