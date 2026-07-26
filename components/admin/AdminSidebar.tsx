'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Building2, 
  Users, 
  Activity,
  LogOut,
  Settings
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Platform Özeti', href: '/admin', icon: LayoutDashboard },
    { label: 'Firma Yönetimi', href: '#', icon: Building2 }, // Şimdilik ana sayfada
    { label: 'Kullanıcılar (Çiftler)', href: '#', icon: Users },
    { label: 'Sistem Logları', href: '#', icon: Activity },
    { label: 'Platform Ayarları', href: '#', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex shrink-0 min-h-screen text-slate-300">
      <div className="space-y-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-900/50">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif font-bold text-[18px] text-white">WedyPlan</span>
            <span className="text-[10px] font-semibold text-cyan-400 block -mt-1 tracking-widest uppercase">SysAdmin</span>
          </div>
        </Link>

        {/* Menü Linkleri */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href && item.href !== '#';

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-2 text-emerald-400 text-[12px] font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Sistem Canlı
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            WedyAI ve veritabanı bağlantıları sorunsuz çalışıyor.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-[12px] font-semibold text-slate-500 hover:text-rose-400 transition"
        >
          <LogOut className="w-4 h-4" /> Güvenli Çıkış
        </Link>
      </div>
    </aside>
  );
};