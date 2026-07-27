"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import QuickActionPills from "./QuickActionPills";
import { AIChatMessage } from "@/lib/validations/ai-planner";
import { processAIPrompt } from "@/lib/actions/ai-planner";

export default function ChatInterface({
  userId,
  onAIResponse,
}: {
  userId: string;
  onAIResponse: (msg: AIChatMessage) => void;
}) {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: "init_1",
      sender: "ai",
      content: "Merhaba! Ben sizin kişisel düğün planlama asistanınızım. Bütçe analizi, zaman çizelgesi, risk tespiti veya konsept fikirleri için bana dilediğinizi sorabilirsiniz ✨",
      timestamp: "10:00",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: AIChatMessage = {
      id: "user_" + Date.now(),
      sender: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const res = await processAIPrompt(query, userId);
    setIsLoading(false);

    if (res.success && res.response) {
      const responseMsg = res.response;
      setMessages((prev) => [...prev, responseMsg]);
      onAIResponse(responseMsg);
    }
  };

  return (
    <div className="h-full flex flex-col backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40">
        <QuickActionPills onSelect={(prompt: string) => handleSend(prompt)} />
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-br-none"
                  : "bg-slate-100/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-slate-700/50 rounded-bl-none"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold opacity-60">
                  {msg.sender === "user" ? "Siz" : "✦ AI Planner"}
                </span>
                <span className="text-[9px] opacity-40">{msg.timestamp}</span>
              </div>
              <p>{msg.content}</p>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              AI Asistanı Analiz Ediyor...
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Düğününüz hakkında her şeyi sorun..."
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-rose-500 outline-none transition"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-medium text-sm hover:shadow-lg transition disabled:opacity-40"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
}