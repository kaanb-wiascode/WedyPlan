'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Hatanın çözüldüğü satır (Süslü parantez eklendi):
import RoleGuard from '../../components/RoleGuard';
import { 
  LayoutDashboard, 
  Inbox, 
  FileText, 
  Wallet, 
  BarChart2, 
  Zap, 
  ArrowLeft 
} from 'lucide-react';

export default function PremiumVendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/satici', label: 'Genel Bakış', icon: LayoutDashboard },
    { href: '/satici/talepler', label: 'Müşteri Talepleri', icon: Inbox },
    { href: '/satici/teklif-hazirla', label: 'Teklif & Dosya', icon: FileText },
    { href: '/satici/finans', label: 'Finans & Alacaklar', icon: Wallet },
    { href: '/satici/rekabet', label: 'Rekabet Analizi', icon: BarChart2 },
    { href: '/satici/paketler', label: 'Paketler & Doping', icon: Zap },
  ];

  return (
    <RoleGuard allowedRole="VENDOR">
      <div className="apple-page flex min-h-screen flex-col md:flex-row">
        <aside className="apple-sidebar z-40 flex w-full shrink-0 flex-col justify-between p-6 md:sticky md:top-0 md:h-screen md:w-[260px]">
          <div className="space-y-8">
            <Link href="/" className="block">
              <span className="text-[22px] font-semibold tracking-tight text-[#1d1d1f]">WedyPlan</span>
              <span className="apple-kicker mt-1 block">
                İş Ortağı Paneli
              </span>
            </Link>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`apple-nav-item ${isActive ? 'apple-nav-item-active' : 'text-[#6e6e73]'}`}
                  >
                    <span className="flex items-center gap-3">
                    <item.icon 
                      className={`h-[18px] w-[18px] ${isActive ? 'text-[#0071e3]' : 'text-[#86868b]'}`} 
                      strokeWidth={isActive ? 2 : 1.5} 
                    />
                    <span>{item.label}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6">
            <Link
              href="/"
              className="apple-nav-item text-[#6e6e73]"
            >
              <ArrowLeft className="w-4 h-4" />
              Vitrini Görüntüle
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
          <div className="max-w-[1000px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </RoleGuard>
  );
}