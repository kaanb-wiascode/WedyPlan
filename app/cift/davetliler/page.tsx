'use client';

import React, { useEffect, useState, useMemo, useTransition } from 'react';
import {
  getGuestItems,
  createGuestItem,
  sendGuestInvitation,
  updateGuestRsvp,
  deleteGuestItem,
  getWishlistItems
} from '@/lib/actions/guest';
import {
  Users,
  Plus,
  Trash2,
  Sparkles,
  Search,
  ChevronDown,
  Check,
  X,
  Mail,
  MessageSquare,
  Gift,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

const GROUPS = [
  { id: 'Gelin Tarafı', label: 'Gelin Tarafı' },
  { id: 'Damat Tarafı', label: 'Damat Tarafı' },
  { id: 'Ortak / Arkadaş', label: 'Ortak / Arkadaş' },
  { id: 'VIP', label: 'VIP Protokol' },
];

const DIET_OPTIONS = [
  { id: 'Standart', label: 'Standart Menü' },
  { id: 'Vejetaryen', label: 'Vejetaryen' },
  { id: 'Vegan', label: 'Vegan' },
  { id: 'Glutensiz', label: 'Glutensiz' },
];

export default function GuestsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupFilter, setSelectedCategoryFilter] = useState('ALL');
  const [selectedRsvpFilter, setSelectedRsvpFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState('Gelin Tarafı');
  const [plusOneCount, setPlusOneCount] = useState('0');
  const [dietaryPreference, setDietaryPreference] = useState('Standart');

  // Custom Dropdowns
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isDietOpen, setIsDietOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const res = await getGuestItems();
    if (res.success && res.data) setItems(res.data);

    const wishRes = await getWishlistItems();
    if (wishRes.success && wishRes.data) setWishlist(wishRes.data);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Metrik Hesaplamaları
  const totalGuests = useMemo(() => items.reduce((acc, curr) => acc + 1 + (Number(curr.plusOneCount) || 0), 0), [items]);
  const acceptedCount = useMemo(() => items.filter((i) => i.rsvpStatus === 'ACCEPTED').reduce((acc, curr) => acc + 1 + (Number(curr.plusOneCount) || 0), 0), [items]);
  const declinedCount = useMemo(() => items.filter((i) => i.rsvpStatus === 'DECLINED').reduce((acc, curr) => acc + 1 + (Number(curr.plusOneCount) || 0), 0), [items]);
  const pendingCount = useMemo(() => items.filter((i) => i.rsvpStatus === 'PENDING').reduce((acc, curr) => acc + 1 + (Number(curr.plusOneCount) || 0), 0), [items]);
  const rsvpPercentage = totalGuests > 0 ? Math.round((acceptedCount / totalGuests) * 100) : 0;

  // Davetli Ekleme
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) return;

    startTransition(async () => {
      const res = await createGuestItem({
        fullName,
        email,
        phone,
        group,
        plusOneCount: Number(plusOneCount),
        dietaryPreference,
      });

      if (res.success && res.data) {
        setItems(res.data);
        setFullName('');
        setEmail('');
        setPhone('');
        setIsModalOpen(false);
        showToast('Davetli başarıyla eklendi.');
      }
    });
  };

  // Davetiye Gönderme (Mail / WhatsApp / SMS)
  const handleSendInvite = (guestId: string, channel: 'EMAIL' | 'WHATSAPP' | 'SMS') => {
    startTransition(async () => {
      const res = await sendGuestInvitation(guestId, channel);
      if (res.success) {
        showToast(res.message || 'Davetiye iletildi.');
      }
    });
  };

  // LCV Statü Değiştirme
  const handleRsvpChange = (guestId: string, status: 'ACCEPTED' | 'DECLINED' | 'PENDING') => {
    startTransition(async () => {
      const res = await updateGuestRsvp(guestId, status);
      if (res.success && res.data) {
        setItems(res.data);
        showToast('LCV yanıtı güncellendi.');
      }
    });
  };

  // Davetli Silme
  const handleDelete = (id: string) => {
    if (!confirm('Davetliyi silmek istediğinize emin misiniz?')) return;
    startTransition(async () => {
      const res = await deleteGuestItem(id);
      if (res.success && res.data) {
        setItems(res.data);
        showToast('Davetli silindi.');
      }
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtrelenmiş Liste
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroupFilter === 'ALL' || item.group === selectedGroupFilter;
    const matchesRsvp = selectedRsvpFilter === 'ALL' || item.rsvpStatus === selectedRsvpFilter;
    return matchesSearch && matchesGroup && matchesRsvp;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3 font-sans">
        <div className="w-6 h-6 border-2 border-zinc-900 dark:border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-zinc-500">Davetli Listesi Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased">
      
      {/* TOAST BİLDİRİMİ */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER & SEKMELER (Frosted Glass) */}
      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            <span>Davetli Portalı</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Davetli & LCV Yönetimi
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Katılımcılarınızı davet edin, LCV yanıtlarını takip edin ve çeyiz listesi hediyelerini yönetin.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsWishlistModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200/80 dark:border-zinc-700/60 text-xs font-semibold hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Gift className="w-4 h-4 text-zinc-500" /> Çeyiz Listem ({wishlist.length})
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Davetli Ekle
          </button>
        </div>
      </div>

      {/* 1. İSTATİSTİK KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1">
          <span className="text-xs font-medium text-zinc-400">Toplam Davetli</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{totalGuests} Kişi</div>
          <div className="text-[11px] text-zinc-500">Kişi + Yanındaki Davetliler</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1">
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Katılanlar (LCV Onay)</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{acceptedCount} Kişi</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">%{rsvpPercentage} Katılım Oranı</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1">
          <span className="text-xs font-medium text-zinc-400">Katılamayanlar</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{declinedCount} Kişi</div>
          <div className="text-[11px] text-zinc-500">Mazeret Bildirenler</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1">
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Yanıt Bekleyen</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{pendingCount} Kişi</div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">Hatırlatma Gönderilebilir</div>
        </div>
      </div>

      {/* 2. LCV KATILIM İLERLEME BARI */}
      <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-zinc-700 dark:text-zinc-300">LCV Onaylanan Katılım Oranı</span>
          <span className="text-zinc-900 dark:text-white">%{rsvpPercentage}</span>
        </div>
        <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all duration-500"
            style={{ width: `${rsvpPercentage}%` }}
          />
        </div>
      </div>

      {/* 3. ARAMA VE FİLTRELER */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Davetli ismi veya e-posta ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
          />
        </div>

        {/* LCV Filtre Hapları */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedRsvpFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedRsvpFilter === 'ALL'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
            }`}
          >
            Tüm LCV
          </button>
          <button
            onClick={() => setSelectedRsvpFilter('ACCEPTED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedRsvpFilter === 'ACCEPTED'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
            }`}
          >
            Katılanlar
          </button>
          <button
            onClick={() => setSelectedRsvpFilter('PENDING')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedRsvpFilter === 'PENDING'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
            }`}
          >
            Bekleyenler
          </button>
          <button
            onClick={() => setSelectedRsvpFilter('DECLINED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedRsvpFilter === 'DECLINED'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
            }`}
          >
            Gelemeyenler
          </button>
        </div>
      </div>

      {/* 4. DAVETLİ LİSTESİ TABLOSU (Cam Kart) */}
      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <th className="p-4">Davetli Ad Soyad</th>
                <th className="p-4">Grup / Yakınlık</th>
                <th className="p-4">Kişi Sayısı</th>
                <th className="p-4">LCV Durumu</th>
                <th className="p-4">Davetiye Gönder</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-xs">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-400 font-medium">
                    Henüz eklenmiş davetli bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-zinc-900 dark:text-white">{item.fullName}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{item.email || item.phone || 'İletişim yok'}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium text-[11px]">
                        {item.group}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-zinc-800 dark:text-zinc-200">
                      1 + {item.plusOneCount} Kişi
                    </td>
                    <td className="p-4">
                      {item.rsvpStatus === 'ACCEPTED' ? (
                        <button
                          onClick={() => handleRsvpChange(item.id, 'PENDING')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold cursor-pointer"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Katılıyor
                        </button>
                      ) : item.rsvpStatus === 'DECLINED' ? (
                        <button
                          onClick={() => handleRsvpChange(item.id, 'PENDING')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-bold cursor-pointer"
                        >
                          <XCircle className="w-3 h-3" /> Katılamıyor
                        </button>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleRsvpChange(item.id, 'ACCEPTED')}
                            className="p-1 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer"
                            title="Katılıyor İşaretle"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleRsvpChange(item.id, 'DECLINED')}
                            className="p-1 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors cursor-pointer"
                            title="Katılamıyor İşaretle"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] text-zinc-400 font-medium ml-1">Bekliyor</span>
                        </div>
                      )}
                    </td>

                    {/* Davetiye Kanal Butonları */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleSendInvite(item.id, 'EMAIL')}
                          className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 text-[10px] font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                          title="Ücretsiz E-Posta Davetiye"
                        >
                          <Mail className="w-3 h-3" /> Mail
                        </button>
                        <button
                          onClick={() => handleSendInvite(item.id, 'WHATSAPP')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                          title="WhatsApp İle Davet Gönder"
                        >
                          <MessageSquare className="w-3 h-3" /> WP
                        </button>
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isPending}
                        className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. DAVETLİ EKLEME MODALI (Frosted Glass) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-zinc-500" /> Yeni Davetli Ekle
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Ad Soyad</label>
                <input
                  type="text"
                  placeholder="örn. Mehmet Yılmaz"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">E-Posta Adresi</label>
                  <input
                    type="email"
                    placeholder="mehmet@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Telefon Numarası</label>
                  <input
                    type="tel"
                    placeholder="+90532..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* DROPDOWN'LAR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* GRUP DROPDOWN */}
                <div className="space-y-1 relative">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Yakınlık / Grup</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsGroupOpen(!isGroupOpen);
                      setIsDietOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/60 bg-zinc-50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span className="truncate">{group}</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isGroupOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isGroupOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                      {GROUPS.map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => {
                            setGroup(g.id);
                            setIsGroupOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            group === g.id
                              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                          }`}
                        >
                          <span>{g.label}</span>
                          {group === g.id && <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* YANINDAKİ KİŞİ SAYISI */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Ek Kişi Sayısı (+1)</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={plusOneCount}
                    onChange={(e) => setPlusOneCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  />
                </div>

              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isPending ? 'Ekleniyor...' : 'Davetliyi Kaydet'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* 6. ÇEYİZ PORTALI HEDİYE İSTEK LİSTESİ MODALI (Frosted Glass) */}
      {isWishlistModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Gift className="w-4 h-4 text-zinc-500" /> Çiftin Çeyiz & Hediye Listesi
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  LCV onaylayan davetlilerin e-ticaret portalımız üzerinden satın alıp hediye edebileceği liste.
                </p>
              </div>
              <button
                onClick={() => setIsWishlistModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlist.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {item.category}
                    </span>
                    {item.isPurchased ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Hediye Edildi
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">Alınmadı</span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm font-black text-zinc-900 dark:text-white mt-1">₺{item.price.toLocaleString('tr-TR')}</p>
                  </div>

                  {item.isPurchased && (
                    <div className="text-[10px] text-zinc-400">
                      Hediye Eden: <span className="font-bold text-zinc-800 dark:text-zinc-200">{item.purchasedBy}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-xs text-zinc-400 font-medium">E-Ticaret Çeyiz Mağazasına Git</span>
              <button
                onClick={() => setIsWishlistModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black transition-all cursor-pointer"
              >
                Kapat
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}