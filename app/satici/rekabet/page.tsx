'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function VendorAnalyticsPage() {
  // Simüle Edilen Rekabet Verileri (Gelecekte Firestore verileriyle dinamikleşebilir)
  const [vendorData] = useState({
    name: 'Bosphorus Palace Kır Bahçesi',
    category: 'Kır Bahçesi',
    city: 'İstanbul',
    rankInCity: 3,
    totalCompetitors: 48,
    healthScore: 82,
    metrics: {
      views: { vendor: 1420, avg: 850 },
      leads: { vendor: 38, avg: 22 },
      responseTime: { vendor: '25 dk', avg: '120 dk' },
      avgPrice: { vendor: '120.000 TL', avg: '95.000 TL' },
    },
  });

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
          <span className="text-[10px] bg-purple-100 text-[#4A154B] px-2.5 py-1 rounded-md ml-2 font-bold uppercase">
            📊 Rekabet & Analiz
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/satici/talepler" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
            📥 Müşteri Talepleri
          </Link>
          <Link href="/satici" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
            ← İş Ortağı Paneli
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Üst Kart: Rekabet Sıralaması & Sağlık Skoru */}
        <div className="bg-gradient-to-r from-[#4A154B] via-purple-900 to-[#E6007E] p-6 md:p-8 rounded-3xl text-white shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div className="md:col-span-2 space-y-2">
            <span className="bg-white/20 text-pink-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              Pazar Liderliği İncelemesi
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold">{vendorData.name}</h1>
            <p className="text-purple-200 text-xs md:text-sm">
              📍 <strong>{vendorData.city} - {vendorData.category}</strong> pazarındaki canlı rekabet ve performans analiziniz.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-2xl border border-white/20 text-center backdrop-blur-sm space-y-1">
            <span className="text-xs text-pink-200 font-bold uppercase">Şehir / Kategori Sıralamanız</span>
            <div className="text-3xl md:text-4xl font-extrabold text-amber-300">
              #{vendorData.rankInCity} <span className="text-xs text-white/70 font-normal">/ {vendorData.totalCompetitors} Firma</span>
            </div>
            <p className="text-[11px] text-emerald-300 font-bold">🔥 Pazarın En Popüler %10 İlanı İçindesiniz!</p>
          </div>
        </div>

        {/* 2'li Kolon Yapısı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon: Metrik Kıyaslama Tablosu (2 Kolon) */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-[#4A154B]">Sektör Kıyaslama Analizi</h2>
                  <p className="text-xs text-slate-500">Kendi performansınızı rakip ortalamaları ile karşılaştırın.</p>
                </div>
                <span className="text-[11px] font-bold bg-purple-50 text-[#4A154B] px-3 py-1 rounded-lg">
                  Son 30 Gün
                </span>
              </div>

              {/* Metrik Kartları Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Metrik 1: Profil Tıklama */}
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Profil Görüntülenme</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-[#4A154B]">{vendorData.metrics.views.vendor}</span>
                    <span className="text-xs font-bold text-slate-400">Ortalama: {vendorData.metrics.views.avg}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#E6007E] h-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-[10px] text-emerald-600 font-bold">↑ Rakiplerinizden %67 daha fazla görüntülendiniz.</p>
                </div>

                {/* Metrik 2: Gelen Teklif Sayısı */}
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Gelen Teklif Talebi</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-[#E6007E]">{vendorData.metrics.leads.vendor}</span>
                    <span className="text-xs font-bold text-slate-400">Ortalama: {vendorData.metrics.leads.avg}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#4A154B] h-full" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-[10px] text-emerald-600 font-bold">↑ Sektör ortalamasının %72 üzerindesiniz.</p>
                </div>

                {/* Metrik 3: Yanıt Süresi */}
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Müşteriye Yanıt Hızı</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-emerald-600">{vendorData.metrics.responseTime.vendor}</span>
                    <span className="text-xs font-bold text-slate-400">Ortalama: {vendorData.metrics.responseTime.avg}</span>
                  </div>
                  <p className="text-[10px] text-emerald-600 font-bold">⚡ Yıldırım hızında yanıt veriyorsunuz!</p>
                </div>

                {/* Metrik 4: Başlangıç Fiyatı */}
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Kategori Fiyat Seviyesi</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-extrabold text-slate-800">{vendorData.metrics.avgPrice.vendor}</span>
                    <span className="text-xs font-bold text-slate-400">Ort: {vendorData.metrics.avgPrice.avg}</span>
                  </div>
                  <p className="text-[10px] text-amber-600 font-bold">ℹ️ Fiyatınız pazar ortalamasının hafif üzerinde.</p>
                </div>

              </div>
            </div>

            {/* Rekabet Avantajı Kazanma Adımları */}
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-[#4A154B] flex items-center gap-2">
                <span>🤖</span> Yapay Zeka Destekli Rekabet Tavsiyeleri
              </h2>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <span className="text-lg">👑</span>
                  <div>
                    <h3 className="text-xs font-bold text-amber-900">1 Numaraya Yükselin (Sponsorlu İlan)</h3>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      İstanbul Kır Bahçesi aramasında 1. sıraya geçmek için <strong>👑 Sponsorlu İlan</strong> rozetini aktifleştirin. Sponsorlu ilanlar ortalama 4 kat daha fazla teklif alıyor.
                    </p>
                    <Link
                      href="/admin"
                      className="inline-block mt-2 text-[11px] font-bold text-amber-900 underline hover:text-amber-700"
                    >
                      Admin İle İletişime Geç →
                    </Link>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex items-start gap-3">
                  <span className="text-lg">🏷️</span>
                  <div>
                    <h3 className="text-xs font-bold text-[#4A154B]">Özel Erken Rezervasyon Kuponu Tanımlayın</h3>
                    <p className="text-[11px] text-purple-900 mt-0.5">
                      Rakiplerinizden %20 daha fazla dönüşüm almak için <strong>/firsatlar</strong> sayfasına özel %15 erken rezervasyon kuponu ekleyin.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sağ Kolon: Profil Sağlık Skoru & Rozetler */}
          <div className="space-y-6">
            
            {/* Profil Sağlık Skoru */}
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm text-center space-y-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase">Profil Sağlık Skoru</h2>
              
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <div className="w-full h-full rounded-full border-8 border-purple-100 border-t-[#E6007E] border-r-[#4A154B] transform -rotate-45"></div>
                <span className="absolute text-3xl font-extrabold text-[#4A154B]">%{vendorData.healthScore}</span>
              </div>

              <p className="text-xs text-slate-600">
                Profiliniz oldukça güçlü! Skoru %100 yapmak için aşağıdaki eksikleri tamamlayabilirsiniz.
              </p>

              <div className="text-left space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <span>✓</span>
                  <span>WhatsApp Entegrasyonu Aktif</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <span>✓</span>
                  <span>Fiyat Bilgisi Eklenmiş</span>
                </div>
                <div className="flex items-center gap-2 text-amber-600 font-bold">
                  <span>!</span>
                  <span>En az 5 yüksek kaliteli fotoğraf ekleyin (+%10)</span>
                </div>
                <div className="flex items-center gap-2 text-amber-600 font-bold">
                  <span>!</span>
                  <span>En az 3 müşteri yorumu alın (+%8)</span>
                </div>
              </div>
            </div>

            {/* Rozet Kartı */}
            <div className="bg-gradient-to-br from-slate-900 to-[#4A154B] text-white p-6 rounded-3xl shadow-lg space-y-3">
              <span className="text-[10px] font-bold bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded uppercase">
                Kazanılan Rozetler
              </span>
              <h3 className="text-sm font-bold">🏆 Hızlı Yanıt Veren İşletme</h3>
              <p className="text-xs text-purple-200">
                Gelen taleplere 30 dakikanın altında yanıt verdiğiniz için profilinizde "Hızlı İşletme" rozeti belirdi.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}