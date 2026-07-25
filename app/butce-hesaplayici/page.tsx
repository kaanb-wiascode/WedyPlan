'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Wallet, 
  Plus, 
  Trash2, 
  PieChart, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

// --- Mock Data ---
const INITIAL_EXPENSES = [
  { id: '1', category: 'Mekan & Yemek', name: 'Kır Bahçesi Kiralama', estimated: 150000, actual: 150000 },
  { id: '2', category: 'Giyim & Aksesuar', name: 'Gelinlik', estimated: 45000, actual: 48000 },
  { id: '3', category: 'Giyim & Aksesuar', name: 'Damatlık', estimated: 20000, actual: 18000 },
  { id: '4', category: 'Fotoğraf & Video', name: 'Dış Çekim & Hikaye', estimated: 35000, actual: 0 },
  { id: '5', category: 'Müzik & Eğlence', name: 'Canlı Orkestra', estimated: 40000, actual: 0 },
];

export default function PremiumBudgetPage() {
  const [totalBudget, setTotalBudget] = useState<number>(350000);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  // Metrik Hesaplamaları
  const metrics = useMemo(() => {
    const totalEstimated = expenses.reduce((acc, item) => acc + (Number(item.estimated) || 0), 0);
    const totalActual = expenses.reduce((acc, item) => acc + (Number(item.actual) || 0), 0);
    const remaining = totalBudget - totalActual;
    const progressPercent = totalBudget > 0 ? Math.min(Math.round((totalActual / totalBudget) * 100), 100) : 0;
    const isOverBudget = remaining < 0;

    return { totalEstimated, totalActual, remaining, progressPercent, isOverBudget };
  }, [expenses, totalBudget]);

  const updateExpense = (id: string, field: 'estimated' | 'actual', value: string) => {
    setExpenses(expenses.map(exp => 
      exp.id === id ? { ...exp, [field]: Number(value) } : exp
    ));
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const addExpense = () => {
    const newId = Date.now().toString();
    setExpenses([...expenses, { id: newId, category: 'Diğer', name: 'Yeni Harcama', estimated: 0, actual: 0 }]);
  };

  // Para formatlayıcı
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white pb-32">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1000px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="text-[22px] font-medium tracking-tight">
            WedyPlan.
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">
            <Link href="/arama" className="text-[#666666] hover:text-[#111111] transition-colors">Keşfet</Link>
            <Link href="/kontrol-listesi" className="text-[#7C5CFF]">Planlama</Link>
            <Link href="/hediye-listesi" className="text-[#666666] hover:text-[#111111] transition-colors">Kayıtlar</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto px-6 pt-16">
        
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-[48px] md:text-[56px] font-medium tracking-tight leading-[1.05] mb-4">
            Bütçe Yönetimi
          </h1>
          <p className="text-[18px] text-[#666666] max-w-[500px]">
            Finansal planlamanızı zahmetsizce yapın, sürpriz masrafların önüne geçin.
          </p>
        </header>

        {/* Summary Card (Apple Wallet Vibe) */}
        <div className="bg-[#111111] text-white p-8 md:p-10 rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] mb-12 relative overflow-hidden">
          {/* Subtle Glow inside the dark card */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7C5CFF] opacity-20 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
            
            <div className="space-y-8 flex-1">
              <div>
                <label className="text-[14px] text-white/60 font-medium block mb-2">Toplam Bütçeniz</label>
                <div className="flex items-end gap-2 border-b border-white/20 pb-2 max-w-[240px] group transition-colors focus-within:border-[#7C5CFF]">
                  <span className="text-[36px] font-medium tracking-tight leading-none">₺</span>
                  <input 
                    type="number"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="bg-transparent text-[36px] font-medium tracking-tight leading-none outline-none w-full appearance-none m-0 p-0 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="text-[13px] text-white/60 font-medium block mb-1">Harcanan (Gerçekleşen)</span>
                  <span className="text-[22px] font-medium">{formatMoney(metrics.totalActual)}</span>
                </div>
                <div>
                  <span className="text-[13px] text-white/60 font-medium block mb-1">Kalan Bakiye</span>
                  <span className={`text-[22px] font-medium ${metrics.isOverBudget ? 'text-[#FF453A]' : 'text-white'}`}>
                    {formatMoney(metrics.remaining)}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Circle & Alert */}
            <div className="flex flex-col items-center justify-center min-w-[160px] shrink-0">
              <div className="relative flex items-center justify-center w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" 
                    stroke={metrics.isOverBudget ? '#FF453A' : '#7C5CFF'} 
                    strokeWidth="6" 
                    strokeDasharray="282.7" 
                    strokeDashoffset={282.7 - (282.7 * metrics.progressPercent) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-[28px] font-medium tracking-tight">%{metrics.progressPercent}</span>
                </div>
              </div>
              {metrics.isOverBudget && (
                <div className="mt-4 flex items-center gap-1.5 text-[#FF453A] bg-[#FF453A]/10 px-3 py-1 rounded-full text-[12px] font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> Bütçe Aşıldı
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Expenses List (Linear App Style Clean Rows) */}
        <div>
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-[22px] font-medium tracking-tight text-[#111111]">Harcama Kalemleri</h2>
            <div className="text-[14px] text-[#666666] font-medium flex gap-12 pr-12 hidden sm:flex">
              <span className="w-[120px] text-right">Tahmini</span>
              <span className="w-[120px] text-right">Gerçekleşen</span>
            </div>
          </div>

          <div className="space-y-3">
            {expenses.map((expense) => (
              <div 
                key={expense.id} 
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 md:px-6 rounded-[20px] border border-[rgba(0,0,0,0.04)] bg-white hover:border-[rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 gap-4"
              >
                {/* Item Info */}
                <div className="flex-1">
                  <input 
                    type="text" 
                    value={expense.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setExpenses(expenses.map(ex => ex.id === expense.id ? { ...ex, name: newName } : ex));
                    }}
                    className="bg-transparent text-[16px] font-medium text-[#111111] outline-none w-full placeholder:text-[#999999]"
                    placeholder="Kalem Adı"
                  />
                  <span className="text-[13px] text-[#999999] mt-0.5 block">{expense.category}</span>
                </div>

                {/* Inputs & Actions */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  
                  {/* Mobile Labels */}
                  <div className="flex items-center gap-3 sm:gap-6">
                    <div className="flex flex-col sm:items-end">
                      <span className="text-[11px] font-medium text-[#999999] sm:hidden mb-1">Tahmini</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#999999]">₺</span>
                        <input 
                          type="number"
                          value={expense.estimated || ''}
                          onChange={(e) => updateExpense(expense.id, 'estimated', e.target.value)}
                          className="w-[110px] md:w-[120px] h-[44px] bg-[#F8F8F7] rounded-[12px] pl-7 pr-3 text-[14px] font-medium text-[#111111] outline-none focus:bg-white focus:border focus:border-[#7C5CFF]/30 transition-all text-right"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end">
                      <span className="text-[11px] font-medium text-[#999999] sm:hidden mb-1">Gerçekleşen</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#999999]">₺</span>
                        <input 
                          type="number"
                          value={expense.actual || ''}
                          onChange={(e) => updateExpense(expense.id, 'actual', e.target.value)}
                          className="w-[110px] md:w-[120px] h-[44px] bg-[#F8F8F7] rounded-[12px] pl-7 pr-3 text-[14px] font-medium text-[#111111] outline-none focus:bg-white focus:border focus:border-[#7C5CFF]/30 transition-all text-right"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button 
                    onClick={() => deleteExpense(expense.id)}
                    className="w-[44px] h-[44px] flex items-center justify-center rounded-[12px] text-[#999999] hover:bg-[#FF453A]/10 hover:text-[#FF453A] transition-colors shrink-0"
                    aria-label="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Action */}
          <button 
            onClick={addExpense}
            className="mt-6 flex items-center gap-2 text-[14px] font-medium text-[#666666] hover:text-[#111111] transition-colors px-4 py-2 rounded-[12px] hover:bg-[#F8F8F7]"
          >
            <Plus className="w-4 h-4" /> Yeni Kalem Ekle
          </button>
        </div>

      </main>
    </div>
  );
}