"use client";

import React, { useState, useEffect } from "react";
import { Bug, Sparkles, ShieldAlert, Cpu, CheckCircle2, Wrench, Activity, ChevronRight } from "lucide-react";
import { MobileDiagnosticsEngine, CrashReport } from "@/lib/mobile/mobile-diagnostics-engine";

export const MobileDiagnosticsDashboard: React.FC = () => {
  const [reports, setReports] = useState<CrashReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<CrashReport | null>(null);

  useEffect(() => {
    MobileDiagnosticsEngine.initializeGlobalBoundary();
    const data = MobileDiagnosticsEngine.getReports();
    setReports(data);
    if (data.length > 0) setSelectedReport(data[0]);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto space-y-5 font-sans">
      {/* Diagnostics Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-6 rounded-[36px] border border-white/20 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bug className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-lg font-semibold">
              Çökme & Teşhis Paneli
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
            Canlı İzleme
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10 text-xs">
          <div>
            <span className="text-[10px] text-[#86868B] block">Toplam Hata Kümeleri</span>
            <span className="font-mono font-bold text-white text-base">{reports.length} Adet</span>
          </div>
          <div>
            <span className="text-[10px] text-[#86868B] block">Etkilenen Kullanıcı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">20 Kişi</span>
          </div>
        </div>
      </div>

      {/* WedyAI Root Cause & Code Fix Suggestion */}
      {selectedReport && (
        <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> WedyAI Kök Neden Analizi
            </span>
            <span className="text-[10px] font-mono bg-red-500/10 text-red-600 px-2 py-0.5 rounded-full font-bold">
              {selectedReport.severity}
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="font-mono text-xs font-bold text-[#111111] dark:text-[#F5F4F0] leading-tight break-all">
              {selectedReport.title}
            </h4>
            <pre className="p-3 bg-black/5 dark:bg-black/40 rounded-xl text-[10px] font-mono text-[#555555] dark:text-[#A1A1A6] overflow-x-auto">
              {selectedReport.stackTrace}
            </pre>
          </div>

          {selectedReport.aiRootCause && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl space-y-1.5 text-xs text-amber-900 dark:text-amber-300">
              <span className="font-bold flex items-center gap-1 text-[11px]">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>Teşhis</span>
              </span>
              <p className="text-[11px] leading-relaxed">{selectedReport.aiRootCause}</p>
            </div>
          )}

          {selectedReport.aiFixSuggestion && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-1.5 text-xs text-emerald-900 dark:text-emerald-300">
              <span className="font-bold flex items-center gap-1 text-[11px]">
                <Wrench className="w-4 h-4 text-emerald-500" />
                <span>WedyAI Çözüm Önerisi</span>
              </span>
              <code className="text-[10px] font-mono block bg-black/10 dark:bg-black/30 p-2 rounded-lg">
                {selectedReport.aiFixSuggestion}
              </code>
            </div>
          )}
        </div>
      )}

      {/* Crash Cluster List */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-5 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-base font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Hata Kümeleri ({reports.length})
        </h4>

        <div className="space-y-2">
          {reports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-xs space-y-1 ${
                selectedReport?.id === report.id
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-[#D4AF37]">
                  {report.errorType}
                </span>
                <span className="text-[9px] opacity-70">
                  {new Date(report.occurredAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p className="font-mono text-[11px] truncate">{report.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};