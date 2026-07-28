"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TenantListBentoGrid({
  tenants,
  onSelectTenant,
}: {
  tenants: any[];
  onSelectTenant: (tenant: any) => void;
}) {
  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        🏢 Kayıtlı Kiracılar & White-Label Ortaklar ({tenants.length} Kiracı)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tenants.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ y: -2 }}
            className="p-5 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{t.name}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {t.type}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">slug: {t.slug}</span>
                </div>

                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (t.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300")
                  }
                >
                  {t.status === "ACTIVE" ? "● Aktif" : "Donduruldu"}
                </span>
              </div>

              {/* Alan Adı & İzolasyon Detayı */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-1 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Custom Domain:</span>
                  <span className="font-bold text-indigo-600">{t.customDomain || "Tanımlanmadı"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Subdomain:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{t.subdomain}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                  <span className="text-slate-400">Veritabanı İzolasyonu:</span>
                  <span className="font-bold text-purple-600">{t.isolation}</span>
                </div>
              </div>

              {/* Depolama & AI Kredi Barları */}
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">Depolama</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{t.usedStorageGb} GB / {t.storageLimitGb} GB</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-slate-400 block">AI Kredisi</span>
                  <span className="font-bold text-emerald-600">{t.aiCreditQuota.toLocaleString("tr-TR")} Kredi</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-mono">Para Birimi: {t.defaultCurrency}</span>
              <button
                onClick={() => onSelectTenant(t)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:opacity-90 transition text-[10px]"
              >
                360° Yönet & Klonla →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
