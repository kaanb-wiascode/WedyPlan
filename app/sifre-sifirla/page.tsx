'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthCardLayout } from '@/components/public/auth/AuthCardLayout';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Şifreler birbiriyle eşleşmiyor.');
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      router.push('/giris');
    }, 1500);
  };

  return (
    <AuthCardLayout
      title="Yeni Şifre Belirleme"
      subtitle="Hesabınız için güçlü ve güvenli yeni bir şifre tanımlayın."
    >
      {isSuccess ? (
        <div className="bg-emerald-50 border border-emerald-200/80 p-6 rounded-[28px] text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
          <h3 className="font-serif font-bold text-[18px] text-emerald-900">
            Şifreniz Başarıyla Güncellendi!
          </h3>
          <p className="text-[12px] text-emerald-800">
            Giriş sayfasına yönlendiriliyorsunuz...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block">
              Yeni Şifre
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-[#86868B] absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] font-medium text-[#1D1D1F] outline-none focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block">
              Yeni Şifre Tekrar
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-[#86868B] absolute left-3.5 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] font-medium text-[#1D1D1F] outline-none focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1D1D1F] hover:bg-black text-white text-[13px] font-bold py-3.5 rounded-full transition shadow-md cursor-pointer"
          >
            Şifreyi Güncelle & Giriş Yap
          </button>
        </form>
      )}
    </AuthCardLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Yükleniyor...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}