'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { GlassPanel } from '@/components/shared/ui/GlassPanel';
import { 
  Building2, 
  Store, 
  Wallet, 
  FileText, 
  ShieldCheck, 
  Radio, 
  Check, 
  X, 
  Loader2,
  Calendar,
  Users,
  Eye,
  FileSignature,
  Boxes,
  Briefcase,
  Zap,
  Bot,
  Lock,
  CreditCard,
  TrendingUp,
  MessageSquare,
  Star,
  Bell,
  Sparkles,
  BarChart2,
  Send,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

export default function VendorEnterprisePortal() {
  const [activeTab, setActiveTab] = useState<
    'crm' | 'ai-assistant' | 'slots' | 'escrow' | 'benchmark' | 'reputation' | 'contracts' | 'finance' | 'inventory' | 'team' | 'opportunities' | 'storefront'
  >('crm');

  // Supabase & CRM State'leri
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAcceptingQuotes, setIsAcceptingQuotes] = useState(true);

  // 1. AI Yanıt Asistanı State
  const [aiDraft, setAiDraft] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // 2. Smart Slot Lock (Opsiyonlu Tarihler) State
  const [lockedSlots, setLockedSlots] = useState([
    { id: '1', date: '15 Ağustos 2026', couple: 'Selin & Kaan', status: 'OPSIYONLU (32 Saat Kaldı)', conflictWarning: true },
    { id: '2', date: '20 Eylül 2026', couple: 'Eda & Mert', status: 'KESIN REZERVE', conflictWarning: false }
  ]);

  // 3. Taksitli Kapora & Escrow State
  const [escrowPayments, setEscrowPayments] = useState([
    { id: 'PAY-101', couple: 'Selin & Kaan', total: 85000, kapora: 25500, status: 'KAPORA_ALINDI', nextMilestone: 'Düğün Haftası (%40)' },
    { id: 'PAY-102', couple: 'Eda & Mert', total: 60000, kapora: 18000, status: 'BEKLIYOR', nextMilestone: 'Kapora (%30)' }
  ]);

  // 4. Rekabet & Market Benchmark State
  const [marketStats] = useState({
    pricePosition: '%12 Daha Uygun',
    cityAvgPrice: '₺78,000',
    vendorPrice: '₺68,500',
    lostReason: 'Tarih Doluluğu (%54), Bütçe Yüksek (%32), Diğer (%14)'
  });

  // 6. Yorumlar & Reputation State
  const [reviews, setReviews] = useState([
    { id: 'REV-1', couple: 'Merve & Can', rating: 5, comment: 'Mekan harikaydı, organizasyon kusursuz ilerledi!', date: 'Bugün', reply: 'Teşekkürler Merve Hanım!' },
    { id: 'REV-2', couple: 'Deniz & Arda', rating: 5, comment: 'Işık ve ses düzeni harikaydı, her şey söz verildiği gibiydi.', date: '3 gün önce', reply: '' }
  ]);
  const [replyInput, setReplyInput] = useState<{ [key: string]: string }>({});

  // Finans Gelir / Gider State'leri
  const [expenses, setExpenses] = useState([
    { id: '1', title: 'Işık & Ses Sistemi Kiralama', amount: 12500, category: 'Ekipman', date: '2026-07-28' },
    { id: '2', title: 'Garson & Hizmet Personeli', amount: 8000, category: 'Personel', date: '2026-07-29' },
  ]);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: 'Genel' });

  // Sözleşme State'leri
  const [contracts, setContracts] = useState([
    { id: 'SZ-2026-01', couple: 'Selin & Kaan', date: '15 Ağustos 2026', total: 85000, status: 'IMZALANDI' },
    { id: 'SZ-2026-02', couple: 'Eda & Mert', date: '20 Eylül 2026', total: 60000, status: 'BEKLIYOR' }
  ]);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [newContract, setNewContract] = useState({ couple: '', date: '', amount: '' });

  // Realtime Akışı
  useEffect(() => {
    fetchQuotes();

    const channel = supabase
      .channel('vendor-portal-realtime-v3')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quote_requests' }, () => fetchQuotes())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) setQuotes(data);
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, status: 'ACCEPTED' | 'REJECTED') => {
    const { error } = await supabase.from('quote_requests').update({ status }).eq('id', id);
    if (!error) fetchQuotes();
  };

  // AI Yanıt Üretme Simülasyonu
  const handleGenerateAiResponse = (coupleName: string, budget: number) => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setAiDraft(`Merhaba Sayın ${coupleName},\n\nGrand Çamlıca Kır Bahçesi olarak hayalinizdeki düğün organizasyonu için heyecan duyuyoruz. Belirttiğiniz ₺${budget.toLocaleString('tr-TR')} bütçeniz ve düğün tarihiniz doğrultusunda paketlerimizi inceledik.\n\nSizin için %85 kabul edilebilirlik oranına sahip 'VIP Kır Düğünü' paketimizi özel %10 indirim opsiyonuyla sunabiliriz. Sizi mekanımızda kahve eşliğinde ağırlamak isteriz.\n\nSaygılarımızla,\nGrand Çamlıca Ekibi`);
      setIsGeneratingAi(false);
    }, 1200);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) return;
    setExpenses(prev => [
      ...prev,
      { id: Date.now().toString(), title: newExpense.title, amount: Number(newExpense.amount), category: newExpense.category, date: new Date().toISOString().split('T')[0] }
    ]);
    setNewExpense({ title: '', amount: '', category: 'Genel' });
  };

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContract.couple || !newContract.amount) return;
    setContracts(prev => [
      ...prev,
      { id: `SZ-2026-0${prev.length + 1}`, couple: newContract.couple, date: newContract.date || 'Belirtilmedi', total: Number(newContract.amount), status: 'BEKLIYOR' }
    ]);
    setNewContract({ couple: '', date: '', amount: '' });
    setIsContractModalOpen(false);
  };

  const handleSendReply = (reviewId: string) => {
    if (!replyInput[reviewId]) return;
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, reply: replyInput[reviewId] } : r));
    setReplyInput(prev => ({ ...prev, [reviewId]: '' }));
  };

  const totalGelir = quotes.filter(q => q.status === 'ACCEPTED').reduce((acc, q) => acc + (Number(q.budget_offered) || 0), 0);
  const totalGider = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netKar = totalGelir - totalGider;

  return (
    <div className="flex min-h-screen bg-zinc-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans">
      
      {/* ==================== SOL SABİT SEKMELİ MENÜ ==================== */}
      <aside className="w-64 border-r border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl p-6 flex flex-col justify-between hidden lg:flex shrink-0 min-h-screen">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base tracking-tight">WedyVendor</h2>
              <span className="text-[10px] font-mono text-zinc-500 font-semibold uppercase">Enterprise Portal</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button onClick={() => setActiveTab('crm')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'crm' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Users className="w-4 h-4" /> CRM & Görüşmeler ({quotes.length})
            </button>

            <button onClick={() => setActiveTab('ai-assistant')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'ai-assistant' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Bot className="w-4 h-4 text-purple-500" /> Smart AI Yanıt Asistanı
            </button>

            <button onClick={() => setActiveTab('slots')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'slots' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Lock className="w-4 h-4 text-amber-500" /> Opsiyon & Slot Lock
            </button>

            <button onClick={() => setActiveTab('escrow')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'escrow' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <CreditCard className="w-4 h-4 text-emerald-500" /> Escrow & Kapora
            </button>

            <button onClick={() => setActiveTab('benchmark')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'benchmark' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <BarChart2 className="w-4 h-4 text-blue-500" /> Rekabet & Benchmark
            </button>

            <button onClick={() => setActiveTab('reputation')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'reputation' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Yorumlar & İtibar
            </button>

            <button onClick={() => setActiveTab('contracts')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'contracts' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <FileSignature className="w-4 h-4" /> Sözleşmeler
            </button>

            <button onClick={() => setActiveTab('finance')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'finance' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Wallet className="w-4 h-4" /> Finans, Gelir & Gider
            </button>

            <button onClick={() => setActiveTab('inventory')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'inventory' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Boxes className="w-4 h-4" /> Stok & Envanter
            </button>

            <button onClick={() => setActiveTab('team')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'team' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <Briefcase className="w-4 h-4" /> Ekip & Mesai
            </button>

            <button onClick={() => setActiveTab('opportunities')} className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${activeTab === 'opportunities' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-amber-500" /> VIP İhale Havuzu
              </div>
              <span className="px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 text-[9px] font-bold">Açık</span>
            </button>
          </nav>
        </div>

        <GlassPanel className="p-4 space-y-2 border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Grand Çamlıca
          </div>
          <p className="text-[10px] text-zinc-500">Müşteri Favorisi Rozeti Aktif</p>
        </GlassPanel>
      </aside>

      {/* ==================== SAĞ ANA KUMANDA PANELİ ==================== */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">

        {/* HEADER BAR */}
        <GlassPanel className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-emerald-500" /> Enterprise Düğün ERP
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">Grand Çamlıca Kır Bahçesi</h1>
            <p className="text-xs text-zinc-500">AI yanıt asistanı, slot kilitleri, escrow ödemeler ve rekabet analitikleri aktif.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> WhatsApp & Realtime Bağlı
            </div>

            <button onClick={() => setIsAcceptingQuotes(!isAcceptingQuotes)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${isAcceptingQuotes ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs' : 'bg-zinc-200 dark:bg-zinc-800'}`}>
              <Radio className={`w-3.5 h-3.5 ${isAcceptingQuotes ? 'text-emerald-500 animate-pulse' : ''}`} />
              <span>{isAcceptingQuotes ? 'Teklife Açık' : 'Teklife Kapalı'}</span>
            </button>
          </div>
        </GlassPanel>

        {/* METRİK KARTLARI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <GlassPanel className="p-5 space-y-2">
            <span className="text-xs text-zinc-500 font-medium">Toplam Görüşme / Teklif</span>
            <div className="text-3xl font-serif font-bold">{quotes.length}</div>
            <span className="text-[10px] text-emerald-600 font-medium block">Kabul İhtimali %85</span>
          </GlassPanel>

          <GlassPanel className="p-5 space-y-2">
            <span className="text-xs text-zinc-500 font-medium">Kilitli Opsiyon Slotları</span>
            <div className="text-3xl font-serif font-bold text-amber-500">{lockedSlots.length} Tarih</div>
            <span className="text-[10px] text-amber-600 font-medium block">48 Saatlik Geçici Kilit</span>
          </GlassPanel>

          <GlassPanel className="p-5 space-y-2">
            <span className="text-xs text-zinc-500 font-medium">Escrow Kapora Havuzu</span>
            <div className="text-3xl font-serif font-bold text-emerald-600">₺43,500</div>
            <span className="text-[10px] text-emerald-600 font-medium block">Güvenli Kademeli Ödeme</span>
          </GlassPanel>

          <GlassPanel className="p-5 space-y-2">
            <span className="text-xs text-zinc-500 font-medium">Sektör Fiyat Benchmark</span>
            <div className="text-3xl font-serif font-bold text-blue-500">-12%</div>
            <span className="text-[10px] text-blue-600 font-medium block">İstanbul Geneline Göre Avantajlı</span>
          </GlassPanel>
        </div>

        {/* ==================== MODÜL 1: CRM & TEKLİFLER ==================== */}
        {activeTab === 'crm' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold">Müşteri Görüşmeleri & Canlı Teklif Talepleri</h2>
                <p className="text-xs text-zinc-500 mt-1">Düğün tarihlerini ve bütçeleri kontrol edip onaylayın veya AI şablonuyla yanıtlayın.</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">{quotes.length} Aktif Müşteri</span>
            </div>

            {loading ? (
              <div className="flex justify-center p-12 text-zinc-400 gap-2 items-center">
                <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
                <span className="text-xs font-medium">Müşteri talepleri yükleniyor...</span>
              </div>
            ) : quotes.length === 0 ? (
              <div className="p-12 text-center text-xs text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                Henüz gelen bir müşteri talebi bulunmuyor.
              </div>
            ) : (
              <div className="space-y-3">
                {quotes.map((q) => (
                  <GlassPanel key={q.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm">{q.couple_name}</h4>
                        <span className="text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full">
                          Bütçe: ₺{(Number(q.budget_offered) || 0).toLocaleString('tr-TR')}
                        </span>
                        <span className="text-[10px] font-bold bg-purple-500/10 text-purple-600 px-2 py-0.5 rounded-full border border-purple-200">
                          AI Onay İhtimali: %85
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">Düğün Tarihi: {q.event_date || 'Belirtilmedi'}</p>
                      {q.message && <p className="text-xs italic bg-zinc-100/50 dark:bg-zinc-800/50 p-3 rounded-xl mt-2">"{q.message}"</p>}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => { setActiveTab('ai-assistant'); handleGenerateAiResponse(q.couple_name, Number(q.budget_offered) || 50000); }} className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer">
                        <Bot className="w-3.5 h-3.5" /> AI Taslak Hazırla
                      </button>

                      {q.status === 'PENDING' ? (
                        <>
                          <button onClick={() => handleUpdateStatus(q.id, 'ACCEPTED')} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer">
                            <Check className="w-3.5 h-3.5 inline mr-1" /> Onayla
                          </button>
                          <button onClick={() => handleUpdateStatus(q.id, 'REJECTED')} className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-200/60 text-xs font-semibold cursor-pointer">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full border bg-emerald-500/10 text-emerald-600 border-emerald-200">
                          {q.status === 'ACCEPTED' ? 'Onaylandı' : 'Reddedildi'}
                        </span>
                      )}
                    </div>
                  </GlassPanel>
                ))}
              </div>
            )}
          </GlassPanel>
        )}

        {/* ==================== MODÜL 2: AI YANIT ASİSTANI ==================== */}
        {activeTab === 'ai-assistant' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                  <Bot className="w-5 h-5" /> Smart Response Engine (AI Yanıt Asistanı)
                </h2>
                <p className="text-xs text-zinc-500 mt-1">AI, çiftin bütçesini ve tarihini analiz ederek kişiselleştirilmiş teklif mesajı hazırlar.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-700 dark:text-purple-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>AI Uygunluk Analizi: Çift bütçesi paketlerinizle %88 oranında eşleşiyor. Otomatik WhatsApp takibi kurulacak.</span>
              </div>

              <textarea value={aiDraft} onChange={(e) => setAiDraft(e.target.value)} placeholder="AI teklif mesajı burada oluşturulacak..." className="w-full h-44 p-4 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 rounded-2xl text-xs outline-none focus:border-purple-500 font-mono" />

              <div className="flex gap-2">
                <button onClick={() => alert('Teklif mesajı WhatsApp ve E-posta üzerinden çifte iletildi.')} className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" /> WhatsApp ile Gönder
                </button>
                <button onClick={() => setAiDraft('')} className="px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold rounded-xl cursor-pointer">
                  Temizle
                </button>
              </div>
            </div>
          </GlassPanel>
        )}

        {/* ==================== MODÜL 3: SMART SLOT LOCK ==================== */}
        {activeTab === 'slots' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <Lock className="w-5 h-5" /> Smart Slot Lock (Opsiyon & Randevu Kilitleri)
                </h2>
                <p className="text-xs text-zinc-500 mt-1">Teklif isteyen çiftler için tarihleri 48 saatliğine kilitler ve çakışma durumunda uyarı verir.</p>
              </div>
            </div>

            <div className="space-y-3">
              {lockedSlots.map((slot) => (
                <GlassPanel key={slot.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm">{slot.date}</h4>
                      {slot.conflictWarning && (
                        <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3" /> Bu tarih için 1 opsiyon daha var!
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500">Müşteri: {slot.couple} • Durum: <strong className="text-zinc-900 dark:text-white">{slot.status}</strong></p>
                  </div>

                  <button onClick={() => alert(`${slot.date} tarihi için opsiyon kilidi uzatıldı.`)} className="px-3.5 py-2 bg-zinc-100 dark:bg-zinc-800 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-700 cursor-pointer">
                    Opsiyonu 24 Saat Uzat
                  </button>
                </GlassPanel>
              ))}
            </div>
          </GlassPanel>
        )}

        {/* ==================== MODÜL 4: ESCROW & KAPORA ==================== */}
        {activeTab === 'escrow' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Taksitli Kapora & Güvenli Ödeme (Escrow)
                </h2>
                <p className="text-xs text-zinc-500 mt-1">Ödemeleri %30 Kapora, %40 Düğün Haftası, %30 Düğün Günü şeklinde aşamalandırın.</p>
              </div>
            </div>

            <div className="space-y-3">
              {escrowPayments.map((p) => (
                <GlassPanel key={p.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-400">{p.id}</span>
                      <h4 className="font-bold text-sm">{p.couple}</h4>
                    </div>
                    <p className="text-xs text-zinc-500">Toplam: ₺{p.total.toLocaleString('tr-TR')} • Tahsil Edilen Kapora: <strong className="text-emerald-600">₺{p.kapora.toLocaleString('tr-TR')}</strong></p>
                    <p className="text-[11px] text-amber-600 font-semibold">Sıradaki Aşama: {p.nextMilestone}</p>
                  </div>

                  <button onClick={() => alert(`${p.id} için kalan ödeme hatırlatma mesajı gönderildi.`)} className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl cursor-pointer">
                    Ödeme Linki Gönder
                  </button>
                </GlassPanel>
              ))}
            </div>
          </GlassPanel>
        )}

        {/* ==================== MODÜL 5: REKABET & BENCHMARK ==================== */}
        {activeTab === 'benchmark' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5" /> Rekabet & Bölgesel Sektör Analitiği
                </h2>
                <p className="text-xs text-zinc-500 mt-1">Şehrinizdeki diğer mekanlarla anonim fiyat konumlandırmanızı kıyaslayın.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-xs font-semibold text-zinc-400">Bölgesel Fiyat Konumlandırmanız</span>
                <div className="text-2xl font-bold text-blue-600">{marketStats.pricePosition}</div>
                <p className="text-xs text-zinc-500">İstanbul Kır Bahçeleri ortalaması: {marketStats.cityAvgPrice} • Sizin Ortalamanız: {marketStats.vendorPrice}</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-xs font-semibold text-zinc-400">Kaybedilen Müşteri Nedenleri</span>
                <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{marketStats.lostReason}</p>
              </div>
            </div>
          </GlassPanel>
        )}

        {/* ==================== MODÜL 6: YORUMLAR & İTİBAR ==================== */}
        {activeTab === 'reputation' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-amber-500 flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-500" /> Müşteri Yorumları & İtibar Yönetimi
                </h2>
                <p className="text-xs text-zinc-500 mt-1">Düğünü tamamlanan çiftlerin değerlendirmelerini yanıtlayın, Müşteri Favorisi rozetini kazanın.</p>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((r) => (
                <GlassPanel key={r.id} className="p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm">{r.couple}</h4>
                      <div className="flex items-center text-amber-400 text-xs font-bold">
                        ★ {r.rating}.0
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-400">{r.date}</span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 italic bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-xl">"{r.comment}"</p>

                  {r.reply ? (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300">
                      <strong>Firma Yanıtınız:</strong> {r.reply}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input type="text" placeholder="Çifte kurumsal yanıtınızı yazın..." value={replyInput[r.id] || ''} onChange={(e) => setReplyInput({ ...replyInput, [r.id]: e.target.value })} className="flex-1 h-9 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-xs outline-none" />
                      <button onClick={() => handleSendReply(r.id)} className="px-4 h-9 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-xl cursor-pointer">
                        Yanıtla
                      </button>
                    </div>
                  )}
                </GlassPanel>
              ))}
            </div>
          </GlassPanel>
        )}

        {/* ==================== SÖZLEŞMELER ==================== */}
        {activeTab === 'contracts' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-serif font-bold">Sözleşme Studio & Doküman Yönetimi</h2>
                <p className="text-xs text-zinc-500 mt-1">Düğün sözleşmeleri hazırlayın, PDF olarak indirin veya dijital imza toplayın.</p>
              </div>
              <button onClick={() => setIsContractModalOpen(true)} className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-xl cursor-pointer">
                + Yeni Sözleşme Hazırla
              </button>
            </div>

            <div className="space-y-3">
              {contracts.map((c) => (
                <GlassPanel key={c.id} className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-400">{c.id}</span>
                      <h4 className="font-bold text-sm">{c.couple}</h4>
                    </div>
                    <p className="text-xs text-zinc-500">Tarih: {c.date} • Toplam Tutar: ₺{c.total.toLocaleString('tr-TR')}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${c.status === 'IMZALANDI' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-200' : 'bg-amber-500/10 text-amber-600 border border-amber-200'}`}>
                      {c.status}
                    </span>
                    <button onClick={() => alert(`${c.id} numaralı sözleşme PDF olarak indiriliyor...`)} className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-700 cursor-pointer">
                      PDF İndir
                    </button>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </GlassPanel>
        )}

        {/* ==================== FİNANS GELİR & GİDER ==================== */}
        {activeTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <GlassPanel className="p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-serif font-bold">Finans, Gelir & Gider Yönetimi</h2>
              <p className="text-xs text-zinc-500">İşletmenizin etkinlik masraflarını girin, net kârlılık oranınızı hesaplayın.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-xs text-emerald-600 font-semibold block">Toplam Düğün Geliri</span>
                  <div className="text-2xl font-serif font-bold text-emerald-600 mt-1">₺{totalGelir.toLocaleString('tr-TR')}</div>
                </div>
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                  <span className="text-xs text-rose-600 font-semibold block">Toplam Etkinlik Masrafı</span>
                  <div className="text-2xl font-serif font-bold text-rose-600 mt-1">₺{totalGider.toLocaleString('tr-TR')}</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900 dark:bg-zinc-800 text-white border border-zinc-700">
                  <span className="text-xs text-zinc-400 font-semibold block">Net İşletme Kârı</span>
                  <div className="text-2xl font-serif font-bold mt-1">₺{netKar.toLocaleString('tr-TR')}</div>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="p-6 space-y-4">
              <h3 className="text-sm font-bold">Etkinlik Masrafı / Gider Kaydı Ekle</h3>
              <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input type="text" placeholder="Gider Açıklaması" value={newExpense.title} onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })} className="h-10 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none" required />
                <input type="number" placeholder="Tutar (TL)" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} className="h-10 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none" required />
                <select value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} className="h-10 px-3 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs outline-none">
                  <option value="Ekipman">Ekipman</option>
                  <option value="Personel">Personel</option>
                  <option value="Yiyecek/İçecek">Yiyecek/İçecek</option>
                  <option value="Pazarlama">Pazarlama</option>
                  <option value="Genel">Genel</option>
                </select>
                <button type="submit" className="h-10 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer">
                  + Gider Kaydet
                </button>
              </form>

              <div className="space-y-2 pt-3">
                {expenses.map((exp) => (
                  <div key={exp.id} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold">{exp.title}</span>
                      <span className="text-zinc-400 mx-2">•</span>
                      <span className="text-zinc-500">{exp.category}</span>
                    </div>
                    <span className="font-bold text-rose-600">-₺{exp.amount.toLocaleString('tr-TR')}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
        )}

        {/* ==================== ENVANTER & STOK ==================== */}
        {activeTab === 'inventory' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-serif font-bold">Stok & Envanter Yönetimi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GlassPanel className="p-5 space-y-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Adet Stoku</span>
                <h4 className="font-bold text-base">Tiffany Sandalye (Beyaz)</h4>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500">Mevcut: 600</span>
                  <span className="text-amber-600 font-semibold">Rezerve: 450</span>
                </div>
              </GlassPanel>
              <GlassPanel className="p-5 space-y-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Adet Stoku</span>
                <h4 className="font-bold text-base">Yuvarlak Masalar (10 Kişilik)</h4>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="text-zinc-500">Mevcut: 60</span>
                  <span className="text-amber-600 font-semibold">Rezerve: 45</span>
                </div>
              </GlassPanel>
            </div>
          </GlassPanel>
        )}

        {/* ==================== EKİP & MESAİ ==================== */}
        {activeTab === 'team' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-serif font-bold">Ekip Üyeleri & Görev Dağılımı</h2>
            <div className="space-y-3">
              <GlassPanel className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">Ahmet Yılmaz</h4>
                  <p className="text-xs text-zinc-500">Baş Fotoğrafçı & Şef • +90 532 000 0000</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-200">
                  MESAIDE
                </span>
              </GlassPanel>
            </div>
          </GlassPanel>
        )}

        {/* ==================== VIP İHALE HAVUZU ==================== */}
        {activeTab === 'opportunities' && (
          <GlassPanel className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-serif font-bold text-amber-600 dark:text-amber-400">Canlı İhale & Acil Düğün Havuzu</h2>
            <div className="space-y-3">
              <GlassPanel className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-amber-200/60 dark:border-amber-900/30">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-600">OP-101</span>
                    <h4 className="font-bold text-sm">Son Dakika Düğün Salonu Arayışı</h4>
                  </div>
                  <p className="text-xs text-zinc-500">Burcu & Tolga • İstanbul • Tarih: 12 Ağustos 2026 • Bütçe: <strong>₺75,000</strong></p>
                </div>
                <button onClick={() => alert('Hızlı özel teklifiniz iletildi.')} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl cursor-pointer">
                  Hızlı Teklif Ver
                </button>
              </GlassPanel>
            </div>
          </GlassPanel>
        )}

      </main>

      {/* SÖZLEŞME MODALI */}
      {isContractModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg">Düğün Sözleşmesi Taslağı Oluştur</h3>
            <form onSubmit={handleCreateContract} className="space-y-3">
              <input type="text" placeholder="Çift İsimleri (Örn: Selin & Kaan)" value={newContract.couple} onChange={(e) => setNewContract({ ...newContract, couple: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" required />
              <input type="text" placeholder="Düğün Tarihi" value={newContract.date} onChange={(e) => setNewContract({ ...newContract, date: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" />
              <input type="number" placeholder="Anlaşılan Toplam Tutar (TL)" value={newContract.amount} onChange={(e) => setNewContract({ ...newContract, amount: e.target.value })} className="w-full h-11 px-3 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs" required />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsContractModalOpen(false)} className="flex-1 h-10 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs">İptal</button>
                <button type="submit" className="flex-1 h-10 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-bold">Sözleşmeyi Oluştur</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}