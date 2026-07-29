"use client";

import React, { useState, useEffect } from "react";
import { Plug, ShieldCheck, RefreshCw, CheckCircle2, Zap, Server, Activity, ArrowRight, ShieldAlert, Key, Globe, Radio } from "lucide-react";
import { ConnectorFrameworkEngine, RegisteredFrameworkConnector, ConnectorFrameworkSummary, FrameworkConnectorCategory } from "@/lib/integration/connector-framework-engine";

export const ConnectorCenter: React.FC = () => {
  const [connectors, setConnectors] = useState<RegisteredFrameworkConnector[]>([]);
  const [summary, setSummary] = useState<ConnectorFrameworkSummary | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FrameworkConnectorCategory | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    ConnectorFrameworkEngine.getConnectors().then(setConnectors);
    ConnectorFrameworkEngine.getSummary().then(setSummary);
  }, []);

  const handleHealthCheck = async (connectorId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await ConnectorFrameworkEngine.triggerHealthPing(connectorId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' konnektörünün sağlık ping doğrulaması tamamlandı. Sistem aktif!` });
        ConnectorFrameworkEngine.getConnectors().then(setConnectors);
        ConnectorFrameworkEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Sağlık doğrulama başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredConnectors = selectedCategory === "ALL"
    ? connectors
    : connectors.filter((c) => c.category === selectedCategory);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Connector Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Plug className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Konnektör Yönetim Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Healthy: {summary.healthyConnectorsCount}/{summary.totalRegisteredConnectorsCount}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          8 temel kurumsal kategoride (CRM, ERP, Muhasebe, Pazarlama, Ödeme, Kimlik, Depolama, İletişim) modüler ve yeniden kullanılabilir konnektör mimarisi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Kayıtlı Konnektör</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalRegisteredConnectorsCount} Modül
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Health Ping</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.averageHealthPingMs} ms
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Önlenen Kesinti</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.predictedOutagesPrevented24h} Outage
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Connector Failure Prediction Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Hata Tahmin & Sağlık Analiz Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Predictor Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Activity className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiConnectorInsightNote}
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "CRM", "ACCOUNTING", "IDENTITY", "PAYMENTS", "ERP", "STORAGE", "COMMUNICATION"] as (FrameworkConnectorCategory | "ALL")[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {cat === "ALL" ? "Tüm Kategoriler" : cat}
          </button>
        ))}
      </div>

      {/* Connectors Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Server className="w-5 h-5 text-[#D4AF37]" />
          <span>Konnektör Havuzu ({filteredConnectors.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredConnectors.map((conn) => (
            <div
              key={conn.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{conn.name}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {conn.status} (%{conn.failureRiskProbabilityPercent} Risk)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Kategori: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{conn.category}</span></div>
                <div>Doğrulama: <span className="font-bold text-[#D4AF37]">{conn.authType}</span></div>
                <div>Ping Latency: <span className="font-bold text-emerald-500">{conn.healthPingLatencyMs} ms</span></div>
                <div>Max Retry: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{conn.retryPolicyMaxCount} Deneme</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] truncate border border-black/5 dark:border-white/5">
                Endpoint: {conn.endpointUrl}
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Tahmini: {conn.aiPredictiveTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <button
                  onClick={() => handleHealthCheck(conn.id, conn.name)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <Radio className="w-3 h-3 text-[#D4AF37]" />
                      <span>Sağlık Kontrolü Yap (Health Ping)</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Kontrol: {new Date(conn.lastCheckedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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