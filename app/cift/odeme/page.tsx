'use client';

import React, { useEffect, useState, useMemo, useTransition } from 'react';
import { getPaymentSchedules, processPaymentAction, createInAppPurchase } from '@/lib/actions/payments';
import {
  CreditCard,
  Calendar,
  Wallet,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Sparkles,
  ShieldCheck,
  Receipt,
  Plus,
  Lock,
  ChevronRight,
  X,
  ShoppingBag
} from 'lucide-react';

export default function PaymentPlanPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'VENDORS' | 'IN_APP' | 'HISTORY'>('UPCOMING');
  
  // Modallar
  const [selectedPaymentForPay, setSelectedPaymentForPay] = useState<any>(null);
  const [payAmountInput, setPayAmountInput] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const res = await getPaymentSchedules();
    if (res.success && res.data) setPayments(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Finansal İstatistikler
  const totalAgreed = useMemo(() => payments.reduce((acc, curr) => acc + curr.amount, 0), [payments]);
  const totalPaid = useMemo(() => payments.reduce((acc, curr) => acc + curr.paidAmount, 0), [payments]);
  const totalRemaining = totalAgreed - totalPaid;

  const upcomingPayments = useMemo(() => payments.filter((p) => p.status !== 'PAID'), [payments]);
  const historyPayments = useMemo(() => payments.filter((p) => p.paidAmount > 0), [payments]);

  // Ödeme Yapma İşlemi
  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaymentForPay || !payAmountInput) return;

    startTransition(async () => {
      const res = await processPaymentAction(selectedPaymentForPay.id, parseFloat(payAmountInput), true);
      if (res.success && res.data) {
        setPayments(res.data);
        setSelectedPaymentForPay(null);
        setPayAmountInput('');
        setCardNumber('');
        showToast(res.message || 'Ödeme tamamlandı.');
      }
    });
  };

  // Uygulama İçi Hizmet Satın Alımı
  const handleBuyAddon = (title: string, category: string, amount: number) => {
    startTransition(async () => {
      const res = await createInAppPurchase(title, category, amount);
      if (res.success && res.data) {
        setPayments(res.data);
        setIsStoreModalOpen(false);
        showToast(`${title} başarıyla aktifleştirildi.`);
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-zinc-500">Ödeme Portalı Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 pb-20">
      
      {/* TOAST BİLDİRİMİ */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER & HIZLI AKSİYONLAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
            <CreditCard className="w-7 h-7 text-rose-500" /> Ödeme Planı & Takvimi
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Tedarikçi taksitlerinizi ve WedyPlan uygulama içi satın alımlarınızı tek merkezden takip edin.
          </p>
        </div>

        <button
          onClick={() => setIsStoreModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-rose-400" /> Premium WedyPlan Hizmetleri
        </button>
      </div>

      {/* 1. ÖZET FİNANSAL METRİK KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Toplam Taahhüt Edilen</span>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">{totalAgreed.toLocaleString('tr-TR')} ₺</div>
          <div className="text-[11px] text-zinc-500">Tüm Tedarikçiler & Servisler</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ödenen Toplam Bakiye</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{totalPaid.toLocaleString('tr-TR')} ₺</div>
          <div className="text-[11px] text-emerald-600 font-medium">Bütçe Planlayıcı ile Senkronize</div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white shadow-md space-y-1 relative overflow-hidden">
          <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Gelecek Vadedeki Ödemeler
          </span>
          <div className="text-2xl font-black text-zinc-100">{totalRemaining.toLocaleString('tr-TR')} ₺</div>
          <p className="text-[11px] text-zinc-400">{upcomingPayments.length} Taksit / Vade Bekliyor</p>
        </div>
      </div>

      {/* 2. WedyAI NAKİT AKIŞI TAVSİYESİ */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-zinc-900 to-zinc-900 border border-rose-900/30 text-white flex items-start gap-4 shadow-sm">
        <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-rose-300">WedyAI Nakit Akış Danışmanı</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Yaklaşan 30 gün içinde toplam <strong>140.000 ₺</strong> ödeme vadeniz bulunmaktadır. Mekan ödemesinin 2. taksitini erkenden kapatmanız durumunda tedarikçinizden %5 erken ödeme kaporası indirimi talep edebilirsiniz.
          </p>
        </div>
      </div>

      {/* 3. SUB-MENU ALT NAVİGASYON SEKMELERİ */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto pb-3 scrollbar-none">
        {[
          { id: 'UPCOMING', label: 'Yaklaşan Vadeler', icon: Clock, count: upcomingPayments.length },
          { id: 'VENDORS', label: 'Tedarikçi Taksitleri', icon: Building2 },
          { id: 'IN_APP', label: 'WedyPlan Hizmetleri', icon: ShoppingBag },
          { id: 'HISTORY', label: 'Ödeme Geçmişi & Dekontlar', icon: Receipt },
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

      {/* 4. TAB İÇERİKLERİ */}

      {/* TAB 1: YAKLAŞAN VADELER */}
      {activeTab === 'UPCOMING' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  <th className="p-4">Ödeme Başlığı</th>
                  <th className="p-4">Alıcı / Tedarikçi</th>
                  <th className="p-4">Son Ödeme Tarihi</th>
                  <th className="p-4">Tutar</th>
                  <th className="p-4">Ödenen</th>
                  <th className="p-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                {upcomingPayments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-zinc-400 text-xs">
                      Harika! Tüm vadeli ödemeleriniz tamamlanmıştır.
                    </td>
                  </tr>
                ) : (
                  upcomingPayments.map((p) => {
                    const remaining = p.amount - p.paidAmount;

                    return (
                      <tr key={p.id} className="hover:bg-rose-50/30 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-zinc-900 dark:text-white">{p.title}</div>
                          <span className="text-[10px] text-zinc-400">{p.installmentInfo}</span>
                        </td>
                        <td className="p-4 text-zinc-600 dark:text-zinc-300 font-medium">{p.recipient}</td>
                        <td className="p-4 font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mt-2">
                          <Calendar className="w-3.5 h-3.5" /> {p.dueDate}
                        </td>
                        <td className="p-4 font-extrabold text-zinc-900 dark:text-white">{p.amount.toLocaleString('tr-TR')} ₺</td>
                        <td className="p-4 font-bold text-emerald-600">{p.paidAmount.toLocaleString('tr-TR')} ₺</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedPaymentForPay(p);
                              setPayAmountInput(remaining.toString());
                            }}
                            className="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                          >
                            <CreditCard className="w-3.5 h-3.5" /> Ödeme Yap
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
      )}

      {/* TAB 2: TEDARİKÇİ TAKSİTLERİ */}
      {activeTab === 'VENDORS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {payments.filter(p => p.type === 'VENDOR').map(p => (
            <div key={p.id} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-bold">
                    {p.category}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-1">{p.title}</h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  p.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {p.status === 'PAID' ? 'Ödendi' : 'Vade Bekliyor'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Tedarikçi: <strong>{p.recipient}</strong></span>
                <span className="font-extrabold text-zinc-900 dark:text-white">{p.amount.toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: WEDYPLAN SERVİSLERİ */}
      {activeTab === 'IN_APP' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {payments.filter(p => p.type === 'IN_APP_SERVICE').map(p => (
            <div key={p.id} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-600 text-[10px] font-bold">
                    WedyPlan Eklentisi
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-1">{p.title}</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                  Aktif Lisans
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Tutar: <strong>{p.amount.toLocaleString('tr-TR')} ₺</strong></span>
                <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Kullanımda</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: ÖDEME GEÇMİŞİ & DEKONTLAR */}
      {activeTab === 'HISTORY' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-rose-500" /> Tamamlanan Ödemeler Defteri
            </h3>
            <span className="text-[11px] text-zinc-400">{historyPayments.length} Kayıt</span>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {historyPayments.map((p) => (
              <div key={p.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white">{p.title}</h4>
                  <span className="text-[10px] text-zinc-400">{p.recipient} • {p.dueDate}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-extrabold text-emerald-600">+{p.paidAmount.toLocaleString('tr-TR')} ₺</span>
                  <button className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer">
                    Dekont İndir (PDF)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. ÖDEME YAPMA MODALI */}
      {selectedPaymentForPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Güvenli Ödeme Ekranı</h3>
                <span className="text-[10px] text-zinc-400">{selectedPaymentForPay.title}</span>
              </div>
              <button onClick={() => setSelectedPaymentForPay(null)} className="p-1 rounded-xl text-zinc-400 hover:text-zinc-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProcessPayment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Ödenecek Tutar (₺)</label>
                <input
                  type="number"
                  value={payAmountInput}
                  onChange={(e) => setPayAmountInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" /> Kart Bilgileri (256-bit SSL Koruma)
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs font-mono focus:outline-none focus:border-rose-500"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="AA/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs font-mono focus:outline-none focus:border-rose-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 text-xs font-mono focus:outline-none focus:border-rose-500"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button type="button" onClick={() => setSelectedPaymentForPay(null)} className="px-4 py-2 rounded-xl border text-xs font-semibold cursor-pointer">İptal</button>
                <button type="submit" disabled={isPending} className="px-6 py-2.5 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-all cursor-pointer">
                  {isPending ? 'İşleniyor...' : 'Ödemeyi Tamamla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. UYGULAMA İÇİ MAĞAZA MODALI */}
      {isStoreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-rose-500" /> Premium WedyPlan Servisleri
              </h3>
              <button onClick={() => setIsStoreModalOpen(false)} className="p-1 rounded-xl text-zinc-400 hover:text-zinc-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Özel Düğün Domaini (.com)', category: 'Dijital Hizmetler', price: 450, desc: 'Davetiyeniz için özel isim hakkı ve SSL korumalı hosting.' },
                { title: 'WedyAI Pro & LCV SMS 500 Paketi', category: 'Uygulama İçi Eklenti', price: 1250, desc: 'Tüm davetlilerinize tek tıkla otomatik LCV SMS hatırlatması.' },
                { title: 'Düğün Günü VIP Koordinatörü Destek', category: 'Danışmanlık', price: 3500, desc: 'Düğün günü tüm akışı canlı yöneten uzman ekibimiz.' },
              ].map((addon, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{addon.title}</h4>
                    <p className="text-[11px] text-zinc-500">{addon.desc}</p>
                    <span className="text-[10px] font-extrabold text-rose-500">{addon.price} ₺</span>
                  </div>
                  <button
                    onClick={() => handleBuyAddon(addon.title, addon.category, addon.price)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-all shrink-0 cursor-pointer"
                  >
                    Satın Al
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}