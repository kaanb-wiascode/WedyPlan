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
  { id: 'HIGH', label: 'Acil (Yüksek)', badgeBg: 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' },
  { id: 'MEDIUM', label: 'Rutin (Orta)', badgeBg: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300' },
  { id: 'LOW', label: 'İsteğe Bağlı', badgeBg: 'bg-zinc-50 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-500' },
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3 font-sans">
        <div className="w-6 h-6 border-2 border-zinc-900 dark:border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-zinc-500">Görev & Adımlar Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased">
      
      {/* Toast Bildirimi */}
      {notificationToast && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Mail className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium">{notificationToast}</span>
        </div>
      )}

      {/* HEADER & HIZLI AKSİYON */}
      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <CheckSquare className="w-3.5 h-3.5 text-zinc-500" />
            <span>Süreç Takibi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Görev & Planlama Adımları
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Düğün sürecindeki sorumlulukları partnerinizle paylaşın ve aşama aşama tamamlayın.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Yeni Görev Ekle
        </button>
      </div>

      {/* 1. ÖZET İLERLEME KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1">
          <span className="text-xs font-medium text-zinc-400">Toplam Adım</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{totalCount} Görev</div>
          <div className="text-[11px] text-zinc-500">Planlanan Tüm Süreç</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1">
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Tamamlanan</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{completedCount} Adım</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Başarıyla Tamamlandı</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1 relative overflow-hidden">
          <span className="text-xs font-medium text-zinc-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> İlerleme Oranı
          </span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">%{progressPercentage}</div>
          <p className="text-[11px] text-zinc-400">Dashboard hazırlık skorunu etkiler.</p>
        </div>
      </div>

      {/* 2. CANLI İLERLEME BARI */}
      <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-zinc-700 dark:text-zinc-300">Hazırlık Tamamlanma Oranı</span>
          <span className="text-zinc-900 dark:text-white">%{progressPercentage}</span>
        </div>
        <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all duration-500"
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
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedAssigneeFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedAssigneeFilter === 'ALL'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
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
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                  : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
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
          <div className="p-12 text-center bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-400 text-xs font-medium">
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
                    ? 'bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200/40 dark:border-zinc-800/60 text-zinc-400'
                    : 'bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border-zinc-200/80 dark:border-zinc-800/80 shadow-xs'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <input
                    type="checkbox"
                    checked={!!isDone}
                    onChange={() => handleToggle(item.id)}
                    className="w-4 h-4 rounded text-zinc-900 dark:text-white focus:ring-zinc-500 accent-zinc-900 dark:accent-white cursor-pointer mt-0.5 sm:mt-0"
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
                    <User className="w-3 h-3 text-zinc-500" />
                    {item.assignedToName || 'Birlikte'}
                  </span>

                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isPending}
                    className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
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

      {/* 5. MODAL (Frosted Glass) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-zinc-500" /> Yeni Düğün Görevi Ekle
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
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Görev Tanımı</label>
                <input
                  type="text"
                  placeholder="örn. Dış Çekim Mekan Rezervasyonu Yapılacak"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  required
                />
              </div>

              {/* DROPDOWN'LAR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* KATEGORİ DROPDOWN */}
                <div className="space-y-1 relative">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Kategori</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCategoryOpen(!isCategoryOpen);
                      setIsPriorityOpen(false);
                      setIsPartnerOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/60 bg-zinc-50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white flex items-center justify-between transition-all cursor-pointer"
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
                              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                          }`}
                        >
                          <span>{cat.label}</span>
                          {category === cat.id && <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ÖNCELİK DROPDOWN */}
                <div className="space-y-1 relative">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Öncelik Seviyesi</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPriorityOpen(!isPriorityOpen);
                      setIsCategoryOpen(false);
                      setIsPartnerOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/60 bg-zinc-50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white flex items-center justify-between transition-all cursor-pointer"
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
                              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                          }`}
                        >
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${pr.badgeBg}`}>
                            {pr.label}
                          </span>
                          {priority === pr.id && <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* ATANAN KİŞİ VE TARİH */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* ATANAN KİŞİ DROPDOWN */}
                <div className="space-y-1 relative">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Atanan Partner</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPartnerOpen(!isPartnerOpen);
                      setIsCategoryOpen(false);
                      setIsPriorityOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/60 bg-zinc-50 dark:bg-zinc-800/50 text-xs font-medium text-zinc-900 dark:text-white flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-zinc-400" />
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
                              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{p.label}</span>
                          </div>
                          {assignedToName === p.id && <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* TARİH */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Son Tarih</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
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
                  className="w-4 h-4 rounded text-zinc-900 dark:text-white focus:ring-zinc-500 accent-zinc-900 dark:accent-white cursor-pointer"
                />
                <label htmlFor="sendEmail" className="text-xs font-medium text-zinc-600 dark:text-zinc-300 cursor-pointer flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  Görev atandığında partnerime e-posta bildirimi gönder
                </label>
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