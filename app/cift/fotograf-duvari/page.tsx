'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, QrCode, Image as ImageIcon, Upload, Play, Heart, 
  Download, Share2, ShieldCheck, CheckCircle2, Eye, RefreshCw, MessageCircle
} from 'lucide-react';

interface MediaItem {
  id: string;
  author: string;
  table: string;
  time: string;
  url: string;
  likes: number;
  caption: string;
}

export default function PhotoWallPage() {
  const [isSlideshowActive, setIsSlideshowActive] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  const [mediaList, setMediaList] = useState<MediaItem[]>([
    {
      id: '1',
      author: 'Ayşe & Ali',
      table: 'Masa 3',
      time: '2 dakika önce',
      url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      likes: 24,
      caption: 'Harika bir gece! Çiftimize ömür boyu mutluluklar 🥂'
    },
    {
      id: '2',
      author: 'Efe Yılmaz',
      authorTable: 'Masa 7',
      time: '8 dakika önce',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      likes: 18,
      caption: 'İlk dans anı muhteşemdi! ✨'
    } as any,
    {
      id: '3',
      author: 'Zeynep Kaya',
      table: 'Masa 1',
      time: '15 dakika önce',
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      likes: 31,
      caption: 'Masa detayları ve süslemeler rüya gibi.'
    }
  ]);

  const [newAuthor, setNewAuthor] = useState('');
  const [newTable, setNewTable] = useState('Masa 1');
  const [newCaption, setNewCaption] = useState('');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor) return;

    const newItem: MediaItem = {
      id: Date.now().toString(),
      author: newAuthor,
      table: newTable,
      time: 'Şimdi',
      url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
      likes: 1,
      caption: newCaption || 'Düğünden unutulmaz bir kare!'
    };

    setMediaList([newItem, ...mediaList]);
    setNewAuthor('');
    setNewCaption('');
    setIsUploadModalOpen(false);
  };

  const handleLike = (id: string) => {
    setMediaList(mediaList.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans selection:bg-[#111111] selection:text-white pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-black/[0.06]">
        <div className="max-w-[1300px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#111111]">
            WedyPlan<span className="text-[#D4AF37]">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#555]">
            <Link href="/cift/dijital-davetiye" className="hover:text-[#111] transition-colors">Dijital Davetiye</Link>
            <Link href="/cift/fotograf-duvari" className="text-[#111] font-bold">Canlı Fotoğraf Duvarı</Link>
            <Link href="/cift/odeme" className="hover:text-[#111] transition-colors">Ödemeler & Sözleşmeler</Link>
            <Link href="/cift/ai-asistan" className="flex items-center gap-1.5 text-[#111] font-bold">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WedyAI
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSlideshowActive(!isSlideshowActive)}
              className="px-4 py-2.5 rounded-full border border-black/10 hover:border-black text-[12px] font-medium transition-all flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isSlideshowActive ? 'Slaytı Durdur' : 'Dev Ekranda Yansıt'}</span>
            </button>
            
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#111111] text-white hover:bg-[#333] text-[12px] font-medium transition-all shadow-sm flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Fotoğraf Yükle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1300px] mx-auto px-6 pt-8 space-y-8">
        
        {/* Banner & Masalar İçin QR Kartı */}
        <div className="bg-[#111111] text-white p-8 rounded-[32px] shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
          
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[11px] text-[#D4AF37] font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Canlı Etkileşim Duvarı
            </div>
            <h1 className="text-[32px] md:text-[40px] font-serif font-normal leading-tight">
              Düğün Anılarınızı Davetlilerinizle Birlikte Oluşturun
            </h1>
            <p className="text-[14px] text-white/70 font-light max-w-[550px]">
              Masalardaki QR kodu okutan misafirlerinizin çektiği tüm fotoğraf ve videolar anında bu canlı duvarda toplanır.
            </p>

            <div className="flex items-center gap-6 pt-3 text-[12px] font-mono text-white/80">
              <span className="flex items-center gap-1.5"><ImageIcon className="w-4 h-4 text-[#D4AF37]" /> {mediaList.length} Fotoğraf Yüklendi</span>
              <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-red-400" /> {mediaList.reduce((a, b) => a + b.likes, 0)} Beğeni</span>
            </div>
          </div>

          {/* QR Kod Masa Kartı */}
          <div className="md:col-span-4 bg-white text-[#111111] p-6 rounded-[24px] text-center space-y-3 shadow-lg">
            <div className="w-28 h-28 mx-auto bg-[#F4F4F0] rounded-2xl flex items-center justify-center border border-black/10">
              <QrCode className="w-20 h-20 text-[#111111]" />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-[15px]">Masalar İçin QR Kod Kartı</h4>
              <p className="text-[11px] text-[#666]">Yazdırıp masalara koyabilirsiniz.</p>
            </div>
            <button className="w-full py-2 bg-[#111111] text-white text-[12px] font-medium rounded-xl hover:bg-[#333] transition-colors flex items-center justify-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[#D4AF37]" /> Kartı Indir (PDF)
            </button>
          </div>

        </div>

        {/* Canlı Akış Gridi */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <h3 className="font-serif text-[22px] font-medium text-[#111]">Canlı Fotoğraf Akışı</h3>
            <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Canlı Yayın Aktif
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaList.map((item) => (
              <div key={item.id} className="bg-white border border-black/10 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-all space-y-3 p-4">
                <div className="relative h-[280px] rounded-[20px] overflow-hidden bg-black/5">
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full">
                    📍 {item.table}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[12px]">
                    <span className="font-semibold text-[#111]">{item.author}</span>
                    <span className="text-[#888] text-[10px]">{item.time}</span>
                  </div>
                  <p className="text-[12px] text-[#555] italic">"{item.caption}"</p>
                </div>

                <div className="pt-2 border-t border-black/5 flex justify-between items-center text-[12px]">
                  <button 
                    onClick={() => handleLike(item.id)}
                    className="flex items-center gap-1.5 text-red-500 hover:scale-110 transition-transform font-bold"
                  >
                    <Heart className="w-4 h-4 fill-red-500" />
                    <span>{item.likes}</span>
                  </button>

                  <button className="text-[#888] hover:text-[#111]">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Yükleme Modalı */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-[420px] w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-black/5 pb-3">
              <h3 className="font-serif text-[18px] font-semibold text-[#111]">Anı Paylaş</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-[#888]">✕</button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-[13px]">
              <div>
                <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Adınız / Çift Notunuz</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Örn: Merve & Can"
                  value={newAuthor} 
                  onChange={e => setNewAuthor(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#FBFBF9] border border-black/10 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Masa Numaranız</label>
                <input 
                  type="text" 
                  value={newTable} 
                  onChange={e => setNewTable(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#FBFBF9] border border-black/10 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Kısa Mesajınız</label>
                <textarea 
                  rows={2}
                  placeholder="Çiftimize dileğiniz..." 
                  value={newCaption} 
                  onChange={e => setNewCaption(e.target.value)}
                  className="w-full p-3 bg-[#FBFBF9] border border-black/10 rounded-xl outline-none text-[12px]"
                />
              </div>

              <button type="submit" className="w-full h-12 bg-[#111111] text-white font-medium rounded-full shadow-md">
                Canlı Duvara Gönder
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}