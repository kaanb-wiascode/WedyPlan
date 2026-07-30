'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  User, 
  Mail, 
  Lock, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import Link from 'next/link';

export default function CoupleRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    partnerName: '',
    email: '',
    password: '',
    weddingDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: 'COUPLE',
        }),
      });

      const resData = await response.json();

      if (response.ok) {
        alert('Kayıt başarılı! Doğrulama e-postanızı kontrol edin.');
        window.location.href = '/giris';
      } else {
        alert(resData.error || 'Kayıt sırasında bir hata oluştu.');
      }
    } catch (err) {
      console.error('Kayıt hatası:', err);
      alert('Sistemsel bir hata oluştu, lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Arka Plan Soft Işıltı Efektleri */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-200/40 dark:bg-rose-900/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-100/50 dark:bg-amber-900/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-xl"
      >
        {/* Glassmorphism Ana Kart */}
        <div className="relative rounded-3xl border border-white/60 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-2xl p-6 sm:p-10">
          
          {/* Header & Rozet */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200/60 dark:border-rose-800/50 text-rose-600 dark:text-rose-300 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Düğün Planlamanıza Bugün Başlayın</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-white tracking-tight">
              Hayalinizdeki Düğünü Planlayın
            </h1>
            
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
              Tüm bütçe, davetli ve tedarikçi süreçlerinizi yapay zekâ destekli tek bir paneller yönetin.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Çift İsimleri (Yan Yana Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                  Adınız & Soyadınız
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    required
                    placeholder="Eda Yılmaz"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                  Eşinizin Adı (Opsiyonel)
                </label>
                <div className="relative">
                  <Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Mert Kaya"
                    value={formData.partnerName}
                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400"
                  />
                </div>
              </div>
            </div>

            {/* E-Posta */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                E-Posta Adresiniz
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  placeholder="eda.mert@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* Parola & Düğün Tarihi Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                  Şifreniz
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-10 py-3 text-sm bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400"
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

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                  Tahmini Düğün Tarihi
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Avantaj Özetleri */}
            <div className="py-2 grid grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Ücretsiz Akıllı Bütçe Takibi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>AI Asistan Desteği</span>
              </div>
            </div>

            {/* Gönder Butonu */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-medium text-sm shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/35 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Ücretsiz Hesabınızı Oluşturun</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Alt Bilgi & Giriş Yap */}
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/60 text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Zaten bir hesabınız var mı?{' '}
              <Link
                href="/giris"
                className="font-semibold text-rose-600 dark:text-rose-400 hover:underline ml-1"
              >
                Giriş Yapın
              </Link>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}