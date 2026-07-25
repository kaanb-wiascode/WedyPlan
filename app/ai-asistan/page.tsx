'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Send, 
  ChevronLeft, 
  Paperclip,
  MoreHorizontal
} from 'lucide-react';

export default function PremiumAIAssistantPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Merhaba. Ben WedyAI. Düğün konseptiniz, bütçe dağılımınız veya mekan önerileri hakkında size nasıl yardımcı olabilirim?' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: 'Bu harika bir fikir. Kır düğünü konsepti için İstanbul Beykoz bölgesindeki mekanları ve ortalama fiyatlarını sizin için listeleyebilirim. İncelemek ister misiniz?' }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#7C5CFF] selection:text-white flex flex-col">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[rgba(0,0,0,0.06)] shrink-0">
        <div className="max-w-[800px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[15px] font-medium text-[#666666] hover:text-[#111111] transition-colors">
            <ChevronLeft className="w-4 h-4" /> Çıkış
          </Link>
          
          <div className="flex items-center gap-2 text-[15px] font-medium text-[#111111]">
            <Sparkles className="w-4 h-4 text-[#7C5CFF]" /> WedyAI
          </div>

          <button className="text-[#999999] hover:text-[#111111] transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Chat Area */}
      <main className="flex-1 w-full max-w-[800px] mx-auto px-6 pt-8 pb-32 flex flex-col gap-6 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%] p-5 text-[15px] leading-relaxed rounded-[24px] ${
              msg.role === 'user' 
                ? 'bg-[#F8F8F7] text-[#111111] rounded-tr-[8px]' 
                : 'bg-white border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-[#111111] rounded-tl-[8px]'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </main>

      {/* Input Area (Sticky Bottom) */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10 pb-8 px-6 shrink-0">
        <div className="max-w-[800px] mx-auto relative">
          <form onSubmit={handleSend} className="relative flex items-center">
            <button type="button" className="absolute left-4 text-[#999999] hover:text-[#111111] transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="WedyAI'a bir soru sorun..."
              className="w-full bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-full h-[56px] pl-12 pr-14 text-[15px] text-[#111111] outline-none focus:border-[#7C5CFF]/40 transition-colors placeholder:text-[#999999] shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
            />
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="absolute right-2 w-[40px] h-[40px] bg-[#111111] text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:bg-[#E5E5E5] transition-colors"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
          <div className="text-center mt-3 text-[11px] text-[#999999]">
            WedyAI hata yapabilir. Lütfen önemli bilgileri teyit edin.
          </div>
        </div>
      </div>

    </div>
  );
}