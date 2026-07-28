"use client";

import React, { useState } from "react";
import SettingsHeader from "./SettingsHeader";
import AISettingsWidget from "./AISettingsWidget";
import CompanyBrandingPanel from "./CompanyBrandingPanel";
import RegionalTaxPanel from "./RegionalTaxPanel";
import { updateVendorAIPreferencesAction, updateVendorCompanySettingsAction } from "@/lib/actions/vendor-settings";

export default function VendorSettingsClient({ vendorId }: { vendorId: string }) {
  const [companyName, setCompanyName] = useState("Bodrum Sunset Venue & Events A.Ş.");
  const [taxOffice, setTaxOffice] = useState("Bodrum Vergi Dairesi");
  const [taxNumber, setTaxNumber] = useState("9820192831");
  const [brandColor, setBrandColor] = useState("#4F46E5");

  const [aiTone, setAiTone] = useState("LUXURY_FORMAL");
  const [autoReply, setAutoReply] = useState(true);

  const [currency, setCurrency] = useState("TRY");
  const [vatRate, setVatRate] = useState(20);

  const handleSaveAll = async () => {
    const resCompany = await updateVendorCompanySettingsAction(vendorId, {
      companyName,
      taxOffice,
      taxNumber,
      brandColor,
      primaryLanguage: "TR",
    });

    const resAI = await updateVendorAIPreferencesAction(vendorId, {
      tone: aiTone as any,
      autoReplyEnabled: autoReply,
      autoFollowUpDays: 3,
      smartRulesEnabled: true,
    });

    if (resCompany.success && resAI.success) {
      alert("✨ Tüm sistem, şirket ve AI yapılandırma ayarlarınız başarıyla kaydedildi!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <SettingsHeader
        systemSecurityScore={98}
        lastBackupDate="Dün 23:45"
        onSaveAll={handleSaveAll}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AISettingsWidget
            aiTone={aiTone}
            setAiTone={setAiTone}
            autoReply={autoReply}
            setAutoReply={setAutoReply}
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <CompanyBrandingPanel
            companyName={companyName}
            setCompanyName={setCompanyName}
            taxOffice={taxOffice}
            setTaxOffice={setTaxOffice}
            taxNumber={taxNumber}
            setTaxNumber={setTaxNumber}
            brandColor={brandColor}
            setBrandColor={setBrandColor}
          />

          <RegionalTaxPanel
            currency={currency}
            setCurrency={setCurrency}
            vatRate={vatRate}
            setVatRate={setVatRate}
            vendorId={vendorId}
          />
        </div>
      </div>
    </div>
  );
}
