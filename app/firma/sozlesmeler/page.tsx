'use client';

import React, { useState, useMemo, useTransition } from 'react';
import { useConfirm } from '@/context/ConfirmContext';
import {
  createVendorContractAction,
  signVendorContractAction,
  saveOptionSettingsAction,
  archiveVendorContractAction
} from '../../../lib/actions/vendor-contract-sync';
import {
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Search,
  Sparkles,
  X,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Send,
  Sliders,
  Archive,
  Copy,
  LayoutDashboard,
  Bell,
  Check,
  Smartphone,
  Info
} from 'lucide-react';

interface ContractItem {
  id: string;
  coupleNames: string;
  title: string;
  totalAmount: number;
  depositAmount: number;
  status: 'SIGNED' | 'WAITING_SIGN' | 'OPTION_EXPIRING' | 'DRAFT';
  weddingDate: string;
  optionHoursRemaining?: number;
  contractUrl?: string;
  isArchived?: boolean;
}

interface TemplateItem {
  id: string;
  name: string;
  category: string;
  content: string;
}

export default function VendorContractsPage() {
  const confirm = useConfirm();
  const [isPending, startTransition] = useTransition();

  // 5 ANA ALT MENÜ SEKMESİ
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'PIPELINE' | 'TEMPLATES' | 'OPTION_SETTINGS' | 'ARCHIVE'>('DASHBOARD');

  // Canlı Sözleşme Verileri
  const [contracts, setContracts] = useState<ContractItem[]>([
    {
      id: 'cnt_1',
      coupleNames: 'Selin & Caner',
      title: 'Kır Düğünü Hizmet & Yemek Sözleşmesi',
      totalAmount: 150000,
      depositAmount: 45000,
      status: 'SIGNED',
      weddingDate: '15 Ağustos 2026',
      contractUrl: '#',
      isArchived: false
    },
    {
      id: 'cnt_2',
      coupleNames: 'Gizem & Burak',
      title: 'Açık Hava Kokteyl Sözleşme Taslağı',
      totalAmount: 180000,
      depositAmount: 54000,
      status: 'OPTION_EXPIRING',
      weddingDate: '02 Eylül 2026',
      optionHoursRemaining: 18,
      contractUrl: '#',
      isArchived: false
    },
    {
      id: 'cnt_3',
      coupleNames: 'Eda & Mert',
      title: 'Salon Kiralama & Lüks Süsleme Sözleşmesi',
      totalAmount: 120000,
      depositAmount: 36000,
      status: 'WAITING_SIGN',
      weddingDate: '10 Ekim 2026',
      optionHoursRemaining: 64,
      contractUrl: '#',
      isArchived: false
    }
  ]);

  // Sözleşme Şablon Kütüphanesi
  const [templates, setTemplates] = useState<TemplateItem[]>([
    {
      id: 'tmpl_1',
      name: 'Standart Yemekli Düğün Hizmet Sözleşmesi',
      category: 'Düğün Mekanı',
      content: 'İşbu sözleşme {{cift_adi}} ile {{firma_adi}} arasında {{dugun_tarihi}} tarihinde gerçekleşecek organizasyon için düzenlenmiştir. Toplam tutar: {{toplam_tutar}} TL, Kapora: {{kapora_tutari}} TL.'
    },
    {
      id: 'tmpl_2',
      name: 'Kokteyl & Etkinlik Sözleşmesi',
      category: 'Organizasyon',
      content: '{{cift_adi}} için hazırlanmış kokteyl konseptli düğün sözleşmesi detayları...'
    }
  ]);

  // Opsiyon Süresi & Uyarım Ayarları State'i
  const [optionSettings, setOptionSettings] = useState({
    defaultOptionHours: 48,
    autoRemindWhatsApp: true,
    autoRemindSms: true,
    reminderHoursBeforeExpiry: 12
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State'leri
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [selectedContractForOtp, setSelectedContractForOtp] = useState<ContractItem | null>(null);
  const [otpCode, setOtpCode] = useState('');

  // Form State'leri (Yeni Sözleşme)
  const [coupleNames, setCoupleNames] = useState('');
  const [contractTitle, setContractTitle] = useState('');
  const [totalAmountStr, setTotalAmountStr] = useState('');
  const [depositAmountStr, setDepositAmountStr] = useState('');
  const [weddingDateStr, setWeddingDateStr] = useState('');
  const [customOptionHours, setCustomOptionHours] = useState('48');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Metrik ve Grafik Analitik Hesaplamaları
  const totalVolume = useMemo(() => contracts.reduce((sum, c) => sum + c.totalAmount, 0), [contracts]);
  const totalDeposits = useMemo(() => contracts.filter(c => c.status === 'SIGNED').reduce((sum, c) => sum + c.depositAmount, 0), [contracts]);
  const signedCount = useMemo(() => contracts.filter(c => c.status === 'SIGNED').length, [contracts]);
  const expiringCount = useMemo(() => contracts.filter(c => c.status === 'OPTION_EXPIRING').length, [contracts]);
  const conversionRate = useMemo(() => (contracts.length > 0 ? Math.round((signedCount / contracts.length) * 100) : 0), [contracts, signedCount]);

  // Aktif ve Arşivlenmiş Listeler
  const activeContracts = useMemo(() => contracts.filter(c => !c.isArchived), [contracts]);
  const archivedContracts = useMemo(() => contracts.filter(c => c.isArchived), [contracts]);

  const filteredContracts = useMemo(() => {
    const target = activeTab === 'ARCHIVE' ? archivedContracts : activeContracts;
    return target.filter(c =>
      c.coupleNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, activeContracts, archivedContracts, searchQuery]);

  // 🍏 YENİ SÖZLEŞME OLUŞTURMA (SERVER ACTION)
  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleNames || !contractTitle || !totalAmountStr) return;

    startTransition(async () => {
      const tot = parseFloat(totalAmountStr);
      const dep = depositAmountStr ? parseFloat(depositAmountStr) : tot * 0.3;

      const res = await createVendorContractAction({
        coupleNames,
        title: contractTitle,
        totalAmount: tot,
        depositAmount: dep,
        status: 'WAITING_SIGN',
        weddingDate: weddingDateStr || '15 Ağustos 2026',
        optionHoursRemaining: parseInt(customOptionHours) || optionSettings.defaultOptionHours
      });

      if (res.success) {
        setContracts(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            coupleNames,
            title: contractTitle,
            totalAmount: tot,
            depositAmount: dep,
            status: 'WAITING_SIGN',
            weddingDate: weddingDateStr || '15 Ağustos 2026',
            optionHoursRemaining: parseInt(customOptionHours) || optionSettings.defaultOptionHours,
            isArchived: false
          }
        ]);
        setIsNewModalOpen(false);
        setCoupleNames('');
        setContractTitle('');
        setTotalAmountStr('');
        setDepositAmountStr('');
        showToast(res.message);
      }
    });
  };

  // 🍏 SMS-OTP İLE İMZA SİMÜLASYONU (SERVER ACTION)
  const handleVerifyOtpAndSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContractForOtp || otpCode.length < 4) return;

    startTransition(async () => {
      const res = await signVendorContractAction(selectedContractForOtp.id, selectedContractForOtp.coupleNames);
      if (res.success) {
        setContracts(prev =>
          prev.map(c => (c.id === selectedContractForOtp.id ? { ...c, status: 'SIGNED', optionHoursRemaining: undefined } : c))
        );
        setIsOtpModalOpen(false);
        setOtpCode('');
        showToast(res.message);
      }
    });
  };

  // 🍏 SÖZLEŞME ARŞİVLEME (SERVER ACTION)
  const handleArchiveContract = async (id: string, title: string) => {
    const isConfirmed = await confirm({
      title: 'Sözleşmeyi Arşive Kaldırmak İstediğinize Emin Misiniz?',
      message: `"${title}" tamamlanmış veya pasif sözleşmeler arşivine taşınacaktır.`,
      confirmText: 'Evet, Arşivle',
      cancelText: 'Vazgeç',
      variant: 'info'
    });

    if (isConfirmed) {
      startTransition(async () => {
        const res = await archiveVendorContractAction(id, title);
        if (res.success) {
          setContracts(prev => prev.map(c => (c.id === id ? { ...c, isArchived: true } : c)));
          showToast(res.message);
        }
      });
    }
  };

  // 🍏 OPSİYON AYARLARINI KAYDETME (SERVER ACTION)
  const handleSaveOptionSettings = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveOptionSettingsAction(optionSettings);
      if (res.success) {
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
      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <FileText className="w-3.5 h-3.5 text-zinc-500" />
            <span>Hukuki & Finansal Kontrol Merkezi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Teklif & Sözleşme Yönetimi
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Dijital imza, SMS-OTP doğrulaması, şablon kütüphanesi ve opsiyon sayaçları ile sözleşmelerinizi yönetin.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Yeni Sözleşme / Teklif İlet
        </button>
      </div>

      {/* 5 SEKME ALT MENÜSÜ */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-200/60 dark:border-zinc-800">
        {[
          { id: 'DASHBOARD', label: '📊 Analitik & Dashboard', icon: LayoutDashboard },
          { id: 'PIPELINE', label: '📑 Aktif Sözleşmeler', icon: FileCheck, badge: activeContracts.length },
          { id: 'TEMPLATES', label: '📚 Şablon Kütüphanesi', icon: Copy },
          { id: 'OPTION_SETTINGS', label: '⚙️ Opsiyon & Uyarım Ayarları', icon: Sliders },
          { id: 'ARCHIVE', label: '📦 Arşiv', icon: Archive, badge: archivedContracts.length },
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

      {/* ------------------ SEKME 1: ANALİTİK DASHBOARD ------------------ */}
      {activeTab === 'DASHBOARD' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* UYARI BANNERI (Kritik Opsiyon Süreleri) */}
          {expiringCount > 0 && (
            <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 backdrop-blur-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500 text-white shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">{expiringCount} Adet Sözleşmenin Opsiyon Süresi Dolmak Üzere!</h4>
                  <p className="text-[11px] opacity-80 mt-0.5">Gizem & Burak çiftinin opsiyon süresine 18 saat kaldı. Çifte otomatik WhatsApp hatırlatması gönderilebilir.</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('PIPELINE')}
                className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-all shrink-0 cursor-pointer"
              >
                İncele & İletişime Geç
              </button>
            </div>
          )}

          {/* 3 TEMEL VERİSEL KPI KARTI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-2">
              <span className="text-xs font-medium text-zinc-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Teklif - Sözleşme Dönüşüm Oranı
              </span>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-black text-zinc-900 dark:text-white">%{conversionRate}</div>
                <span className="text-xs text-emerald-600 font-semibold">Sektör Ortalaması Üstünde</span>
              </div>
              {/* Görsel Çubuk (Progress Gauge) */}
              <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden mt-2">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${conversionRate}%` }} />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-2">
              <span className="text-xs font-medium text-zinc-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Tahsil Edilen Kaporalar
              </span>
              <div className="text-3xl font-black text-zinc-900 dark:text-white">₺{totalDeposits.toLocaleString('tr-TR')}</div>
              <p className="text-[11px] text-zinc-400">İmzalanan {signedCount} Sözleşmeden Alındı</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-2">
              <span className="text-xs font-medium text-zinc-400">Toplam Anlaşma Hacmi</span>
              <div className="text-3xl font-black text-zinc-900 dark:text-white">₺{totalVolume.toLocaleString('tr-TR')}</div>
              <p className="text-[11px] text-zinc-400">Tüm Canlı Sözleşmeler Dahil</p>
            </div>
          </div>

          {/* DÜĞÜN SÖZLEŞMESİ DURUM DAĞILIMI (GÖRSEL GRAFİK BARI) */}
          <div className="p-6 sm:p-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Sözleşme Aşaması Dağılımı</h3>
            <div className="w-full h-4 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex gap-1 p-0.5">
              <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: `${(signedCount / (contracts.length || 1)) * 100}%` }} title="İmzalandı" />
              <div className="h-full bg-amber-500" style={{ width: `${(expiringCount / (contracts.length || 1)) * 100}%` }} title="Opsiyon Süresinde" />
              <div className="h-full bg-zinc-400 rounded-r-full" style={{ width: `${((contracts.length - signedCount - expiringCount) / (contracts.length || 1)) * 100}%` }} title="İmza Bekliyor" />
            </div>
            <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-500 font-medium pt-2">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> İmzalandı & Kapora Alındı ({signedCount})</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" /> Opsiyon Süresinde ({expiringCount})</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-zinc-400" /> Onay Bekliyor ({contracts.length - signedCount - expiringCount})</span>
            </div>
          </div>

        </div>
      )}

      {/* ------------------ SEKME 2: AKTİF SÖZLEŞMELER ------------------ */}
      {(activeTab === 'PIPELINE' || activeTab === 'ARCHIVE') && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Çift veya sözleşme ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
              />
            </div>
          </div>

          <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    <th className="p-4">Çift Adı & Tarih</th>
                    <th className="p-4">Sözleşme Başlığı</th>
                    <th className="p-4">Toplam Tutar</th>
                    <th className="p-4">Kapora</th>
                    <th className="p-4">Durum & Opsiyon Sayaç</th>
                    <th className="p-4 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-xs">
                  {filteredContracts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-zinc-400 font-medium">
                        Kayıtlı sözleşme bulunamadı.
                      </td>
                    </tr>
                  ) : (
                    filteredContracts.map((item) => (
                      <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                        <td className="p-4 font-bold text-zinc-900 dark:text-white">
                          <div>{item.coupleNames}</div>
                          <span className="text-[10px] text-zinc-400 font-normal">{item.weddingDate}</span>
                        </td>
                        <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">{item.title}</td>
                        <td className="p-4 font-bold text-zinc-900 dark:text-white">₺{item.totalAmount.toLocaleString('tr-TR')}</td>
                        <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">₺{item.depositAmount.toLocaleString('tr-TR')}</td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1 items-start">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              item.status === 'SIGNED' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                              item.status === 'OPTION_EXPIRING' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                              'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                            }`}>
                              {item.status === 'SIGNED' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              {item.status === 'SIGNED' ? 'İmzalandı & Yürürlükte' : item.status === 'OPTION_EXPIRING' ? 'Opsiyon Doluyor' : 'İmza Bekliyor'}
                            </span>

                            {item.optionHoursRemaining !== undefined && (
                              <span className="text-[9px] text-amber-600 font-bold flex items-center gap-1">
                                ⏳ {item.optionHoursRemaining} Saat Opsiyon Süresi Kaldı
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {item.status !== 'SIGNED' && !item.isArchived && (
                              <button
                                onClick={() => {
                                  setSelectedContractForOtp(item);
                                  setIsOtpModalOpen(true);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Smartphone className="w-3 h-3" /> SMS-OTP İmza
                              </button>
                            )}
                            
                            {!item.isArchived && (
                              <button
                                onClick={() => handleArchiveContract(item.id, item.title)}
                                className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                                title="Arşive Taşı"
                              >
                                <Archive className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ------------------ SEKME 3: ŞABLON KÜTÜPHANESİ ------------------ */}
      {activeTab === 'TEMPLATES' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Copy className="w-4 h-4 text-zinc-500" /> Hazır Sözleşme Şablonları & Dinamik Değişkenler
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Kendi matbu sözleşmelerinizi ekleyin. Teklif verirken <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-[10px] font-mono text-zinc-900 dark:text-white">{`{{cift_adi}}`}</code>, <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-[10px] font-mono text-zinc-900 dark:text-white">{`{{dugun_tarihi}}`}</code> ve <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-[10px] font-mono text-zinc-900 dark:text-white">{`{{toplam_tutar}}`}</code> otomatik doldurulur.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {templates.map(tmpl => (
                <div key={tmpl.id} className="p-5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{tmpl.name}</h4>
                    <span className="px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">{tmpl.category}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono line-clamp-3 bg-white/60 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-200/40 dark:border-zinc-700/40">
                    {tmpl.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------ SEKME 4: OPSİYON VE UYARI AYARLARI ------------------ */}
      {activeTab === 'OPTION_SETTINGS' && (
        <form onSubmit={handleSaveOptionSettings} className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-zinc-500" /> Opsiyon Süreleri & Otomatik Hatırlatıcı Ayarları
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">İmzalanmayan tekliflerin ne kadar süre sonra düşeceğini ve otomatik WhatsApp/SMS uyarılarını yapılandırın.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Varsayılan Opsiyon Süresi (Saat)</label>
              <select
                value={optionSettings.defaultOptionHours}
                onChange={(e) => setOptionSettings({ ...optionSettings, defaultOptionHours: parseInt(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
              >
                <option value={24}>24 Saat (Hızlı Teklif)</option>
                <option value={48}>48 Saat (Varsayılan - Önerilen)</option>
                <option value={72}>72 Saat (3 Gün)</option>
                <option value={168}>7 Gün (Opsiyonlu Rezervasyon)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Opsiyon Dolmadan Kaç Saat Önce Uyarı Gönderilsin?</label>
              <input
                type="number"
                value={optionSettings.reminderHoursBeforeExpiry}
                onChange={(e) => setOptionSettings({ ...optionSettings, reminderHoursBeforeExpiry: parseInt(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black transition-all cursor-pointer"
            >
              {isPending ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
            </button>
          </div>
        </form>
      )}

      {/* YENİ SÖZLEŞME MODALI */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-500" /> Dijital Sözleşme & Teklif Oluştur
              </h2>
              <button onClick={() => setIsNewModalOpen(false)} className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateContract} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Çift İsimleri</label>
                <input
                  type="text"
                  placeholder="Selin & Caner"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Sözleşme Başlığı</label>
                <input
                  type="text"
                  placeholder="Kır Düğünü Hizmet Sözleşmesi"
                  value={contractTitle}
                  onChange={(e) => setContractTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Toplam Anlaşma Tutarı (₺)</label>
                  <input
                    type="number"
                    placeholder="150000"
                    value={totalAmountStr}
                    onChange={(e) => setTotalAmountStr(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Kapora Tutarı (₺)</label>
                  <input
                    type="number"
                    placeholder="45000 (%30)"
                    value={depositAmountStr}
                    onChange={(e) => setDepositAmountStr(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button type="button" onClick={() => setIsNewModalOpen(false)} className="px-4 py-2 rounded-xl border text-xs font-semibold">İptal</button>
                <button type="submit" disabled={isPending} className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold">Sözleşmeyi İlet</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SMS-OTP İMZA MODALI SİMÜLASYONU */}
      {isOtpModalOpen && selectedContractForOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center mx-auto">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">SMS-OTP Dijital İmza Onayı</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{selectedContractForOtp.coupleNames} çiftinin kayıtlı cep telefonuna doğrulama kodu gönderildi.</p>
            </div>

            <form onSubmit={handleVerifyOtpAndSign} className="space-y-4">
              <input
                type="text"
                placeholder="4 Haneli OTP Kodu (Örn: 8842)"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={4}
                className="w-full text-center text-lg font-mono font-bold tracking-widest px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-zinc-900 dark:text-white"
                required
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsOtpModalOpen(false)} className="w-1/2 py-2 rounded-xl border text-xs font-semibold">İptal</button>
                <button type="submit" disabled={isPending || otpCode.length < 4} className="w-1/2 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold">Resmi İmzala</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}