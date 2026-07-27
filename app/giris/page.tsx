'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthCardLayout } from '@/components/public/auth/AuthCardLayout';
import { SocialLoginButtons } from '@/components/public/auth/SocialLoginButtons';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Simüle edilen başarılı oturum yönlendirmesi
      router.push('/cift');
    }, 600);
  };

  return (
    <AuthCardLayout
      title="Hoş Geldiniz"
      subtitle="WedyPlan düğün komuta merkezinize erişmek için oturum açın."
      footerMessage="Hesabınız yok mu?"
      footerLinkText="Ücretsiz Kayıt Olun"
      footerLinkHref="/kayit"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
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

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block">
              Şifre
            </label>
            <Link
              href="/sifremi-unuttum"
              className="text-[11px] font-bold text-[#E6007E] hover:underline"
            >
              Şifremi Unuttum
            </Link>
          </div>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-[#86868B] absolute left-3.5 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Remember Me Toggle */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 accent-[#E6007E] rounded cursor-pointer"
          />
          <label htmlFor="remember" className="text-[12px] text-[#6E6E73] cursor-pointer">
            Oturumumu açık tut
          </label>
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#1D1D1F] hover:bg-black text-white text-[13px] font-bold py-3.5 rounded-full transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <span>Giriş Yapılıyor...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Giriş Yap</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Social Login */}
      <SocialLoginButtons
        onGoogleClick={() => alert('Google OAuth entegrasyonu başlatılıyor...')}
        onAppleClick={() => alert('Apple ID OAuth entegrasyonu başlatılıyor...')}
        isLoading={isLoading}
      />
    </AuthCardLayout>
  );
}