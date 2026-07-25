'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Filter
} from 'lucide-react';

export default function PremiumGuestListPage() {
  const [search, setSearch] = useState('');

  // Mock Data
  const guests = [
    { id: 1, name: 'Ahmet Yılmaz', group: 'Kız Tarafı - Aile', plusOne: 2, status: 'Katılıyor' },
    { id: 2, name: 'Burak Deniz', group: 'Erkek Tarafı - Arkadaş', plusOne: 0, status: 'Bekliyor' },
    { id: 3, name: 'Selin Soylu', group: 'Kız Tarafı - Arkadaş', plusOne: 1, status: 'Katılıyor' },
    { id: 4, name: 'Mehmet Kaya', group: 'Erkek Tarafı - Akraba', plusOne: 3, status: 'Katılamıyor' },
    { id: 5, name: 'Ayşe Demir', group: 'İş Arkadaşları', plusOne: 0, status: 'Bekliyor' },
  ];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Katılıyor': return 'bg-[#1DB954]/10 text-[#1DB954]';
      case 'Bekliyor': return 'bg-[#F8F8F7] text-[#666666]';
      case 'Katılamıyor': return 'bg-[#FF453A]/10 text-[#FF453A]';
      default: return 'bg-[#F8F8F7] text-[#666666]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Katılıyor': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Bekliyor': return <Clock className="w-3.5 h-3.5" />;
      case 'Katılamıyor': return <XCircle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white pb-32">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)]">
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="text-[22px] font-medium tracking-tight">
            WedyPlan.
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">
            <Link href="/arama" className="text-[#666666] hover:text-[#111111] transition-colors">Keşfet</Link>
            <Link href="/kontrol-listesi" className="text-[#666666] hover:text-[#111111] transition-colors">Planlama</Link>
            <Link href="/davetli-listesi" className="text-[#7C5CFF]">Kayıtlar</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 pt-16">
        
        {/* Header & Stats */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-[48px] md:text-[56px] font-medium tracking-tight leading-[1.05] mb-2">
              Davetliler
            </h1>
            <p className="text-[18px] text-[#666666]">
              Sevdiklerinizi organize edin, LCV durumlarını takip edin.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="px-6 py-4 rounded-[20px] bg-[#F8F8F7] border border-[rgba(0,0,0,0.04)]">
              <span className="text-[13px] font-medium text-[#666666] block mb-1">Toplam</span>
              <span className="text-[28px] font-medium tracking-tight text-[#111111]">245</span>
            </div>
            <div className="px-6 py-4 rounded-[20px] bg-[#1DB954]/5 border border-[rgba(0,0,0,0.04)]">
              <span className="text-[13px] font-medium text-[#1DB954] block mb-1">Kesinleşen</span>
              <span className="text-[28px] font-medium tracking-tight text-[#1DB954]">182</span>
            </div>
          </div>
        </header>

        {/* Action Bar (Search & Add) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
            <input 
              type="text" 
              placeholder="İsim veya grup ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[48px] pl-11 pr-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors placeholder:text-[#999999]"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="h-[48px] px-4 bg-white border border-[rgba(0,0,0,0.08)] rounded-[14px] text-[#111111] text-[14px] font-medium flex items-center gap-2 hover:bg-[#F8F8F7] transition-colors">
              <Filter className="w-4 h-4" /> Filtrele
            </button>
            <button className="h-[48px] px-6 bg-[#111111] text-white rounded-[14px] text-[14px] font-medium flex items-center gap-2 hover:bg-[#333333] transition-colors w-full sm:w-auto justify-center">
              <Plus className="w-4 h-4" /> Yeni Kişi
            </button>
          </div>
        </div>

        {/* Minimalist Data Grid (Notion Style) */}
        <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F8F7] border-b border-[rgba(0,0,0,0.04)]">
                  <th className="px-6 py-4 text-[13px] font-medium text-[#666666]">İsim Soyisim</th>
                  <th className="px-6 py-4 text-[13px] font-medium text-[#666666]">Grup Kategorisi</th>
                  <th className="px-6 py-4 text-[13px] font-medium text-[#666666]">Ek Kişi (+1)</th>
                  <th className="px-6 py-4 text-[13px] font-medium text-[#666666]">LCV Durumu</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F8F8F7]/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F0F0EF] flex items-center justify-center text-[12px] font-medium text-[#666666]">
                          {guest.name.charAt(0)}
                        </div>
                        <span className="text-[15px] font-medium text-[#111111]">{guest.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px] text-[#666666]">{guest.group}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-[14px] text-[#666666]">
                        <Users className="w-4 h-4 text-[#999999]" />
                        <span>+{guest.plusOne}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium ${getStatusStyle(guest.status)}`}>
                        {getStatusIcon(guest.status)}
                        {guest.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}