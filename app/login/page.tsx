'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, googleProvider } from '../../lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Google ile Giriş Yap
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/');
    } catch (error: any) {
      console.error('Google Auth Hatası:', error);
      setErrorMsg('Google ile giriş yapılırken bir hata oluştu.');
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
      router.push('/');
    } catch (error: any) {
      console.error('Email Auth Hatası:', error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        setErrorMsg('E-posta adresi veya şifre hatalı.');
      } else if (error.code === 'auth/email-already-in-use') {
        setErrorMsg('Bu e-posta adresi zaten kullanımda.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMsg('Şifreniz en az 6 karakter olmalıdır.');
      } else {
        setErrorMsg('Giriş yapılırken bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] flex flex-col justify-center items-center px-4 py-12 text-slate-800">
      {/* Üst Logo */}
      <Link href="/" className="text-3xl font-extrabold text-[#4A154B] mb-8">
        Wedy<span className="text-[#E6007E]">Plan</span>
      </Link>

      {/* Kart Kutusu */}
      <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-xl w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-[#4A154B]">
            {isSignUp ? 'Hesap Oluştur 💍' : 'Hoş Geldiniz 👋'}
          </h1>
          <p className="text-xs text-slate-500">
            {isSignUp
              ? 'Düğün planlamanızı buluta kaydetmek için kaydolun'
              : 'Favorilerinize ve bütçenize erişmek için giriş yapın'}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl text-center font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Google ile Giriş Butonu */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl transition shadow-sm disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google ile Devam Et</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-[1px] bg-slate-100 flex-grow"></div>
          <span className="text-[10px] text-slate-400 font-bold uppercase">veya e-posta</span>
          <div className="h-[1px] bg-slate-100 flex-grow"></div>
        </div>

        {/* E-Posta / Şifre Formu */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">E-Posta Adresiniz</label>
            <input
              type="email"
              required
              placeholder="ornek@wedyplan.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Şifreniz</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E6007E] text-white py-3 rounded-xl font-bold text-xs hover:bg-pink-700 transition shadow-md disabled:opacity-50 mt-2"
          >
            {loading ? 'İşleniyor...' : isSignUp ? 'Üye Ol' : 'Giriş Yap'}
          </button>
        </form>

        {/* Alt Geçiş Linki */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
            }}
            className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E] transition"
          >
            {isSignUp
              ? 'Zaten bir hesabınız var mı? Giriş Yapın'
              : 'Hesabınız yok mu? Hemen Ücretsiz Kaydolun'}
          </button>
        </div>
      </div>
    </div>
  );
}