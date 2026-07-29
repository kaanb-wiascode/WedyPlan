"use client";

import React, { useState, useEffect } from "react";
import { Layers, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, Palette, Mail, ExternalLink, Sliders } from "lucide-react";
import { MultiBrandEngine, MultiBrandProfile, MultiBrandSummary } from "@/lib/global/multi-brand-engine";

export const BrandManagementCenter: React.FC = () => {
  const [brands, setBrands] = useState<MultiBrandProfile[]>([]);
  const [summary, setSummary] = useState<MultiBrandSummary | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<MultiBrandProfile | null>(null);

  // Form State
  const [brandName, setBrandName] = useState("");
  const [primaryDomain, setPrimaryDomain] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#D4AF37");
  const [supportEmail, setSupportEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    MultiBrandEngine.getBrandProfiles().then((data) => {
      setBrands(data);
      if (data.length > 0) {
        setSelectedBrand(data[0]);
        setBrandName(data[0].brandName);
        setPrimaryDomain(data[0].primaryDomain);
        setPrimaryColor(data[0].primaryColorHex);
        setSupportEmail(data[0].supportEmailSender);
      }
    });
    MultiBrandEngine.getBrandSummary().then(setSummary);
  }, []);

  const handleSelectBrand = (b: MultiBrandProfile) => {
    setSelectedBrand(b);
    setBrandName(b.brandName);
    setPrimaryDomain(b.primaryDomain);
    setPrimaryColor(b.primaryColorHex);
    setSupportEmail(b.supportEmailSender);
  };

  const handleSaveBrand = async () => {
    if (!selectedBrand) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await MultiBrandEngine.updateBrandProfile(selectedBrand.id, {
        brandName,
        primaryDomain,
        primaryColorHex: primaryColor,
        supportEmailSender: supportEmail,
      });
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `'${brandName}' marka ayarları başarıyla kaydedildi ve güncellendi!` });
        MultiBrandEngine.getBrandProfiles().then((data) => {
          setBrands(data);
          const updated = data.find((b) => b.id === selectedBrand.id);
          if (updated) setSelectedBrand(updated);
        });
      } else {
        setStatusMsg({ type: "error", text: "Marka ayarları güncellenemedi." });
      }
    }, 500);
  };

  if (!summary || !selectedBrand) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Multi-Brand Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Çoklu Marka & Beyaz Etiket Yönetimi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> White-Label Isolated
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Birden fazla marka ve alt acentenin özel alan adları (Custom Domain), özelleştirilmiş temalar, logolar ve e-postalarla aynı çekirdek altyapı üzerinde çalışması.
        </p>

        {/* Executive Multi-Brand Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Markalar</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalActiveBrandsCount} Marka
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Özel Alan Adı (DNS)</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.customDomainsConfiguredCount} Domain
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">İzolasyon Tipi</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              Multi-Tenant
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Brand Performance Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Marka Performans Analizi
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Health: %{selectedBrand.aiBrandHealthScorePercent}
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {selectedBrand.aiPerformanceNote}
          </p>
        </div>
      </div>

      {/* Brand Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {brands.map((b) => (
          <button
            key={b.id}
            onClick={() => handleSelectBrand(b)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border whitespace-nowrap transition-all ${
              selectedBrand.id === b.id
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {b.brandName}
          </button>
        ))}
      </div>

      {/* Edit Selected Brand Configuration Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <div>
            <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
              {selectedBrand.brandName}
            </h4>
            <span className="text-[10px] text-[#86868B] font-mono flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#D4AF37]" /> {selectedBrand.primaryDomain} ({selectedBrand.subdomainAlias})
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#D4AF37]">
            {selectedBrand.totalBrandGmvAmount.toLocaleString()} {selectedBrand.currencyCode} GMV
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-[10px] font-bold text-[#86868B] block pb-1">Marka Adı</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Marka Adı..."
              className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-bold text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#86868B] block pb-1">Özel Alan Adı (Custom Domain)</label>
            <input
              type="text"
              value={primaryDomain}
              onChange={(e) => setPrimaryDomain(e.target.value)}
              placeholder="örnek.de veya ornek.ae..."
              className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono text-[#111111] dark:text-[#F5F4F0] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-[#86868B] block pb-1">Ana Tema Rengi (Hex)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-11 p-1 bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-full h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono text-[#111111] dark:text-[#F5F4F0] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[#86868B] block pb-1">Destek E-Postası</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                placeholder="destek@marka.com..."
                className="w-full h-11 px-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleSaveBrand}
            disabled={isProcessing}
            className="w-full h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Palette className="w-4 h-4 text-[#D4AF37]" />
                <span>Marka Özelleştirmesini Kaydet</span>
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