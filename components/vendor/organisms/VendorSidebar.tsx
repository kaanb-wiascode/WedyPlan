'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Kanban, CalendarCheck2, FileSignature, MessageSquare, BarChart3, Sparkles } from 'lucide-react';

const VENDOR_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', route: '/firma/dashboard', icon: LayoutDashboard },
  { id: 'leads', label: 'Talepler & Teklifler', route: '/firma/talepler', icon: Kanban, badge: 'Canlı' },
  { id: 'organization', label: 'Organizasyon (WOS)', route: '/firma/organizasyon', icon: CalendarCheck2 },
  { id: 'contracts', label: 'Sözleşmeler', route: '/firma/sozlesmeler', icon: FileSignature },
  { id: 'messages', label: 'Mesajlaşma Merkezi', route: '/firma/mesajlar', icon: MessageSquare },
  { id: 'finance', label: 'Finans & Raporlar', route: '/firma/finans', icon: BarChart3 },
];

export const VendorSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] bg-white/40 backdrop-blur-3xl border-r border-white/80 p-5 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div className="space-y-6">
        <div className="space-y-1">
          <Link href="/firma/dashboard" className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold tracking-tight text-[#1D1D1F]">
              WedyPlan<span className="text-[#D4AF37]">.</span>
            </span>
            <span className="text-[9px] uppercase font-mono bg-white/80 border border-white px-2 py-0.5 rounded-full font-bold">
              WOS SaaS
            </span>
          </Link>
          <p className="text-[11px] text-[#6E6E73] font-medium">Beykoz Secret Garden</p>
        </div>

        <nav className="space-y-1">
          {VENDOR_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.route;
            return (
              <Link
                key={item.id}
                href={item.route}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-white/90 backdrop-blur-xl text-[#1D1D1F] font-semibold shadow-sm border border-white'
                    : 'text-[#555] hover:bg-white/40 hover:text-[#1D1D1F]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-[#777]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono font-bold bg-[#D4AF37]/20 text-[#1D1D1F] px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 text-[11px] font-medium text-[#6E6E73] flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        <span>Rol: <strong>Firma Sahibi</strong></span>
      </div>
    </aside>
  );
};