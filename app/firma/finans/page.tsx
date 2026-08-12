'use client';

import React, { useState, useMemo, useTransition } from 'react';
import { useConfirm } from '@/context/ConfirmContext';
import {
  createPaymentLinkAction,
  releaseEscrowPayoutAction,
  generateGibInvoiceAction
} from '../../../lib/actions/vendor-finance-sync';
import {
  Wallet,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  DollarSign,
  Send,
  ShieldCheck,
  Receipt,
  Link as LinkIcon,
  Copy,
  Percent,
  RefreshCw,
  Calendar,
  Eye,
  Download,
  Plus,
  X,
  AlertCircle,
  LayoutDashboard,
  Check,
  Smartphone,
  ArrowUpRight
} from 'lucide-react';

interface PaymentLinkItem {
  id: string;
  coupleNames: string;
  description: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'EXPIRED';
  dueDate: string;
  paymentUrl: string;
}

interface EscrowItem {
  id: string;
  coupleNames: string;
  weddingDate: string;
  description: string;
  amount: number;
  status: 'HELD' | 'RELEASED';
  releaseEligible: boolean;
}

interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  coupleNames: string;
  subtotal: number;
  kdvAmount: number;
  totalAmount: number;
  date: string;
  status: 'ISSUED' | 'DRAFT';
}

