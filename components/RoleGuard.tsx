'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWeddingOS } from '@/store/useWeddingOS';
import { Lock } from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRole: 'COUPLE' | 'VENDOR' | 'ADMIN';
}

export function RoleGuard({ children, allowedRole }: RoleGuardProps) {
  const router = useRouter();
  const { userRole } = useWeddingOS();

  useEffect(() => {
    // Oturum yoksa giriş sayfasına yönlendir
    if (!userRole) {
      router.push('/giris');
      return;
    }

    // Yanlış role ise yönlendir
    if (userRole !== allowedRole) {
      if (userRole === 'COUPLE') {
        router.push('/cift');
      } else if (userRole === 'VENDOR') {
        router.push('/satici');
      } else if (userRole === 'ADMIN') {
        router.push('/admin');
      }
    }
  }, [userRole, allowedRole, router]);

  // Yetkisiz erişim durumu
  if (!userRole || userRole !== allowedRole) {
    return (
      <div className="min-h-screen bg-[#F8F8F7] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-[#111111] text-white rounded-full flex items-center justify-center mb-4 shadow-md">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-[24px] font-medium text-[#111111] tracking-tight mb-2">
          Erişim Sınırlandırıldı
        </h2>
        <p className="text-[14px] text-[#666666] max-w-[400px] mb-6">
          Bu modüle sadece{' '}
          <strong>
            {allowedRole === 'COUPLE'
              ? 'Çift'
              : allowedRole === 'VENDOR'
                ? 'Firma / İş Ortakları'
                : 'Yöneticiler'}
          </strong>{' '}
          erişebilir. Yönlendiriliyorsunuz...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}