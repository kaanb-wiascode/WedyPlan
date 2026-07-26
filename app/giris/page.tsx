'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Heart, Store, Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'COUPLE' | 'VENDOR'>('COUPLE');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        router.push(userType === 'VENDOR' ? '/firma/talepler' : '/cift');
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCred.user.uid), {
          uid: userCred.user.uid,
          email,
          fullName,
          role: userType,
          createdAt: serverTimestamp(),
        });
        router.push(userType === 'VENDOR' ? '/firma/talepler' : '/cift');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Bir hata oluştu. Bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F8] via-[#F8F5FF] to-[#F1F5FE] flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-3xl border border-white p-8 rounded-[32px] shadow-xl max-w-md w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E6007E] to-pink-400 mx-auto flex items-center justify-center text-white shadow-md shadow-pink-200">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <h1 className="font-serif font-bold text-[24px] text-[#1D1D1F]">
            WedyPlan'e Hoş Geldiniz
          </h1>
          <p className="text-[12px] text-[#6E6E73]">
            {mode === 'login' ? 'Hesabınıza giriş yapın' : 'Ücretsiz hesabınızı oluşturun'}
          </p>
        </div>

        {/* Tip Seçici (Çift vs Firma) */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100/80 rounded-2xl text-[12px] font-bold">
          <button
            type="button"
            onClick={() => setUserType('COUPLE')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              userType === 'COUPLE' ? 'bg-white text-[#E6007E] shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Evlenen Çift
          </button>
          <button
            type="button"
            onClick={() => setUserType('VENDOR')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              userType === 'VENDOR' ? 'bg-white text-[#1D1D1F] shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Store className="w-3.5 h-3.5" /> Hizmet Veren / Firma
          </button>
        </div>

        {/* Hata Mesajı */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-[11px] font-medium text-center">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                {userType === 'COUPLE' ? 'Ad & Soyad (Çift İsimleri)' : 'Firma / İşletme Adı'}
              </label>
              <input
                type="text"
                required
                placeholder={userType === 'COUPLE' ? 'Selin & Kaan' : 'Luxe Kır Bahçesi'}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#E6007E] bg-white"
              />
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">E-Posta Adresi</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                placeholder="ornek@wedyplan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-9 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#E6007E] bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">Şifre</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-9 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#E6007E] bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E6007E] text-white text-xs font-bold py-3.5 rounded-xl hover:bg-pink-700 transition shadow-md shadow-pink-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? 'İşleniyor...' : mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol ve Başla'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Mod Değiştirme Linki */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-[12px] font-semibold text-[#6E6E73] hover:text-[#E6007E] transition cursor-pointer"
          >
            {mode === 'login' ? 'Hesabınız yok mu? Hemen Kayıt Olun' : 'Zaten hesabınız var mı? Giriş Yapın'}
          </button>
        </div>

      </div>
    </div>
  );
}