"use client";

import React, { useState, useEffect } from "react";
import { UserCheck, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, Phone, Lock, UserPlus, ShieldAlert, Fingerprint } from "lucide-react";
import { GlobalIdentityEngine, CountryIdentityProfile, RegisteredGlobalUserRecord, GlobalIdentitySummary } from "@/lib/global/global-identity-engine";

export const GlobalIdentityCenter: React.FC = () => {
  const [countryProfiles, setCountryProfiles] = useState<CountryIdentityProfile[]>([]);
  const [users, setUsers] = useState<RegisteredGlobalUserRecord[]>([]);
  const [summary, setSummary] = useState<GlobalIdentitySummary | null>(null);

  // Form State
  const [selectedCountry, setSelectedCountry] = useState<string>("TR");
  const [fullNameInput, setFullNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    GlobalIdentityEngine.getCountryProfiles().then(setCountryProfiles);
    GlobalIdentityEngine.getGlobalUsers().then(setUsers);
    GlobalIdentityEngine.getSummary().then(setSummary);
  }, []);

  const handleRegister = async () => {
    if (!fullNameInput.trim() || !emailInput.trim() || !phoneInput.trim()) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const created = await GlobalIdentityEngine.registerGlobalUser(
        fullNameInput,
        emailInput,
        selectedCountry,
        phoneInput
      );
      setIsProcessing(false);
      setStatusMsg({ type: "success", text: `'${created.fullName}' küresel kullanıcı kaydı doğrulandı ve aktifleştirildi!` });
      setFullNameInput("");
      setEmailInput("");
      setPhoneInput("");
      GlobalIdentityEngine.getGlobalUsers().then(setUsers);
      GlobalIdentityEngine.getSummary().then(setSummary);
    }, 500);
  };

  if (!summary) return null;

  const currentCountryProfile = countryProfiles.find((c) => c.countryCode === selectedCountry);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Global Identity Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Küresel Kimlik & Doğrulama Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified: %{summary.verifiedUsersPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Ülkeye özel telefon formatları, e-Devlet, eIDAS ve UAE PASS entegre kimlik doğrulaması ve WedyAI fraud kalkanı.
        </p>

        {/* Global Identity Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Küresel Kullanıcılar</span>
            <span className="font-mono font-bold text-white text-base">
              {(summary.registeredGlobalUsersCount / 1000).toFixed(1)}K User
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Desteklenen Ülkeler</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.supportedIdentityCountriesCount} Ülke
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Fraud Engelleme</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.aiIdentityFraudPreventionRatePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Identity Fraud Shield Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Kimlik & Fraud Kalkanı
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Zero Fake Accounts
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiIdentityInsightNote}
          </p>
        </div>
      </div>

      {/* Localized User Registration Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-[#D4AF37]" />
          <span>Yerelleştirilmiş Kullanıcı Kaydı & Doğrulama</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            >
              {countryProfiles.map((c) => (
                <option key={c.countryCode} value={c.countryCode}>
                  {c.countryName} ({c.phoneCallingCode})
                </option>
              ))}
            </select>

            <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center">
              Doğrulama: {currentCountryProfile?.verificationMethod}
            </div>
          </div>

          <input
            type="text"
            value={fullNameInput}
            onChange={(e) => setFullNameInput(e.target.value)}
            placeholder="Ad Soyad..."
            className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="E-Posta Adresi..."
            className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <input
            type="text"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            placeholder={currentCountryProfile?.phoneMaskPattern || "Telefon..."}
            className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono text-[#111111] dark:text-[#F5F4F0] outline-none"
          />

          <button
            onClick={handleRegister}
            disabled={isProcessing || !fullNameInput.trim() || !emailInput.trim()}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Fingerprint className="w-4 h-4 text-[#D4AF37]" />
                <span>Kaydı ve Bölgesel Doğrulamayı Tamamla</span>
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

      {/* Global Registered Users Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#D4AF37]" />
          <span>Doğrulanmış Küresel Kullanıcı Kayıtları ({users.length})</span>
        </h4>

        <div className="space-y-3">
          {users.map((u) => (
            <div
              key={u.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{u.fullName}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> VERIFIED ({u.countryCode})
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>{u.email}</span>
                <span>{u.phoneNumberFormatted}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};