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
    slug: '',
    title: '',
    date: '',
    time: '19:00',
    venueName: '',
    address: '',
    theme: 'minimalist-white',
    coverImage: '',
    welcomeMessage: '',
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

  const fullUrl = `https://www.wedyplan.com/dugun/${invitationConfig.slug}`;

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3 font-sans">
        <div className="w-6 h-6 border-2 border-zinc-900 dark:border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-zinc-500">Dijital Davetiye Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 pb-20 font-sans antialiased">
      
      {/* TOAST BİLDİRİMİ */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER & HIZLI AKSİYONLAR */}
      <div className="p-8 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <Globe className="w-3.5 h-3.5 text-zinc-500" />
            <span>Dijital Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Dijital Davetiye & Web Sitemiz
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Özel düğün web sitenizi tasarlayın, canlı önizleyin ve LCV toplamaya başlayın.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/60 hover:bg-zinc-200 transition-all cursor-pointer"
            title="QR Kod Oluştur"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={handleShareWhatsapp}
            className="px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold hover:bg-emerald-500/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> WhatsApp ile Paylaş
          </button>

          <button
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Link Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* ÜST CANLI BİLGİ BANNERI (Frosted Glass) */}
      <div className="apple-glass p-6 rounded-3xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            Web Siteniz Yayında
          </span>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">eda-and-mert.wedyplan.com</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Gelen tüm LCV yanıtları anında Davetliler sayfanıza aktarılır.</p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            {isPending ? 'Kaydediliyor...' : 'Değişiklikleri Yayınla'}
          </button>
        </div>
      </div>

      {/* DÜZENLEME VE CANLI TELEFON ÖNİZLEME */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SOL KOLON: AYARLAR VE TASARIM FORMU */}
        <div className="lg:col-span-7 apple-glass rounded-[28px] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-zinc-500" /> Web Sitesi İçerik Düzenleyici
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
              Canlı Senkronize
            </span>
          </div>

          <div className="space-y-5">
            {/* TEMA SEÇİMİ */}
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Tasarım Konsepti & Tema</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setInvitationConfig({ ...invitationConfig, theme: theme.id })}
                    className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all cursor-pointer ${
                      invitationConfig.theme === theme.id
                        ? 'border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                        : 'border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* BAŞLIK VE KAPAK GÖRSELİ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Davetiye Başlığı</label>
                <input
                  type="text"
                  value={invitationConfig.title}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Kapak Fotoğrafı URL</label>
                <input
                  type="text"
                  value={invitationConfig.coverImage}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, coverImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                />
              </div>
            </div>

            {/* TARİH, SAAT VE MEKAN */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Tarih</label>
                <input
                  type="text"
                  value={invitationConfig.date}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Saat</label>
                <input
                  type="text"
                  value={invitationConfig.time}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, time: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Mekan Adı</label>
                <input
                  type="text"
                  value={invitationConfig.venueName}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, venueName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                />
              </div>
            </div>

            {/* KARŞILAMA METNİ VE AI BÜTONU */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Karşılama Davet Metni</label>
                <button
                  type="button"
                  onClick={handleGenerateAiCopy}
                  disabled={isPending}
                  className="text-[11px] font-bold text-zinc-900 dark:text-white hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> WedyAI İle Metin Üret
                </button>
              </div>
              <textarea
                rows={3}
                value={invitationConfig.welcomeMessage}
                onChange={(e) => setInvitationConfig({ ...invitationConfig, welcomeMessage: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
              />
            </div>

            {/* INTERAKTIF MODÜL TOGGLE'LARI */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
              <label className="text-xs font-bold text-zinc-900 dark:text-white block uppercase tracking-wider">
                Sitede Gösterilecek Modüller
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 cursor-pointer">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-zinc-500" /> Özel Beslenme / Menü Tercihi Sorulsun mu?
                </span>
                <input
                  type="checkbox"
                  checked={invitationConfig.askDietary}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, askDietary: e.target.checked })}
                  className="w-4 h-4 rounded text-zinc-900 dark:text-white focus:ring-zinc-500 accent-zinc-900 dark:accent-white cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 cursor-pointer">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <Music className="w-4 h-4 text-zinc-500" /> Müzik / Şarkı İstek Alanı Olsun mu?
                </span>
                <input
                  type="checkbox"
                  checked={invitationConfig.askSongRequest}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, askSongRequest: e.target.checked })}
                  className="w-4 h-4 rounded text-zinc-900 dark:text-white focus:ring-zinc-500 accent-zinc-900 dark:accent-white cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 cursor-pointer">
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-zinc-500" /> Çiftin Çeyiz / Hediye Listesi Butonu Gösterilsin mi?
                </span>
                <input
                  type="checkbox"
                  checked={invitationConfig.showWishlist}
                  onChange={(e) => setInvitationConfig({ ...invitationConfig, showWishlist: e.target.checked })}
                  className="w-4 h-4 rounded text-zinc-900 dark:text-white focus:ring-zinc-500 accent-zinc-900 dark:accent-white cursor-pointer"
                />
              </label>
            </div>

          </div>
        </div>

        {/* SAĞ KOLON: CANLI MOBİL TELEFON SİMÜLATÖRÜ */}
        <div className="lg:col-span-5 flex flex-col items-center sticky top-24">
          <div className="text-center mb-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 justify-center">
              <Smartphone className="w-4 h-4 text-zinc-500" /> Canlı Mobil Önizleme
            </span>
          </div>

          <div className="w-full max-w-[360px] bg-zinc-950 p-3 rounded-[48px] shadow-2xl border-4 border-zinc-800 relative">
            <div className={`rounded-[38px] overflow-hidden min-h-[580px] flex flex-col justify-between text-center select-none ${currentThemeObj.bgClass} transition-colors duration-300`}>
              
              <div className="relative h-[200px] bg-black">
                <img src={invitationConfig.coverImage} alt="" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-end justify-center p-5 text-white">
                  <div className="space-y-1">
                    <Heart className="w-4 h-4 text-white mx-auto fill-white animate-pulse" />
                    <h2 className="font-serif text-lg font-bold leading-tight">{invitationConfig.title}</h2>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <p className={`text-xs font-serif italic leading-relaxed ${currentThemeObj.textClass}`}>
                  &quot;{invitationConfig.welcomeMessage}&quot;
                </p>

                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2 text-left text-[11px]">
                  <div className={`flex items-center gap-2 font-bold ${currentThemeObj.textClass}`}>
                    <Calendar className="w-3.5 h-3.5 text-zinc-300" />
                    <span>{invitationConfig.date} • {invitationConfig.time}</span>
                  </div>
                  <div className={`flex items-center gap-2 opacity-80 ${currentThemeObj.textClass}`}>
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="truncate">{invitationConfig.venueName}</span>
                  </div>
                </div>

                {invitationConfig.showWishlist && (
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between text-[10px] font-bold text-white">
                    <span className="flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-zinc-300" /> Çiftin Çeyiz Listesi
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-left text-white">
                  <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider block">Katılım Formu (RSVP)</span>
                  <input
                    disabled
                    placeholder="Adınız Soyadınız..."
                    className="w-full h-8 px-3 rounded-lg bg-white/10 text-[11px] text-white placeholder-white/40 border border-white/10"
                  />
                  <button disabled className="w-full h-8 bg-white text-zinc-900 font-bold text-[11px] rounded-lg">
                    Katılımımı Onayla
                  </button>
                </div>
              </div>

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
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-6 relative text-center">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Davetiye QR Kodu</h3>
              <button onClick={() => setIsQrModalOpen(false)} className="p-1 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-zinc-200 flex flex-col items-center justify-center space-y-3">
              <QrCode className="w-32 h-32 text-zinc-900" />
              <span className="text-[11px] font-mono text-zinc-500">{fullUrl}</span>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Bu QR kodu basılı davetiyelerinize basabilir, misafirlerinizin taratarak doğrudan web sitenize ulaşmasını sağlayabilirsiniz.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}