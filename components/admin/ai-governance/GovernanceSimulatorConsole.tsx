"use client";

import React, { useState } from "react";
import { validateAIPolicyAction, enforcePolicyStatusAction } from "@/lib/actions/ai-governance-center";

export default function GovernanceSimulatorConsole() {
  const [targetService, setTargetService] = useState("CopilotChatService");
  const [promptPayload, setPromptPayload] = useState("Müşteri E-Posta: kaan@wedyplan.com ve Telefon: +90 532 000 0000 ile sözleşme taslağını sorgula.");
  const [policyCategory, setPolicyCategory] = useState<any>("PII_DATA_PRIVACY");
  const [validationResult, setValidationResult] = useState<any>(null);

  const handleValidate = async () => {
    const res = await validateAIPolicyAction({
      targetService,
      promptPayload,
      modelName: "claude-3-5-sonnet",
      policyCategory,
      autoBlockOnRisk: true,
    });

    if (res.success) {
      setValidationResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleEnforce = async (status: any) => {
    const res = await enforcePolicyStatusAction({
      policyKey: "PII_DATA_PRIVACY_RULE_V1",
      status,
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Governance Policy Simulator Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            🧪 Live Policy Validation & Audit Logging Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Audit Active
          </span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Denetlenecek AI Servisi</label>
              <input
                type="text"
                value={targetService}
                onChange={(e) => setTargetService(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Politika Kategorisi</label>
              <select
                value={policyCategory}
                onChange={(e) => setPolicyCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
              >
                <option value="PII_DATA_PRIVACY">PII Gizlilik & Maskeleme</option>
                <option value="PROMPT_INJECTION_SHIELD">Prompt Enjeksiyon Kalkanı</option>
                <option value="MODEL_HALLUCINATION_GUARD">Yanılsama (Hallucination) Taraması</option>
                <option value="USAGE_COST_LIMIT">Kullanım & Maliyet Limiti</option>
                <option value="COMPLIANCE_EU_AI_ACT">EU AI Act Mevzuat Uyum</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Test İstem Metni (Prompt Payload)</label>
              <input
                type="text"
                value={promptPayload}
                onChange={(e) => setPromptPayload(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold text-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleValidate}
              className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
            >
              🛡️ İstemi Denetle, PII & Risk Taraması Yap
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleEnforce("ENFORCED")}
                className="w-1/2 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
              >
                ✓ Politikayı Zorunlu Yap (Enforce)
              </button>
              <button
                onClick={() => handleEnforce("AUDIT_ONLY")}
                className="w-1/2 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 transition"
              >
                👀 Yalnızca Denetle
              </button>
            </div>
          </div>

          {validationResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Signed Audit Log ID: {validationResult.auditLogId}</span>
                <span className="text-emerald-400 font-bold">Uyum: {validationResult.complianceStatus}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Genel Risk Skoru: <span className="text-amber-400 font-bold">%{validationResult.overallRiskScorePct}</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">PII Maskelendi mi?: <span className="text-emerald-400 font-bold">{validationResult.piiDetectedAndMasked ? "EVET (MASKED)" : "TEMİZ"}</span></div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">Denetim Hızı: <span className="text-indigo-400">{validationResult.latencyMs} ms</span></div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-white font-bold block text-[10px]">📜 Uygulanan Yönetişim Politikaları:</span>
                {validationResult.appliedPolicies.map((pol: string, idx: number) => (
                  <div key={idx} className="text-[10px] text-slate-300 border-b border-slate-900 pb-1">• {pol}</div>
                ))}
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                📢 <strong>Denetim Özeti:</strong> {validationResult.aiGovernanceSummary}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
