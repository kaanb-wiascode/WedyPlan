'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

interface GiftItem {
  id: string;
  title: string;
  category: 'Ev Eşyası' | 'Elektronik' | 'Balayı Fonu' | 'Mutfak' | 'Diğer';
  price: string;
  link?: string;
  isClaimed: boolean;
  claimedBy?: string;
}

const DEFAULT_GIFTS: GiftItem[] = [
  { id: '1', title: 'Filtre Kahve Makinesi', category: 'Mutfak', price: '3.500 TL', isClaimed: true, claimedBy: 'Selin & Caner' },
  { id: '2', title: 'Robot Süpürge', category: 'Elektronik', price: '12.000 TL', isClaimed: false },
  { id: '3', title: 'Balayı Uçak Biletleri Katkısı', category: 'Balayı Fonu', price: '15.000 TL', isClaimed: false },
  { id: '4', title: '12 Kişilik Yemek Takımı', category: 'Ev Eşyası', price: '8.500 TL', isClaimed: false },
];

export default function GiftRegistryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [gifts, setGifts] = useState<GiftItem[]>(DEFAULT_GIFTS);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Ev Eşyası' as GiftItem['category'],
    price: '',
    link: '',
  });

  // Oturum Dinleme ve Veri Yükleme
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const docRef = doc(db, 'gift_registries', currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().gifts) {
            setGifts(docSnap.data().gifts);
          }
        } catch (error) {
          console.error('Hediye listesi verisi çekme hatası:', error);
        }
      } else {
        const localGifts = localStorage.getItem('wedy_gifts');
        if (localGifts) setGifts(JSON.parse(localGifts));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Otomatik / Manuel Kaydetme
  const handleSaveGifts = async (updatedGifts: GiftItem[]) => {
    setGifts(updatedGifts);
    setIsSaving(true);
    try {
      if (user) {
        await setDoc(doc(db, 'gift_registries', user.uid), {
          gifts: updatedGifts,
          updatedAt: new Date().toISOString(),
        });
      } else {
        localStorage.setItem('wedy_gifts', JSON.stringify(updatedGifts));
      }
    } catch (error) {
      console.error('Kaydetme hatası:', error);
    } finally {
      setTimeout(() => setIsSaving(false), 300);
    }
  };

  // Yeni Hediye Ekle
  const handleAddGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title.trim()) return;

    const item: GiftItem = {
      id: Date.now().toString(),
      ...newItem,
      isClaimed: false,
    };

    const updated = [item, ...gifts];
    handleSaveGifts(updated);
    setNewItem({ title: '', category: 'Ev Eşyası', price: '', link: '' });
  };

  // Durum Değiştir (Alındı / Alınmadı)
  const handleToggleClaim = (id: string) => {
    const updated = gifts.map((g) => {
      if (g.id === id) {
        return {
          ...g,
          isClaimed: !g.isClaimed,
          claimedBy: !g.isClaimed ? (user?.displayName || 'Bir Misafir') : undefined,
        };
      }
      return g;
    });
    handleSaveGifts(updated);
  };

  // Hediye Sil
  const handleDeleteGift = (id: string) => {
    const updated = gifts.filter((g) => g.id !== id);
    handleSaveGifts(updated);
  };

  // Link Kopyala
  const handleShareRegistry = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('🎁 Hediye Listesi Bağlantınız Kopyalandı! Davetlilerinizle paylaşabilirsiniz.');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBFD]">
        <p className="text-[#4A154B] font-bold">Hediye listesi yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/davetli-listesi" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
            🎟️ Davetlilerim
          </Link>
          <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
            ← Ana Sayfa
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Başlık Kartı */}
        <div className="bg-gradient-to-r from-[#4A154B] via-purple-900 to-[#E6007E] p-6 md:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="bg-white/20 text-pink-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              Çiftlere Özel Düğün Kumbarası
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-2">Dijital Hediye Listem 🎁</h1>
            <p className="text-purple-100 text-xs md:text-sm mt-1 max-w-lg">
              İhtiyaç duyduğunuz hediyeleri veya balayı fonu hedeflerinizi ekleyin, mükerrer hediyelerin önüne geçin.
            </p>
          </div>
          <button
            onClick={handleShareRegistry}
            className="bg-white hover:bg-pink-50 text-[#4A154B] text-xs font-bold px-5 py-3 rounded-xl transition shadow-lg whitespace-nowrap"
          >
            🔗 Listeyi Paylaş
          </button>
        </div>

        {/* Yeni Hediye Ekleme Formu */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-[#4A154B] uppercase">➕ Yeni Hediye veya Fon Ekle</h2>
          <form onSubmit={handleAddGift} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <input
              type="text"
              required
              placeholder="Hediye Adı (Örn: Kahve Makinesi)"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] md:col-span-2"
            />
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value as GiftItem['category'] })}
              className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white"
            >
              <option value="Ev Eşyası">Ev Eşyası</option>
              <option value="Elektronik">Elektronik</option>
              <option value="Balayı Fonu">Balayı Fonu</option>
              <option value="Mutfak">Mutfak</option>
              <option value="Diğer">Diğer</option>
            </select>
            <input
              type="text"
              placeholder="Tahmini Fiyat / Hedef"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />
            <button
              type="submit"
              className="bg-[#E6007E] text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-pink-700 transition shadow"
            >
              Listeye Ekle
            </button>
          </form>
        </div>

        {/* Hediye Kartları Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gifts.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition flex items-center justify-between gap-4 ${
                item.isClaimed
                  ? 'bg-slate-50 border-slate-200 opacity-75'
                  : 'bg-white border-purple-100 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-purple-100 text-[#4A154B] px-2.5 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  {item.isClaimed && (
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                      ✓ Üstlendi: {item.claimedBy || 'Bir Misafir'}
                    </span>
                  )}
                </div>
                <h3 className={`text-sm font-bold ${item.isClaimed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                  {item.title}
                </h3>
                {item.price && <p className="text-xs font-extrabold text-[#E6007E]">{item.price}</p>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleClaim(item.id)}
                  className={`text-xs font-bold px-3 py-2 rounded-xl transition ${
                    item.isClaimed
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow'
                  }`}
                >
                  {item.isClaimed ? 'Geri Al' : 'Hediye Et 🎁'}
                </button>
                <button
                  onClick={() => handleDeleteGift(item.id)}
                  className="text-slate-300 hover:text-red-500 font-bold p-1 text-sm transition"
                  title="Sil"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}