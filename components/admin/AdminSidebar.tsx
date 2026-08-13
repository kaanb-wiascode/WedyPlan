'use client';

import React from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  Users,
  Store,
  Bot,
  BrainCircuit,
  Sliders,
  Wallet,
  ShieldCheck,
  Activity,
  FileText,
  Server,
  Network,
  Cpu,
  Layers,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  BarChart3,
  Search,
} from 'lucide-react';
import { SidebarPortalSwitcher } from '@/components/shared/layout/SidebarPortalSwitcher';

export type AdminTab = 
  | 'executive'
  | 'copilot'
  | 'central-ai'
  | 'couples'
  | 'vendors'
  | 'ai-agents'
  | 'ai-workflows'
  | 'ai-search'
  | 'ai-rag'
  | 'ai-guardrails'
  | 'finance'
  | 'revenue'
  | 'marketplace'
  | 'subscriptions'
  | 'monitoring'
  | 'infrastructure'
  | 'networking'
  | 'mlops'
  | 'system-config';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

const adminNavGroups: { title: string; items: { id: AdminTab; name: string; icon: any; badge?: string }[] }[] = [
  {
    title: 'YÖNETİM & MERKEZ',
    items: [
      { id: 'executive', name: 'Executive Paneli', icon: LayoutDashboard },
      { id: 'copilot', name: 'Admin Copilot', icon: Bot, badge: 'PRO' },
      { id: 'central-ai', name: 'Merkezi Yapay Zekâ', icon: BrainCircuit },
      { id: 'couples', name: 'Çift Yönetimi', icon: Users },
      { id: 'vendors', name: 'Tedarikçi Yönetimi', icon: Store },
    ],
  },
  {
    title: 'YAPAY ZEKÂ & AGENT MERKEZİ',
    items: [
      { id: 'ai-agents', name: 'AI Agent Kayıtları', icon: Sparkles },
      { id: 'ai-workflows', name: 'AI İş Akışları', icon: Sliders },
      { id: 'ai-search', name: 'Arama Ops & Vektör', icon: Search },
      { id: 'ai-rag', name: 'RAG & Bilgi Deposu', icon: Layers },
      { id: 'ai-guardrails', name: 'AI Guardrails', icon: ShieldCheck },
    ],
  },
  {
    title: 'FİNANS & PAZAR YERİ',
    items: [
      { id: 'finance', name: 'Finansal Genel Bakış', icon: Wallet },
      { id: 'revenue', name: 'Komisyon & Gelir', icon: BarChart3 },
      { id: 'marketplace', name: 'Pazar Yeri Kuralları', icon: Store },
      { id: 'subscriptions', name: 'Abonelik Paketleri', icon: FileText },
    ],
  },
  {
    title: 'SİSTEM & ALTYAPI (DEVOPS)',
    items: [
      { id: 'monitoring', name: 'Sistem Durumu & SLA', icon: Activity },
      { id: 'infrastructure', name: 'Sunucu Altyapısı', icon: Server },
      { id: 'networking', name: 'Ağ & Servis Mesh', icon: Network },
      { id: 'mlops', name: 'MLOps & Veri Akışı', icon: Cpu },
      { id: 'system-config', name: 'Sistem Ayarları', icon: Settings },
    ],
  },
];

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  return (
    <aside className="w-80 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl flex flex-col justify-between min-h-screen sticky top-0 transition-all z-30 shadow-xs font-sans">
      <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-90px)] scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        
        {/* Özel Admin Logosu */}
        <button onClick={() => setActiveTab('executive')} className="block px-2 group cursor-pointer text-left">
          <div className="relative w-48 h-12">
            <Image
              src="/assets/branding/logo-admin.svg"
              alt="WedyPlan Executive Admin"
              fill
              className="object-contain object-left transition-transform group-hover:scale-102"
              priority
            />
          </div>
        </button>

        {/* Gruplandırılmış Menü Yapısı */}
        <div className="space-y-6 pt-2">
          {adminNavGroups.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              <h3 className="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                {group.title}
              </h3>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-[15px] font-medium transition-all group cursor-pointer ${
                        isActive
                          ? 'bg-amber-500/10 text-amber-800 dark:text-amber-400 font-semibold border border-amber-200/80 dark:border-amber-900/40 shadow-xs'
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-amber-50/50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-[18px] h-[18px] transition-colors ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-400 group-hover:text-amber-500'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge ? (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-amber-500 text-white dark:text-zinc-950 uppercase tracking-wider shadow-xs">
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight className={`w-3.5 h-3.5 transition-all ${isActive ? 'opacity-100 text-amber-600 dark:text-amber-400 translate-x-0.5' : 'opacity-0 group-hover:opacity-100 text-zinc-400'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Oturum Bilgisi */}
      <div className="p-4 m-4 rounded-2xl bg-gradient-to-b from-amber-50/40 to-white/60 dark:from-zinc-900/60 dark:to-zinc-900/30 border border-amber-100 dark:border-zinc-800/80 backdrop-blur-md space-y-3 shadow-xs">
        <SidebarPortalSwitcher fallbackPortal="ADMIN" />
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 truncate">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-white dark:text-zinc-950 font-bold text-xs shadow-xs ring-2 ring-white dark:ring-zinc-800">
            KA
          </div>
          <div className="flex flex-col truncate text-left">
            <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">Kaan Atamer</span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium truncate">Süper Admin</span>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/giris';
          }}
          title="Oturumu Kapat"
          className="p-2 rounded-xl text-zinc-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;