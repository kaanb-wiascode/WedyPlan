'use client';

import React, { useState } from 'react';

interface BudgetItem {
  id: string;
  category: string;
  title: string;
  estimated: number;
  actual: number;
}

const INITIAL_ITEMS: BudgetItem[] = [
  { id: '1', category: 'Mekan', title: 'Düğün Salonu / Kır Bahçesi', estimated: 80000, actual: 75000 },
  { id: '2', category: 'Giyim', title: 'Gelinlik & Damatlık', estimated: 35000, actual: 30000 },
  { id: '3', category: 'Fotoğraf', title: 'Dış Çekim & Düğün Hikayesi', estimated: 20000, actual: 18000 },
  { id: '4', category: 'Organizasyon', title: 'Müzik & Orkestra / DJ', estimated: 15000, actual: 15000 },
  { id: '5', category: 'Diğer', title: 'Davetiye & Nikah Şekeri', estimated: 10000, actual: 8000 },
];

export default function BudgetCalculatorPage() {
  const [totalBudget, setTotalBudget] = useState<number>(200000);
  const [items, setItems] = useState<BudgetItem[]>(INITIAL_ITEMS);

  // Yeni Harcama Ekleme State'leri
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Mekan');
  const [newItemEstimated, setNewItemEstimated] = useState('');
  const [newItemActual, setNewItemActual] = useState('');

  // Hesaplamalar
  const totalEstimated = items.reduce((acc, item) => acc + (item.estimated || 0), 0);
  const totalSpent = items.reduce((acc, item) => acc + (item.actual || 0), 0);
  const remainingBudget = totalBudget - totalSpent;
  const spentPercentage = Math.min(Math.round((totalSpent / totalBudget) * 100) || 0, 100);

  // Yeni Kalem Ekleme
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle) return;

    const newItem: BudgetItem = {
      id: Date.now().toString(),
      title: newItemTitle,
      category: newItemCategory,
      estimated: Number(newItemEstimated) || 0,
      actual: Number(newItemActual) || 0,
    };

    setItems([...items, newItem]);
    setNewItemTitle('');
    setNewItemEstimated('');
    setNewItemActual('');
  };

  // Kalem Silme
  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-purple-100 shadow-sm">
        <a href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </a>
        <a href="/" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E] transition">
          ← Ana Sayfaya Dön
        </a>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Başlık */}
        <div className="text-center space-y-2">
          <span className="bg-purple-100 text-[#4A154B] text-xs font-bold px-3 py-1 rounded-full uppercase">
            Ağustos & Akıllı Araçlar
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#4A154B]">
            Düğün Bütçesi Hesaplayıcı 💍
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Hayalinizdeki düğünü planlarken tüm harcamalarınızı kontrol altında tutun, bütçe sürprizlerinden korunun.
          </p>
        </div>

        {/* Özet Kartları & Bütçe Girişi */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Toplam Bütçe Düzenleme */}
          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase">Toplam Bütçeniz</span>
            <div className="mt-2 flex items-center gap-1">
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value) || 0)}
                className="text-xl font-extrabold text-[#4A154B] w-full border-b border-purple-200 focus:outline-none focus:border-[#E6007E]"
              />
              <span className="text-sm font-bold text-slate-400">TL</span>
            </div>
          </div>

          {/* Tahmini Bütçe */}
          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase">Planlanan Toplam</span>
            <p className="text-xl font-extrabold text-slate-700 mt-2">
              {totalEstimated.toLocaleString('tr-TR')} TL
            </p>
          </div>

          {/* Gerçekleşen Harcama */}
          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase">Harcanan Tutar</span>
            <p className="text-xl font-extrabold text-[#E6007E] mt-2">
              {totalSpent.toLocaleString('tr-TR')} TL
            </p>
          </div>

          {/* Kalan Bütçe */}
          <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase">Kalan Bütçe</span>
            <p className={`text-xl font-extrabold mt-2 ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {remainingBudget.toLocaleString('tr-TR')} TL
            </p>
          </div>
        </div>

        {/* İlerleme Çubuğu (Progress Bar) */}
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-[#4A154B]">Bütçe Kullanım Oranı</span>
            <span className="text-[#E6007E]">%{spentPercentage}</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                spentPercentage > 90 ? 'bg-red-500' : 'bg-[#E6007E]'
              }`}
              style={{ width: `${spentPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Yeni Harcama Ekleme Formu */}
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
          <h2 className="text-base font-bold text-[#4A154B] mb-4">+ Yeni Harcama Kalemi Ekle</h2>
          <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input
              type="text"
              required
              placeholder="Harcama Adı (Örn: Kuaför)"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              className="md:col-span-2 p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            >
              <option value="Mekan">Mekan</option>
              <option value="Giyim">Giyim</option>
              <option value="Fotoğraf">Fotoğraf</option>
              <option value="Organizasyon">Organizasyon</option>
              <option value="Diğer">Diğer</option>
            </select>
            <input
              type="number"
              placeholder="Tahmini (TL)"
              value={newItemEstimated}
              onChange={(e) => setNewItemEstimated(e.target.value)}
              className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />
            <button
              type="submit"
              className="bg-[#E6007E] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-pink-700 transition"
            >
              Ekle
            </button>
          </form>
        </div>

        {/* Harcama Kalemleri Listesi */}
        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-sm font-bold text-[#4A154B]">Harcama Detayları</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-purple-50/30 transition">
                <div>
                  <span className="text-[10px] font-extrabold uppercase bg-purple-100 text-[#4A154B] px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 mt-1">{item.title}</h3>
                </div>

                <div className="flex items-center gap-6 text-xs">
                  <div>
                    <span className="block text-[10px] text-slate-400">Tahmini</span>
                    <span className="font-semibold text-slate-600">{item.estimated.toLocaleString('tr-TR')} TL</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Harcanan</span>
                    <span className="font-bold text-[#E6007E]">{item.actual.toLocaleString('tr-TR')} TL</span>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-slate-400 hover:text-red-500 font-bold text-base px-2"
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
  );
}