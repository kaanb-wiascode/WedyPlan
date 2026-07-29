"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ShieldCheck, RefreshCw, CheckCircle2, Zap, Layers, Code, Hash, FileCode, Check } from "lucide-react";
import { SemanticLayerEngine, SemanticMetricRecord, SemanticLayerPlatformSummary, SemanticDomainType } from "@/lib/data/semantic-layer-engine";

export const SemanticLayerCenter: React.FC = () => {
  const [metrics, setMetrics] = useState<SemanticMetricRecord[]>([]);
  const [summary, setSummary] = useState<SemanticLayerPlatformSummary | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<SemanticDomainType | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    SemanticLayerEngine.getMetrics().then(setMetrics);
    SemanticLayerEngine.getSummary().then(setSummary);
  }, []);

  const handleGovernMetric = async (metricId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await SemanticLayerEngine.updateMetricGovernance(metricId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' semantik metrik tanımı başarıyla doğrulandı ve kurumsal katalogda mühürlendi!` });
        SemanticLayerEngine.getMetrics().then(setMetrics);
        SemanticLayerEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Metrik doğrulama işlemi başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredMetrics = selectedDomain === "ALL"
    ? metrics
    : metrics.filter((m) => m.domain === selectedDomain);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Master Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Semantik Katman Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Glossary Accuracy: %{summary.aiGlossaryAssistantAccuracyPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Tüm analitik, BI ve AI sistemleri için tekil iş tanımları, tekrar kullanılabilir boyutlar (dimensions), hesaplanan ölçüler ve metrik yönetişimi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Yönetilen Metrik</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalGovernedMetricsCount} Metrik
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Yeniden Kullanılabilir Boyut</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.totalReusableDimensionsCount} Boyut
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif İş Alanı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.activeSemanticDomainsCount} Domain
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Business Glossary Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI İş Sözlüğü & Metrik Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Semantic AI Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <FileCode className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiSemanticInsightNote}
          </p>
        </div>
      </div>

      {/* Domain Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "FINANCE", "MARKETPLACE", "MARKETING", "SALES", "OPERATIONS", "CUSTOMER_SUCCESS"] as (SemanticDomainType | "ALL")[]).map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedDomain === dom
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {dom === "ALL" ? "Tüm Alanlar" : dom.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Metrics Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Hash className="w-5 h-5 text-[#D4AF37]" />
          <span>Semantik Metrik Kataloğu ({filteredMetrics.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredMetrics.map((met) => (
            <div
              key={met.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{met.metricDisplayName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {met.domain} ({met.versionTag})
                </span>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] space-y-1 border border-black/5 dark:border-white/5">
                <span className="font-bold text-[#D4AF37] block">✦ Formül (SQL Expression):</span>
                <code className="text-[#111111] dark:text-[#F5F4F0] block truncate">{met.calculationFormulaSql}</code>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Steward (Sorumlu): <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{met.ownerSteward}</span></div>
                <div>Yönetişim Durumu: <span className="font-bold text-emerald-500">{met.governanceStatus}</span></div>
                <div>Kullanılan Boyutlar: <span className="font-bold text-[#D4AF37]">{met.reusableDimensions.join(", ")}</span></div>
                <div>Metrik Anahtarı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{met.metricKey}</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] space-y-1 border border-black/5 dark:border-white/5">
                <span className="font-bold text-emerald-500 block">✦ WedyAI Sözlük Tanımı:</span>
                <p className="text-[#111111] dark:text-[#F5F4F0]">{met.aiGlossaryDefinition}</p>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Tavsiyesi: {met.aiRecommendationNote}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                {met.governanceStatus !== "GOVERNED_STABLE" ? (
                  <button
                    onClick={() => handleGovernMetric(met.id, met.metricDisplayName)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Check className="w-3 h-3 text-[#D4AF37]" />
                        <span>Metrik Tanımını Doğrula & Mühürle</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Metrik Doğrulandı (Governed Metric)
                  </span>
                )}

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Sync: {new Date(met.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
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