'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Crown, 
  User, 
  Building2, 
  CalendarDays, 
  Coins, 
  Loader2, 
  ShieldCheck, 
  Copy, 
  Check 
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export default function PremiumWedyAIAssistant() {
  const [userContext] = useState({
    role: 'cift',
    name: 'Selin & Kaan',
    weddingDate: '15 Eylül 2026',
    budget: '450.000',
    guestCount: '250',
    venue: 'Kır Düğünü / Beykoz'
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hoş geldiniz ${userContext.name}.\n\nWedyPlan VIP Asistanınız olarak 15 Eylül 2026 tarihindeki düğün organizasyonunuz, 450.000 TL bütçe planlamanız ve davetli yönetimiz ile ilgili tüm detaylara hakimim. Bugün size nasıl yardımcı olabilirim?`,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const quickPrompts = [
    { title: 'Bütçe Optimizasyonu', text: `${userContext.budget} TL bütçemizi kalem kalem en verimli şekilde nasıl dağıtabiliriz?`, icon: Coins },
    { title: 'Zaman Çizelgesi', text: `${userContext.weddingDate} tarihine kalan süre için detaylı aksiyon planı çıkar.`, icon: CalendarDays },
    { title: 'Mekan & Sözleşme', text: `${userContext.venue} konsepti için sözleşmede dikkat etmemiz gereken kritik maddeler nelerdir?`, icon: Crown },
  ];

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: now
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);

    const aiMsgId = (Date.now() + 1).toString();
    
    setMessages(prev => [...prev, { id: aiMsgId, sender: 'ai', text: '', time: now }]);

    try {
      const apiMessages = updatedMessages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, userContext: userContext }),
      });

      if (!res.ok) {
        let errorMsg = 'Yanıt alınamadı.';
        try { 
          const errData = await res.json(); 
          errorMsg = errData.error || errorMsg; 
        } catch { 
          errorMsg = `Sunucu Hatası (${res.status})`; 
        }
        throw new Error(errorMsg);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      if (!reader) throw new Error('Akış başlatılamadı.');

      let accumulatedText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(':')) continue;
          
          if (trimmed === 'data: [DONE]') {
            setIsLoading(false);
            return;
          }

          if (trimmed.startsWith('data: ')) {
            try {
              const json = JSON.parse(trimmed.substring(6));
              const content = json.choices?.[0]?.delta?.content;
              if (content) {
                accumulatedText += content;
                setMessages(prev => prev.map(msg => msg.id === aiMsgId ? { ...msg, text: accumulatedText } : msg));
              }
            } catch (e) {
              // Tamamlanmamış JSON paketleri geçilir
            }
          }
        }
      }
    } catch (error: any) {
      console.error('WedyAI Hata:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMsgId
            ? { ...msg, text: `⚠️ Sistem Uyarısı: ${error.message}` }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto space-y-8 pb-20 pt-4 font-sans selection:bg-[#111111] selection:text-white">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#111111] text-white rounded-full text-[11px] font-medium tracking-widest uppercase shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>WedyPlan Concierge • Real-time AI Assistant</span>
        </div>
        
        <h1 className="text-[38px] md:text-[44px] font-serif font-normal tracking-tight text-[#111111] leading-tight">
          Kişiselleştirilmiş Düğün Danışmanlığı
        </h1>
        
        <p className="text-[15px] text-[#666666] max-w-[600px] mx-auto font-light leading-relaxed">
          Sadece size özel bütçe, davetli ve konsept verileriyle entegre çalışan canlı yapay zeka asistanınız.
        </p>
      </div>

      {/* Profil Özet Bilgi Kartı */}
      <div className="bg-[#FBFBFB] border border-black/[0.06] rounded-[24px] p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#111111] text-[#D4AF37] flex items-center justify-center font-serif text-lg font-bold">
            {userContext.role === 'firma' ? <Building2 className="w-5 h-5" /> : <Crown className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-[14px] font-medium text-[#111111]">{userContext.name}</div>
            <div className="text-[12px] text-[#888888]">{userContext.role === 'firma' ? 'Onaylı Tedarikçi Portalı' : 'Özel Müşteri Profili'}</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[13px] text-[#555555]">
          <div><span className="text-[#999999]">Tarih:</span> <strong className="text-[#111111] font-medium">{userContext.weddingDate}</strong></div>
          <div><span className="text-[#999999]">Bütçe:</span> <strong className="text-[#111111] font-medium">{userContext.budget} TL</strong></div>
          <div><span className="text-[#999999]">Davetli:</span> <strong className="text-[#111111] font-medium">{userContext.guestCount} Kişi</strong></div>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickPrompts.map((p, idx) => {
          const Icon = p.icon;
          return (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSend(p.text)}
              className="p-5 bg-white border border-black/[0.08] rounded-[22px] text-left hover:border-[#111111] hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all space-y-2 group disabled:opacity-50"
            >
              <div className="flex items-center gap-2 text-[#111111]">
                <Icon className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[13px] font-medium tracking-wide">{p.title}</span>
              </div>
              <p className="text-[12px] text-[#666666] line-clamp-2 group-hover:text-[#111111] leading-relaxed">
                {p.text}
              </p>
            </button>
          );
        })}
      </div>

      {/* Chat Container */}
      <div className="bg-white border border-black/[0.08] rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-6 min-h-[480px] flex flex-col justify-between">
        
        {/* Messages List */}
        <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-4 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs shrink-0 shadow-sm ${
                m.sender === 'user' ? 'bg-[#111111] text-white' : 'bg-[#F4F4F0] border border-black/10 text-[#111111]'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
              </div>

              <div className={`group relative p-5 rounded-[22px] max-w-[82%] text-[14px] leading-relaxed whitespace-pre-wrap ${
                m.sender === 'user'
                  ? 'bg-[#111111] text-white rounded-tr-none font-light'
                  : 'bg-[#FBFBF9] text-[#111111] rounded-tl-none border border-black/[0.05] font-normal shadow-sm'
              }`}>
                {m.sender === 'ai' && m.text && (
                  <button
                    onClick={() => copyToClipboard(m.id, m.text)}
                    className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-black/5 rounded-lg text-[#888888]"
                    title="Mesajı Kopyala"
                  >
                    {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}

                <p>{m.text || (isLoading && m.sender === 'ai' ? '...' : '')}</p>
                <span className={`block text-[10px] mt-2 tracking-wider ${m.sender === 'user' ? 'text-white/40 text-right' : 'text-[#999999]'}`}>
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative pt-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Düğün planlamanız veya bütçeniz hakkında bir soru sorun..."
            className="w-full h-[58px] pl-6 pr-16 bg-[#FBFBF9] border border-black/[0.08] rounded-[22px] text-[14px] text-[#111111] outline-none focus:border-[#111111] focus:bg-white transition-all shadow-inner disabled:opacity-60 placeholder:text-[#999999]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 translate-y-[1px] w-11 h-11 bg-[#111111] hover:bg-[#333333] text-white rounded-[16px] flex items-center justify-center transition-all disabled:opacity-30 shadow-md"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>

      </div>
    </div>
  );
}