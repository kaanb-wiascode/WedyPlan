'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { AuthCardLayout } from '@/components/public/auth/AuthCardLayout';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Şifreler birbiriyle eşleşmiyor.');
      return;
    }

    void token;
    setIsSuccess(true);
    setTimeout(() => {
      router.push('/giris');
    }, 1500);
  };

  return (
    <AuthCardLayout
      title="Yeni şifre"
      subtitle="Hesabınız için sade ve güvenli bir şifre belirleyin."
      footerMessage="Hazır mısınız?"
      footerLinkText="Giriş yapın"
      footerLinkHref="/giris"
    >
      {isSuccess ? (
        <div className="rounded-2xl bg-white/50 px-5 py-8 text-center">
          <p className="text-[17px] font-medium tracking-[-0.02em] text-[#1d1d1f]">
            Şifreniz güncellendi
          </p>
          <p className="mt-2 text-[14px] text-[#86868b]">Giriş sayfasına yönlendiriliyorsunuz…</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="rounded-2xl border border-[#ff375f]/20 bg-[#ff375f]/8 px-4 py-3 text-center text-[13px] text-[#ff375f]">
              {errorMessage}
            </div>
          )}
          <div>
            <label className="apple-label">Yeni şifre</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
          <div>
            <label className="apple-label">Şifre tekrar</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="apple-input"
            />
          </div>
          <button type="submit" className="apple-btn">
            Şifreyi güncelle
          </button>
        </form>
      )}
    </AuthCardLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
