'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Heart,
  Building2,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Google ile Giriş
  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/cift/dashboard');
    } catch (error: any) {
      console.error('Google Auth Hatası:', error);
      setErrorMessage('Google ile giriş yapılırken bir hata oluştu.');
    }
  };

  // E-Posta / Şifre ile Giriş
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Lütfen e-posta adresi ve şifrenizi giriniz.');
      return;
    }

    startTransition(async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/cift/dashboard');
      } catch (error: any) {
        console.error('Email Auth Hatası:', error);
        if (
          error.code === 'auth/invalid-credential' ||
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          setErrorMessage('E-posta adresi veya şifre hatalı.');
        } else if (error.code === 'auth/too-many-requests') {
          setErrorMessage('Çok fazla başarısız deneme. Lütfen biraz bekleyin.');
        } else {
          setErrorMessage('Giriş yapılırken bir hata oluştu.');
        }
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex font-sans antialiased overflow-hidden">
      
      {/* 🟢 SOL PANEL: LÜKS GÖRSEL VE WedyAI TANITIMI (Desktop) */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-zinc-900 via-rose-950/40 to-zinc-950 p-12 flex-col justify-between overflow-hidden border-r border-zinc-800/80">
        
        {/* Arka Plan Işık Efektleri */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Üst Marka Logosu */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black bg-gradient-to-r from-rose-500 via-rose-400 to-amber-300 bg-clip-text text-transparent tracking-tight">
              WedyPlan
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              PRO
            </span>
          </Link>

          <Link
            href="/firma"
            className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 bg-zinc-900/60 px-3.5 py-1.5 rounded-full border border-zinc-800"
          >
            <Building2 className="w-3.5 h-3.5 text-rose-400" /> Firma Girişi
          </Link>
        </div>

        {/* Orta Vurgu & Yorum Kartı */}
        <div className="relative z-10 my-auto space-y-8 max-w-lg">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Yapay Zeka Destekli Düğün Planlama</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Hayalinizdeki Düğünü Birlikte Kurgulayalım.
            </h2>

            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
              Bütçe yönetiminden davetli LCV takibine, WedyAI hızlı yanıt asistanından tedarikçi anlaşmalarına kadar tüm süreç elinizin altında.
            </p>
          </div>

          {/* Müşteri / Çift Değerlendirme Kartı */}
          <div className="p-5 rounded-3xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 space-y-3 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 text-white font-black text-xs flex items-center justify-center shrink-0">
                S&H
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Sadi & Hamiyet</h4>
                <p className="text-[11px] text-zinc-400">15 Ağustos 2026 • İstanbul</p>
              </div>
            </div>
            <p className="text-xs text-zinc-300 italic leading-relaxed">
              "WedyPlan sayesinde bütçemizi hiç aşmadan tüm tedarikçilerimizi organize ettik. WedyAI uyarısı olmasaydı mekan taksitini unutuyorduk!"
            </p>
          </div>
        </div>

        {/* Alt Güvenlik & Telif Rozeti */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-500 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Firebase 256-Bit SSL Koruması
          </span>
          <span>© 2026 WedyPlan Inc.</span>
        </div>
      </div>

      {/* 🔴 SAĞ PANEL: GİRİŞ FORMU */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 md:p-16 bg-zinc-950 relative overflow-y-auto">
        
        {/* Mobil Header Logo */}
        <div className="flex lg:hidden items-center justify-between mb-8">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-rose-500 to-amber-300 bg-clip-text text-transparent">
            WedyPlan
          </Link>
          <Link href="/firma" className="text-xs font-bold text-rose-400">
            Firma Girişi
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto space-y-8">
          
          {/* Form Başlığı */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              Çift Portalı Girişi <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium">
              Düğün planlama panelinize erişmek için bilgilerinizi girin.
            </p>
          </div>

          {/* HATA BİLDİRİMİ */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* GİRİŞ FORMU */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* E-Posta Alanı */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-rose-400" /> E-Posta Adresi
              </label>
              <input
                type="email"
                placeholder="ornek@wedyplan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-medium"
                required
              />
            </div>

            {/* Şifre Alanı */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-rose-400" /> Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Beni Hatırla & Şifremi Unuttum */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-400 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md bg-zinc-900 border-zinc-800 text-rose-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span>Beni Hatırla</span>
              </label>

              <Link
                href="/sifremi-unuttum"
                className="font-bold text-rose-400 hover:text-rose-300 transition-colors"
              >
                Şifremi Unuttum?
              </Link>
            </div>

            {/* Giriş Butonu */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white text-xs font-extrabold shadow-lg shadow-rose-950/50 hover:shadow-rose-900/80 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Giriş Yapılıyor...</span>
                </>
              ) : (
                <>
                  <span>Giriş Yap ve Başla</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Ayraç */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-zinc-800 w-full" />
            <span className="bg-zinc-950 px-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider shrink-0">
              veya
            </span>
          </div>

          {/* Google Giriş Butonu */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-200 transition-all flex items-center justify-center gap-3 shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google ile Devam Et</span>
            </button>
          </div>

          {/* Kayıt Ol Cta */}
          <div className="text-center pt-2">
            <p className="text-xs text-zinc-400 font-medium">
              Henüz bir hesabınız yok mu?{' '}
              <Link href="/kayit" className="font-extrabold text-rose-400 hover:text-rose-300 transition-colors">
                Ücretsiz Kaydolun
              </Link>
            </p>
          </div>

        </div>

        {/* Mobil Alt Güvenlik Bilgisi */}
        <div className="flex lg:hidden justify-center text-[10px] text-zinc-500 pt-6">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Firebase Güvenli Oturum
          </span>
        </div>

      </div>

    </div>
  );
}