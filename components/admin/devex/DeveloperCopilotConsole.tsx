"use client";

import React, { useState } from "react";
import { queryDeveloperCopilotAction } from "@/lib/actions/devex";

export default function DeveloperCopilotConsole() {
  const [prompt, setPrompt] = useState("WedyPlan standartlarında Zod validasyonlu Server Action yaz");
  const [contextTarget, setContextTarget] = useState<any>("CODE_SNIPPET");
  const [responseResult, setResponseResult] = useState<any>(null);

  const handleRunCopilot = async () => {
    const res = await queryDeveloperCopilotAction({
      prompt,
      contextTarget,
    });

    if (res.success) {
      setResponseResult(res.result);
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🤖 AI Developer Copilot & Code Assistant Console
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
          Copilot Engine Active
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Mimari / Kod Sorunuz</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-violet-600"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Sorulacak Bağlam</label>
          <select
            value={contextTarget}
            onChange={(e) => setContextTarget(e.target.value as any)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
          >
            <option value="CODE_SNIPPET">Kod Şablonu Üret (Code Snippet)</option>
            <option value="ARCHITECTURE">Mimari Açıklama (Architecture)</option>
            <option value="API_SPEC">API Spesifikasyonu (OpenAPI)</option>
          </select>
        </div>

        <button
          onClick={handleRunCopilot}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
        >
          🤖 AI Developer Copilot'a Sor
        </button>

        {responseResult && (
          <div className="p-4 rounded-2xl bg-slate-950 text-violet-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
            <div className="text-white border-b border-slate-800 pb-2 font-bold">
              ● Copilot Yanıt ID: {responseResult.queryId}
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block text-[10px]">💡 Mimari Açıklama:</span>
              <p className="text-slate-300 text-[10px]">{responseResult.architectureExplanation}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-violet-400 font-bold block text-[10px]">💻 Üretilen Kod Snippet:</span>
              <pre className="text-slate-200 text-[10px] whitespace-pre-wrap">{responseResult.generatedCodeSnippet}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
