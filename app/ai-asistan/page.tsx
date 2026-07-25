'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Send, Crown, User, Building2, CalendarDays, Coins, Loader2, ShieldCheck, 
  Copy, Check, CheckCircle2, Mic, MicOff, Palette, MapPin, Star, Clock, Users, ChevronRight
} from 'lucide-react';

interface ActionPayload {
  type: 'BUDGET_ADDED' | 'THEME_GENERATED' | 'VENDORS_RECOMMENDED' | 'TIMELINE_GENERATED' | 'GUESTS_MANAGED';
  data: any;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  action?: ActionPayload;
}

export default function PremiumWedyAIAssistant() {
  const [userContext] = useState({
    role: 'cift',
    name: 'Selin & Kaan',
    weddingDate: '15 Ağustos 2026',
    budget: '350.000 TL',
    guestCount: '250',
    venue: 'Kır Düğünü / Beykoz'
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hoş geldiniz ${userContext.name}.\n\nWedyPlan VIP Asistanınız olarak emrinizdeyim. Bütçenizi yönetebilir, İstanbul'da mekan önerebilir, düğün günü zaman çizelgesi çıkarabilir veya renk paletleri tasarlayabilirim.`,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'tr-TR';
      recognitionRef.current.onresult = (e: any) => { setInput(e.results[0][0].transcript); setIsListening(false); };
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return alert('Tarayıcınız desteklemiyor.');
    isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
    setIsListening(!isListening);
  };

  const quickPrompts = [
    { title: 'Mekan Öner', text: 'İstanbul Beykoz çevresinde kır düğünü mekanları önerir misin?', icon: Building2 },
    { title: 'Zaman Çizelgesi', text: 'Düğün günü için saat saat detaylı akış planı çıkar.', icon: Clock },
    { title: 'Renk Paleti', text: 'Bohem tarzında pastel tonlarda düğün renk paleti tasarla.', icon: Palette },
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: query, time: now }]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const apiMessages = messages.concat({ id: 'temp', sender: 'user', text: query, time: now }).map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, userContext }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text,
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        action: data.action
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: `⚠️ Hata: ${error.message}`, time: now }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto space-y-8 pb-20 pt-4 font-sans selection:bg-[#111111] selection:text-white">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#111111] text-white rounded-full text-[11px] font-medium tracking-widest uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>WedyPlan Concierge • Full Enterprise AI</span>
        </div>
        <h1 className="text-[38px] md:text-[44px] font-serif font-normal tracking-tight text-[#111111]">Kişiselleştirilmiş Düğün Danışmanlığı</h1>
      </div>

      {/* Quick Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickPrompts.map((p, idx) => (
          <button key={idx} disabled={isLoading} onClick={() => handleSend(p.text)} className="p-5 bg-white border border-black/[0.08] rounded-[22px] text-left hover:border-[#111111] transition-all">
            <div className="flex items-center gap-2 text-[#111111] mb-2"><p.icon className="w-4 h-4 text-[#D4AF37]" /><span className="text-[13px] font-medium">{p.title}</span></div>
            <p className="text-[12px] text-[#666666] line-clamp-2">{p.text}</p>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-white border border-black/[0.08] rounded-[32px] p-6 shadow-sm min-h-[480px] flex flex-col justify-between">
        
        <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((m) => (
            <div key={m.id} className={`flex items-start gap-4 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${m.sender === 'user' ? 'bg-[#111111] text-white' : 'bg-[#F4F4F0] text-[#111111]'}`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
              </div>

              <div className={`p-5 rounded-[22px] max-w-[82%] text-[14px] leading-relaxed ${m.sender === 'user' ? 'bg-[#111111] text-white rounded-tr-none' : 'bg-[#FBFBF9] text-[#111111] rounded-tl-none border border-black/[0.05]'}`}>
                <p>{m.text}</p>

                {/* 1. BÜTÇE KARTI */}
                {m.action?.type === 'BUDGET_ADDED' && (
                  <div className="mt-4 p-4 bg-white border rounded-[16px] flex justify-between gap-3 text-[13px]">
                    <div className="flex gap-2.5"><CheckCircle2 className="w-5 h-5 text-emerald-600" /><div><span className="font-semibold block">{m.action.data.category}</span><span className="text-[#666666] text-[11px]">{m.action.data.notes}</span></div></div>
                    <span className="font-mono font-bold bg-[#F4F4F0] px-3 py-1 rounded-full">+{m.action.data.amount.toLocaleString('tr-TR')} TL</span>
                  </div>
                )}

                {/* 2. RENK PALETİ KARTI */}
                {m.action?.type === 'THEME_GENERATED' && (
                  <div className="mt-4 p-5 bg-white border border-black/10 rounded-[20px] shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="w-5 h-5 text-[#D4AF37]" />
                      <h4 className="font-serif text-[18px] font-medium text-[#111111]">{m.action.data.themeName}</h4>
                    </div>
                    <p className="text-[12px] text-[#666666] mb-4">{m.action.data.description}</p>
                    <div className="flex h-16 w-full rounded-xl overflow-hidden shadow-inner">
                      {m.action.data.colors?.map((color: string, i: number) => (
                        <div key={i} className="flex-1 flex items-end justify-center pb-2 group relative" style={{ backgroundColor: color }}>
                          <span className="text-white text-[10px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. MEKAN & TEDARİKÇİ KARTLARI */}
                {m.action?.type === 'VENDORS_RECOMMENDED' && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 font-medium text-[#111111]">
                      <Building2 className="w-5 h-5 text-[#D4AF37]" />
                      <span>Önerilen {m.action.data.category} Seçenekleri</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {m.action.data.vendors?.map((v: any, idx: number) => (
                        <div key={idx} className="p-4 bg-white border border-black/10 rounded-[18px] space-y-2 hover:border-[#111111] transition-all">
                          <div className="flex justify-between items-start">
                            <h5 className="font-semibold text-[#111111] text-[14px]">{v.name}</h5>
                            <span className="flex items-center gap-1 text-[12px] text-amber-600 font-bold"><Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />{v.rating}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[12px] text-[#666666]">
                            <MapPin className="w-3.5 h-3.5 text-red-500" /><span>{v.location}</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-black/5">
                            <span className="font-bold text-[13px] text-[#111111]">{v.priceRange}</span>
                            <button className="text-[12px] text-[#D4AF37] font-medium flex items-center hover:underline">Mekanı İncele <ChevronRight className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. DÜĞÜN ZAMAN ÇİZELGESİ */}
                {m.action?.type === 'TIMELINE_GENERATED' && (
                  <div className="mt-4 p-5 bg-white border border-black/10 rounded-[20px] space-y-3">
                    <div className="flex items-center gap-2 border-b border-black/10 pb-3 font-serif font-medium text-[#111111] text-[16px]">
                      <Clock className="w-5 h-5 text-[#D4AF37]" />
                      <span>{m.action.data.title || 'Düğün Günü Zaman Çizelgesi'}</span>
                    </div>
                    <div className="space-y-3">
                      {m.action.data.schedule?.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 text-[13px]">
                          <span className="font-mono font-bold text-[#111111] bg-black/5 px-2 py-1 rounded shrink-0">{item.time}</span>
                          <div>
                            <span className="font-semibold text-[#111111] block">{item.activity}</span>
                            {item.note && <span className="text-[12px] text-[#666666]">{item.note}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. DAVETLİ & MASA DÜZENİ */}
                {m.action?.type === 'GUESTS_MANAGED' && (
                  <div className="mt-4 p-5 bg-white border border-black/10 rounded-[20px] space-y-3 text-[13px]">
                    <div className="flex items-center gap-2 border-b border-black/10 pb-2 font-medium text-[#111111]">
                      <Users className="w-5 h-5 text-[#D4AF37]" />
                      <span>Davetli Listesi Güncellendi</span>
                    </div>
                    <p className="text-[#555555]">{m.action.data.actionSummary}</p>
                    {m.action.data.tableNote && (
                      <div className="p-3 bg-[#FBFBF9] rounded-xl border border-black/5 text-[#333333] font-medium">
                        📍 {m.action.data.tableNote}
                      </div>
                    )}
                  </div>
                )}

                <span className={`block text-[10px] mt-2 tracking-wider ${m.sender === 'user' ? 'text-white/40 text-right' : 'text-[#999999]'}`}>{m.time}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-4 animate-pulse"><div className="w-9 h-9 rounded-full bg-[#F4F4F0] flex items-center justify-center shrink-0"><Sparkles className="w-4 h-4 text-[#D4AF37]" /></div><div className="p-5 rounded-[22px] rounded-tl-none bg-[#FBFBF9] text-[#111111] flex gap-3"><Loader2 className="w-4 h-4 animate-spin text-[#111111]" /><span className="text-[13px] text-[#666666]">WedyPlan asistanınız hazırlıyor...</span></div></div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative pt-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading} placeholder="Mekan önerisi iste, düğün akışı çıkar veya soru sor..." className={`w-full h-[58px] pl-6 pr-28 border rounded-[22px] text-[14px] outline-none transition-all ${isListening ? 'bg-red-50 border-red-400' : 'bg-[#FBFBF9] border-black/[0.08] focus:border-[#111111] focus:bg-white'}`} />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1.5">
            <button type="button" onClick={toggleListening} className={`w-10 h-10 rounded-[14px] flex items-center justify-center ${isListening ? 'bg-red-600 text-white animate-pulse' : 'bg-[#F4F4F0] text-[#111111]'}`}>{isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}</button>
            <button type="submit" disabled={!input.trim() || isLoading} className="w-11 h-11 bg-[#111111] text-white rounded-[16px] flex items-center justify-center"><Send className="w-4 h-4" /></button>
          </div>
        </form>

      </div>
    </div>
  );
}