'use client';

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Eye, 
  Users, 
  Clock, 
  ArrowUpRight, 
  MoreHorizontal,
  Plus
} from 'lucide-react';

export default function PremiumVendorDashboard() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Dashboard Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-medium tracking-tight text-[#111111]">
            Genel Bakış
          </h1>
          <p className="text-[15px] text-[#666666] mt-1">
            Bosphorus Palace Kır Bahçesi performans özeti.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/satici/teklif-hazirla"
            className="h-[44px] px-5 bg-[#111111] text-white rounded-[14px] text-[14px] font-medium flex items-center gap-2 hover:bg-[#333333] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Yeni Teklif Oluştur
          </Link>
        </div>
      </header>

      {/* Metrics Grid (Stripe Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Profil Görüntülenme', value: '12.450', trend: '+14%', icon: Eye },
          { label: 'Gelen Teklif Talebi', value: '142', trend: '+22%', icon: Users },
          { label: 'Dönüşüm Oranı', value: '%18.5', trend: '+2.4%', icon: TrendingUp },
          { label: 'Ort. Yanıt Süresi', value: '14 dk', trend: '-5 dk', icon: Clock, positive: true },
        ].map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[160px]">
            <div className="flex justify-between items-start">
              <span className="text-[14px] font-medium text-[#666666]">{metric.label}</span>
              <metric.icon className="w-5 h-5 text-[#999999]" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-[32px] font-medium tracking-tight text-[#111111]">
                {metric.value}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <ArrowUpRight className={`w-3.5 h-3.5 ${metric.positive !== false ? 'text-[#1DB954]' : 'text-[#666666]'}`} />
                <span className={`text-[13px] font-medium ${metric.positive !== false ? 'text-[#1DB954]' : 'text-[#666666]'}`}>
                  {metric.trend}
                </span>
                <span className="text-[13px] text-[#999999]">geçen aya göre</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads Table (Linear Style) */}
      <div className="bg-white rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="px-6 py-5 border-b border-[rgba(0,0,0,0.04)] flex justify-between items-center">
          <h2 className="text-[16px] font-medium text-[#111111]">Son Talepler</h2>
          <Link href="/satici/talepler" className="text-[14px] font-medium text-[#7C5CFF] hover:underline">
            Tümünü Gör
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F8F7] text-[13px] font-medium text-[#666666] border-b border-[rgba(0,0,0,0.04)]">
                <th className="px-6 py-3 font-medium">Müşteri</th>
                <th className="px-6 py-3 font-medium">Düğün Tarihi</th>
                <th className="px-6 py-3 font-medium">Kapasite</th>
                <th className="px-6 py-3 font-medium">Durum</th>
                <th className="px-6 py-3 text-right font-medium">İşlem</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {[
                { name: 'Selin & Caner', date: '15.08.2026', capacity: '300 Kişi', status: 'Yeni', color: 'bg-[#7C5CFF]/10 text-[#7C5CFF]' },
                { name: 'Ayşe & Burak', date: '22.08.2026', capacity: '150 Kişi', status: 'Yanıt Bekliyor', color: 'bg-[#F5A623]/10 text-[#F5A623]' },
                { name: 'Zeynep & Murat', date: '05.09.2026', capacity: '400 Kişi', status: 'Teklif İletildi', color: 'bg-[#1DB954]/10 text-[#1DB954]' },
              ].map((lead, i) => (
                <tr key={i} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F8F8F7]/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-[#111111]">{lead.name}</td>
                  <td className="px-6 py-4 text-[#666666]">{lead.date}</td>
                  <td className="px-6 py-4 text-[#666666]">{lead.capacity}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-[6px] text-[12px] font-medium ${lead.color}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#999999] hover:text-[#111111] transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}