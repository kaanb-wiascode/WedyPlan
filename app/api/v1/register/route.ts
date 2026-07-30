'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';

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
    <div className="min-h-screen bg-[#E5E5E5] flex flex-col justify-center items-center p-4">
      <div className="bg-[#EFEFEF] border border-[#D5D5D5] p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-sm">
        <div className="flex justify-center">
          <BrandLogo variant="main" width={180} height={40} />
        </div>

        {status === 'loading' && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#111111]">E-Posta Doğrulanıyor...</h2>
            <p className="text-xs text-[#666666]">Lütfen e-posta adresiniz doğrulanırken bekleyin.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-3">
            <div className="w-12 h-12 bg-[#111111] text-[#E5E5E5] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h2 className="text-xl font-serif font-bold text-[#111111]">E-Postanız Doğrulandı!</h2>
            <p className="text-xs text-[#666666]">Hesabınız başarıyla aktif edildi. Panelinize yönlendiriliyorsunuz...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-rose-800">Doğrulama Başarısız</h2>
            <p className="text-xs text-[#666666]">Geçersiz veya süresi dolmuş bağlantı.</p>
            <div>
              <Link href="/giris" className="inline-block bg-[#111111] text-[#E5E5E5] text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#333333] transition-colors">
                Giriş Ekranına Dön
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EpostaDogrulamaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#E5E5E5]" />}>
      <EpostaDogrulamaContent />
    </Suspense>
  );
}