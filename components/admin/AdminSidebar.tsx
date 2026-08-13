'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Store,
  ClipboardCheck,
  ListChecks,
  Inbox,
  Wallet,
  Settings,
  ScrollText,
  LogOut,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { SidebarPortalSwitcher } from '@/components/shared/layout/SidebarPortalSwitcher';

type NavItem = {
  href: string;
  name: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

const groups: { title: string; items: NavItem[] }[] = [
  {
    title: 'Kokpit',
    items: [{ href: '/admin', name: 'Komuta merkezi', icon: LayoutDashboard, exact: true }],
  },
  {
    title: 'Operasyon',
    items: [
      { href: '/admin/onaylar', name: 'Firma onayları', icon: ClipboardCheck },
      { href: '/admin/firmalar', name: 'Firmalar', icon: Store },
      { href: '/admin/ciftler', name: 'Çiftler', icon: Users },
      { href: '/admin/hizmetler', name: 'Hizmet denetimi', icon: ListChecks },
      { href: '/admin/talepler', name: 'Teklif talepleri', icon: Inbox },
    ],
  },
  {
    title: 'Kontrol',
    items: [
      { href: '/admin/kullanicilar', name: 'Kullanıcılar', icon: Shield },
      { href: '/admin/finans', name: 'Finans', icon: Wallet },
      { href: '/admin/sistem', name: 'Sistem', icon: Settings },
      { href: '/admin/denetim', name: 'Denetim kaydı', icon: ScrollText },
    ],
  },
];

export function AdminSidebar({
  userName = 'Yönetici',
  email = 'admin@wedyplan.com',
}: {
  userName?: string;
  email?: string;
}) {
  const pathname = usePathname();
  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <aside className="apple-sidebar sticky top-0 z-30 flex h-screen w-64 shrink-0 flex-col justify-between">
      <div className="space-y-6 overflow-y-auto p-4 scrollbar-none">
        <Link href="/admin" className="block px-1">
          <div className="relative h-10 w-40">
            <Image
              src="/assets/branding/logo-admin.svg"
              alt="WedyPlan Admin"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <nav className="space-y-5">
          {groups.map((group) => (
            <div key={group.title} className="space-y-1">
              <h3 className="px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#86868b]">
                {group.title}
              </h3>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname === item.href || Boolean(pathname?.startsWith(`${item.href}/`));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`apple-nav-item ${isActive ? 'apple-nav-item-active' : ''}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className={`h-[16px] w-[16px] ${isActive ? 'text-[#0071e3]' : 'text-[#86868b]'}`} />
                        {item.name}
                      </span>
                      <ChevronRight className={`h-3.5 w-3.5 ${isActive ? 'opacity-100 text-[#0071e3]' : 'opacity-0'}`} />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="m-3 space-y-3 rounded-[20px] border border-black/6 bg-white/70 p-3">
        <SidebarPortalSwitcher fallbackPortal="ADMIN" />
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0071e3] text-[11px] font-bold text-white">
              {initials || 'WP'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-[#1d1d1f]">{userName}</p>
              <p className="truncate text-[10px] text-[#86868b]">{email}</p>
            </div>
          </div>
          <button
            type="button"
            title="Çıkış"
            onClick={async () => {
              await fetch('/api/v1/auth/logout', { method: 'POST' });
              window.location.href = '/giris';
            }}
            className="rounded-xl p-2 text-[#86868b] hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
