import React from 'react';
import Link from 'next/link';
import { getDashboardData } from '@/lib/actions/dashboard';
import {
  Sparkles,
  Calendar,
  Clock,
  Wallet,
  CheckCircle2,
  Users,
  Building2,
  ArrowUpRight,
  Plus,
  MessageSquare,
  Heart,
  ChevronRight,
  ExternalLink,
  CheckSquare
} from 'lucide-react';

export const revalidate = 0; // Her yüklemede canlı taze veri

export default async function CiftDashboardPage() {
  const dashRes = await getDashboardData();
  
  // Varsayılan Güvenli Fallback Nesnesi
  const data = dashRes.data || {
    profile: { partnerOne: 'Eda', partnerTwo: 'Mert', weddingDate: new Date('2026-09-15') },
    metrics: {
      targetBudget: 350000,
      spentBudget: 185000,
      remainingBudget: 165000,
      budgetPercentage: 53,
      completedTasks: 18,
      totalTasks: 28,
      taskPercentage: 64,
      acceptedGuests: 142,
      totalGuests: 200,
      guestPercentage: 71,
      bookedVendors: 5,
      totalVendorCategories: 8,
      overallReadiness: 62,
    },
  };

  const { profile, metrics } = data;

  // Çift Başlığı ve Kalan Gün Hesaplaması
  const coupleTitle = profile.partnerTwo
    ? `${profile.partnerOne} & ${profile.partnerTwo}`
    : profile.partnerOne;

  const weddingDateRaw = new Date(profile.weddingDate);
  const today = new Date();
  const diffTime = weddingDateRaw.getTime() - today.getTime();
  const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const formattedDate = weddingDateRaw.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* 1. HERO BANNER & GERİ SAYIM (Onboarding Verileriyle Canlı) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium tracking-wide">
              <Heart className="w-3.5 h-3.5 text-rose-100 fill-rose-100" />
              <span>Büyük Günü Planlıyoruz</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Hoş Geldiniz, {coupleTitle}! ✨
            </h1>
            <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
              Düğün hazırlıklarınız harika gidiyor! Planlamanızı kolaylaştırmak için tüm adımları tek ekranda topladık.
            </p>
          </div>

          {/* Geri Sayım Kutusu */}
          <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-5 flex items-center justify-between gap-4 sm:gap-6 shadow-inner text-center">
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-black">{daysLeft}</span>
              <span className="text-[10px] uppercase font-bold text-rose-100 tracking-wider">Gün Kaldı</span>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-rose-100 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
              <div className="text-[11px] text-rose-200">
                Hedeflenen Tarih
              </div>
            </div>
          </div>

        </div>

        {/* Hızlı Aksiyon Çubuğu */}
        <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center gap-3">
          <Link
            href="/cift/butce"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-rose-600 hover:bg-rose-50 text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Harcama Ekle
          </Link>
          <Link
            href="/cift/davetliler"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-medium transition-all"
          >
            <Users className="w-4 h-4" /> Davetli Ekle
          </Link>
          <Link
            href="/cift/ai-asistan"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-amber-950 hover:bg-amber-300 text-xs font-bold transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4" /> AI Asistana Sor
          </Link>
        </div>
      </section>

      {/* 2. DÜĞÜN HAZIRLIK SKORU (Ağırlıklı Canlı Skor) */}
      <section className="bg-white dark:bg-zinc-900 border border-rose-100/80 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-rose-500" />
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Düğün Hazırlık Skoru</h2>
          </div>
          <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400">%{metrics.overallReadiness} Tamamlandı</span>
        </div>
        <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-1000"
            style={{ width: `${metrics.overallReadiness}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-medium pt-1">
          <span>Başlangıç</span>
          <span>Söz & Nişan</span>
          <span>Mekan & Firmalar</span>
          <span>Son Dokunuşlar</span>
          <span>Büyük Gün! 🎉</span>
        </div>
      </section>

      {/* 3. 4 TEMEL KPI METRİK KARTI (Modüllerle Canlı Senkronize) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Bütçe Kartı */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-5 shadow-xs hover:border-rose-300 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Bütçe Durumu</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              {metrics.spentBudget.toLocaleString('tr-TR')} ₺
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Hedef Bütçe: <span className="font-semibold">{metrics.targetBudget.toLocaleString('tr-TR')} ₺</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-medium">Kullanım: %{metrics.budgetPercentage}</span>
            <Link href="/cift/butce" className="text-rose-600 dark:text-rose-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
              Detay <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Görevler Kartı */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-5 shadow-xs hover:border-rose-300 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Yapılacak Görevler</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              {metrics.completedTasks} / {metrics.totalTasks}
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Kalan Adım: <span className="font-semibold text-amber-600">{metrics.totalTasks - metrics.completedTasks} Adım</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-medium">İlerleme: %{metrics.taskPercentage}</span>
            <Link href="/cift/gorevler" className="text-rose-600 dark:text-rose-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
              Listeye Git <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Davetli & LCV Kartı */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-5 shadow-xs hover:border-rose-300 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Davetli & LCV</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              {metrics.acceptedGuests} Katılıyor
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Toplam Davetli: <span className="font-semibold">{metrics.totalGuests} Kişi</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-medium">LCV Yanıt: %{metrics.guestPercentage}</span>
            <Link href="/cift/davetliler" className="text-rose-600 dark:text-rose-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
              Yönet <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Anlaşmalı Firmalar Kartı */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-5 shadow-xs hover:border-rose-300 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Tedarikçi Hizmetleri</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              {metrics.bookedVendors} / {metrics.totalVendorCategories} Anlaşıldı
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Bekleyen Kategori: <span className="font-semibold text-rose-500">{metrics.totalVendorCategories - metrics.bookedVendors} Hizmet</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-medium">Mekan & Fotoğraf Anlaşıldı</span>
            <Link href="/cift/firmalar" className="text-rose-600 dark:text-rose-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
              Arama Yap <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </section>

      {/* 4. İKİ SÜTUNLU OPERASYONEL PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL KOLON - Görevler & Takvim */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rose-500" /> Bu Haftanın Odak Görevleri
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Öncelikli olarak tamamlamanız önerilen adımlar.
                </p>
              </div>
              <Link href="/cift/gorevler" className="text-xs font-semibold text-rose-600 hover:underline">
                Tümünü Gör
              </Link>
            </div>

            <div className="space-y-2.5">
              {[
                { title: 'Düğün Mekanı Tadım Randevusu Alınacak', category: 'Mekan & Yemek', priority: 'YÜKSEK', done: true },
                { title: 'Gelinlik İlk Prova Tarihi Belirlenecek', category: 'Kıyafet & Stil', priority: 'YÜKSEK', done: false },
                { title: 'Müzik & DJ Giriş Şarkısı Listesi Hazırlığı', category: 'Eğlence', priority: 'ORTA', done: false },
                { title: 'Davetiye Baskı Onayı Verilecek', category: 'Matbaa', priority: 'YÜKSEK', done: false },
              ].map((task, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    task.done
                      ? 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200/50 text-zinc-400 line-through'
                      : 'bg-white dark:bg-zinc-800/40 border-zinc-200/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={task.done}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 accent-rose-500 cursor-pointer"
                    />
                    <span className="text-xs font-medium">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {task.category}
                    </span>
                    {task.priority === 'YÜKSEK' && !task.done && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                        Acil
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-rose-500" /> Takvim & Prova Günleri
              </h3>
              <span className="text-xs text-zinc-400">Gelecek 14 Gün</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-start gap-3">
                <div className="p-2 bg-rose-500 text-white rounded-lg text-center min-w-[44px]">
                  <span className="block text-[10px] uppercase font-bold">AĞU</span>
                  <span className="block text-base font-black">12</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Gelinlik 1. Prova</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Aysira Moda - Nişantaşı</p>
                  <span className="inline-block text-[10px] font-semibold text-rose-600">Saat: 14:00</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 flex items-start gap-3">
                <div className="p-2 bg-amber-500 text-white rounded-lg text-center min-w-[44px]">
                  <span className="block text-[10px] uppercase font-bold">AĞU</span>
                  <span className="block text-base font-black">18</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Mekan Tadım Günü</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Kır Bahçesi Davet</p>
                  <span className="inline-block text-[10px] font-semibold text-amber-600">Saat: 18:30</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SAĞ KOLON - AI Asistan, Mesajlar & Davetiye */}
        <div className="space-y-6">
          
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden space-y-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500 text-white">
                <Sparkles className="w-3.5 h-3.5" /> Wedy AI Tavsiyesi
              </span>
              <span className="text-[10px] text-zinc-400">Canlı Analiz</span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              &quot;Düğününüze {daysLeft} gün kaldı! Bütçe kullanım oranınız %{metrics.budgetPercentage}. Kalan bütçenize göre en popüler fotoğrafçıları hemen listeleyebilirim.&quot;
            </p>

            <Link
              href="/cift/ai-asistan"
              className="w-full py-2.5 px-4 rounded-xl bg-white text-zinc-900 hover:bg-rose-50 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span>Fotoğrafçı Önerilerini Gör</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-rose-500" /> Son Mesajlar
              </h3>
              <Link href="/cift/mesajlar" className="text-xs font-semibold text-rose-600 hover:underline">
                Tümü
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Görkem Müzik Organizasyon', msg: 'Orkestra repertuarı onayınıza sunulmıştır.', time: '10 dk önce', unread: true },
                { name: 'Studio Masal Fotoğrafçılık', msg: 'Dış çekim mekan seçeneklerini ilettik.', time: '2 saat önce', unread: false },
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                      {m.name}
                      {m.unread && <span className="w-2 h-2 rounded-full bg-rose-500" />}
                    </span>
                    <span className="text-[10px] text-zinc-400">{m.time}</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-1">{m.msg}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500">Dijital Davetiye</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                CANLIDA
              </span>
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">eda-and-mert.wedyplan.com</h4>
            <p className="text-[11px] text-zinc-500">
              Davetiyeniz yayında! LCV yanıtları anlık olarak panelinize düşmektedir.
            </p>
            <div className="pt-2 flex gap-2">
              <Link
                href="/cift/digital-davetiye"
                className="flex-1 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-xs font-semibold text-center hover:bg-rose-100 transition-all"
              >
                Düzenle
              </Link>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 hover:text-rose-600 flex items-center justify-center transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}