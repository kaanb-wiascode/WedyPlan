'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Sparkles, 
  Calendar, 
  Users, 
  Wallet,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Paperclip,
  Send
} from 'lucide-react';

// Mock Data
const LEADS = [
  { id: '1', name: 'Selin & Caner', date: '15 Ağu 2026', status: 'Yeni Talep', time: '12 Dk Önce', unread: true },
  { id: '2', name: 'Ayşe & Burak', date: '22 Ağu 2026', status: 'Görüşülüyor', time: '2 Saat Önce', unread: false },
  { id: '3', name: 'Zeynep & Murat', date: '05 Eyl 2026', status: 'Teklif İletildi', time: '1 Gün Önce', unread: false },
];

export default function PremiumVendorCRMPage() {
  const [activeLead, setActiveLead] = useState(LEADS[0]);
  const [replyText, setReplyText] = useState('');
  const [isAiDrafting, setIsAiDrafting] = useState(false);

  // Invisible AI: Smart Reply Generator
  const generateAiReply = (type: 'invite' | 'discount' | 'info') => {
    setIsAiDrafting(true);
    setReplyText('');
    
    setTimeout(() => {
      if (type === 'invite') {
        setReplyText(`Merhaba Selin Hanım,\n\n15 Ağustos 2026 tarihindeki 300 kişilik kır düğünü planınız için tesisimiz oldukça uygundur. İstediğiniz "Sade & Lüks" konseptini canlı olarak görebilmeniz ve şefimizin özel menülerini tadabilmeniz için sizi bu hafta sonu kahveye davet etmek isteriz.\n\nHangi gün sizin için uygun olur?`);
      } else if (type === 'discount') {
        setReplyText(`Selin Hanım Merhaba,\n\nEylül sonuna kadar yapılan erken rezervasyonlarda 2026 sezonu için geçerli %15 indirim kampanyamız mevcuttur. Düğün bütçenizi (350.000 TL) korumanız adına bu fırsatı değerlendirmenizi öneririm. Detaylı PDF teklifini iletiyorum.`);
      }
      setIsAiDrafting(false);
    }, 800);
  };

  return (
    <div className="h-screen bg-[#F8F8F7] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white flex overflow-hidden">
      
      {/* Left Sidebar: Leads List */}
      <aside className="w-full md:w-[360px] bg-white border-r border-[rgba(0,0,0,0.06)] flex flex-col shrink-0 h-full">
        <div className="p-6 border-b border-[rgba(0,0,0,0.04)] space-y-4">
          <Link href="/satici" className="text-[20px] font-medium tracking-tight block">WedyPlan CRM</Link>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
            <input 
              type="text" 
              placeholder="Çift ara..."
              className="w-full h-[44px] pl-10 pr-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[14px] text-[13px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-[#111111] text-white text-[12px] font-medium rounded-full">Hepsi (14)</button>
            <button className="px-3 py-1.5 bg-[#F8F8F7] text-[#666666] text-[12px] font-medium rounded-full">Okunmayan (2)</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {LEADS.map((lead) => (
            <div 
              key={lead.id} 
              onClick={() => setActiveLead(lead)}
              className={`p-4 rounded-[16px] cursor-pointer transition-all border ${
                activeLead.id === lead.id 
                  ? 'bg-white border-[#111111] shadow-[0_4px_20px_rgba(0,0,0,0.04)]' 
                  : 'bg-transparent border-transparent hover:bg-white hover:border-[rgba(0,0,0,0.04)]'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-[15px] ${lead.unread ? 'font-bold' : 'font-medium'}`}>{lead.name}</h3>
                <span className="text-[11px] text-[#999999]">{lead.time}</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#666666] flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {lead.date}</span>
                <span className={`px-2 py-0.5 rounded-full font-medium ${
                  lead.status === 'Yeni Talep' ? 'bg-[#7C5CFF]/10 text-[#7C5CFF]' : 'bg-[#F8F8F7] text-[#666666]'
                }`}>{lead.status}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Right Side: Chat & AI Action Center */}
      <main className="flex-1 flex flex-col h-full bg-[#FFFFFF]">
        
        {/* Header Info */}
        <header className="h-[80px] px-8 border-b border-[rgba(0,0,0,0.04)] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#F8F8F7] rounded-full flex items-center justify-center text-[#111111] font-medium text-[16px]">
              S&C
            </div>
            <div>
              <h2 className="text-[18px] font-medium text-[#111111]">{activeLead.name}</h2>
              <div className="flex items-center gap-3 text-[13px] text-[#666666] mt-0.5">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {activeLead.date}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 300 Kişi</span>
                <span className="flex items-center gap-1"><Wallet className="w-3.5 h-3.5" /> 350.000 ₺ Kapsamlı Bütçe</span>
              </div>
            </div>
          </div>
          <button className="h-[40px] px-5 bg-[#111111] text-white rounded-[12px] text-[13px] font-medium transition-colors shadow-sm">
            Teklif Oluştur
          </button>
        </header>

        {/* INVISIBLE AI: Sales & Context Advisor (Not a Chatbot!) */}
        <div className="px-8 py-4 bg-gradient-to-r from-[#7C5CFF]/5 to-transparent border-b border-[#7C5CFF]/10 shrink-0">
          <div className="flex gap-4 items-start">
            <div className="mt-0.5">
              <Sparkles className="w-5 h-5 text-[#7C5CFF]" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#7C5CFF] tracking-wider uppercase mb-1">AI Satış Analizi</h4>
              <p className="text-[14px] text-[#111111] leading-relaxed">
                Bu çift "Sade & Lüks" konsept arıyor ve bütçeleri (350K) ortalamanın %20 üzerinde. İlk mesajda fiyattan çok <strong className="font-semibold">vizyona ve menü tadımına</strong> odaklanmanız dönüşüm oranınızı (Conversion) %60 artıracaktır.
              </p>
              
              {/* Proactive Risk Warning */}
              <p className="text-[13px] text-[#FF453A] flex items-center gap-1.5 mt-2 font-medium">
                <AlertTriangle className="w-4 h-4" /> 12 dakikadır yanıt bekleniyor. 30 dakikayı aşan yanıtlarda çiftler diğer firmalara yöneliyor.
              </p>
            </div>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="flex justify-start">
            <div className="max-w-[70%] bg-[#F8F8F7] p-5 rounded-[24px] rounded-tl-[8px] text-[14px] text-[#111111] leading-relaxed border border-[rgba(0,0,0,0.04)]">
              <p>Merhaba, Bosphorus Palace'ı çok beğendik. 15 Ağustos 2026 tarihi için 300 kişilik kır düğünü planlıyoruz. Sade ve şık bir konsept hayal ediyoruz. Yemekli menü fiyatlarınız ve müsaitlik durumunuz nedir?</p>
              <span className="text-[11px] text-[#999999] block mt-3">Bugün, 14:30</span>
            </div>
          </div>
        </div>

        {/* AI Action Area & Message Input */}
        <div className="p-8 pt-0 shrink-0">
          
          {/* Invisible AI: Contextual Draft Buttons */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[12px] font-medium text-[#7C5CFF] mr-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Akıllı Yanıtlar:
            </span>
            <button 
              onClick={() => generateAiReply('invite')}
              className="px-3 py-1.5 bg-white border border-[rgba(0,0,0,0.08)] hover:border-[#7C5CFF]/50 hover:bg-[#7C5CFF]/5 text-[#111111] text-[12px] font-medium rounded-full transition-all"
            >
              Menü Tadımına Davet Et
            </button>
            <button 
              onClick={() => generateAiReply('discount')}
              className="px-3 py-1.5 bg-white border border-[rgba(0,0,0,0.08)] hover:border-[#7C5CFF]/50 hover:bg-[#7C5CFF]/5 text-[#111111] text-[12px] font-medium rounded-full transition-all"
            >
              Erken Rezervasyon İndirimi Sun
            </button>
          </div>

          <div className="relative">
            <div className={`absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-[20px] transition-all duration-300 ${isAiDrafting ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="flex items-center gap-2 text-[#7C5CFF] font-medium text-[14px]">
                <Sparkles className="w-4 h-4 animate-pulse" /> WedyAI Yanıtınızı Oluşturuyor...
              </div>
            </div>

            <textarea 
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Mesajınızı yazın veya WedyAI akıllı yanıtlarını kullanın..."
              className="w-full min-h-[120px] bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[20px] p-5 text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors resize-none placeholder:text-[#999999]"
            />
            
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center text-[#999999] hover:text-[#111111] transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button 
                disabled={!replyText.trim()}
                className="h-10 px-5 bg-[#111111] text-white rounded-[12px] text-[13px] font-medium flex items-center gap-2 disabled:opacity-50 transition-colors"
              >
                Gönder <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}