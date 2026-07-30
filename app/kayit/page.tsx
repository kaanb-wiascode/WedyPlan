'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AuthCardLayout from '@/components/public/auth/AuthCardLayout';

export default function KayitPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Doğrudan sayfaya fırlatmak yerine "Mail Gönderildi" durumuna geç
        setIsSent(true);
      } else {
        setErrorMessage(data.error || 'Kayıt esnasında bir hata oluştu.');
      }
    } catch (err) {
      setErrorMessage('Ağ hatası oluştu, lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (isSent) {
    return (
      <AuthCardLayout
        title="E-Postanızı Kontrol Edin"
        subtitle="Düğün planlamanıza başlamak için son bir adım kaldı."
      >
        <div className="text-center space-y-4 py-4">
          <div className="w-14 h-14 bg-[#111111] text-[#E5E5E5] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            ✉️
          </div>
          <p className="text-sm font-semibold text-[#111111]">
            <span className="font-bold">{formData.email}</span> adresine doğrulama bağlantısı gönderildi.
          </p>
          <p className="text-xs text-[#666666] leading-relaxed">
            Lütfen e-posta kutunuzu (gerekirse Spam/Spam Olmayan klasörünü) kontrol edin ve gelen maildeki bağlantıya tıklayın.
          </p>
          <div className="pt-4 border-t border-[#D5D5D5]">
            <Link
              href="/giris"
              className="inline-block bg-[#111111] text-[#E5E5E5] text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#333333] transition-colors"
            >
              Giriş Ekranına Git
            </Link>
          </div>
        </div>
      </AuthCardLayout>
    );
  }

  return (
    <AuthCardLayout
      title="Hesap Oluşturun"
      subtitle="WedyPlan Studio dünyasına katılın ve düğününüzü akıllı asistanınızla planlayın."
      footerMessage="Zaten hesabınız var mı?"
      footerLinkText="Giriş Yapın"
      footerLinkHref="/giris"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="bg-rose-50 text-rose-700 text-xs p-3 rounded-xl border border-rose-200 text-center">
            {errorMessage}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-[#111111] mb-1">Ad Soyad</label>
          <input
            type="text"
            required
            placeholder="Örn: Ayşe Yılmaz"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#EFEFEF] border border-[#D5D5D5] rounded-xl px-4 py-2.5 text-xs text-[#111111] focus:border-[#111111] outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#111111] mb-1">E-Posta Adresi</label>
          <input
            type="email"
            required
            placeholder="ornek@wedyplan.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-[#EFEFEF] border border-[#D5D5D5] rounded-xl px-4 py-2.5 text-xs text-[#111111] focus:border-[#111111] outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#111111] mb-1">Şifre</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-[#EFEFEF] border border-[#D5D5D5] rounded-xl px-4 py-2.5 text-xs text-[#111111] focus:border-[#111111] outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#111111] text-[#E5E5E5] text-xs font-bold py-3 rounded-xl hover:bg-[#333333] transition-colors disabled:opacity-50 mt-2"
        >
          {loading ? 'Hesap Oluşturuluyor...' : 'Ücretsiz Kayıt Ol'}
        </button>
      </form>
    </AuthCardLayout>
  );
}