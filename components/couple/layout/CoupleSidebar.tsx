'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/ui/brand-logo';

const coupleNavItems = [
  { label: 'Özet Panel', href: '/cift/dashboard', icon: '📊' },
  { label: 'AI Planlayıcı', href: '/cift/ai-asistan', icon: '✨' },
  { label: 'Bütçe Yönetimi', href: '/cift/butce', icon: '💰' },
  { label: 'Davetli Listesi', href: '/cift/davetliler', icon: '💌' },
  { label: 'Firmalarım', href: '/cift/firmalarim', icon: '🏰' },
  { label: 'Görevler', href: '/cift/gorevler', icon: '✅' },
];

export function CoupleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-[#E8DFD8] p-6 flex flex-col justify-between">
      <div>
        {/* Çift Portalı Logosu */}
        <div className="pb-8 border-b border-[#F0EBE1]">
          <BrandLogo variant="couple" width={160} height={36} />
        </div>

        {/* Menü İtemleri */}
        <nav className="mt-6 space-y-1">
          {coupleNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#F9F8F6] text-[#1A1A1A] font-semibold border-l-4 border-[#C5A059]'
                    : 'text-[#666666] hover:bg-[#FAF9F5] hover:text-[#1A1A1A]'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-[#F0EBE1]">
        <div className="bg-[#F9F8F6] p-4 rounded-2xl text-xs text-[#666666]">
          <p className="font-semibold text-[#1A1A1A] mb-1">Yardıma mı ihtiyacınız var?</p>
          <p>AI Düğün Asistanınız 7/24 hizmetinizde.</p>
        </div>
      </div>
    </aside>
  );
}