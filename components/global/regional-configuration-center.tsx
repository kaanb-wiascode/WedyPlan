"use client";

import React, { useState, useEffect } from "react";
import { Sliders, Sparkles, ShieldCheck, RefreshCw, CheckCircle2 } from "lucide-react";
import { RegionalConfigEngine, RegionalFormatConfig, RegionalConfigSummary } from "@/lib/global/regional-config-engine";

export const RegionalConfigurationCenter: React.FC = () => {
  const [configs, setConfigs] = useState<RegionalFormatConfig[]>([]);
  const [summary, setSummary] = useState<RegionalConfigSummary | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("TR");
  const [selectedConfig, setSelectedCountry] = useState<RegionalFormatConfig | null>(null);

  // Form State
  const [dateFormat, setDateFormat] = useState("");
  const [phoneFormat, setPhoneFormat] = useState("");
  const [addressTemplate, setAddressTemplate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    RegionalConfigEngine.getRegionalConfigs().then((data) => {
      setConfigs(data);
      if (data.length > 0) {
        const tr = data.find((c) => c.countryCode === "TR") || data[0];
        setSelectedCountryCode(tr.countryCode);
        setSelectedCountry(tr);
        setDateFormat(tr.dateFormatPattern);
        setPhoneFormat(tr.phoneFormatPattern);
        setAddressTemplate(tr.addressStructureTemplate);
      }
    });
    RegionalConfigEngine.getConfigSummary().then(setSummary);
  }, []);

  const handleSelectCountry = (code: string) => {
    setSelectedCountryCode(code);
    const found = configs.find((c) => c.countryCode === code);
    if (found) {
      setSelectedCountry(found);
      setDateFormat(found.dateFormatPattern);
      setPhoneFormat(found.phoneFormatPattern);
      setAddressTemplate(found.addressStructureTemplate);
    }
  };

  const handleSaveConfig = async () => {
    if (!selectedConfig) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await RegionalConfigEngine.updateCountryConfig(selectedConfig.countryCode, {
        dateFormatPattern: dateFormat,
        phoneFormatPattern: phoneFormat,
        addressStructureTemplate: addressTemplate,
      });
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${selectedConfig.countryName}' konfigürasyon parametreleri kaydedildi!` });
        RegionalConfigEngine.getRegionalConfigs().then((data) => {
          setConfigs(data);
          const updated = data.find((c) => c.countryCode === selectedConfig.countryCode);
          if (updated) setSelectedCountry(updated);
        });
      } else {
        setStatusMsg({ type: "error", text: "Konfigürasyon güncellenemedi." });
      }
    }, 500);
  };

  if (!summary || !selectedConfig) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Regional Config Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Bölgesel Konfigürasyon Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Score: %{summary.aiConfigValidationScorePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Her ülke için bağımsız tarih, sayı, telefon, adres, posta kodu, para birimi ve vergi profili yapılandırma altyapısı.
        </p>

        {/* Executive Config Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Yapılandırılan Ülke</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.configuredCountriesCount} Ülke
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Geçersiz Kılma</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeOverridesCount} Override
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Doğrulama Skoru</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.aiConfigValidationScorePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Config Validation Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Konfigürasyon Doğrulama
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Validated
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiRegionalRecommendationNote}
          </p>
        </div>
      </div>

      {/* Country Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {configs.map((c) => (
          <button
            key={c.countryCode}
            onClick={() => handleSelectCountry(c.countryCode)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border whitespace-nowrap transition-all ${
              selectedCountryCode === c.countryCode
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {c.countryName} ({c.countryCode})
          </button>
        ))}
      </div>

      {/* Edit Country Config Parameters Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <div>
            <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
              {selectedConfig.countryName} ({selectedConfig.countryCode}) Ayarları
            </h4>
            <span className="text-[10px] text-[#86868B] font-mono">
              Para Birimi: {selectedConfig.defaultCurrencyCode} • Vergi Profili Ref: {selectedConfig.defaultTaxProfileIdRef}
            </span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
            Override Active
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-[10px] font-bold text-[#86868B] block pb-1">Tarih Formatı Deseni</label>
            <input
              type="text"
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              placeholder="DD.MM.YYYY veya MM/DD/YYYY"
              className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#86868B] block pb-1">Telefon Formatı Deseni</label>
            <input
              type="text"
              value={phoneFormat}
              onChange={(e) => setPhoneFormat(e.target.value)}
              placeholder="+90 (5XX) XXX XX XX"
              className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#86868B] block pb-1">Adres Şablon Yapısı</label>
            <input
              type="text"
              value={addressTemplate}
              onChange={(e) => setAddressTemplate(e.target.value)}
              placeholder="Mahalle / Sokak, İlçe / İl"
              className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
            <div>Ondalık Ayırıcı: '{selectedConfig.numberFormatDecimalSeparator}'</div>
            <div>Binlik Ayırıcı: '{selectedConfig.numberFormatThousandSeparator}'</div>
            <div>Posta Kodu Regex: {selectedConfig.postalCodePatternRegex}</div>
            <div>Alan Kodu: {selectedConfig.phoneCountryCallingCode}</div>
          </div>

          <button
            onClick={handleSaveConfig}
            disabled={isProcessing}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Sliders className="w-4 h-4 text-[#D4AF37]" />
                <span>Ülke Konfigürasyonunu Kaydet</span>
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
    </div>
  );
};