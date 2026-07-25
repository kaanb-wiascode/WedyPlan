'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { generateWhatsAppLink } from '../../../lib/whatsapp';

interface LeadRequest {
  id: string;
  vendorName?: string;
  fullName: string;
  phone: string;
  weddingDate: string;
  guestCount?: string;
  message?: string;
  status?: string;
  createdAt?: any;
}

interface Appointment {
  id: string;
  vendorName: string;
  fullName: string;
  phone: string;
  date: string;
  timeSlot: string;
  status?: string;
}

export default function VendorLeadsPage() {
  const [activeTab, setActiveTab] = useState<'requests' | 'appointments'>('requests');
  const [requests, setRequests] = useState<LeadRequest[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Firestore'dan Gelen Talepleri Çek
  const fetchVendorData = async () => {
    setLoading(true);
    try {
      // Teklif Talepleri
      const reqSnap = await getDocs(collection(db, 'requests'));
      const reqList: LeadRequest[] = [];
      reqSnap.forEach((d) => reqList.push({ id: d.id, status: 'Beklemede', ...d.data() } as LeadRequest));
      setRequests(reqList);

      // Randevular
      const appSnap = await getDocs(collection(db, 'appointments'));
      const appList: Appointment[] = [];
      appSnap.forEach((d) => appList.push({ id: d.id, status: 'Onay Bekliyor', ...d.data() } as Appointment));
      setAppointments(appList);
    } catch (error) {
      console.error('Talepler yüklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorData();
  }, []);

  // Teklif Durum Güncelleme
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const docRef = doc(db, 'requests', id);
      await updateDoc(docRef, { status: newStatus });
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    } catch (error) {
      console.error('Status güncelleme hatası:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-purple-100 shadow-sm">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
          <span className="text-[10px] bg-purple-100 text-[#4A154B] px-2.5 py-1 rounded-md ml-2 font-bold uppercase">
            İş Ortağı Paneli
          </span>
        </Link>
        <Link href="/satici" className="text-xs font-semibold text-slate-500 hover:text-[#E6007E]">
          ← İş Ortağı Ana Sayfası
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Üst Bilgi Başlığı */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-[#4A154B]">Gelen Müşteri Talepleri & Randevular 📥</h1>
            <p className="text-xs text-slate-500 mt-1">
              Çiftlerden gelen fiyat teklifi taleplerini ve mekan gezisi randevularını buradan anlık takip edin.
            </p>
          </div>
          <button
            onClick={fetchVendorData}
            className="bg-purple-50 hover:bg-purple-100 text-[#4A154B] text-xs font-bold px-4 py-2.5 rounded-xl border border-purple-200 transition"
          >
            🔄 Verileri Yenile
          </button>
        </div>

        {/* Sekme Değiştirici */}
        <div className="flex gap-3 border-b border-purple-100 pb-2">
          <button
            onClick={() => setActiveTab('requests')}
            className={`text-xs font-bold px-5 py-2.5 rounded-xl transition ${
              activeTab === 'requests'
                ? 'bg-[#4A154B] text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-purple-50'
            }`}
          >
            💬 Fiyat Teklifi Talepleri ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`text-xs font-bold px-5 py-2.5 rounded-xl transition ${
              activeTab === 'appointments'
                ? 'bg-[#4A154B] text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-purple-50'
            }`}
          >
            📅 Mekan Gezisi Randevuları ({appointments.length})
          </button>
        </div>

        {/* Liste Alanı */}
        {loading ? (
          <p className="text-center text-slate-400 text-xs py-12">Talepler yükleniyor...</p>
        ) : activeTab === 'requests' ? (
          /* TEKLİF TALEPLERİ GRID */
          requests.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-purple-100 text-slate-400 text-xs">
              Henüz gelen bir fiyat teklifi talebi bulunmuyor.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requests.map((req) => {
                const waLink = generateWhatsAppLink(
                  req.phone,
                  req.vendorName || 'Firmamız',
                  req.fullName,
                  req.weddingDate,
                  req.message
                );

                return (
                  <div
                    key={req.id}
                    className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold bg-pink-50 text-[#E6007E] px-2.5 py-1 rounded-md">
                          {req.vendorName || 'Firma İlanı'}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            req.status === 'Yanıtlandı'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          ● {req.status}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-800">{req.fullName}</h3>
                      <div className="text-xs text-slate-500 space-y-1">
                        <p>📞 <strong>Telefon:</strong> {req.phone}</p>
                        <p>📅 <strong>Düğün Tarihi:</strong> {req.weddingDate || 'Belirtilmedi'}</p>
                        {req.guestCount && <p>👥 <strong>Davetli Sayısı:</strong> {req.guestCount}</p>}
                        {req.message && (
                          <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-600 italic mt-2">
                            "{req.message}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleUpdateStatus(req.id, req.status === 'Yanıtlandı' ? 'Beklemede' : 'Yanıtlandı')}
                        className="text-[11px] font-bold text-slate-500 hover:text-slate-800 underline"
                      >
                        {req.status === 'Yanıtlandı' ? 'Beklemeye Al' : '✓ Yanıtlandı İşaretle'}
                      </button>

                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow"
                      >
                        <span>💬</span>
                        <span>WhatsApp'tan Yanıtla</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* RANDEVULAR GRID */
          appointments.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-purple-100 text-slate-400 text-xs">
              Henüz oluşturulmuş bir mekan ziyareti randevusu bulunmuyor.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map((app) => (
                <div key={app.id} className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold bg-purple-100 text-[#4A154B] px-2.5 py-1 rounded-md">
                      📍 {app.vendorName}
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                      {app.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{app.fullName}</h3>
                    <p className="text-xs text-slate-500 mt-1">📞 {app.phone}</p>
                    <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-100 mt-2 flex items-center justify-between text-xs font-bold text-[#4A154B]">
                      <span>📅 Tarih: {app.date}</span>
                      <span>⏰ Saat: {app.timeSlot}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}