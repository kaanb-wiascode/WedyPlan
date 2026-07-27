'use client';

import React, { useState } from 'react';
import { AuthCardLayout } from '@/components/public/auth/AuthCardLayout';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

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
      title="Şifre Sıfırlama"
      subtitle="Kayıtlı e-posta adresinizi girin, sıfırlama bağlantısını anında iletelim."
      footerMessage="Şifrenizi hatırladınız mı?"
      footerLinkText="Giriş Sayfasına Dön"
      footerLinkHref="/giris"
    >
      {isSubmitted ? (
        <div className="bg-emerald-50 border border-emerald-200/80 p-6 rounded-[28px] text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="font-serif font-bold text-[18px] text-emerald-900">
            Sıfırlama Bağlantısı Gönderildi
          </h3>
          <p className="text-[12px] text-emerald-800 leading-relaxed font-light">
            <strong>{email}</strong> adresine şifre sıfırlama yönergelerini içeren bir e-posta ilettik. Lütfen gelen kutunuzu kontrol edin.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block">
              E-Posta Adresi
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-[#86868B] absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="ornek@wedyplan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] font-medium text-[#1D1D1F] outline-none focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1D1D1F] hover:bg-black text-white text-[13px] font-bold py-3.5 rounded-full transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span>Gönderiliyor...</span>
            ) : (
              <>
                <span>Sıfırlama Bağlantısı Gönder</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </AuthCardLayout>
  );
}