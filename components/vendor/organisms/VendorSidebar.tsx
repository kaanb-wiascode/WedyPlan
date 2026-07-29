'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/ui/brand-logo';

const vendorNavItems = [
  { label: 'Kontrol Paneli', href: '/firma/dashboard', icon: '📈' },
  { label: 'Talepler & Gelenler', href: '/firma/talepler', icon: '📩' },
  { label: 'Takvim & Rezervasyon', href: '/firma/takvim', icon: '📅' },
  { label: 'Vitrin & Profil', href: '/firma/vitrin', icon: '🖼️' },
  { label: 'Sözleşmeler', href: '/firma/sozlesmeler', icon: '📑' },
  { label: 'Finans & Raporlar', href: '/firma/finans', icon: '💳' },
];

export function VendorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#111111] text-[#E5E5E5] p-6 flex flex-col justify-between">
      <div>
        {/* Tedarikçi Portalı Logosu */}
        <div className="pb-8 border-b border-[#262626]">
          <BrandLogo variant="vendor" width={160} height={36} />
        </div>

        {/* Menü İtemleri */}
        <nav className="mt-6 space-y-1">
          {vendorNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#222222] text-white font-semibold border-l-4 border-[#C5A059]'
                    : 'text-[#A3A3A3] hover:bg-[#1A1A1A] hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-[#262626]">
        <div className="bg-[#1A1A1A] p-4 rounded-2xl text-xs text-[#A3A3A3] border border-[#262626]">
          <p className="font-semibold text-white mb-1">Studio Partner</p>
          <p>Profilinizi güncel tutarak %40 daha fazla talep alın.</p>
        </div>
      </div>
    </aside>
  );
}