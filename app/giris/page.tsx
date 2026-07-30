'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import BrandLogo from '@/components/ui/brand-logo';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        // Kullanıcı bilgisini ve rolünü kaydediyoruz
        const role = resData.user?.role || 'ADMIN';
        localStorage.setItem('user_role', role);
        localStorage.setItem('user_email', resData.user?.email || formData.email);

        // Role göre yönlendirme
        if (role === 'ADMIN') {
          window.location.href = '/admin';
        } else if (role === 'VENDOR') {
          window.location.href = '/satici/dashboard';
        } else {
          window.location.href = '/cift/dashboard';
        }
      } else {
        setErrorMessage(resData.error || resData.message || 'Giriş yapılamadı. Bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      console.error('Giriş hatası:', err);
      setErrorMessage('Bağlantı hatası oluştu, lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-zinc-950 text-zinc-100">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
          
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <BrandLogo className="h-9 w-auto" />
            </Link>

            <div className="space-y-1">
              <h1 className="text-2xl font-serif font-bold tracking-tight text-white">
                Platforma Giriş Yapın
              </h1>
              <p className="text-xs text-zinc-400">
                Çift, Tedarikçi veya Yönetici hesabınızla devam edin
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-950/40 border border-rose-900/50 text-rose-400 text-xs font-medium text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 ml-1">E-Posta Adresi</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder="kaanatamer@wiascorp.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-800/50 border border-zinc-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300 ml-1">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-zinc-800/50 border border-zinc-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-white placeholder:text-zinc-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3 px-5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 font-medium text-sm shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Giriş Yap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-800/80 text-center">
            <p className="text-xs text-zinc-400">
              Hesabınız yok mu?{' '}
              <Link href="/kayit" className="font-semibold text-rose-400 hover:underline ml-1">
                Kayıt Olun
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}