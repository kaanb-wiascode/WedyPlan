'use client';

import React, { useEffect, useState, useRef, useTransition } from 'react';
import { 
  getMessageThreads, 
  sendMessage, 
  handleSmartAction,
  generateAiReplyAction 
} from '@/lib/actions/messages';
import { 
  MessageSquare, Search, Building2, Send, FileText, 
  Calendar, CreditCard, Sparkles, CheckCircle2, Check, ExternalLink, Paperclip 
} from 'lucide-react';

export default function MessagesPage() {
  const [threads, setThreads] = useState<any[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const res = await getMessageThreads();
    if (res.success && res.data) {
      setThreads(res.data);
      if (res.data.length > 0) setActiveThreadId(res.data[0].id);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThreadId, threads]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!messageInput.trim() || !activeThreadId) return;

    startTransition(async () => {
      const res = await sendMessage({ threadId: activeThreadId, content: messageInput });
      if (res.success && res.data) {
        setThreads(res.data);
        setMessageInput('');
      }
    });
  };

  const handleAction = (messageId: string, actionType: 'ACCEPT_QUOTE' | 'CONFIRM_MEETING') => {
    if (!activeThreadId) return;
    startTransition(async () => {
      const res = await handleSmartAction(activeThreadId, messageId, actionType);
      if (res.success && res.data) {
        setThreads(res.data);
        showToast(res.message || 'İşlem başarılı.');
      }
    });
  };

  const handleAiReply = (intent: 'DISCOUNT' | 'DETAILS' | 'REJECT') => {
    startTransition(async () => {
      const res = await generateAiReplyAction(intent);
      if (res.success && res.data) {
        setMessageInput(res.data);
      }
    });
  };

  const filteredThreads = threads.filter(t => t.vendorName.toLowerCase().includes(searchQuery.toLowerCase()));
  const activeThread = threads.find(t => t.id === activeThreadId);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-2 border-zinc-900 dark:border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-zinc-500">İletişim Portalı Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 h-[calc(100vh-4rem)] flex flex-col font-sans antialiased">
      
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="p-8 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] shrink-0 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
          <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
          <span>İletişim & Teklifler</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Tedarikçi Mesajları
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Firmalarla mesajlaşın, gelen fiyat tekliflerini ve sözleşmeleri tek tıkla onaylayın.
        </p>
      </div>

      {/* MAIN CHAT INTERFACE (Apple Frosted Glass) */}
      <div className="apple-glass rounded-[28px] overflow-hidden shadow-xs flex-1 flex flex-col lg:flex-row min-h-0">
        
        {/* SOL KOLON: SOHBET LİSTESİ */}
        <div className="w-full lg:w-[320px] border-r border-zinc-200/80 dark:border-zinc-800/80 flex flex-col shrink-0 bg-zinc-50/40 dark:bg-zinc-950/20">
          <div className="p-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Firma ara..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {filteredThreads.map(thread => {
              const isActive = activeThreadId === thread.id;
              const lastMessage = thread.messages[thread.messages.length - 1];

              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full text-left p-4 border-b border-zinc-100 dark:border-zinc-800/60 transition-all flex items-start gap-3 cursor-pointer ${
                    isActive ? 'bg-zinc-200/60 dark:bg-zinc-800/80 relative font-medium' : 'hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-900 dark:bg-white rounded-r-md" />}
                  <div className="w-9 h-9 rounded-full bg-zinc-200/80 dark:bg-zinc-800 flex items-center justify-center shrink-0 font-bold text-xs text-zinc-700 dark:text-zinc-300">
                    <Building2 className="w-4 h-4 text-zinc-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate pr-2">{thread.vendorName}</h4>
                      <span className="text-[10px] text-zinc-400 shrink-0">{thread.lastMessageTime}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-[11px] truncate pr-4 ${thread.unreadCount > 0 ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-400'}`}>
                        {lastMessage?.type !== 'TEXT' ? `[${lastMessage?.type}] Gönderildi` : lastMessage?.content}
                      </p>
                      {thread.unreadCount > 0 && (
                        <span className="w-4 h-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[9px] font-bold flex items-center justify-center shrink-0">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SAĞ KOLON: AKTİF SOHBET VE KARTLAR */}
        <div className="flex-1 flex flex-col min-w-0 bg-zinc-50/20 dark:bg-zinc-900/40">
          
          {activeThread ? (
            <>
              {/* Sohbet Header */}
              <div className="h-16 px-6 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-zinc-900 dark:text-white">{activeThread.vendorName}</h2>
                    <span className="text-[10px] text-zinc-400 font-normal">{activeThread.category}</span>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium hover:bg-zinc-200/80 transition-colors">
                  Firma Profiline Git
                </button>
              </div>

              {/* Mesaj Akışı */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="text-center">
                  <span className="text-[10px] font-medium px-3 py-1 rounded-full bg-zinc-200/50 dark:bg-zinc-800 text-zinc-500">
                    Tedarikçi portalı üzerinden bağlantı kuruldu.
                  </span>
                </div>

                {activeThread.messages.map((msg: any) => {
                  const isCouple = msg.sender === 'COUPLE';

                  return (
                    <div key={msg.id} className={`flex flex-col ${isCouple ? 'items-end' : 'items-start'}`}>
                      
                      {/* NORMAL METİN MESAJI */}
                      {msg.type === 'TEXT' && (
                        <div className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                          isCouple 
                            ? 'bg-zinc-900 text-white rounded-tr-none dark:bg-white dark:text-zinc-900' 
                            : 'bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-200 rounded-tl-none'
                        }`}>
                          {msg.content}
                        </div>
                      )}

                      {/* SMART KART: FİYAT TEKLİFİ */}
                      {msg.type === 'QUOTE' && (
                        <div className="w-[300px] bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 rounded-2xl p-4 shadow-xs space-y-3 rounded-tl-none">
                          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                            <CreditCard className="w-3.5 h-3.5" /> Resmi Fiyat Teklifi
                          </div>
                          <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{msg.content}</h4>
                          <div className="text-2xl font-black text-zinc-900 dark:text-white">
                            ₺{msg.metadata.amount.toLocaleString('tr-TR')}
                          </div>
                          <div className="text-[10px] text-zinc-400 pb-1">Geçerlilik: {msg.metadata.validUntil}</div>
                          
                          {msg.metadata.status === 'PENDING' ? (
                            <button
                              onClick={() => handleAction(msg.id, 'ACCEPT_QUOTE')}
                              disabled={isPending}
                              className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer"
                            >
                              Teklifi Onayla & Bütçeye Ekle
                            </button>
                          ) : (
                            <div className="w-full py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" /> Onaylandı
                            </div>
                          )}
                        </div>
                      )}

                      {/* SMART KART: RANDEVU / TOPLANTI */}
                      {msg.type === 'MEETING' && (
                        <div className="w-[300px] bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 rounded-2xl p-4 shadow-xs space-y-3 rounded-tl-none">
                          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                            <Calendar className="w-3.5 h-3.5" /> Ziyaret & Toplantı Daveti
                          </div>
                          <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{msg.content}</h4>
                          <div className="space-y-1 bg-zinc-50 dark:bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/50 text-[11px] text-zinc-700 dark:text-zinc-300">
                            <div><span className="font-semibold text-zinc-400 w-12 inline-block">Tarih:</span> {msg.metadata.date}</div>
                            <div><span className="font-semibold text-zinc-400 w-12 inline-block">Saat:</span> {msg.metadata.time}</div>
                            <div><span className="font-semibold text-zinc-400 w-12 inline-block">Konum:</span> {msg.metadata.location}</div>
                          </div>
                          
                          {msg.metadata.status === 'PENDING' ? (
                            <button
                              onClick={() => handleAction(msg.id, 'CONFIRM_MEETING')}
                              disabled={isPending}
                              className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black transition-all cursor-pointer"
                            >
                              Randevuyu Onayla
                            </button>
                          ) : (
                            <div className="w-full py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" /> Onaylandı
                            </div>
                          )}
                        </div>
                      )}

                      {/* SMART KART: SÖZLEŞME */}
                      {msg.type === 'CONTRACT' && (
                        <div className="w-[300px] bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 rounded-2xl p-4 shadow-xs space-y-3 rounded-tl-none">
                          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                            <FileText className="w-3.5 h-3.5" /> Resmi Sözleşme
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 bg-zinc-50/50 dark:bg-zinc-900/50">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                                <span className="text-[9px] font-black">PDF</span>
                              </div>
                              <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">{msg.content}</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          </div>
                          <div className="w-full py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold text-center flex items-center justify-center gap-1.5 border border-zinc-200 dark:border-zinc-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Dijital Onay Verildi
                          </div>
                        </div>
                      )}

                      <span className="text-[9px] text-zinc-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Mesaj Gönderme & WedyAI Asistanı */}
              <div className="p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-t border-zinc-200/80 dark:border-zinc-800/80 shrink-0">
                
                {/* AI Hızlı Yanıt Çipleri */}
                <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none">
                  <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1 shrink-0 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-zinc-400" /> WedyAI Yanıt
                  </span>
                  <button onClick={() => handleAiReply('DISCOUNT')} className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700/60 bg-zinc-50 dark:bg-zinc-800/40 text-[10px] font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 transition-colors whitespace-nowrap cursor-pointer">
                    İndirim İste
                  </button>
                  <button onClick={() => handleAiReply('DETAILS')} className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700/60 bg-zinc-50 dark:bg-zinc-800/40 text-[10px] font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 transition-colors whitespace-nowrap cursor-pointer">
                    Detay İste
                  </button>
                  <button onClick={() => handleAiReply('REJECT')} className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700/60 bg-zinc-50 dark:bg-zinc-800/40 text-[10px] font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 transition-colors whitespace-nowrap cursor-pointer">
                    Kibarca Reddet
                  </button>
                </div>

                {/* Mesaj Formu */}
                <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                  <button type="button" className="p-2.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors shrink-0">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <textarea
                    rows={1}
                    placeholder="Mesajınızı yazın..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 max-h-32 p-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium resize-none"
                  />
                  <button
                    type="submit"
                    disabled={!messageInput.trim() || isPending}
                    className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl hover:bg-black transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 space-y-3">
              <MessageSquare className="w-10 h-10 opacity-20" />
              <p className="text-xs font-medium">Sohbete başlamak için sol taraftan bir firma seçin.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}