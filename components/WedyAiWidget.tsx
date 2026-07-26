'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, X, Send, Mic, MicOff, User, Loader2, Maximize2, Minimize2, Crown, Palette, 
  CheckCircle2, MapPin, Star, Clock, Users, Building2, ChevronRight
} from 'lucide-react';

export default function WedyAiWidget({ userName = 'Selin & Kaan' }: { userName?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [messages, setMessages] = useState<any[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Merhaba ${userName}! WedyAI VIP Concierge hizmetinizde.\n\nMekan önerebilir, bütçenizi güncelleyebilir, zaman çizelgesi çıkarabilir veya davetli düzeninizi organize edebilirim.`,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now().toString(), sender: 'user', text: input, time: now };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = messages.concat(userMsg).map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          userContext: { name: userName, weddingDate: '15 Ağustos 2026', budget: '350.000 TL' }
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Yanıt alınamadı.');

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: data.text,
          time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
          action: data.action
        }
      ]);
    } catch (error: any) {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), sender: 'ai', text: `⚠️ Hata: ${error.message}`, time: now }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans selection:bg-[#D4AF37]/30">
      
      {/* Tetikleyici Cam Buton */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3.5 bg-white/60 hover:bg-white/80 backdrop-blur-2xl border border-white/90 text-[#1D1D1F] rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[13px] font-semibold tracking-wide">WedyAI Concierge</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
          </span>
        </button>
      )}

      {/* Cam Panel Gövdesi */}
      {isOpen && (
        <div className={`bg-white/70 backdrop-blur-3xl border border-white/90 rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.12)] flex flex-col justify-between transition-all duration-300 overflow-hidden ${isExpanded ? 'w-[90vw] md:w-[620px] h-[82vh]' : 'w-[90vw] sm:w-[400px] h-[540px]'}`}>
          
          {/* Header Cam Bar */}
          <div className="p-4 bg-white/50 backdrop-blur-xl text-[#1D1D1F] flex items-center justify-between border-b border-white/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold leading-tight">WedyPlan VIP Concierge</h3>
                <span className="text-[10px] text-[#6E6E73] block">Akıllı Asistan</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 hover:bg-white/50 rounded-lg text-[#6E6E73] transition-colors">
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/50 rounded-lg text-[#6E6E73] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mesaj Alanı */}
          <div className="p-4 overflow-y-auto flex-1 space-y-4 bg-transparent">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] shrink-0 ${m.sender === 'user' ? 'bg-[#1D1D1F] text-white' : 'bg-white/80 border border-white text-[#1D1D1F]'}`}>
                  {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />}
                </div>

                <div className={`p-3.5 rounded-[20px] max-w-[88%] text-[13px] leading-relaxed whitespace-pre-wrap ${m.sender === 'user' ? 'bg-[#1D1D1F] text-white rounded-tr-none' : 'bg-white/80 backdrop-blur-xl text-[#1D1D1F] rounded-tl-none border border-white/80 shadow-sm'}`}>
                  <p>{m.text}</p>
                  <span className={`block text-[9px] mt-1.5 tracking-wider ${m.sender === 'user' ? 'text-white/50 text-right' : 'text-[#86868B]'}`}>{m.time}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-white/80 border border-white flex items-center justify-center text-[#D4AF37]"><Sparkles className="w-3.5 h-3.5" /></div>
                <div className="p-3.5 rounded-[20px] rounded-tl-none bg-white/80 backdrop-blur-xl text-[#1D1D1F] flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /><span className="text-[12px] text-[#666]">Düşünüyor...</span></div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Cam Input Formu */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white/40 backdrop-blur-2xl border-t border-white/60 relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Bir soru sor..."
                className="w-full h-[46px] pl-4 pr-12 text-[13px] rounded-[18px] bg-white/50 backdrop-blur-xl border border-white/80 outline-none focus:bg-white/80 transition-all text-[#1D1D1F]"
              />
              <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-1.5 w-8 h-8 bg-white/80 hover:bg-white text-[#1D1D1F] border border-white rounded-[12px] flex items-center justify-center disabled:opacity-30 transition-all">
                <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          </form>

        </div>
      )}

    </div>
  );
}