"use client";

import React, { useState, useEffect } from "react";
import { Users, Sparkles, CheckCircle2, ShieldCheck, Zap, ArrowRight, PhoneCall, Mail, MessageSquare, Clock, Filter, Layers, ChevronRight } from "lucide-react";
import { CrmEngine, CrmLeadRecord, CrmPipelineSummary, CrmPipelineType, CustomerLifecycleStage } from "@/lib/growth/crm-engine";

export const CrmDashboard: React.FC = () => {
  const [leads, setLeads] = useState<CrmLeadRecord[]>([]);
  const [summary, setSummary] = useState<CrmPipelineSummary | null>(null);
  const [selectedPipeline, setSelectedPipeline] = useState<CrmPipelineType>("SALES_PIPELINE");
  const [selectedLead, setSelectedLead] = useState<CrmLeadRecord | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    CrmEngine.getCrmLeads(selectedPipeline).then((data) => {
      setLeads(data);
      if (data.length > 0) setSelectedLead(data[0]);
    });
    CrmEngine.getPipelineSummary(selectedPipeline).then(setSummary);
  }, [selectedPipeline]);

  const handleStageChange = async (leadId: string, stage: CustomerLifecycleStage) => {
    const ok = await CrmEngine.updateStage(leadId, stage);
    if (ok) {
      setStatusMsg(`Aşama '${stage}' olarak başarıyla güncellendi.`);
      CrmEngine.getCrmLeads(selectedPipeline).then((data) => {
        setLeads(data);
        const updated = data.find((l) => l.id === leadId);
        if (updated) setSelectedLead(updated);
      });
      setTimeout(() => setStatusMsg(null), 2500);
    }
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal CRM & Otomasyon
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Zero Data Duplication
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          B2B ve B2C uçtan uca müşteri yaşam döngüsü, WedyAI En İyi Sonraki Aksiyon (Next Best Action) önerileri ve otomasyonel takip.
        </p>

        {/* Pipeline Summary Cards */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Boru Hattı Değeri</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{summary.totalPipelineValue.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Aday/Müşteri</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.totalLeadsCount} Kayıt
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Lead Skoru</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.averageLeadScore} / 100
            </span>
          </div>
        </div>
      </div>

      {/* Pipeline Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["SALES_PIPELINE", "VENDOR_PIPELINE", "PARTNERSHIP_PIPELINE", "SPONSOR_PIPELINE"] as CrmPipelineType[]).map((pipe) => (
          <button
            key={pipe}
            onClick={() => setSelectedPipeline(pipe)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedPipeline === pipe
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10 hover:bg-black/5"
            }`}
          >
            {pipe === "SALES_PIPELINE" ? "B2C Satış" : pipe === "VENDOR_PIPELINE" ? "B2B Tedarikçi" : pipe === "PARTNERSHIP_PIPELINE" ? "Affiliate/Partner" : "Sponsorluk"}
          </button>
        ))}
      </div>

      {/* WedyAI Next Best Action & Intelligence Card */}
      {selectedLead && (
        <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> WedyAI En İyi Sonraki Aksiyon (Next Best Action)
            </span>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
              Lead Skor: {selectedLead.aiLeadScore}/100
            </span>
          </div>

          <div className="space-y-1">
            <h4 className="font-serif-editorial text-xl font-semibold text-[#111111] dark:text-[#F5F4F0]">
              {selectedLead.name}
            </h4>
            <p className="text-xs text-[#86868B]">
              Temsilci: {selectedLead.assignedOwnerName} • {selectedLead.email}
            </p>
          </div>

          <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1.5 text-xs border border-black/5 dark:border-white/5">
            <span className="font-bold text-[#D4AF37] text-[10px] block">✦ Akıllı Temsilci Önerisi</span>
            <p className="text-[11px] text-[#111111] dark:text-[#F5F4F0] font-medium leading-relaxed">
              {selectedLead.aiNextBestAction}
            </p>
          </div>

          {/* Lifecycle Stage Switcher */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#86868B] uppercase block">Yaşam Döngü Aşaması Geçişi</span>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
              {(["LEAD", "PROSPECT", "QUALIFIED", "ACTIVE", "VIP", "LOST"] as CustomerLifecycleStage[]).map((stage) => (
                <button
                  key={stage}
                  onClick={() => handleStageChange(selectedLead.id, stage)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all shrink-0 ${
                    selectedLead.lifecycleStage === stage
                      ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                      : "bg-white dark:bg-black/40 text-[#666666] border-black/10 dark:border-white/10"
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}
        </div>
      )}

      {/* CRM Leads Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Boru Hattı Müşteri Kayıtları ({leads.length})
        </h4>

        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                selectedLead?.id === lead.id
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm block">{lead.name}</span>
                <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full">
                  {lead.lifecycleStage}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] opacity-80 font-mono">
                <span>Anlaşma Tutarı: ₺{lead.dealValueAmount.toLocaleString()}</span>
                <span>Terk Riski: %{lead.aiChurnRiskPercent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};