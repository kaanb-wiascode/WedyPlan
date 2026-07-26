'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/giris');
      } else if (allowedRoles && role && !allowedRoles.includes(role)) {
        if (role === 'VENDOR') router.push('/firma/talepler');
        else if (role === 'COUPLE') router.push('/cift');
        else if (role === 'ADMIN') router.push('/admin');
        else router.push('/');
      }
    }
  }, [user, role, loading, router, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBFD] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-pink-200 border-t-[#E6007E] rounded-full animate-spin" />
        <span className="text-xs font-bold text-slate-500">Güvenlik Kontrolü Yapılıyor...</span>
      </div>
    );
  }

  if (!user) return null;
  if (allowedRoles && role && !allowedRoles.includes(role)) return null;

  return <>{children}</>;
};