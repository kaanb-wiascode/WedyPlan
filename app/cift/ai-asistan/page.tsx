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
  Check,
  CheckCircle2,
  PlusCircle
} from 'lucide-react';

interface ActionPayload {
  type: 'BUDGET_ADDED' | 'INFO_UPDATED';
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
  const [userContext, setUserContext] = useState({
    role: 'cift',
    name: 'Selin & Kaan',
    weddingDate: '15 Eylül 2026',
    budget: '450.000',
    guestCount: '250',
    venue: 'Kır Düğünü / Beykoz'
  });

  const [recentExpenses, setRecentExpenses] = useState<Array<{ category: string; amount: number; notes: string }>>([]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hoş geldiniz ${userContext.name}.\n\nWedyPlan VIP Asistanınız olarak bütçe planlamanız, harcama kalemleriniz ve davetli yönetiminiz için emrinizdeyim.\n\nBana "Bütçeme 35.000 TL Fotoğrafçı ekle" veya "Davetli sayımızı 300 yap" diyerek doğrudan işlem yaptırabilirsiniz.`,
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
    { title: 'Harcama Ekle', text: 'Bütçeme 30.000 TL Fotoğraf ve Video çekimi kalemi ekle.', icon: PlusCircle },
    { title: 'Bütçe Analizi', text: `${userContext.budget} TL bütçemizi en verimli şekilde nasıl dağıtabiliriz?`, icon: Coins },
    { title: 'Zaman Çizelgesi', text: `${userContext.weddingDate} tarihine kalan süre için yapılacaklar listesi ver.`, icon: CalendarDays },
  ];

  const copyToClipboard = (id: string, text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error('Kopyalama hatası:', e);
    }
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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Yapay zeka yanıt veremedi.');
      }

      // Eğer yapay zeka bir aksiyon gerçekleştirdiyse ön yüzdeki durumu güncelle
      if (data.action) {
        if (data.action.type === 'BUDGET_ADDED') {
          setRecentExpenses(prev => [...prev, data.action.data]);
        } else if (data.action.type === 'INFO_UPDATED') {
          setUserContext(prev => ({
            ...prev,
            ...(data.action.data.guestCount && { guestCount: data.action.data.guestCount.toString() }),
            ...(data.action.data.weddingDate && { weddingDate: data.action.data.weddingDate }),
          }));
        }
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text,
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        action: data.action
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      console.error('WedyAI Hata:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `⚠️ Sistem Uyarısı: ${error.message || 'Lütfen tekrar deneyin.'}`,
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
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
          <span>WedyPlan Concierge • Action-Enabled AI</span>
        </div>
        
        <h1 className="text-[38px] md:text-[44px] font-serif font-normal tracking-tight text-[#111111] leading-tight">
          Kişiselleştirilmiş Düğün Danışmanlığı
        </h1>
        
        <p className="text-[15px] text-[#666666] max-w-[600px] mx-auto font-light leading-relaxed">
          Sesli veya yazılı komutlarınızla bütçenizi yöneten ve canlı işlem yapan akıllı asistanınız.
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

                <p>{m.text}</p>

                {/* İnteraktif İşlem Onay Kartı */}
                {m.action && m.action.type === 'BUDGET_ADDED' && (
                  <div className="mt-4 p-4 bg-white border border-black/10 rounded-[16px] shadow-sm flex items-center justify-between gap-3 text-[13px]">
                    <div className="flex items-center gap-2.5 text-[#111111]">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-semibold">{m.action.data.category}</span>
                        <span className="text-[#666666] block text-[11px]">{m.action.data.notes}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#111111] bg-[#F4F4F0] px-3 py-1 rounded-full text-[12px]">
                      +{m.action.data.amount.toLocaleString('tr-TR')} TL
                    </span>
                  </div>
                )}

                <span className={`block text-[10px] mt-2 tracking-wider ${m.sender === 'user' ? 'text-white/40 text-right' : 'text-[#999999]'}`}>
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          {/* Yükleniyor Durumu */}
          {isLoading && (
            <div className="flex items-start gap-4 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-[#F4F4F0] border border-black/10 text-[#111111] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="p-5 rounded-[22px] rounded-tl-none bg-[#FBFBF9] border border-black/[0.05] text-[#111111] flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-[#111111]" />
                <span className="text-[13px] font-medium text-[#666666]">WedyPlan Concierge komutunuzu işliyor...</span>
              </div>
            </div>
          )}

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
            placeholder="Örn: 'Bütçeme 20.000 TL gelinlik harcaması ekle'..."
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