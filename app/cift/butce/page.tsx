'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Coins, Plus, Sparkles, TrendingUp, PieChart, Wallet, 
  Trash2, CheckCircle2, Crown, ArrowUpRight, ArrowLeft, ShieldCheck
} from 'lucide-react';

interface ExpenseItem {
  id: string;
  category: string;
  amount: number;
  notes: string;
  date: string;
  isAiAdded?: boolean;
}

export default function CouplesBudgetDashboard() {
  // Bütçe Özeti State'leri
  const [totalBudget, setTotalBudget] = useState(350000);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: '1', category: 'Düğün Mekanı', amount: 145000, notes: 'Beykoz Secret Garden Kapora', date: '12 Ocak 2026', isAiAdded: false },
    { id: '2', category: 'Düğün Fotoğrafçısı', amount: 35000, notes: 'Serafina Fine Art - Drone Paketi', date: '20 Ocak 2026', isAiAdded: true },
    { id: '3', category: 'Gelinlik & Aksesuar', amount: 45000, notes: 'Nova Gelinlik Nişantaşı', date: '22 Ocak 2026', isAiAdded: false },
  ]);

  // Yeni Harcama Form State'i
  const [newCategory, setNewCategory] = useState('Müzik & Orkestra');
  const [newAmount, setNewAmount] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hesaplamalar
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = totalBudget - totalSpent;
  const spentPercentage = Math.min(Math.round((totalSpent / totalBudget) * 100), 100);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAmount || isNaN(Number(newAmount))) return;

    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      category: newCategory,
      amount: Number(newAmount),
      notes: newNotes || 'Manuel Eklendi',
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      isAiAdded: false
    };

    setExpenses([newItem, ...expenses]);
    setNewAmount('');
    setNewNotes('');
    setIsModalOpen(false);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans selection:bg-[#111111] selection:text-white pb-20">
      
      {/* 📍 Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-black/[0.06]">
        <div className="max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#111111]">
            WedyPlan<span className="text-[#D4AF37]">.</span>
          </Link>

          <div className="flex items-center gap-6 text-[14px] font-medium text-[#555]">
            <Link href="/mekanlar" className="hover:text-[#111] transition-colors">Mekanlar</Link>
            <Link href="/cift/butce" className="text-[#111] font-bold">Bütçe Yönetimi</Link>
            <Link href="/cift/ai-asistan" className="flex items-center gap-1.5 text-[#111] font-bold">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WedyAI
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#333] text-white text-[13px] font-medium transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Harcama Ekle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1240px] mx-auto px-6 pt-8 space-y-8">
        
        {/* Üst Başlık */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F4F0] rounded-full text-[11px] font-medium text-[#555] mb-2">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Selin & Kaan Düğün Planı</span>
            </div>
            <h1 className="text-[32px] md:text-[40px] font-serif font-normal text-[#111]">
              Bütçe & Harcama Yönetimi
            </h1>
          </div>

          <Link href="/cift/ai-asistan">
            <button className="px-5 py-3 bg-[#111111] text-white rounded-full text-[13px] font-medium flex items-center gap-2 hover:bg-[#333] transition-all shadow-md">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>WedyAI ile Bütçeyi Analiz Et</span>
            </button>
          </Link>
        </div>

        {/* 📊 BÜTÇE ÖZET KARTLARI (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Toplam Bütçe Kartı */}
          <div className="bg-white border border-black/10 rounded-[28px] p-6 space-y-3 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-[#888]">
              <span className="text-[12px] font-bold uppercase tracking-wider">Hedeflenen Bütçe</span>
              <Wallet className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="text-[32px] font-bold font-mono text-[#111]">
              {totalBudget.toLocaleString('tr-TR')} ₺
            </div>
            <p className="text-[12px] text-[#666]">
              Planlanan maksimum düğün bütçeniz.
            </p>
          </div>

          {/* 2. Toplam Harcanan */}
          <div className="bg-white border border-black/10 rounded-[28px] p-6 space-y-3 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-[#888]">
              <span className="text-[12px] font-bold uppercase tracking-wider">Toplanan Harcamalar</span>
              <Coins className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-[32px] font-bold font-mono text-[#111]">
              {totalSpent.toLocaleString('tr-TR')} ₺
            </div>
            {/* İlerleme Çubuğu */}
            <div className="space-y-1 pt-1">
              <div className="h-2 w-full bg-[#F4F4F0] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#111111] transition-all duration-500" 
                  style={{ width: `${spentPercentage}%` }} 
                />
              </div>
              <span className="text-[11px] text-[#888] font-medium block text-right">
                Bütçenin %{spentPercentage}'si harcandı
              </span>
            </div>
          </div>

          {/* 3. Kalan Bütçe */}
          <div className="bg-[#111111] text-white rounded-[28px] p-6 space-y-3 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between text-white/60">
              <span className="text-[12px] font-bold uppercase tracking-wider">Kalan Bütçe</span>
              <PieChart className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div className="text-[32px] font-bold font-mono text-white">
              {remainingBudget.toLocaleString('tr-TR')} ₺
            </div>
            <p className="text-[12px] text-white/70 font-light">
              Diğer ihtiyaçlar için kullanılabilir limit.
            </p>
          </div>

        </div>

        {/* 📋 HARCAMA KALEMLERİ LİSTESİ */}
        <div className="bg-white border border-black/10 rounded-[32px] p-6 md:p-8 space-y-6 shadow-sm">
          
          <div className="flex items-center justify-between border-b border-black/5 pb-4">
            <div>
              <h3 className="font-serif text-[22px] font-medium text-[#111]">Harcama Detayları</h3>
              <p className="text-[13px] text-[#777]">Eklenen tüm kaleme ait döküm ve WedyAI kayıtları.</p>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-[13px] font-medium text-[#111] hover:underline flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Manuel Ekle
            </button>
          </div>

          {/* Tablo / Liste */}
          <div className="space-y-3">
            {expenses.map((e) => (
              <div 
                key={e.id}
                className="p-4 bg-[#FBFBF9] border border-black/5 rounded-[20px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-black/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    e.isAiAdded ? 'bg-[#111] text-[#D4AF37]' : 'bg-[#EFEFED] text-[#111]'
                  }`}>
                    {e.isAiAdded ? <Sparkles className="w-5 h-5" /> : <Coins className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px] text-[#111]">{e.category}</span>
                      {e.isAiAdded && (
                        <span className="text-[10px] bg-[#111] text-[#D4AF37] font-mono px-2 py-0.5 rounded-full">
                          WedyAI Eklentisi
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] text-[#777] block">{e.notes} • {e.date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <span className="font-mono font-bold text-[16px] text-[#111]">
                    +{e.amount.toLocaleString('tr-TR')} ₺
                  </span>

                  <button 
                    onClick={() => handleDeleteExpense(e.id)}
                    className="p-2 text-[#999] hover:text-red-600 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </main>

      {/* 📩 MANUEL HARCAMA EKLEME MODAL'I */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-black/10 rounded-[32px] max-w-[440px] w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-black/5 pb-3">
              <h3 className="font-serif text-[20px] font-medium text-[#111]">Yeni Harcama Ekle</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#888] hover:text-[#111]">✕</button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Kategori</label>
                <select 
                  value={newCategory} 
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full h-11 px-3 bg-[#FBFBF9] border border-black/10 rounded-xl text-[13px] font-medium text-[#111] outline-none"
                >
                  <option value="Düğün Mekanı">Düğün Mekanı</option>
                  <option value="Düğün Fotoğrafçısı">Düğün Fotoğrafçısı</option>
                  <option value="Gelinlik & Damatlık">Gelinlik & Damatlık</option>
                  <option value="Müzik & Orkestra">Müzik & Orkestra</option>
                  <option value="Organizasyon & Süsleme">Organizasyon & Süsleme</option>
                  <option value="Davetiye & Nikah Şekeri">Davetiye & Nikah Şekeri</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Tutar (TL)</label>
                <input 
                  type="number" 
                  required
                  placeholder="Örn: 25000"
                  value={newAmount}
                  onChange={e => setNewAmount(e.target.value)}
                  className="w-full h-11 px-4 bg-[#FBFBF9] border border-black/10 rounded-xl text-[13px] outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Açıklama / Not</label>
                <input 
                  type="text" 
                  placeholder="Örn: Kapora ödemesi yapıldı"
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  className="w-full h-11 px-4 bg-[#FBFBF9] border border-black/10 rounded-xl text-[13px] outline-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full h-[48px] bg-[#111111] hover:bg-[#333] text-white font-medium rounded-full text-[14px] transition-all shadow-md mt-2"
              >
                Bütçeye Kaydet
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}