'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

interface Guest {
  id: string;
  name: string;
  side: 'Gelin Tarafı' | 'Damat Tarafı' | 'Ortak Arkadaşlar' | 'Aile & Akraba';
  status: 'Katılıyor' | 'Katılmıyor' | 'Beklemede';
  tableNo: string;
  plusCount: number;
  phone?: string;
}

export default function PublicRSVPPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [existingGuests, setExistingGuests] = useState<Guest[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    side: 'Ortak Arkadaşlar' as Guest['side'],
    status: 'Katılıyor' as Guest['status'],
    plusCount: 0,
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Çiftin Davetli Listesi Verisini Çek
  useEffect(() => {
    async function fetchGuestlist() {
      try {
        const docRef = doc(db, 'guestlists', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().guests) {
          setExistingGuests(docSnap.data().guests);
        }
      } catch (error) {
        console.error('LCV veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGuestlist();
  }, [id]);

  // LCV Formunu Gönder
  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      const newGuestItem: Guest = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        side: formData.side,
        status: formData.status,
        tableNo: 'Atanmadı',
        plusCount: Number(formData.plusCount) || 0,
        phone: formData.phone,
      };

      const updatedList = [newGuestItem, ...existingGuests];
      const docRef = doc(db, 'guestlists', id);

      await updateDoc(docRef, {
        guests: updatedList,
        updatedAt: new Date().toISOString(),
      });

      setSubmitted(true);
    } catch (error) {
      console.error('LCV gönderme hatası:', error);
      alert('Yanıtınız iletilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBFD]">
        <p className="text-[#4A154B] font-bold">Davetiye yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800 flex flex-col justify-between">
      {/* Header */}
      <header className="py-6 text-center border-b border-purple-100 bg-white shadow-sm">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
          Dijital Düğün Katılım Formu (LCV)
        </p>
      </header>

      {/* İçerik */}
      <main className="max-w-lg mx-auto w-full px-4 py-8">
        {submitted ? (
          <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-xl text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
              🎉
            </div>
            <h1 className="text-xl font-extrabold text-[#4A154B]">Yanıtınız İletildi!</h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              Katılım durumunuz çifte başarıyla bildirildi. Bu özel günde bir arada olmak dileğiyle! ✨
            </p>
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/"
                className="inline-block bg-[#4A154B] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-purple-900 transition"
              >
                WedyPlan'ı Keşfet
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-purple-100 shadow-xl space-y-6">
            <div className="text-center space-y-1">
              <span className="bg-pink-50 text-[#E6007E] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                Düğün Katılım Bildirimi
              </span>
              <h1 className="text-2xl font-extrabold text-[#4A154B]">Katılım Durumunuzu Bildirin 💍</h1>
              <p className="text-xs text-slate-500">
                Lütfen aşağıdaki kısa formu doldurarak katılım durumunuzu teyit ediniz.
              </p>
            </div>

            <form onSubmit={handleSubmitRSVP} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Adınız ve Soyadınız</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Ahmet Yılmaz"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Telefon Numaranız</label>
                <input
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kim Tarafındansınız?</label>
                  <select
                    value={formData.side}
                    onChange={(e) => setFormData({ ...formData, side: e.target.value as Guest['side'] })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white"
                  >
                    <option value="Gelin Tarafı">Gelin Tarafı</option>
                    <option value="Damat Tarafı">Damat Tarafı</option>
                    <option value="Ortak Arkadaşlar">Ortak Arkadaşlar</option>
                    <option value="Aile & Akraba">Aile & Akraba</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Katılım Durumu</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Guest['status'] })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white font-bold"
                  >
                    <option value="Katılıyor">✓ Katılıyorum</option>
                    <option value="Katılmıyor">✕ Katılamıyorum</option>
                  </select>
                </div>
              </div>

              {formData.status === 'Katılıyor' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Yanınızda Gelecek Ek Kişi Sayısı (+1)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={formData.plusCount}
                    onChange={(e) => setFormData({ ...formData, plusCount: Number(e.target.value) })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Sadece siz gelecekseniz 0 bırakabilirsiniz.
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E6007E] hover:bg-pink-700 text-white font-bold text-xs py-3.5 rounded-xl transition shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Katılım Bilgimi İlet'}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-[11px] text-slate-400 border-t border-purple-100 bg-white">
        <p>Powered by WedyPlan Dijital Düğün Asistanı</p>
      </footer>
    </div>
  );
}