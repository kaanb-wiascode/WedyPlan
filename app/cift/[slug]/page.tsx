'use client';

import React, { use } from 'react';
import Link from 'next/link';

export default function CoupleWebsitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const formattedNames = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : 'Ahmet & Ayşe';

  return (
    <div className="min-h-screen bg-rose-50/30 text-slate-800">
      {/* Top Banner */}
      <div className="bg-[#4A154B] text-white py-3 text-center text-xs font-semibold">
        <span>💍 WedyPlan ile Oluşturulmuş Kişisel Düğün Sayfası</span>
      </div>

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <span className="text-xs font-bold text-[#E6007E] uppercase tracking-widest bg-pink-100 px-4 py-1.5 rounded-full">
          Evleniyoruz!
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#4A154B]">{formattedNames}</h1>
        <p className="text-slate-500 text-sm md:text-base font-medium">
          📅 15 Eylül 2026 • 📍 Bosphorus Palace Kır Bahçesi, İstanbul
        </p>

        {/* Görsel Galeri */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-3xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
            alt="Hikaye"
            className="w-full h-64 object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800"
            alt="Düğün"
            className="w-full h-64 object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800"
            alt="Gelin & Damat"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Hikayemiz */}
        <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm space-y-3 text-left">
          <h2 className="text-lg font-bold text-[#4A154B]">Bizim Hikayemiz ✨</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            2021 yılında başlayan yolculuğumuzu hayatımızın en özel günüyle taçlandırıyoruz. Bu mutlu günümüzde siz değerli dostlarımızı aramızda görmekten onur duyarız.
          </p>
        </div>

        {/* LCV Butonu */}
        <div className="bg-gradient-to-r from-[#4A154B] to-purple-900 text-white p-8 rounded-3xl shadow-xl text-center space-y-4">
          <h3 className="text-xl font-bold">Katılım Durumunuzu Bildirin</h3>
          <p className="text-xs text-purple-200">
            Masa düzeni ve organizasyon planlaması için lütfen LCV formunu doldurunuz.
          </p>
          <Link
            href="/lcv/demo"
            className="inline-block bg-[#E6007E] hover:bg-pink-600 text-white text-xs font-bold px-8 py-3.5 rounded-xl transition shadow-lg"
          >
            Katılım Formunu Doldur (LCV)
          </Link>
        </div>
      </div>
    </div>
  );
}