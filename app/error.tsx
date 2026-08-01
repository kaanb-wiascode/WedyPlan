'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hatayı izleme servisine (örn: Sentry) göndermek için burası kullanılır
    console.error('Uygulama hatası yakalandı:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Arka Plan Bulanık Efektleri */}
      <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-red-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-[#E6007E]/5 rounded-full blur-[100px]" />

      <GlassCard className="max-w-2xl w-full p-8 md:p-12 text-center z-10 border-white/80">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 rounded-2xl border border-red-100 shadow-sm">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Beklenmedik Bir Hata Oluştu
        </h1>
        <p className="text-gray-600 font-light text-lg mb-8 max-w-lg mx-auto">
          Sistemimizde geçici bir aksaklık yaşıyoruz. Teknik ekibimiz durumdan haberdar edildi ve çözmek için çalışıyor.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#1D1D1F] text-white rounded-xl font-semibold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <RefreshCcw className="w-5 h-5" /> Tekrar Dene
          </button>
          <Link 
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-sm hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" /> Ana Sayfaya Dön
          </Link>
        </div>
        
        {/* Sadece geliştirme ortamında hatayı göster (Opsiyonel) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-red-50/50 rounded-xl border border-red-100 text-left overflow-auto max-h-32">
            <p className="text-xs text-red-800 font-mono">{error.message}</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
}