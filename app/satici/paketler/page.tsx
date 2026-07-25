'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  badge?: string;
}

const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Ücretsiz Standart',
    price: '0 TL',
    period: 'Sonsuza Kadar',
    features: [
      'Temel Firma Profili ve Galeri (3 Fotoğraf)',
      'Aylık 5 Ücretsiz Fiyat Teklifi Alımı',
      'Standart Arama Sıralaması',
      'E-Posta Desteği',
    ],
  },
  {
    id: 'gold',
    name: 'Gold İş Ortağı',
    price: '1.490 TL',
    period: '/ Ay',
    popular: true,
    badge: 'En Çok Tercih Edilen',
    features: [
      'Sınırsız Fotoğraf ve Video Galerisi',
      'Sınırsız Fiyat Teklifi ve Randevu Alımı',
      'Doğrudan WhatsApp İletişim Butonu',
      'Arama Sonuçlarında Üst Sıralar',
      'Rekabet ve Pazar Analitiği Paneli',
      'Özel Erken Rezervasyon Kuponu Tanımlama',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum Lider',
    price: '2.990 TL',
    period: '/ Ay',
    badge: 'Maksimum Müşteri',
    features: [
      'Gold Paketteki Tüm Özellikler',
      '👑 Ana Sayfada "Sponsorlu İlan" Rozeti',
      'Kendi Kategorisinde İlk 3 Sıra Garantisi',
      'Öncelikli Müşteri Bildirimleri (SMS & WhatsApp)',
      '7/24 Özel B2B Müşteri Temsilcisi',
      'Aylık Performans ve Rakip Raporu (PDF)',
    ],
  },
];

export default function B2BPackagesPage() {
  const [currentPlan] = useState('basic');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleUpgrade = (planName: string) => {
    setSelectedPlan(planName);
    alert(`🎉 "${planName}" paketi geçiş talebiniz alındı! Müşteri temsilcimiz onay ve ödeme adımları için sizinle iletişime geçecektir.`);
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
          <span className="text-[10px] bg-purple-100 text-[#4A154B] px-2.5 py-1 rounded-md ml-2 font-bold uppercase">
            B2B Kurumsal
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/satici/rekabet" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
            📊 Rekabet Analizi
          </Link>
          <Link href="/satici" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
            ← İş Ortağı Paneli
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Üst Başlık */}
        <div className="text-center space-y-3">
          <span className="bg-pink-50 text-[#E6007E] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border border-pink-100">
            İşinizi Büyütün
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#4A154B]">
            Kurumsal Üyelik Paketleri & Doping 🚀
          </h1>
          <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto">
            Gelen müşteri taleplerini 5 katına çıkarmak ve şehrinizdeki lider düğün markası olmak için paketiniz yükseltin.
          </p>
        </div>

        {/* Mevcut Durum Kartı */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 text-[#4A154B] rounded-2xl flex items-center justify-center font-extrabold text-xl">
              🏢
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-800">Mevcut Üyelik Paketiniz:</h3>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                  Ücretsiz Standart
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Kalan Müşteri Teklif Krediniz: <strong>3 / 5 Teklif</strong>
              </p>
            </div>
          </div>

          <Link
            href="/satici/talepler"
            className="bg-[#4A154B] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-purple-900 transition whitespace-nowrap shadow"
          >
            Müşteri Taleplerine Git →
          </Link>
        </div>

        {/* Paket Karşılaştırma Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative ${
                plan.popular
                  ? 'border-[#E6007E] ring-2 ring-pink-500/20 shadow-xl scale-105 z-10'
                  : 'border-purple-100 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#E6007E] to-purple-800 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow uppercase">
                  {plan.badge}
                </span>
              )}

              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-[#4A154B]">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-400 font-semibold">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600">
                  {plan.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleUpgrade(plan.name)}
                disabled={currentPlan === plan.id}
                className={`w-full mt-8 text-xs font-bold py-3.5 rounded-xl transition shadow ${
                  plan.popular
                    ? 'bg-[#E6007E] hover:bg-pink-700 text-white'
                    : currentPlan === plan.id
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-[#4A154B] hover:bg-purple-900 text-white'
                }`}
              >
                {currentPlan === plan.id ? 'Mevcut Paketiniz' : `${plan.name} Paketine Geç`}
              </button>
            </div>
          ))}
        </div>

        {/* Hızlı Doping / Add-On Kartları */}
        <div className="bg-gradient-to-r from-slate-900 to-[#4A154B] rounded-3xl p-6 md:p-8 text-white shadow-xl space-y-4">
          <div>
            <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded uppercase">
              Hızlı Doping Satın Al
            </span>
            <h2 className="text-xl font-bold mt-2">Abonelik Değiştirmeden Anında Öne Çıkın ⚡</h2>
            <p className="text-xs text-purple-200">
              Aylık paketinizi değiştirmek istemiyorsanız, tek seferlik doping satın alarak ilanınızı üst sıraya taşıyabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-amber-300">👑 7 Günlük Sponsorlu İlan</h4>
                <p className="text-[11px] text-purple-200 mt-1">Arama sonuçlarında ve ana sayfada 1 hafta ilk sırada görünme.</p>
              </div>
              <button
                onClick={() => handleUpgrade('7 Günlük Sponsorlu Doping')}
                className="mt-4 bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-extrabold py-2 px-3 rounded-lg transition"
              >
                490 TL - Satın Al
              </button>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-emerald-300">📱 WhatsApp İletişim Butonu Dopingi</h4>
                <p className="text-[11px] text-purple-200 mt-1">İlanınıza doğrudan WhatsApp sohbet başlatma butonu ekleyin.</p>
              </div>
              <button
                onClick={() => handleUpgrade('WhatsApp Buton Dopingi')}
                className="mt-4 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-extrabold py-2 px-3 rounded-lg transition"
              >
                290 TL - Satın Al
              </button>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-pink-300">➕ 50 Ek Müşteri Teklif Kredisi</h4>
                <p className="text-[11px] text-purple-200 mt-1">Gelen teklif limitinize anında +50 ek kredi tanımlanır.</p>
              </div>
              <button
                onClick={() => handleUpgrade('50 Ek Teklif Kredisi')}
                className="mt-4 bg-[#E6007E] hover:bg-pink-600 text-white text-xs font-extrabold py-2 px-3 rounded-lg transition"
              >
                390 TL - Satın Al
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}