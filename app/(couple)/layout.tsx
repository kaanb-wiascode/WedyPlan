// app/(couple)/layout.tsx
import React from 'react';
import { RoleGuard } from '@/components/RoleGuard';
import { SSEProvider } from '@/components/realtime/SSEProvider';
import { QuoteNotification } from '@/components/realtime/QuoteNotification';

export default function CoupleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SSEProvider>
      <RoleGuard allowedRole="COUPLE">
        <div>
          {children}
          <QuoteNotification />
        </div>
      </RoleGuard>
    </SSEProvider>
  );
}