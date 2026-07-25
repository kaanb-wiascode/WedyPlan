'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useWeddingOS } from '@/store/useWeddingOS'; // BEYNİ İÇERİ ALDIK
import { Wallet, Plus, Trash2, PieChart, ArrowRight, AlertCircle } from 'lucide-react';

const INITIAL_EXPENSES = [
  { id: '2', category: 'Giyim & Aksesuar', name: 'Gelinlik', estimated: 45000, actual: 48000 },
  { id: '3', category: 'Giyim & Aksesuar', name: 'Damatlık', estimated: 20000, actual: 18000 },
];

export default function PremiumBudgetPage() {
  // SİSTEM BEYNİNDEN BÜTÇEYİ VE OS HARCAMASINI ÇEKİYORUZ
  const { totalBudget, spentBudget, venueDealStatus } = useWeddingOS();
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  // OS OTOMASYONU: Manuel girilenlerle, sistemin otomatik onayladığı (spentBudget) parayı birleştiriyoruz.
  const metrics = useMemo(() => {
    const manualActual = expenses.reduce((acc, item) => acc + (Number(item.actual) || 0), 0);
    
    // İŞTE WEDDING OS MANTIĞI! Mekan parası manuel değil, sistemden geldi.
    const totalActual = manualActual + spentBudget; 
    
    const remaining = totalBudget - totalActual;
    const progressPercent = totalBudget > 0 ? Math.min(Math.round((totalActual / totalBudget) * 100), 100) : 0;
    const isOverBudget = remaining < 0;

    return { totalActual, remaining, progressPercent, isOverBudget };
  }, [expenses, totalBudget, spentBudget]);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white pb-32">
      
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1000px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="text-[22px] font-medium tracking-tight">WedyPlan.</Link>
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">
            <Link href="/kontrol-listesi" className="text-[#7C5CFF]">Planlama</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto px-6 pt-16">
        <header className="mb-12">
          <h1 className="text-[48px] md:text-[56px] font-medium tracking-tight leading-[1.05] mb-4">
            Bütçe Yönetimi
          </h1>
          <p className="text-[18px] text-[#666666] max-w-[500px]">Finansal planlamanızı zahmetsizce yapın.</p>
        </header>

        {/* Dashboard Card */}
        <div className="bg-[#111111] text-white p-8 md:p-10 rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7C5CFF] opacity-20 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
            <div className="space-y-8 flex-1">
              <div>
                <label className="text-[14px] text-white/60 font-medium block mb-2">Toplam Bütçeniz</label>
                <div className="text-[36px] font-medium tracking-tight leading-none">
                  {formatMoney(totalBudget)}
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
            
            <div className="relative flex items-center justify-center w-32 h-32 shrink-0">
               <span className="text-[28px] font-medium tracking-tight">%{metrics.progressPercent}</span>
            </div>
          </div>
        </div>

        {/* SİSTEMDEN OTOMATİK GELEN HARCAMA UYARISI */}
        {venueDealStatus === 'ONAYLANDI' && (
          <div className="bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 p-4 rounded-[20px] mb-8 flex items-center gap-4">
            <AlertCircle className="w-6 h-6 text-[#7C5CFF]" />
            <div>
              <p className="text-[14px] font-medium text-[#111111]">WedyPlan Otomasyonu: Yeni Masraf Eklendi!</p>
              <p className="text-[13px] text-[#666666]">Bosphorus Palace anlaşmanız (150.000 TL) sisteme otomatik işlendi.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}