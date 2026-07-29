"use client";

import React, { useState, useEffect } from "react";
import { Cpu, ShieldCheck, RefreshCw, CheckCircle2, Key, Code2, Lock, Zap, Server, Activity, Layers, Terminal, Copy, Check } from "lucide-react";
import { ApiGatewayEngine, ApiRouteRecord, ApiGatewayMetricsSummary, ApiAuthMethod } from "@/lib/integration/api-gateway-engine";

export const DeveloperDashboard: React.FC = () => {
  const [routes, setRoutes] = useState<ApiRouteRecord[]>([]);
  const [summary, setSummary] = useState<ApiGatewayMetricsSummary | null>(null);
  const [selectedAuth, setSelectedAuth] = useState<ApiAuthMethod | "ALL">("ALL");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    ApiGatewayEngine.getApiRoutes().then(setRoutes);
    ApiGatewayEngine.getGatewaySummary().then(setSummary);
  }, []);

  const handleCopySampleKey = (keyStr: string) => {
    navigator.clipboard.writeText(keyStr);
    setCopiedKey(keyStr);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(async () => {
      const refreshedRoutes = await ApiGatewayEngine.getApiRoutes();
      const refreshedSummary = await ApiGatewayEngine.getGatewaySummary();
      setRoutes(refreshedRoutes);
      setSummary(refreshedSummary);
      setIsRefreshing(false);
    }, 400);
  };

  if (!summary) return null;

  const filteredRoutes = selectedAuth === "ALL"
    ? routes
    : routes.filter((r) => r.authMethod === selectedAuth);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Gateway Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Enterprise API Gateway & Dev Dashboard
            </h3>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <RefreshCw className={`w-4 h-4 text-[#D4AF37] ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Tüm dış, partner ve mobil API isteklerinin merkezi güvenlik, OAuth2/JWT yetkilendirme, oran sınırlama (Rate Limiting) ve Edge caching kontrolü.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">24s API İstekleri</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalApiRequests24h / 1000).toFixed(1)}K Req
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Cache Hit Oranı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              %{summary.cacheHitRatePercent}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Gateway Latency</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.averageGatewayLatencyMs} ms
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Gateway Threat & Performance Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI API Trafik & Tehdit Kalkanı Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Threat Shield Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Code2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiGatewayInsightNote}
          </p>
        </div>
      </div>

      {/* API Key Developer Snippet Box */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868B] flex items-center gap-1">
            <Key className="w-3.5 h-3.5 text-[#D4AF37]" /> Örnek Developer API İsteği
          </span>
          <button
            onClick={() => handleCopySampleKey("curl -X GET 'https://api.wedyplan.com/v1/venues/search' -H 'X-WedyPlan-Api-Key: wp_live_demo89a2'")}
            className="text-[10px] font-mono text-[#D4AF37] hover:underline flex items-center gap-1 font-bold"
          >
            {copiedKey ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            <span>{copiedKey ? "Kopyalandı!" : "cURL Kopyala"}</span>
          </button>
        </div>

        <div className="p-3 bg-[#111111] text-emerald-400 font-mono text-[10px] rounded-xl overflow-x-auto leading-relaxed border border-white/10">
          curl -X GET "https://api.wedyplan.com/v1/venues/search" \<br />
          &nbsp;&nbsp;-H "Authorization: Bearer OAuth2_JWT_Token" \<br />
          &nbsp;&nbsp;-H "X-WedyPlan-Api-Key: wp_live_demo89a2"
        </div>
      </div>

      {/* Auth Method Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "API_KEY", "OAUTH2_OIDC", "JWT_BEARER"] as (ApiAuthMethod | "ALL")[]).map((auth) => (
          <button
            key={auth}
            onClick={() => setSelectedAuth(auth)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedAuth === auth
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {auth === "ALL" ? "Tüm Doğrulamalar" : auth.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* API Routes Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Server className="w-5 h-5 text-[#D4AF37]" />
          <span>Yönlendirilen API Rotaları ({filteredRoutes.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredRoutes.map((r) => (
            <div
              key={r.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-mono font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{r.endpointPath}</span>
                <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {r.apiVersion} ({r.authMethod})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Sınırlama: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{r.rateLimitPerMin} req/dk</span></div>
                <div>Aylık Kota: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{(r.monthlyQuota / 1000).toFixed(0)}K</span></div>
                <div>Edge Cache: <span className="font-bold text-emerald-500">{r.cacheTtlSeconds > 0 ? `${r.cacheTtlSeconds}s` : "No-Cache"}</span></div>
                <div>Latency: <span className="font-bold text-emerald-500">{r.averageLatencyMs} ms</span></div>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Gateway İpucu: {r.aiOptimizationTip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};