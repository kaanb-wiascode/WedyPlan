// app/cift/davetliler/page.tsx
'use client';

import { useEffect, useState, useTransition } from 'react';
import {
  getGuests,
  createGuest,
  updateGuestStatus,
  deleteGuest,
} from '@/lib/actions/guest';

const DEMO_COUPLE_ID = 'demo-couple-123';

export default function DavetlilerPage() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [guestData, setGuestData] = useState<{
    guests: any[];
    stats: {
      totalGuests: number;
      attendingCount: number;
      declinedCount: number;
      pendingCount: number;
    };
  }>({
    guests: [],
    stats: { totalGuests: 0, attendingCount: 0, declinedCount: 0, pendingCount: 0 },
  });

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState('Genel');
  const [plusOne, setPlusOne] = useState(false);

  // Verileri yükle
  const loadData = async () => {
    setLoading(true);
    const res = await getGuests(DEMO_COUPLE_ID);
    if (res.success && res.data) {
      setGuestData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Yeni Davetli Ekle
  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) return;

    startTransition(async () => {
      const res = await createGuest({
        coupleId: DEMO_COUPLE_ID,
        fullName,
        email,
        phone,
        group,
        plusOne,
      });

      if (res.success) {
        setFullName('');
        setEmail('');
        setPhone('');
        setPlusOne(false);
        await loadData();
      }
    });
  };

  // LCV (RSVP) Durumunu Güncelle
  const handleStatusChange = (id: string, status: 'ATTENDING' | 'DECLINED' | 'PENDING') => {
    startTransition(async () => {
      const res = await updateGuestStatus(id, status);
      if (res.success) {
        await loadData();
      }
    });
  };

  // Davetli Sil
  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteGuest(id);
      if (res.success) {
        await loadData();
      }
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Davetli listesi yükleniyor...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Davetli Listesi & LCV Yönetimi</h1>
        <p className="text-sm text-gray-500 mt-1">Düğününüze katılacak davetlileri ve katılım durumlarını takip edin.</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white/70 backdrop-blur-md rounded-xl border shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-semibold">Toplam Davetli</p>
          <p className="text-2xl font-bold text-gray-800">{guestData.stats.totalGuests}</p>
        </div>
        <div className="p-4 bg-white/70 backdrop-blur-md rounded-xl border shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-semibold">Katılıyor</p>
          <p className="text-2xl font-bold text-emerald-600">{guestData.stats.attendingCount}</p>
        </div>
        <div className="p-4 bg-white/70 backdrop-blur-md rounded-xl border shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-semibold">Katılamıyor</p>
          <p className="text-2xl font-bold text-rose-600">{guestData.stats.declinedCount}</p>
        </div>
        <div className="p-4 bg-white/70 backdrop-blur-md rounded-xl border shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-semibold">Cevap Bekleniyor</p>
          <p className="text-2xl font-bold text-amber-600">{guestData.stats.pendingCount}</p>
        </div>
      </div>

      {/* Davetli Ekleme Formu */}
      <form onSubmit={handleAddGuest} className="p-5 bg-white/80 rounded-xl border space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Yeni Davetli Ekle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Ad Soyad"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
            required
          />
          <input
            type="email"
            placeholder="E-posta (Opsiyonel)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
          />
          <input
            type="tel"
            placeholder="Telefon (Opsiyonel)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
          />
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full text-sm"
          >
            <option value="Genel">Genel</option>
            <option value="Aile">Aile</option>
            <option value="Arkadas">Arkadaş</option>
            <option value="Is">İş Çevresi</option>
          </select>
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={plusOne}
              onChange={(e) => setPlusOne(e.target.checked)}
              className="rounded text-indigo-600"
            />
            <span>+1 (Yanında Misafir Getirecek)</span>
          </label>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending ? 'Ekleme yapılıyor...' : 'Davetliyi Kaydet'}
        </button>
      </form>

      {/* Davetli Tablosu */}
      <div className="bg-white/80 rounded-xl border overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b text-xs uppercase font-semibold text-gray-500">
              <th className="p-3">Ad Soyad</th>
              <th className="p-3">Grup</th>
              <th className="p-3">İletişim</th>
              <th className="p-3">Yanında Misafir</th>
              <th className="p-3">LCV Durumu</th>
              <th className="p-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {guestData.guests.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  Henüz bir davetli eklenmedi.
                </td>
              </tr>
            ) : (
              guestData.guests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50/50">
                  <td className="p-3 font-medium text-gray-800">{guest.fullName}</td>
                  <td className="p-3 text-gray-500">{guest.group || 'Genel'}</td>
                  <td className="p-3 text-gray-500">
                    <div>{guest.phone || '-'}</div>
                    <div className="text-xs text-gray-400">{guest.email || ''}</div>
                  </td>
                  <td className="p-3 text-gray-500">{guest.plusOne ? 'Evet (+1)' : 'Hayır'}</td>
                  <td className="p-3">
                    <select
                      value={guest.status || 'PENDING'}
                      onChange={(e) =>
                        handleStatusChange(
                          guest.id,
                          e.target.value as 'ATTENDING' | 'DECLINED' | 'PENDING'
                        )
                      }
                      disabled={isPending}
                      className="px-2 py-1 text-xs border rounded-md font-medium bg-white"
                    >
                      <option value="PENDING">Bekliyor</option>
                      <option value="ATTENDING">Katılıyor</option>
                      <option value="DECLINED">Katılamıyor</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(guest.id)}
                      disabled={isPending}
                      className="text-red-500 hover:text-red-700 text-xs font-medium disabled:opacity-50"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}