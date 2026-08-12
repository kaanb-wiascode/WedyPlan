'use client';

import React, { useState, useMemo, useTransition } from 'react';
import { submitProfileForReviewAction } from '@/lib/actions/vendor-profile-sync';
import {
  Store, Info, Camera, MapPin, HelpCircle, Gift, Building2, MenuSquare,
  Sparkles, Save, Clock, Upload, Plus, Trash2, Users,
  ShieldCheck, Check, Globe, Share2, Video, FileText, CheckCircle2
} from 'lucide-react';

export default function VendorProfileManagementPage() {
  const [isPending, startTransition] = useTransition();
  const [moderationStatus, setModerationStatus] = useState<'APPROVED' | 'PENDING_APPROVAL'>('APPROVED');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 7 ANA SEKME
  const tabs = [
    { id: 'GENERAL', label: 'Genel Bilgiler', icon: Info },
    { id: 'GALLERY', label: 'Galeri & Medya', icon: Camera },
    { id: 'VENUES', label: 'Alanlar & Kapasite', icon: Building2 },
    { id: 'MENUS', label: 'Menüler & Hizmetler', icon: MenuSquare },
    { id: 'CAMPAIGNS', label: 'Kampanyalar', icon: Gift },
    { id: 'LOCATION', label: 'Konum & Ulaşım (Maps)', icon: MapPin },
    { id: 'FAQ', label: 'SSS & Neden Biz', icon: HelpCircle },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // 1. GENEL BİLGİLER STATE
  const [generalData, setGeneralData] = useState({
    companyName: 'WedyPlan Premium Düğün Salonu',
    category: 'Kır Düğünü & Otel',
    aboutText: '',
    contactName: '',
    contactTitle: '',
    contactPhone: '',
    contactEmail: '',
    socials: { instagram: '', linkedin: '', website: '', youtube: '' }
  });

  // 2. GALERİ YÜKLEME STATE
  const [gallery, setGallery] = useState<{ id: string, name: string, isCover: boolean }[]>([]);

  // 3. ALANLAR & KAPASİTE STATE
  const [capacities, setCapacities] = useState({ seated: 0, cocktail: 0, parking: 0 });
  const [features, setFeatures] = useState<string[]>([]);
  const featureOptions = ['Deniz Manzarası', 'Kolonsuz Salon', 'Yüksek Tavan', 'After Party Alanı', 'Engelli Girişi', 'Açılır Kapanır Tavan', 'Doğa İçi', 'Havuz Başı', 'Jeneratör', 'Vale Hizmeti', 'Açık Hava', 'Kapalı Alan'];

  // 4. MENÜ & HİZMETLER STATE
  const [menus, setMenus] = useState<{ id: string, title: string, price: string, content: string, isPdf: boolean }[]>([]);
  const [newMenu, setNewMenu] = useState({ title: '', price: '', content: '', isPdf: false });

  // 5. KAMPANYALAR STATE
  const [campaigns, setCampaigns] = useState<{ id: string, title: string, discount: string, expiry: string, reqShowcase: boolean }[]>([]);
  const [newCampaign, setNewCampaign] = useState({ title: '', discount: '', expiry: '', reqShowcase: false });

  // 6. KONUM & GOOGLE MAPS STATE
  const [location, setLocation] = useState({ address: '', transportNotes: '', lat: '41.0082', lng: '28.9784' });

  // 7. SSS & NEDEN BİZ (USPs) STATE
  const [faqs, setFaqs] = useState<{ question: string, answer: string }[]>([]);
  const [usps, setUsps] = useState<string[]>([]);
  const [newUsp, setNewUsp] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // WedyAI SEO Skoru Hesaplaması
  const completionScore = useMemo(() => {
    let score = 20;
    if (generalData.aboutText.length > 30) score += 15;
    if (generalData.socials.instagram) score += 10;
    if (capacities.seated > 0) score += 15;
    if (menus.length > 0) score += 15;
    if (campaigns.length > 0) score += 10;
    if (faqs.length > 0) score += 15;
    return Math.min(score, 100);
  }, [generalData, capacities, menus, campaigns, faqs]);

  // 🍏 DEĞİŞİKLİKLERİ KAYDET VE MODERASYON ONAYINA GÖNDER
  const handleSaveProfile = () => {
    startTransition(async () => {
      const payload = {
        companyName: generalData.companyName,
        category: generalData.category,
        aboutText: generalData.aboutText,
        socialLinks: generalData.socials,
        contact: { name: generalData.contactName, title: generalData.contactTitle, phone: generalData.contactPhone, email: generalData.contactEmail },
        capacities,
        features,
        faqs,
        campaigns: campaigns.map(c => ({ title: c.title, discount: c.discount, requestHomepageShowcase: c.reqShowcase })),
        location: { address: location.address, lat: location.lat, lng: location.lng }
      };

      const res = await submitProfileForReviewAction(payload);
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
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* MODERASYON DURUM BARU */}
      <div className="space-y-4">
        {moderationStatus === 'PENDING_APPROVAL' ? (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-center gap-4">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <h4 className="text-xs font-bold">Profil Güncellemeleriniz Moderasyon Onayı Bekliyor</h4>
              <p className="text-[11px] mt-0.5 opacity-80">Değişiklikleriniz platform yetkisi tarafından inceleniyor. Onaylandıktan sonra çiftlerin gördüğü canlı sayfada yayına alınacaktır.</p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 flex items-center gap-4">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-xs font-bold">Profiliniz Canlıda Yayında!</h4>
              <p className="text-[11px] mt-0.5 opacity-80">Girdiğiniz tüm bilgiler çiftlerin arama ve detay sayfalarında aktiftir.</p>
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className="p-8 rounded-3xl apple-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40">
              <Store className="w-3.5 h-3.5" /> <span>Firma Paneli Vitrin Yönetimi</span>
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Profil Yönetimi</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Çiftlerin vitrinde göreceği tüm kurumsal verileri, menüleri, kampanyaları ve harita konumunu buradan girin.</p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <div className="text-right">
              <span className="text-[10px] font-bold text-zinc-400 uppercase">Profil Doluluğu</span>
              <div className="text-xl font-black text-zinc-900 dark:text-white">%{completionScore}</div>
            </div>
            <div className="w-2.5 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden flex flex-col justify-end">
              <div className="bg-emerald-500 w-full transition-all duration-500" style={{ height: `${completionScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 7 ANA SEKME */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-200/60 dark:border-zinc-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
                isActive ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs' : 'bg-white/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* SEKME İÇERİKLERİ */}
      <div className="apple-glass rounded-[28px] p-6 sm:p-8 min-h-[500px]">
        
        {/* SEKME 1: GENEL BİLGİLER & İLETİŞİM */}
        {activeTab === 'GENERAL' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-500">Firma / Mekan Unvanı</label>
                <input type="text" value={generalData.companyName} onChange={e => setGeneralData({...generalData, companyName: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs font-medium" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-500">Kategori</label>
                <input type="text" value={generalData.category} disabled className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border text-xs font-medium cursor-not-allowed opacity-60" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-500">Firma / Tesis Hakkında Detaylı Bilgi (Hikayeniz)</label>
              <textarea rows={5} placeholder="Tesisinizin sunduğu ayrıcalıkları, tarihçesini ve çiftlere sunduğunuz atmosferi detaylıca yazın..." value={generalData.aboutText} onChange={e => setGeneralData({...generalData, aboutText: e.target.value})} className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs font-medium" />
            </div>

            <div className="border-t border-zinc-200/60 dark:border-zinc-800 pt-6">
              <h3 className="text-sm font-bold mb-4">Yetkili İletişim Bilgileri</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <input type="text" placeholder="Yetkili Ad Soyad" value={generalData.contactName} onChange={e => setGeneralData({...generalData, contactName: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs" />
                <input type="text" placeholder="Unvan (Örn: Satış Müdürü)" value={generalData.contactTitle} onChange={e => setGeneralData({...generalData, contactTitle: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs" />
                <input type="text" placeholder="Doğrudan Telefon" value={generalData.contactPhone} onChange={e => setGeneralData({...generalData, contactPhone: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs" />
                <input type="email" placeholder="Kurumsal E-posta" value={generalData.contactEmail} onChange={e => setGeneralData({...generalData, contactEmail: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs" />
              </div>
            </div>

            <div className="border-t border-zinc-200/60 dark:border-zinc-800 pt-6">
              <h3 className="text-sm font-bold mb-4">Sosyal Medya Bağlantıları</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative flex items-center">
                  <Share2 className="w-4 h-4 text-zinc-400 absolute left-3" />
                  <input type="text" placeholder="Instagram Profil Linki" value={generalData.socials.instagram} onChange={e => setGeneralData({...generalData, socials: {...generalData.socials, instagram: e.target.value}})} className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs" />
                </div>
                <div className="relative flex items-center">
                  <Globe className="w-4 h-4 text-zinc-400 absolute left-3" />
                  <input type="text" placeholder="Web Siteniz" value={generalData.socials.website} onChange={e => setGeneralData({...generalData, socials: {...generalData.socials, website: e.target.value}})} className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs" />
                </div>
                <div className="relative flex items-center">
                  <Video className="w-4 h-4 text-zinc-400 absolute left-3" />
                  <input type="text" placeholder="YouTube Tanıtım Videosu Linki" value={generalData.socials.youtube} onChange={e => setGeneralData({...generalData, socials: {...generalData.socials, youtube: e.target.value}})} className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs" />
                </div>
                <div className="relative flex items-center">
                  <Globe className="w-4 h-4 text-zinc-400 absolute left-3" />
                  <input type="text" placeholder="LinkedIn Şirket Sayfası" value={generalData.socials.linkedin} onChange={e => setGeneralData({...generalData, socials: {...generalData.socials, linkedin: e.target.value}})} className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border text-xs" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 2: GALERİ VE MEDYA */}
        {activeTab === 'GALLERY' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-8 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl text-center bg-zinc-50/50 dark:bg-zinc-800/20 relative">
              <input type="file" multiple accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  showToast(`${e.target.files.length} adet yeni fotoğraf eklendi.`);
                  setGallery([...gallery, { id: Date.now().toString(), name: e.target.files[0].name, isCover: false }]);
                }
              }} />
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-5 h-5 text-zinc-500" />
              </div>
              <h3 className="text-sm font-bold">Vitrin & Galeri Fotoğraflarını Yükleyin</h3>
              <p className="text-xs text-zinc-500 mt-1 mb-4">Sürükleyip bırakın veya bilgisayarınızdan dosya seçin.</p>
              <button className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold shadow-xs cursor-pointer">Dosya Seç</button>
            </div>
            
            {gallery.length > 0 && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-xs font-bold">
                Yüklenmiş {gallery.length} adet fotoğrafınız listede hazır.
              </div>
            )}
          </div>
        )}

        {/* SEKME 3: ALANLAR VE KAPASİTE */}
        {activeTab === 'VENUES' && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><Users className="w-4 h-4" /> Salon / Tesis Kapasiteleri</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">Yemekli Düğün Kapasitesi</label>
                  <input type="number" placeholder="0" value={capacities.seated || ''} onChange={(e) => setCapacities({...capacities, seated: parseInt(e.target.value) || 0})} className="w-full bg-transparent text-xl font-black mt-2 focus:outline-none" />
                </div>
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">Kokteyl Kapasitesi</label>
                  <input type="number" placeholder="0" value={capacities.cocktail || ''} onChange={(e) => setCapacities({...capacities, cocktail: parseInt(e.target.value) || 0})} className="w-full bg-transparent text-xl font-black mt-2 focus:outline-none" />
                </div>
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">Otopark Araç Sayısı</label>
                  <input type="number" placeholder="0" value={capacities.parking || ''} onChange={(e) => setCapacities({...capacities, parking: parseInt(e.target.value) || 0})} className="w-full bg-transparent text-xl font-black mt-2 focus:outline-none" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-4">Öne Çıkan Salon Özellikleri (Arama Filtreleri)</h3>
              <div className="flex flex-wrap gap-2">
                {featureOptions.map((feat) => {
                  const isSelected = features.includes(feat);
                  return (
                    <button key={feat} onClick={() => {
                        setFeatures(isSelected ? features.filter(f => f !== feat) : [...features, feat]);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all ${
                        isSelected ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-xs' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 inline-block mr-1" />} {feat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SEKME 4: MENÜLER VE HİZMETLER */}
        {activeTab === 'MENUS' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="p-6 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 space-y-4">
              <h3 className="text-sm font-bold">Yeni Menü veya Paket Oluştur</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Menü / Paket Adı (Örn: Platinum Yemek Menüsü)" value={newMenu.title} onChange={e => setNewMenu({...newMenu, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-xs" />
                <input type="text" placeholder="Kişi Başı Başlangıç Fiyatı (Örn: 1.500 ₺)" value={newMenu.price} onChange={e => setNewMenu({...newMenu, price: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-xs" />
              </div>
              <textarea rows={3} placeholder="Menü Detayı (Ordövr, Ana Yemek, Tatlı, İkramlar...)" value={newMenu.content} onChange={e => setNewMenu({...newMenu, content: e.target.value})} className="w-full p-4 rounded-xl border text-xs" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-zinc-200 dark:border-zinc-700 pt-4 gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                  <input type="checkbox" checked={newMenu.isPdf} onChange={e => setNewMenu({...newMenu, isPdf: e.target.checked})} className="w-4 h-4 rounded border-zinc-300" />
                  PDF Menü Kataloğu Ekleyeceğim
                </label>
                <button onClick={() => {
                  if(!newMenu.title) return;
                  setMenus([...menus, { id: Date.now().toString(), ...newMenu }]);
                  setNewMenu({ title: '', price: '', content: '', isPdf: false });
                  showToast('Yeni menü eklendi.');
                }} className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold cursor-pointer shrink-0"><Plus className="w-4 h-4 inline mr-1" /> Menüyü Kaydet</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menus.map((menu) => (
                <div key={menu.id} className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 relative space-y-2">
                  <button onClick={() => setMenus(menus.filter(m => m.id !== menu.id))} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1 rounded-md cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white pr-8">{menu.title}</h4>
                  <div className="text-xs font-bold text-emerald-600">{menu.price}</div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{menu.content}</p>
                  {menu.isPdf && <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-md"><FileText className="w-3 h-3" /> PDF Katalog Dahil</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEKME 5: KAMPANYALAR VE FIRSATLAR */}
        {activeTab === 'CAMPAIGNS' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="p-6 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 space-y-4">
              <h3 className="text-sm font-bold">Yeni Kampanya veya Fırsat Tanımla</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" placeholder="Kampanya Başlığı (Örn: Erken Rezervasyon Fırsatı)" value={newCampaign.title} onChange={e => setNewCampaign({...newCampaign, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-xs sm:col-span-2" />
                <input type="text" placeholder="İndirim / Hediye (Örn: %20 veya Ücretsiz Orkestra)" value={newCampaign.discount} onChange={e => setNewCampaign({...newCampaign, discount: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-xs" />
              </div>
              <input type="text" placeholder="Son Geçerlilik Tarihi (Örn: 30 Eylül 2026)" value={newCampaign.expiry} onChange={e => setNewCampaign({...newCampaign, expiry: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-xs" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-zinc-200 dark:border-zinc-700 pt-4 gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-800">
                  <input type="checkbox" checked={newCampaign.reqShowcase} onChange={e => setNewCampaign({...newCampaign, reqShowcase: e.target.checked})} className="w-4 h-4 rounded border-amber-300" />
                  <Gift className="w-4 h-4" /> Platform Ana Sayfasındaki "Öne Çıkanlar" Vitrini İçin Onay İste
                </label>
                <button onClick={() => {
                  if(!newCampaign.title) return;
                  setCampaigns([...campaigns, { id: Date.now().toString(), ...newCampaign }]);
                  setNewCampaign({ title: '', discount: '', expiry: '', reqShowcase: false });
                  showToast('Kampanya eklendi.');
                }} className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold cursor-pointer shrink-0"><Plus className="w-4 h-4 inline mr-1" /> Kampanya Ekle</button>
              </div>
            </div>

            <div className="space-y-3">
              {campaigns.map(camp => (
                <div key={camp.id} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-black">{camp.discount}</span>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{camp.title}</h4>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1">Son Tarih: {camp.expiry}</p>
                    {camp.reqShowcase && <p className="text-[10px] text-amber-600 font-bold mt-1">Ana Sayfa Vitrin Onayı İstendi</p>}
                  </div>
                  <button onClick={() => setCampaigns(campaigns.filter(c => c.id !== camp.id))} className="text-xs text-red-500 font-semibold hover:underline cursor-pointer">Kaldır</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEKME 6: KONUM VE GOOGLE MAPS */}
        {activeTab === 'LOCATION' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-500">Açık Adres</label>
                  <textarea rows={3} value={location.address} onChange={e => setLocation({...location, address: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-500">Toplu Taşıma & Yol Tarifi Notları</label>
                  <textarea rows={3} placeholder="Metro, otobüs veya özel araç ile nasıl gelinir?" value={location.transportNotes} onChange={e => setLocation({...location, transportNotes: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-xs" />
                </div>
                <div className="flex gap-4">
                  <div className="space-y-1 w-1/2">
                    <label className="text-[10px] text-zinc-500">Enlem (Lat)</label>
                    <input type="text" value={location.lat} onChange={e => setLocation({...location, lat: e.target.value})} className="w-full px-3 py-2 rounded-lg border text-xs font-mono" />
                  </div>
                  <div className="space-y-1 w-1/2">
                    <label className="text-[10px] text-zinc-500">Boylam (Lng)</label>
                    <input type="text" value={location.lng} onChange={e => setLocation({...location, lng: e.target.value})} className="w-full px-3 py-2 rounded-lg border text-xs font-mono" />
                  </div>
                </div>
              </div>
              
              {/* Google Maps Pin Simülasyonu */}
              <div className="aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-3xl relative overflow-hidden flex items-center justify-center border border-zinc-300 dark:border-zinc-700">
                <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=41.0082,28.9784&zoom=14&size=600x400&sensor=false')] bg-cover bg-center" />
                <div className="relative z-10 flex flex-col items-center">
                  <MapPin className="w-10 h-10 text-red-500 drop-shadow-lg animate-bounce" />
                  <span className="bg-white dark:bg-zinc-900 px-3 py-1 rounded-full text-[10px] font-bold shadow-xl mt-1">Google Maps İğneleme</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 7: SSS & NEDEN BİZ */}
        {activeTab === 'FAQ' && (
          <div className="space-y-10 animate-in fade-in">
            {/* Neden Bizi Seçmelisiniz (USPs) */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2">Çiftlerin Sizi Tercih Etme Nedenleri (Öne Çıkan Farklarınız)</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Örn: Kesintisiz Boğaz Manzarası veya 30 Yıllık Tecrübe" value={newUsp} onChange={e => setNewUsp(e.target.value)} className="w-full px-4 py-2 rounded-xl border text-xs" />
                <button onClick={() => { if(newUsp) { setUsps([...usps, newUsp]); setNewUsp(''); }}} className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-xl cursor-pointer shrink-0">Ekle</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {usps.map((usp, idx) => (
                  <span key={idx} className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
                    <Sparkles className="w-3.5 h-3.5" /> {usp}
                    <button onClick={() => setUsps(usps.filter((_, i) => i !== idx))} className="cursor-pointer"><Trash2 className="w-3 h-3 hover:text-red-500" /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* SSS Soru-Cevap */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2">
                <h3 className="text-sm font-bold">Sıkça Sorulan Sorular</h3>
                <button onClick={() => setFaqs([...faqs, { question: '', answer: '' }])} className="px-3.5 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"><Plus className="w-3.5 h-3.5" /> Soru Ekle</button>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/30 relative space-y-2">
                    <button onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))} className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-1 rounded cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                    <input type="text" placeholder="Soru (Örn: Müzik kaçta bitiyor?)" value={faq.question} onChange={e => { const f = [...faqs]; f[idx].question = e.target.value; setFaqs(f); }} className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-700 pb-1 text-sm font-bold focus:outline-none" />
                    <textarea rows={2} placeholder="Cevap yazın..." value={faq.answer} onChange={e => { const f = [...faqs]; f[idx].answer = e.target.value; setFaqs(f); }} className="w-full bg-transparent text-xs text-zinc-600 dark:text-zinc-400 focus:outline-none resize-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FLOATING ACTION BAR (KAYDET VE ONAYA GÖNDER) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/95 dark:bg-white/95 backdrop-blur-xl border border-zinc-800 dark:border-zinc-200 px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10">
        <span className="text-[11px] font-bold text-white dark:text-zinc-900">Girdiğiniz veriler yöneticinin onayına gidecektir</span>
        <button
          onClick={handleSaveProfile}
          disabled={isPending}
          className="px-6 py-2.5 rounded-full bg-white text-zinc-900 dark:bg-black dark:text-white text-xs font-black shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
        >
          {isPending ? 'Gönderiliyor...' : <><Save className="w-4 h-4" /> Tümünü Kaydet & Onaya Gönder</>}
        </button>
      </div>

    </div>
  );
}