import React from 'react';
import CoupleSidebar from '@/components/couple/layout/CoupleSidebar';
import { ShadowModeHost } from '@/components/admin/ShadowModeHost';
import { PortalShell } from '@/components/shared/layout/PortalShell';

export default function CouplePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ShadowModeHost />
      <PortalShell logoVariant="couple" sidebar={<CoupleSidebar />}>
        <main className="relative z-10 min-h-dvh">{children}</main>
      </PortalShell>
    </>
  );
}
