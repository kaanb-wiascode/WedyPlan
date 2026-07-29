"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Terminal, Code2, Play, Layers, ExternalLink, GitCommit, Copy, Check, Search, Rocket } from "lucide-react";
import { DeveloperPortalEngine, DeveloperResourceItem, DeveloperChangelogRecord, DeveloperPortalSummary, DeveloperModuleType } from "@/lib/integration/developer-portal-engine";

export const DeveloperPortal: React.FC = () => {
  const [resources, setResources] = useState<DeveloperResourceItem[]>([]);
  const [changelogs, setChangelogs] = useState<DeveloperChangelogRecord[]>([]);
  const [summary, setSummary] = useState<DeveloperPortalSummary | null>(null);
  const [selectedModule, setSelectedModule] = useState<DeveloperModuleType | "ALL">("ALL");

  // Sandbox State
  const [sandboxEndpoint, setSandboxEndpoint] = useState("/api/v1/venues/search");
  const [sandboxResponse, setSandboxResponse] = useState<string | null>(null);
  const [isExecSandbox, setIsExecSandbox] = useState(false);

  useEffect(() => {
    DeveloperPortalEngine.getPortalResources().then(setResources);
    DeveloperPortalEngine.getChangelogRecords().then(setChangelogs);
    DeveloperPortalEngine.getSummary().then(setSummary);
  }, []);

  const handleExecuteSandbox = () => {
    setIsExecSandbox(true);
    setSandboxResponse(null);

    setTimeout(() => {
      setSandboxResponse(JSON.stringify({
        status: 200,
        success: true,
        region: "Bosphorus",
        totalResults: 12,
        latencyMs: 14,
        data: [
          { venueId: "vn_ciragan", name: "Çırağan Palace Kempinski", capacity: 450, escrowEligible: true },
          { venueId: "vn_sait_halim", name: "Sait Halim Paşa Yalısı", capacity: 250, escrowEligible: true }
        ]
      }, null, 2));
      setIsExecSandbox(false);
    }, 400);
  };

  if (!summary) return null;

  const filteredResources = selectedModule === "ALL"
    ? resources
    : resources.filter((r) => r.moduleType === selectedModule);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Developer Portal Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Geliştirici Portalı (Developer Portal)
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Copilot CSAT: %{summary.developerCopilotCsatPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          WedyPlan kurumsal entegrasyon ekosistemi için dokümantasyon, SDK indirmeleri, hızlı başlangıçlar, interaktif Sandbox ve AI Developer Copilot.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Dev Takımları</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.activeDeveloperTeamsCount} Takım
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aylık Sandbox İsteği</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.monthlySandboxRequestsCount / 1000).toFixed(0)}K
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Mevcut Dokümanlar</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.totalAvailableDocsCount} Rehber
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Developer Copilot Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Developer Copilot Asistan Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Copilot Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Code2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiDeveloperPortalInsightNote}
          </p>
        </div>
      </div>

      {/* Interactive API Sandbox Console */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#D4AF37]" />
          <span>İnteraktif API Sandbox & Test Konsolu</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="flex gap-2">
            <input
              type="text"
              value={sandboxEndpoint}
              onChange={(e) => setSandboxEndpoint(e.target.value)}
              className="flex-1 h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
            <button
              onClick={handleExecuteSandbox}
              disabled={isExecSandbox}
              className="px-5 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] font-bold rounded-2xl shadow-md hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-2 shrink-0"
            >
              {isExecSandbox ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
              ) : (
                <>
                  <Play className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>Sandbox Çalıştır</span>
                </>
              )}
            </button>
          </div>

          {sandboxResponse && (
            <div className="p-3 bg-[#111111] text-emerald-400 font-mono text-[10px] rounded-xl overflow-x-auto leading-relaxed border border-white/10 space-y-1">
              <span className="text-[9px] text-[#86868B] block border-b border-white/10 pb-1">Response JSON (HTTP 200 OK - Mocked Sandbox)</span>
              <pre>{sandboxResponse}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Module Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "QUICK_STARTS", "SAMPLE_PROJECTS", "API_DOCS", "SDK_DOWNLOADS"] as (DeveloperModuleType | "ALL")[]).map((mod) => (
          <button
            key={mod}
            onClick={() => setSelectedModule(mod)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedModule === mod
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {mod === "ALL" ? "Tüm Kaynaklar" : mod.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Resources Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#D4AF37]" />
          <span>Geliştirici Dokümanları & Rehberler ({filteredResources.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{res.title}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  {res.categoryTag}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                {res.summaryText}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Tahmini Süre: {res.estimatedTimeToCompleteMinutes} dk</span>
                <span className="text-[#D4AF37] font-bold flex items-center gap-1 cursor-pointer hover:underline">
                  <span>Rehbere Git</span> <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Changelog Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <GitCommit className="w-5 h-5 text-[#D4AF37]" />
          <span>Sürüm Değişiklik Kütüğü (Changelog & Release Notes)</span>
        </h4>

        <div className="space-y-3">
          {changelogs.map((chg) => (
            <div
              key={chg.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{chg.releaseTitle}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {chg.versionTag}
                </span>
              </div>

              <ul className="space-y-1 text-[11px] text-[#555555] dark:text-[#A1A1A6] list-disc list-inside">
                {chg.changesSummary.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 text-right text-[10px] font-mono text-[#86868B]">
                Yayınlanma: {new Date(chg.publishedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};