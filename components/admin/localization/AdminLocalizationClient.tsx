"use client";

import React, { useState } from "react";
import LocalizationHeader from "./LocalizationHeader";
import AILocalizationWidget from "./AILocalizationWidget";
import RegionalFormatsBento from "./RegionalFormatsBento";
import TranslationKeysTable from "./TranslationKeysTable";
import { batchAITranslateAction } from "@/lib/actions/admin-localization";

export default function AdminLocalizationClient() {
  const [aiReport] = useState({
    overallCompletionRate: 98.4,
    missingKeysCount: 14,
    aiQualityScore: 97,
    supportedLanguagesCount: 8,
    aiAnalysis: "Platform genelindeki 1.420 statik metin anahtarının %98.4'ü 8 dilde eksiksiz çevrilmiştir. Fransızca ve İspanyolca dillerinde 14 yeni mobil e-posta anahtarı onay beklemektedir.",
    rtlComplianceStatus: "Arapça (AR) sağdan sola yazım yönü (RTL) ve CSS Flexbox düzenleri %100 uyumludur.",
    recommendation: "Almanya ve BAE pazarı için resmi sözleşme şablonlarının bölgesel yasal terimlerle AI doğrulamasından geçirilmesi önerilir.",
  });

  const [keys, setKeys] = useState([
    { id: "k_1", key: "vendor.contract.sign_button", category: "STATIC_UI", tr: "Sözleşmeyi E-İmzala", en: "E-Sign Contract", de: "Vertrag E-Signieren" },
    { id: "k_2", key: "email.escrow_payout.subject", category: "EMAIL", tr: "Kapora Hakedişiniz Hesabınıza Aktarıldı", en: "Your Escrow Deposit Has Been Released", de: "Ihre Anzahlung wurde freigegeben" },
    { id: "k_3", key: "marketplace.search_placeholder", category: "MARKETPLACE", tr: "Mekan, fotoğrafçı veya gelinlik ara...", en: "Search venue, photographer or dress...", de: "" },
  ]);

  const handleAITranslateKey = async (keyItem: any) => {
    const res = await batchAITranslateAction({
      sourceText: keyItem.tr,
      sourceLocale: "TR",
      targetLocales: ["EN", "DE", "FR", "ES", "IT", "AR", "RU"],
    });

    if (res.success && res.translatedResults) {
      setKeys((prev) =>
        prev.map((k) => (k.id === keyItem.id ? { ...k, de: res.translatedResults.DE, en: res.translatedResults.EN } : k))
      );
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <LocalizationHeader
        completionRate={aiReport.overallCompletionRate}
        supportedLangs={aiReport.supportedLanguagesCount}
        missingKeysCount={aiReport.missingKeysCount}
        onRunAIBatchTranslate={() => alert("🌐 AI Tüm Eksik Dil Anahtarlarını Taramaya Başladı...")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AILocalizationWidget aiReport={aiReport} />
          <RegionalFormatsBento />
        </div>

        <div className="lg:col-span-7 font-sans">
          <TranslationKeysTable
            keys={keys}
            onEditKey={(k) => alert("✏️ Çeviri Anahtar Düzenleme: " + k.key)}
            onAITranslateKey={handleAITranslateKey}
          />
        </div>
      </div>
    </div>
  );
}
