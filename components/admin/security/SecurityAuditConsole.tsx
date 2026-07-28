"use client";

import React, { useState } from "react";
import { triggerSecurityScanAction, recordThreatLogAction } from "@/lib/actions/security";

export default function SecurityAuditConsole() {
  const [scanResult, setScanResult] = useState<any>(null);

  const handleRunScan = async () => {
    const res = await triggerSecurityScanAction();
    if (res.success) {
      setScanResult(res.audit);
      alert("✨ " + res.message);
    }
  };

  const handleManualThreatTest = async () => {
    const res = await recordThreatLogAction({
      threatType: "Manual Test SQLi Attempt",
      sourceIp: "192.168.1.100",
      threatLevel: "HIGH",
      actionTaken: "BLOCKED",
      details: "WAF Test kuralı tetiklendi.",
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🧪 AI Zafiyet Taraması & OWASP Audit Konsolu
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          OWASP ASVS Ready
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={handleRunScan}
            className="py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 text-white font-bold hover:shadow-md transition"
          >
            🛡️ AI Güvenlik & Zafiyet Taramasını Çalıştır
          </button>

          <button
            onClick={handleManualThreatTest}
            className="py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 transition"
          >
            🚨 Test WAF Tehdidi Gönder
          </button>
        </div>

        {scanResult && (
          <div className="p-4 rounded-2xl bg-slate-950 text-purple-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
              <span className="font-bold">● Tarama ID: {scanResult.scanId}</span>
              <span className="text-emerald-400 font-bold">Güvenlik Skoru: %{scanResult.overallScorePct}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-white font-bold block text-[10px]">💡 Yapay Zeka Güvenlik Önerileri:</span>
              <div className="space-y-0.5 text-slate-300 text-[10px] pt-1">
                {scanResult.aiRecommendations.map((rec: string, idx: number) => (
                  <div key={idx}>✓ {rec}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
