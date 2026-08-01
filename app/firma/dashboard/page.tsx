'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Calendar,
  Wallet,
  Star,
  Sparkles,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  MessageSquare,
  Building2,
  ChevronRight,
  Phone
} from 'lucide-react';

export default function VendorDashboardPage() {
  const [vendorProfile, setVendorProfile] = useState({
    companyName: 'Beykoz Secret Garden',
    category: 'Düğün Mekanı',
    rating: 4.9,
    reviewCount: 28,
  });

  // Örnek Canlı KPI Metrikleri
  const metrics = {
    newLeadsCount: 8,
    monthlyRevenue: 185000,
    agreedBookingsCount: 14,
    profileViews: 1420,
    readinessScore: 92,
  };

  useEffect(() => {
    try {
      const localData = localStorage.getItem('wedyplan_vendor_profile');
      if (localData) {
        const parsed = JSON.parse(localData);
        setVendorProfile((prev) => ({
          ...prev,
          companyName: parsed.companyName || prev.companyName,
          category: parsed.category || prev.category,
        }));
      }
    } catch (e) {}
  }, []);

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto font-sans antialiased">
      
      {/* 1. HERO BANNER & HOŞ GELDİNİZ KARTI (Frosted Glass) */}
      <section className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 text-zinc-900 dark:text-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-zinc-200/30 dark:bg-zinc-800/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-300/40 dark:border-zinc-700/50 text-[11px] font-medium tracking-tight">
              <Building2 className="w-3.5 h-3.5 text-zinc-500" />
              <span>Firma Yönetim Merkezi</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              {vendorProfile.companyName} ✨
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
              Bu ay çiftlerden yüksek talep alıyorsunuz. Bekleyen teklif isteklerini yanıtlayarak rezervasyonlarınızı tamamlayın.
            </p>
          </div>

          {/* İtibar & Puan Mini Kutusu */}
          <div className="bg-zinc-50/80 dark:bg-zinc-800/50 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-700/50 rounded-2xl p-5 flex items-center justify-between gap-6 shadow-xs shrink-0">
            <div className="flex flex-col text-center">
              <div className="flex items-center justify-center gap-1 text-zinc-900 dark:text-white">
                <Star className="w-5 h-5 fill-zinc-900 dark:fill-white text-zinc-900 dark:text-white" />
                <span className="text-2xl font-bold tracking-tight">{vendorProfile.rating}</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mt-0.5">
                {vendorProfile.reviewCount} Müşteri Yorumu
              </span>
            </div>
            <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-700" />
            <div className="text-left space-y-1">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Onaylı Mağaza
              </span>
              <div className="text-[11px] text-zinc-400 font-normal">
                WedyPlan Onaylı Tedarikçi
              </div>
            </div>
          </div>
        </div>

        {/* Hızlı Aksiyon Çubuğu */}
        <div className="mt-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-wrap items-center gap-3 relative z-10">
          <Link
            href="/firma/talepler"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-200 text-xs font-semibold shadow-xs transition-all"
          >
            <Inbox className="w-4 h-4" /> Bekleyen Talepler ({metrics.newLeadsCount})
          </Link>
          <Link
            href="/firma/sozlesmeler"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-200 text-xs font-medium hover:bg-zinc-200/80 transition-all"
          >
            <Plus className="w-4 h-4" /> Teklif Hazırla
          </Link>
          <Link
            href="/firma/ai-asistan"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/80 border border-zinc-300/40 dark:border-zinc-700/60 text-zinc-900 dark:text-white text-xs font-semibold hover:bg-zinc-300/60 transition-all"
          >
            <Sparkles className="w-4 h-4 text-zinc-500 dark:text-zinc-400" /> WedyAI Copilot
          </Link>
        </div>
      </section>

      {/* 2. 4 TEMEL KPI METRİK KARTI (Frosted Glass) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Bekleyen Talepler */}
        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Yeni Teklif İstekleri</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              {metrics.newLeadsCount} Çift Bekliyor
            </div>
            <p className="text-[11px] text-zinc-400">
              Ortalama Yanıt Süresi: <span className="font-semibold text-zinc-700 dark:text-zinc-300">18 dk</span>
            </p>
          </div>
          <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-normal">Bu Hafta: +3 Yeni</span>
            <Link href="/firma/talepler" className="text-zinc-900 dark:text-white font-semibold inline-flex items-center gap-0.5 hover:underline">
              Taleplere Git <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Bu Ayki Ciro / Tahsilat */}
        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Bu Ayki Tahsilat</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              ₺{metrics.monthlyRevenue.toLocaleString('tr-TR')}
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              Geçen aya göre %18 artış
            </p>
          </div>
          <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-normal">Gelecek Taksitler: ₺45.000</span>
            <Link href="/firma/finans" className="text-zinc-900 dark:text-white font-semibold inline-flex items-center gap-0.5 hover:underline">
              Finans <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Anlaşılan Düğünler */}
        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Rezervasyonlar</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              {metrics.agreedBookingsCount} Etkinlik Kilitlendi
            </div>
            <p className="text-[11px] text-zinc-400">
              Bu Ayki Etkinlik: <span className="font-semibold text-zinc-700 dark:text-zinc-300">4 Düğün</span>
            </p>
          </div>
          <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-normal">Doluluk: %85</span>
            <Link href="/firma/takvim" className="text-zinc-900 dark:text-white font-semibold inline-flex items-center gap-0.5 hover:underline">
              Takvim <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Vitrin Görüntülenme */}
        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Vitrin Etkileşimi</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              {metrics.profileViews.toLocaleString('tr-TR')} Ziyaret
            </div>
            <p className="text-[11px] text-zinc-400">
              Dönüşüm Oranı: <span className="font-semibold text-zinc-700 dark:text-zinc-300">%6.2</span>
            </p>
          </div>
          <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-normal">Pazar Yeri Sıralaması: #2</span>
            <Link href="/firma/vitrin" className="text-zinc-900 dark:text-white font-semibold inline-flex items-center gap-0.5 hover:underline">
              Vitrin Düzenle <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </section>

      {/* 3. İKİ SÜTUNLU OPERASYONEL PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL KOLON - Son Gelen Talepler & Takvim */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Son Teklif İstekleri */}
          <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-zinc-500" /> Son Gelen Teklif İstekleri
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Çiftlerin sistem üzerinden ilettiği fiyat talepleri.
                </p>
              </div>
              <Link href="/firma/talepler" className="text-xs font-semibold text-zinc-900 dark:text-white hover:underline">
                Tümünü Gör
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Selin & Caner', date: '15 Ağustos 2026', guests: '250 Kişi', budget: '₺150.000', status: 'BEKLIYOR', time: '12 dk önce' },
                { name: 'Gizem & Burak', date: '02 Eylül 2026', guests: '300 Kişi', budget: '₺180.000', status: 'TEKLIF_GONDERILDI', time: '2 saat önce' },
                { name: 'Merve & Kaan', date: '20 Eylül 2026', guests: '200 Kişi', budget: '₺120.000', status: 'ANLASILDI', time: '1 gün önce' },
              ].map((lead, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{lead.name}</h4>
                      <span className="text-[10px] text-zinc-400 font-normal">• {lead.time}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-zinc-400" /> {lead.date}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3 text-zinc-400" /> {lead.guests}</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">Hedef: {lead.budget}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      lead.status === 'BEKLIYOR' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                      lead.status === 'TEKLIF_GONDERILDI' ? 'bg-zinc-200/60 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300' :
                      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {lead.status === 'BEKLIYOR' ? 'Yanıt Bekliyor' : lead.status === 'TEKLIF_GONDERILDI' ? 'Teklif İletildi' : 'Anlaşıldı'}
                    </span>
                    <Link
                      href="/firma/talepler"
                      className="p-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-black transition-all"
                    >
                      İncele
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Yaklaşan Düğün Takvimi */}
          <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-zinc-500" /> Yaklaşan Düğün & Etkinlikler
              </h3>
              <span className="text-xs text-zinc-400">Gelecek 30 Gün</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 flex items-start gap-3">
                <div className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-center min-w-[44px]">
                  <span className="block text-[10px] uppercase font-bold">AĞU</span>
                  <span className="block text-base font-black">15</span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Selin & Caner Düğün Organizasyonu</h4>
                  <p className="text-[11px] text-zinc-400">Beykoz Garden • 250 Davetli</p>
                  <span className="inline-block text-[10px] font-semibold text-zinc-600 dark:text-zinc-300">Saat: 19:00 - 23:30</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 flex items-start gap-3">
                <div className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-center min-w-[44px]">
                  <span className="block text-[10px] uppercase font-bold">AĞU</span>
                  <span className="block text-base font-black">22</span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Mekan Tadımı & Menü Provası</h4>
                  <p className="text-[11px] text-zinc-400">Merve & Kaan Çifti</p>
                  <span className="inline-block text-[10px] font-semibold text-zinc-600 dark:text-zinc-300">Saat: 14:00</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SAĞ KOLON - WedyAI Copilot & Son Yorumlar */}
        <div className="space-y-6">
          
          {/* AI Copilot Önerisi */}
          <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-900 dark:text-white rounded-3xl p-6 shadow-xs relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300/40 dark:border-zinc-700">
                <Sparkles className="w-3.5 h-3.5 text-zinc-500" /> WedyAI Copilot
              </span>
              <span className="text-[10px] text-zinc-400">Pazar Analizi</span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              &quot;Eylül ayı için bölgenizdeki düğün mekanlarına olan arama talebi %32 arttı. Paket fiyatlarınızı güncelleyerek 4 yeni çift talebi çekebilirsiniz.&quot;
            </p>

            <Link
              href="/firma/ai-asistan"
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-black dark:hover:bg-zinc-200 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span>Fiyatlandırma Tavsiyesini Gör</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Son Yorumlar & İtibar */}
          <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-zinc-500" /> Son Değerlendirmeler
              </h3>
              <Link href="/firma/degerlendirmeler" className="text-xs font-semibold text-zinc-900 dark:text-white hover:underline">
                Tümü
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { author: 'Eda & Mert Yılmaz', rating: 5, comment: 'Düğünümüz tam hayal ettiğimiz gibi geçti. Organizasyon ekibine sonsuz teşekkürler!', date: '3 gün önce' },
                { author: 'Ayşe & Ali Kaya', rating: 5, comment: 'Yemek kalitesi ve servis hızı harikaydı, tüm misafirlerimiz memnun kaldı.', date: '1 hafta önce' },
              ].map((rev, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">{rev.author}</span>
                    <div className="flex items-center gap-0.5 text-zinc-900 dark:text-white">
                      <Star className="w-3 h-3 fill-zinc-900 dark:fill-white" />
                      <span className="text-[11px] font-bold">{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    &quot;{rev.comment}&quot;
                  </p>
                  <span className="text-[9px] text-zinc-400 block pt-0.5">{rev.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Düğün Ekip Durumu */}
          <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400">Operasyon & Ekip</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                HAZIR
              </span>
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Selin & Caner Düğünü (15 Ağu)</h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              12 Şef/Garson ve 1 Saha Sorumlusu atandı. Ekip listesi hazır.
            </p>
            <div className="pt-1">
              <Link
                href="/firma/organizasyon"
                className="block w-full py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-semibold text-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all border border-zinc-200/80 dark:border-zinc-700/60"
              >
                Ekip Kadrosunu Yönet
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}