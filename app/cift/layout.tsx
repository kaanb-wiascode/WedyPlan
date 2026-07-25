import React from 'react';
import RoleGuard from '../../components/RoleGuard';

export default function CoupleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole="COUPLE">
      <div className="min-h-screen bg-[#F8F8F7] text-[#111111] selection:bg-[#7C5CFF] selection:text-white">
        {children}
      </div>
    </RoleGuard>
  );
}