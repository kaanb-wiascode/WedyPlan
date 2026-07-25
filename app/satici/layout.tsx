'use client';

import React from 'react';
import RoleGuard from '@/components/RoleGuard';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Inbox, 
  FileText, 
  Wallet, 
  BarChart2, 
  Zap, 
  ArrowLeft 
} from 'lucide-react';

export default function PremiumVendorLayout({ children }: { children: React.ReactNode }) {
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
    // 🛡️ ROLE GUARD İLE TÜM PANELİ KORUMA ALTINA ALDIK
    <RoleGuard allowedRole="VENDOR">
      <div className="min-h-screen bg-[#FFFFFF] text-[#111111] flex flex-col md:flex-row font-sans selection:bg-[#7C5CFF] selection:text-white">
        
        {/* Sidebar (Linear / Notion Style) */}
        <aside className="w-full md:w-[260px] bg-[#F8F8F7] border-r border-[rgba(0,0,0,0.06)] p-6 flex flex-col justify-between shrink-0 md:sticky md:top-0 md:h-screen z-40">
          
          <div className="space-y-8">
            {/* Logo Area */}
            <Link href="/" className="block">
              <span className="text-[22px] font-medium tracking-tight text-[#111111]">WedyPlan.</span>
              <span className="block text-[11px] font-medium text-[#666666] tracking-wider uppercase mt-1">
                İş Ortağı Paneli
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[14px] font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-white text-[#111111] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.04)]'
                        : 'text-[#666666] hover:bg-[rgba(0,0,0,0.04)] hover:text-[#111111]'
                    }`}
                  >
                    <item.icon 
                      className={`w-[18px] h-[18px] ${isActive ? 'text-[#111111]' : 'text-[#999999]'}`} 
                      strokeWidth={isActive ? 2 : 1.5} 
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Action */}
          <div className="pt-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-[13px] font-medium text-[#666666] hover:text-[#111111] transition-colors py-2 px-3 rounded-[12px] hover:bg-[rgba(0,0,0,0.04)]"
            >
              <ArrowLeft className="w-4 h-4" />
              Vitrini Görüntüle
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto bg-[#FFFFFF]">
          <div className="max-w-[1000px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </RoleGuard>
  );
}