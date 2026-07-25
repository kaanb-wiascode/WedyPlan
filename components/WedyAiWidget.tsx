'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, X, Send, Mic, MicOff, User, Loader2, Maximize2, Minimize2, Crown, Palette, 
  CheckCircle2, MapPin, Star, Clock, Users, Building2, ChevronRight
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

export default function WedyAiWidget({ userName = 'Selin & Kaan' }: { userName?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Merhaba ${userName}! WedyAI VIP Concierge hizmetinizde.\n\nMekan önerebilir, bütçenizi güncelleyebilir, zaman çizelgesi çıkarabilir veya davetli düzeninizi organize edebilirim.`,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'tr-TR';
      recognitionRef.current.onresult = (e: any) => {
        setInput(e.results[0][0].transcript);
        setIsListening(false);
      };
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return alert('Tarayıcınız sesli komutu desteklemiyor.');
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input, time: now };

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
    <div className="fixed bottom-6 right-6 z-50 font-sans selection:bg-[#111111] selection:text-white">
      
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3.5 bg-[#111111] hover:bg-[#222222] text-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.25)] border border-white/10 transition-all hover:scale-105"
        >
          <div className="w-8 h-8 rounded-full bg-[#222222] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[13px] font-medium tracking-wide">WedyAI Concierge</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
          </span>
        </button>
      )}

      {isOpen && (
        <div className={`bg-white border border-black/10 rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.18)] flex flex-col justify-between transition-all duration-300 overflow-hidden ${isExpanded ? 'w-[90vw] md:w-[620px] h-[82vh]' : 'w-[90vw] sm:w-[400px] h-[540px]'}`}>
          
          {/* Header */}
          <div className="p-4 bg-[#111111] text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37]">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[13px] font-medium leading-tight">WedyPlan VIP Concierge</h3>
                <span className="text-[10px] text-white/50 block">Anlık Akıllı Asistan</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 transition-colors">
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 overflow-y-auto flex-1 space-y-4 bg-[#FBFBF9]">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] shrink-0 ${m.sender === 'user' ? 'bg-[#111111] text-white' : 'bg-white border border-black/10 text-[#111111]'}`}>
                  {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />}
                </div>

                <div className={`p-3.5 rounded-[18px] max-w-[88%] text-[13px] leading-relaxed whitespace-pre-wrap ${m.sender === 'user' ? 'bg-[#111111] text-white rounded-tr-none font-light' : 'bg-white text-[#111111] rounded-tl-none border border-black/[0.06] shadow-sm'}`}>
                  <p>{m.text}</p>

                  {/* 1. BÜTÇE KARTI */}
                  {m.action?.type === 'BUDGET_ADDED' && (
                    <div className="mt-3 p-3 bg-[#FBFBF9] border border-black/10 rounded-[12px] flex justify-between items-center text-[12px]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-semibold">{m.action.data.category}</span>
                      </div>
                      <span className="font-mono font-bold bg-[#EFEFED] px-2.5 py-0.5 rounded-full">
                        +{m.action.data.amount.toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                  )}

                  {/* 2. RENK PALETİ KARTI */}
                  {m.action?.type === 'THEME_GENERATED' && (
                    <div className="mt-3 p-3 bg-[#FBFBF9] border border-black/5 rounded-[16px]">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Palette className="w-4 h-4 text-[#D4AF37]" />
                        <h4 className="font-serif text-[14px] font-medium text-[#111111]">{m.action.data.themeName}</h4>
                      </div>
                      <p className="text-[11px] text-[#666666] mb-2.5">{m.action.data.description}</p>
                      <div className="flex h-10 w-full rounded-[10px] overflow-hidden shadow-inner">
                        {m.action.data.colors?.map((color: string, i: number) => (
                          <div key={i} className="flex-1 flex items-end justify-center pb-1 group relative cursor-pointer" style={{ backgroundColor: color }}>
                            <span className="text-white text-[9px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-1 py-0.5 rounded backdrop-blur-sm">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. MEKAN & TEDARİKÇİ KARTLARI */}
                  {m.action?.type === 'VENDORS_RECOMMENDED' && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-1.5 text-[#111111] font-medium text-[12px] mb-1">
                        <Building2 className="w-4 h-4 text-[#D4AF37]" />
                        <span>Önerilen {m.action.data.category} Seçenekleri</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {m.action.data.vendors?.map((v: any, idx: number) => (
                          <div key={idx} className="p-3 bg-[#FBFBF9] border border-black/10 rounded-[14px] flex items-center justify-between hover:border-[#111111] transition-all">
                            <div className="space-y-0.5">
                              <h5 className="font-medium text-[13px] text-[#111111]">{v.name}</h5>
                              <div className="flex items-center gap-2 text-[10px] text-[#666666]">
                                <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-red-500" />{v.location}</span>
                                <span className="flex items-center gap-0.5 text-amber-600"><Star className="w-3 h-3 fill-amber-500 text-amber-500" />{v.rating}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[11px] font-bold text-[#111111] block">{v.priceRange}</span>
                              <button className="text-[10px] text-[#D4AF37] font-medium inline-flex items-center hover:underline">Detaylar <ChevronRight className="w-3 h-3" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4. DÜĞÜN ZAMAN ÇİZELGESİ (TIMELINE) */}
                  {m.action?.type === 'TIMELINE_GENERATED' && (
                    <div className="mt-3 p-3 bg-[#FBFBF9] border border-black/10 rounded-[16px] space-y-2">
                      <div className="flex items-center gap-1.5 text-[#111111] font-medium text-[12px] border-b border-black/5 pb-2">
                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                        <span>{m.action.data.title || 'Düğün Günü Akış Çizelgesi'}</span>
                      </div>
                      <div className="space-y-2 pt-1">
                        {m.action.data.schedule?.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px]">
                            <span className="font-mono font-bold text-[#111111] bg-black/5 px-1.5 py-0.5 rounded shrink-0">{item.time}</span>
                            <div>
                              <span className="font-medium text-[#111111] block">{item.activity}</span>
                              {item.note && <span className="text-[10px] text-[#777777]">{item.note}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. DAVETLİ & MASA DÜZENİ */}
                  {m.action?.type === 'GUESTS_MANAGED' && (
                    <div className="mt-3 p-3 bg-[#FBFBF9] border border-black/10 rounded-[16px] space-y-2 text-[12px]">
                      <div className="flex items-center gap-1.5 text-[#111111] font-medium border-b border-black/5 pb-1.5">
                        <Users className="w-4 h-4 text-[#D4AF37]" />
                        <span>Davetli Yönetimi Güncellendi</span>
                      </div>
                      <p className="text-[11px] text-[#555555]">{m.action.data.actionSummary}</p>
                      {m.action.data.tableNote && (
                        <div className="p-2 bg-white rounded-lg border border-black/5 text-[10px] text-[#333333] font-medium">
                          📍 {m.action.data.tableNote}
                        </div>
                      )}
                    </div>
                  )}

                  <span className={`block text-[9px] mt-1.5 tracking-wider ${m.sender === 'user' ? 'text-white/40 text-right' : 'text-[#999999]'}`}>{m.time}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="p-3.5 rounded-[18px] rounded-tl-none bg-white border border-black/[0.06] text-[#111111] flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="text-[12px] text-[#666666]">Aksiyon hazırlanıyor...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white border-t border-black/[0.06] relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder={isListening ? "Dinliyorum..." : "Mekan önerisi iste, bütçe ekle veya soru sor..."}
                className={`w-full h-[46px] pl-4 pr-20 text-[13px] rounded-[16px] outline-none transition-all ${isListening ? 'bg-red-50 border border-red-400' : 'bg-[#F4F4F0] border border-transparent focus:bg-white focus:border-black/20'}`}
              />
              <div className="absolute right-1.5 flex items-center gap-1">
                <button type="button" onClick={toggleListening} className={`w-8 h-8 rounded-[12px] flex items-center justify-center transition-all ${isListening ? 'bg-red-600 text-white animate-pulse' : 'hover:bg-black/5 text-[#666666]'}`}>
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </button>
                <button type="submit" disabled={!input.trim() || isLoading} className="w-8 h-8 bg-[#111111] hover:bg-[#333333] text-white rounded-[12px] flex items-center justify-center disabled:opacity-30">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>

        </div>
      )}

    </div>
  );
}