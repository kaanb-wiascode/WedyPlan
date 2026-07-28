"use client";

import React, { useState } from "react";
import { triggerPredictiveIncidentAnalysisAction, recordHealthCheckAction } from "@/lib/actions/monitoring";

export default function PredictiveIncidentConsole() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleRunAnalysis = async () => {
    const res = await triggerPredictiveIncidentAnalysisAction();
    if (res.success) {
      setAnalysisResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleSendHeartbeat = async () => {
    const res = await recordHealthCheckAction({
      serviceName: "Manual-Test-Worker",
      checkType: "HEARTBEAT",
      status: "HEALTHY",
      latencyMs: 6,
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🔮 AI Predictive Failure Detection & Root Cause Analysis Console
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          AI Monitoring
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={handleRunAnalysis}
            className="py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
          >
            🔮 AI Arıza & Kapasite Tahmini Çalıştır
          </button>

          <button
            onClick={handleSendHeartbeat}
            className="py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 transition"
          >
            💓 Test Heartbeat Sinyali Gönder
          </button>
        </div>

        {analysisResult && (
          <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
              <span className="font-bold">● Prediction ID: {analysisResult.predictionId}</span>
              <span className="text-amber-400 font-bold">Arıza Riski: %{analysisResult.failureRiskPct}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-white font-bold block text-[10px]">🚨 Riskli Servis: {analysisResult.targetService}</span>
              <p className="text-slate-300 text-[10px]">Kök Neden: {analysisResult.rootCauseAnalysis}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 space-y-1">
              <span className="text-white font-bold block text-[10px]">💡 Yapay Zeka Çözüm Önerisi:</span>
              <p className="text-[10px] font-semibold">{analysisResult.recommendedAction}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}