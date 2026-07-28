"use client";

import React from "react";

export default function CompanyBrandingPanel({
  companyName,
  setCompanyName,
  taxOffice,
  setTaxOffice,
  taxNumber,
  setTaxNumber,
  brandColor,
  setBrandColor,
}: {
  companyName: string;
  setCompanyName: (v: string) => void;
  taxOffice: string;
  setTaxOffice: (v: string) => void;
  taxNumber: string;
  setTaxNumber: (v: string) => void;
  brandColor: string;
  setBrandColor: (v: string) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🏢 Kurumsal Kimlik & Yasal Şirket Bilgileri
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold block mb-1">Yasal Şirket Ticari Unvanı</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Kurumsal Marka Ana Rengi (HEX)</label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer"
            />
            <input
              type="text"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold block mb-1">Vergi Dairesi</label>
          <input
            type="text"
            value={taxOffice}
            onChange={(e) => setTaxOffice(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Vergi Kimlik Numarası (VKN)</label>
          <input
            type="text"
            value={taxNumber}
            onChange={(e) => setTaxNumber(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono"
          />
        </div>
      </div>
    </div>
  );
}
