"use client";

import React, { useState, useEffect } from "react";
import { Network, ShieldCheck, RefreshCw, CheckCircle2, Key, Webhook, Cpu, Code2, Layers, Server, Globe, ArrowRightLeft, Radio } from "lucide-react";
import { EnterpriseIntegrationDomain, EnterpriseConnectorRecord, EnterpriseIntegrationSummary, ConnectorCategory } from "@/lib/integration/integration-domain-model";

export const EnterpriseIntegrationCenter: React.FC = () => {
  const [connectors, setConnectors] = useState<EnterpriseConnectorRecord[]>([]);
  const [summary, setSummary] = useState<EnterpriseIntegrationSummary | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ConnectorCategory | "ALL">("ALL");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    EnterpriseIntegrationDomain.getConnectors().then(setConnectors);
    EnterpriseIntegrationDomain.getSummary().then(setSummary);
  }, []);

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    setTimeout(async () => {
      const refreshedConnectors = await EnterpriseIntegrationDomain.getConnectors();
      const refreshedSummary = await EnterpriseIntegrationDomain.getSummary();
      setConnectors(refreshedConnectors);
      setSummary(refreshedSummary);
      setIsRefreshing(false);
    }, 400);
  };

  if (!summary) return null;

  const filteredConnectors = selectedCategory === "ALL"
    ? connectors
    : connectors.filter((c) => c.category === selectedCategory);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Integration Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Network className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Entegrasyon Platformu
            </h3>
          </div>
          <button
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <RefreshCw className={`w-4 h-4 text-[#D4AF37] ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          WedyPlan platformunun harici ve dahili kurumsal sistemlerle (Hotel PMS, SAP ERP, Salesforce, Webhooks, SDKs) güvenli ve standart entegrasyonu.
        </p>

        {/* Executive Integration Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Konnektör</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalActiveConnectorsCount} Konnektör
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Günlük Entegrasyon Olayı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.dailyIntegrationVolumeEvents / 1000).toFixed(1)}K Olay
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Gateway Gecikmesi</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.averageGatewayLatencyMs} ms
            </span>
          </div>
        </div>
      </div>

      {/* Integration Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Radio className="w-3.5 h-3.5" /> Entegrasyon Gateway Durum Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            API Mesh Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Code2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.integrationInsightNote}
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "HOTEL_PMS", "ACCOUNTING_ERP", "EXTERNAL_CRM", "PAYMENT_GATEWAY"] as (ConnectorCategory | "ALL")[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {cat === "ALL" ? "Tüm Konnektörler" : cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Connectors Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Server className="w-5 h-5 text-[#D4AF37]" />
          <span>Bağlı Kurumsal Sistemler ({filteredConnectors.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredConnectors.map((conn) => (
            <div
              key={conn.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{conn.connectorName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {conn.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Sağlayıcı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{conn.providerVendorRef}</span></div>
                <div>Senkronizasyon: <span className="font-bold text-[#D4AF37]">{conn.syncDirection}</span></div>
                <div>24s İşlenen Olay: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{conn.totalEventsProcessed24h} Olay</span></div>
                <div>Gecikme Süresi: <span className="font-bold text-emerald-500">{conn.healthLatencyMs} ms</span></div>
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Kategori: <strong className="text-[#111111] dark:text-[#F5F4F0]">{conn.category}</strong></span>
                <span>Son Senkronizasyon: {new Date(conn.lastSyncedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};