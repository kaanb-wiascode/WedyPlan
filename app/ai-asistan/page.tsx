'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AIAssistantPage() {
  const [budget, setBudget] = useState('150000');
  const [guests, setGuests] = useState('250');
  const [city, setCity] = useState('İstanbul');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    setTimeout(() => {
      const b = Number(budget);
      setAiResult({
        venueBudget: (b * 0.55).toLocaleString('tr-TR') + ' TL',
        photoBudget: (b * 0.15).toLocaleString('tr-TR') + ' TL',
        dressBudget: (b * 0.18).toLocaleString('tr-TR') + ' TL',
        otherBudget: (b * 0.12).toLocaleString('tr-TR') + ' TL',
        recommendation: `${city} lokasyonunda ${guests} kişilik organizasyon için %55 mekan, %15 fotoğraf ve %18 gelinlik/damatlık dağılımı idealdir.`,
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-purple-100 shadow-sm">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
          <span className="text-[10px] bg-purple-100 text-[#4A154B] px-2 py-0.5 rounded-md ml-2 font-bold uppercase">
            🤖 WedyAI
          </span>
        </Link>
        <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-[#E6007E]">
          ← Ana Sayfa
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-[#4A154B]">Yapay Zeka Düğün Asistanı 🤖</h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Bütçenizi ve hayalinizdeki düğün detaylarını girin, WedyAI size en ideal bütçe dağılımını ve firma tavsiyelerini çıkarsın.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Toplam Bütçe (TL)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Davetli Sayısı</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Şehir</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E] bg-white"
            >
              <option value="İstanbul">İstanbul</option>
              <option value="Ankara">Ankara</option>
              <option value="İzmir">İzmir</option>
              <option value="Bursa">Bursa</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full bg-[#E6007E] hover:bg-pink-700 text-white text-xs font-bold py-3 rounded-xl transition shadow disabled:opacity-50"
            >
              {isAnalyzing ? 'Analiz Ediliyor...' : 'WedyAI Analiz Et ✨'}
            </button>
          </div>
        </form>

        {/* AI Output */}
        {aiResult && (
          <div className="bg-gradient-to-br from-purple-900 to-[#4A154B] text-white p-8 rounded-3xl shadow-xl space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 border-b border-purple-700/50 pb-4">
              <span className="text-xl">💡</span>
              <h2 className="text-base font-bold">WedyAI Bütçe Optimize Raporu</h2>
            </div>

            <p className="text-xs text-purple-200 leading-relaxed">{aiResult.recommendation}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] text-pink-300 font-bold block">Mekan & Yemek</span>
                <span className="text-sm font-extrabold mt-1 block">{aiResult.venueBudget}</span>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] text-pink-300 font-bold block">Fotoğraf & Drone</span>
                <span className="text-sm font-extrabold mt-1 block">{aiResult.photoBudget}</span>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] text-pink-300 font-bold block">Gelinlik & Damatlık</span>
                <span className="text-sm font-extrabold mt-1 block">{aiResult.dressBudget}</span>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] text-pink-300 font-bold block">Müzik & Süsleme</span>
                <span className="text-sm font-extrabold mt-1 block">{aiResult.otherBudget}</span>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/arama"
                className="inline-block bg-[#E6007E] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-pink-600 transition shadow"
              >
                Bu Bütçeye Uygun Firmaları Listele →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}