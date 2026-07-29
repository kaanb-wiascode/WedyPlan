"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, Send, Mail, PhoneCall, Bell, MessageCircle, Moon } from "lucide-react";
import { GlobalCommunicationEngine, LocalizedMessageTemplate, CommunicationDispatchRecord, GlobalCommunicationSummary, CommunicationChannel } from "@/lib/global/global-communication-engine";

export const GlobalCommunicationCenter: React.FC = () => {
  const [templates, setTemplates] = useState<LocalizedMessageTemplate[]>([]);
  const [dispatches, setDispatches] = useState<CommunicationDispatchRecord[]>([]);
  const [summary, setSummary] = useState<GlobalCommunicationSummary | null>(null);

  // Form State
  const [recipientInput, setRecipientInput] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<CommunicationChannel>("WHATSAPP");
  const [selectedCountry, setSelectedCountry] = useState("TR");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    GlobalCommunicationEngine.getMessageTemplates().then(setTemplates);
    GlobalCommunicationEngine.getDispatchRecords().then(setDispatches);
    GlobalCommunicationEngine.getSummary().then(setSummary);
  }, []);

  const handleTestDispatch = async () => {
    if (!recipientInput.trim()) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const created = await GlobalCommunicationEngine.dispatchTestMessage(
        recipientInput,
        selectedChannel,
        selectedCountry
      );
      setIsProcessing(false);
      setStatusMsg({ type: "success", text: `'${created.channel}' mesajı '${created.recipientRef}' alıcısına iletildi!` });
      setRecipientInput("");
      GlobalCommunicationEngine.getDispatchRecords().then(setDispatches);
      GlobalCommunicationEngine.getSummary().then(setSummary);
    }, 500);
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Global Communication Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Küresel İletişim & Mesajlaşma Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Delivery: %{summary.deliverySuccessRatePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Email, SMS, Push, WhatsApp Business API ve bölgesel telco entegrasyonları, Quiet Hours koruması ve WedyAI içerik optimizasyonu.
        </p>

        {/* Global Communication Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam İletim</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalDispatchedMessagesCount / 1000).toFixed(1)}K Mesaj
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Kanal</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeChannelsCount} Kanal
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">AI İçerik Skoru</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.aiContentOptimizationScorePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Communication Optimization & Quiet Hours Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı İletişim & Quiet Hours
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <Moon className="w-3 h-3" /> Quiet Hours Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiCommunicationInsightNote}
          </p>
        </div>
      </div>

      {/* Test Dispatch Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Send className="w-5 h-5 text-[#D4AF37]" />
          <span>Uluslararası Mesaj İletim Konsolu</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value as CommunicationChannel)}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              <option value="WHATSAPP">WhatsApp Business API</option>
              <option value="EMAIL">Email (SES / SendGrid)</option>
              <option value="SMS">SMS (Netgsm / Twilio)</option>
              <option value="PUSH">Web Push (FCM)</option>
            </select>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              <option value="TR">Türkiye (+90)</option>
              <option value="DE">Almanya (+49)</option>
              <option value="AE">BAE / Dubai (+971)</option>
              <option value="US">ABD (+1)</option>
            </select>
          </div>

          <input
            type="text"
            value={recipientInput}
            onChange={(e) => setRecipientInput(e.target.value)}
            placeholder="Alıcı Bilgisi (Örn: +90 532 123 45 67 veya e-posta)..."
            className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <button
            onClick={handleTestDispatch}
            disabled={isProcessing || !recipientInput.trim()}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Send className="w-4 h-4 text-[#D4AF37]" />
                <span>Yerelleştirilmiş Mesaj Gönder</span>
              </>
            )}
          </button>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Dispatches Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#D4AF37]" />
          <span>Gönderim Kütüğü & İletim Durumu ({dispatches.length})</span>
        </h4>

        <div className="space-y-3">
          {dispatches.map((d) => (
            <div
              key={d.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{d.recipientRef}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  d.dispatchStatus === "DELIVERED"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}>
                  {d.dispatchStatus}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Kanal: {d.channel} ({d.countryCode})</span>
                <span>Zamanlama: {d.aiPredictedBestTimeFormatted}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};