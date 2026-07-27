'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthCardLayout } from '@/components/public/auth/AuthCardLayout';
import { RoleSelector } from '@/components/public/auth/RoleSelector';
import { SocialLoginButtons } from '@/components/public/auth/SocialLoginButtons';
import { UserRole } from '@/types/auth';
import { Mail, Lock, User, Phone, ArrowRight, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('COUPLE');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert('Lütfen kullanım koşullarını kabul ediniz.');
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Başarılı kayıt sonrası e-posta doğrulamaya yönlendir
      router.push(`/eposta-dogrulama?email=${encodeURIComponent(email)}`);
    }, 600);
  };

  return (
    <AuthCardLayout
      title="Hesap Oluşturun"
      subtitle="Hayalinizdeki düğünü yönetmek veya işletmenizi büyütmek için katılın."
      footerMessage="Zaten hesabınız var mı?"
      footerLinkText="Giriş Yapın"
      footerLinkHref="/giris"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Selector Pill */}
        <RoleSelector selectedRole={role} onChangeRole={(r) => setRole(r)} />

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block">
            Ad Soyad / İşletme Yetkilisi
          </label>
          <div className="relative flex items-center">
            <User className="w-4 h-4 text-[#86868B] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              required
              placeholder="Selin Yılmaz"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] font-medium text-[#1D1D1F] outline-none focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100 transition"
            />
          </div>
        </div>

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

        {/* Phone Field */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block">
            Telefon Numarası
          </label>
          <div className="relative flex items-center">
            <Phone className="w-4 h-4 text-[#86868B] absolute left-3.5 pointer-events-none" />
            <input
              type="tel"
              required
              placeholder="+90 (532) 000 00 00"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] font-medium text-[#1D1D1F] outline-none focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100 transition"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block">
            Şifre Belirleyin
          </label>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-[#86868B] absolute left-3.5 pointer-events-none" />
            <input
              type="password"
              required
              placeholder="En az 8 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] font-medium text-[#1D1D1F] outline-none focus:border-[#E6007E] focus:ring-2 focus:ring-pink-100 transition"
            />
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2 pt-1">
          <input
            type="checkbox"
            id="terms"
            required
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 accent-[#E6007E] rounded cursor-pointer mt-0.5"
          />
          <label htmlFor="terms" className="text-[11px] text-[#6E6E73] cursor-pointer leading-tight">
            WedyPlan Kullanım Koşulları ve Gizlilik Politikası’nı okudum, kabul ediyorum.
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#1D1D1F] hover:bg-black text-white text-[13px] font-bold py-3.5 rounded-full transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <span>Hesap Oluşturuluyor...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Ücretsiz Kayıt Ol</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Social Register */}
      <SocialLoginButtons
        onGoogleClick={() => alert('Google ile kayıt başlatılıyor...')}
        onAppleClick={() => alert('Apple ID ile kayıt başlatılıyor...')}
        isLoading={isLoading}
      />
    </AuthCardLayout>
  );
}