'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

interface TimelineItem {
  id: string;
  time: string;
  title: string;
  location: string;
  note: string;
}

interface MusicList {
  entrance: string;
  firstDance: string;
  cakeCutting: string;
  bouquetThrow: string;
  afterParty: string;
}

const DEFAULT_TIMELINE: TimelineItem[] = [
  { id: '1', time: '10:00', title: 'Gelin & Damat Kuaför Randevusu', location: 'Kuaför Salonu', note: 'Makyöz ve kuaför ekibi hazır olacak.' },
  { id: '2', time: '14:30', title: 'Gelin Alma & Konvoy', location: 'Gelin Ev', note: 'Fotoğrafçı araç çekimlerini yapacak.' },
  { id: '3', time: '16:00', title: 'Dış Çekim & Fotoğraf Çekimi', location: 'Koruluk / Sahil', note: 'Yedek ayakkabıları unutmayın.' },
  { id: '4', time: '19:00', title: 'Mekana Varış & Karşılama Kokteyli', location: 'Düğün Mekanı', note: 'Davetlilerin karşılanması ve ikramlar.' },
  { id: '5', time: '20:00', title: 'Salona Giriş & İlk Dans', location: 'Ana Sahne', note: 'Sis efekti ve volkanlar ateşlenecek.' },
  { id: '6', time: '22:00', title: 'Pasta Kesimi & Şampanya Patlatma', location: 'Ana Sahne', note: 'Maytaplar dağıtılacak.' },
  { id: '7', time: '23:30', title: 'After Party Başlangıcı', location: 'After Lounge', note: 'DJ performansına geçiş.' },
];

