"use client";

import React, { useState } from "react";
import { updateGatewayRouteAction } from "@/lib/actions/api-gateway";

export default function RateLimitConsole() {
  const [routePath, setRoutePath] = useState("/api/v2/ai/copilot-draft");
  const [upstreamUrl, setUpstreamUrl] = useState("http://ai-brain-coordinator:8081");
  const [version, setVersion] = useState<any>("V2");
  const [authLevel, setAuthLevel] = useState<any>("OAUTH2_JWT");
  const [rateLimitPerMin, setRateLimitPerMin] = useState(300);

  const handleUpdateRoute = async () => {
    const res = await updateGatewayRouteAction({
      routePath,
      upstreamUrl,
      version,
      authLevel,
      rateLimitPerMin,
      cacheTtlSeconds: 60,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          ⚡ API Gateway Rota & Dynamic Rate Limiter Studio
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
          Proxy Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">API Path</label>
            <input
              type="text"
              value={routePath}
              onChange={(e) => setRoutePath(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-violet-600"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Upstream Servis Adresi</label>
            <input
              type="text"
              value={upstreamUrl}
              onChange={(e) => setUpstreamUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">API Versiyonu</label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="V1">API v1 (Legacy)</option>
              <option value="V2">API v2 (Stable)</option>
              <option value="V3_BETA">API v3 (Next-Gen Beta)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Auth Seviyesi</label>
            <select
              value={authLevel}
              onChange={(e) => setAuthLevel(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="OAUTH2_JWT">OAuth2 / JWT Token</option>
              <option value="PUBLIC">Public Open API</option>
              <option value="API_KEY">Partner API Key</option>
              <option value="MUTUAL_TLS">mTLS Strict</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Rate Limit (req/dakika)</label>
            <input
              type="number"
              value={rateLimitPerMin}
              onChange={(e) => setRateLimitPerMin(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>
        </div>

        <button
          onClick={handleUpdateRoute}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
        >
          🚀 API Gateway Rota Kurallarını Canlıya Al
        </button>
      </div>
    </div>
  );
}
