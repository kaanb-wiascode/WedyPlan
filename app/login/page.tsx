'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { Eye, EyeOff, ArrowRight, ShieldCheck, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Google ile Giriş
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/cift/dashboard');
    } catch (error: any) {
      console.error('Google Auth Hatası:', error);
      setErrorMsg('Google ile giriş yapılırken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // E-Posta / Şifre ile Giriş veya Kayıt
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/cift/dashboard');
    } catch (error: any) {
      console.error('Email Auth Hatası:', error);
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        setErrorMsg('E-posta adresi veya şifre hatalı.');
      } else if (error.code === 'auth/email-already-in-use') {
        setErrorMsg('Bu e-posta adresi zaten kullanımda.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMsg('Şifreniz en az 6 karakter olmalıdır.');
      } else {
        setErrorMsg('İşlem gerçekleştirilirken bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F5F7] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col justify-between items-center px-4 py-8 sm:py-12 font-sans antialiased selection:bg-slate-200">
      
      {/* 🍏 ÜST MİNİMAL MİMARİ MARKA HEADER */}
      <header className="w-full max-w-5xl flex items-center justify-between px-2">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-opacity group-hover:opacity-80">
            WedyPlan
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-slate-600 dark:text-zinc-300">
            Çift Portalı
          </span>
        </Link>

        <Link
          href="/firma"
          className="text-xs font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Firma Girişi →
        </Link>
      </header>

      {/* 🍏 MERKEZİ APPLE TİPİ DOKUNMATİK KART */}
      <main className="w-full max-w-[420px] mx-auto my-auto py-6">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-none rounded-3xl p-8 sm:p-10 space-y-7 transition-all">
          
          {/* Kart Başlığı */}
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isSignUp ? 'Hesap Oluşturun' : 'WedyPlan’e Giriş Yapın'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-normal">
              {isSignUp
                ? 'Düğün planlamanızı bulutta güvenle yönetin.'
                : 'Bütçenize, takviminize ve WedyAI asistanınıza erişin.'}
            </p>
          </div>

          {/* Hata Bildirimi */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/60 text-rose-600 dark:text-rose-300 text-xs font-medium text-center animate-in fade-in duration-200">
              {errorMsg}
            </div>
          )}

          {/* Google Giriş Butonu */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 px-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/60 text-xs font-semibold text-slate-800 dark:text-zinc-200 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google ile Devam Et</span>
          </button>

          {/* Ayraç */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-200/80 dark:border-zinc-800 w-full" />
            <span className="bg-white/80 dark:bg-zinc-900 px-3 text-[10px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-widest shrink-0">
              veya e-posta
            </span>
          </div>

          {/* E-Posta / Şifre Formu */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400">
                E-Posta
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="isim@ornek.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/60 dark:bg-zinc-800/50 border border-slate-200/80 dark:border-zinc-700/60 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-900 dark:focus:border-white focus:bg-white dark:focus:bg-zinc-800 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400">
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-50/60 dark:bg-zinc-800/50 border border-slate-200/80 dark:border-zinc-700/60 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-900 dark:focus:border-white focus:bg-white dark:focus:bg-zinc-800 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 p-1"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex justify-end pt-0.5">
                <Link
                  href="/sifremi-unuttum"
                  className="text-[11px] font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Şifrenizi mi unuttunuz?
                </Link>
              </div>
            )}

            {/* Apple Tarzı Siyah Buton */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>İşleniyor...</span>
              ) : (
                <>
                  <span>{isSignUp ? 'Hesap Oluştur' : 'Giriş Yap'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Sekme Değiştirici (Giriş Yap <-> Kayıt Ol) */}
          <div className="text-center pt-1 border-t border-slate-100 dark:border-zinc-800/80">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg('');
              }}
              className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {isSignUp ? (
                <span>Zaten hesabınız var mı? <strong className="font-semibold text-slate-900 dark:text-white">Giriş Yapın</strong></span>
              ) : (
                <span>Hesabınız yok mu? <strong className="font-semibold text-slate-900 dark:text-white">Kaydolun</strong></span>
              )}
            </button>
          </div>

        </div>
      </main>

      {/* 🍏 MİNİMAL MİMARİ FOOTER */}
      <footer className="w-full max-w-5xl flex items-center justify-between text-[11px] text-slate-400 dark:text-zinc-500 px-2">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Firebase Güvenli Oturum
        </span>
        <span>© 2026 WedyPlan Inc. Tüm hakları saklıdır.</span>
      </footer>

    </div>
  );
}