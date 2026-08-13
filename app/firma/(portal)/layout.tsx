import React from 'react';
import { VendorSidebar } from '@/components/vendor/organisms/VendorSidebar';
import { ShadowModeHost } from '@/components/admin/ShadowModeHost';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="apple-page flex min-h-screen">
      <ShadowModeHost />
      <VendorSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
