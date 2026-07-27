"use client";

import React, { useState, useRef, useEffect } from "react";
import AIMessageInsightsWidget from "./AIMessageInsightsWidget";
import { sendMessageAction } from "@/lib/actions/messages";

export default function ChatThread({
  userId,
  conversation,
}: {
  userId: string;
  conversation: any;
}) {
  const [messages, setMessages] = useState<any[]>(conversation?.messages || []);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(conversation?.messages || []);
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-slate-400">
        Lütfen sol menüden bir sohbet seçiniz.
      </div>
    );
  }

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: "msg_" + Date.now(),
      sender: "COUPLE",
      content: text,
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      status: "SENT",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const res = await sendMessageAction(userId, {
      conversationId: conversation.id,
      content: text,
    });

    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-r-3xl overflow-hidden">
      {/* Sohbet Üst Başlık */}
      <div className="p-4 border-b border-slate-200/60 dark:border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden font-bold text-xs flex items-center justify-center">
            {conversation.avatarUrl ? (
              <img src={conversation.avatarUrl} alt={conversation.name} className="w-full h-full object-cover" />
            ) : (
              conversation.name.substring(0, 2)
            )}
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">{conversation.name}</h3>
            <span className="text-[10px] text-emerald-600 font-medium">● Çevrimiçi</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => alert("📞 Sesli Arama Simülasyonu")} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs">📞</button>
          <button onClick={() => alert("📌 Sohbet İğnelendi")} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs">📌</button>
        </div>
      </div>

      {/* Mesaj Alanı & AI Widget */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <AIMessageInsightsWidget
          summary="Bodrum Sunset Venue ile yapılan görüşmede 350 kişilik açık hava menüsü netleştirilmiştir."
          reminders={[
            { date: "Cuma, 18:00", title: "Revize sözleşme kontrolü" },
          ]}
          suggestedReplies={[
            "Sözleşmeyi bekliyoruz, teşekkürler!",
            "Tadım etkinliği saatini netleştirelim.",
          ]}
          onSelectReply={(reply) => handleSend(reply)}
        />

        {messages.map((m) => (
          <div
            key={m.id}
            className={"flex " + (m.sender === "COUPLE" ? "justify-end" : "justify-start")}
          >
            <div
              className={"max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed " +
                (m.sender === "COUPLE"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-br-none"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-700/50 rounded-bl-none")
              }
            >
              <p>{m.content}</p>
              <span className="text-[9px] opacity-50 block text-right mt-1">{m.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Mesaj Giriş Barı */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <button type="button" onClick={() => alert("📎 Dosya ekle")} className="p-2.5 rounded-xl border text-xs">📎</button>
          <button type="button" onClick={() => alert("🎙️ Ses kaydı")} className="p-2.5 rounded-xl border text-xs">🎙️</button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-rose-500 outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-medium text-xs hover:shadow-lg transition disabled:opacity-40"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
}
