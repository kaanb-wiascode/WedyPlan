"use client";

import React, { useState } from "react";
import { createSREIncidentAction } from "@/lib/actions/sre";

export default function IncidentCommandCenter() {
  const [title, setTitle] = useState("AI Gateway Latency Spike");
  const [affectedService, setAffectedService] = useState("AI Central Brain Coordinator");
  const [severity, setSeverity] = useState<any>("SEV_2_HIGH");
  const [description, setDescription] = useState("AI modellerinden dönen yanıt sürelerinde geçici 200ms artış tespit edildi.");
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);

  const handleCreateIncident = async () => {
    const res = await createSREIncidentAction({
      title,
      affectedService,
      severity,
      description,
    });

    if (res.success) {
      setDiagnosisResult(res.diagnosis);
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🧪 Olay Yönetim Merkezi & AI Runbook Öneri Konsolu
        </span>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          Incident Engine Active
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Olay Başlığı</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-rose-600"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Etkilenen Servis</label>
            <input
              type="text"
              value={affectedService}
              onChange={(e) => setAffectedService(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Önem Seviyesi (Severity)</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            >
              <option value="SEV_1_CRITICAL">SEV-1 Critical (Outage)</option>
              <option value="SEV_2_HIGH">SEV-2 High Priority</option>
              <option value="SEV_3_MEDIUM">SEV-3 Medium Impact</option>
              <option value="SEV_4_LOW">SEV-4 Low Impact</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCreateIncident}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white font-bold hover:shadow-md transition"
        >
          🚨 SRE Olayını Tetikle & AI Runbook Analizi Al
        </button>

        {diagnosisResult && (
          <div className="p-4 rounded-2xl bg-slate-950 text-rose-300 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
              <span className="font-bold">● Incident ID: {diagnosisResult.incidentId}</span>
              <span className="text-emerald-400 font-bold">Tahmini Kurtarma: {diagnosisResult.recommendedRunbook.estimatedRecoveryTimeMin} Dakika</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-white font-bold block text-[10px]">🤖 Önerilen Otonom Runbook: {diagnosisResult.recommendedRunbook.title}</span>
              <div className="space-y-0.5 text-slate-300 text-[10px] pt-1">
                {diagnosisResult.recommendedRunbook.steps.map((step: string, idx: number) => (
                  <div key={idx}>{step}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
