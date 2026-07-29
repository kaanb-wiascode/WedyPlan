"use client";

import React, { useState, useEffect } from "react";
import { Users2, ShieldCheck, RefreshCw, CheckCircle2, Zap, ArrowRightLeft, GitMerge, UserCheck, Layers, Database, Check } from "lucide-react";
import { CrmIntegrationEngine, CrmSyncRecord, CrmIntegrationSummary, CrmDomainModule } from "@/lib/integration/crm-integration-engine";

export const CrmIntegrationCenter: React.FC = () => {
  const [records, setRecords] = useState<CrmSyncRecord[]>([]);
  const [summary, setSummary] = useState<CrmIntegrationSummary | null>(null);
  const [selectedModule, setSelectedModule] = useState<CrmDomainModule | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    CrmIntegrationEngine.getSyncRecords().then(setRecords);
    CrmIntegrationEngine.getSummary().then(setSummary);
  }, []);

  const handleMergeRecord = async (recordId: string, label: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await CrmIntegrationEngine.mergeDuplicateRecord(recordId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${label}' mükerrer kaydı başarıyla birleştirildi ve senkronize edildi!` });
        CrmIntegrationEngine.getSyncRecords().then(setRecords);
        CrmIntegrationEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Birleştirme işlemi başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredRecords = selectedModule === "ALL"
    ? records
    : records.filter((r) => r.module === selectedModule);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive CRM Integration Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users2 className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal CRM Entegrasyon Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Match Accuracy: %{summary.averageMatchingAccuracyPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Salesforce, HubSpot ve Zoho CRM sistemleri ile müşteri, lead, anlaşma ve görevlerin çift yönlü senkronizasyonu, akıllı mükerrer kayıt birleştirme.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">24s Senkronize CRM Kaydı</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalSyncedCrmRecords24h / 1000).toFixed(1)}K Record
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif CRM Bağlantısı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeCrmConnectorsCount} CRM
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Engellenen Mükerrer</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.duplicatesPrevented24h} Duplicate
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Customer Matching Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Müşteri Eşleştirme Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Matching Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <UserCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiCrmInsightNote}
          </p>
        </div>
      </div>

      {/* Module Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "LEADS", "CONTACTS", "DEALS", "COMPANIES", "ACTIVITIES", "TASKS"] as (CrmDomainModule | "ALL")[]).map((mod) => (
          <button
            key={mod}
            onClick={() => setSelectedModule(mod)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedModule === mod
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {mod === "ALL" ? "Tüm Modüller" : mod.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Sync Records Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Database className="w-5 h-5 text-[#D4AF37]" />
          <span>CRM Senkronizasyon Kayıtları ({filteredRecords.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{rec.entityLabel}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  rec.status === "IN_SYNC"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : rec.status === "DUPLICATE_MERGED"
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}>
                  {rec.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>CRM Hedef: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{rec.targetCrmRef}</span></div>
                <div>Harici ID: <span className="font-bold text-[#D4AF37]">{rec.externalCrmId}</span></div>
                <div>Yön: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{rec.direction}</span></div>
                <div>Mükerrerlik Skoru: <span className="font-bold text-amber-500">%{rec.duplicateConfidencePercent}</span></div>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Analizi: {rec.aiMatchingNote}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {rec.duplicateConfidencePercent > 50 ? (
                  <button
                    onClick={() => handleMergeRecord(rec.id, rec.entityLabel)}
                    disabled={isProcessing}
                    className="w-full h-10 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[11px] font-bold rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <GitMerge className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Mükerrer Kaydı Birleştir (AI Merge)</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Senkronizasyon Tam: Çift Yönlü Aktif
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {statusMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};