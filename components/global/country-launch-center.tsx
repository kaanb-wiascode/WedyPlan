"use client";

import React, { useState, useEffect } from "react";
import { Rocket, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, Calendar, AlertTriangle, Layers, CheckCheck, ArrowUpRight } from "lucide-react";
import { CountryLaunchEngine, CountryLaunchProject, LaunchSummaryStats } from "@/lib/global/country-launch-engine";

export const CountryLaunchCenter: React.FC = () => {
  const [projects, setProjects] = useState<CountryLaunchProject[]>([]);
  const [summary, setSummary] = useState<LaunchSummaryStats | null>(null);
  const [selectedProject, setSelectedProject] = useState<CountryLaunchProject | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    CountryLaunchEngine.getLaunchProjects().then((data) => {
      setProjects(data);
      if (data.length > 0) setSelectedProject(data[0]);
    });
    CountryLaunchEngine.getSummaryStats().then(setSummary);
  }, []);

  const handleApprove = async (projectId: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await CountryLaunchEngine.approveLaunch(projectId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: "Ülke lansmanı C-Suite tarafından onaylandı ve LAUNCH_READY statüsüne geçirildi!" });
        CountryLaunchEngine.getLaunchProjects().then((data) => {
          setProjects(data);
          const updated = data.find((p) => p.id === projectId);
          if (updated) setSelectedProject(updated);
        });
        CountryLaunchEngine.getSummaryStats().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Lansman onayı gerçekleştirilemedi." });
      }
    }, 600);
  };

  if (!summary || !selectedProject) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Country Launch Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Yeni Ülke Lansman Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Live: {summary.liveCountriesCount} Countries
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Yeni ülkeler için standartlaştırılmış 8 adımlı lansman kontrol listesi, lansman takvimi, onay yönetimi ve WedyAI lansman risk analizi.
        </p>

        {/* Executive Launch Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Lansmanlar</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.activeLaunchProjectsCount} Ülke
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Canlıdaki Ülkeler</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.liveCountriesCount} Ülke
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Hazırlık Skoru</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.averageReadinessScorePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Launch Risk & Recommendation Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Lansman Risk & Öneri Analizi
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Risk: %{selectedProject.aiLaunchRiskPredictorScorePercent} (Düşük)
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {selectedProject.aiRecommendedActionNote}
          </p>
        </div>
      </div>

      {/* Project Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProject(p)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border whitespace-nowrap transition-all ${
              selectedProject.id === p.id
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {p.countryName} ({p.countryCode})
          </button>
        ))}
      </div>

      {/* Selected Country Launch Project Details */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <div>
            <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
              {selectedProject.countryName} ({selectedProject.countryCode})
            </h4>
            <span className="text-[10px] text-[#86868B] font-mono">
              Hedef Tarih: {new Date(selectedProject.targetLaunchDate).toLocaleDateString()}
            </span>
          </div>
          <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
            {selectedProject.status}
          </span>
        </div>

        {/* Milestone Checklist Stream */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-[#111111] dark:text-[#F5F4F0] uppercase tracking-wider">
            8 Adımlı Lansman Kontrol Listesi
          </h5>

          {selectedProject.checklist.map((chk) => (
            <div
              key={chk.id}
              className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{chk.title}</span>
                {chk.isPassed ? (
                  <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> IN PROGRESS
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Not: {chk.notes}</span>
                <span>%{chk.completionPercent}</span>
              </div>

              <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    chk.isPassed ? "bg-emerald-500" : "bg-[#D4AF37]"
                  }`}
                  style={{ width: `${chk.completionPercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* C-Suite Approval Action */}
        <div className="pt-2 border-t border-black/5 dark:border-white/5">
          {selectedProject.status === "LAUNCH_READY" ? (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>C-Suite Onayı Alındı ({new Date(selectedProject.approvedByCsuiteAt!).toLocaleDateString()}). Lansmana Hazır!</span>
            </div>
          ) : (
            <button
              onClick={() => handleApprove(selectedProject.id)}
              disabled={isProcessing}
              className="w-full h-12 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
              ) : (
                <>
                  <Rocket className="w-4 h-4 text-[#D4AF37]" />
                  <span>C-Suite Lansman Onayını Ver</span>
                </>
              )}
            </button>
          )}
        </div>

        {statusMsg && (
          <div
            className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              statusMsg.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
                : "bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};