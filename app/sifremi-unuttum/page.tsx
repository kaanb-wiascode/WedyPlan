'use client';

import React, { useState } from 'react';
import { AuthCardLayout } from '@/components/public/auth/AuthCardLayout';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <AuthCardLayout
      title="Şifrenizi sıfırlayın"
      subtitle="Kayıtlı e-posta adresinize kısa bir bağlantı gönderelim."
      footerMessage="Şifrenizi hatırladınız mı?"
      footerLinkText="Giriş yapın"
      footerLinkHref="/giris"
    >
      {isSubmitted ? (
        <div className="rounded-2xl bg-white/50 px-5 py-8 text-center">
          <p className="text-[17px] font-medium tracking-[-0.02em] text-[#1d1d1f]">
            Bağlantı gönderildi
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-[#86868b]">
            <strong className="font-medium text-[#1d1d1f]">{email}</strong> adresine
            sıfırlama yönergelerini ilettik.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" disabled={isLoading} className="apple-btn">
            {isLoading ? 'Gönderiliyor…' : 'Sıfırlama bağlantısı gönder'}
          </button>
        </form>
      )}
    </AuthCardLayout>
  );
}
