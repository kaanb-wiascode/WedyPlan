'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { Eye, EyeOff } from 'lucide-react';
import { AuthCardLayout } from '@/components/public/auth/AuthCardLayout';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const searchParams = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const requestedRole =
    searchParams.get('role') === 'VENDOR' ? 'VENDOR' : 'COUPLE';
  const nextPath = searchParams.get('next');
  const isVendor = requestedRole === 'VENDOR';

  const finishLogin = (redirectUrl?: string) => {
    const fallback = isVendor ? '/firma/dashboard' : '/cift/dashboard';
    window.location.replace(nextPath || redirectUrl || fallback);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      if (!auth || !googleProvider) {
        setErrorMsg('Google girişi şu anda kullanılamıyor.');
        return;
      }

      const res = await signInWithPopup(auth, googleProvider);
      const idToken = await res.user.getIdToken();
      const syncRes = await fetch('/api/v1/auth/oauth-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, role: requestedRole }),
      });
      const data = await syncRes.json();

      if (!syncRes.ok || !data.success) {
        setErrorMsg(data.error || 'Google ile giriş yapılamadı.');
        return;
      }

      finishLogin(data.redirectUrl);
    } catch {
      setErrorMsg('Google ile giriş iptal edildi veya başarısız oldu.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Lütfen e-posta adresi ve şifrenizi giriniz.');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isSignUp ? '/api/v1/auth/register' : '/api/v1/auth/login';
      const payload = isSignUp
        ? {
            fullName: email.split('@')[0],
            email,
            password,
            role: requestedRole,
          }
        : { email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMsg(data.error || 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
        return;
      }

      finishLogin(data.redirectUrl);
    } catch {
      setErrorMsg('Bağlantı hatası oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCardLayout
      title={isSignUp ? 'Hesap oluşturun' : 'Giriş yapın'}
      subtitle={
        isSignUp
          ? 'Düğün planlamanızı tek bir yerden, sade ve güvenli yönetin.'
          : 'WedyPlan hesabınıza Apple sadeğinde devam edin.'
      }
      logoVariant={isVendor ? 'vendor' : 'couple'}
      navRightLabel={isVendor ? 'Çift Girişi' : 'Firma Girişi'}
      navRightHref={isVendor ? '/giris' : '/giris?role=VENDOR'}
    >
      {errorMsg && (
        <div className="mb-5 rounded-2xl border border-[#ff375f]/20 bg-[#ff375f]/8 px-4 py-3 text-center text-[13px] text-[#ff375f]">
          {errorMsg}
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="apple-btn-secondary mb-5 disabled:opacity-50"
      >
        <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
        Google ile devam et
      </button>

      <div className="relative mb-5 flex items-center">
        <div className="h-px flex-1 bg-black/8" />
        <span className="px-3 text-[12px] text-[#86868b]">veya</span>
        <div className="h-px flex-1 bg-black/8" />
      </div>

      <form onSubmit={handleEmailAuth} className="space-y-4">
        <div>
          <label className="apple-label">E-posta</label>
          <input
            type="email"
            required
            placeholder="ornek@wedyplan.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="apple-input"
          />
        </div>

        <div>
          <label className="apple-label">Şifre</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="apple-input pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {!isSignUp && (
          <div className="flex justify-end">
            <Link href="/sifremi-unuttum" className="text-[13px] text-[#0071e3] hover:underline">
              Şifrenizi mi unuttunuz?
            </Link>
          </div>
        )}

        <button type="submit" disabled={loading} className="apple-btn mt-2">
          {loading ? 'Lütfen bekleyin…' : isSignUp ? 'Hesap oluştur' : 'Giriş yap'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setErrorMsg('');
          }}
          className="text-[14px] text-[#86868b]"
        >
          {isSignUp ? (
            <>
              Zaten hesabınız var mı?{' '}
              <span className="font-medium text-[#0071e3]">Giriş yapın</span>
            </>
          ) : (
            <>
              Hesabınız yok mu?{' '}
              <span className="font-medium text-[#0071e3]">Kaydolun</span>
            </>
          )}
        </button>
      </div>
    </AuthCardLayout>
  );
}
