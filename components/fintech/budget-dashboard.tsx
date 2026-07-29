"use client";

import React, { useState, useEffect } from "react";
import { Wallet, Sparkles, ShieldCheck, PieChart, CheckCircle2, AlertTriangle, RefreshCw, Layers, DollarSign, ArrowUpRight, TrendingUp } from "lucide-react";
import { BudgetEngine, BudgetRecord, BudgetItemCategory, BudgetScopeType } from "@/lib/fintech/budget-engine";

export const BudgetDashboard: React.FC = () => {
  const [budgets, setBudgets] = useState<BudgetRecord[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<BudgetRecord | null>(null);
  const [selectedScope, setSelectedScope] = useState<BudgetScopeType>("WEDDING_COUPLE");

  useEffect(() => {
    BudgetEngine.getBudgets().then((data) => {
      setBudgets(data);
      if (data.length > 0) setSelectedBudget(data[0]);
    });
  }, []);

  if (!selectedBudget) return null;

  const filteredBudgets = budgets.filter((b) => b.scope === selectedScope);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Budget Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PieChart className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Bütçe Yönetim Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Budget Protection
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Çiftler, tedarikçiler ve kurumsal departmanlar için akıllı bütçe planlama, harcama takibi, aşım uyarıları ve WedyAI maliyet tasarrufu.
        </p>

        {/* Global Budget Overview Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Hedef Bütçe</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{selectedBudget.totalTargetBudgetAmount.toLocaleString()} TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Harcanan + Escrow</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{(selectedBudget.totalSpentAmount + selectedBudget.totalCommittedEscrowAmount).toLocaleString()} TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Kalan Bütçe</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              ₺{selectedBudget.totalRemainingAmount.toLocaleString()} TL
            </span>
          </div>
        </div>
      </div>

      {/* Scope Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["WEDDING_COUPLE", "VENDOR_OPERATIONS", "CORPORATE_ENTERPRISE"] as BudgetScopeType[]).map((scope) => (
          <button
            key={scope}
            onClick={() => {
              setSelectedScope(scope);
              const found = budgets.find((b) => b.scope === scope);
              if (found) setSelectedBudget(found);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border whitespace-nowrap transition-all ${
              selectedScope === scope
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {scope === "WEDDING_COUPLE" ? "Çift Düğün Bütçesi" : scope === "VENDOR_OPERATIONS" ? "Tedarikçi Operasyon Bütçesi" : "Kurumsal Bütçe"}
          </button>
        ))}
      </div>

      {/* WedyAI Optimization & Cost Saving Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Bütçe Optimizasyonu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Tasarruf Potansiyeli: ₺{selectedBudget.aiSavingsPotentialAmount.toLocaleString()} TL
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {selectedBudget.aiBudgetOptimizationTip}
          </p>
        </div>
      </div>

      {/* Itemized Categories Breakdown Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Kategori Bazlı Bütçe Dağılımı ({selectedBudget.categories.length})</span>
        </h4>

        <div className="space-y-3">
          {selectedBudget.categories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{cat.categoryName}</span>
                <span className={`font-mono text-xs ${cat.isOverbudget ? "text-red-500 font-bold" : "text-emerald-500"}`}>
                  {cat.isOverbudget ? "⚠️ Bütçe Aşıldı" : `Kalan: ₺${cat.remainingAmount.toLocaleString()} TRY`}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    cat.isOverbudget ? "bg-red-500" : "bg-[#D4AF37]"
                  }`}
                  style={{
                    width: `${Math.min(100, ((cat.spentAmount + cat.committedEscrowAmount) / cat.allocatedAmount) * 100)}%`,
                  }}
                />
              </div>

              <div className="grid grid-cols-3 gap-1 pt-1 font-mono text-[10px] text-[#86868B]">
                <div>Ayrılan: ₺{cat.allocatedAmount.toLocaleString()}</div>
                <div>Harcanan: ₺{cat.spentAmount.toLocaleString()}</div>
                <div>Escrow Kilitli: ₺{cat.committedEscrowAmount.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};