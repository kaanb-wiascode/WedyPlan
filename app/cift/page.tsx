'use client';

import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  Plus, 
  Search, 
  Grid, 
  List, 
  Trash2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  group: 'AİLE' | 'ARKADAŞLAR' | 'İŞ' | 'AKRABA';
  status: 'GELİYOR' | 'GELMİYOR' | 'BEKLEYEN';
  plusOne: number;
  tableNo: number | null;
}

export default function GuestAndSeatingPage() {
  const [activeTab, setActiveTab] = useState<'LIST' | 'SEATING'>('LIST');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dummy Guest Data
  const [guests, setGuests] = useState<Guest[]>([
    { id: '1', name: 'Ahmet Yılmaz', group: 'AİLE', status: 'GELİYOR', plusOne: 1, tableNo: 1 },
    { id: '2', name: 'Selin Kaya', group: 'ARKADAŞLAR', status: 'GELİYOR', plusOne: 0, tableNo: 2 },
    { id: '3', name: 'Mehmet Demir', group: 'İŞ', status: 'BEKLEYEN', plusOne: 1, tableNo: null },
    { id: '4', name: 'Ayşe Öztürk', group: 'AKRABA', status: 'GELMİYOR', plusOne: 0, tableNo: null },
    { id: '5', name: 'Caner & Merve Şahin', group: 'ARKADAŞLAR', status: 'GELİYOR', plusOne: 1, tableNo: 2 },
  ]);

  // Form State
  const [newName, setNewName] = useState('');
  const [newGroup, setNewGroup] = useState<Guest['group']>('ARKADAŞLAR');
  const [newPlusOne, setNewPlusOne] = useState(0);

  // Add Guest
  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newGuestObj: Guest = {
      id: Date.now().toString(),
      name: newName,
      group: newGroup,
      status: 'BEKLEYEN',
      plusOne: newPlusOne,
      tableNo: null,
    };

    setGuests([newGuestObj, ...guests]);
    setNewName('');
    setNewPlusOne(0);
  };

  // Delete Guest
  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter(g => g.id !== id));
  };

  // Stats
  const totalCount = guests.reduce((acc, curr) => acc + 1 + curr.plusOne, 0);
  const attendingCount = guests
    .filter(g => g.status === 'GELİYOR')
    .reduce((acc, curr) => acc + 1 + curr.plusOne, 0);
  const pendingCount = guests
    .filter(g => g.status === 'BEKLEYEN')
    .reduce((acc, curr) => acc + 1 + curr.plusOne, 0);
  const declinedCount = guests
    .filter(g => g.status === 'GELMİYOR')
    .reduce((acc, curr) => acc + 1 + curr.plusOne, 0);

  // Filtered Guests
  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Top Bar Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-medium tracking-tight text-[#111111]">
            Davetli & Masa Yönetimi
          </h1>
          <p className="text-[14px] text-[#666666] mt-1">
            LCV durumlarını takip edin, misafirlerinizi masalara yerleştirin.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="p-1 bg-[#EFEFE3] rounded-[16px] inline-flex border border-[rgba(0,0,0,0.04)] shrink-0">
          <button
            onClick={() => setActiveTab('LIST')}
            className={`h-[40px] px-5 rounded-[12px] text-[13px] font-medium flex items-center gap-2 transition-all ${
              activeTab === 'LIST'
                ? 'bg-white text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                : 'text-[#666666] hover:text-[#111111]'
            }`}
          >
            <List className="w-4 h-4" />
            Davetli Listesi
          </button>
          <button
            onClick={() => setActiveTab('SEATING')}
            className={`h-[40px] px-5 rounded-[12px] text-[13px] font-medium flex items-center gap-2 transition-all ${
              activeTab === 'SEATING'
                ? 'bg-white text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                : 'text-[#666666] hover:text-[#111111]'
            }`}
          >
            <Grid className="w-4 h-4" />
            Masa Düzeni (Seating Chart)
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[22px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-2">
          <div className="flex items-center justify-between text-[#666666]">
            <span className="text-[12px] font-medium uppercase tracking-wider">Toplam Kişi</span>
            <Users className="w-4 h-4" />
          </div>
          <p className="text-[28px] font-semibold text-[#111111]">{totalCount}</p>
        </div>

        <div className="bg-white p-5 rounded-[22px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-2">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-[12px] font-medium uppercase tracking-wider">Katılanlar</span>
            <UserCheck className="w-4 h-4" />
          </div>
          <p className="text-[28px] font-semibold text-emerald-600">{attendingCount}</p>
        </div>

        <div className="bg-white p-5 rounded-[22px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-[12px] font-medium uppercase tracking-wider">Yanıt Bekleyen</span>
            <Clock className="w-4 h-4" />
          </div>
          <p className="text-[28px] font-semibold text-amber-600">{pendingCount}</p>
        </div>

        <div className="bg-white p-5 rounded-[22px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-2">
          <div className="flex items-center justify-between text-rose-600">
            <span className="text-[12px] font-medium uppercase tracking-wider">Gelemeyenler</span>
            <UserX className="w-4 h-4" />
          </div>
          <p className="text-[28px] font-semibold text-rose-600">{declinedCount}</p>
        </div>
      </div>

      {/* TAB 1: LIST VIEW */}
      {activeTab === 'LIST' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Guest Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-[28px] border border-[rgba(0,0,0,0.06)] shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-5 sticky top-6">
              <h3 className="text-[18px] font-medium text-[#111111]">Hızlı Davetli Ekle</h3>
              
              <form onSubmit={handleAddGuest} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-medium text-[#666666] mb-1">Ad Soyad</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Örn: Burak Özçivit"
                    className="w-full h-[46px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] outline-none focus:border-[#7C5CFF] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#666666] mb-1">Grup / Yakınlık</label>
                  <select
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value as Guest['group'])}
                    className="w-full h-[46px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] outline-none focus:border-[#7C5CFF] focus:bg-white transition-all"
                  >
                    <option value="AİLE">Aile</option>
                    <option value="ARKADAŞLAR">Arkadaşlar</option>
                    <option value="İŞ">İş Çevresi</option>
                    <option value="AKRABA">Akraba</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#666666] mb-1">Yanında Gelecek Kişi (+1)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={newPlusOne}
                    onChange={(e) => setNewPlusOne(Number(e.target.value))}
                    className="w-full h-[46px] px-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[14px] outline-none focus:border-[#7C5CFF] focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-[48px] bg-[#111111] hover:bg-[#333333] text-white font-medium text-[14px] rounded-[16px] transition-all flex items-center justify-center gap-2 pt-0.5"
                >
                  <Plus className="w-4 h-4" />
                  Davetlisini Listeye Ekle
                </button>
              </form>
            </div>
          </div>

          {/* Guest List Table */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Davetli ismine göre arayın..."
                className="w-full h-[50px] pl-11 pr-4 bg-white border border-[rgba(0,0,0,0.06)] rounded-[18px] text-[14px] outline-none focus:border-[#7C5CFF] transition-all"
              />
            </div>

            {/* List */}
            <div className="bg-white rounded-[28px] border border-[rgba(0,0,0,0.06)] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="divide-y divide-[rgba(0,0,0,0.04)]">
                {filteredGuests.map((guest) => (
                  <div key={guest.id} className="p-4 md:p-5 flex items-center justify-between hover:bg-[#F8F8F7] transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[15px] font-medium text-[#111111]">{guest.name}</p>
                        {guest.plusOne > 0 && (
                          <span className="text-[11px] font-medium bg-[#7C5CFF]/10 text-[#7C5CFF] px-2 py-0.5 rounded-full">
                            +{guest.plusOne} Kişi
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[12px] text-[#666666]">
                        <span>{guest.group}</span>
                        <span>•</span>
                        <span>{guest.tableNo ? `${guest.tableNo}. Masa` : 'Masa Atanmadı'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[12px] font-medium px-3 py-1 rounded-full ${
                        guest.status === 'GELİYOR' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                        guest.status === 'GELMİYOR' ? 'bg-rose-50 text-rose-600 border border-rose-200' :
                        'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}>
                        {guest.status}
                      </span>

                      <button
                        onClick={() => handleDeleteGuest(guest.id)}
                        className="p-2 text-[#999999] hover:text-rose-600 hover:bg-rose-50 rounded-[10px] transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: SEATING CHART */}
      {activeTab === 'SEATING' && (
        <div className="space-y-6">
          <div className="bg-[#7C5CFF]/5 border border-[#7C5CFF]/15 p-4 rounded-[20px] flex items-center gap-3 text-[13px] text-[#7C5CFF]">
            <Sparkles className="w-5 h-5 shrink-0" />
            <p>
              <strong>Akıllı Masa Düzenleyici:</strong> Masaların üzerindeki boş yerlere tıklayarak veya davetli durumlarından yerleşim yapabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((tableNum) => {
              const tableGuests = guests.filter(g => g.tableNo === tableNum);
              const capacity = 8;
              const currentSeats = tableGuests.reduce((acc, curr) => acc + 1 + curr.plusOne, 0);

              return (
                <div key={tableNum} className="bg-white p-6 rounded-[28px] border border-[rgba(0,0,0,0.06)] shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4">
                  <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-3">
                    <h4 className="font-medium text-[16px] text-[#111111]">Masa {tableNum}</h4>
                    <span className="text-[12px] font-medium bg-[#F8F8F7] text-[#666666] px-2.5 py-1 rounded-full border border-[rgba(0,0,0,0.04)]">
                      {currentSeats} / {capacity} Koltuk
                    </span>
                  </div>

                  <div className="space-y-2 min-h-[120px]">
                    {tableGuests.length > 0 ? (
                      tableGuests.map(g => (
                        <div key={g.id} className="p-2.5 bg-[#F8F8F7] rounded-[12px] text-[13px] font-medium flex justify-between items-center text-[#111111]">
                          <span>{g.name} {g.plusOne > 0 ? `(+${g.plusOne})` : ''}</span>
                          <span className="text-[11px] text-[#999999]">{g.group}</span>
                        </div>
                      ))
                    ) : (
                      <div className="h-[100px] border-2 border-dashed border-[rgba(0,0,0,0.06)] rounded-[16px] flex items-center justify-center text-[12px] text-[#999999]">
                        Bu Masa Henüz Boş
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}