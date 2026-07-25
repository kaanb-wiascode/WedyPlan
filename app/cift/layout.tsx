// Dosya: app/cift/layout.tsx
import React from 'react';
import RoleGuard from '@/components/RoleGuard';

export default function CoupleLayout({ children }: { children: React.ReactNode }) {
  return (
    // Bu kalkan sayesinde sadece ÇİFT (COUPLE) rolüne sahip olanlar bu klasördeki sayfalara erişebilir.
    <RoleGuard allowedRole="COUPLE">
      {children}
    </RoleGuard>
  );
}