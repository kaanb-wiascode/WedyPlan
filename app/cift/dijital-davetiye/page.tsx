'use client';

import React, { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import {
  getInvitationConfig,
  saveInvitationConfig,
  generateAIInvitationCopyAction
} from '@/lib/actions/invitation';
import {
  Sparkles,
  Link2,
  Copy,
  Check,
  Palette,
  Globe,
  Calendar,
  MapPin,
  Heart,
  ShieldCheck,
  Share2,
  Music,
  Utensils,
  Gift,
  QrCode,
  ExternalLink,
  X,
  Smartphone
} from 'lucide-react';

const THEMES = [
  { id: 'gold-luxury', name: 'Lüks Altın', bgClass: 'bg-[#111111]', textClass: 'text-[#D4AF37]', borderClass: 'border-[#D4AF37]' },
  { id: 'minimalist-white', name: 'Sade Beyaz', bgClass: 'bg-white', textClass: 'text-zinc-900', borderClass: 'border-zinc-200' },
  { id: 'bosphorus-rose', name: 'Bosphorus Rose', bgClass: 'bg-rose-950', textClass: 'text-rose-200', borderClass: 'border-rose-300' },
  { id: 'royal-pearl', name: 'Kraliyet İnci', bgClass: 'bg-zinc-900', textClass: 'text-amber-200', borderClass: 'border-amber-400' },
];

export default function DigitalInvitationBuilderPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Davetiye Ayarları State
  const [invitationConfig, setInvitationConfig] = useState({
    slug: 'selin-kaan-2026',
    title: 'Selin & Kaan Evleniyor',
    date: '15 Ağustos 2026',
    time: '19:00',
    venueName: 'Beykoz Secret Garden & Event',
    address: 'Polonezköy Yolu No: 42, Beykoz / İstanbul',
    theme: 'gold-luxury',
    coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    welcomeMessage: 'Hayatımızın en özel gününde, mutluluğumuza ortak olmanızdan onur duyarız.',
    askDietary: true,
    askSongRequest: true,
    showWishlist: true,
  });

  useEffect(() => {
    const initConfig = async () => {
      setLoading(true);
      const res = await getInvitationConfig();
      if (res.success && res.data) {
        setInvitationConfig(res.data);
      }
      setLoading(false);
    };
    initConfig();
  }, []);

  const fullUrl = `https://wedyplan.com/davetiye/${invitationConfig.slug}`;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    showToast('Davetiye adresi panoya kopyalandı.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsapp = () => {
    const message = encodeURIComponent(`Düğün davetiyemiz hazır! Detayları incelemek ve LCV vermek için linke tıklayabilirsiniz: ${fullUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  // AI ile Karşılama Metni Üretme
  const handleGenerateAiCopy = () => {
    startTransition(async () => {
      const res = await generateAIInvitationCopyAction('formal', invitationConfig.title, invitationConfig.venueName);
      if (res.success && res.generatedText) {
        setInvitationConfig((prev) => ({ ...prev, welcomeMessage: res.generatedText }));
        showToast('WedyAI tarafından yeni davetiye metni üretildi.');
      }
    });
  };

  // Ayarları Kaydet
  const handleSave = () => {
    startTransition(async () => {
      const res = await saveInvitationConfig(invitationConfig);
      if (res.success) {
        showToast('Davetiye ayarlarınız kaydedildi ve yayına alındı.');
      }
    });
  };

  const currentThemeObj = THEMES.find((t) => t.id === invitationConfig.theme) || THEMES[0];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-zinc-500">Dijital Davetiye Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 pb-20">
      
      {/* TOAST BİLDİRİMİ */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER & HIZLI AKSİYONLAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
            <Globe className="w-7 h-7 text-rose-500" /> Dijital Davetiye & Web Sitemiz
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Özel düğün web sitenizi tasarlayın, canlı önizleyin ve LCV toplamaya başlayın.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 transition-all cursor-pointer"
            title="QR Kod Oluştur"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={handleShareWhatsapp}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" /> WhatsApp ile Paylaş
          </button>

          <button
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-2xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-rose-400" />}
            <span>{copied ? 'Kopyalandı' : 'Link Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* ÜST CANLI BİLGİ BANNERI */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500 text-white uppercase tracking-wider">
            Web Siteniz Yayında
          </span>
          <h2 className="text-lg font-bold text-white mt-1">eda-and-mert.wedyplan.com</h2>
          <p className="text-xs text-zinc-400">Gelen tüm LCV yanıtları anında Davetliler sayfanıza aktarılır.</p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-6 py-2.5 rounded-2xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            {isPending ? 'Kaydediliyor...' : 'Değişiklikleri Yayınla'}
          </button>
        </div>
      </div>

      {/* DÜZENLEME VE CANLI TELEFÖN ÖNİZLEME (SPLIT SCREEN) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SOL KOLON: AYARLAR VE TASARIM FORMU (7 Kolon) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-rose-500" /> Web Sitesi İçerik Düzenleyici
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
              Canlı Senkronize
            </span>
          </div>

          <div className="space-y-5">
            {/* TEMA SEÇİMİ */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Tasarım Konsepti & Tema</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setInvitationConfig({ ...invitationConfig, theme: theme.id })}
                    className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      invitationConfig.theme === theme.id
                        ? 'border-rose-500 bg-rose-50/50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 shadow-xs'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 hover:border-rose-200'
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* BAŞLIK VE KAPAK GÖRSELİ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Davetiye Başlığı</label>
                <input
                  type="text"
                  value={invitationConfig.title}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Kapak Fotoğrafı URL</label>
                <input
                  type="text"
                  value={invitationConfig.coverImage}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, coverImage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* TARİH, SAAT VE MEKAN */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Tarih</label>
                <input
                  type="text"
                  value={invitationConfig.date}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Saat</label>
                <input
                  type="text"
                  value={invitationConfig.time}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, time: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Mekan Adı</label>
                <input
                  type="text"
                  value={invitationConfig.venueName}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, venueName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* KARŞILAMA METNİ VE AI BÜTONU */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Karşılama Davet Metni</label>
                <button
                  type="button"
                  onClick={handleGenerateAiCopy}
                  disabled={isPending}
                  className="text-[11px] font-bold text-rose-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> WedyAI İle Metin Üret
                </button>
              </div>
              <textarea
                rows={3}
                value={invitationConfig.welcomeMessage}
                onChange={(e) => setInvitationConfig({ ...invitationConfig, welcomeMessage: e.target.value })}
                className="w-full p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* INTERAKTIF MODÜL TOGGLE'LARI */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
              <label className="text-xs font-bold text-zinc-900 dark:text-white block uppercase tracking-wider">
                Sitede Gösterilecek Modüller
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 cursor-pointer">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-rose-500" /> Özel Beslenme / Menü Tercihi Sorulsun mu?
                </span>
                <input
                  type="checkbox"
                  checked={invitationConfig.askDietary}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, askDietary: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 accent-rose-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 cursor-pointer">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <Music className="w-4 h-4 text-rose-500" /> Müzik / Şarkı İstek Alanı Olsun mu?
                </span>
                <input
                  type="checkbox"
                  checked={invitationConfig.askSongRequest}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, askSongRequest: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 accent-rose-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 cursor-pointer">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-rose-500" /> Çiftin Çeyiz / Hediye Listesi Butonu Gösterilsin mi?
                </span>
                <input
                  type="checkbox"
                  checked={invitationConfig.showWishlist}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, showWishlist: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 accent-rose-500 cursor-pointer"
                />
              </label>
            </div>

          </div>
        </div>

        {/* SAĞ KOLON: CANLI MOBİL TELEFON SİMÜLATÖRÜ (5 Kolon) */}
        <div className="lg:col-span-5 flex flex-col items-center sticky top-24">
          <div className="text-center mb-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 justify-center">
              <Smartphone className="w-4 h-4 text-rose-500" /> Canlı Mobil Önizleme
            </span>
          </div>

          {/* MOCKUP TELEFON KASASI */}
          <div className="w-full max-w-[360px] bg-zinc-950 p-3 rounded-[48px] shadow-2xl border-4 border-zinc-800 relative">
            
            {/* EKRAN İÇERİĞİ */}
            <div className={`rounded-[38px] overflow-hidden min-h-[580px] flex flex-col justify-between text-center select-none ${currentThemeObj.bgClass} transition-colors duration-300`}>
              
              {/* HEADER KAPAK FOTOĞRAFI */}
              <div className="relative h-[200px] bg-black">
                <img src={invitationConfig.coverImage} alt="" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-end justify-center p-5 text-white">
                  <div className="space-y-1">
                    <Heart className="w-4 h-4 text-rose-400 mx-auto fill-rose-400 animate-pulse" />
                    <h2 className="font-serif text-lg font-bold leading-tight">{invitationConfig.title}</h2>
                  </div>
                </div>
              </div>

              {/* İÇERİK */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                
                <p className={`text-xs font-serif italic leading-relaxed ${currentThemeObj.textClass}`}>
                  &quot;{invitationConfig.welcomeMessage}&quot;
                </p>

                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2 text-left text-[11px]">
                  <div className={`flex items-center gap-2 font-bold ${currentThemeObj.textClass}`}>
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    <span>{invitationConfig.date} • {invitationConfig.time}</span>
                  </div>
                  <div className={`flex items-center gap-2 opacity-80 ${currentThemeObj.textClass}`}>
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{invitationConfig.venueName}</span>
                  </div>
                </div>

                {/* MODÜL BUTONLARI PREVIEW */}
                {invitationConfig.showWishlist && (
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between text-[10px] font-bold text-white">
                    <span className="flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-rose-400" /> Çiftin Çeyiz Listesi
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </div>
                )}

                {/* LCV FORM KUTUSU PREVIEW */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-left text-white">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Katılım Formu (RSVP)</span>
                  <input
                    disabled
                    placeholder="Adınız Soyadınız..."
                    className="w-full h-8 px-3 rounded-lg bg-white/10 text-[11px] text-white placeholder-white/40 border border-white/10"
                  />
                  <button disabled className="w-full h-8 bg-rose-500 text-white font-bold text-[11px] rounded-lg">
                    Katılımımı Onayla
                  </button>
                </div>

              </div>

              {/* FOOTER BADGE */}
              <div className="py-2 bg-black/20 text-[9px] text-zinc-400 font-mono">
                Powered by WedyPlan.com
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* QR KOD MODALI */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-6 relative text-center">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Davetiye QR Kodu</h3>
              <button onClick={() => setIsQrModalOpen(false)} className="p-1 rounded-xl text-zinc-400 hover:text-zinc-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-zinc-200 flex flex-col items-center justify-center space-y-3">
              <QrCode className="w-32 h-32 text-zinc-900" />
              <span className="text-[11px] font-mono text-zinc-500">{fullUrl}</span>
            </div>

            <p className="text-xs text-zinc-500">
              Bu QR kodu basılı davetiyelerinize basabilir, misafirlerinizin taraarak doğrudan web sitenize ulaşmasını sağlayabilirsiniz.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}