'use client';

import React from 'react';
import { 
  Building2, 
  FileText, 
  Calendar, 
  Wallet, 
  MessageSquare, 
  Settings, 
  ShieldCheck,
  Award,
  Store
} from 'lucide-react';
import { GlassPanel } from '@/components/shared/ui/GlassPanel';

export type VendorTab = 'overview' | 'leads' | 'subscription' | 'finance' | 'crm' | 'calendar' | 'profile' | 'settings';

interface VendorSidebarProps {
  activeTab?: VendorTab;
  setActiveTab?: (tab: VendorTab) => void;
}

export function VendorSidebar({ activeTab = 'overview', setActiveTab }: VendorSidebarProps) {
  const navigation = [
    { id: 'overview' as VendorTab, name: 'Dashboard', icon: Building2 },
    { id: 'leads' as VendorTab, name: 'Teklif Talepleri', icon: FileText },
    { id: 'subscription' as VendorTab, name: 'Abonelik & Paketler', icon: Award },
    { id: 'finance' as VendorTab, name: 'Finans & Ciro', icon: Wallet },
    { id: 'crm' as VendorTab, name: 'İletişim & CRM', icon: MessageSquare },
    { id: 'calendar' as VendorTab, name: 'Takvim & Etkinlikler', icon: Calendar },
    { id: 'profile' as VendorTab, name: 'Firma Profili', icon: Store },
    { id: 'settings' as VendorTab, name: 'Ayarlar', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl p-6 flex flex-col justify-between hidden lg:flex min-h-screen shrink-0">
      <div className="space-y-8">
        
        {/* LOGO / BRANDING */}
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
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab && setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
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