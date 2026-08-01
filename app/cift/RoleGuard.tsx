'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoleGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Çerez veya LocalStorage oturum denetimi
    const hasCookie =
      document.cookie.includes('wedyplan_session=active') ||
      document.cookie.includes('wedyplan_couple_settings=active');
    const hasLocalStorage = localStorage.getItem('wedyplan_logged_in') === 'true';

    if (hasCookie || hasLocalStorage) {
      setAuthorized(true);
    } else {
      router.push('/giris');
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center space-y-3 text-white">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-zinc-400">Oturum Doğrulanıyor...</p>
      </div>
    );
  }

  return <>{children}</>;
}