export default function WeddingTimelinePage() {
  const [user, setUser] = useState<User | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>(DEFAULT_TIMELINE);
  const [music, setMusic] = useState<MusicList>({
    entrance: 'A Thousand Years - Christina Perri',
    firstDance: 'Perfect - Ed Sheeran',
    cakeCutting: 'Sugar - Maroon 5',
    bouquetThrow: 'Single Ladies - Beyoncé',
    afterParty: 'Get Lucky - Daft Punk',
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Yeni Zaman Maddesi Formu
  const [newItem, setNewItem] = useState({
    time: '12:00',
    title: '',
    location: '',
    note: '',
  });

  // Oturum Dinleme ve Veri Yükleme
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const docRef = doc(db, 'wedding_timelines', currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            if (docSnap.data().timeline) setTimeline(docSnap.data().timeline);
            if (docSnap.data().music) setMusic(docSnap.data().music);
          }
        } catch (error) {
          console.error('Akış verisi çekme hatası:', error);
        }
      } else {
        const localTimeline = localStorage.getItem('wedy_timeline');
        const localMusic = localStorage.getItem('wedy_music');
        if (localTimeline) setTimeline(JSON.parse(localTimeline));
        if (localMusic) setMusic(JSON.parse(localMusic));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Otomatik Kaydetme
  const handleSaveData = async () => {
    setIsSaving(true);
    try {
      if (user) {
        await setDoc(doc(db, 'wedding_timelines', user.uid), {
          timeline,
          music,
          updatedAt: new Date().toISOString(),
        });
      } else {
        localStorage.setItem('wedy_timeline', JSON.stringify(timeline));
        localStorage.setItem('wedy_music', JSON.stringify(music));
      }
      alert('🎉 Düğün akışınız ve müzik listeniz başarıyla kaydedildi!');
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      alert('Kaydedilirken bir hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  // Zaman Maddesi Ekle
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title.trim()) return;

    const item: TimelineItem = {
      id: Date.now().toString(),
      ...newItem,
    };

    const updated = [...timeline, item].sort((a, b) => a.time.localeCompare(b.time));
    setTimeline(updated);
    setNewItem({ time: '12:00', title: '', location: '', note: '' });
  };

  // Madde Sil
  const handleDeleteItem = (id: string) => {
    setTimeline(prev => prev.filter(item => item.id !== id));
  };

  // DJ'e WhatsApp ile Gönder
  const handleShareWithDJ = () => {
    let text = `*💍 WEDYPLAN DÜĞÜN AKIŞI VE MÜZİK LİSTESİ*\n\n`;
    text += `*🎵 ÖZEL ŞARKILAR:* \n`;
    text += `• Salona Giriş: ${music.entrance}\n`;
    text += `• İlk Dans: ${music.firstDance}\n`;
    text += `• Pasta Kesimi: ${music.cakeCutting}\n`;
    text += `• Çiçek Atma: ${music.bouquetThrow}\n`;
    text += `• After Party: ${music.afterParty}\n\n`;
    text += `*⏰ SAAT SAAT GÜN PROGRAMI:* \n`;
    timeline.forEach((item) => {
      text += `• ${item.time} - ${item.title} (${item.location})\n`;
    });

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBFD]">
        <p className="text-[#4A154B] font-bold">Akış planlayıcı yükleniyor...</p>
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
          <Link href="/kontrol-listesi" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
            ⏳ Düğün Sayacı
          </Link>
          <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
            ← Ana Sayfa
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Başlık Kartı */}
        <div className="bg-gradient-to-r from-[#4A154B] to-purple-900 p-6 md:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="bg-pink-500/30 text-pink-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              Düğün Günü Yönetimi
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold mt-2">Düğün Akışı & Müzik Planlayıcı 🎵</h1>
            <p className="text-purple-200 text-xs md:text-sm mt-1 max-w-lg">
              Büyük günün her anını planlayın, özel şarkılarınızı seçin ve listenizi orkestranızla tek tıkla paylaşın.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSaveData}
              disabled={isSaving}
              className="bg-[#E6007E] hover:bg-pink-600 text-white text-xs font-bold px-5 py-3 rounded-xl transition shadow"
            >
              {isSaving ? 'Kaydediliyor...' : '💾 Kaydet'}
            </button>
            <button
              onClick={handleShareWithDJ}
              className="bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-bold px-5 py-3 rounded-xl transition shadow flex items-center gap-1.5"
            >
              <span>📲</span>
              <span>DJ / Orkestraya Gönder</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon: Müzik Seçim Paneli */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-[#4A154B] flex items-center gap-2">
                <span>🎧</span> Düğün Şarkı Listesi
              </h2>
              <p className="text-xs text-slate-500">En özel anlarınızda çalacak şarkıları belirleyin.</p>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">🏰 Salona Giriş Müziği</label>
                  <input
                    type="text"
                    value={music.entrance}
                    onChange={(e) => setMusic({ ...music, entrance: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">💃 İlk Dans Şarkısı</label>
                  <input
                    type="text"
                    value={music.firstDance}
                    onChange={(e) => setMusic({ ...music, firstDance: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">🎂 Pasta Kesim Müziği</label>
                  <input
                    type="text"
                    value={music.cakeCutting}
                    onChange={(e) => setMusic({ ...music, cakeCutting: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">💐 Çiçek Atma Müziği</label>
                  <input
                    type="text"
                    value={music.bouquetThrow}
                    onChange={(e) => setMusic({ ...music, bouquetThrow: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">🪩 After Party Açılış Şarkısı</label>
                  <input
                    type="text"
                    value={music.afterParty}
                    onChange={(e) => setMusic({ ...music, afterParty: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Saat Saat Zaman Çizelgesi */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Yeni An Ekleme Formu */}
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-3">
              <h2 className="text-xs font-bold text-[#4A154B] uppercase">➕ Yeni Akış Maddesi Ekle</h2>
              <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="time"
                  required
                  value={newItem.time}
                  onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                  className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
                <input
                  type="text"
                  required
                  placeholder="Etkinlik Adı (Örn: Nikah Töreni)"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] sm:col-span-2"
                />
                <input
                  type="text"
                  placeholder="Konum (Örn: Nikah Salonu)"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
                />
                <button
                  type="submit"
                  className="bg-[#E6007E] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-pink-700 transition sm:col-span-4"
                >
                  Akışa Ekle
                </button>
              </form>
            </div>

            {/* Timeline Akış Listesi */}
            <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-[#4A154B]">⏰ Düğün Günü Saat Çizelgesi</h2>
              
              <div className="relative border-l-2 border-purple-100 ml-4 pl-6 space-y-6">
                {timeline.map((item) => (
                  <div key={item.id} className="relative group">
                    {/* Yuvarlak Nokta */}
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 bg-[#E6007E] rounded-full border-2 border-white shadow"></div>

                    <div className="flex items-start justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div>
                        <span className="text-xs font-extrabold text-[#E6007E] bg-pink-50 px-2.5 py-1 rounded-md">
                          {item.time}
                        </span>
                        <h3 className="text-sm font-bold text-slate-800 mt-2">{item.title}</h3>
                        {item.location && <p className="text-xs text-slate-500 mt-0.5">📍 {item.location}</p>}
                        {item.note && <p className="text-[11px] text-slate-400 italic mt-1">"{item.note}"</p>}
                      </div>

                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-slate-300 hover:text-red-500 font-bold p-1 transition"
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

        </div>
      </div>
    </div>
  );
}