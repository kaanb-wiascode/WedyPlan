"use client";

import React, { useState, useEffect } from "react";
import { Fingerprint, ShieldCheck, RefreshCw, CheckCircle2, Zap, Lock, Users, ShieldAlert, Key, Globe, ArrowRightLeft, UserCheck } from "lucide-react";
import { IdentityFederationEngine, FederationProviderRecord, ScimProvisioningLog, IdentityFederationSummary, IdentityProtocolType } from "@/lib/integration/identity-federation-engine";

export const IdentityFederationCenter: React.FC = () => {
  const [providers, setProviders] = useState<FederationProviderRecord[]>([]);
  const [scimLogs, setScimLogs] = useState<ScimProvisioningLog[]>([]);
  const [summary, setSummary] = useState<IdentityFederationSummary | null>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<IdentityProtocolType | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    IdentityFederationEngine.getProviders().then(setProviders);
    IdentityFederationEngine.getScimLogs().then(setScimLogs);
    IdentityFederationEngine.getSummary().then(setSummary);
  }, []);

  const handleTriggerSync = async (providerId: string, name: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await IdentityFederationEngine.triggerScimSync(providerId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${name}' SCIM dizin senkronizasyonu ve rol haritalaması başarıyla tamamlandı!` });
        IdentityFederationEngine.getProviders().then(setProviders);
        IdentityFederationEngine.getSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Senkronizasyon başarısız oldu." });
      }
    }, 400);
  };

  if (!summary) return null;

  const filteredProviders = selectedProtocol === "ALL"
    ? providers
    : providers.filter((p) => p.protocol === selectedProtocol);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Identity Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Kimlik Federasyonu Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> SSO Latency: {summary.averageSsoLatencyMs}ms
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Kurumsal SSO (SAML 2.0, OIDC), SCIM 2.0 otomatik kullanıcı sağlama (provisioning), dizin senkronizasyonu ve WedyAI rol haritalama analizi.
        </p>

        {/* Executive Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif IdP Sağlayıcı</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalActiveProvidersCount} IdP
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Federated Kullanıcı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.totalFederatedUsersCount / 1000).toFixed(1)}K User
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Eşleşen Dizin Grubu</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.totalSyncedGroupsCount} Group
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Access Analysis & Permission Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> WedyAI Akıllı Erişim Analiz & Rol Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Access Analyzer Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <UserCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiAccessInsightNote}
          </p>
        </div>
      </div>

      {/* Protocol Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "SAML_20", "OIDC", "SCIM_20", "OAUTH2"] as (IdentityProtocolType | "ALL")[]).map((prot) => (
          <button
            key={prot}
            onClick={() => setSelectedProtocol(prot)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedProtocol === prot
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {prot === "ALL" ? "Tüm Protokoller" : prot.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Identity Providers Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Users className="w-5 h-5 text-[#D4AF37]" />
          <span>Bağlı Kurumsal Kimlik Sağlayıcılar ({filteredProviders.length})</span>
        </h4>

        <div className="space-y-4">
          {filteredProviders.map((idp) => (
            <div
              key={idp.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-3 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{idp.providerName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {idp.protocol} ({idp.status})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Kullanıcı: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{idp.syncedUsersCount} User</span></div>
                <div>Grup: <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">{idp.syncedGroupsCount} Group</span></div>
                <div>SCIM Sync: <span className="font-bold text-emerald-500">{idp.scimSyncEnabled ? "Aktif" : "Pasif"}</span></div>
                <div>Rol Eşleşme: <span className="font-bold text-[#D4AF37]">{idp.mappedRoleSummary}</span></div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl font-mono text-[10px] text-[#86868B] truncate border border-black/5 dark:border-white/5">
                SSO URL: {idp.ssoEndpointUrl}
              </div>

              <p className="text-[10px] text-[#86868B]">
                ✦ WedyAI Analizi: {idp.aiAccessAnalyzerTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <button
                  onClick={() => handleTriggerSync(idp.id, idp.providerName)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <ArrowRightLeft className="w-3 h-3 text-[#D4AF37]" />
                      <span>SCIM Dizin Senkronizasyonu Yap</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] text-[#86868B]">
                  Son Sync: {new Date(idp.lastSyncedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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

      {/* SCIM Provisioning Audit Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#D4AF37]" />
          <span>SCIM 2.0 Otomatik Kullanıcı Sağlama Logları</span>
        </h4>

        <div className="space-y-2">
          {scimLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl text-xs flex justify-between items-center font-mono border border-black/5 dark:border-white/5"
            >
              <div>
                <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block">{log.targetUserEmail}</span>
                <span className="text-[10px] text-[#86868B]">{log.actionType} ({log.assignedRole})</span>
              </div>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-bold">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};