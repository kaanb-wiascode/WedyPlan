'use client';

import React, { useEffect, useState, useMemo, useTransition } from 'react';
import {
  getVendorDashboardData,
  createVendorAgreement,
  addVendorPayment,
  submitVendorReview
} from '@/lib/actions/vendors';
import {
  Building2,
  Plus,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  FileText,
  CreditCard,
  Star,
  MessageSquare,
  Phone,
  ShieldCheck,
  ChevronRight,
  X,
  Check,
  AlertCircle,
  ExternalLink,
  DollarSign
} from 'lucide-react';

export default function VendorsPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Sub-Menu Alt Navigasyon Sekmeleri
  const [activeTab, setActiveTab] = useState<'BOOKED' | 'FAVORITES' | 'CONTRACTS' | 'PAYMENTS' | 'REVIEWS'>('BOOKED');
  
  // Modallar
  const [isNewAgreementModalOpen, setIsNewAgreementModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Seçili Nesneler
  const [selectedVendorForPayment, setSelectedVendorForPayment] = useState<any>(null);
  const [selectedVendorForReview, setSelectedVendorForReview] = useState<any>(null);

  // Form State - Anlaşma
  const [vendorName, setVendorName] = useState('');
  const [category, setCategory] = useState('Mekan & Yeme-İçme');
  const [totalAmount, setTotalAmount] = useState('');
  const [paidAmount, setPaidAmount] = useState('');

  // Form State - Ödeme
  const [additionalPayment, setAdditionalPayment] = useState('');

  // Form State - Yorum & WedyPlan Bildirimi
  const [rating, setRating] = useState(5);
  const [reviewComment, setComment] = useState('');
  const [platformFeedback, setPlatformFeedback] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const res = await getVendorDashboardData();
    if (res.success && res.data) setVendors(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Metrikler
  const bookedVendors = useMemo(() => vendors.filter((v) => v.status === 'BOOKED'), [vendors]);
  const favoriteVendors = useMemo(() => vendors.filter((v) => v.status === 'FAVORITE'), [vendors]);
  
  const totalAgreedBudget = useMemo(() => bookedVendors.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0), [bookedVendors]);
  const totalPaidBudget = useMemo(() => bookedVendors.reduce((acc, curr) => acc + (Number(curr.paidAmount) || 0), 0), [bookedVendors]);
  const totalRemainingBudget = totalAgreedBudget - totalPaidBudget;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Yeni Anlaşma Kaydı
  const handleCreateAgreement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName || !totalAmount) return;

    startTransition(async () => {
      const res = await createVendorAgreement({
        vendorName,
        category,
        totalAmount: parseFloat(totalAmount),
        paidAmount: paidAmount ? parseFloat(paidAmount) : 0,
        contractDate: new Date().toISOString().split('T')[0],
      });

      if (res.success && res.data) {
        setVendors(res.data);
        setVendorName('');
        setTotalAmount('');
        setPaidAmount('');
        setIsNewAgreementModalOpen(false);
        showToast('Firma anlaşması kaydedildi ve Bütçe Planlayıcıya aktarıldı.');
      }
    });
  };

  // Ödeme Ekleme
  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVendorForPayment || !additionalPayment) return;

    startTransition(async () => {
      const res = await addVendorPayment(selectedVendorForPayment.id, parseFloat(additionalPayment));
      if (res.success && res.data) {
        setVendors(res.data);
        setAdditionalPayment('');
        setIsPaymentModalOpen(false);
        showToast('Ödeme kaydedildi ve Bütçe Planlayıcı güncellendi.');
      }
    });
  };

  // Değerlendirme & Geri Bildirim
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVendorForReview) return;

    startTransition(async () => {
      const res = await submitVendorReview({
        vendorId: selectedVendorForReview.id,
        rating,
        comment: reviewComment,
        platformFeedback,
      });

      if (res.success) {
        setIsReviewModalOpen(false);
        setComment('');
        setPlatformFeedback('');
        showToast('Değerlendirmeniz ve WedyPlan geri bildiriminiz kaydedildi.');
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-zinc-500">Tedarikçi Portalı Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* TOAST BİLDİRİMİ */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER & HIZLI AKSİYON */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
            <Building2 className="w-7 h-7 text-rose-500" /> Anlaşmalı Firmalar & Hizmetler
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Anlaşmalı firmalarınızın sözleşmelerini, ödemelerini ve teslimat süreçlerini yönetin.
          </p>
        </div>

        <button
          onClick={() => setIsNewAgreementModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Yeni Firma Anlaşması Ekle
        </button>
      </div>

      {/* 1. ÖZET FİNANSAL SÖZLEŞME KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Taahhüt Edilen Toplam</span>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">{totalAgreedBudget.toLocaleString('tr-TR')} ₺</div>
          <div className="text-[11px] text-zinc-500">{bookedVendors.length} Anlaşmalı Firma</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ödenen Tutar (Kapora + Taksit)</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{totalPaidBudget.toLocaleString('tr-TR')} ₺</div>
          <div className="text-[11px] text-emerald-600 font-medium">Bütçe Planlayıcı ile Senkronize</div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white shadow-md space-y-1 relative overflow-hidden">
          <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
            <CreditCard className="w-3.5 h-3.5" /> Kalan Bakiye
          </span>
          <div className="text-2xl font-black text-zinc-100">{totalRemainingBudget.toLocaleString('tr-TR')} ₺</div>
          <p className="text-[11px] text-zinc-400">Düğün gününe kadar tamamlanacak tutar.</p>
        </div>
      </div>

      {/* 2. SUB-MENU ALT NAVİGASYON SEKMELERİ */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto pb-3 scrollbar-none">
        {[
          { id: 'BOOKED', label: 'Anlaştığım Firmalar', icon: ShieldCheck, count: bookedVendors.length },
          { id: 'FAVORITES', label: 'Favoriler & Teklifler', icon: Star, count: favoriteVendors.length },
          { id: 'CONTRACTS', label: 'Sözleşmelerim', icon: FileText, count: bookedVendors.length },
          { id: 'PAYMENTS', label: 'Ödeme & Taksit Takibi', icon: CreditCard },
          { id: 'REVIEWS', label: 'Yorum & Geri Bildirim', icon: MessageSquare },
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

      {/* 3. SEKME İÇERİKLERİ */}

      {/* SEKME 1: ANLAŞTIĞIM FİRMALAR */}
      {activeTab === 'BOOKED' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookedVendors.length === 0 ? (
            <div className="col-span-2 p-12 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-400 text-xs">
              Henüz anlaşması tamamlanmış bir firma bulunmuyor.
            </div>
          ) : (
            bookedVendors.map((vendor) => (
              <div key={vendor.id} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-[10px] font-bold">
                      {vendor.category}
                    </span>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-2">{vendor.name}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" /> Anlaşıldı
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Yetkili Kişi</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{vendor.contactPerson}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Telefon</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{vendor.phone}</span>
                  </div>
                </div>

                {/* Milestone / Teslimat Adımları */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">Hizmet Teslimat Aşamaları</span>
                  <div className="space-y-1.5">
                    {vendor.milestones.map((m: any) => (
                      <div key={m.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                        <span className={m.done ? 'line-through text-zinc-400' : 'text-zinc-700 dark:text-zinc-300 font-medium'}>
                          {m.title}
                        </span>
                        {m.done ? (
                          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1"><Check className="w-3 h-3" /> Tamamlandı</span>
                        ) : (
                          <span className="text-[10px] text-amber-600 font-medium">Bekliyor</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-zinc-400 block text-[10px]">Toplam Anlaşma</span>
                    <span className="font-extrabold text-zinc-900 dark:text-white">{vendor.totalAmount.toLocaleString('tr-TR')} ₺</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedVendorForReview(vendor);
                      setIsReviewModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-rose-50 text-zinc-700 hover:text-rose-600 text-xs font-bold transition-all cursor-pointer"
                  >
                    Değerlendir & Yorum Yaz
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* SEKME 2: FAVORİLER & TEKLİFLER */}
      {activeTab === 'FAVORITES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteVendors.length === 0 ? (
            <div className="col-span-2 p-12 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-400 text-xs">
              Henüz favorilere eklenmiş bir firma bulunmuyor.
            </div>
          ) : (
            favoriteVendors.map((vendor) => (
              <div key={vendor.id} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-bold">
                      {vendor.category}
                    </span>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-2">{vendor.name}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold">
                    Teklif Değerlendirmede
                  </span>
                </div>

                <p className="text-xs text-zinc-500">
                  Bu firma ile iletişim devam ediyor. Anlaşma sağlandığında &quot;Anlaşmayı Onayla&quot; butonuna basarak bütçenize aktarabilirsiniz.
                </p>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">Tahmini: {vendor.totalAmount.toLocaleString('tr-TR')} ₺</span>
                  <button
                    onClick={() => {
                      setVendorName(vendor.name);
                      setCategory(vendor.category);
                      setTotalAmount(vendor.totalAmount.toString());
                      setIsNewAgreementModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-all cursor-pointer"
                  >
                    Anlaşmayı Onayla & Bütçeye Ekle
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* SEKME 3: SÖZLEŞMELERİM */}
      {activeTab === 'CONTRACTS' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  <th className="p-4">Firma Adı</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Anlaşma Tutarı</th>
                  <th className="p-4">Sözleşme Durumu</th>
                  <th className="p-4 text-right">Sözleşme Dosyası</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                {bookedVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-rose-50/30 transition-colors">
                    <td className="p-4 font-bold text-zinc-900 dark:text-white">{vendor.name}</td>
                    <td className="p-4 text-zinc-500">{vendor.category}</td>
                    <td className="p-4 font-bold text-zinc-800 dark:text-zinc-200">{vendor.totalAmount.toLocaleString('tr-TR')} ₺</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Onaylandı & Yürürlükte
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <a
                        href={vendor.contractUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-rose-50 text-zinc-700 hover:text-rose-600 font-bold inline-flex items-center gap-1 transition-all"
                      >
                        <FileText className="w-3.5 h-3.5" /> Sözleşmeyi Gör
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SEKME 4: ÖDEME & TAKSİT TAKİBİ */}
      {activeTab === 'PAYMENTS' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  <th className="p-4">Firma Adı</th>
                  <th className="p-4">Toplam Tutar</th>
                  <th className="p-4">Ödenen (Kapora/Taksit)</th>
                  <th className="p-4">Kalan Bakiye</th>
                  <th className="p-4 text-right">Ödeme Ekle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                {bookedVendors.map((vendor) => {
                  const remaining = vendor.totalAmount - vendor.paidAmount;

                  return (
                    <tr key={vendor.id} className="hover:bg-rose-50/30 transition-colors">
                      <td className="p-4 font-bold text-zinc-900 dark:text-white">{vendor.name}</td>
                      <td className="p-4 font-semibold text-zinc-800 dark:text-zinc-200">{vendor.totalAmount.toLocaleString('tr-TR')} ₺</td>
                      <td className="p-4 font-bold text-emerald-600">{vendor.paidAmount.toLocaleString('tr-TR')} ₺</td>
                      <td className="p-4 font-bold text-rose-600">{remaining.toLocaleString('tr-TR')} ₺</td>
                      <td className="p-4 text-right">
                        {remaining > 0 ? (
                          <button
                            onClick={() => {
                              setSelectedVendorForPayment(vendor);
                              setIsPaymentModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-all cursor-pointer"
                          >
                            Ödeme / Taksit Ekle
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-emerald-600 flex items-center justify-end gap-1">
                            <Check className="w-4 h-4" /> Tamamı Ödendi
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SEKME 5: DEĞERLENDİRME & WEDYPLAN GERİ BİLDİRİMİ */}
      {activeTab === 'REVIEWS' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white shadow-md space-y-3">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" /> WedyPlan Müşteri Güvencesi
            </div>
            <h3 className="text-sm font-bold">Firmalarla İlgili Memnuniyet Veya Şikayet Bildirimi</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Anlaştığınız veya görüşme yaptığınız firmalar hakkında olumlu/olumsuz deneyimlerinizi WedyPlan ekibine gizlilikle iletebilirsiniz. Kalite standartlarımızı korumak için geri bildirimleriniz doğrudan değerlendirmeye alınır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookedVendors.map((vendor) => (
              <div key={vendor.id} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{vendor.name}</h4>
                  <span className="text-[10px] text-zinc-400">{vendor.category}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedVendorForReview(vendor);
                    setIsReviewModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 transition-all cursor-pointer"
                >
                  Değerlendir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. YENİ ANLAŞMA MODALI */}
      {isNewAgreementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-rose-500" /> Yeni Firma Anlaşması Ekle
              </h2>
              <button
                onClick={() => setIsNewAgreementModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAgreement} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Firma Adı</label>
                <input
                  type="text"
                  placeholder="örn. Studio Masal Fotoğrafçılık"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Hizmet Kategorisi</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Anlaşma Tutarı (₺)</label>
                  <input
                    type="number"
                    placeholder="35000"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Ödenen Kapora (₺)</label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                ⓘ Bu anlaşma kaydedildiğinde Bütçe Planlayıcınıza otomatik harcama kalemi olarak işlenecektir.
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsNewAgreementModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition-all cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isPending ? 'Kaydediliyor...' : 'Anlaşmayı Onayla'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* 5. ÖDEME EKLEME MODALI */}
      {isPaymentModalOpen && selectedVendorForPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                Ödeme Ekle: {selectedVendorForPayment.name}
              </h2>
              <button onClick={() => setIsPaymentModalOpen(false)} className="p-1 rounded-xl text-zinc-400 hover:text-zinc-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPayment} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Ek Ödeme Tutarı (₺)</label>
                <input
                  type="number"
                  placeholder="5000"
                  value={additionalPayment}
                  onChange={(e) => setAdditionalPayment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold cursor-pointer">İptal</button>
                <button type="submit" disabled={isPending} className="px-6 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold cursor-pointer">Ödemeyi İşle</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. DEĞERLENDİRME VE GERİ BİLDİRİM MODALI */}
      {isReviewModalOpen && selectedVendorForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                Firma Değerlendirmesi: {selectedVendorForReview.name}
              </h2>
              <button onClick={() => setIsReviewModalOpen(false)} className="p-1 rounded-xl text-zinc-400 hover:text-zinc-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Puanınız (1-5 Yıldız)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-2 rounded-xl border ${rating >= star ? 'bg-amber-100 text-amber-600 border-amber-300' : 'bg-zinc-50 text-zinc-400'}`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Firma Hakkında Kamuoyuna Görünecek Yorumunuz</label>
                <textarea
                  rows={3}
                  placeholder="Hizmet kalitesi, zamanlama ve iletişim hakkında düşünceleriniz..."
                  value={reviewComment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">WedyPlan Ekibine Özel Gizli Geri Bildirim (Opsiyonel)</label>
                <textarea
                  rows={2}
                  placeholder="Sadece WedyPlan ekibinin göreceği özel geri bildirim veya şikayetiniz..."
                  value={platformFeedback}
                  onChange={(e) => setPlatformFeedback(e.target.value)}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button type="button" onClick={() => setIsReviewModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold cursor-pointer">İptal</button>
                <button type="submit" disabled={isPending} className="px-6 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold cursor-pointer">Gönder</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}