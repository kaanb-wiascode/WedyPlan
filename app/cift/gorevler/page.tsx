'use client';

import React, { useEffect, useState, useMemo, useTransition } from 'react';
import {
  getChecklistItems,
  createChecklistItem,
  toggleChecklistItem,
  deleteChecklistItem
} from '@/lib/actions/checklist';
import {
  CheckSquare,
  Plus,
  Trash2,
  Sparkles,
  Search,
  ChevronDown,
  Check,
  X,
  User,
  Mail,
  Calendar
} from 'lucide-react';

const CATEGORIES = [
  { id: 'Mekan & Yeme-İçme', label: 'Mekan & Yeme-İçme' },
  { id: 'Kıyafet & Stil', label: 'Kıyafet & Stil' },
  { id: 'Eğlence & Müzik', label: 'Eğlence & Müzik' },
  { id: 'Matbaa & Davetiye', label: 'Matbaa & Davetiye' },
  { id: 'Resmi İşlemler', label: 'Resmi İşlemler & Nikah' },
  { id: 'Diğer', label: 'Diğer Hazırlıklar' },
];

const PRIORITIES = [
  { id: 'HIGH', label: 'Acil (Yüksek)', badgeBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400' },
  { id: 'MEDIUM', label: 'Rutin (Orta)', badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' },
  { id: 'LOW', label: 'İsteğe Bağlı', badgeBg: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' },
];

const PARTNERS = [
  { id: 'Eda', label: 'Eda' },
  { id: 'Mert', label: 'Mert' },
  { id: 'Birlikte', label: 'Birlikte' },
];

export default function ChecklistPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');
  const [selectedAssigneeFilter, setSelectedAssigneeFilter] = useState('ALL');
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Mekan & Yeme-İçme');
  const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [assignedToName, setAssignedToName] = useState('Eda');
  const [dueDate, setDueDate] = useState('');
  const [sendEmailNotification, setSendEmailNotification] = useState(true);

  // Dropdown States
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const res = await getChecklistItems();
    if (res.success && res.data) {
      setItems(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Metrikler
  const totalCount = items.length;
  const completedCount = useMemo(() => items.filter((i) => i.isCompleted || i.completed).length, [items]);
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Görev Ekleme
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    startTransition(async () => {
      const res = await createChecklistItem({
        title,
        category,
        priority,
        assignedToName,
        dueDate: dueDate || new Date().toISOString().split('T')[0],
        sendEmailNotification,
      });

      if (res.success && res.data) {
        setItems(res.data);
        setTitle('');
        setDueDate('');
        setIsModalOpen(false);

        if (res.emailSent) {
          setNotificationToast(`Görev ${assignedToName} kişisine atandı ve e-posta bildirimi gönderildi.`);
          setTimeout(() => setNotificationToast(null), 4000);
        }
      }
    });
  };

  // Görev Tamamlama Toggle
  const handleToggle = (id: string) => {
    startTransition(async () => {
      const res = await toggleChecklistItem(id);
      if (res.success && res.data) {
        setItems(res.data);
      }
    });
  };

  // Görev Silme
  const handleDelete = (id: string) => {
    if (!confirm('Bu görevi silmek istediğinize emin misiniz?')) return;
    startTransition(async () => {
      const res = await deleteChecklistItem(id);
      if (res.success && res.data) {
        setItems(res.data);
      }
    });
  };

  // Filtrelenmiş Liste
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'ALL' || item.category === selectedCategoryFilter;
    const matchesAssignee = selectedAssigneeFilter === 'ALL' || item.assignedToName === selectedAssigneeFilter;
    return matchesSearch && matchesCategory && matchesAssignee;
  });

  const selectedPriorityObj = PRIORITIES.find((p) => p.id === priority) || PRIORITIES[1];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-zinc-500">Görev & Adımlar Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Toast Bildirimi */}
      {notificationToast && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Mail className="w-4 h-4 text-rose-400" />
          <span className="text-xs font-medium">{notificationToast}</span>
        </div>
      )}

      {/* HEADER & HIZLI AKSİYON */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
            <CheckSquare className="w-7 h-7 text-rose-500" /> Görev & Planlama Adımları
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Düğün sürecindeki sorumlulukları partnerinizle paylaşın ve aşama aşama tamamlayın.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Yeni Görev Ekle
        </button>
      </div>

      {/* 1. ÖZET İLERLEME KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Toplam Adım</span>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">{totalCount} Görev</div>
          <div className="text-[11px] text-zinc-500">Planlanan Tüm Süreç</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tamamlanan</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{completedCount} Adım</div>
          <div className="text-[11px] text-emerald-600 font-medium">Başarıyla Tamamlandı</div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white shadow-md space-y-1 relative overflow-hidden">
          <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> İlerleme Oranı
          </span>
          <div className="text-2xl font-black text-zinc-100">%{progressPercentage}</div>
          <p className="text-[11px] text-zinc-400">Dashboard hazırlık skorunu doğrudan etkiler.</p>
        </div>
      </div>

      {/* 2. CANLI İLERLEME BARI */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-zinc-700 dark:text-zinc-300">Hazırlık Tamamlanma Oranı</span>
          <span className="text-rose-600">%{progressPercentage}</span>
        </div>
        <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* 3. ARAMA VE FİLTRELER */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Görev ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:border-rose-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedAssigneeFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedAssigneeFilter === 'ALL'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-rose-200'
            }`}
          >
            Herkes
          </button>
          {PARTNERS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedAssigneeFilter(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedAssigneeFilter === p.id
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-rose-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. GÖREV LİSTESİ */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 text-zinc-400 text-xs">
            Aradığınız kriterlere uygun görev bulunamadı.
          </div>
        ) : (
          filteredItems.map((item) => {
            const priorityObj = PRIORITIES.find((p) => p.id === item.priority) || PRIORITIES[1];
            const isDone = item.isCompleted || item.completed;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone
                    ? 'bg-zinc-50/80 dark:bg-zinc-900/40 border-zinc-200/50 text-zinc-400'
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-rose-200 shadow-xs'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <input
                    type="checkbox"
                    checked={!!isDone}
                    onChange={() => handleToggle(item.id)}
                    className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500 accent-rose-500 cursor-pointer mt-0.5 sm:mt-0"
                  />
                  <div>
                    <h3 className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-zinc-400' : 'text-zinc-900 dark:text-white'}`}>
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                        {item.category || 'Genel'}
                      </span>
                      {item.dueDate && (
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-zinc-400" /> {new Date(item.dueDate).toLocaleDateString('tr-TR')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-100 dark:border-zinc-800">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${priorityObj.badgeBg}`}>
                    {priorityObj.label}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-bold">
                    <User className="w-3 h-3 text-rose-500" />
                    {item.assignedToName || 'Birlikte'}
                  </span>

                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isPending}
                    className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-500 hover:text-rose-700 transition-colors cursor-pointer disabled:opacity-50"
                    title="Görevi Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-rose-500" /> Yeni Düğün Görevi Ekle
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
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Görev Tanımı</label>
                <input
                  type="text"
                  placeholder="örn. Dış Çekim Mekan Rezervasyonu Yapılacak"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                  required
                />
              </div>

              {/* DROPDOWN'LAR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* KATEGORİ DROPDOWN */}
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Kategori</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCategoryOpen(!isCategoryOpen);
                      setIsPriorityOpen(false);
                      setIsPartnerOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white flex items-center justify-between hover:border-rose-300 transition-all cursor-pointer"
                  >
                    <span className="truncate">{category}</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCategoryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150 max-h-48 overflow-y-auto">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setCategory(cat.id);
                            setIsCategoryOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            category === cat.id
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          <span>{cat.label}</span>
                          {category === cat.id && <Check className="w-3.5 h-3.5 text-rose-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ÖNCELİK DROPDOWN */}
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Öncelik Seviyesi</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPriorityOpen(!isPriorityOpen);
                      setIsCategoryOpen(false);
                      setIsPartnerOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white flex items-center justify-between hover:border-rose-300 transition-all cursor-pointer"
                  >
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${selectedPriorityObj.badgeBg}`}>
                      {selectedPriorityObj.label}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isPriorityOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isPriorityOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                      {PRIORITIES.map((pr) => (
                        <button
                          key={pr.id}
                          type="button"
                          onClick={() => {
                            setPriority(pr.id as any);
                            setIsPriorityOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            priority === pr.id
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${pr.badgeBg}`}>
                            {pr.label}
                          </span>
                          {priority === pr.id && <Check className="w-3.5 h-3.5 text-rose-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* ATANAN KİŞİ VE TARİH */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* ATANAN KİŞİ DROPDOWN */}
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Atanan Partner</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPartnerOpen(!isPartnerOpen);
                      setIsCategoryOpen(false);
                      setIsPriorityOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white flex items-center justify-between hover:border-rose-300 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-rose-500" />
                      <span>{assignedToName}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isPartnerOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isPartnerOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                      {PARTNERS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setAssignedToName(p.id);
                            setIsPartnerOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            assignedToName === p.id
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{p.label}</span>
                          </div>
                          {assignedToName === p.id && <Check className="w-3.5 h-3.5 text-rose-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* TARİH */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Son Tarih</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                  />
                </div>

              </div>

              {/* BİLDİRİM CHECKBOX'I */}
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sendEmail"
                  checked={sendEmailNotification}
                  onChange={(e) => setSendEmailNotification(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 accent-rose-500 cursor-pointer"
                />
                <label htmlFor="sendEmail" className="text-xs font-medium text-zinc-600 dark:text-zinc-300 cursor-pointer flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-rose-500" />
                  Görev atandığında partnerime e-posta bildirimi gönder
                </label>
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
                  {isPending ? 'Ekleniyor...' : 'Görevi Kaydet'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}