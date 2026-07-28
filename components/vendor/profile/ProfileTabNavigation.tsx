"use client";

import React, { useState } from "react";
import { updateVendorProfileSectionAction } from "@/lib/actions/vendor-profile";

export default function ProfileTabNavigation({ vendorId }: { vendorId: string }) {
  const [activeTab, setActiveTab] = useState("GENERAL");
  const [isSaving, setIsSaving] = useState(false);

  const [generalData, setGeneralData] = useState({
    businessName: "Bodrum Sunset Venue & Events",
    slogan: "Ege Gün Batımında Lüks Düğün Deneyimi",
    category: "Düğün Mekanı",
    city: "Muğla",
    district: "Bodrum",
    address: "Yalıkavak Mah. Sahil Cad. No: 42",
    phone: "+90 532 999 8877",
    email: "contact@bodrumsunsetvenue.com",
    story: "2012 yılından bu yana Bodrum Yalıkavak sahilinde 350 kişilik açık hava alanı ve özel iskelesiyle unutulmaz lüks düğünlere ev sahipliği yapıyoruz.",
  });

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateVendorProfileSectionAction(vendorId, generalData);
    setIsSaving(false);

    if (res.success) {
      alert(res.message);
    }
  };

  const tabs = [
    { id: "GENERAL", label: "🏢 Genel Bilgiler" },
    { id: "PACKAGES", label: "🎁 Paketler & Fiyatlar" },
    { id: "FAQ", label: "❓ SSS & Hizmetler" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={"px-4 py-2.5 rounded-2xl text-xs font-semibold transition " +
              (activeTab === tab.id
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-slate-300")
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "GENERAL" && (
        <form onSubmit={handleSaveGeneral} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1">İşletme Adı</label>
              <input
                type="text"
                value={generalData.businessName}
                onChange={(e) => setGeneralData({ ...generalData, businessName: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Slogan / Kısa Tanıtım</label>
              <input
                type="text"
                value={generalData.slogan}
                onChange={(e) => setGeneralData({ ...generalData, slogan: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Şehir / İlçe</label>
              <input
                type="text"
                value={generalData.city + " / " + generalData.district}
                onChange={(e) => setGeneralData({ ...generalData, city: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">E-posta</label>
              <input
                type="email"
                value={generalData.email}
                onChange={(e) => setGeneralData({ ...generalData, email: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-1">İşletme Hikayesi & Açıklaması</label>
            <textarea
              rows={4}
              value={generalData.story}
              onChange={(e) => setGeneralData({ ...generalData, story: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isSaving ? "Kaydediliyor..." : "Genel Bilgileri Güncelle ✨"}
            </button>
          </div>
        </form>
      )}

      {activeTab === "PACKAGES" && (
        <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-800 dark:text-slate-100">🎁 Tanımlı Düğün Paketleri</h3>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Ultra Lüks Sahil Düğünü Paketi</h4>
              <p className="text-slate-400 text-[11px]">350 Kişilik Yemekli Menü, Kokteyl, Karşılama, Ses/Işık Düzeni</p>
            </div>
            <span className="font-serif font-bold text-indigo-600 text-sm">320.000 ₺</span>
          </div>
        </div>
      )}
    </div>
  );
}
