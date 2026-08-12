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

export const revalidate = 0;

export default async function CiftDashboardPage() {
  const dashRes = await getDashboardData();
  
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
    <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto font-sans antialiased">
      
      {/* 1. HERO BANNER & GERİ SAYIM (Apple Frosted Glass) */}
      <section className="apple-glass relative overflow-hidden rounded-[28px] p-6 text-[#1d1d1f] sm:p-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-zinc-200/30 dark:bg-zinc-800/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="apple-chip">
              <Heart className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>Büyük Günü Planlıyoruz</span>
            </div>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-[#1d1d1f] sm:text-4xl">
              Hoş Geldiniz, {coupleTitle}! ✨
            </h1>
            <p className="text-xs font-normal leading-relaxed text-[#86868b] sm:text-sm">
              Düğün hazırlıklarınız harika gidiyor! Planlamanızı kolaylaştırmak için tüm adımları tek ekranda topladık.
            </p>
          </div>

          {/* Geri Sayım Kutusu */}
          <div className="apple-glass flex shrink-0 items-center justify-between gap-4 rounded-2xl p-5 text-center sm:gap-6">
            <div className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">{daysLeft}</span>
              <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-widest">Gün Kaldı</span>
            </div>
            <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-700" />
            <div className="text-left space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-zinc-800 dark:text-zinc-200 font-medium">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>{formattedDate}</span>
              </div>
              <div className="text-[11px] text-zinc-400 font-normal">
                Hedeflenen Tarih
              </div>
            </div>
          </div>
        </div>

        {/* Hızlı Aksiyon Çubuğu */}
        <div className="mt-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-wrap items-center gap-3 relative z-10">
          <Link
            href="/cift/butce"
            className="apple-btn apple-btn-inline !px-4 !py-2 !text-[13px]"
          >
            <Plus className="w-4 h-4" /> Harcama Ekle
          </Link>
          <Link
            href="/cift/davetliler"
            className="apple-btn-secondary apple-btn-secondary-inline !px-4 !py-2 !text-[13px]"
          >
            <Users className="w-4 h-4" /> Davetli Ekle
          </Link>
          <Link
            href="/cift/ai-asistan"
            className="apple-btn-secondary apple-btn-secondary-inline !px-4 !py-2 !text-[13px]"
          >
            <Sparkles className="w-4 h-4 text-zinc-500 dark:text-zinc-400" /> AI Asistana Sor
          </Link>
        </div>
      </section>

      {/* 2. DÜĞÜN HAZIRLIK SKORU */}
      <section className="apple-glass rounded-[28px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Düğün Hazırlık Skoru</h2>
          </div>
          <span className="text-sm font-bold text-zinc-900 dark:text-white">%{metrics.overallReadiness} Tamamlandı</span>
        </div>
        <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-[#0071e3] transition-all duration-1000"
            style={{ width: `${metrics.overallReadiness}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-zinc-400 font-medium pt-1">
          <span>Başlangıç</span>
          <span>Söz & Nişan</span>
          <span>Mekan & Firmalar</span>
          <span>Son Dokunuşlar</span>
          <span>Büyük Gün! 🎉</span>
        </div>
      </section>

      {/* 3. KPI KARTLARI (Buzlu Cam Grid) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Bütçe Kartı */}
        <div className="apple-glass rounded-[28px] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Bütçe Durumu</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              ₺{metrics.spentBudget.toLocaleString('tr-TR')}
            </div>
            <p className="text-[11px] text-zinc-400">
              Hedef: <span className="font-semibold text-zinc-700 dark:text-zinc-300">₺{metrics.targetBudget.toLocaleString('tr-TR')}</span>
            </p>
          </div>
          <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-normal">Kullanım: %{metrics.budgetPercentage}</span>
            <Link href="/cift/butce" className="text-zinc-900 dark:text-white font-semibold inline-flex items-center gap-0.5 hover:underline">
              Detay <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Görevler Kartı */}
        <div className="apple-glass rounded-[28px] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Yapılacak Görevler</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              {metrics.completedTasks} / {metrics.totalTasks}
            </div>
            <p className="text-[11px] text-zinc-400">
              Kalan Adım: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{metrics.totalTasks - metrics.completedTasks} Adım</span>
            </p>
          </div>
          <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-normal">İlerleme: %{metrics.taskPercentage}</span>
            <Link href="/cift/gorevler" className="text-zinc-900 dark:text-white font-semibold inline-flex items-center gap-0.5 hover:underline">
              Listeye Git <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Davetli & LCV Kartı */}
        <div className="apple-glass rounded-[28px] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Davetli & LCV</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              {metrics.acceptedGuests} Katılıyor
            </div>
            <p className="text-[11px] text-zinc-400">
              Toplam: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{metrics.totalGuests} Kişi</span>
            </p>
          </div>
          <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-normal">LCV Yanıt: %{metrics.guestPercentage}</span>
            <Link href="/cift/davetliler" className="text-zinc-900 dark:text-white font-semibold inline-flex items-center gap-0.5 hover:underline">
              Yönet <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Anlaşmalı Firmalar Kartı */}
        <div className="apple-glass rounded-[28px] p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Tedarikçi Hizmetleri</span>
            <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl font-bold text-zinc-900 dark:text-white">
              {metrics.bookedVendors} / {metrics.totalVendorCategories} Anlaşıldı
            </div>
            <p className="text-[11px] text-zinc-400">
              Bekleyen: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{metrics.totalVendorCategories - metrics.bookedVendors} Hizmet</span>
            </p>
          </div>
          <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-normal">Mekan & Fotoğraf</span>
            <Link href="/cift/firmalar" className="text-zinc-900 dark:text-white font-semibold inline-flex items-center gap-0.5 hover:underline">
              Arama Yap <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </section>

      {/* 4. İKİ SÜTUNLU OPERASYONEL PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL KOLON - Odak Görevler & Takvim */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="apple-glass rounded-[28px] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-500" /> Bu Haftanın Odak Görevleri
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Öncelikli olarak tamamlamanız önerilen adımlar.
                </p>
              </div>
              <Link href="/cift/gorevler" className="text-xs font-semibold text-zinc-900 dark:text-white hover:underline">
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
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    task.done
                      ? 'bg-zinc-50/50 dark:bg-zinc-800/30 border-zinc-200/40 dark:border-zinc-800 text-zinc-400 line-through'
                      : 'bg-zinc-50/80 dark:bg-zinc-800/50 border-zinc-200/60 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={task.done}
                      className="w-4 h-4 rounded text-zinc-900 dark:text-white focus:ring-zinc-500 accent-zinc-900 dark:accent-white cursor-pointer"
                    />
                    <span className="text-xs font-medium">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {task.category}
                    </span>
                    {task.priority === 'YÜKSEK' && !task.done && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                        Acil
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="apple-glass rounded-[28px] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-zinc-500" /> Takvim & Prova Günleri
              </h3>
              <span className="text-xs text-zinc-400">Gelecek 14 Gün</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 flex items-start gap-3">
                <div className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-center min-w-[44px]">
                  <span className="block text-[10px] uppercase font-bold">AĞU</span>
                  <span className="block text-base font-black">12</span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Gelinlik 1. Prova</h4>
                  <p className="text-[11px] text-zinc-400">Aysira Moda - Nişantaşı</p>
                  <span className="inline-block text-[10px] font-semibold text-zinc-600 dark:text-zinc-300">Saat: 14:00</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 flex items-start gap-3">
                <div className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-center min-w-[44px]">
                  <span className="block text-[10px] uppercase font-bold">AĞU</span>
                  <span className="block text-base font-black">18</span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Mekan Tadım Günü</h4>
                  <p className="text-[11px] text-zinc-400">Kır Bahçesi Davet</p>
                  <span className="inline-block text-[10px] font-semibold text-zinc-600 dark:text-zinc-300">Saat: 18:30</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SAĞ KOLON - AI Asistan & Mesajlar */}
        <div className="space-y-6">
          
          <div className="apple-glass text-zinc-900 dark:text-white rounded-3xl p-6 shadow-xs relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300/40 dark:border-zinc-700">
                <Sparkles className="w-3.5 h-3.5 text-zinc-500" /> Wedy AI Tavsiyesi
              </span>
              <span className="text-[10px] text-zinc-400">Canlı Analiz</span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              &quot;Düğününüze {daysLeft} gün kaldı! Bütçe kullanım oranınız %{metrics.budgetPercentage}. Kalan bütçenize göre en popüler fotoğrafçıları hemen listeleyebilirim.&quot;
            </p>

            <Link
              href="/cift/ai-asistan"
              className="w-full py-2.5 px-4 rounded-full bg-[#0071e3] text-white hover:bg-[#0077ed] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span>Fotoğrafçı Önerilerini Gör</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="apple-glass rounded-[28px] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-zinc-500" /> Son Mesajlar
              </h3>
              <Link href="/cift/messages" className="text-xs font-semibold text-zinc-900 dark:text-white hover:underline">
                Tümü
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Görkem Müzik Organizasyon', msg: 'Orkestra repertuarı onayınıza sunulmuştur.', time: '10 dk önce', unread: true },
                { name: 'Studio Masal Fotoğrafçılık', msg: 'Dış çekim mekan seçeneklerini ilettik.', time: '2 saat önce', unread: false },
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                      {m.name}
                      {m.unread && <span className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white" />}
                    </span>
                    <span className="text-[10px] text-zinc-400">{m.time}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">{m.msg}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="apple-glass rounded-[28px] p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400">Dijital Davetiye</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                CANLIDA
              </span>
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">eda-and-mert.wedyplan.com</h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Davetiyeniz yayında! LCV yanıtları anlık olarak panelinize düşmektedir.
            </p>
            <div className="pt-2 flex gap-2">
              <Link
                href="/cift/dijital-davetiye"
                className="flex-1 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-semibold text-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all border border-zinc-200/80 dark:border-zinc-700/60"
              >
                Düzenle
              </Link>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition-all"
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