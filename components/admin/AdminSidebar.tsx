'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

const adminNavGroups = [
  {
    title: 'YÖNETİM & MERKEZ',
    items: [
      { name: 'Executive Paneli', href: '/admin', icon: LayoutDashboard },
      { name: 'Admin Copilot', href: '/admin/admin-copilot', icon: Bot, badge: 'PRO' },
      { name: 'Merkezi Yapay Zekâ', href: '/admin/central-intelligence', icon: BrainCircuit },
      { name: 'Çift Yönetimi', href: '/admin/couples', icon: Users },
      { name: 'Tedarikçi Yönetimi', href: '/admin/vendors', icon: Store },
    ],
  },
  {
    title: 'YAPAY ZEKÂ & AGENT MERKEZİ',
    items: [
      { name: 'AI Agent Kayıtları', href: '/admin/ai-agents', icon: Sparkles },
      { name: 'AI İş Akışları', href: '/admin/ai-workflows', icon: Sliders },
      { name: 'Arama Ops & Vektör', href: '/admin/ai-search', icon: Search },
      { name: 'RAG & Bilgi Deposu', href: '/admin/ai-rag', icon: Layers },
      { name: 'AI Guardrails', href: '/admin/ai-guardrails', icon: ShieldCheck },
    ],
  },
  {
    title: 'FİNANS & PAZAR YERİ',
    items: [
      { name: 'Finansal Genel Bakış', href: '/admin/finance', icon: Wallet },
      { name: 'Komisyon & Gelir', href: '/admin/revenue', icon: BarChart3 },
      { name: 'Pazar Yeri Kuralları', href: '/admin/marketplace', icon: Store },
      { name: 'Abonelik Paketleri', href: '/admin/subscriptions', icon: FileText },
    ],
  },
  {
    title: 'SİSTEM & ALTYAPI (DEVOPS)',
    items: [
      { name: 'Sistem Durumu & SLA', href: '/admin/monitoring', icon: Activity },
      { name: 'Sunucu Altyapısı', href: '/admin/infrastructure', icon: Server },
      { name: 'Ağ & Servis Mesh', href: '/admin/platform-networking', icon: Network },
      { name: 'MLOps & Veri Akışı', href: '/admin/ai-mlops', icon: Cpu },
      { name: 'Sistem Ayarları', href: '/admin/system-config', icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl flex flex-col justify-between min-h-screen sticky top-0 transition-all z-30 shadow-xs font-sans">
      <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-90px)] scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        
        {/* Özel Admin Logosu */}
        <Link href="/admin" className="block px-2 group">
          <div className="relative w-52 h-12">
            <Image
              src="/assets/branding/logo-admin.svg"
              alt="WedyPlan Executive Admin"
              fill
              className="object-contain object-left transition-transform group-hover:scale-102"
              priority
            />
          </div>
        </Link>

        {/* Gruplandırılmış Menü Yapısı */}
        <div className="space-y-6 pt-2">
          {adminNavGroups.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              <h3 className="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                {group.title}
              </h3>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold border border-amber-200/60 dark:border-amber-900/30 shadow-xs'
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-amber-50/50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-400 group-hover:text-amber-500'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge ? (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-amber-500 text-white dark:text-zinc-950 uppercase tracking-wider shadow-xs">
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight className={`w-3.5 h-3.5 transition-all ${isActive ? 'opacity-100 text-amber-600 dark:text-amber-400 translate-x-0.5' : 'opacity-0 group-hover:opacity-100 text-zinc-400'}`} />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Oturum Bilgisi */}
      <div className="p-4 m-4 rounded-2xl bg-gradient-to-b from-amber-50/40 to-white/60 dark:from-zinc-900/60 dark:to-zinc-900/30 border border-amber-100 dark:border-zinc-800/80 backdrop-blur-md flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3 truncate">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-white dark:text-zinc-950 font-bold text-xs shadow-xs ring-2 ring-white dark:ring-zinc-800">
            KA
          </div>
          <div className="flex flex-col truncate">
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
    </aside>
  );
}

export default AdminSidebar;