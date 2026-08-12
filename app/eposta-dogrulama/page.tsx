'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AuthCardLayout } from '@/components/public/auth/AuthCardLayout';

function EpostaDogrulamaContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    fetch('/api/v1/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (res.ok) {
          setStatus('success');
          setTimeout(() => router.push('/cift/dashboard'), 3000);
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, [token, router]);

  return (
    <AuthCardLayout
      title={
        status === 'success'
          ? 'Doğrulandı'
          : status === 'error'
            ? 'Bağlantı geçersiz'
            : 'Doğrulanıyor'
      }
      subtitle={
        status === 'success'
          ? 'Hesabınız aktif. Panelinize yönlendiriliyorsunuz.'
          : status === 'error'
            ? 'Bu bağlantı geçersiz veya süresi dolmuş olabilir.'
            : 'E-posta adresiniz kontrol ediliyor.'
      }
      footerLinkHref="/giris"
      footerLinkText="Giriş yapın"
      footerMessage="Hesabınıza dönmek ister misiniz?"
    >
      {status === 'loading' && (
        <div className="flex justify-center py-6">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#0071e3] border-t-transparent" />
        </div>
      )}
      {status === 'success' && (
        <div className="rounded-2xl bg-white/50 px-5 py-6 text-center text-[15px] text-[#86868b]">
          Her şey hazır.
        </div>
      )}
      {status === 'error' && (
        <Link href="/giris" className="apple-btn">
          Giriş ekranına dön
        </Link>
      )}
    </AuthCardLayout>
  );
}

export default function EpostaDogrulamaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" />}>
      <EpostaDogrulamaContent />
    </Suspense>
  );
}
