"use client";

import React, { useState, useEffect } from "react";
import { Activity, ShieldCheck, RefreshCw, CheckCircle2, Zap, Radio, Layers, Server, AlertTriangle, Play, RotateCcw, Check } from "lucide-react";
import { StreamingEngine, StreamPipelineRecord, StreamingPlatformSummary, EventStreamType } from "@/lib/data/streaming-engine";

export const StreamingCenter: React.FC = () => {
  const [streams, setStreams] = useState<StreamPipelineRecord[]>([]);
  const [summary, setSummary] = useState<StreamingPlatformSummary | null>(null);
  const [selectedType, setSelectedType] = useState<EventStreamType | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    StreamingEngine.getStreams().then(setStreams);
    StreamingEngine.getSummary().then(setSummary);
  }, []);

  const handleReplayStream = async (streamId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await StreamingEngine.triggerStreamReplay(streamId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' olay akışı belirli offset alanından otonom yeniden oynatıldı (Replay)!` });
        StreamingEngine.getStreams().then(setStreams);
        StreamingEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Akış yeniden oynatma işlemi başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredStreams = selectedType === "ALL"
    ? streams
    : streams.filter((s) => s.streamType === selectedType);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Gerçek Zamanlı Akış Merkezi (Streaming)
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Avg Latency: {summary.averageStreamLatencyMs}ms
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Rezervasyon, ödeme, mesaj ve AI olaylarının gerçek zamanlı işlenmesi, pencere agregasyonu, zenginleştirme (enrichment) ve olay yeniden oynatma (replay).
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">24s İşlenen Olay</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalEventsProcessed24h / 1000000).toFixed(2)}M Event
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Akış Hattı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.totalActiveStreamsCount} Stream
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Önlenen Anomali</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.anomaliesPrevented24h} Anomaly
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Anomaly Detection Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Gerçek Zamanlı Anomali Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Streaming Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Activity className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiStreamingInsightNote}
          </p>
        </div>
      </div>

      {/* Stream Type Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "PAYMENTS", "AI_EVENTS", "BOOKINGS", "MESSAGES", "NOTIFICATIONS"] as (EventStreamType | "ALL")[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedType === type
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {type === "ALL" ? "Tüm Akışlar" : type}
          </button>
        ))}
      </div>

      {/* Streams Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Canlı Olay Akış Hatları ({filteredStreams.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredStreams.map((strm) => (
            <div
              key={strm.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{strm.streamName}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  strm.hasAnomaly
                    ? "bg-red-500/10 text-red-600 dark:text-red-400"
                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                }`}>
                  {strm.status} ({strm.streamType})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Akış Hızı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{strm.eventsPerSecondCount} event/s</span></div>
                <div>Gecikme (Latency): <span className="font-bold text-emerald-500">{strm.averageLatencyMs} ms</span></div>
                <div>24s İşlenen: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{(strm.totalEventsProcessed24h / 1000).toFixed(0)}K Event</span></div>
                <div>Anomali Durumu: <span className="font-bold text-amber-500">{strm.hasAnomaly ? "Tespit Edildi" : "Normal"}</span></div>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Tespiti: {strm.aiAnomalyAnalysisTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <button
                  onClick={() => handleReplayStream(strm.id, strm.streamName)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <RotateCcw className="w-3 h-3 text-[#D4AF37]" />
                      <span>Akışı Yeniden Oynat (Replay Stream)</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Olay: {new Date(strm.lastEventTimestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
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
    </div>
  );
};