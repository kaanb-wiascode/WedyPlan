"use client";

import React, { useState } from "react";
import { updateUserProfileSettingAction } from "@/lib/actions/settings";

export default function ProfileSettingsTab({ userId }: { userId: string }) {
  const [fullName, setFullName] = useState("Selin Yılmaz");
  const [email, setEmail] = useState("selin@wedyplan.demo");
  const [phone, setPhone] = useState("+90 532 111 2233");
  const [weddingRole, setWeddingRole] = useState<"BRIDE" | "GROOM" | "PARTNER">("BRIDE");
  const [currency, setCurrency] = useState<"TRY" | "USD" | "EUR" | "GBP">("TRY");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateUserProfileSettingAction(userId, {
      fullName,
      email,
      phone,
      weddingRole,
      preferredLanguage: "TR",
      preferredCurrency: currency,
    });
    setIsSaving(false);

    if (res.success) {
      alert(res.message);
    }
  };

  return (
    <form onSubmit={handleSave} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
        👤 Kişisel Profil & Hesap Bilgileri
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Ad Soyad</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">E-posta Adresi</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Telefon Numarası</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Varsayılan Para Birimi</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
          >
            <option value="TRY">Türk Lirası (₺)</option>
            <option value="USD">Amerikan Doları ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">İngiliz Sterlini (£)</option>
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs hover:opacity-90 transition disabled:opacity-50"
        >
          {isSaving ? "Kaydediliyor..." : "Değişiklikleri Kaydet ✨"}
        </button>
      </div>
    </form>
  );
}
