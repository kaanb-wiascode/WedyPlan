'use client';

import React, { useState, useMemo, useTransition } from 'react';
import { submitProfileForReviewAction, uploadVendorMediaAction } from '@/lib/actions/vendor-profile-sync';
import {
  Store,
  Info,
  Camera,
  MapPin,
  HelpCircle,
  Gift,
  Building2,
  MenuSquare,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  Clock,
  Link as LinkIcon,
  Upload,
  Plus,
  Trash2,
  Users,
  Car,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function VendorProfileManagementPage() {
  const [isPending, startTransition] = useTransition();

  // Moderasyon Durumu (APPROVED | PENDING_APPROVAL)
  const [moderationStatus, setModerationStatus] = useState<'APPROVED' | 'PENDING_APPROVAL'>('APPROVED');

  // Sekmeler
  const tabs = [
    { id: 'GENERAL', label: 'Genel Bilgiler', icon: Info },
    { id: 'GALLERY', label: 'Galeri & Medya', icon: Camera },
    { id: 'VENUES', label: 'Alanlar & Kapasite', icon: Building2 },
    { id: 'MENUS', label: 'Menü & Hizmetler', icon: MenuSquare },
    { id: 'CAMPAIGNS', label: 'Kampanya & Fırsat', icon: Gift },
    { id: 'LOCATION', label: 'Konum & Ulaşım', icon: MapPin },
    { id: 'FAQ', label: 'SSS & Neden Biz?', icon: HelpCircle },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Form State'leri
  const [formData, setFormData] = useState({
    companyName: 'Beykoz Secret Garden',
    category: 'Kır Düğünü',
    aboutText: 'Boğaza nazır, doğayla iç içe eşsiz bir kır düğünü deneyimi sunuyoruz. 30 yıllık tecrübemiz ve alanında uzman mutfak şeflerimizle en özel gününüzü masala dönüştürüyoruz.',
    socialLinks: { instagram: '@secretgarden', website: 'www.secretgarden.com' },
    contact: { name: 'Ahmet Yılmaz', title: 'Operasyon Müdürü', phone: '+90 532 111 2233', email: 'ahmet@secretgarden.com' },
    capacities: { seated: 750, cocktail: 1000, parking: 250 },
    features: ['Deniz Manzarası', 'Kolonsuz Salon', 'Yüksek Tavan', 'After Party Alanı', 'Engelli Girişi', 'Açılır Kapanır Tavan'],
    location: { address: 'Kavacık Mah. Beykoz/İstanbul', lat: '41.1124', lng: '29.0963' },
  });

  const [faqs, setFaqs] = useState([
    { question: 'Müzik ve servis saat kaçta bitiyor?', answer: 'Servis ve canlı müzik yasal saat sınırları gereği 23:30’da sona ermektedir. Dileyen çiftlerimiz kapalı After-Party alanımıza geçebilir.' }
  ]);
  
  const [campaigns, setCampaigns] = useState([
    { title: 'Kış Düğünlerine %15 İndirim', discount: '%15', requestHomepageShowcase: true }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // WedyAI Profil & SEO Skoru
  const completionScore = useMemo(() => {
    let score = 30; // Temel bilgiler
    if (formData.aboutText.length > 50) score += 15;
    if (formData.socialLinks.instagram) score += 10;
    if (faqs.length > 0) score += 15;
    if (campaigns.length > 0) score += 10;
    if (formData.features.length > 3) score += 20;
    return Math.min(score, 100);
  }, [formData, faqs, campaigns]);

  // 🍏 PROFİL DEĞİŞİKLİKLERİNİ KAYDET & ONAYA GÖNDER (SERVER ACTION)
  const handleSaveAndSubmitReview = () => {
    startTransition(async () => {
      const res = await submitProfileForReviewAction({
        ...formData,
        faqs,
        campaigns
      });

      if (res.success) {
        setModerationStatus('PENDING_APPROVAL');
        showToast(res.message);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased pb-24">
      
      {/* TOAST BİLDİRİMİ */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER & MODERASYON BİLDİRİMİ */}
      <div className="space-y-4">
        {moderationStatus === 'PENDING_APPROVAL' ? (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start sm:items-center gap-4 animate-in fade-in duration-300">
            <Clock className="w-5 h-5 text-amber-600 mt-0.5 sm:mt-0 shrink-0" />
            <div className="flex-1">
              <h4 className="text-xs font-bold">Profil Güncellemeleriniz Onay Bekliyor</h4>
              <p className="text-[11px] mt-1 opacity-80">Yaptığınız değişiklikler WedyPlan Editörleri tarafından incelenmektedir. Public sayfanızda şu an en son onaylı sürümünüz gösteriliyor.</p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 flex items-start sm:items-center gap-4">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5 sm:mt-0 shrink-0" />
            <div className="flex-1">
              <h4 className="text-xs font-bold">Profiliniz Yayında!</h4>
              <p className="text-[11px] mt-1 opacity-80">Tüm bilgileriniz çiftler tarafından public Pazar Yeri sayfanızda görüntülenebilir durumda.</p>
            </div>
          </div>
        )}

        <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
              <Store className="w-3.5 h-3.5 text-zinc-500" />
              <span>Pazar Yeri Vitrini</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Profil & Medya Yönetimi
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Çiftlerin sizi keşfedeceği vitrin sayfanızı kusursuzlaştırın, kampanyalar ve kapasite bilgilerinizi güncelleyin.
            </p>
          </div>

          {/* WedyAI SEO Score Widget */}
          <div className="flex items-center gap-4 bg-zinc-50/80 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/50">
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" className="text-zinc-200 dark:text-zinc-700" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${completionScore}, 100`} className={`${completionScore >= 80 ? 'text-emerald-500' : 'text-amber-500'}`} />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-[10px] font-black text-zinc-900 dark:text-white">%{completionScore}</span>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-amber-500" /> WedyAI SEO Skoru</h4>
              <p className="text-[10px] text-zinc-500 mt-0.5">{completionScore >= 80 ? 'Harika! Profiliniz öne çıkmaya hazır.' : 'Daha fazla detay ekleyerek görünürlüğü artırın.'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 7 SEKME ALT MENÜSÜ */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-200/60 dark:border-zinc-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                  : 'bg-white/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SEKME İÇERİKLERİ */}
      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-xs min-h-[400px]">
        
        {/* 1. GENEL BİLGİLER */}
        {activeTab === 'GENERAL' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Firma / Mekan Adı</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Kategori</label>
                <input
                  type="text"
                  value={formData.category}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border text-xs text-zinc-500 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Tesis Hakkında (Dugun.com Stili Geniş Açıklama)</label>
              <textarea
                rows={5}
                value={formData.aboutText}
                onChange={(e) => setFormData({...formData, aboutText: e.target.value})}
                className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs text-zinc-900 dark:text-white font-medium leading-relaxed"
              />
            </div>

            <div className="border-t border-zinc-200/60 dark:border-zinc-800 pt-6">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">Yetkili İletişim Bilgileri (Public)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" placeholder="Yetkili Adı" value={formData.contact.name} onChange={(e) => setFormData({...formData, contact: {...formData.contact, name: e.target.value}})} className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs font-medium" />
                <input type="text" placeholder="Telefon" value={formData.contact.phone} onChange={(e) => setFormData({...formData, contact: {...formData.contact, phone: e.target.value}})} className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs font-medium" />
                <input type="email" placeholder="E-posta" value={formData.contact.email} onChange={(e) => setFormData({...formData, contact: {...formData.contact, email: e.target.value}})} className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs font-medium" />
              </div>
            </div>
          </div>
        )}

        {/* 2. GALERİ VE MEDYA */}
        {activeTab === 'GALLERY' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-8 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl text-center bg-zinc-50/50 dark:bg-zinc-800/20">
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-5 h-5 text-zinc-500" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Vitrin Fotoğraflarınızı Yükleyin</h3>
              <p className="text-xs text-zinc-500 mt-1 mb-4">Sürükleyip bırakın veya bilgisayarınızdan seçin. (Yüksek çözünürlüklü yatay fotoğraflar önerilir).</p>
              <button className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold shadow-xs">Dosya Seç</button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="aspect-video rounded-2xl bg-zinc-200 dark:bg-zinc-800 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-white rounded-lg text-zinc-900"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[9px] text-white font-bold">{i === 1 ? 'Kapak Görseli' : 'Galeri'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. ALANLAR VE KAPASİTE */}
        {activeTab === 'VENUES' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-zinc-500" /> Maksimum Kapasite Bilgileri
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Yemekli Düğün</label>
                <div className="mt-2 flex items-center gap-2">
                  <input type="number" value={formData.capacities.seated} onChange={(e) => setFormData({...formData, capacities: {...formData.capacities, seated: parseInt(e.target.value)}})} className="w-24 bg-transparent text-xl font-black text-zinc-900 dark:text-white focus:outline-none" />
                  <span className="text-xs font-medium text-zinc-400">Kişi</span>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Kokteyl / Ayakta</label>
                <div className="mt-2 flex items-center gap-2">
                  <input type="number" value={formData.capacities.cocktail} onChange={(e) => setFormData({...formData, capacities: {...formData.capacities, cocktail: parseInt(e.target.value)}})} className="w-24 bg-transparent text-xl font-black text-zinc-900 dark:text-white focus:outline-none" />
                  <span className="text-xs font-medium text-zinc-400">Kişi</span>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Otopark / Vale</label>
                <div className="mt-2 flex items-center gap-2">
                  <input type="number" value={formData.capacities.parking} onChange={(e) => setFormData({...formData, capacities: {...formData.capacities, parking: parseInt(e.target.value)}})} className="w-24 bg-transparent text-xl font-black text-zinc-900 dark:text-white focus:outline-none" />
                  <span className="text-xs font-medium text-zinc-400">Araç</span>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-8 mb-4">Tesis Özellikleri (Pazar Yeri Filtreleri İçin)</h3>
            <div className="flex flex-wrap gap-2">
              {['Deniz Manzarası', 'Kolonsuz Salon', 'Yüksek Tavan', 'After Party Alanı', 'Engelli Girişi', 'Açılır Kapanır Tavan', 'Konaklama İmkanı', 'Doğa İçi', 'Havuz Başı'].map((feat) => {
                const isSelected = formData.features.includes(feat);
                return (
                  <button
                    key={feat}
                    onClick={() => {
                      const newFeats = isSelected ? formData.features.filter(f => f !== feat) : [...formData.features, feat];
                      setFormData({...formData, features: newFeats});
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                      isSelected 
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white' 
                        : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700/60 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 inline-block mr-1" />}
                    {feat}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. KAMPANYA VE FIRSATLAR */}
        {activeTab === 'CAMPAIGNS' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 text-emerald-900 dark:text-emerald-200">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-xs font-medium">Oluşturduğunuz kampanyalar, onaylandıktan sonra Pazar Yeri <strong>"Öne Çıkan Fırsatlar"</strong> bandında görünebilir.</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold shrink-0 shadow-xs cursor-pointer">Yeni Ekle</button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {campaigns.map((camp, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-red-500 text-white text-[10px] font-black">{camp.discount}</span>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{camp.title}</h4>
                    </div>
                    {camp.requestHomepageShowcase && (
                      <p className="text-[10px] text-zinc-500 mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Admin Onayı İle Ana Sayfa Vitrininde Gösterilecek
                      </p>
                    )}
                  </div>
                  <button className="text-xs font-semibold text-red-500 hover:underline">Kampanyayı Kaldır</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. KONUM VE HARİTA (SIMULATION) */}
        {activeTab === 'LOCATION' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Açık Adres</label>
                  <textarea rows={4} value={formData.location.address} onChange={(e) => setFormData({...formData, location: {...formData.location, address: e.target.value}})} className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs font-medium" />
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1 w-1/2">
                    <label className="text-[10px] text-zinc-500">Enlem (Lat)</label>
                    <input type="text" value={formData.location.lat} disabled className="w-full px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border text-xs text-zinc-500" />
                  </div>
                  <div className="space-y-1 w-1/2">
                    <label className="text-[10px] text-zinc-500">Boylam (Lng)</label>
                    <input type="text" value={formData.location.lng} disabled className="w-full px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border text-xs text-zinc-500" />
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400">İğneyi sürükleyerek veya adresi yazarak konumu güncelleyebilirsiniz.</p>
              </div>
              
              <div className="md:col-span-2 aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-3xl relative overflow-hidden flex items-center justify-center border border-zinc-300 dark:border-zinc-700">
                {/* Harita Simülasyonu */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=41.1124,29.0963&zoom=14&size=800x400&sensor=false')] bg-cover bg-center" />
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <MapPin className="w-10 h-10 text-red-500 drop-shadow-lg" />
                  <span className="bg-white dark:bg-zinc-900 px-3 py-1 rounded-full text-[10px] font-bold shadow-xl mt-1">Konumu Sürükle</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. FAQ VE SSS */}
        {activeTab === 'FAQ' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Çiftlerin Sıkça Sorduğu Sorular</h3>
              <button className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Soru Ekle
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 space-y-3">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const newFaqs = [...faqs];
                      newFaqs[idx].question = e.target.value;
                      setFaqs(newFaqs);
                    }}
                    className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-700 pb-2 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => {
                      const newFaqs = [...faqs];
                      newFaqs[idx].answer = e.target.value;
                      setFaqs(newFaqs);
                    }}
                    className="w-full bg-transparent text-xs font-medium text-zinc-500 dark:text-zinc-400 focus:outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Eğer Menüler sekmesi boş kaldıysa kısa bilgi */}
        {activeTab === 'MENUS' && (
          <div className="p-8 text-center text-zinc-500 animate-in fade-in">
            <MenuSquare className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Menü ve Broşürleriniz</h3>
            <p className="text-xs mt-1">Buraya PDF kataloglarınızı yükleyebilir veya dijital menülerinizi oluşturabilirsiniz.</p>
          </div>
        )}

      </div>

      {/* FLOATING ACTION BAR (KAYDET BUTONU) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/90 dark:bg-white/90 backdrop-blur-xl border border-zinc-800 dark:border-zinc-200 px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[11px] font-bold text-white dark:text-zinc-900">Değişiklikleriniz Kaydedilmedi</span>
        </div>
        <button
          onClick={handleSaveAndSubmitReview}
          disabled={isPending}
          className="px-6 py-2 rounded-full bg-white text-zinc-900 dark:bg-black dark:text-white text-xs font-black shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
        >
          {isPending ? 'Gönderiliyor...' : <><Save className="w-4 h-4" /> Onaya Gönder & Kaydet</>}
        </button>
      </div>

    </div>
  );
}