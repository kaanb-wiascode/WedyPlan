'use client';

import React from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import { 
  Store, 
  Building2, 
  FileText, 
  Calendar, 
  Wallet, 
  Users, 
  MessageSquare, 
  Settings, 
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Award
} from 'lucide-react';
import { GlassPanel } from '@/components/shared/ui/GlassPanel';

export function VendorSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/vendor/dashboard', icon: Building2 },
    { name: 'Teklif Talepleri', href: '/vendor/leads', icon: FileText },
    { name: 'Abonelik & Paketler', href: '/vendor/subscription', icon: Award },
    { name: 'Finans & Ciro', href: '/vendor/finance', icon: Wallet },
    { name: 'İletişim & Mesajlar', href: '/vendor/crm', icon: MessageSquare },
    { name: 'Takvim & Etkinlikler', href: '/vendor/calendar', icon: Calendar },
    { name: 'Firma Profili', href: '/vendor/profile', icon: Store },
    { name: 'Ayarlar', href: '/vendor/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl p-6 flex flex-col justify-between hidden lg:flex min-h-screen">
      <div className="space-y-8">
        
        {/* LOGO / BRANDING (Admin Sidebar ile Aynı) */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 shadow-md">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-base text-zinc-900 dark:text-white tracking-tight">WedyVendor</h2>
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 font-semibold tracking-wider uppercase">Firma Portalı</span>
          </div>
        </div>

        {/* MENÜ LİSTESİ */}
        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ALT FİRMA ROZETİ KARTI */}
      <GlassPanel className="p-4 space-y-2 border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Grand Çamlıca</span>
        </div>
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Onaylı VIP Tedarikçi Statüsü Active</p>
      </GlassPanel>
    </aside>
  );
}