"use client";

import React, { useState } from "react";
import { processSupportTicketAction, approveAndSendSupportReplyAction, escalateTicketToHumanAction } from "@/lib/actions/support-agent";

export default function SupportConsoleAndTicketsTable() {
  const [userQuery, setUserQuery] = useState("Düğünüme 45 gün kala mekan iptali yaparsam kaporamı geri alabilir miyim?");
  const [ticketResult, setTicketResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessTicket = async () => {
    if (!userQuery.trim()) return;
    setIsProcessing(true);

    const res = await processSupportTicketAction({
      ticketId: "ticket_c101_billing",
      userQuery,
      callerPortal: "COUPLE",
      userLanguage: "TR",
    });

    setIsProcessing(false);

    if (res.success) {
      setTicketResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleApproveReply = async () => {
    if (!ticketResult) return;
    const res = await approveAndSendSupportReplyAction({
      ticketId: ticketResult.ticketId,
      finalReplyText: ticketResult.suggestedReplyText,
      operatorId: "op_kaan",
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  const handleEscalate = async () => {
    if (!ticketResult) return;
    const res = await escalateTicketToHumanAction({
      ticketId: ticketResult.ticketId,
      reason: "Kullanıcı talebi insan temsilciye aktarıldı.",
    });

    if (res.success) {
      alert("🚨 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Support Agent Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🎧 Live Support Agent & Citation Console (ReAct + RAG)
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Agent Online
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Destek Bileti / Kullanıcı Sorusu</label>
            <textarea
              rows={2}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-[11px] resize-none"
            />
          </div>

          <button
            onClick={handleProcessTicket}
            disabled={isProcessing}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 text-white font-bold hover:shadow-md transition disabled:opacity-50"
          >
            {isProcessing ? "Destek Ajanı RAG İle Sorguluyor..." : "🔍 Bileti Ajan İle Analiz Et & Yanıt Üret"}
          </button>

          {ticketResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Bilet Sınıfı: {ticketResult.detectedCategory}</span>
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-bold text-[10px]">
                  Öncelik: {ticketResult.detectedPriority}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 space-y-1">
                <span className="text-[10px] text-indigo-400 font-bold block">📝 AI Bilet Özeti:</span>
                <p className="font-sans leading-relaxed text-xs text-slate-100">{ticketResult.ticketSummary}</p>
              </div>

              {/* RAG Atıflı Yanıt */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold block text-xs">💬 AI Destek Ajanının Önerdiği Atıflı Yanıt:</span>
                <p className="text-slate-100 font-sans leading-relaxed text-xs">{ticketResult.suggestedReplyText}</p>
              </div>

              {/* Kaynak Atıfları */}
              <div className="space-y-1 pt-1 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">📌 Doğrulanmış Kaynak Atıfları (Citations):</span>
                {ticketResult.citations.map((c: any, i: number) => (
                  <div key={i} className="text-[10px] text-slate-200 font-sans flex justify-between items-center p-2 rounded bg-slate-900">
                    <span>{c.sourceTitle}</span>
                    <span className="text-emerald-400 font-bold font-mono">Güven: %{(c.confidence * 100).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              {/* İnsan Onayı & Eskalasyon Butonları */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={handleApproveReply}
                  className="py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition font-sans text-xs"
                >
                  Yanıtı Onayla & Gönder ✓
                </button>
                <button
                  onClick={handleEscalate}
                  className="py-2 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 transition font-sans text-xs"
                >
                  İnsan Temsilciye Aktar (Escalate) 🚨
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
