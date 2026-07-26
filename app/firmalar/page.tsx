'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicVendorCard, PublicVendor } from '@/components/public/PublicVendorCard';
import { Filter, Sparkles, X } from 'lucide-react';

function VendorListContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialCity = searchParams.get('city') || '';

  const [vendors, setVendors] = useState<PublicVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [cityFilter, setCityFilter] = useState(initialCity);

  // WedyAI Teklif Modalı State
  const [selectedVendorForQuote, setSelectedVendorForQuote] = useState<PublicVendor | null>(null);
  const [quoteForm, setQuoteForm] = useState({ fullName: '', phone: '', weddingDate: '' });
  const [submittingQuote, setSubmittingQuote] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const snap = await getDocs(collection(db, 'vendors'));
        const list: PublicVendor[] = [];
        snap.forEach((d) => list.push({ id: d.id, ...d.data() } as PublicVendor));
        setVendors(list);
      } catch (err) {
        console.error('Firmalar çekilemedi:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter((v) => {
    const matchesCategory = selectedCategory ? v.category.toLowerCase().includes(selectedCategory.toLowerCase()) : true;
    const matchesCity = cityFilter ? v.city.toLowerCase().includes(cityFilter.toLowerCase()) : true;
    return matchesCategory && matchesCity;
  });

  const handleSendQuoteRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVendorForQuote) return;

    setSubmittingQuote(true);
    try {
      await addDoc(collection(db, 'requests'), {
        vendorId: selectedVendorForQuote.id,
        vendorName: selectedVendorForQuote.name,
        fullName: quoteForm.fullName,
        phone: quoteForm.phone,
        weddingDate: quoteForm.weddingDate,
        createdAt: serverTimestamp(),
      });
      alert(`Harika! ${selectedVendorForQuote.name} firmasına WedyAI teklif talebiniz başarıyla iletildi.`);
      setSelectedVendorForQuote(null);
      setQuoteForm({ fullName: '', phone: '', weddingDate: '' });
    } catch (err) {
      alert('Teklif gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setSubmittingQuote(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-[#1D1D1F]">
      <PublicNavbar />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 space-y-6">
        <div>
          <h1 className="text-[28px] sm:text-[36px] font-serif font-semibold text-[#1D1D1F]">
            Düğün Hizmet Sağlayıcıları
          </h1>
          <p className="text-[13px] text-[#6E6E73]">
            Şehrinizdeki en iyi salonları, fotoğrafçıları ve organizasyon firmalarını bulun.
          </p>
        </div>

        {/* Filtre Barı */}
        <div className="bg-white p-4 rounded-[20px] border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-[#E6007E]" />
            <span className="text-[12px] font-bold text-[#1D1D1F]">Filtreler:</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto p-2 border border-slate-200 rounded-xl text-[12px] font-semibold text-[#1D1D1F] bg-white outline-none"
            >
              <option value="">Tüm Kategoriler</option>
              <option value="Düğün Salonu">Düğün Salonu</option>
              <option value="Kır Bahçesi">Kır Bahçesi</option>
              <option value="Fotoğrafçı">Fotoğrafçı</option>
              <option value="Gelinlik">Gelinlik</option>
              <option value="Organizasyon">Organizasyon</option>
            </select>

            <input
              type="text"
              placeholder="Şehir Ara (Örn: İstanbul)"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full sm:w-auto p-2 border border-slate-200 rounded-xl text-[12px] text-[#1D1D1F] outline-none"
            />
          </div>
        </div>

        {/* Firma Listesi */}
        {loading ? (
          <p className="text-center text-xs text-slate-400 py-12">Yükleniyor...</p>
        ) : filteredVendors.length === 0 ? (
          <p className="text-center text-xs text-slate-400 py-12">Seçilen filtrelere uygun firma bulunamadı.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <PublicVendorCard
                key={vendor.id}
                vendor={vendor}
                onSelectVendorForQuote={(v) => setSelectedVendorForQuote(v)}
              />
            ))}
          </div>
        )}
      </div>

      {/* WedyAI Teklif İste Modal */}
      {selectedVendorForQuote && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 space-y-4 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedVendorForQuote(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#E6007E] bg-pink-50 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> WedyAI Akıllı Teklif
              </span>
              <h3 className="font-serif font-bold text-[20px] text-[#1D1D1F]">
                {selectedVendorForQuote.name}
              </h3>
              <p className="text-[12px] text-[#6E6E73]">
                Bilgilerinizi girin, WedyAI firma ile anında iletişim kursun.
              </p>
            </div>

            <form onSubmit={handleSendQuoteRequest} className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Ad Soyad</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Selin Yılmaz"
                  value={quoteForm.fullName}
                  onChange={(e) => setQuoteForm({ ...quoteForm, fullName: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Telefon Numarası</label>
                <input
                  type="tel"
                  required
                  placeholder="0532 xxx xx xx"
                  value={quoteForm.phone}
                  onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Tahmini Düğün Tarihi</label>
                <input
                  type="date"
                  required
                  value={quoteForm.weddingDate}
                  onChange={(e) => setQuoteForm({ ...quoteForm, weddingDate: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
              </div>

              <button
                type="submit"
                disabled={submittingQuote}
                className="w-full bg-[#E6007E] text-white text-xs font-bold py-3 rounded-xl hover:bg-pink-700 transition shadow-md shadow-pink-200 cursor-pointer disabled:opacity-50"
              >
                {submittingQuote ? 'İletiliyor...' : 'WedyAI İle Teklif Talebi Gönder'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PublicVendorsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Yükleniyor...</div>}>
      <VendorListContent />
    </Suspense>
  );
}