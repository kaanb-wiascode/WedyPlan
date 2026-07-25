'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Gift, 
  Share2, 
  Plus, 
  CreditCard, 
  CheckCircle2, 
  Circle,
  Home,
  Plane,
  Coffee
} from 'lucide-react';

const INITIAL_GIFTS = [
  { id: '1', title: 'Filtre Kahve Makinesi', category: 'Mutfak', price: '3.500 TL', isClaimed: true, claimedBy: 'Selin & Caner' },
  { id: '2', title: 'Robot Süpürge', category: 'Elektronik', price: '12.000 TL', isClaimed: false },
  { id: '3', title: 'Balayı Uçak Biletleri Katkısı', category: 'Balayı Fonu', price: '15.000 TL', isClaimed: false },
];

export default function PremiumGiftRegistryPage() {
  const [gifts, setGifts] = useState(INITIAL_GIFTS);
  const [newItem, setNewItem] = useState({ title: '', price: '', category: 'Ev Eşyası' });

  const handleShare = () => {
    alert('Bağlantı kopyalandı.');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mutfak': return <Coffee className="w-4 h-4" />;
      case 'Balayı Fonu': return <Plane className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white pb-32">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1000px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="text-[22px] font-medium tracking-tight">WedyPlan.</Link>
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">
            <Link href="/arama" className="text-[#666666] hover:text-[#111111] transition-colors">Keşfet</Link>
            <Link href="/kontrol-listesi" className="text-[#666666] hover:text-[#111111] transition-colors">Planlama</Link>
            <Link href="/hediye-listesi" className="text-[#7C5CFF]">Kayıtlar</Link>
          </div>
          <button onClick={handleShare} className="w-10 h-10 rounded-full bg-[#F8F8F7] flex items-center justify-center text-[#111111] hover:bg-[#F0F0EF] transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto px-6 pt-16">
        
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-[48px] md:text-[56px] font-medium tracking-tight leading-[1.05] mb-4">
            Hediye Listesi
          </h1>
          <p className="text-[18px] text-[#666666] max-w-[500px]">
            İhtiyaç duyduğunuz eşyaları veya balayı fonunuzu ekleyin, mükerrer hediyelerin önüne geçin.
          </p>
        </header>

        {/* Add New Gift Form (Minimalist Inline Form) */}
        <div className="bg-[#F8F8F7] p-4 md:p-6 rounded-[24px] border border-[rgba(0,0,0,0.04)] mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Örn: Espresso Makinesi"
              value={newItem.title}
              onChange={(e) => setNewItem({...newItem, title: e.target.value})}
              className="w-full h-[48px] px-4 bg-white border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors"
            />
            <input 
              type="text" 
              placeholder="Fiyat / Hedef"
              value={newItem.price}
              onChange={(e) => setNewItem({...newItem, price: e.target.value})}
              className="w-full md:w-[200px] h-[48px] px-4 bg-white border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors"
            />
          </div>
          <button className="w-full md:w-auto h-[48px] px-6 bg-[#111111] text-white rounded-[14px] text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-[#333333] transition-colors shrink-0">
            <Plus className="w-4 h-4" /> Listeye Ekle
          </button>
        </div>

        {/* Gift Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gifts.map((item) => (
            <div 
              key={item.id} 
              className={`p-6 rounded-[24px] border transition-all duration-300 ${
                item.isClaimed 
                  ? 'bg-transparent border-[rgba(0,0,0,0.04)] opacity-60' 
                  : 'bg-white border-[rgba(0,0,0,0.08)] shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-[#F8F8F7] rounded-full flex items-center justify-center text-[#666666]">
                  {getCategoryIcon(item.category)}
                </div>
                {item.isClaimed && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1DB954] bg-[#1DB954]/10 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Üstlenildi
                  </span>
                )}
              </div>
              
              <h3 className={`text-[16px] font-medium tracking-tight mb-1 ${item.isClaimed ? 'line-through text-[#999999]' : 'text-[#111111]'}`}>
                {item.title}
              </h3>
              <p className="text-[14px] font-medium text-[#666666] mb-6">{item.price}</p>
              
              <button 
                className={`w-full h-[44px] rounded-[14px] text-[13px] font-medium flex items-center justify-center gap-2 transition-colors ${
                  item.isClaimed 
                    ? 'bg-[#F8F8F7] text-[#999999]' 
                    : 'bg-[#7C5CFF] text-white hover:bg-[#6A4FE0] shadow-sm'
                }`}
                disabled={item.isClaimed}
              >
                {item.isClaimed ? 'Hediye Edildi' : <><Gift className="w-4 h-4" /> Hediye Et</>}
              </button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}