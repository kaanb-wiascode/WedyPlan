'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Plus,
  Move
} from 'lucide-react';

export default function PremiumSeatingPlanPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white flex flex-col md:flex-row overflow-hidden">
      
      {/* Left Sidebar - Guest List */}
      <aside className="w-full md:w-[320px] h-screen bg-white border-r border-[rgba(0,0,0,0.06)] flex flex-col shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-6 border-b border-[rgba(0,0,0,0.04)]">
          <Link href="/" className="text-[22px] font-medium tracking-tight block mb-6">WedyPlan.</Link>
          <h2 className="text-[18px] font-medium text-[#111111] mb-4">Yerleştirilmeyenler</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
            <input 
              type="text" 
              placeholder="Davetli ara..."
              className="w-full h-[40px] pl-9 pr-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[12px] text-[13px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors placeholder:text-[#999999]"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {['Ahmet Yılmaz', 'Selin Soylu', 'Burak Deniz (Aile)', 'Ayşe Demir (+1)'].map((guest, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white border border-[rgba(0,0,0,0.06)] rounded-[14px] hover:border-[#111111]/20 hover:shadow-sm transition-all cursor-grab active:cursor-grabbing group">
              <Move className="w-4 h-4 text-[#CCCCCC] group-hover:text-[#111111] transition-colors" />
              <span className="text-[14px] font-medium text-[#111111]">{guest}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 h-screen bg-[#F8F8F7] relative overflow-auto">
        {/* Subtle dot pattern background for canvas feel */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#111111 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Canvas Toolbar */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none">
          <h1 className="text-[24px] font-medium tracking-tight text-[#111111]">Masa Planı</h1>
          <button className="pointer-events-auto h-[44px] px-5 bg-[#111111] text-white rounded-[14px] text-[14px] font-medium flex items-center gap-2 hover:bg-[#333333] transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Masa Ekle
          </button>
        </div>

        {/* Visual Tables */}
        <div className="relative w-full h-full p-24 pointer-events-auto">
          
          {/* Table 1 */}
          <div className="absolute top-[120px] left-[100px] w-[240px] h-[240px] bg-white rounded-full border border-[rgba(0,0,0,0.06)] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center cursor-pointer hover:border-[#7C5CFF]/40 transition-colors">
            <span className="text-[16px] font-medium text-[#111111]">Masa 1</span>
            <span className="text-[12px] text-[#666666] mt-1 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 8 / 10</span>
            
            {/* Simulated seated guests dots */}
            <div className="absolute -top-3 w-8 h-8 rounded-full bg-[#111111] border-2 border-white shadow-sm flex items-center justify-center text-[10px] text-white font-medium">A.Y</div>
            <div className="absolute -right-3 w-8 h-8 rounded-full bg-[#111111] border-2 border-white shadow-sm flex items-center justify-center text-[10px] text-white font-medium">B.D</div>
          </div>

          {/* Table 2 */}
          <div className="absolute top-[160px] left-[450px] w-[280px] h-[120px] bg-white rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center cursor-pointer hover:border-[#7C5CFF]/40 transition-colors">
            <span className="text-[16px] font-medium text-[#111111]">Masa 2 (Aile)</span>
            <span className="text-[12px] text-[#666666] mt-1 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 2 / 12</span>
          </div>

        </div>
      </main>
    </div>
  );
}