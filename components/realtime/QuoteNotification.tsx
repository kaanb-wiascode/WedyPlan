// components/realtime/QuoteNotification.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useSSEContext } from '@/components/realtime/SSEProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Wifi, WifiOff } from 'lucide-react';

interface Quote {
  quoteId: string;
  vendorName: string;
  price: number;
  notes?: string;
  timestamp: string;
}

export function QuoteNotification() {
  const { isConnected, on, off } = useSSEContext();
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    // SSE event listener kaydet
    const unsubscribe = on('vendor:quote:received', (data: Quote) => {
      setQuotes((prev) => [data, ...prev]);

      // 5 saniye sonra kaldır
      const timer = setTimeout(() => {
        setQuotes((prev) => prev.filter((q) => q.quoteId !== data.quoteId));
      }, 5000);

      return () => clearTimeout(timer);
    });

    return () => {
      unsubscribe();
      off('vendor:quote:received');
    };
  }, [on, off]);

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-2">
      <AnimatePresence>
        {quotes.map((quote) => (
          <motion.div
            key={quote.quoteId}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-zinc-900 border border-green-200 dark:border-green-800 rounded-2xl p-4 shadow-2xl max-w-sm backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-500 animate-bounce" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                  {quote.vendorName} Teklif Gönderdi
                </p>
                <p className="text-base font-bold text-green-600 dark:text-green-400 mt-2">
                  ₺{(quote.price / 100).toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                {quote.notes && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 italic line-clamp-2">
                    "{quote.notes}"
                  </p>
                )}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                  {new Date(quote.timestamp).toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Connection status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
          isConnected
            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
            : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
        }`}
      >
        {isConnected ? (
          <>
            <Wifi className="w-3 h-3" />
            <span>Real-time bağlı</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3" />
            <span>Bağlantı kuruluyor...</span>
          </>
        )}
      </motion.div>
    </div>
  );
}