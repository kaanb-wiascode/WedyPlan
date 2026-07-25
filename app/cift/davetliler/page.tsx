'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, UserPlus, Sparkles, CheckCircle2, Clock, XCircle, 
  Search, Filter, Utensils, Grid, User, ShieldCheck
} from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  group: 'Kız Tarafı - Aile' | 'Erkek Tarafı - Aile' | 'Arkadaş' | 'İş Arkadaşı';
  status: 'Katılacak' | 'Bekleniyor' | 'Katılamayacak';
  table: string;
  dietary: 'Standart' | 'Vejetaryen' | 'Vegan' | 'Çocuk Menüsü';
}

export default function GuestManagementPage() {
  const [guests, setGuests] = useState<Guest[]>([
    { id: '1', name: 'Ahmet Akray (Amca)', group: 'Kız Tarafı - Aile', status: 'Katılacak', table: 'Masa 1', dietary: 'Standart' },
    { id: '2', name: 'Ayşe Akray (Yenge)', group: 'Kız Tarafı - Aile', status: 'Katılacak', table: 'Masa 1', dietary: 'Vejetaryen' },
    { id: '3', name: 'Caner Yılmaz', group: 'Arkadaş', status: 'Bekleniyor', table: 'Atanmadı', dietary: 'Standart' },
    { id: '4', name: 'Merve Demir', group: 'Arkadaş', status: 'Katılacak', table: 'Masa 5', dietary: 'Vegan' },
    { id: '5', name: 'Kemal Öztürk', group: 'İş Arkadaşı', status: 'Katılamayacak', table: 'Atanmadı', dietary: 'Standart' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Yeni Davetli Form State'leri
  const [newName, setNewName] = useState('');
  const [newGroup, setNewGroup] = useState<Guest['group']>('Arkadaş');
  const [newStatus, setNewStatus] = useState<Guest['status']>('Bekleniyor');
  const [newDietary, setNewDietary] = useState<Guest['dietary']>('Standart');

  // İstatistikler
  const totalGuests = guests.length;
  const attendingGuests = guests.filter(g => g.status === 'Katılacak').length;
  const pendingGuests = guests.filter(g => g.status === 'Bekleniyor').length;
  const notAttendingGuests = guests.filter(g => g.status === 'Katılamayacak').length;

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newGuest: Guest = {
      id: Date.now().toString(),
      name: newName,
      group: newGroup,
      status: newStatus,
      table: 'Atanmadı',
      dietary: newDietary
    };

    setGuests([newGuest, ...guests]);
    setNewName('');
    setIsModalOpen(false);
  };

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans selection:bg-[#111111] selection:text-white pb-20">
      
      {/* 📍 Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-black/[0.06]">
        <div className="max-w-[1240px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#111111]">
            WedyPlan<span className="text-[#D4AF37]">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#555]">
            <Link href="/cift/butce" className="hover:text-[#111] transition-colors">Bütçe</Link>
            <Link href="/cift/davetliler" className="text-[#111] font-bold">Davetliler</Link>
            <Link href="/cift/ai-asistan" className="flex items-center gap-1.5 text-[#111] font-bold">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WedyAI
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#333] text-white text-[13px] font-medium transition-all shadow-md flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-[#D4AF37]" />
              <span>Yeni Ekle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1240px] mx-auto px-6 pt-8 space-y-8">
        
        {/* Üst Başlık & Yapay Zeka Aksiyonu */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F4F0] rounded-full text-[11px] font-medium text-[#555] mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Selin & Kaan Düğün Planı</span>
            </div>
            <h1 className="text-[32px] md:text-[40px] font-serif font-normal text-[#111]">
              Davetli ve Masa Yönetimi
            </h1>
          </div>

          <Link href="/cift/ai-asistan">
            <button className="px-5 py-3 bg-[#111111] text-white rounded-full text-[13px] font-medium flex items-center gap-2 hover:bg-[#333] transition-all shadow-md">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>WedyAI ile Masa Düzeni Kur</span>
            </button>
          </Link>
        </div>

        {/* 📊 İSTATİSTİK KARTLARI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white border border-black/10 rounded-[24px] p-5 shadow-sm">
            <div className="flex items-center gap-2 text-[#888] mb-2">
              <Users className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Toplam Davetli</span>
            </div>
            <div className="text-[28px] font-bold font-mono text-[#111]">{totalGuests}</div>
          </div>

          <div className="bg-[#F4F9F4] border border-emerald-100 rounded-[24px] p-5 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Katılacaklar</span>
            </div>
            <div className="text-[28px] font-bold font-mono text-emerald-700">{attendingGuests}</div>
          </div>

          <div className="bg-[#FFF9F0] border border-amber-100 rounded-[24px] p-5 shadow-sm">
            <div className="flex items-center gap-2 text-amber-700 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Yanıt Bekleyen</span>
            </div>
            <div className="text-[28px] font-bold font-mono text-amber-700">{pendingGuests}</div>
          </div>

          <div className="bg-[#FFF5F5] border border-red-100 rounded-[24px] p-5 shadow-sm">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <XCircle className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Gelemeyecekler</span>
            </div>
            <div className="text-[28px] font-bold font-mono text-red-700">{notAttendingGuests}</div>
          </div>
        </div>

        {/* 📋 DAVETLİ LİSTESİ & ARAMA */}
        <div className="bg-white border border-black/10 rounded-[32px] p-6 shadow-sm space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 pb-4">
            <h3 className="font-serif text-[22px] font-medium text-[#111]">Tüm Davetliler</h3>
            
            <div className="flex items-center gap-3">
              {/* Arama */}
              <div className="bg-[#FBFBF9] border border-black/10 rounded-full px-4 py-2 flex items-center gap-2 w-full md:w-[250px]">
                <Search className="w-4 h-4 text-[#888]" />
                <input 
                  type="text"
                  placeholder="İsim veya grup ara..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-[13px] w-full"
                />
              </div>
              <button className="p-2 border border-black/10 rounded-full hover:bg-[#F4F4F0] transition-colors">
                <Filter className="w-4 h-4 text-[#555]" />
              </button>
            </div>
          </div>

          {/* Masaüstü Tablo Görünümü */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="text-[#888] font-medium uppercase tracking-wider text-[11px] border-b border-black/5">
                  <th className="pb-3 font-semibold">Davetli Adı</th>
                  <th className="pb-3 font-semibold">Grup</th>
                  <th className="pb-3 font-semibold">LCV Durumu</th>
                  <th className="pb-3 font-semibold">Masa No</th>
                  <th className="pb-3 font-semibold">Özel Menü</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((g) => (
                  <tr key={g.id} className="border-b border-black/5 hover:bg-[#FBFBF9] transition-colors group">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-medium">
                          {g.name.charAt(0)}
                        </div>
                        <span className="font-medium text-[#111]">{g.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-[#666]">{g.group}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        g.status === 'Katılacak' ? 'bg-emerald-100 text-emerald-700' :
                        g.status === 'Bekleniyor' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {g.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`flex items-center gap-1.5 ${g.table === 'Atanmadı' ? 'text-[#999]' : 'text-[#111] font-semibold'}`}>
                        <Grid className="w-3.5 h-3.5" /> {g.table}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`flex items-center gap-1.5 ${g.dietary === 'Standart' ? 'text-[#999]' : 'text-[#D4AF37] font-semibold'}`}>
                        <Utensils className="w-3.5 h-3.5" /> {g.dietary}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredGuests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-[#888]">
                      Davetli bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </main>

      {/* 📩 DAVETLİ EKLEME MODAL'I */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-black/10 rounded-[32px] max-w-[440px] w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-black/5 pb-3">
              <h3 className="font-serif text-[20px] font-medium text-[#111]">Yeni Davetli Ekle</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#888] hover:text-[#111]">✕</button>
            </div>

            <form onSubmit={handleAddGuest} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Davetli Adı Soyadı</label>
                <input 
                  type="text" 
                  required
                  placeholder="Örn: Ayşe Yılmaz"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full h-11 px-4 bg-[#FBFBF9] border border-black/10 rounded-xl text-[13px] outline-none focus:border-black/30"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Davetli Grubu</label>
                <select 
                  value={newGroup} 
                  onChange={e => setNewGroup(e.target.value as Guest['group'])}
                  className="w-full h-11 px-3 bg-[#FBFBF9] border border-black/10 rounded-xl text-[13px] font-medium text-[#111] outline-none"
                >
                  <option value="Kız Tarafı - Aile">Kız Tarafı - Aile</option>
                  <option value="Erkek Tarafı - Aile">Erkek Tarafı - Aile</option>
                  <option value="Arkadaş">Arkadaş</option>
                  <option value="İş Arkadaşı">İş Arkadaşı</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">LCV Durumu</label>
                  <select 
                    value={newStatus} 
                    onChange={e => setNewStatus(e.target.value as Guest['status'])}
                    className="w-full h-11 px-3 bg-[#FBFBF9] border border-black/10 rounded-xl text-[13px] font-medium text-[#111] outline-none"
                  >
                    <option value="Bekleniyor">Bekleniyor</option>
                    <option value="Katılacak">Katılacak</option>
                    <option value="Katılamayacak">Katılamayacak</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#888] block mb-1">Özel Menü</label>
                  <select 
                    value={newDietary} 
                    onChange={e => setNewDietary(e.target.value as Guest['dietary'])}
                    className="w-full h-11 px-3 bg-[#FBFBF9] border border-black/10 rounded-xl text-[13px] font-medium text-[#111] outline-none"
                  >
                    <option value="Standart">Standart</option>
                    <option value="Vejetaryen">Vejetaryen</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Çocuk Menüsü">Çocuk Menüsü</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full h-[48px] bg-[#111111] hover:bg-[#333] text-white font-medium rounded-full text-[14px] transition-all shadow-md mt-2"
              >
                Listeye Ekle
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}