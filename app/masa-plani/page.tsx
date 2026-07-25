'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Table {
  id: number;
  name: string;
  capacity: number;
  guests: string[];
}

export default function SeatingChartPage() {
  const [tables, setTables] = useState<Table[]>([
    { id: 1, name: 'Masa 1 (Protokol & Aile)', capacity: 8, guests: ['Ahmet Yılmaz', 'Mehmet Yılmaz', 'Fatma Yılmaz'] },
    { id: 2, name: 'Masa 2 (Gelin Ailesi)', capacity: 8, guests: ['Ayşe Kaya', 'Ali Kaya'] },
    { id: 3, name: 'Masa 3 (Üniversite Arkadaşları)', capacity: 10, guests: ['Caner Erkin', 'Selin Soylu', 'Burak Deniz'] },
    { id: 4, name: 'Masa 4 (İş Arkadaşları)', capacity: 10, guests: [] },
  ]);

  const [selectedTable, setSelectedTable] = useState<number>(1);
  const [newGuestName, setNewGuestName] = useState('');

  const handleAddGuestToTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    setTables((prev) =>
      prev.map((t) =>
        t.id === selectedTable ? { ...t, guests: [...t.guests, newGuestName.trim()] } : t
      )
    );
    setNewGuestName('');
  };

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-slate-800">
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-purple-100 shadow-sm">
        <Link href="/" className="text-2xl font-bold text-[#4A154B]">
          Wedy<span className="text-[#E6007E]">Plan</span>
        </Link>
        <Link href="/davetli-listesi" className="text-xs font-semibold text-[#4A154B] hover:text-[#E6007E]">
          📋 Davetli Listesine Dön
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold text-[#4A154B]">Görsel Masa & Oturma Planı 🍽️</h1>
          <p className="text-xs text-slate-500">Masalarınızı seçin, davetlileri dilediğiniz masaya yerleştirin.</p>
        </div>

        {/* Masa Ekleme / Yerleştirme Formu */}
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-[#4A154B] uppercase">Masaya Davetli Atama</h2>
          <form onSubmit={handleAddGuestToTable} className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(Number(e.target.value))}
              className="p-3 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:border-[#E6007E]"
            >
              {tables.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.guests.length}/{t.capacity} Kişi)
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Davetli Adı Soyadı"
              value={newGuestName}
              onChange={(e) => setNewGuestName(e.target.value)}
              className="flex-grow p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
            />
            <button
              type="submit"
              className="bg-[#E6007E] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-pink-700 transition"
            >
              Masaya Oturt
            </button>
          </form>
        </div>

        {/* Interaktif Masalar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tables.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedTable(t.id)}
              className={`bg-white p-6 rounded-3xl border shadow-sm transition cursor-pointer flex flex-col justify-between space-y-4 ${
                selectedTable === t.id ? 'border-[#E6007E] ring-2 ring-pink-500/20' : 'border-purple-100'
              }`}
            >
              <div className="space-y-2">
                {/* Görsel Yuvarlak Masa */}
                <div className="w-20 h-20 bg-purple-50 rounded-full border-4 border-[#4A154B] flex items-center justify-center mx-auto text-xs font-extrabold text-[#4A154B] shadow-inner">
                  {t.guests.length}/{t.capacity}
                </div>

                <h3 className="text-xs font-bold text-[#4A154B] text-center mt-2">{t.name}</h3>
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl min-h-[100px]">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Oturacak Kişiler:</span>
                {t.guests.length === 0 ? (
                  <span className="text-[10px] text-slate-400 italic">Masa henüz boş.</span>
                ) : (
                  t.guests.map((g, i) => (
                    <div key={i} className="text-[11px] font-semibold text-slate-700 flex justify-between">
                      <span>• {g}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}