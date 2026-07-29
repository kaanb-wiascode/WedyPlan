"use client";

import React, { useState, useEffect } from "react";
import { FileText, ShieldCheck, RefreshCw, CheckCircle2, Zap, DollarSign, Download, ArrowRightLeft, Layers, FileSpreadsheet, Scale } from "lucide-react";
import { AccountingIntegrationEngine, AccountingRecordItem, AccountingIntegrationSummary, AccountingExportType } from "@/lib/integration/accounting-integration-engine";

export const AccountingIntegrationHub: React.FC = () => {
  const [records, setRecords] = useState<AccountingRecordItem[]>([]);
  const [summary, setSummary] = useState<AccountingIntegrationSummary | null>(null);
  const [selectedType, setSelectedType] = useState<AccountingExportType | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    AccountingIntegrationEngine.getAccountingRecords().then(setRecords);
    AccountingIntegrationEngine.getSummary().then(setSummary);
  }, []);

  const handleReExport = async (recordId: string, refNum: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await AccountingIntegrationEngine.triggerExport(recordId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${refNum}' muhasebe fişi başarıyla dışa aktarıldı!` });
        AccountingIntegrationEngine.getAccountingRecords().then(setRecords);
        AccountingIntegrationEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Dışa aktarım başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredRecords = selectedType === "ALL"
    ? records
    : records.filter((r) => r.exportType === selectedType);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Accounting Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Muhasebe Entegrasyon Hub'ı
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Ledger Accuracy: %{summary.ledgerValidationAccuracyPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Logo, Luca, QuickBooks ve Xero sistemleri için e-Fatura/UBL 2.1 XML dışa aktarımı, çift taraflı yevmiye fişleri (Journal Entries) ve banka mutabakatı.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">24s Aktarılan Fiş</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.totalExportedRecords24h / 1000).toFixed(1)}K Record
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktarılan Hacim</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ${(summary.totalBalancedJournalVolumeUsd / 1000000).toFixed(2)}M USD
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Entegrasyon</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.activeAccountingIntegrationsCount} System
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Ledger Validation & Accounting Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Defter Doğrulama Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Balanced Ledger
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <FileText className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiAccountingInsightNote}
          </p>
        </div>
      </div>

      {/* Export Type Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "INVOICE_EXPORT", "JOURNAL_ENTRIES", "RECONCILIATION_EXPORT", "TAX_REPORTS"] as (AccountingExportType | "ALL")[]).map((typ) => (
          <button
            key={typ}
            onClick={() => setSelectedType(typ)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedType === typ
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {typ === "ALL" ? "Tüm Muhasebe Kayıtları" : typ.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Records Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-[#D4AF37]" />
          <span>Muhasebe Fiş Kayıtları ({filteredRecords.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{rec.referenceNumber}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {rec.status} ({rec.exportFormat})
                </span>
              </div>

              {/* Journal Lines Table */}
              <div className="p-3 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-1 font-bold text-[#86868B]">
                  <span>GL Hesap</span>
                  <span>Borç (Dr)</span>
                  <span>Alacak (Cr)</span>
                </div>
                {rec.journalLines.map((line, idx) => (
                  <div key={idx} className="flex justify-between text-[#111111] dark:text-[#F5F4F0]">
                    <span className="truncate max-w-[180px]">{line.glAccountCode} - {line.accountName}</span>
                    <span className="text-emerald-500">${line.debitAmountUsd.toLocaleString()}</span>
                    <span className="text-[#D4AF37]">${line.creditAmountUsd.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Analizi: {rec.aiValidationNote}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <button
                  onClick={() => handleReExport(rec.id, rec.referenceNumber)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <Download className="w-3 h-3 text-[#D4AF37]" />
                      <span>Fişi Yeniden İndir / Aktar</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] text-[#86868B]">
                  Hedef: {rec.targetSystemRef}
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