"use client";

import React, { useState, useEffect } from "react";
import { Code2, ShieldCheck, RefreshCw, CheckCircle2, Download, Copy, Check, Terminal, Layers, Cpu, Code, BookOpen } from "lucide-react";
import { SdkPlatformEngine, SdkPackageRecord, SdkPlatformSummary, SdkTargetLanguage } from "@/lib/integration/sdk-platform-engine";

export const SdkCenter: React.FC = () => {
  const [packages, setPackages] = useState<SdkPackageRecord[]>([]);
  const [summary, setSummary] = useState<SdkPlatformSummary | null>(null);
  const [selectedLang, setSelectedLang] = useState<SdkTargetLanguage | "ALL">("ALL");
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  useEffect(() => {
    SdkPlatformEngine.getSdkPackages().then(setPackages);
    SdkPlatformEngine.getSummary().then(setSummary);
  }, []);

  const handleCopySnippet = (pkgId: string, snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippetId(pkgId);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  if (!summary) return null;

  const filteredPackages = selectedLang === "ALL"
    ? packages
    : packages.filter((p) => p.targetLanguage === selectedLang);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive SDK Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal SDK & Geliştirici Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Spec Coverage: %{summary.averageOpenApiCoveragePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          8 programlama dilinde resmi WedyPlan SDK paketleri, dahili OAuth2/API Key kimlik doğrulaması, otomatik retry ve tip güvenliği.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Desteklenen Dil</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalSupportedLanguagesCount} Dil
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">24s İndirme</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.totalSdkDownloads24h / 1000).toFixed(1)}K Download
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">OpenAPI Kapsamı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.averageOpenApiCoveragePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI SDK Code Generation Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> WedyAI Dokümantasyon & Kod Üretici Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            SDK Generator Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Terminal className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiSdkInsightNote}
          </p>
        </div>
      </div>

      {/* Language Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "TYPESCRIPT", "PYTHON", "GO", "DOTNET", "JAVA", "PHP"] as (SdkTargetLanguage | "ALL")[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedLang === lang
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {lang === "ALL" ? "Tüm Diller" : lang}
          </button>
        ))}
      </div>

      {/* SDK Packages Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Code className="w-5 h-5 text-[#D4AF37]" />
          <span>Resmi SDK Paketleri ({filteredPackages.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-mono font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{pkg.packageName}</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {pkg.versionTag} ({pkg.packageStatus})
                </span>
              </div>

              {/* Sample Snippet Console */}
              <div className="p-3 bg-[#111111] rounded-xl text-emerald-400 font-mono text-[10px] space-y-2 border border-white/10">
                <div className="flex justify-between items-center border-b border-white/10 pb-1.5 text-[9px] text-[#86868B]">
                  <span>{pkg.targetLanguage} Sample Code</span>
                  <button
                    onClick={() => handleCopySnippet(pkg.id, pkg.sampleSnippetText)}
                    className="text-[#D4AF37] hover:underline flex items-center gap-1 font-bold"
                  >
                    {copiedSnippetId === pkg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSnippetId === pkg.id ? "Kopyalandı!" : "Kodu Kopyala"}</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed">{pkg.sampleSnippetText}</pre>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI SDK İpucu: {pkg.aiDocAssistantTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>OpenAPI Kapsayıcılığı: <strong className="text-emerald-500">%{pkg.openApiSpecCoveragePercent}</strong></span>
                <span>24s İndirme: <strong className="text-[#111111] dark:text-[#F5F4F0]">{pkg.downloadCount24h}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};