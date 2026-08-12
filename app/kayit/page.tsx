'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { AuthCardLayout } from '@/components/public/auth/AuthCardLayout';

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
        window.location.href = '/cift/onboarding';
      } else {
        setErrorMessage(resData.error || resData.message || 'Kayıt yapılırken bir hata oluştu.');
      }
    } catch {
      setErrorMessage('Bağlantı hatası oluştu, lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCardLayout
      title="Hesap oluşturun"
      subtitle="Düğününüzü planlamak için birkaç sade adım."
      footerMessage="Zaten hesabınız var mı?"
      footerLinkText="Giriş yapın"
      footerLinkHref="/giris"
    >
      {errorMessage && (
        <div className="mb-5 rounded-2xl border border-[#ff375f]/20 bg-[#ff375f]/8 px-4 py-3 text-center text-[13px] text-[#ff375f]">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="apple-label">Ad Soyad</label>
          <input
            type="text"
            required
            placeholder="Eda Yılmaz"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="apple-input"
          />
        </div>

        <div>
          <label className="apple-label">E-posta</label>
          <input
            type="email"
            required
            placeholder="eda@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="apple-input"
          />
        </div>

        <div>
          <label className="apple-label">Şifre</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              placeholder="En az 6 karakter"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="apple-input pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="apple-label">Tahmini düğün tarihi (isteğe bağlı)</label>
          <input
            type="date"
            value={formData.weddingDate}
            onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
            className="apple-input"
          />
        </div>

        <button type="submit" disabled={isLoading} className="apple-btn mt-2">
          {isLoading ? 'Oluşturuluyor…' : 'Ücretsiz kayıt ol'}
        </button>
      </form>
    </AuthCardLayout>
  );
}
