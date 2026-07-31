// app/cift/messages/page.tsx
'use client';

import { useEffect, useState, useTransition } from 'react';
import {
  getConversations,
  getConversationMessages,
  sendMessage,
} from '@/lib/actions/messages';

export default function MessagesPage() {
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputContent, setInputContent] = useState('');

  // Sohbetleri Yükle
  const loadConversations = async () => {
    setLoadingConversations(true);
    const res = await getConversations();
    if (res.success && res.data) {
      setConversations(res.data);
      if (res.data.length > 0 && !selectedConversation) {
        setSelectedConversation(res.data[0]);
      }
    }
    setLoadingConversations(false);
  };

  // Seçili sohbetin mesajlarını yükle
  const loadMessages = async (conversationId: string) => {
    setLoadingMessages(true);
    const res = await getConversationMessages(conversationId);
    if (res.success && res.data) {
      setMessages(res.data);
    }
    setLoadingMessages(false);
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation?.id) {
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  // Mesaj Gönder
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim() || !selectedConversation) return;

    const messageText = inputContent;
    setInputContent('');

    startTransition(async () => {
      const res = await sendMessage({
        conversationId: selectedConversation.id,
        content: messageText,
        senderName: 'Çift',
      });

      if (res.success) {
        await loadMessages(selectedConversation.id);
        await loadConversations();
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Mesajlar & Görüşmeler</h1>
        <p className="text-sm text-gray-500 mt-1">
          Anlaştığınız veya teklif aldığınız düğün firmalarıyla anlık mesajlaşın.
        </p>
      </div>

      {/* Mesajlaşma Ana Gövdesi (Glassmorphism Çift Sütunlu Yapı) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/80 backdrop-blur-md rounded-2xl border shadow-sm overflow-hidden min-h-[600px]">
        
        {/* Sol Sütun: Sohbet Listesi */}
        <div className="border-r border-gray-100 flex flex-col bg-gray-50/50">
          <div className="p-4 border-b bg-white/50">
            <h2 className="font-semibold text-sm text-gray-700">Sohbetler</h2>
          </div>

          <div className="flex-1 overflow-y-auto divide-y">
            {loadingConversations ? (
              <div className="p-6 text-center text-xs text-gray-400">Sohbetler yükleniyor...</div>
            ) : conversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-400">
                Henüz başlatılmış bir sohbet bulunmuyor.
              </div>
            ) : (
              conversations.map((conv) => {
                const isSelected = selectedConversation?.id === conv.id;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full text-left p-4 transition-colors flex items-start justify-between ${
                      isSelected ? 'bg-indigo-50/80 border-l-4 border-indigo-600' : 'hover:bg-gray-100/60'
                    }`}
                  >
                    <div className="space-y-1 overflow-hidden pr-2">
                      <p className="font-bold text-sm text-gray-800 truncate">
                        {conv.vendorName || conv.title || 'Firma Görüşmesi'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {conv.lastMessage || 'Henüz mesaj yok'}
                      </p>
                    </div>
                    {conv.updatedAt && (
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">
                        {new Date(conv.updatedAt).toLocaleTimeString('tr-TR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Sağ Sütun: Mesaj Penceresi */}
        <div className="md:col-span-2 flex flex-col justify-between bg-white">
          {selectedConversation ? (
            <>
              {/* Sohbet Üst Başlığı */}
              <div className="p-4 border-b bg-gray-50/80 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-base">
                    {selectedConversation.vendorName || selectedConversation.title || 'Firma Görüşmesi'}
                  </h3>
                  <p className="text-xs text-emerald-600 font-medium">● Anlık İletişim Hattı</p>
                </div>
              </div>

              {/* Mesaj Akış Alanı */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30">
                {loadingMessages ? (
                  <div className="p-6 text-center text-xs text-gray-400">Mesajlar yükleniyor...</div>
                ) : messages.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-400">
                    Henüz mesaj yok. İlk mesajı göndererek sohbeti başlatın!
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.senderName === 'Çift' || msg.senderId === 'demo-couple-123';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-md p-3.5 rounded-2xl text-sm ${
                            isMe
                              ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                              : 'bg-gray-100 text-gray-800 border rounded-bl-none shadow-sm'
                          }`}
                        >
                          <p>{msg.content}</p>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 px-1">
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleTimeString('tr-TR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : ''}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Mesaj Gönderme Formu */}
              <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50/50 flex gap-3">
                <input
                  type="text"
                  placeholder="Mesajınızı yazın..."
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  className="flex-1 px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white"
                />
                <button
                  type="submit"
                  disabled={isPending || !inputContent.trim()}
                  className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
                >
                  {isPending ? 'Gönderiliyor...' : 'Gönder'}
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Mesajlaşmaya başlamak için soldaki listeden bir sohbet seçin.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}