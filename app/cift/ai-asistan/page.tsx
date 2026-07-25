'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  CalendarDays,
  Coins,
  Loader2
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export default function WedyAIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Merhaba! Ben WedyAI, kişisel düğün planlama asistanınızım. Bütçeniz, konsept seçiminiz, davetli yönetimi veya tedarikçi pazarlıkları ile ilgili bana dilediğiniz soruyu sorabilirsiniz.',
      time: '14:00'
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    { title: 'Bütçe Tavsiyesi', text: '350.000 TL bütçe ile İstanbul kır düğünü nasıl planlanır?', icon: Coins },
    { title: 'Düğün Takvimi', text: 'Düğüne 6 ay kala yapılması gerekenlerin listesini ver.', icon: CalendarDays },
    { title: 'Mekan İpuçları', text: 'Düğün mekanı seçerken sözleşmede neye dikkat etmeliyim?', icon: Lightbulb },
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Kullanıcı mesajını ekrana ekle
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
      // 2. Mesaj geçmişini API formatına getir
      const apiMessages = updatedMessages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      // 3. Backend API'ye istek at
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Yapay zeka yanıt veremedi.');
      }

      // 4. Gerçek AI cevabını ekrana ekle
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      console.error('AI Hatası:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `⚠️ Bir bağlantı hatası oluştu: ${error.message || 'Lütfen tekrar deneyin.'}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7C5CFF]/10 text-[#7C5CFF] rounded-full text-[12px] font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WedyAI Düğün Motoru v2.0</span>
        </div>
        <h1 className="text-[32px] font-medium tracking-tight text-[#111111]">
          Akıllı Planlama Asistanı (TEST)
        </h1>
        <p className="text-[14px] text-[#666666]">
          Sorularınızı sorun, anında uzman tavsiyeleri ve bütçe analizleri alın.
        </p>
      </div>

      {/* Quick Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {quickPrompts.map((p, idx) => {
          const Icon = p.icon;
          return (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSend(p.text)}
              className="p-4 bg-white border border-[rgba(0,0,0,0.06)] rounded-[20px] text-left hover:border-[#7C5CFF] hover:shadow-[0_4px_20px_rgba(124,92,255,0.08)] transition-all space-y-2 group disabled:opacity-50"
            >
              <div className="flex items-center gap-2 text-[#7C5CFF]">
                <Icon className="w-4 h-4" />
                <span className="text-[13px] font-medium">{p.title}</span>
              </div>
              <p className="text-[12px] text-[#666666] line-clamp-2 group-hover:text-[#111111]">
                {p.text}
              </p>
            </button>
          );
        })}
      </div>

      {/* Chat Container */}
      <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-4 min-h-[400px] flex flex-col justify-between">
        
        {/* Messages */}
        <div className="space-y-4 overflow-y-auto max-h-[450px] pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                m.sender === 'user' ? 'bg-[#111111] text-white' : 'bg-[#7C5CFF] text-white'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-[20px] max-w-[80%] text-[14px] leading-relaxed whitespace-pre-wrap ${
                m.sender === 'user'
                  ? 'bg-[#111111] text-white rounded-tr-none'
                  : 'bg-[#F8F8F7] text-[#111111] rounded-tl-none border border-[rgba(0,0,0,0.04)]'
              }`}>
                <p>{m.text}</p>
                <span className={`block text-[10px] mt-1.5 ${m.sender === 'user' ? 'text-white/50 text-right' : 'text-[#999999]'}`}>
                  {m.time}
                </span>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#7C5CFF] text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-[20px] rounded-tl-none bg-[#F8F8F7] border border-[rgba(0,0,0,0.04)] text-[#7C5CFF] flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-[13px] font-medium text-[#666666]">WedyAI cevabı hazırlıyor...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
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
            placeholder="WedyAI'a bir şey sorun..."
            className="w-full h-[54px] pl-5 pr-14 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[20px] text-[14px] text-[#111111] outline-none focus:border-[#7C5CFF] focus:bg-white transition-all disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 translate-y-[1px] w-10 h-10 bg-[#111111] hover:bg-[#333333] text-white rounded-[14px] flex items-center justify-center transition-all disabled:opacity-40"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>

      </div>

    </div>
  );
}   