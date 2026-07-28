"use client";

import React, { useState } from "react";
import { saveNotificationTemplateAction, retryFailedDeliveriesAction } from "@/lib/actions/admin-notifications";

export default function TemplatesAndQueueTable() {
  const [templateCode, setTemplateCode] = useState("CONTRACT_SIGNED_WELCOME");
  const [templateSubject, setTemplateSubject] = useState("Tebrikler! Düğün Sözleşmeniz İmzalandı 🎉");

  const templates = [
    { id: "tmpl_1", code: "CONTRACT_SIGNED_WELCOME", channel: "WHATSAPP", subject: "Sözleşme Onay Mesajı", status: "ACTIVE" },
    { id: "tmpl_2", code: "ESCROW_PAYMENT_DUE", channel: "SMS", subject: "Kapora Ödeme Hatırlatması", status: "ACTIVE" },
    { id: "tmpl_3", code: "NEW_LEAD_INQUIRY", channel: "EMAIL", subject: "Yeni Müşteri Talebi Geldi", status: "ACTIVE" },
  ];

  const failedQueue = [
    { id: "log_991", recipient: "+90 532 999 0011", channel: "SMS", reason: "GSM Şebeke Zaman Aşımı", retryCount: 2 },
    { id: "log_992", recipient: "zeynep.kaya@wedyplan.demo", channel: "EMAIL", reason: "Geçici Mailbox Dolu", retryCount: 1 },
  ];

  const handleSaveTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await saveNotificationTemplateAction({
      code: templateCode,
      channel: "WHATSAPP",
      subject: templateSubject,
      body: "Sayın {{COUPLE_NAME}}, {{VENDOR_NAME}} ile olan sözleşmeniz başarıyla imzalanmıştır.",
      variables: ["COUPLE_NAME", "VENDOR_NAME"],
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const handleRetryFailed = async () => {
    const res = await retryFailedDeliveriesAction({
      failedLogIds: failedQueue.map((f) => f.id),
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Hatalı Gönderim Retry Paneli */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block">
            🚨 Başarısız İletim Kuyruğu ({failedQueue.length} Hata)
          </span>
          <button
            onClick={handleRetryFailed}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition"
          >
            🔄 Hatalı Bildirimleri Yeniden Dene (Retry All)
          </button>
        </div>

        <div className="space-y-2">
          {failedQueue.map((fq) => (
            <div key={fq.id} className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-100">{fq.recipient}</span>
                <span className="text-[10px] text-slate-400 font-mono ml-2">[{fq.channel}] - Gerekçe: {fq.reason}</span>
              </div>
              <span className="font-mono text-[10px] font-bold text-rose-600 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded">
                Deneme: #{fq.retryCount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Şablon Kütüphanesi */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            📜 Sistem Bildirim Şablonları ({templates.length} Şablon)
          </span>
        </div>

        <form onSubmit={handleSaveTemplate} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-3">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs">+ Yeni Şablon Tanımla / Güncelle</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={templateCode}
              onChange={(e) => setTemplateCode(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono font-bold"
            />
            <input
              type="text"
              value={templateSubject}
              onChange={(e) => setTemplateSubject(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
            />
          </div>
          <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition">
            Şablonu Kaydet ✨
          </button>
        </form>

        <div className="space-y-2">
          {templates.map((tmpl) => (
            <div key={tmpl.id} className="p-3 rounded-2xl bg-white dark:bg-slate-800 border flex justify-between items-center">
              <div>
                <span className="font-bold text-indigo-600 font-mono">{tmpl.code}</span>
                <span className="text-slate-700 dark:text-slate-200 font-medium ml-2">— {tmpl.subject}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                {tmpl.channel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
