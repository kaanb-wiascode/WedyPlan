'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User, Bot, Loader2, ShieldCheck, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export default function VendorAiCopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Merhaba! Ben WedyAI Firma Copilotiniz. Yeni gelen taleplere otomatik yanıt taslağı oluşturabilir, pazar fiyat analizi yapabilir veya sözleşme şartlarınızı optimize edebilirim.',
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: input, time: now }]);
    const currentQuery = input;
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `"${currentQuery}" konusuyla ilgili WedyAI pazar analizi tamamlandı. Bölgenizdeki ortalama teklif dönüşüm oranlarını artırmak için fiyat taslağınızı hazırlamamı ister misiniz?`,
          time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-[1000px] mx-auto space-y-8 font-sans antialiased">
      
      {/* HEADER */}
      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
          <span>WedyAI Copilot • Vendor Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Akıllı Firma Danışmanı
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Teklif dönüşümlerinizi ve müşteri iletişiminizi yapay zeka ile hızlandırın.
        </p>
      </div>

      {/* CHAT CONTAINER */}
      <div className="bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 backdrop-blur-2xl shadow-xs min-h-[480px] flex flex-col justify-between space-y-4">
        <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin">
          {messages.map((m) => (
            <div key={m.id} className={`flex items-start gap-3.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.sender === 'user' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'}`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl max-w-[82%] text-xs leading-relaxed ${m.sender === 'user' ? 'bg-zinc-900 text-white rounded-tr-none dark:bg-white dark:text-zinc-900' : 'bg-zinc-50/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 rounded-tl-none border border-zinc-200/60 dark:border-zinc-700/60'}`}>
                <p className="whitespace-pre-line">{m.text}</p>
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
                <span className="text-xs text-zinc-500">WedyAI pazar verilerini analiz ediyor...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} className="relative pt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Örn: 'Selin & Caner çifti için teklif mektubu taslağı hazırla'..."
            className="w-full h-12 pl-4 pr-16 border border-zinc-200/80 dark:border-zinc-700/60 rounded-2xl text-xs bg-zinc-50/80 dark:bg-zinc-800/40 focus:border-zinc-900 dark:focus:border-white text-zinc-900 dark:text-white outline-none transition-all font-medium"
          />
          <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl flex items-center justify-center disabled:opacity-50 cursor-pointer">
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
}