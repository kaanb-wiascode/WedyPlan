"use client";

import React, { useState } from "react";

export default function APIExplorerAndLogsTable() {
  const [testEndpoint, setTestEndpoint] = useState("/api/v1/vendors/search");
  const [responseJson, setResponseJson] = useState<string | null>(null);

  const handleTestCall = () => {
    setResponseJson(
      JSON.stringify(
        {
          status: "200_OK",
          latency_ms: 12,
          data: [
            { id: "vnd_101", name: "Bodrum Sunset Venue", rating: 4.9 },
            { id: "vnd_102", name: "Ege Fotoğraf", rating: 4.8 },
          ],
        },
        null,
        2
      )
    );
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Etkileşimli API Explorer / Sandbox Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Interactive API Explorer & Sandbox Console (REST / GraphQL)
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Sandbox Active
          </span>
        </div>

        <div className="flex gap-2">
          <span className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-mono font-bold text-xs flex items-center">
            GET
          </span>
          <input
            type="text"
            value={testEndpoint}
            onChange={(e) => setTestEndpoint(e.target.value)}
            className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-xs"
          />
          <button
            onClick={handleTestCall}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition text-xs"
          >
            İstek Gönder (Send) 🚀
          </button>
        </div>

        {responseJson && (
          <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
            <pre>{responseJson}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
