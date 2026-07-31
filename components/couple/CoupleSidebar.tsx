// components/couple/CoupleSidebar.tsx
'use client';

import Link from 'next/link'; // next/anchor yerine next/link olarak düzeltildi
import { usePathname } from 'next/navigation';
import { COUPLE_NAV_ITEMS } from '@/lib/navigation';

export default function CoupleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-md border-r min-h-screen p-4 space-y-6">
      <div className="flex items-center space-x-2 px-2">
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
          WedyPlan
        </span>
        <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded">
          Çift
        </span>
      </div>

      <nav className="space-y-1">
        {COUPLE_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100/80'
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}