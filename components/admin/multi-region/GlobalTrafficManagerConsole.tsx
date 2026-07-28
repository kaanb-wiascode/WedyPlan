"use client";

import React, { useState } from "react";
import { updateGeoRoutingAction, configureRegionalAIAction } from "@/lib/actions/multi-region";

export default function GlobalTrafficManagerConsole() {
  const [region, setRegion] = useState<any>("EUROPE");
  const [primaryNode, setPrimaryNode] = useState("eu-central-1-frankfurt");
  const [aiProvider, setAiProvider] = useState<any>("OPENAI_EU");

  const handleUpdateRouting = async () => {
    const res = await updateGeoRoutingAction({
      region,
      primaryNode,
      dataResidencyEnforced: true,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const handleConfigureAI = async () => {
    const res = await configureRegionalAIAction({
      region,
      aiProvider,
      maxAllowedLatencyMs: 150,
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🌐 Global Traffic Manager & Regional AI Configurator
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Geo Routing Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Hedef Kıta / Bölge</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="EUROPE">Avrupa (Europe)</option>
              <option value="MIDDLE_EAST">Orta Doğu (Middle East)</option>
              <option value="NORTH_AMERICA">Kuzey Amerika (North America)</option>
              <option value="SOUTH_AMERICA">Güney Amerika (South America)</option>
              <option value="ASIA_PACIFIC">Asya Pasifik (Asia Pacific)</option>
              <option value="AFRICA">Afrika (Africa)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Birincil Düğüm Adresi</label>
            <input
              type="text"
              value={primaryNode}
              onChange={(e) => setPrimaryNode(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-indigo-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Bölgesel AI Sağlayıcısı</label>
            <select
              value={aiProvider}
              onChange={(e) => setAiProvider(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="OPENAI_EU">OpenAI EU Gateway</option>
              <option value="ANTHROPIC_US">Anthropic Claude US</option>
              <option value="AZURE_ME">Azure Middle East AI</option>
              <option value="AWS_BEDROCK_APAC">AWS Bedrock APAC</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleConfigureAI}
              className="w-full p-2.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition"
            >
              🤖 Bölgesel AI'yı Kaydet
            </button>
          </div>
        </div>

        <button
          onClick={handleUpdateRouting}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-bold hover:shadow-md transition"
        >
          🌐 Geo Routing Yönlendirmesini Uygula
        </button>
      </div>
    </div>
  );
}
