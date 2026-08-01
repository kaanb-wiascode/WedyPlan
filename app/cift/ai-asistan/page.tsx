'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User, CalendarDays, Coins, Loader2, ShieldCheck, Palette, CheckCircle2, Mic, MicOff } from 'lucide-react';

interface ActionPayload {
  type: 'BUDGET_ADDED' | 'INFO_UPDATED' | 'THEME_GENERATED';
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
    weddingDate: '15 Eylül 2026',
    budget: '450.000',
    guestCount: '250',
    venue: 'Kır Düğünü / Beykoz'
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hoş geldiniz ${userContext.name}.\n\nWedyPlan VIP Asistanınız olarak emrinizdeyim. Bütçenize harcama ekleyebilir veya size özel düğün konseptleri ve renk paletleri tasarlayabilirim.`,
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
    if (!recognitionRef.current) return alert('Tarayıcı ses tanımayı desteklemiyor.');
    isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
    setIsListening(!isListening);
  };

  const quickPrompts = [
    { title: 'Renk Paleti Öner', text: 'Kır düğünümüz için Bohem tarzında, pastel tonlardan oluşan bir renk paleti tasarlar mısın?', icon: Palette },
    { title: 'Bütçe Analizi', text: `${userContext.budget} TL bütçemizi nasıl dağıtabiliriz?`, icon: Coins },
    { title: 'Zaman Çizelgesi', text: 'Düğüne 6 ay kala yapılacaklar listesi ver.', icon: CalendarDays },
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
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: `Bağlantı Hatası: ${error.message}`, time: now }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-[1000px] mx-auto space-y-8 font-sans antialiased">
      
      {/* Header */}
      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
          <span>WedyPlan Concierge • AI Assistant</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Kişiselleştirilmiş Düğün Danışmanlığı
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Düğününüzle ilgili sorularınızı 7/24 WedyAI asistanınıza danışabilirsiniz.
        </p>
      </div>

      {/* Quick Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickPrompts.map((p, idx) => (
          <button key={idx} disabled={isLoading} onClick={() => handleSend(p.text)} className="p-4 bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-left hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition-all backdrop-blur-2xl shadow-xs group cursor-pointer">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-white mb-1.5">
              <p.icon className="w-4 h-4 text-zinc-500" />
              <span className="text-xs font-bold">{p.title}</span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">{p.text}</p>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 backdrop-blur-2xl shadow-xs min-h-[480px] flex flex-col justify-between space-y-4">
        
        <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin">
          {messages.map((m) => (
            <div key={m.id} className={`flex items-start gap-3.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.sender === 'user' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'}`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl max-w-[82%] text-xs leading-relaxed ${m.sender === 'user' ? 'bg-zinc-900 text-white rounded-tr-none dark:bg-white dark:text-zinc-900' : 'bg-zinc-50/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 rounded-tl-none border border-zinc-200/60 dark:border-zinc-700/60'}`}>
                <p className="whitespace-pre-line">{m.text}</p>

                {/* BÜTÇE KARTI */}
                {m.action?.type === 'BUDGET_ADDED' && (
                  <div className="mt-3 p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl flex justify-between gap-3 text-xs">
                    <div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><div><span className="font-semibold block">{m.action.data.category}</span><span className="text-zinc-400 text-[10px]">{m.action.data.notes}</span></div></div>
                    <span className="font-mono font-bold bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md">+{m.action.data.amount.toLocaleString('tr-TR')} TL</span>
                  </div>
                )}

                {/* RENK PALETİ KARTI */}
                {m.action?.type === 'THEME_GENERATED' && (
                  <div className="mt-3 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Palette className="w-4 h-4 text-zinc-500" />
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{m.action.data.themeName}</h4>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-3">{m.action.data.description}</p>
                    <div className="flex h-12 w-full rounded-lg overflow-hidden shadow-inner">
                      {m.action.data.colors.map((color: string, i: number) => (
                        <div key={i} className="flex-1 flex items-end justify-center pb-1 group relative" style={{ backgroundColor: color }}>
                          <span className="text-white text-[9px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <span className={`block text-[9px] mt-1.5 tracking-wider ${m.sender === 'user' ? 'opacity-60 text-right' : 'text-zinc-400'}`}>{m.time}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-zinc-50 dark:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200 flex gap-2 items-center">
                <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
                <span className="text-xs text-zinc-500">WedyPlan asistanınız yanıtlıyor...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative pt-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading} placeholder="Örn: 'Kumsal düğünü için renk paleti öner'..." className={`w-full h-12 pl-4 pr-24 border rounded-2xl text-xs outline-none transition-all ${isListening ? 'bg-zinc-100 border-zinc-400' : 'bg-zinc-50/80 dark:bg-zinc-800/40 border-zinc-200/70 dark:border-zinc-700 focus:border-zinc-900 dark:focus:border-white focus:bg-white dark:focus:bg-zinc-900 text-zinc-900 dark:text-white'}`} />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1.5">
            <button type="button" onClick={toggleListening} className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isListening ? 'bg-zinc-900 text-white animate-pulse' : 'bg-zinc-200/60 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'}`}>
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            </button>
            <button type="submit" disabled={!input.trim() || isLoading} className="w-8 h-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl flex items-center justify-center disabled:opacity-50">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}