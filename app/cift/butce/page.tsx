'use client';

import React, { useEffect, useState, useMemo, useTransition } from 'react';
import { getBudgetItems, createBudgetItem, deleteBudgetItem } from '@/lib/actions/budget';
import {
  Wallet,
  Plus,
  Trash2,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  ChevronDown,
  Check,
  X
} from 'lucide-react';

// Kategori Tanımları
const CATEGORIES = [
  { id: 'Mekan', label: 'Mekan & Yeme-İçme', color: 'bg-rose-500' },
  { id: 'Fotograf', label: 'Fotoğraf & Video', color: 'bg-blue-500' },
  { id: 'Giyim', label: 'Gelinlik & Damatlık', color: 'bg-purple-500' },
  { id: 'Müzik', label: 'Müzik & Eğlence', color: 'bg-amber-500' },
  { id: 'Dekorasyon', label: 'Süsleme & Çiçek', color: 'bg-emerald-500' },
  { id: 'Diğer', label: 'Diğer Hizmetler', color: 'bg-zinc-500' },
];

// Ödeme Durumu Tanımları
const STATUS_OPTIONS = [
  { id: 'PENDING', label: 'Ödeme Bekliyor', badgeBg: 'bg-zinc-100 dark:bg-zinc-800', textColor: 'text-zinc-600 dark:text-zinc-400', icon: Clock },
  { id: 'PARTIAL', label: 'Kapora Ödendi', badgeBg: 'bg-amber-100 dark:bg-amber-950/60', textColor: 'text-amber-700 dark:text-amber-400', icon: Clock },
  { id: 'PAID', label: 'Tamamı Ödendi', badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60', textColor: 'text-emerald-700 dark:text-emerald-400', icon: CheckCircle2 },
];

export default function BudgetPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Mekan');
  const [allocatedAmount, setAllocatedAmount] = useState('');
  const [spentAmount, setSpentAmount] = useState('');
  const [status, setStatus] = useState<'PAID' | 'PENDING' | 'PARTIAL'>('PENDING');

  // Özel Açılır Menü State'leri
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Verileri Sunucudan & Çerezden Çek
  const loadData = async () => {
    setLoading(true);
    const res = await getBudgetItems();
    if (res.success && res.data) {
      setItems(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Anlık Canlı Hesaplamalar
  const TOTAL_TARGET_BUDGET = 350000;
  
  const totalSpent = useMemo(() => {
    return items.reduce((acc, curr) => acc + (Number(curr.spentAmount) || 0), 0);
  }, [items]);

  const remainingBudget = TOTAL_TARGET_BUDGET - totalSpent;
  const spentPercentage = Math.round((totalSpent / TOTAL_TARGET_BUDGET) * 100);

  // Ekleme İşlemi (Canlı UI + Server Revalidation)
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !allocatedAmount) return;

    startTransition(async () => {
      const res = await createBudgetItem({
        title,
        category,
        allocatedAmount: parseFloat(allocatedAmount),
        spentAmount: spentAmount ? parseFloat(spentAmount) : 0,
        status,
      });

      if (res.success && res.data) {
        setItems(res.data);
        setTitle('');
        setAllocatedAmount('');
        setSpentAmount('');
        setCategory('Mekan');
        setStatus('PENDING');
        setIsModalOpen(false);
      }
    });
  };

  // Silme İşlemi
  const handleDelete = (id: string) => {
    if (!confirm('Bu harcama kalemini silmek istediğinize emin misiniz?')) return;

    startTransition(async () => {
      const res = await deleteBudgetItem(id);
      if (res.success && res.data) {
        setItems(res.data);
      }
    });
  };

  // Filtrelenmiş Harcama Listesi
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'ALL' || item.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];
  const selectedStatusObj = STATUS_OPTIONS.find((s) => s.id === status) || STATUS_OPTIONS[0];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-zinc-500">Bütçe Verileri Hesaplanıyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* HEADER & HIZLI AKSİYON */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
            <Wallet className="w-7 h-7 text-rose-500" /> Düğün Bütçe Planlayıcı
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Maliyetlerinizi kontrol altında tutun, sürpriz harcamaların önüne geçin.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Yeni Harcama Ekle
        </button>
      </div>

      {/* 1. ÖZET FİNANS KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Hedef Bütçe</span>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">
            {TOTAL_TARGET_BUDGET.toLocaleString('tr-TR')} ₺
          </div>
          <div className="text-[11px] text-zinc-500">Tavan Limiti</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Gerçekleşen Harcama</span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
            {totalSpent.toLocaleString('tr-TR')} ₺
          </div>
          <div className="text-[11px] text-zinc-500">
            Bütçenin <span className="font-bold text-rose-500">%{spentPercentage}</span> kadarı harcandı.
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Kalan Bütçe</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {remainingBudget.toLocaleString('tr-TR')} ₺
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">Kullanılabilir Bakiye</div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white shadow-md space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Wedy AI Durum
            </span>
          </div>
          <div className="text-sm font-bold text-zinc-100">
            {spentPercentage > 85 ? '⚠️ Bütçe Sınırına Yaklaşıldı' : '✅ Bütçe İdeal Durumda'}
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Harcamalarınız canlı hesaplanıyor ve bütçeniz kontrol altında.
          </p>
        </div>
      </div>

      {/* 2. CANLI BÜTÇE İLERLEME BARI */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-zinc-700 dark:text-zinc-300">Harcanan Bütçe Oranı</span>
          <span className="text-rose-600">%{spentPercentage}</span>
        </div>
        <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* 3. FİLTRELER VE ARAMA */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Harcama ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-rose-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategoryFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategoryFilter === 'ALL'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-rose-200'
            }`}
          >
            Tümü
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategoryFilter === cat.id
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-rose-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. HARCAMA KALEMLERİ TABLOSU */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                <th className="p-4">Harcama Başlığı</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Planlanan Tutar</th>
                <th className="p-4">Ödenen Tutar</th>
                <th className="p-4">Durum</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-400">
                    Henüz eklenmiş bir harcama bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const statusObj = STATUS_OPTIONS.find((s) => s.id === item.status) || STATUS_OPTIONS[0];
                  const StatusIcon = statusObj.icon;

                  return (
                    <tr key={item.id} className="hover:bg-rose-50/30 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4 font-bold text-zinc-900 dark:text-white">
                        {item.title}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium text-[11px]">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-zinc-800 dark:text-zinc-200">
                        {Number(item.allocatedAmount).toLocaleString('tr-TR')} ₺
                      </td>
                      <td className="p-4 font-semibold text-rose-600 dark:text-rose-400">
                        {Number(item.spentAmount || 0).toLocaleString('tr-TR')} ₺
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${statusObj.badgeBg} ${statusObj.textColor}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusObj.label}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isPending}
                          className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-500 hover:text-rose-700 transition-colors cursor-pointer disabled:opacity-50"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. YENİ HARCAMA EKLEME MODALI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-rose-500" /> Yeni Bütçe Kalemi Ekle
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Harcama Başlığı</label>
                <input
                  type="text"
                  placeholder="örn. Düğün Salonu Kiralama"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                  required
                />
              </div>

              {/* LÜKS DROPDOWN'LAR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* KATEGORİ DROPDOWN */}
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Kategori</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                      setIsStatusDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white flex items-center justify-between hover:border-rose-300 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`w-2.5 h-2.5 rounded-full ${selectedCategoryObj.color}`} />
                      <span className="truncate">{selectedCategoryObj.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCategoryDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setCategory(cat.id);
                            setIsCategoryDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            category === cat.id
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                            <span>{cat.label}</span>
                          </div>
                          {category === cat.id && <Check className="w-3.5 h-3.5 text-rose-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ÖDEME DURUMU DROPDOWN */}
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Ödeme Durumu</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsStatusDropdownOpen(!isStatusDropdownOpen);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white flex items-center justify-between hover:border-rose-300 transition-all cursor-pointer"
                  >
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${selectedStatusObj.badgeBg} ${selectedStatusObj.textColor}`}>
                      {selectedStatusObj.label}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isStatusDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                      {STATUS_OPTIONS.map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => {
                            setStatus(st.id as any);
                            setIsStatusDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            status === st.id
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${st.badgeBg} ${st.textColor}`}>
                            {st.label}
                          </span>
                          {status === st.id && <Check className="w-3.5 h-3.5 text-rose-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* TUTAR GİRİŞLERİ */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Planlanan Tutar (₺)</label>
                  <input
                    type="number"
                    placeholder="150000"
                    value={allocatedAmount}
                    onChange={(e) => setAllocatedAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Ödenen Tutar (₺)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={spentAmount}
                    onChange={(e) => setSpentAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs font-bold hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isPending ? 'Kaydediliyor...' : 'Harcamayı Kaydet'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}