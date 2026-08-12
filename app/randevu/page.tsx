'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    vendorName: 'Bosphorus Palace Kır Bahçesi',
    fullName: '',
    phone: '',
    date: '',
    timeSlot: '14:00',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        status: 'Onay Bekliyor',
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Randevu hatası:', error);
      alert('Randevu oluşturulamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-purple-100 shadow-sm">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#0071e3]">Plan</span>
        </Link>
        <Link href="/arama" className="text-xs font-semibold text-slate-500 hover:text-[#0071e3]">
          ← Arama Listesine Dön
        </Link>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-12">
        {isSubmitted ? (
          <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
              📅
            </div>
            <h1 className="text-xl font-extrabold text-[#4A154B]">Randevu Talebiniz Alındı!</h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>{formData.vendorName}</strong> yetkilileri seçtiğiniz tarih ({formData.date} - {formData.timeSlot}) için sizinle iletişime geçip randevuyu doğrulayacaktır.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#4A154B] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-purple-900 transition"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-xl space-y-6">
            <div className="space-y-1 text-center">
              <span className="bg-purple-100 text-[#4A154B] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                Ücretsiz Mekan Gezisi
              </span>
              <h1 className="text-2xl font-extrabold text-[#4A154B]">Mekan Turu Randevusu Al 🏛️</h1>
              <p className="text-xs text-slate-500">Mekanı yerinde görmek ve işletme sahibiyle yüz yüze görüşmek için tarih seçin.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mekan / Firma</label>
                <input
                  type="text"
                  disabled
                  value={formData.vendorName}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs bg-slate-50 font-bold text-[#4A154B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Adınız Soyadınız</label>
                <input
                  type="text"
                  required
                  placeholder="Ahmet Yılmaz"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#0071e3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Telefon Numaranız</label>
                <input
                  type="tel"
                  required
                  placeholder="05XX XXX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#0071e3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ziyaret Tarihi</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Saat Dilimi</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#0071e3] bg-white"
                  >
                    <option value="11:00">11:00</option>
                    <option value="14:00">14:00</option>
                    <option value="16:00">16:00</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0071e3] text-white text-xs font-bold py-3.5 rounded-xl hover:bg-pink-700 transition shadow disabled:opacity-50"
              >
                {loading ? 'Randevu Oluşturuluyor...' : 'Randevu Talebini Onayla'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}