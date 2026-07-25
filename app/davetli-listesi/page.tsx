'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

interface Guest {
  id: string;
  name: string;
  side: 'Gelin Tarafı' | 'Damat Tarafı' | 'Ortak Arkadaşlar' | 'Aile & Akraba';
  status: 'Katılıyor' | 'Katılmıyor' | 'Beklemede';
  tableNo: string;
  plusCount: number;
  phone?: string;
}

const DEFAULT_GUESTS: Guest[] = [
  { id: '1', name: 'Ahmet Yılmaz', side: 'Damat Tarafı', status: 'Katılıyor', tableNo: 'Masa 1', plusCount: 1, phone: '05551112233' },
  { id: '2', name: 'Ayşe Kaya', side: 'Gelin Tarafı', status: 'Katılıyor', tableNo: 'Masa 2', plusCount: 0, phone: '05552223344' },
  { id: '3', name: 'Mehmet Demir', side: 'Ortak Arkadaşlar', status: 'Beklemede', tableNo: 'Atanmadı', plusCount: 1, phone: '05553334455' },
  { id: '4', name: 'Zeynep Çelik', side: 'Aile & Akraba', status: 'Katılmıyor', tableNo: 'Atanmadı', plusCount: 0, phone: '05554445566' },
];

export default function GuestListPage() {
  const [user, setUser] = useState<User | null>(null);
  const [guests, setGuests] = useState<Guest[]>(DEFAULT_GUESTS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Filtreleme State'leri
  const [filterSide, setFilterSide] = useState<string>('Tümü');
  const [filterStatus, setFilterStatus] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Yeni Davetli Form State
  const [newGuest, setNewGuest] = useState({
    name: '',
    side: 'Gelin Tarafı' as Guest['side'],
    status: 'Beklemede' as Guest['status'],
    tableNo: 'Atanmadı',
    plusCount: 0,
    phone: '',
  });

  // Oturum ve Veri Yükleme
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const docRef = doc(db, 'guestlists', currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().guests) {
            setGuests(docSnap.data().guests);
          } else {
            const savedGuests = localStorage.getItem('wedy_guest_list');
            if (savedGuests) setGuests(JSON.parse(savedGuests));
          }
        } catch (error) {
          console.error('Bulut davetli verisi çekme hatası:', error);
        }
      } else {
        try {
          const savedGuests = localStorage.getItem('wedy_guest_list');
          if (savedGuests) setGuests(JSON.parse(savedGuests));
        } catch (e) {
          console.error('Yerel veri yükleme hatası:', e);
        }
      }
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  // Değişiklikleri Otomatik Kaydetme
  useEffect(() => {
    if (!isLoaded) return;

    const saveData = async () => {
      setIsSaving(true);
      try {
        if (user) {
          await setDoc(doc(db, 'guestlists', user.uid), {
            guests,
            updatedAt: new Date().toISOString(),
          });
        } else {
          localStorage.setItem('wedy_guest_list', JSON.stringify(guests));
        }
      } catch (error) {
        console.error('Kaydetme hatası:', error);
      } finally {
        setTimeout(() => setIsSaving(false), 400);
      }
    };

    saveData();
  }, [guests, user, isLoaded]);

  // Yeni Davetli Ekle
  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuest.name.trim()) return;

    const guestItem: Guest = {
      id: Date.now().toString(),
      ...newGuest,
    };

    setGuests([guestItem, ...guests]);
    setNewGuest({
      name: '',
      side: 'Gelin Tarafı',
      status: 'Beklemede',
      tableNo: 'Atanmadı',
      plusCount: 0,
      phone: '',
    });
  };

  // Durum Değiştir
  const handleStatusChange = (id: string, newStatus: Guest['status']) => {
    setGuests(prev =>
      prev.map(g => (g.id === id ? { ...g, status: newStatus } : g))
    );
  };

  // Davetli Sil
  const handleDeleteGuest = (id: string) => {
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  // İstatistikler
  const totalInvited = guests.reduce((sum, g) => sum + 1 + Number(g.plusCount), 0);
  const confirmedCount = guests
    .filter(g => g.status === 'Katılıyor')
    .reduce((sum, g) => sum + 1 + Number(g.plusCount), 0);
  const declinedCount = guests
    .filter(g => g.status === 'Katılmıyor')
    .reduce((sum, g) => sum + 1 + Number(g.plusCount), 0);
  const pendingCount = guests
    .filter(g => g.status === 'Beklemede')
    .reduce((sum, g) => sum + 1 + Number(g.plusCount), 0);

  // Filtrelenmiş Liste
  const filteredGuests = guests.filter(g => {
    const matchesSide = filterSide === 'Tümü' || g.side === filterSide;
    const matchesStatus = filterStatus === 'Tümü' || g.status === filterStatus;
    const matchesSearch =
      !searchQuery ||
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tableNo.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSide && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/kontrol-listesi" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
            ⏳ Planlama Sayacı
          </Link>
          <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
            ← Ana Sayfa
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Başlık ve Bulut Rozeti */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="bg-purple-100 text-[#4A154B] text-xs font-bold px-3 py-1 rounded-full uppercase">
              Oturma Planı & LCV Takibi
            </span>
            {user ? (
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full">
                ☁️ {isSaving ? 'Kaydediliyor...' : 'Bulut Senkronize'}
              </span>
            ) : (
              <Link
                href="/login"
                className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-full transition"
              >
                💾 Cihaza Kayıtlı (Hesabına Kaydet)
              </Link>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#4A154B]">
            Masa & Davetli Listesi Düzenleyici 🎟️
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Davetlilerinizi gruplandırın, LCV durumlarını yönetin ve masalara zahmetsizce atayın.
          </p>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm text-center">
            <span className="text-xs font-bold text-slate-400 uppercase">Toplam Davetli</span>
            <p className="text-2xl md:text-3xl font-extrabold text-[#4A154B] mt-1">{totalInvited} Kişi</p>
          </div>
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 text-center">
            <span className="text-xs font-bold text-emerald-600 uppercase">Katılanlar</span>
            <p className="text-2xl md:text-3xl font-extrabold text-emerald-700 mt-1">{confirmedCount} Kişi</p>
          </div>
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 text-center">
            <span className="text-xs font-bold text-amber-600 uppercase">Yanıt Bekleyen</span>
            <p className="text-2xl md:text-3xl font-extrabold text-amber-700 mt-1">{pendingCount} Kişi</p>
          </div>
          <div className="bg-red-50 p-5 rounded-2xl border border-red-100 text-center">
            <span className="text-xs font-bold text-red-500 uppercase">Katılmayanlar</span>
            <p className="text-2xl md:text-3xl font-extrabold text-red-600 mt-1">{declinedCount} Kişi</p>
          </div>
        </div>

        {/* Davetli Ekleme Formu */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#4A154B]">➕ Yeni Davetli Ekle</h2>
          <form onSubmit={handleAddGuest} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3">
            <input
              type="text"
              required
              placeholder="Ad Soyad"
              value={newGuest.name}
              onChange={e => setNewGuest({ ...newGuest, name: e.target.value })}
              className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] md:col-span-2"
            />
            <select
              value={newGuest.side}
              onChange={e => setNewGuest({ ...newGuest, side: e.target.value as Guest['side'] })}
              className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white"
            >
              <option value="Gelin Tarafı">Gelin Tarafı</option>
              <option value="Damat Tarafı">Damat Tarafı</option>
              <option value="Ortak Arkadaşlar">Ortak Arkadaşlar</option>
              <option value="Aile & Akraba">Aile & Akraba</option>
            </select>
            <input
              type="text"
              placeholder="Masa No (Örn: Masa 3)"
              value={newGuest.tableNo}
              onChange={e => setNewGuest({ ...newGuest, tableNo: e.target.value })}
              className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />
            <input
              type="number"
              min="0"
              placeholder="+ Yanındaki Kişi"
              value={newGuest.plusCount || ''}
              onChange={e => setNewGuest({ ...newGuest, plusCount: Number(e.target.value) })}
              className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />
            <button
              type="submit"
              className="bg-[#E6007E] text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-pink-700 transition shadow"
            >
              Ekle
            </button>
          </form>
        </div>

        {/* Filtre ve Arama Alanı */}
        <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="İsim veya masa no ara..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full md:w-64 p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
          />

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={filterSide}
              onChange={e => setFilterSide(e.target.value)}
              className="p-2.5 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none"
            >
              <option value="Tümü">Tüm Taraf Grupları</option>
              <option value="Gelin Tarafı">Gelin Tarafı</option>
              <option value="Damat Tarafı">Damat Tarafı</option>
              <option value="Ortak Arkadaşlar">Ortak Arkadaşlar</option>
              <option value="Aile & Akraba">Aile & Akraba</option>
            </select>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="p-2.5 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none"
            >
              <option value="Tümü">Tüm LCV Durumları</option>
              <option value="Katılıyor">Katılanlar</option>
              <option value="Katılmıyor">Katılmayanlar</option>
              <option value="Beklemede">Bekleyenler</option>
            </select>
          </div>
        </div>

        {/* Davetli Tablosu */}
        <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-[#4A154B] uppercase">
                  <th className="p-4">Davetli Adı</th>
                  <th className="p-4">Taraf / Grup</th>
                  <th className="p-4">Kişi Sayısı</th>
                  <th className="p-4">Atanan Masa</th>
                  <th className="p-4">LCV Durumu</th>
                  <th className="p-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                      Aramanıza uygun davetli bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map(guest => (
                    <tr key={guest.id} className="hover:bg-purple-50/20 transition">
                      <td className="p-4 font-bold text-slate-800">{guest.name}</td>
                      <td className="p-4">
                        <span className="bg-purple-100 text-[#4A154B] text-[10px] font-bold px-2.5 py-1 rounded-md">
                          {guest.side}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-slate-600">
                        1 {guest.plusCount > 0 ? `(+${guest.plusCount} Kişi)` : ''}
                      </td>
                      <td className="p-4 font-bold text-slate-700">
                        📍 {guest.tableNo || 'Atanmadı'}
                      </td>
                      <td className="p-4">
                        <select
                          value={guest.status}
                          onChange={e => handleStatusChange(guest.id, e.target.value as Guest['status'])}
                          className={`p-1.5 rounded-lg text-xs font-bold border focus:outline-none ${
                            guest.status === 'Katılıyor'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : guest.status === 'Katılmıyor'
                              ? 'bg-red-50 text-red-600 border-red-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <option value="Katılıyor">✓ Katılıyor</option>
                          <option value="Beklemede">⏳ Beklemede</option>
                          <option value="Katılmıyor">✕ Katılmıyor</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="text-slate-300 hover:text-red-500 font-bold p-1"
                          title="Davetliyi Sil"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}