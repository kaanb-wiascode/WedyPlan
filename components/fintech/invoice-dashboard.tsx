"use client";

import React, { useState, useEffect } from "react";
import { FileText, Sparkles, Download, ShieldCheck, CheckCircle2, Plus, RefreshCw } from "lucide-react";
import { InvoiceEngine, InvoiceRecord, TaxSummaryReport } from "@/lib/fintech/invoice-engine";

export const InvoiceDashboard: React.FC = () => {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [taxSummary, setTaxSummary] = useState<TaxSummaryReport | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);

  // Form State
  const [recipientInput, setRecipientInput] = useState("");
  const [taxIdInput, setTaxIdInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    InvoiceEngine.getInvoices().then((data) => {
      setInvoices(data);
      if (data.length > 0) setSelectedInvoice(data[0]);
    });
    InvoiceEngine.getTaxSummary().then(setTaxSummary);
  }, []);

  const handleGenerate = async () => {
    const numAmt = Number(amountInput);
    if (!recipientInput.trim() || !taxIdInput.trim() || !descInput.trim() || !numAmt) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const newInv = await InvoiceEngine.generateInvoice(
        recipientInput,
        taxIdInput,
        descInput,
        numAmt
      );
      setIsProcessing(false);
      setStatusMsg({ type: "success", text: `e-Fatura '${newInv.invoiceNumber}' başarıyla düzenlendi!` });
      setRecipientInput("");
      setTaxIdInput("");
      setDescInput("");
      setAmountInput("");
      InvoiceEngine.getInvoices().then((data) => {
        setInvoices(data);
        setSelectedInvoice(newInv);
      });
      InvoiceEngine.getTaxSummary().then(setTaxSummary);
    }, 600);
  };

  if (!taxSummary || !selectedInvoice) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Invoice Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              e-Fatura & Faturalandırma Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> E-Fatura Entegre
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Otomatik e-fatura üretimi, kredi notu / iade makbuzları, KDV vergi özetleri ve WedyAI finansal kategori sınıflandırma.
        </p>

        {/* Executive Tax Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Faturalandırılan Hacim</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(taxSummary.totalInvoicedVolume / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplanan KDV (%20)</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{(taxSummary.totalKdvTaxCollected / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Kredi Notu / İade</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              ₺{(taxSummary.creditNotesTotalAmount / 1000).toFixed(0)}K TL
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Tax Optimization & Category Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Vergi & Finansal Analiz
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">Kategori: {selectedInvoice.aiCategoryTag}</span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {taxSummary.aiTaxOptimizationTip}
          </p>
        </div>
      </div>

      {/* Selected Invoice Details & PDF Download Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <div>
            <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
              {selectedInvoice.invoiceNumber}
            </h4>
            <span className="text-[10px] text-[#86868B] font-mono">
              Düzenleyen: {selectedInvoice.issuerName} • Alıcı: {selectedInvoice.recipientName}
            </span>
          </div>
          <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full font-bold">
            {selectedInvoice.status}
          </span>
        </div>

        {/* Invoice Itemized Details */}
        <div className="space-y-2 text-xs">
          {selectedInvoice.items.map((itm) => (
            <div key={itm.id} className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block">{itm.description}</span>
                <span className="text-[10px] text-[#86868B] font-mono">KDV (%{itm.taxRatePercent}): ₺{(itm.unitPrice * 0.20).toLocaleString()}</span>
              </div>
              <span className="font-mono font-bold text-sm text-[#111111] dark:text-[#F5F4F0]">
                ₺{itm.totalAmount.toLocaleString()} TRY
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons: Download PDF & Share */}
        <div className="pt-2 flex gap-2">
          <a
            href={selectedInvoice.pdfDownloadUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#D4AF37]" />
            <span>Resmi e-Fatura PDF İndir</span>
          </a>
        </div>
      </div>

      {/* Generate New Automatic Invoice Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#D4AF37]" />
          <span>Yeni Otomatik e-Fatura Düzenle</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={recipientInput}
              onChange={(e) => setRecipientInput(e.target.value)}
              placeholder="Alıcı Adı / Unvanı..."
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
            <input
              type="text"
              value={taxIdInput}
              onChange={(e) => setTaxIdInput(e.target.value)}
              placeholder="VKN / TCKN..."
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
              placeholder="Hizmet Açıklaması..."
              className="col-span-2 h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
            <input
              type="number"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="Matrah (₺)..."
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!recipientInput.trim() || !taxIdInput.trim() || !descInput.trim() || !amountInput || isProcessing}
            className="w-full h-12 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>e-Fatura Düzenle & KDV Hesapla</span>
              </>
            )}
          </button>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Invoices Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Kesilen Fatura Kütüğü ({invoices.length})
        </h4>

        <div className="space-y-3">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              onClick={() => setSelectedInvoice(inv)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                selectedInvoice.id === inv.id
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm">{inv.invoiceNumber}</span>
                <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full">
                  {inv.type}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] opacity-80 font-mono">
                <span>Alıcı: {inv.recipientName}</span>
                <span>Tutar: ₺{inv.grandTotalAmount.toLocaleString()} TRY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};