'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  getCoupleSettings,
  updateCoupleProfile,
  updateAppPreferences,
  addPaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod,
  CoupleProfileData,
  AppPreferencesData,
  SavedPaymentMethod
} from '@/lib/actions/settings';
import {
  User,
  Heart,
  CreditCard,
  Bell,
  ShieldCheck,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  Lock,
  Building2,
  Calendar,
  Save,
  X,
  Sliders,
  Check
} from 'lucide-react';

export default function CoupleSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'PAYMENTS' | 'NOTIFICATIONS' | 'SECURITY'>('PROFILE');

  const [profileForm, setProfileForm] = useState<CoupleProfileData>({
    partnerOneName: '',
    partnerTwoName: '',
    weddingDate: '',
    city: '',
    venueName: '',
    guestCountGoal: 0,
    targetBudget: 350000,
  });

  const [prefForm, setPrefForm] = useState<AppPreferencesData>({
    aiRecommendations: true,
    smsNotifications: true,
    emailDigest: true,
    budgetAlerts: true,
    theme: 'light',
    language: 'tr',
  });

  const [cards, setCards] = useState<SavedPaymentMethod[]>([]);

  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [cardHolderInput, setCardHolderInput] = useState('');
  const [cardNumberInput, setCardNumberInput] = useState('');
  const [cardExpiryInput, setCardExpiryInput] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    
    // 1. Önce localStorage'dan hızlıca oku
    try {
      const local = localStorage.getItem('wedyplan_couple_profile');
      if (local) {
        const parsed = JSON.parse(local);
        setProfileForm((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {}

    // 2. Sunucudan verileri senkronize et
    const res = await getCoupleSettings();
    if (res.success && res.data) {
      setProfileForm(res.data.profile);
      setPrefForm(res.data.preferences);
      setCards(res.data.cards);
      try {
        localStorage.setItem('wedyplan_couple_profile', JSON.stringify(res.data.profile));
      } catch (e) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Profil Kaydetme (Anlık Senkronizasyon Tetikleyicili)
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    // Anında localStorage'a yaz ve tüm portalı tetikle
    try {
      localStorage.setItem('wedyplan_couple_profile', JSON.stringify(profileForm));
      window.dispatchEvent(new Event('wedyplan_profile_updated'));
    } catch (err) {}

    startTransition(async () => {
      const res = await updateCoupleProfile(profileForm);
      if (res.success) {
        showToast(res.message || 'Profil güncellendi.');
        router.refresh();
      }
    });
  };

  const handleSavePreferences = (newPrefs: AppPreferencesData) => {
    setPrefForm(newPrefs);
    startTransition(async () => {
      const res = await updateAppPreferences(newPrefs);
      if (res.success) showToast(res.message || 'Tercihler kaydedildi.');
    });
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardHolderInput || !cardNumberInput || !cardExpiryInput) return;

    startTransition(async () => {
      const res = await addPaymentMethod(cardHolderInput, cardNumberInput, cardExpiryInput);
      if (res.success && res.data) {
        setCards(res.data);
        setIsAddCardOpen(false);
        setCardHolderInput('');
        setCardNumberInput('');
        setCardExpiryInput('');
        showToast(res.message || 'Kart eklendi.');
      }
    });
  };

  const handleDeleteCard = (id: string) => {
    startTransition(async () => {
      const res = await deletePaymentMethod(id);
      if (res.success && res.data) {
        setCards(res.data);
        showToast(res.message || 'Kart silindi.');
      }
    });
  };

  const handleSetDefault = (id: string) => {
    startTransition(async () => {
      const res = await setDefaultPaymentMethod(id);
      if (res.success && res.data) {
        setCards(res.data);
        showToast(res.message || 'Varsayılan kart güncellendi.');
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3 font-sans">
        <div className="w-6 h-6 border-2 border-zinc-900 dark:border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-zinc-500">Hesap Ayarları Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 pb-20 font-sans antialiased">
      
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="p-8 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
          <Sliders className="w-3.5 h-3.5 text-zinc-500" />
          <span>Sistem Yapılandırması</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Hesap & Profil Ayarları
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Düğün bilgilerinizi, kayıtlı ödeme yöntemlerinizi ve WedyAI bildirim tercihlerinizi yönetin.
        </p>
      </div>

      {/* Tabs Nav */}
      <div className="flex items-center gap-2 border-b border-zinc-200/80 dark:border-zinc-800/80 overflow-x-auto pb-3 scrollbar-none">
        {[
          { id: 'PROFILE', label: 'Çift & Düğün Profili', icon: User },
          { id: 'PAYMENTS', label: 'Kayıtlı Ödeme Yöntemleri', icon: CreditCard, count: cards.length },
          { id: 'NOTIFICATIONS', label: 'WedyAI & Bildirimler', icon: Bell },
          { id: 'SECURITY', label: 'Güvenlik & Oturumlar', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                  : 'bg-white/70 dark:bg-zinc-900/70 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${isActive ? 'bg-white/20 text-white dark:bg-black/20 dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeTab === 'PROFILE' && (
        <form onSubmit={handleSaveProfile} className="apple-glass rounded-[28px] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              <Heart className="w-5 h-5 text-zinc-500 fill-zinc-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Genel Çift Bilgileri</h3>
              <p className="text-[11px] text-zinc-400">Tüm panellerde ve davetiyenizde görünecek detaylar.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">1. Partner Adı</label>
              <input
                type="text"
                value={profileForm.partnerOneName}
                onChange={e => setProfileForm({ ...profileForm, partnerOneName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 bg-zinc-50/80 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">2. Partner Adı</label>
              <input
                type="text"
                value={profileForm.partnerTwoName}
                onChange={e => setProfileForm({ ...profileForm, partnerTwoName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 bg-zinc-50/80 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" /> Düğün Tarihi
              </label>
              <input
                type="date"
                value={profileForm.weddingDate}
                onChange={e => setProfileForm({ ...profileForm, weddingDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 bg-zinc-50/80 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Şehir / Lokasyon</label>
              <input
                type="text"
                value={profileForm.city}
                onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 bg-zinc-50/80 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-zinc-400" /> Anlaşılan Düğün Mekanı
              </label>
              <input
                type="text"
                value={profileForm.venueName}
                onChange={e => setProfileForm({ ...profileForm, venueName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 bg-zinc-50/80 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Hedeflenen Davetli Sayısı</label>
              <input
                type="number"
                value={profileForm.guestCountGoal}
                onChange={e => setProfileForm({ ...profileForm, guestCountGoal: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 bg-zinc-50/80 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end border-t border-zinc-100 dark:border-zinc-800/80">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isPending ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
            </button>
          </div>
        </form>
      )}

      {activeTab === 'PAYMENTS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Kayıtlı Kredi & Banka Kartları</h3>
              <p className="text-[11px] text-zinc-400">Taksit ve uygulama içi satın alımlarda hızlı ödeme yapabilirsiniz.</p>
            </div>
            <button
              onClick={() => setIsAddCardOpen(true)}
              className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Yeni Kart Ekle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`p-5 rounded-3xl border transition-all space-y-4 relative ${
                  card.isDefault
                    ? 'bg-zinc-900 text-white border-zinc-800 shadow-md'
                    : 'bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border-zinc-200/80 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className={`w-5 h-5 ${card.isDefault ? 'text-white' : 'text-zinc-500'}`} />
                    <span className="text-xs font-black tracking-wider uppercase">{card.cardBrand}</span>
                  </div>
                  {card.isDefault ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold border border-white/20">
                      Varsayılan
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetDefault(card.id)}
                      className="text-[10px] font-semibold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      Varsayılan Yap
                    </button>
                  )}
                </div>

                <div className="space-y-1 pt-2">
                  <div className="text-lg font-mono tracking-widest">{card.cardNumberMasked}</div>
                  <div className="flex items-center justify-between text-[11px] opacity-80 pt-1">
                    <span>{card.cardHolder}</span>
                    <span>Son Kullanma: {card.expiryDate}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200/40 dark:border-zinc-800/60 flex justify-end">
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="text-xs text-zinc-400 hover:text-red-500 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'NOTIFICATIONS' && (
        <div className="apple-glass rounded-[28px] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">WedyAI & Otomatik Bildirim Tercihleri</h3>
              <p className="text-[11px] text-zinc-400">Hangi durumlarda anlık uyarı almak istediğinizi özelleştirin.</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { id: 'aiRecommendations', title: 'WedyAI Akıllı İndirim & Akış Tavsiyeleri', desc: 'Düğün tarihinize ve bütçenize göre AI öneriler sunar.' },
              { id: 'budgetAlerts', title: 'Bütçe Aşımı & Taksit Vade Uyarıları', desc: 'Yaklaşan ödeme tarihlerini 3 gün önceden hatırlatır.' },
              { id: 'smsNotifications', title: 'Davetliler İçin Otomatik LCV SMS Hatırlatıcı', desc: 'Yanıt vermeyen davetlilere SMS hatırlatması gönderir.' },
              { id: 'emailDigest', title: 'Haftalık Düğün Hazırlık Özet E-Postası', desc: 'Haftada bir yapılacaklar listesi özetini iletir.' },
            ].map((item) => {
              const key = item.id as keyof AppPreferencesData;
              const isChecked = Boolean(prefForm[key]);

              return (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50">
                  <div className="space-y-0.5 pr-4">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{item.title}</h4>
                    <p className="text-[11px] text-zinc-400">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSavePreferences({ ...prefForm, [key]: !isChecked })}
                    className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 cursor-pointer ${isChecked ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full transition-transform ${isChecked ? 'translate-x-6 bg-white dark:bg-zinc-900' : 'translate-x-0 bg-white'}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'SECURITY' && (
        <div className="apple-glass rounded-[28px] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Güvenlik & Erişim</h3>
              <p className="text-[11px] text-zinc-400">Hesap şifrenizi ve aktif cihaz oturumlarınızı yönetin.</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white">Hesap Şifresi</h4>
                <p className="text-[11px] text-zinc-400">En son 30 gün önce değiştirildi.</p>
              </div>
              <button className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                Şifreyi Değiştir
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white">Aktif Cihaz Oturumu</h4>
                <p className="text-[11px] text-zinc-400">MacBook Air • İstanbul, Türkiye (Bu cihaz)</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Aktif</span>
            </div>
          </div>
        </div>
      )}

      {/* YENİ KART MODALI (Frosted Glass) */}
      {isAddCardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-zinc-500" /> Yeni Ödeme Kartı Ekle
              </h3>
              <button onClick={() => setIsAddCardOpen(false)} className="p-1 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Kart Üzerindeki İsim</label>
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  value={cardHolderInput}
                  onChange={e => setCardHolderInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Kart Numarası</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumberInput}
                  onChange={e => setCardNumberInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs font-mono text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Son Kullanma Tarihi</label>
                <input
                  type="text"
                  placeholder="AA/YY"
                  value={cardExpiryInput}
                  onChange={e => setCardExpiryInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs font-mono text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
                  required
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button type="button" onClick={() => setIsAddCardOpen(false)} className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer">İptal</button>
                <button type="submit" disabled={isPending} className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer">
                  {isPending ? 'Ekleniyor...' : 'Kartı Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}