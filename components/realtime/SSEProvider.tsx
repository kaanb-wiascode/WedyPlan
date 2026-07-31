// components/realtime/SSEProvider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSSE } from '@/lib/sse/client';

interface SSEContextType {
  isConnected: boolean;
  on: (eventType: string, callback: (data: any) => void) => () => void;
  off: (eventType: string) => void;
}

const SSEContext = createContext<SSEContextType | undefined>(undefined);

export function SSEProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | undefined>();
  const sse = useSSE(userId);

  useEffect(() => {
    // Session'dan userId al
    const loadUserId = async () => {
      try {
        const response = await fetch('/api/v1/auth/verify');
        const data = await response.json();
        if (data.success && data.user?.userId) {
          setUserId(data.user.userId);
        }
      } catch (error) {
        console.error('Failed to get user ID:', error);
      }
    };

    loadUserId();
  }, []);

  if (!userId) {
    return <>{children}</>;
  }

  return (
    <SSEContext.Provider
      value={{
        isConnected: sse.isConnected,
        on: sse.on,
        off: sse.off,
      }}
    >
      {children}
    </SSEContext.Provider>
  );
}

export function useSSEContext() {
  const context = useContext(SSEContext);
  if (!context) {
    throw new Error('useSSEContext must be used within SSEProvider');
  }
  return context;
}