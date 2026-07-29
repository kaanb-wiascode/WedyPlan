"use client";

import React, { useState, useEffect } from "react";
import { Landmark, ShieldCheck, Zap, DollarSign, Wallet, FileText, CheckCircle2, Lock, ArrowUpRight, Server, Layers } from "lucide-react";
import { FinancialEngine, FinancialDomainMap, WalletAccount, DoubleEntryRecord } from "@/lib/fintech/financial-engine";

export const FinancialArchitectureCenter: React.FC = () => {
  const [services, setServices] = useState<FinancialDomainMap[]>([]);
  const [wallets, setWallets] = useState<WalletAccount[]>([]);
  const [records, setRecords] = useState<DoubleEntryRecord[]>([]);

  useEffect(() => {
    FinancialEngine.getServiceMap().then(setServices);
    FinancialEngine.getWallets().then(setWallets);
    FinancialEngine.getLedgerRecords().then(setRecords);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Financial Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Landmark className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Finansal Mimari & FinTech Platformu
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Audit Ready
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Kurumsal çift girişli muhasebe defteri, çok kiracılı dijital cüzdanlar, Escrow kapora havuzu ve otomatik vergi/komisyon bölüşüm mimarisi.
        </p>

        {/* Global Financial Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">İşlenen Toplam Hacim</span>
            <span className="font-mono font-bold text-white text-base">₺52.8M TL</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Escrow Güvencede</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">₺4.2M TL</span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Cüzdan Hesapları</span>
            <span className="font-mono font-bold text-emerald-400 text-base">18.040 Adet</span>
          </div>
        </div>
      </div>

      {/* Financial Domain Services Map */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Server className="w-5 h-5 text-[#D4AF37]" />
          <span>Finansal Hizmet Haritası & Domain Sınırları</span>
        </h4>

        <div className="space-y-3">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{srv.domainName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {srv.status}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">{srv.description}</p>

              <div className="pt-1 flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Aktif Hesap: {srv.activeAccountsCount.toLocaleString()}</span>
                <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">
                  Hacim: ₺{(srv.totalVolumeSettled / 1000000).toFixed(1)}M TL
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet Accounts Overview Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Wallet className="w-5 h-5 text-[#D4AF37]" />
          <span>Multi-Tenant Cüzdan & Havuz Durumu</span>
        </h4>

        <div className="space-y-3">
          {wallets.map((w) => (
            <div
              key={w.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{w.tenantName}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full">
                  {w.accountType}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                <div className="p-2 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5">
                  <span className="text-[9px] text-[#86868B] block">Kullanılabilir Bakiye</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ₺{w.availableBalance.toLocaleString()} {w.currency}
                  </span>
                </div>
                <div className="p-2 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5">
                  <span className="text-[9px] text-[#86868B] block">Escrow Kilitli Bakiye</span>
                  <span className="font-bold text-[#D4AF37]">
                    ₺{w.escrowLockedBalance.toLocaleString()} {w.currency}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Double-Entry Audit Ledger Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
          <span>Çift Girişli Defter Kütükleri & Audit Ledger</span>
        </h4>

        <div className="space-y-3">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>İşlem Ref: {rec.transactionRef}</span>
                <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {rec.status}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>Tutar: ₺{rec.amount.toLocaleString()} {rec.currency}</span>
                <span>Audit Hash: {rec.auditHash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};