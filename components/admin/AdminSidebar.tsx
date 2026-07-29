'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/ui/brand-logo';

const adminNavItems = [
  { label: 'Komuta Merkezi', href: '/admin/dashboard', icon: '🛡️' },
  { label: 'Çift Yönetimi', href: '/admin/couples', icon: '💍' },
  { label: 'Firma Yönetimi', href: '/admin/vendors', icon: '🏢' },
  { label: 'AI Orkestrasyonu', href: '/admin/ai-agents', icon: '🤖' },
  { label: 'Finans & Gelir', href: '/admin/revenue', icon: '💵' },
  { label: 'Sistem Ayarları', href: '/admin/system-config', icon: '⚙️' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-slate-200 p-6 flex flex-col justify-between border-r border-slate-800">
      <div>
        {/* Admin Portalı Logosu */}
        <div className="pb-8 border-b border-slate-800">
          <BrandLogo variant="admin" width={150} height={34} />
        </div>

        {/* Menü İtemleri */}
        <nav className="mt-6 space-y-1">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold border-l-4 border-amber-500'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-800 text-xs text-slate-500">
        <p>WedyPlan HQ v2.5</p>
        <p className="mt-0.5">Enterprise Core Engine</p>
      </div>
    </aside>
  );
}