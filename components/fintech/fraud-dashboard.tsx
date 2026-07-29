"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Sparkles, ShieldCheck, CheckCircle2, Zap, Lock, RefreshCw, AlertTriangle, UserX, Eye, Cpu, Radio } from "lucide-react";
import { FraudEngine, FraudAlertRecord, FraudPlatformSummary } from "@/lib/fintech/fraud-engine";

export const FraudDashboard: React.FC = () => {
  const [alerts, setAlerts] = useState<FraudAlertRecord[]>([]);
  const [summary, setSummary] = useState<FraudPlatformSummary | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<FraudAlertRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    FraudEngine.getAlerts().then((data) => {
      setAlerts(data);
      if (data.length > 0) setSelectedAlert(data[0]);
    });
    FraudEngine.getSummary().then(setSummary);
  }, []);

  const handleLockdown = async () => {
    if (!selectedAlert) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await FraudEngine.applyAccountLockdown(selectedAlert.id);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "error", text: `Hesap '${selectedAlert.tenantName}' için cüzdan donduruldu ve koruma kalkanı aktifleştirildi!` });
        FraudEngine.getAlerts().then((data) => {
          setAlerts(data);
          const updated = data.find((a) => a.id === selectedAlert.id);
          if (updated) setSelectedAlert(updated);
        });
        FraudEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "İşlem gerçekleştirilemedi." });
      }
    }, 600);
  };

  const handleClear = async () => {
    if (!selectedAlert) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await FraudEngine.clearAlert(selectedAlert.id);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: "Uyarı doğrulandı ve yanlış alarm olarak temizlendi." });
        FraudEngine.getAlerts().then((data) => {
          setAlerts(data);
          const updated = data.find((a) => a.id === selectedAlert.id);
          if (updated) setSelectedAlert(updated);
        });
      }
    }, 600);
  };

  if (!summary || !selectedAlert) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Fraud Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-500" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Finansal Risk & Dolandırıcılık Kalkanı
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Active Protection
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Şüpheli işlemler, hesap ele geçirme (ATO) sinyalleri, hız aşımları ve cihaz/davranış analitiği ile uçtan uca finansal güvenlik.
        </p>

        {/* Executive Fraud Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Taranan İşlemler</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalScannedTransactionsCount.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Engellenen Şüpheli Hacim</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{(summary.preventedFraudAmountTotal / 1000).toFixed(0)}K TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Dondurulan Cüzdan</span>
            <span className="font-mono font-bold text-red-400 text-base">
              {summary.frozenWalletsCount} Hesap
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Risk Scoring & Threat Analysis Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Tehdit Analizi
          </span>
          <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
            selectedAlert.aiRiskScorePercent > 80
              ? "bg-red-500/10 text-red-600 dark:text-red-400"
              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
          }`}>
            Öncelik: {selectedAlert.priority} (%{selectedAlert.aiRiskScorePercent} Risk)
          </span>
        </div>

        <div className="space-y-1">
          <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
            {selectedAlert.tenantName}
          </h4>
          <span className="text-[10px] font-mono text-[#86868B] block">
            Sinyal Türü: {selectedAlert.signalType} • Konum: {selectedAlert.ipAddressLocation}
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5">
          <p className="text-[11px] text-[#111111] dark:text-[#F5F4F0] font-medium leading-relaxed">
            ✦ {selectedAlert.aiAnalysisSummary}
          </p>

          <div className="pt-1 flex flex-wrap gap-1 font-mono text-[9px] text-[#D4AF37]">
            {selectedAlert.triggeredRules.map((rule, idx) => (
              <span key={idx} className="bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-md">
                ⚠️ {rule}
              </span>
            ))}
          </div>
        </div>

        {/* Protection Action Buttons */}
        <div className="pt-2 flex gap-2">
          {selectedAlert.status !== "FROZEN_LOCKDOWN" ? (
            <button
              onClick={handleLockdown}
              disabled={isProcessing}
              className="flex-1 py-3 bg-red-600 text-white text-xs font-bold rounded-2xl shadow-md hover:bg-red-700 transition-all flex items-center justify-center gap-1.5"
            >
              {isProcessing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Cüzdanı Dondur & Hesabı Kilitle</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex-1 p-3 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-2xl text-center flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Cüzdan ve Hesap Kilitlendi</span>
            </div>
          )}

          {selectedAlert.status !== "CLEARED_FALSE_POSITIVE" && (
            <button
              onClick={handleClear}
              disabled={isProcessing}
              className="px-4 py-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-2xl border border-emerald-500/20 hover:bg-emerald-500/20 transition-all flex items-center gap-1 shrink-0"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Temizle
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
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}
      </div>

      {/* Alerts Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Canlı Tehdit & Uyarı Kütüğü ({alerts.length})
        </h4>

        <div className="space-y-3">
          {alerts.map((al) => (
            <div
              key={al.id}
              onClick={() => setSelectedAlert(al)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                selectedAlert.id === al.id
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm">{al.tenantName}</span>
                <span className="text-[10px] font-mono bg-red-500/20 text-red-500 px-2.5 py-0.5 rounded-full">
                  {al.priority} (%{al.aiRiskScorePercent})
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] opacity-80 font-mono">
                <span>Tür: {al.signalType}</span>
                <span>Durum: {al.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};