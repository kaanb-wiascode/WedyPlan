// lib/sse/client.ts
'use client';

import { useEffect, useRef, useState } from 'react';

interface SSEEvent {
  event: string;
  data: any;
  timestamp: string;
}

/**
 * SSE hook - Real-time events
 */
export function useSSE(userId?: string) {
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const callbacksRef = useRef<Map<string, Set<(data: any) => void>>>(
    new Map()
  );

  useEffect(() => {
    if (!userId) return;

    // SSE bağlantısını kur
    const eventSource = new EventSource(
      `/api/sse/connect?userId=${encodeURIComponent(userId)}`
    );

    eventSource.onopen = () => {
      console.log('[SSE] Connected');
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const { event: eventType, data } = JSON.parse(event.data);

        // Tüm listeners'ı çağır
        const listeners = callbacksRef.current.get(eventType);
        if (listeners) {
          listeners.forEach((callback) => callback(data));
        }
      } catch (error) {
        console.error('[SSE] Parse error:', error);
      }
    };

    eventSource.onerror = () => {
      console.error('[SSE] Connection error');
      setIsConnected(false);
      eventSource.close();
    };

    eventSourceRef.current = eventSource;

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, [userId]);

  /**
   * Event listener kaydet
   */
  const on = (eventType: string, callback: (data: any) => void) => {
    if (!callbacksRef.current.has(eventType)) {
      callbacksRef.current.set(eventType, new Set());
    }
    callbacksRef.current.get(eventType)?.add(callback);

    // Cleanup function
    return () => {
      callbacksRef.current.get(eventType)?.delete(callback);
    };
  };

  /**
   * Tüm listeners'ı kaldır
   */
  const off = (eventType: string) => {
    callbacksRef.current.delete(eventType);
  };

  return {
    isConnected,
    on,
    off,
  };
}