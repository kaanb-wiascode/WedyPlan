"use client";

import React, { useState, useEffect } from "react";
import { Zap, ShieldCheck, RefreshCw, CheckCircle2, Radio, Play, AlertTriangle, Layers, Server, Activity, ArrowRight, CornerDownRight, RotateCcw } from "lucide-react";
import { EventPlatformEngine, EventStreamRecord, DeadLetterQueueRecord, EventPlatformSummary, EventDomainTopic } from "@/lib/integration/event-platform-engine";

export const EventCenter: React.FC = () => {
  const [stream, setStream] = useState<EventStreamRecord[]>([]);
  const [dlqRecords, setDlqRecords] = useState<DeadLetterQueueRecord[]>([]);
  const [summary, setSummary] = useState<EventPlatformSummary | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<EventDomainTopic | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    EventPlatformEngine.getEventStream().then(setStream);
    EventPlatformEngine.getDlqRecords().then(setDlqRecords);
    EventPlatformEngine.getSummary().then(setSummary);
  }, []);

  const handleReplayEvent = async (dlqId: string, eventName: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await EventPlatformEngine.replayDlqEvent(dlqId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${eventName}' olayı başarıyla yeniden oynatıldı (Event Replay) ve işlendi!` });
        EventPlatformEngine.getEventStream().then(setStream);
        EventPlatformEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Event Replay işlemi başarısız oldu." });
      }
    }, 500);
  };

  if (!summary) return null;

  const filteredStream = selectedTopic === "ALL"
    ? stream
    : stream.filter((s) => s.topic === selectedTopic);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Event Center Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Olay Odaklı (Event-Driven) Entegrasyon Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Retry Success: %{summary.automatedRetrySuccessRatePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Gerçek zamanlı olay yayın bus'ı (Event Bus), webhook mesaj kuyrukları, Dead Letter Queue (DLQ) karantinası ve yapay zeka anomali dedektörü.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">24s Toplam Olay</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalEventsProcessed24h / 1000).toFixed(1)}K Olay
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ortalama Gecikme</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.averageEventLatencyMs} ms
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">DLQ Karantina</span>
            <span className="font-mono font-bold text-amber-400 text-base">
              {summary.deadLetterEventsCount} Olay
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Event Anomaly & Retry Optimization Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Olay Anomali Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Anomaly Shield Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Activity className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiEventInsightNote}
          </p>
        </div>
      </div>

      {/* Topic Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "PAYMENTS", "BOOKINGS", "INVOICES", "VENDOR_UPDATES", "MESSAGES"] as (EventDomainTopic | "ALL")[]).map((top) => (
          <button
            key={top}
            onClick={() => setSelectedTopic(top)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedTopic === top
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {top === "ALL" ? "Tüm Konular" : top.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Event Stream Cards */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Canlı Olay Akışı (Event Stream - {filteredStream.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredStream.map((evt) => (
            <div
              key={evt.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-mono font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{evt.eventName}</span>
                <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold ${
                  evt.status === "DELIVERED"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : evt.status === "RETRYING"
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}>
                  {evt.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Konu (Topic): <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{evt.topic}</span></div>
                <div>Kaynak Servis: <span className="font-bold text-[#D4AF37]">{evt.sourceServiceRef}</span></div>
                <div>Gecikme (Latency): <span className="font-bold text-emerald-500">{evt.latencyMs} ms</span></div>
                <div>Deneme Sayısı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{evt.retryCount} Retry</span></div>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI İpucu: {evt.aiRetryOptimizationTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Payload Hash: {evt.payloadHash}</span>
                <span>Zaman: {new Date(evt.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dead Letter Queue (DLQ) Quarantine Console */}
      {dlqRecords.length > 0 && (
        <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-amber-500/30 rounded-[32px] p-6 shadow-sm space-y-4">
          <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Dead Letter Queue (DLQ) Karantina Havuzu</span>
          </h4>

          <div className="space-y-3">
            {dlqRecords.map((dlq) => (
              <div
                key={dlq.id}
                className="p-4 bg-amber-500/5 rounded-2xl space-y-3 text-xs border border-amber-500/20"
              >
                <div className="flex justify-between items-center font-mono font-bold text-[#111111] dark:text-[#F5F4F0]">
                  <span>Hata Sebebi: {dlq.failureReason}</span>
                  <span className="text-[9px] bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full font-bold">
                    {dlq.failedAttemptsCount} Hatalı Deneme
                  </span>
                </div>

                <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] truncate border border-black/5 dark:border-white/5">
                  Target: {dlq.targetEndpointUrl}
                </div>

                <div className="pt-1 flex justify-between items-center">
                  <button
                    onClick={() => handleReplayEvent(dlq.id, dlq.topic)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <RotateCcw className="w-3 h-3 text-[#D4AF37]" />
                        <span>Olayı Yeniden Oynat (Event Replay)</span>
                      </>
                    )}
                  </button>

                  <span className="font-mono text-[10px] text-[#86868B]">
                    Yakalama: {new Date(dlq.capturedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};