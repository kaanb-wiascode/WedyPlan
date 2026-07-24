'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin'); // Başarılı girişte admin paneline yönlendir
    } catch (err: any) {
      console.error('Giriş hatası:', err);
      setError('E-posta veya şifre hatalı!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-purple-100 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#4A154B]">
            Wedy<span className="text-[#E6007E]">Plan</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Yönetim Paneli Girişi</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">E-Posta Adresi</label>
            <input
              type="email"
              required
              placeholder="admin@wedyplan.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#E6007E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Şifre</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#E6007E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E6007E] text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition shadow-md disabled:opacity-50 mt-2"
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}