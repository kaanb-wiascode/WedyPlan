"use client";

import React, { useState, useEffect } from "react";
import { sendVendorAIChatAction } from "@/lib/actions/vendor-ai-assistant";

interface AIBusinessChatWindowProps {
  vendorId: string;
  draftText?: string;
}

export default function AIBusinessChatWindow({
  vendorId,
  draftText,
}: AIBusinessChatWindowProps) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Quick action'dan gelen taslak metni query kutusuna doldur
  useEffect(() => {
    if (draftText) {
      setQuery(draftText);
    }
  }, [draftText]);

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;

    const userMsg = query;
    setQuery("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    const res = await sendVendorAIChatAction(vendorId, {
      message: userMsg,
      contextType: "GENERAL",
    });

    setIsLoading(false);

    if (res.success && res.reply) {
      setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
    }
  };

  return (
    <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border space-y-4">
      <div className="h-64 overflow-y-auto space-y-2 p-2 font-sans text-xs">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-2xl max-w-[80%] ${
              m.role === "user"
                ? "ml-auto bg-indigo-600 text-white"
                : "mr-auto bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            }`}
          >
            {m.content}
          </div>
        ))}
        {isLoading && (
          <div className="text-slate-400 italic text-[11px]">
            AI Yanıtlıyor...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="İşletmeniz veya bütçeniz hakkında bir şey sorun..."
          className="flex-1 p-2.5 rounded-xl border dark:border-slate-800 text-xs bg-slate-50 dark:bg-slate-800"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition"
        >
          Gönder
        </button>
      </div>
    </div>
  );
}