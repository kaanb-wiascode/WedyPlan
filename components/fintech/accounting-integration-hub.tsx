"use client";

import React, { useState, useEffect } from "react";
import { FileCode, Sparkles, ShieldCheck, Download, RefreshCw, CheckCircle2, Server } from "lucide-react";
import { AccountingIntegrationEngine, JournalEntryBatch, AccountingHubSummary, IntegrationFormatType } from "@/lib/fintech/accounting-integration-engine";

export const AccountingIntegrationHub: React.FC = () => {
  const [batches, setBatches] = useState<JournalEntryBatch[]>([]);
  const [summary, setSummary] = useState<AccountingHubSummary | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<IntegrationFormatType>("SAP_ERP_JSON");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AccountingIntegrationEngine.getJournalBatches().then(setBatches);
    AccountingIntegrationEngine.getHubSummary().then(setSummary);
  }, []);

  const handleExport = async (batchId: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await AccountingIntegrationEngine.exportBatch(batchId, selectedFormat);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `Yevmiye kaydı '${selectedFormat}' formatında ERP/Muhasebe sistemine aktarıldı!` });
        AccountingIntegrationEngine.getJournalBatches().then(setBatches);
      } else {
        setStatusMsg({ type: "error", text: "Aktarım gerçekleştirilemedi." });
      }
    }, 600);
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Accounting Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Server className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Muhasebe & ERP Entegrasyon Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> ERP Ready Online
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          SAP, Oracle, Logo Tiger, Mikro ve SAF-T standartlarında çift girişli yevmiye fişi ihracı, hesap planı eşleme ve WedyAI doğrulama.
        </p>

        {/* Executive ERP Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktarılan Hacim</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(summary.totalExportedJournalVolume / 1000000).toFixed(1)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">AI Hesap Eşleme</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              %{summary.aiLedgerMappingAccuracyPercent}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Desteklenen ERP</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.supportedFormatsCount} Format
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Validation & Ledger Mapping Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Muhasebe Doğrulama
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Balanced Ledger
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiValidationTip}
          </p>
        </div>
      </div>

      {/* Format Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["SAP_ERP_JSON", "LOGO_TIGER_CSV", "ORACLE_EBS_XML", "MIKRO_V16_TXT", "STANDARD_SAF_T"] as IntegrationFormatType[]).map((fmt) => (
          <button
            key={fmt}
            onClick={() => setSelectedFormat(fmt)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedFormat === fmt
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {fmt}
          </button>
        ))}
      </div>

      {/* Journal Entry Batches Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <FileCode className="w-5 h-5 text-[#D4AF37]" />
          <span>Yevmiye Fişleri & ERP Dışa Aktarım Paketleri ({batches.length})</span>
        </h4>

        <div className="space-y-3">
          {batches.map((b) => (
            <div
              key={b.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{b.entryNumber} ({b.entryType})</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {b.aiValidationStatus}
                </span>
              </div>

              {/* Itemized Debit/Credit Lines */}
              <div className="space-y-1.5 font-mono text-[11px]">
                {b.lines.map((line) => (
                  <div key={line.id} className="p-2 bg-white dark:bg-black/40 rounded-xl flex justify-between items-center border border-black/5 dark:border-white/5">
                    <div>
                      <span className="font-bold text-[#D4AF37] block">{line.accountCode}</span>
                      <span className="text-[10px] text-[#86868B]">{line.accountName}</span>
                    </div>
                    <div className="text-right">
                      {line.debitAmount > 0 && <span className="text-emerald-600 dark:text-emerald-400 block font-bold">Borç: ₺{line.debitAmount.toLocaleString()}</span>}
                      {line.creditAmount > 0 && <span className="text-blue-500 block font-bold">Alacak: ₺{line.creditAmount.toLocaleString()}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] text-[#D4AF37] font-medium">
                ✦ AI Önerilen Hesap Kodu: {b.aiSuggestedAccountCode}
              </div>

              <div className="pt-1 flex justify-between items-center text-[10px]">
                {b.exportedAt ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ERP'ye Aktarıldı ({b.exportFormat})
                  </span>
                ) : (
                  <button
                    onClick={() => handleExport(b.id)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Download className="w-3 h-3 text-[#D4AF37]" />
                        <span>{selectedFormat} Formatında Dışa Aktar</span>
                      </>
                    )}
                  </button>
                )}
                <span className="font-mono text-[#86868B]">{new Date(b.createdAt).toLocaleDateString()}</span>
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