"use client";

import React, { useState, useEffect } from "react";
import { Send, Paperclip, Mic, Sparkles, ShieldCheck, FileText, Check, CheckCheck, Phone, ArrowLeft, Pin } from "lucide-react";
import { MobileMessagingEngine, ChatMessage, ConversationThread } from "@/lib/mobile/mobile-messaging-engine";

export const MobileChatCenter: React.FC = () => {
  const [threads, setThreads] = useState<ConversationThread[]>([]);
  const [activeThread, setActiveThread] = useState<ConversationThread | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [smartReplies, setSmartReplies] = useState<string[]>([]);

  useEffect(() => {
    MobileMessagingEngine.getConversations().then((data) => {
      setThreads(data);
      if (data.length > 0) {
        setActiveThread(data[0]);
        if (data[0].lastMessage) {
          setMessages([data[0].lastMessage]);
          setSmartReplies(MobileMessagingEngine.generateAiSmartReplies(data[0].lastMessage.content));
        }
      }
    });
  }, []);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !activeThread) return;

    const sent = await MobileMessagingEngine.sendMessage(activeThread.id, {
      content: text,
      type: "TEXT",
    });

    setMessages((prev) => [...prev, sent]);
    setInputText("");
    setSmartReplies([]);
  };

  return (
    <div className="w-full max-w-md mx-auto h-[680px] bg-[#F5F4F0] rounded-[36px] border border-black/10 shadow-2xl flex flex-col overflow-hidden font-sans">
      {/* Active Thread Header */}
      {activeThread && (
        <div className="bg-white/80 backdrop-blur-xl px-5 py-4 border-b border-black/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button className="text-[#111111] hover:opacity-70">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h4 className="font-serif-editorial text-base font-semibold text-[#111111] leading-tight">
                {activeThread.title}
              </h4>
              <p className="text-[10px] text-[#666666] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {activeThread.subtitle}
              </p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#111111]">
            <Phone className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Chat Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => {
          const isUser = msg.senderRole === "COUPLE";
          return (
            <div key={msg.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
              <span className="text-[9px] text-[#86868B] mb-1 px-1">{msg.senderName}</span>
              
              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs space-y-2 ${
                  isUser
                    ? "bg-[#111111] text-[#F5F4F0] rounded-tr-none shadow-sm"
                    : "bg-white/80 backdrop-blur-md border border-black/10 text-[#111111] rounded-tl-none shadow-sm"
                }`}
              >
                {/* Contract Offer Attachment Card */}
                {msg.type === "CONTRACT_OFFER" ? (
                  <div className="p-3 bg-black/5 rounded-xl border border-black/10 space-y-2">
                    <div className="flex items-center gap-2 text-[#D4AF37] font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>E-İmzalı Sözleşme Teklifi</span>
                    </div>
                    <p className="text-[11px] font-medium">{msg.content}</p>
                    <button className="w-full py-2 bg-[#111111] text-[#F5F4F0] text-[10px] font-bold rounded-lg shadow-sm">
                      Sözleşmeyi İncele
                    </button>
                  </div>
                ) : (
                  <p className="leading-relaxed">{msg.content}</p>
                )}

                <div className={`flex justify-end items-center gap-1 text-[9px] ${isUser ? "text-[#86868B]" : "text-[#86868B]"}`}>
                  <span>{new Date(msg.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  {isUser && <CheckCheck className="w-3 h-3 text-[#D4AF37]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Smart Replies Bar */}
      {smartReplies.length > 0 && (
        <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 border-t border-black/5 bg-white/40">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          {smartReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => handleSend(reply)}
              className="text-[10px] whitespace-nowrap px-3 py-1.5 bg-white border border-black/10 rounded-full text-[#111111] font-medium hover:bg-[#111111] hover:text-[#F5F4F0] transition-all shrink-0"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input Action Bar */}
      <div className="p-3 bg-white/90 backdrop-blur-2xl border-t border-black/10 flex items-center gap-2 shrink-0">
        <button className="p-2 text-[#666666] hover:text-[#111111]">
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Mesajınızı yazın..."
          className="flex-1 h-10 px-4 bg-black/5 border border-black/10 rounded-full text-xs text-[#111111] placeholder:text-[#86868B] outline-none"
        />
        <button
          onClick={() => handleSend()}
          className="w-10 h-10 rounded-full bg-[#111111] text-[#F5F4F0] flex items-center justify-center hover:bg-[#222222] transition-all shadow-sm"
        >
          <Send className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
};