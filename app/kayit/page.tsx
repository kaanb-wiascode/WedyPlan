'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Calendar, 
  ArrowRight, 
  Eye, 
  EyeOff,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import BrandLogo from '@/components/ui/brand-logo';

export default function CoupleRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    weddingDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          weddingDate: formData.weddingDate || null,
          role: 'COUPLE',
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        // Kayıt başarılı -> İlk kurulum sihirbazına yönlendir
        window.location.href = '/cift/onboarding';
      } else {
        setErrorMessage(resData.error || resData.message || 'Kayıt yapılırken bir hata oluştu.');
      }
    } catch (err) {
      console.error('Kayıt hatası:', err);
      setErrorMessage('Bağlantı hatası oluştu, lütfen internetinizi kontrol edip tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      
      {/* Soft Lüks Arka Plan Vurgusu */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 dark:bg-rose-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Ana Kart */}
        <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 shadow-xl shadow-zinc-900/5 backdrop-blur-md p-6 sm:p-8">
          
          {/* Logo ve Başlık */}
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <BrandLogo className="h-9 w-auto" />
            </Link>

            <div className="space-y-1">
              <h1 className="text-2xl font-serif font-bold tracking-tight text-zinc-900 dark:text-white">
                Çift Hesabı Oluşturun
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Düğün planlamanızı yapay zekâ asistanıyla tek noktadan yönetin
              </p>
            </div>
          </div>

          {/* Hata Bildirimi */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-medium text-center">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Ad Soyad */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                Ad Soyad
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  required
                  placeholder="Eda Yılmaz"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* E-Posta */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                E-Posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  placeholder="eda@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* Şifre */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Düğün Tarihi */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                Tahmini Düğün Tarihi <span className="text-zinc-400 font-normal">(İsteğe Bağlı)</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-zinc-900 dark:text-white"
                />
              </div>
            </div>

            {/* Buton */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-3 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-medium text-sm shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Ücretsiz Kayıt Ol</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Alt Bilgi */}
          <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80 text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Zaten hesabınız var mı?{' '}
              <Link
                href="/giris"
                className="font-semibold text-rose-600 dark:text-rose-400 hover:underline ml-1"
              >
                Giriş Yap
              </Link>
            </p>
          </div>

        </div>

        {/* Kurumsal Rozet */}
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-zinc-400" />
          <span>Güvenli ve Gizli Düğün Planlama Arayüzü</span>
        </div>
      </motion.div>
    </div>
  );
}