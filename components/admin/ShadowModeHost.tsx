'use client';

import { useEffect, useState } from 'react';
import { ShadowModeBar } from '@/components/admin/ShadowModeBar';

export function ShadowModeHost() {
  const [shadow, setShadow] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const raw = document.cookie
      .split('; ')
      .find((row) => row.startsWith('wedyplan_shadow='))
      ?.slice('wedyplan_shadow='.length);
    if (!raw) return;
    try {
      setShadow(JSON.parse(decodeURIComponent(raw)));
      document.body.classList.add('admin-shadow-active');
    } catch {
      setShadow(null);
    }
    return () => document.body.classList.remove('admin-shadow-active');
  }, []);

  if (!shadow) return null;

  return (
    <ShadowModeBar
      targetName={shadow.name}
      role={shadow.role === 'VENDOR' ? 'Firma' : 'Çift'}
      onExit={async () => {
        await fetch('/api/admin/impersonate/exit', { method: 'POST' });
        window.location.href = '/admin';
      }}
    />
  );
}
