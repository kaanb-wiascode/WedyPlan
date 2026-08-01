'use client';

import React, { useEffect, useState, useTransition } from 'react';
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
  Smartphone,
  Save,
  X,
  Sliders,
  Check
} from 'lucide-react';

export default function CoupleSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'PAYMENTS' | 'NOTIFICATIONS' | 'SECURITY'>('PROFILE');

  // Form State'leri
  const [profileForm, setProfileForm] = useState<CoupleProfileData>({
    partnerOneName: '',
    partnerTwoName: '',
    weddingDate: '',
    city: '',
    venueName: '',
    guestCountGoal: 200,
    targetBudget: 300000,
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

  // Kart Ekleme Modalı
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [cardHolderInput, setCardHolderInput] = useState('');
  const [cardNumberInput, setCardNumberInput] = useState('');
  const [cardExpiryInput, setCardExpiryInput] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const res = await getCoupleSettings();
    if (res.success && res.data) {
      setProfileForm(res.data.profile);
      setPrefForm(res.data.preferences);
      setCards(res.data.cards);
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

  // Profil Kaydetme
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateCoupleProfile(profileForm);
      if (res.success) showToast(res.message || 'Profil güncellendi.');
    });
  };

  // Tercihleri Kaydetme
  const handleSavePreferences = (newPrefs: AppPreferencesData) => {
    setPrefForm(newPrefs);
    startTransition(async () => {
      const res = await updateAppPreferences(newPrefs);
      if (res.success) showToast(res.message || 'Tercihler kaydedildi.');
    });
  };

  // Kart Ekleme
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

  // Kart Silme
  const handleDeleteCard = (id: string) => {
    startTransition(async () => {
      const res = await deletePaymentMethod(id);
      if (res.success && res.data) {
        setCards(res.data);
        showToast(res.message || 'Kart silindi.');
      }
    });
  };

  // Varsayılan Kart Yapma
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-zinc-500">Hesap Ayarları Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 pb-20">
      
      {/* TOAST BİLDİRİMİ */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
          <Sliders className="w-7 h-7 text-rose-500" /> Hesap & Profil Ayarları
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Düğün bilgilerinizi, kayıtlı ödeme yöntemlerinizi ve WedyAI bildirim tercihlerinizi yönetin.
        </p>
      </div>

      {/* ALT NAVİGASYON SEKMELERİ */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto pb-3 scrollbar-none">
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
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-rose-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 1. SEKMELER VE İÇERİKLERİ */}

      {/* TAB 1: DÜĞÜN PROFİLİ */}
      {activeTab === 'PROFILE' && (
        <form onSubmit={handleSaveProfile} className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Genel Çift Bilgileri</h3>
              <p className="text-[11px] text-zinc-500">Tüm panellerde ve davetiyenizde görünecek detaylar.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">1. Partner Adı</label>
              <input
                type="text"
                value={profileForm.partnerOneName}
                onChange={e => setProfileForm({ ...profileForm, partnerOneName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">2. Partner Adı</label>
              <input
                type="text"
                value={profileForm.partnerTwoName}
                onChange={e => setProfileForm({ ...profileForm, partnerTwoName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-rose-500" /> Düğün Tarihi
              </label>
              <input
                type="date"
                value={profileForm.weddingDate}
                onChange={e => setProfileForm({ ...profileForm, weddingDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Şehir / Lokasyon</label>
              <input
                type="text"
                value={profileForm.city}
                onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium focus:outline-none focus:border-rose-500"
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
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Hedeflenen Davetli Sayısı</label>
              <input
                type="number"
                value={profileForm.guestCountGoal}
                onChange={e => setProfileForm({ ...profileForm, guestCountGoal: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isPending ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: KAYITLI ÖDEME YÖNTEMLERİ */}
      {activeTab === 'PAYMENTS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Kayıtlı Kredi & Banka Kartları</h3>
              <p className="text-[11px] text-zinc-500">Taksit ve uygulama içi satın alımlarda hızlı ödeme yapabilirsiniz.</p>
            </div>
            <button
              onClick={() => setIsAddCardOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-all cursor-pointer inline-flex items-center gap-1.5"
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
                    ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 text-white border-zinc-800 shadow-md'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className={`w-5 h-5 ${card.isDefault ? 'text-rose-400' : 'text-zinc-500'}`} />
                    <span className="text-xs font-black tracking-wider uppercase">{card.cardBrand}</span>
                  </div>
                  {card.isDefault ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                      Varsayılan
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetDefault(card.id)}
                      className="text-[10px] font-semibold text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
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

                <div className="pt-3 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="text-xs text-rose-400 hover:text-rose-500 font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WedyAI & BİLDİRİMLER */}
      {activeTab === 'NOTIFICATIONS' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">WedyAI & Otomatik Bildirim Tercihleri</h3>
              <p className="text-[11px] text-zinc-500">Hangi durumlarda anlık uyarı almak istediğinizi özelleştirin.</p>
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
                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800">
                  <div className="space-y-0.5 pr-4">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{item.title}</h4>
                    <p className="text-[11px] text-zinc-500">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSavePreferences({ ...prefForm, [key]: !isChecked })}
                    className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 cursor-pointer ${isChecked ? 'bg-rose-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isChecked ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: GÜVENLİK */}
      {activeTab === 'SECURITY' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Güvenlik & Erişim</h3>
              <p className="text-[11px] text-zinc-500">Hesap şifrenizi ve aktif cihaz oturumlarınızı yönetin.</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white">Hesap Şifresi</h4>
                <p className="text-[11px] text-zinc-500">En son 30 gün önce değiştirildi.</p>
              </div>
              <button className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                Şifreyi Değiştir
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white">Aktif Cihaz Oturumu</h4>
                <p className="text-[11px] text-zinc-500">MacBook Air • İstanbul, Türkiye (Bu cihaz)</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Aktif</span>
            </div>
          </div>
        </div>
      )}

      {/* KART EKLEME MODALI */}
      {isAddCardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-rose-500" /> Yeni Ödeme Kartı Ekle
              </h3>
              <button onClick={() => setIsAddCardOpen(false)} className="p-1 rounded-xl text-zinc-400 hover:text-zinc-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Kart Üzerindeki İsim</label>
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  value={cardHolderInput}
                  onChange={e => setCardHolderInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs font-bold focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Kart Numarası</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumberInput}
                  onChange={e => setCardNumberInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs font-mono focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Son Kullanma Tarihi</label>
                <input
                  type="text"
                  placeholder="AA/YY"
                  value={cardExpiryInput}
                  onChange={e => setCardExpiryInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs font-mono focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button type="button" onClick={() => setIsAddCardOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold cursor-pointer">İptal</button>
                <button type="submit" disabled={isPending} className="px-6 py-2.5 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-all cursor-pointer">
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