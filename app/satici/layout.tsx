'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/satici', label: 'Genel Bakış', icon: '📊' },
    { href: '/satici/talepler', label: 'Müşteri Talepleri', icon: '📥' },
    { href: '/satici/teklif-hazirla', label: 'Teklif & Dosya Yükle', icon: '📝' },
    { href: '/satici/rekabet', label: 'Rekabet Analizi', icon: '⚔️' },
    { href: '/satici/paketler', label: 'Paketler & Doping', icon: '🚀' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800 flex flex-col md:flex-row">
      {/* Sol Menü (Sidebar) */}
      <aside className="w-full md:w-64 bg-white border-r border-purple-100 p-6 flex flex-col justify-between shrink-0 sticky top-0 md:h-screen z-40">
        <div className="space-y-6">
          <Link href="/" className="text-2xl font-bold text-[#4A154B] block">
            Wedy<span className="text-[#E6007E]">Plan</span>
            <span className="block text-[10px] bg-purple-100 text-[#4A154B] px-2.5 py-0.5 rounded-md mt-1 font-bold uppercase w-max">
              B2B Kurumsal Panel
            </span>
          </Link>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-[#4A154B] text-white shadow-md'
                      : 'text-slate-600 hover:bg-purple-50 hover:text-[#E6007E]'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-2">
          <Link
            href="/"
            className="block text-center text-xs font-semibold text-slate-500 hover:text-[#E6007E] py-2 transition"
          >
            ← WedyPlan Vitrin Sayfası
          </Link>
        </div>
      </aside>

      {/* Ana İçerik Alanı */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}