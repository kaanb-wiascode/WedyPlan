"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerTenantLifecycleAction } from "@/lib/actions/admin-tenants";

export default function TenantInspectorDrawer({
  tenant,
  isOpen,
  onClose,
}: {
  tenant: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [reason, setReason] = useState("");

  if (!isOpen || !tenant) return null;

  const handleLifecycleAction = async (action: any) => {
    const res = await triggerTenantLifecycleAction({
      tenantId: tenant.id,
      action,
      reason: reason || "Yönetici panelinden kiracı yaşam döngüsü tetiklendi.",
    });

    if (res.success) {
      alert("✨ " + res.message);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex justify-end">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="w-full max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full p-6 md:p-8 overflow-y-auto space-y-6 shadow-2xl text-xs"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-600">360° Multi-Tenant İş İstasyonu</span>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">{tenant.name}</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
          </div>

          {/* İzolasyon & Alan Adı Özeti */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Kiracı Türü</span>
              <span className="font-bold text-indigo-600">{tenant.type}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">İzolasyon Seviyesi</span>
              <span className="font-mono font-bold text-purple-600">{tenant.isolation}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Custom Domain</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{tenant.customDomain || "Yok"}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">SSL Durumu</span>
              <span className="font-bold text-emerald-600">✓ Active SSL</span>
            </div>
          </div>

          {/* İşlem Gerekçesi */}
          <div>
            <label className="font-semibold block mb-1">İşlem Gerekçesi / Not</label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Eylem nedenini yazınız..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-[11px] resize-none"
            />
          </div>

          {/* Yaşam Döngüsü Butonları */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-3">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs">⚡ Kiracı Yaşam Döngüsü Eylemleri</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleLifecycleAction("CLONE")}
                className="py-2.5 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition"
              >
                📋 Kiracıyı Klonla
              </button>
              <button
                onClick={() => handleLifecycleAction(tenant.status === "ACTIVE" ? "SUSPEND" : "ACTIVATE")}
                className={"py-2.5 rounded-xl text-white font-bold transition " + (tenant.status === "ACTIVE" ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700")}
              >
                {tenant.status === "ACTIVE" ? "🚫 Kiracıyı Dondur" : "✓ Kiracıyı Aktifleştir"}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">Kapat</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
