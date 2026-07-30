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
  ChevronDown,
  Sparkles,
  BarChart3,
  Search,
  CheckCircle2,
} from 'lucide-react';

const adminNavGroups = [
  {
    title: 'YÖNETİM & MERKEZ',
    items: [
      { name: 'Executive Paneli', href: '/admin/dashboard', icon: LayoutDashboard },
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
    <aside className="w-80 border-r border-zinc-800 bg-zinc-950 text-zinc-300 flex flex-col justify-between min-h-screen sticky top-0 transition-colors z-30">
      <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-90px)] scrollbar-thin scrollbar-thumb-zinc-800">
        
        {/* Kurumsal Admin Logosu */}
        <Link href="/admin/dashboard" className="flex items-center gap-3 px-2 group">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src="/assets/branding/logo-admin.svg"
              alt="WedyPlan Admin Paneli"
              fill
              className="object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg tracking-tight text-white leading-none">
              WedyPlan
            </span>
            <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-widest mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-amber-400" /> Executive Admin
            </span>
          </div>
        </Link>

        {/* Gruplandırılmış Menü Yapısı */}
        <div className="space-y-6 pt-2">
          {adminNavGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-400 text-zinc-950 uppercase tracking-wider">
                          {item.badge}
                        </span>
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
      <div className="p-4 border-t border-zinc-900 bg-zinc-950/90 flex items-center justify-between">
        <div className="flex items-center gap-3 truncate">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-zinc-950 font-bold text-xs shadow-md">
            KA
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs font-semibold text-white truncate">Kaan Atamer</span>
            <span className="text-[10px] text-zinc-500 truncate">kaanatamer@wiascorp.com</span>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/giris';
          }}
          title="Oturumu Kapat"
          className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;