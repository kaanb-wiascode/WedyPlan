'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWeddingOS } from '@/store/useWeddingOS';
import { Lock } from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRole: 'COUPLE' | 'VENDOR';
}

export default function RoleGuard({ children, allowedRole }: RoleGuardProps) {
  const router = useRouter();
  const { userRole } = useWeddingOS();

  useEffect(() => {
    // Oturum yoksa giriş sayfasına yönlendir
    if (!userRole) {
      router.push('/giris');
      return;
    }

    // Çift, firma alanına girmeye çalışırsa engelle
    if (allowedRole === 'VENDOR' && userRole === 'COUPLE') {
      router.push('/cift/dashboard');
    }

    // Firma, çift alanına girmeye çalışırsa engelle
    if (allowedRole === 'COUPLE' && userRole === 'VENDOR') {
      router.push('/satici');
    }
  }, [userRole, allowedRole, router]);

  // Yetkisiz erişim durumu
  if (!userRole || userRole !== allowedRole) {
    return (
      <div className="min-h-screen bg-[#F8F8F7] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-[#111111] text-white rounded-full flex items-center justify-center mb-4 shadow-md">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-[24px] font-medium text-[#111111] tracking-tight mb-2">Erişim Sınırlandırıldı</h2>
        <p className="text-[14px] text-[#666666] max-w-[400px] mb-6">
          Bu modüle sadece <strong>{allowedRole === 'COUPLE' ? 'Çift' : 'Firma / İş Ortakları'}</strong> erişebilir. Yönlendiriliyorsunuz...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}