export default function VendorFinancePage() {
  const confirm = useConfirm();
  const [isPending, startTransition] = useTransition();

  // 4 ANA ALT MENÜ SEKMESİ
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'PAYMENTS' | 'ESCROW' | 'INVOICES'>('DASHBOARD');

  // Grafikler İçin Dönemsel Filtre (Günlük / Haftalık / Aylık / Yıllık)
  const [timeframe, setTimeframe] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'>('MONTHLY');

  // Canlı Ödeme Linkleri Verisi
  const [paymentLinks, setPaymentLinks] = useState<PaymentLinkItem[]>([
    {
      id: 'pay_1',
      coupleNames: 'Selin & Caner',
      description: 'Düğün Salonu Kapora Ödemesi',
      amount: 45000,
      status: 'PAID',
      dueDate: '15 Mart 2026',
      paymentUrl: 'https://pay.wedyplan.com/iyzico/pay_884129'
    },
    {
      id: 'pay_2',
      coupleNames: 'Gizem & Burak',
      description: 'Açık Hava Kokteyl Ara Taksit',
      amount: 35000,
      status: 'PENDING',
      dueDate: '20 Ağustos 2026',
      paymentUrl: 'https://pay.wedyplan.com/iyzico/pay_993210'
    }
  ]);

  // Güvenli Havuz (Escrow) Hakediş Verisi
  const [escrowItems, setEscrowItems] = useState<EscrowItem[]>([
    {
      id: 'esc_1',
      coupleNames: 'Selin & Caner',
      weddingDate: '15 Ağustos 2026',
      description: 'Düğün Günü Öncesi Ana Kapora',
      amount: 45000,
      status: 'HELD',
      releaseEligible: true // Etkinlik tarihi yaklaştı veya tamamlandı
    },
    {
      id: 'esc_2',
      coupleNames: 'Merve & Kaan',
      weddingDate: '22 Ağustos 2026',
      description: 'Yemek Tadım & Prova Ücreti',
      amount: 15000,
      status: 'HELD',
      releaseEligible: false
    }
  ]);

  // GİB E-Fatura Verisi
  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    {
      id: 'inv_1',
      invoiceNumber: 'WPN2026491823',
      coupleNames: 'Selin & Caner',
      subtotal: 37500,
      kdvAmount: 7500,
      totalAmount: 45000,
      date: '15 Mart 2026',
      status: 'ISSUED'
    }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State'leri
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // İyzico Link Form State'leri
  const [coupleNameInput, setCoupleNameInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [descInput, setDescInput] = useState('');

  // GİB Fatura Form State'leri
  const [invCoupleName, setInvCoupleName] = useState('');
  const [invTaxNo, setInvTaxNo] = useState('');
  const [invSubtotalStr, setInvSubtotalStr] = useState('');
  const [invKdvRate, setInvKdvRate] = useState(20);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrik Hesaplamaları
  const totalVolume = useMemo(() => paymentLinks.reduce((sum, p) => sum + p.amount, 0), [paymentLinks]);
  const collectedRevenue = useMemo(() => paymentLinks.filter(p => p.status === 'PAID').reduce((sum, p) => sum + p.amount, 0), [paymentLinks]);
  const escrowTotal = useMemo(() => escrowItems.filter(e => e.status === 'HELD').reduce((sum, e) => sum + e.amount, 0), [escrowItems]);
  const pendingCollection = useMemo(() => paymentLinks.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0), [paymentLinks]);

  // 🍏 İYZİCO ÖDEME LİNKİ OLUŞTURMA (SERVER ACTION)
  const handleCreatePaymentLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleNameInput || !amountInput) return;

    startTransition(async () => {
      const amt = parseFloat(amountInput);
      const res = await createPaymentLinkAction({
        coupleNames: coupleNameInput,
        amount: amt,
        description: descInput || 'Düğün Hizmeti Ödeme Linki'
      });

      if (res.success) {
        setPaymentLinks(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            coupleNames: coupleNameInput,
            description: descInput || 'Düğün Hizmeti Ödeme Linki',
            amount: amt,
            status: 'PENDING',
            dueDate: 'Bugün',
            paymentUrl: res.paymentUrl || '#'
          }
        ]);
        setIsLinkModalOpen(false);
        setCoupleNameInput('');
        setAmountInput('');
        setDescInput('');
        showToast(res.message);
      }
    });
  };

  // 🍏 ESCROW HAKEDİŞ ÇEKME (SERVER ACTION + APPLE MODAL)
  const handleReleaseEscrow = async (item: EscrowItem) => {
    // 📍 Satır: 198 - variant 'info' olarak ayarlandı
    const isConfirmed = await confirm({
      title: 'Hakediş Hesabınıza Aktarılsın Mı?',
      message: `"${item.coupleNames}" düğününe ait ₺${item.amount.toLocaleString('tr-TR')} tutarındaki hakediş firmanızın IBAN hesabına aktarılacaktır.`,
      confirmText: 'Evet, Hesaba Aktar',
      cancelText: 'Vazgeç',
      variant: 'info'
    });

    if (isConfirmed) {
      startTransition(async () => {
        const res = await releaseEscrowPayoutAction(item.id, item.coupleNames, item.amount);
        if (res.success) {
          setEscrowItems(prev => prev.map(e => (e.id === item.id ? { ...e, status: 'RELEASED' } : e)));
          showToast(res.message);
        }
      });
    }
  };

  // 🍏 GİB E-FATURA KESME (SERVER ACTION)
  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invCoupleName || !invSubtotalStr) return;

    startTransition(async () => {
      const subtotal = parseFloat(invSubtotalStr);
      const kdvAmount = (subtotal * invKdvRate) / 100;
      const totalAmount = subtotal + kdvAmount;

      const res = await generateGibInvoiceAction({
        coupleNames: invCoupleName,
        taxNumberOrTckn: invTaxNo || '12345678901',
        subtotal,
        kdvRate: invKdvRate,
        kdvAmount,
        totalAmount,
        description: 'Düğün Organizasyon Hizmet Bedeli'
      });

      if (res.success) {
        setInvoices(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            invoiceNumber: res.invoiceNumber || 'WPN2026111',
            coupleNames: invCoupleName,
            subtotal,
            kdvAmount,
            totalAmount,
            date: 'Bugün',
            status: 'ISSUED'
          }
        ]);
        setIsInvoiceModalOpen(false);
        setInvCoupleName('');
        setInvSubtotalStr('');
        showToast(res.message);
      }
    });
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased">
      
      {/* TOAST BİLDİRİMİ */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER (Frosted Glass) */}
      <div className="p-8 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <Wallet className="w-3.5 h-3.5 text-zinc-500" />
            <span>Finansal Yönetim & Muhasebe</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Finans & Muhasebe
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            İyzico sanal POS ödeme linkleri oluşturun, hakediş kaporalarınızı çekin ve GİB E-Faturası kesin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLinkModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center gap-2 shadow-xs"
          >
            <CreditCard className="w-4 h-4" /> İyzico Ödeme Linki Oluştur
          </button>
          <button
            onClick={() => setIsInvoiceModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-semibold hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-700"
          >
            <Receipt className="w-4 h-4" /> GİB E-Fatura Kes
          </button>
        </div>
      </div>

      {/* 4 ANA ALT MENÜ SEKMESİ */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-200/60 dark:border-zinc-800">
        {[
          { id: 'DASHBOARD', label: '📊 Finansal Analitik', icon: LayoutDashboard },
          { id: 'PAYMENTS', label: '💳 İyzico Tahsilatlar', icon: CreditCard, badge: paymentLinks.length },
          { id: 'ESCROW', label: '🛡️ Güvenli Havuz (Escrow)', icon: ShieldCheck, badge: escrowItems.filter(e => e.status === 'HELD').length },
          { id: 'INVOICES', label: '🧾 GİB E-Fatura & Arşiv', icon: Receipt, badge: invoices.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                  : 'bg-white/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${isActive ? 'bg-white/20 text-white dark:bg-black/20 dark:text-zinc-900' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ------------------ SEKME 1: FİNANSAL ANALİTİK DASHBOARD ------------------ */}
      {activeTab === 'DASHBOARD' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* FİLTRE BUTONLARI (Günlük / Haftalık / Aylık / Yıllık) */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Performans ve Nakit Akış Analitiği
            </h2>
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60">
              {[
                { id: 'DAILY', label: 'Günlük' },
                { id: 'WEEKLY', label: 'Haftalık' },
                { id: 'MONTHLY', label: 'Aylık' },
                { id: 'YEARLY', label: 'Yıllık' },
              ].map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => setTimeframe(tf.id as any)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    timeframe === tf.id
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* KPI KARTLARI */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <div className="p-6 rounded-3xl apple-glass shadow-xs space-y-1">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Hesaba Geçen Ciro
              </span>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">₺{collectedRevenue.toLocaleString('tr-TR')}</div>
              <div className="text-[10px] text-zinc-400">İyzico Tahsil Edilen</div>
            </div>

            <div className="p-6 rounded-3xl apple-glass shadow-xs space-y-1">
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Havuzda Bekleyen (Escrow)
              </span>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">₺{escrowTotal.toLocaleString('tr-TR')}</div>
              <div className="text-[10px] text-zinc-400">Düğün Günü Serbest Kalacak</div>
            </div>

            <div className="p-6 rounded-3xl apple-glass shadow-xs space-y-1">
              <span className="text-xs font-medium text-zinc-400">Bekleyen Tahsilatlar</span>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">₺{pendingCollection.toLocaleString('tr-TR')}</div>
              <div className="text-[10px] text-zinc-400">Gelecek Taksitler</div>
            </div>

            <div className="p-6 rounded-3xl apple-glass shadow-xs space-y-1">
              <span className="text-xs font-medium text-zinc-400">Toplam Hacim</span>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">₺{totalVolume.toLocaleString('tr-TR')}</div>
              <div className="text-[10px] text-zinc-400">Tüm Anlaşmalar</div>
            </div>
          </div>

          {/* GÖRSEL FİNANSAL BAR GRAFİĞİ (SIMULATION) */}
          <div className="p-6 sm:p-8 apple-glass rounded-[28px] space-y-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Gelir & Tahsilat Çizelgesi ({timeframe})</h3>
                <p className="text-xs text-zinc-400">Aylara göre tahsil edilen kaporalar ve hakediş dağılımı</p>
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                + %24 Büyüme
              </span>
            </div>

            {/* Apple Style Bar Chart Grid */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-zinc-200/60 dark:border-zinc-800 pb-2">
              {[
                { label: 'May', height: '40%', amount: '₺40K' },
                { label: 'Haz', height: '65%', amount: '₺65K' },
                { label: 'Tem', height: '85%', amount: '₺85K' },
                { label: 'Ağu', height: '100%', amount: '₺120K' },
                { label: 'Eyl', height: '70%', amount: '₺70K' },
                { label: 'Eki', height: '50%', amount: '₺50K' },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">{bar.amount}</span>
                  <div
                    className="w-full max-w-[48px] bg-zinc-900 dark:bg-white rounded-2xl group-hover:bg-emerald-500 transition-all duration-300"
                    style={{ height: bar.height }}
                  />
                  <span className="text-[11px] font-bold text-zinc-500">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ------------------ SEKME 2: İYZİCO TAHSİLATLAR & ÖDEME LİNKLERİ ------------------ */}
      {activeTab === 'PAYMENTS' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="apple-glass rounded-[28px] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    <th className="p-4">Çift Adı</th>
                    <th className="p-4">Açıklama</th>
                    <th className="p-4">Tutar</th>
                    <th className="p-4">Son Ödeme Tarihi</th>
                    <th className="p-4">Durum</th>
                    <th className="p-4 text-right">Ödeme Linki</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-xs">
                  {paymentLinks.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4 font-bold text-zinc-900 dark:text-white">{p.coupleNames}</td>
                      <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">{p.description}</td>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white">₺{p.amount.toLocaleString('tr-TR')}</td>
                      <td className="p-4 text-zinc-500">{p.dueDate}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}>
                          {p.status === 'PAID' ? 'Ödendi & Hesaba Geçti' : 'Çift Ödemesi Bekleniyor'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(p.paymentUrl);
                            showToast('İyzico ödeme linki panoya kopyalandı.');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold inline-flex items-center gap-1 hover:bg-zinc-200 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" /> Linki Kopyala
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------ SEKME 3: GÜVENLİ HAVUZ (ESCROW) & HAKEDİŞLER ------------------ */}
      {activeTab === 'ESCROW' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Güvenli Havuz (Escrow), çiftlerin ödediği kaporaları etkinlik tarihine kadar korur. Düğün gerçekleştiğinde veya onay verildiğinde hakedişinizi doğrudan banka hesabınıza aktarabilirsiniz.</span>
          </div>

          <div className="apple-glass rounded-[28px] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    <th className="p-4">Çift Adı & Düğün Tarihi</th>
                    <th className="p-4">Hakediş Açıklaması</th>
                    <th className="p-4">Tutar</th>
                    <th className="p-4">Havuz Durumu</th>
                    <th className="p-4 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-xs">
                  {escrowItems.map((e) => (
                    <tr key={e.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4 font-bold text-zinc-900 dark:text-white">
                        <div>{e.coupleNames}</div>
                        <span className="text-[10px] text-zinc-400 font-normal">{e.weddingDate}</span>
                      </td>
                      <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">{e.description}</td>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white">₺{e.amount.toLocaleString('tr-TR')}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          e.status === 'RELEASED' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                        }`}>
                          {e.status === 'RELEASED' ? 'Hesaba Aktarıldı' : 'Güvenli Havuzda Bekliyor'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {e.status === 'HELD' && (
                          <button
                            onClick={() => handleReleaseEscrow(e)}
                            disabled={isPending}
                            className="px-3.5 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-black transition-all cursor-pointer"
                          >
                            Hakedişi Çek
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------ SEKME 4: GİB E-FATURA & ARŞİV ------------------ */}
      {activeTab === 'INVOICES' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="apple-glass rounded-[28px] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    <th className="p-4">Fatura No</th>
                    <th className="p-4">Çift Adı</th>
                    <th className="p-4">Matrah (KDV Hariç)</th>
                    <th className="p-4">KDV (%20)</th>
                    <th className="p-4">Toplam Fatura</th>
                    <th className="p-4 text-right">E-Fatura PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-xs">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4 font-mono font-bold text-zinc-900 dark:text-white">{inv.invoiceNumber}</td>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white">{inv.coupleNames}</td>
                      <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">₺{inv.subtotal.toLocaleString('tr-TR')}</td>
                      <td className="p-4 font-medium text-zinc-500">₺{inv.kdvAmount.toLocaleString('tr-TR')}</td>
                      <td className="p-4 font-bold text-zinc-900 dark:text-white">₺{inv.totalAmount.toLocaleString('tr-TR')}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => showToast('GİB onaylı E-Fatura PDF indiriliyor...')}
                          className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold inline-flex items-center gap-1 hover:bg-zinc-200 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> PDF İndir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* İYZİCO İLE ÖDEME LİNKİ OLUŞTURMA MODALI */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-zinc-500" /> İyzico Sanal POS Linki Üret
              </h2>
              <button onClick={() => setIsLinkModalOpen(false)} className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePaymentLink} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Çift İsimleri</label>
                <input
                  type="text"
                  placeholder="Selin & Caner"
                  value={coupleNameInput}
                  onChange={(e) => setCoupleNameInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Tahsil Edilecek Tutar (₺)</label>
                <input
                  type="number"
                  placeholder="45000"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Ödeme Açıklaması</label>
                <input
                  type="text"
                  placeholder="Düğün Salonu Kapora Bedeli"
                  value={descInput}
                  onChange={(e) => setDescInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button type="button" onClick={() => setIsLinkModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold">İptal</button>
                <button type="submit" disabled={isPending} className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold">Link Üret & Çifte Gönder</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GİB E-FATURA KESME MODALI */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-zinc-500" /> GİB E-Fatura / E-Arşiv Düzenle
              </h2>
              <button onClick={() => setIsInvoiceModalOpen(false)} className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleGenerateInvoice} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Müşteri / Çift Adı</label>
                <input
                  type="text"
                  placeholder="Selin & Caner"
                  value={invCoupleName}
                  onChange={(e) => setInvCoupleName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Vergi / TCKN No</label>
                <input
                  type="text"
                  placeholder="12345678901"
                  value={invTaxNo}
                  onChange={(e) => setInvTaxNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Matrah (KDV Hariç ₺)</label>
                  <input
                    type="number"
                    placeholder="37500"
                    value={invSubtotalStr}
                    onChange={(e) => setInvSubtotalStr(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">KDV Oranı (%)</label>
                  <select
                    value={invKdvRate}
                    onChange={(e) => setInvKdvRate(parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium"
                  >
                    <option value={20}>%20 (Standart Hizmet)</option>
                    <option value={10}>%10 (İndirimli Oran)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button type="button" onClick={() => setIsInvoiceModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold">İptal</button>
                <button type="submit" disabled={isPending} className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold">Faturayı GİB'e Gönder</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}