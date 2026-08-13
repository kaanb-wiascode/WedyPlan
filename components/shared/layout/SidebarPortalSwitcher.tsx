'use client';

import React, { useEffect, useState } from 'react';
import { PortalSwitcher } from '@/components/shared/layout/PortalSwitcher';
import type { PortalType } from '@/types/auth-core';

const ROLE_TO_PORTAL: Record<string, PortalType> = {
  ADMIN: 'ADMIN',
  COUPLE: 'COUPLE',
  VENDOR: 'VENDOR',
};

export function SidebarPortalSwitcher({ fallbackPortal }: { fallbackPortal: PortalType }) {
  const [activePortal, setActivePortal] = useState<PortalType>(fallbackPortal);
  const [allowedPortals, setAllowedPortals] = useState<PortalType[]>([fallbackPortal]);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/v1/auth/verify')
      .then((response) => response.json())
      .then((data) => {
        if (cancelled || !data?.success) return;
        const role = data.user?.role as string | undefined;
        const portals = (data.user?.allowedPortals || []) as PortalType[];
        setActivePortal(ROLE_TO_PORTAL[role || ''] || fallbackPortal);
        if (portals.length > 0) {
          setAllowedPortals(portals);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [fallbackPortal]);

  if (allowedPortals.length < 2) {
    return null;
  }

  return <PortalSwitcher activePortal={activePortal} allowedPortals={allowedPortals} />;
}
