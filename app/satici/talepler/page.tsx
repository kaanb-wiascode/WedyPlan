'use client';

import React, { useState } from 'react';
import { 
  MessageCircle, 
  CalendarCheck, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  Phone
} from 'lucide-react';

export default function PremiumVendorLeadsPage() {
  const [activeTab, setActiveTab] = useState<'requests' | 'appointments'>('requests');

  // Mock Data
  const requests = [
    { id: '1', name: 'Selin Soylu', phone: '0532 123 45 67', date: '15.08.2026', guests: '300', status: 'Yeni', message: 'Merhaba, menü tadımı yapabiliyor muyuz?' },
    { id: '2', name: 'Ayşe Demir', phone: '0555 987 65 43', date: '22.09.2026', guests: '150', status: 'Yanıtlandı', message: 'Fiyat bilgisi alabilir miyim?' },
  ];

  const appointments = [
    { id: '3', name: 'Burak & Zeynep', phone: '0530 111 22 33', date: 'Yarın', time: '14:30', status: 'Onaylandı' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[32px] font-medium tracking-tight text-[#111111]">
            Talepler & Randevular
          </h1>
          <p className="text-[15px] text-[#666666] mt-1">
            Çiftlerden gelen istekleri ve mekan gezisi randevularını yönetin.
          </p>
        </div>
      </header>

      {/* Segmented Control (Apple Style Tabs) */}
      <div className="inline-flex bg-[#F8F8F7] p-1 rounded-[14px] border border-[rgba(0,0,0,0.04)]">
        <button
          onClick={() => setActiveTab('requests')}
          className={`flex items-center gap-2 px-6 h-[40px] rounded-[10px] text-[14px] font-medium transition-all duration-300 ${
            activeTab === 'requests'
              ? 'bg-white text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
              : 'text-[#666666] hover:text-[#111111]'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          Fiyat Teklifleri ({requests.length})
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`flex items-center gap-2 px-6 h-[40px] rounded-[10px] text-[14px] font-medium transition-all duration-300 ${
            activeTab === 'appointments'
              ? 'bg-white text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
              : 'text-[#666666] hover:text-[#111111]'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          Randevular ({appointments.length})
        </button>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeTab === 'requests' ? (
          requests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-[rgba(0,0,0,0.12)] transition-colors group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[18px] font-medium text-[#111111]">{req.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-[13px] text-[#666666]">
                      <span className="flex items-center gap-1.5"><CalendarCheck className="w-3.5 h-3.5" /> {req.date}</span>
                      <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {req.phone}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-[6px] text-[12px] font-medium ${
                    req.status === 'Yeni' ? 'bg-[#7C5CFF]/10 text-[#7C5CFF]' : 'bg-[#F8F8F7] text-[#666666]'
                  }`}>
                    {req.status}
                  </span>
                </div>
                
                {req.message && (
                  <div className="p-4 rounded-[16px] bg-[#F8F8F7] border border-[rgba(0,0,0,0.04)]">
                    <p className="text-[14px] text-[#666666] leading-relaxed italic">"{req.message}"</p>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-[rgba(0,0,0,0.04)] flex items-center justify-between">
                <button className="text-[14px] font-medium text-[#666666] hover:text-[#111111] flex items-center gap-1.5 transition-colors">
                  <CheckCircle2 className="w-4 h-4" /> Okundu İşaretle
                </button>
                <button className="h-[40px] px-5 bg-[#1DB954] text-white rounded-[12px] text-[13px] font-medium flex items-center gap-1.5 hover:bg-[#1AA34A] transition-colors shadow-sm">
                  <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp'tan Yaz
                </button>
              </div>
            </div>
          ))
        ) : (
          appointments.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[rgba(0,0,0,0.12)] transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[18px] font-medium text-[#111111]">{app.name}</h3>
                  <p className="text-[14px] text-[#666666] mt-1">{app.phone}</p>
                </div>
                <span className="px-2.5 py-1 rounded-[6px] text-[12px] font-medium bg-[#1DB954]/10 text-[#1DB954]">
                  {app.status}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-[16px] bg-[#F8F8F7] border border-[rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-3 text-[#111111]">
                  <Clock className="w-5 h-5 text-[#7C5CFF]" />
                  <div>
                    <span className="block text-[14px] font-medium">{app.date}</span>
                    <span className="block text-[12px] text-[#666666]">Saat: {app.time}</span>
                  </div>
                </div>
                <button className="text-[#999999] hover:text-[#111111] transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}