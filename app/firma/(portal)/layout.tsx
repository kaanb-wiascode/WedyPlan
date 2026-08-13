import React from 'react';
import { VendorSidebar } from '@/components/vendor/organisms/VendorSidebar';
import { ShadowModeHost } from '@/components/admin/ShadowModeHost';
import { PortalShell } from '@/components/shared/layout/PortalShell';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ShadowModeHost />
      <PortalShell logoVariant="vendor" sidebar={<VendorSidebar />}>
        <main className="min-h-dvh overflow-y-auto">{children}</main>
      </PortalShell>
    </>
  );
}
