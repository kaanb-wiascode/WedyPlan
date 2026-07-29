"use client";

import React, { useState, useEffect } from "react";
import { Table, ShieldCheck, RefreshCw, CheckCircle2, Zap, Layers, Server, Database, BarChart, Clock, Check } from "lucide-react";
import { DataWarehouseEngine, DataWarehouseMartRecord, DataWarehouseSummary, DataMartDomain } from "@/lib/data/data-warehouse-engine";

export const DataWarehouseCenter: React.FC = () => {
  const [marts, setMarts] = useState<DataWarehouseMartRecord[]>([]);
  const [summary, setSummary] = useState<DataWarehouseSummary | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<DataMartDomain | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    DataWarehouseEngine.getMarts().then(setMarts);
    DataWarehouseEngine.getSummary().then(setSummary);
  }, []);

  const handleSnapshot = async (martId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await DataWarehouseEngine.triggerSnapshot(martId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' Data Mart tarihsel anlık görüntüsü (Snapshot) başarıyla alındı!` });
        DataWarehouseEngine.getMarts().then(setMarts);
        DataWarehouseEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Snapshot alma işlemi başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredMarts = selectedDomain === "ALL"
    ? marts
    : marts.filter((m) => m.domain === selectedDomain);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Data Warehouse Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Avg Query: {summary.averageQueryExecutionMs}ms
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Finans, satış, pazarlama ve AI etki alanları için Star/Snowflake boyut analitiği, SCD Type 2 tarihsel değişim takibi ve periyodik snapshot deposu.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam Data Mart</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalDataMartsCount} Mart
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam Satır</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.totalWarehouseRowsCount / 1000000).toFixed(2)}M Row
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">SCD2 Kapsamı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.scdHistoryCoveragePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Query & Warehouse Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Sorgu İyileştirici Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Warehouse AI Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <BarChart className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiWarehouseInsightNote}
          </p>
        </div>
      </div>

      {/* Domain Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "FINANCE", "MARKETPLACE", "AI", "SALES", "MARKETING", "OPERATIONS"] as (DataMartDomain | "ALL")[]).map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedDomain === dom
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {dom === "ALL" ? "Tüm Data Martlar" : dom}
          </button>
        ))}
      </div>

      {/* Data Marts Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Table className="w-5 h-5 text-[#D4AF37]" />
          <span>Kurumsal Data Mart Kayıtları ({filteredMarts.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredMarts.map((mart) => (
            <div
              key={mart.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{mart.martName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {mart.domain}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Fact Tablosu: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{mart.factTableName}</span></div>
                <div>Boyut Tablosu: <span className="font-bold text-[#D4AF37]">{mart.dimensionTablesCount} Dim</span></div>
                <div>Toplam Satır: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{(mart.totalRowsCount / 1000).toFixed(0)}K Row</span></div>
                <div>Ort. Sorgu Süresi: <span className="font-bold text-emerald-500">{mart.averageQueryTimeMs} ms</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] flex justify-between items-center border border-black/5 dark:border-white/5">
                <span>SCD Type 2 Varlıkları: <strong className="text-emerald-500">{mart.scdType2TrackedEntitiesCount} Izlenen</strong></span>
                <span>Şema: <strong className="text-[#D4AF37]">Star Schema</strong></span>
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI İyileştirmesi: {mart.aiOptimizationSuggestion}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <button
                  onClick={() => handleSnapshot(mart.id, mart.martName)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span>Anlık Görüntü Al (Snapshot)</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Snapshot: {new Date(mart.lastSnapshotAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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